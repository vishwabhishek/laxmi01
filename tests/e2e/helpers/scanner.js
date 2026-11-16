/**
 * Prohibited Terms Scanner & XML Validator
 * Zero-tolerance scanner for obsolete terms and strict XML validator for sitemaps.
 */

import fs from 'node:fs';
import path from 'node:path';
import { PROHIBITED_TERMS, PROHIBITED_PATTERNS } from '../fixtures/ground-truth.js';

export function scanFileForProhibitedTerms(filePath, patterns = PROHIBITED_PATTERNS) {
  if (!fs.existsSync(filePath)) return [];

  const stat = fs.statSync(filePath);
  if (!stat.isFile()) return [];

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const violations = [];

  // 1. Line-by-line inspection (precise line attribution for single-line occurrences)
  for (let lineNum = 0; lineNum < lines.length; lineNum++) {
    const line = lines[lineNum];
    for (const { term, pattern } of patterns) {
      if (pattern.test(line)) {
        violations.push({
          file: filePath,
          line: lineNum + 1,
          term,
          context: line.trim().slice(0, 160)
        });
      }
    }
  }

  // 2. Whole-file multi-line check (/[\s\S]*/) for phrases split across newlines or markup
  for (const { term, pattern } of patterns) {
    // Skip if already flagged on a specific line
    if (violations.some(v => v.term === term)) continue;

    let matched = false;
    let match = null;

    // Check if whole content matches pattern (in JS regex, \s+ matches \n)
    if (pattern.test(content)) {
      matched = true;
      match = content.match(pattern);
    } else if (term.includes(' ')) {
      // Build a multi-line pattern allowing whitespace, newlines, and inline markup between words
      const words = term.split(/\s+/).map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
      const multilinePattern = new RegExp(words.join('[\\s\\S]{1,60}?'), 'i');
      if (multilinePattern.test(content)) {
        matched = true;
        match = content.match(multilinePattern);
      }
    }

    if (matched && match) {
      const matchIndex = match.index || 0;
      const lineNum = content.slice(0, matchIndex).split('\n').length;
      const snippet = match[0].replace(/\s+/g, ' ').trim().slice(0, 160);

      violations.push({
        file: filePath,
        line: lineNum,
        term,
        context: `(multi-line) ${snippet}`
      });
    }
  }

  return violations;
}

export function scanDirectoryRecursive(dirPath, options = {}) {
  const ignoreDirs = new Set(options.ignoreDirs || ['node_modules', '.git', 'dist', '.agents', 'tests']);
  const extensions = new Set(options.extensions || ['.html', '.js', '.jsx', '.css', '.json', '.md']);
  const violations = [];

  function walk(currentDir) {
    if (!fs.existsSync(currentDir)) return;
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (!ignoreDirs.has(entry.name)) {
          walk(path.join(currentDir, entry.name));
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (extensions.has(ext)) {
          const filePath = path.join(currentDir, entry.name);
          const fileViolations = scanFileForProhibitedTerms(filePath, options.patterns || PROHIBITED_PATTERNS);
          violations.push(...fileViolations);
        }
      }
    }
  }

  walk(dirPath);

  return {
    violations,
    totalViolations: violations.length,
    passed: violations.length === 0
  };
}

export function scanTargetPaths(pathsList, options = {}) {
  const rootDir = options.rootDir || process.cwd();
  const violations = [];

  for (const item of pathsList) {
    const fullPath = path.resolve(rootDir, item);
    if (!fs.existsSync(fullPath)) continue;

    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      const dirResult = scanDirectoryRecursive(fullPath, options);
      violations.push(...dirResult.violations);
    } else if (stat.isFile()) {
      const fileViolations = scanFileForProhibitedTerms(fullPath, options.patterns || PROHIBITED_PATTERNS);
      violations.push(...fileViolations);
    }
  }

  return {
    violations,
    totalViolations: violations.length,
    passed: violations.length === 0
  };
}

/**
 * Strict XML Well-Formedness Validator
 * Validates XML tags, hierarchy, entity escaping, and extracts <loc> URLs.
 */
export function validateXml(xmlString) {
  const errors = [];
  const urls = [];

  if (typeof xmlString !== 'string' || !xmlString.trim()) {
    return { valid: false, errors: ['XML string is empty or invalid'], urls: [] };
  }

  // Check for bare ampersands not part of valid entity
  const bareAmpersandRegex = /&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-fA-F]+;)/g;
  let ampMatch;
  while ((ampMatch = bareAmpersandRegex.exec(xmlString)) !== null) {
    errors.push(`Unescaped bare ampersand at position ${ampMatch.index}`);
  }

  // Tag stack validation
  const tagRegex = /<(\/)?([a-zA-Z0-9_\-:]+)([^>]*?)(\/)?>/g;
  const stack = [];
  let tagMatch;

  while ((tagMatch = tagRegex.exec(xmlString)) !== null) {
    const fullTag = tagMatch[0];
    const isClosing = Boolean(tagMatch[1]);
    const tagName = tagMatch[2];
    const rawAttrs = tagMatch[3];
    const isSelfClosing = Boolean(tagMatch[4]) || fullTag.endsWith('/>');

    // Skip XML declaration <?xml ... ?> and comments <!-- ... -->
    if (tagName.startsWith('?') || tagName.startsWith('!')) {
      continue;
    }

    if (isSelfClosing) {
      continue;
    }

    if (isClosing) {
      if (stack.length === 0) {
        errors.push(`Unexpected closing tag </${tagName}> without matching open tag`);
      } else {
        const top = stack.pop();
        if (top !== tagName) {
          errors.push(`Mismatched tag: expected </${top}>, found </${tagName}>`);
        }
      }
    } else {
      stack.push(tagName);
    }
  }

  if (stack.length > 0) {
    errors.push(`Unclosed XML tags remaining: ${stack.join(', ')}`);
  }

  // Extract <loc> elements
  const locRegex = /<loc>([\s\S]*?)<\/loc>/gi;
  let locMatch;
  while ((locMatch = locRegex.exec(xmlString)) !== null) {
    urls.push(locMatch[1].trim());
  }

  return {
    valid: errors.length === 0,
    errors,
    urls
  };
}

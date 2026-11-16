/**
 * Zero-Dependency HTML Parser & Extraction Helpers for E2E Tests
 * Extracts titles, canonical tags, headings, buttons, capabilities, CTA banners, FAQs, and links.
 */

export function unescapeHtml(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#8211;/g, '–')
    .replace(/&ndash;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&mdash;/g, '—')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)));
}

export function stripTags(str) {
  if (!str || typeof str !== 'string') return '';
  return unescapeHtml(str.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

export function getTitle(html) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? stripTags(match[1]) : null;
}

export function getCanonicalUrl(html) {
  const match =
    html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) ||
    html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
  return match ? match[1].trim() : null;
}

export function getHeadings(html) {
  const headings = {
    h1: [],
    h2: [],
    h3: [],
    h4: []
  };

  const regex = /<(h[1-4])[^>]*>([\s\S]*?)<\/\1>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const level = match[1].toLowerCase();
    const text = stripTags(match[2]);
    if (text) {
      headings[level].push(text);
    }
  }

  return headings;
}

export function getCapabilities(html) {
  const capabilities = [];

  // Match text-layout-seven-text-card blocks
  const cardRegex = /<div[^>]*class=["'][^"']*text-layout-seven-text-card[^"']*["'][^>]*>([\s\S]*?)<\/div>\s*(?=<div[^>]*class=["'][^"']*text-layout-seven-text-card|<\/div>\s*<\/div>)/gi;
  let match;

  while ((match = cardRegex.exec(html)) !== null) {
    const cardHtml = match[1];
    const numMatch = cardHtml.match(/<div[^>]*class=["'][^"']*heading-five[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
    const titleMatch = cardHtml.match(/<h[34][^>]*>([\s\S]*?)<\/h[34]>/i);
    const descMatch = cardHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/i);

    if (titleMatch) {
      capabilities.push({
        number: numMatch ? stripTags(numMatch[1]) : '',
        title: stripTags(titleMatch[1]),
        description: descMatch ? stripTags(descMatch[1]) : ''
      });
    }
  }

  // Fallback: If Webflow card class not matched, search for capability cards via h4 in capabilities section
  if (capabilities.length === 0) {
    const capSection = html.match(/<section[^>]*class=["'][^"']*(?:capabilities|text-layout-seven)[^"']*["'][\s\S]*?<\/section>/i);
    const scope = capSection ? capSection[0] : html;
    const h4Regex = /<h4[^>]*>([\s\S]*?)<\/h4>/gi;
    let h4Match;
    while ((h4Match = h4Regex.exec(scope)) !== null) {
      capabilities.push({
        number: '',
        title: stripTags(h4Match[1]),
        description: ''
      });
    }
  }

  return capabilities;
}

export function getButtons(html) {
  const buttons = [];

  // Match .primary-button-text elements
  const pbTextRegex = /<[^>]+class=["'][^"']*primary-button-text[^"']*["'][^>]*>([\s\S]*?)<\/[^>]+>/gi;
  let pbMatch;
  while ((pbMatch = pbTextRegex.exec(html)) !== null) {
    const text = stripTags(pbMatch[1]);
    if (text) buttons.push(text);
  }

  // Match standard <button> tags
  const btnTagRegex = /<button[^>]*>([\s\S]*?)<\/button>/gi;
  let btnMatch;
  while ((btnMatch = btnTagRegex.exec(html)) !== null) {
    const text = stripTags(btnMatch[1]);
    if (text && !buttons.includes(text)) buttons.push(text);
  }

  return buttons;
}

export function getPrimaryButtonLinks(html) {
  const results = [];
  // Match <a> tags with primary-button class, supporting any attribute order (href before class or class before href)
  const linkRegex = /<a\b([^>]*\bclass=["'][^"']*primary-button[^"']*["'][^>]*)>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    const attrs = match[1];
    const hrefMatch = attrs.match(/href=["']([^"']*)["']/i);
    const href = hrefMatch ? hrefMatch[1].trim() : '';
    const text = stripTags(match[2]);
    results.push({ href, text });
  }
  return results;
}

export function getClosingCtaBanner(html) {
  // Locate the closing CTA banner section or container across all layouts (cta-layout-one, cta-layout-two, cta-layout-three, inner wrappers, comments)
  const bannerMatch =
    html.match(/<section[^>]*class=["'][^"']*cta-layout-(?:one|two|three)[^"']*["'][\s\S]*?<\/section>/i) ||
    html.match(/<section[^>]*class=["'][^"']*(?:cta-banner|cta-wrap|section-cta|cta-section)[^"']*["'][\s\S]*?<\/section>/i) ||
    html.match(/<div[^>]*class=["'][^"']*(?:cta-banner|cta-wrap|section-cta|cta-layout-(?:one|two|three)-inner)[^"']*["'][\s\S]*?<\/div>\s*<\/div>/i) ||
    html.match(/<section[^>]*>[\s\S]*?Start Your Next Fit-Out[\s\S]*?<\/section>/i) ||
    html.match(/<!--[\s\S]*?CTA[\s\S]*?-->([\s\S]*?)(?:<footer|<\/body)/i);

  // If a specific section container is found, search inside; otherwise fallback to full html
  const scope = bannerMatch ? bannerMatch[0] : html;

  let heading = null;
  let hMatch = null;
  if (bannerMatch) {
    // Within the matched CTA section, find the heading text without capturing tag name into group 1
    hMatch =
      scope.match(/<(?:h[1-6]|div)[^>]*class=["'][^"']*(?:cta-heading|heading-one|heading-two|heading-three)[^"']*["'][^>]*>([\s\S]*?)<\/(?:h[1-6]|div)>/i) ||
      scope.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i);
  } else {
    // Fallback: search globally specifically for CTA heading text without matching tag name into group 1
    hMatch =
      html.match(/<h[1-6][^>]*>([\s\S]*?Start Your Next Fit-Out[\s\S]*?)<\/h[1-6]>/i) ||
      html.match(/<(?:h[1-6]|div)[^>]*class=["'][^"']*cta-heading[^"']*["'][^>]*>([\s\S]*?)<\/(?:h[1-6]|div)>/i);
  }
  if (hMatch) {
    heading = stripTags(hMatch[1]);
  }

  let line = null;
  const lineMatch =
    scope.match(/<p[^>]*class=["'][^"']*(?:cta-paragraph|paragraph-large|text-size-large)[^"']*["'][^>]*>([\s\S]*?)<\/p>/i) ||
    scope.match(/<p[^>]*>([\s\S]*?Planning a commercial project\?[\s\S]*?)<\/p>/i) ||
    html.match(/<p[^>]*>([\s\S]*?Planning a commercial project\?[\s\S]*?)<\/p>/i);
  if (lineMatch) {
    line = stripTags(lineMatch[1]);
  }

  let buttonText = null;
  let buttonHref = null;
  // Match CTA button supporting both href before class and class before href
  const btnTagMatch =
    scope.match(/<a\b([^>]*\bclass=["'][^"']*primary-button[^"']*["'][^>]*)>([\s\S]*?)<\/a>/i) ||
    scope.match(/<a\b([^>]*\bhref=["'][^"']*\/contact[^"']*["'][^>]*)>([\s\S]*?)<\/a>/i);
  if (btnTagMatch) {
    const attrs = btnTagMatch[1];
    const hrefMatch = attrs.match(/href=["']([^"']*)["']/i);
    buttonHref = hrefMatch ? hrefMatch[1].trim() : null;
    buttonText = stripTags(btnTagMatch[2]);
  }

  return {
    heading,
    line,
    buttonText,
    buttonHref,
    present: Boolean(heading && heading.includes('Start Your Next Fit-Out'))
  };
}

export function getFaqs(html) {
  const faqs = [];

  // Match FAQ question blocks without rigid closing div count, stopping at next FAQ item or container close
  const faqBlockRegex = /<div[^>]*class=["'][^"']*\bfaq-(?:question|item)(?![a-zA-Z0-9_-])[^"']*["'][^>]*>([\s\S]*?)(?=<div[^>]*class=["'][^"']*\bfaq-(?:question|item)(?![a-zA-Z0-9_-])|<\/section>|<footer|<\/body|$)/gi;
  let blockMatch;

  while ((blockMatch = faqBlockRegex.exec(html)) !== null) {
    const block = blockMatch[1];
    const qMatch =
      block.match(/<div[^>]*class=["'][^"']*(?:heading-four|faq-question-upper)[^"']*["'][^>]*>([\s\S]*?)<\/div>/i) ||
      block.match(/<h[3-6][^>]*>([\s\S]*?)<\/h[3-6]>/i) ||
      block.match(/<summary[^>]*>([\s\S]*?)<\/summary>/i);
    const aMatch =
      block.match(/<div[^>]*class=["'][^"']*(?:faq-question-lower|paragraph-regular)[^"']*["'][^>]*>([\s\S]*?)<\/div>/i) ||
      block.match(/<p[^>]*>([\s\S]*?)<\/p>/i);

    if (qMatch && aMatch) {
      faqs.push({
        q: stripTags(qMatch[1]),
        a: stripTags(aMatch[1])
      });
    }
  }

  // Scoped FAQ section heading extraction
  const faqSectionMatch =
    html.match(/<section[^>]*class=["'][^"']*(?:faq-layout-(?:one|two|three)|faq)[^"']*["'][\s\S]*?<\/section>/i) ||
    html.match(/<div[^>]*class=["'][^"']*faq[^"']*["'][\s\S]*?<\/div>\s*<\/div>/i);
  const scope = faqSectionMatch ? faqSectionMatch[0] : html;

  // Find FAQ section heading without capturing tag name or jumping across multiple <h2> tags
  const headingMatch =
    scope.match(/<(?:h[1-4])[^>]*class=["'][^"']*faq[^"']*["'][^>]*>([\s\S]*?)<\/(?:h[1-4])>/i) ||
    scope.match(/<h[1-4][^>]*>((?:(?!<\/h[1-4]>)[\s\S])*?FAQs?[\s\S]*?)<\/h[1-4]>/i) ||
    scope.match(/<h[1-4][^>]*>((?:(?!<\/h[1-4]>)[\s\S])*?Looking for[\s\S]*?)<\/h[1-4]>/i) ||
    scope.match(/<div[^>]*class=["'][^"']*faq-layout-one-title[^"']*["'][^>]*><h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/i);
  const sectionHeading = headingMatch ? stripTags(headingMatch[1]) : null;

  return {
    sectionHeading,
    items: faqs
  };
}

export function getInternalLinks(html) {
  const links = [];
  const linkRegex = /<a[^>]+href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;

  while ((match = linkRegex.exec(html)) !== null) {
    const href = match[1].trim();
    const text = stripTags(match[2]);

    // Skip mailto, tel, javascript, hash-only, and external links
    if (
      !href ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('javascript:') ||
      href.startsWith('#') ||
      href.startsWith('http://') ||
      href.startsWith('https://')
    ) {
      continue;
    }

    links.push({ href, text });
  }

  return links;
}

export function parseHtml(html) {
  return {
    title: getTitle(html),
    canonicalUrl: getCanonicalUrl(html),
    headings: getHeadings(html),
    capabilities: getCapabilities(html),
    buttons: getButtons(html),
    primaryButtons: getPrimaryButtonLinks(html),
    closingCta: getClosingCtaBanner(html),
    faqs: getFaqs(html),
    internalLinks: getInternalLinks(html)
  };
}

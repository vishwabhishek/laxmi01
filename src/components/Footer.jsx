import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer" style={{ backgroundColor: "var(--color--darkest)", color: "var(--color--lightest)", padding: "5rem 4rem 2.5rem" }}>
      <div style={{ maxWidth: "var(--site-width--site-max-width, 1440px)", margin: "0 auto" }}>
        {/* Upper Footer Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "3.5rem",
            paddingBottom: "4rem"
          }}
        >
          {/* Brand & Newsletter Column */}
          <div>
            <Link to="/" style={{ display: "inline-block", marginBottom: "1.5rem" }}>
              <img
                src="/assets/668bc50b9438984e5d12880e_Frame%201%20(1).svg"
                alt="Woodworked"
                style={{
                  height: "32px",
                  filter: "brightness(0) invert(1)"
                }}
              />
            </Link>
            <p style={{ color: "var(--color--light, #eed5b9)", fontSize: "0.9375rem", lineHeight: "1.7", maxWidth: "340px", marginBottom: "2rem" }}>
              Bespoke joinery, master carpentry, and custom timber architectural fabrication handcrafted with generational passion since 1967.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" style={{ color: "var(--color--lightest)" }} aria-label="Facebook">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" style={{ color: "var(--color--lightest)" }} aria-label="LinkedIn">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.86 0 1.54-.69 1.54-1.55a1.55 1.55 0 0 0-3.08 0c0 .86.68 1.55 1.54 1.55m1.39 9.74v-8.37H5.07v8.37h2.78z"/></svg>
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" style={{ color: "var(--color--lightest)" }} aria-label="Instagram">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 style={{ fontFamily: "var(--font--heading-font)", fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color--accent, #e1af87)", marginBottom: "1.25rem" }}>
              Navigate
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              <li><Link to="/" style={{ color: "var(--color--lightest)", textDecoration: "none", fontSize: "0.9375rem" }}>Home</Link></li>
              <li><Link to="/about" style={{ color: "var(--color--lightest)", textDecoration: "none", fontSize: "0.9375rem" }}>About</Link></li>
              <li><Link to="/portfolio" style={{ color: "var(--color--lightest)", textDecoration: "none", fontSize: "0.9375rem" }}>Portfolio</Link></li>
              <li><Link to="/services" style={{ color: "var(--color--lightest)", textDecoration: "none", fontSize: "0.9375rem" }}>Services</Link></li>
              <li><Link to="/contact" style={{ color: "var(--color--lightest)", textDecoration: "none", fontSize: "0.9375rem" }}>Contact</Link></li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 style={{ fontFamily: "var(--font--heading-font)", fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color--accent, #e1af87)", marginBottom: "1.25rem" }}>
              Services
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              <li><Link to="/services/kitchens" style={{ color: "var(--color--lightest)", textDecoration: "none", fontSize: "0.9375rem" }}>Kitchens</Link></li>
              <li><Link to="/services/bathrooms" style={{ color: "var(--color--lightest)", textDecoration: "none", fontSize: "0.9375rem" }}>Bathrooms</Link></li>
              <li><Link to="/services/furniture" style={{ color: "var(--color--lightest)", textDecoration: "none", fontSize: "0.9375rem" }}>Furniture</Link></li>
              <li><Link to="/services/flooring" style={{ color: "var(--color--lightest)", textDecoration: "none", fontSize: "0.9375rem" }}>Flooring</Link></li>
              <li><Link to="/services/buildings" style={{ color: "var(--color--lightest)", textDecoration: "none", fontSize: "0.9375rem" }}>Buildings</Link></li>
            </ul>
          </div>
        </div>

        {/* Lower Bar */}
        <div
          style={{
            borderTop: "1px solid var(--color--dark, #89684f)",
            paddingTop: "2rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            fontSize: "0.8125rem",
            color: "var(--color--light, #eed5b9)"
          }}
        >
          <div>
            © Copyright Woodworked {new Date().getFullYear()}. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <Link to="/template-help/licences" style={{ color: "inherit", textDecoration: "none" }}>
              Licensing
            </Link>
            <Link to="/template-help/changelog" style={{ color: "inherit", textDecoration: "none" }}>
              Changelog
            </Link>
            <span>Built by FlowForge</span>
            <span>Powered by Webflow</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

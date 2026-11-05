import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route transition
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="header-logo-wrapper">
            <Link to="/" className="header-logo-link" aria-label="Woodworked Home">
              <img
                src="/assets/668bc50b9438984e5d12880e_Frame%201%20(1).svg"
                alt="Woodworked"
                className="header-logo"
                style={{ height: "28px", width: "auto" }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="header-nav-menu" style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `header-nav-link ${isActive ? "w--current active" : ""}`
              }
              style={{ textDecoration: "none", fontSize: "0.9375rem" }}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `header-nav-link ${isActive ? "w--current active" : ""}`
              }
              style={{ textDecoration: "none", fontSize: "0.9375rem" }}
            >
              About
            </NavLink>
            <NavLink
              to="/portfolio"
              className={({ isActive }) =>
                `header-nav-link ${isActive ? "w--current active" : ""}`
              }
              style={{ textDecoration: "none", fontSize: "0.9375rem" }}
            >
              Portfolio
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `header-nav-link ${isActive ? "w--current active" : ""}`
              }
              style={{ textDecoration: "none", fontSize: "0.9375rem" }}
            >
              Services
            </NavLink>
          </nav>

          {/* Social Icons & Desktop CTA */}
          <div className="header-social-wrapper" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div className="social-links-desktop" style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                className="header-social-link"
                aria-label="Facebook"
                style={{ color: "var(--color--darkest)", display: "flex", alignItems: "center" }}
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="header-social-link"
                aria-label="LinkedIn"
                style={{ color: "var(--color--darkest)", display: "flex", alignItems: "center" }}
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.86 0 1.54-.69 1.54-1.55a1.55 1.55 0 0 0-3.08 0c0 .86.68 1.55 1.54 1.55m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="header-social-link"
                aria-label="Instagram"
                style={{ color: "var(--color--darkest)", display: "flex", alignItems: "center" }}
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>

            <PrimaryButton to="/contact" variant="darkest" style={{ padding: "0.625rem 1.25rem", borderRadius: "0.5rem" }}>
              Get a Quote
            </PrimaryButton>

            {/* Mobile Hamburger Button */}
            <button
              className="header-menu-button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.5rem",
                flexDirection: "column",
                gap: "5px"
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  backgroundColor: "var(--color--darkest)",
                  transition: "transform 0.3s ease",
                  transform: isOpen ? "rotate(45deg) translate(5px, 5px)" : "none"
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  backgroundColor: "var(--color--darkest)",
                  transition: "opacity 0.3s ease",
                  opacity: isOpen ? 0 : 1
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  backgroundColor: "var(--color--darkest)",
                  transition: "transform 0.3s ease",
                  transform: isOpen ? "rotate(-45deg) translate(5px, -5px)" : "none"
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="mobile-nav-drawer" style={{ display: "flex" }}>
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="header-nav-link"
            style={{ textDecoration: "none", fontSize: "1.125rem", padding: "0.5rem 0" }}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className="header-nav-link"
            style={{ textDecoration: "none", fontSize: "1.125rem", padding: "0.5rem 0" }}
          >
            About
          </NavLink>
          <NavLink
            to="/portfolio"
            onClick={() => setIsOpen(false)}
            className="header-nav-link"
            style={{ textDecoration: "none", fontSize: "1.125rem", padding: "0.5rem 0" }}
          >
            Portfolio
          </NavLink>
          <NavLink
            to="/services"
            onClick={() => setIsOpen(false)}
            className="header-nav-link"
            style={{ textDecoration: "none", fontSize: "1.125rem", padding: "0.5rem 0" }}
          >
            Services
          </NavLink>
          <div style={{ paddingTop: "0.5rem" }}>
            <PrimaryButton
              to="/contact"
              variant="darkest"
              onClick={() => setIsOpen(false)}
              style={{ width: "100%", justifyContent: "center" }}
            >
              Get a Quote
            </PrimaryButton>
          </div>
        </div>
      )}
    </>
  );
}

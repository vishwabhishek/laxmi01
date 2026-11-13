import React, { useState } from "react";
import { faqs as defaultFaqs } from "../data/siteData";

export default function FaqAccordion({ items = defaultFaqs, title = "Looking for some answers?", subtitle = "FAQs" }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section className="faq-layout-one" style={{ padding: "5rem 4rem" }}>
      <div style={{ maxWidth: "var(--site-width--site-max-width, 1440px)", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          {subtitle && (
            <div
              style={{
                fontFamily: "var(--font--heading-font)",
                fontSize: "0.875rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color--darkest)",
                marginBottom: "0.75rem",
                fontWeight: 700
              }}
            >
              {subtitle}
            </div>
          )}
          <h2
            style={{
              fontFamily: "var(--font--heading-font)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              margin: 0,
              color: "var(--color--darkest)"
            }}
          >
            {title}
          </h2>
        </div>

        <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  border: "1px solid var(--color--light, #eed5b9)",
                  borderRadius: "var(--spacing--xs, 0.75rem)",
                  backgroundColor: "var(--color--lightest, #f4e6d5)",
                  overflow: "hidden",
                  transition: "border-color 0.3s ease"
                }}
              >
                <button
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1.75rem 2rem",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    fontFamily: "var(--font--heading-font)",
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: "var(--color--darkest)"
                  }}
                >
                  <span>{item.question}</span>
                  <span
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      color: "var(--color--dark, #89684f)"
                    }}
                  >
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                <div
                  className="faq-answer-wrapper"
                  style={{
                    maxHeight: isOpen ? "400px" : "0",
                    opacity: isOpen ? 1 : 0,
                    padding: isOpen ? "0 2rem 2rem" : "0 2rem",
                    color: "var(--color--darkest)",
                    fontSize: "0.9375rem",
                    lineHeight: "1.7"
                  }}
                >
                  <p style={{ margin: 0 }}>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

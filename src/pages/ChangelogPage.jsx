import React from "react";

export default function ChangelogPage() {
  return (
    <main style={{ padding: "10rem 4rem 6rem" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <h1
          style={{
            fontFamily: "var(--font--heading-font)",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            margin: "0 0 1.5rem",
            color: "var(--color--darkest)"
          }}
        >
          Changelog
        </h1>
        <p style={{ fontSize: "1.125rem", lineHeight: "1.8", color: "var(--color--darkest)", marginBottom: "3rem" }}>
          Stay up to date with new features, layout improvements, and design system enhancements.
        </p>

        <div
          style={{
            border: "1px solid var(--color--light, #eed5b9)",
            borderRadius: "var(--spacing--xs, 0.75rem)",
            padding: "2.5rem",
            backgroundColor: "var(--color--lightest)"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2
              style={{
                fontFamily: "var(--font--heading-font)",
                fontSize: "1.5rem",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                margin: 0,
                color: "var(--color--darkest)"
              }}
            >
              Version 1.0.0
            </h2>
            <span style={{ fontSize: "0.875rem", color: "var(--color--dark, #89684f)", fontWeight: 600 }}>
              Official Release
            </span>
          </div>
          <ul style={{ paddingLeft: "1.25rem", margin: 0, fontSize: "1rem", lineHeight: "1.8", color: "var(--color--darkest)" }}>
            <li>Complete reverse engineering and high-fidelity component architecture.</li>
            <li>All 19 public routes reconstructed with full responsive parity.</li>
            <li>Interactive mobile navigation drawer, testimonial carousel, and FAQ accordion.</li>
            <li>Integrated client-side contact form validation with state feedback.</li>
            <li>Custom cubic-bezier micro-animations and typography scales.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

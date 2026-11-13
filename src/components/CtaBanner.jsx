import React from "react";
import PrimaryButton from "./PrimaryButton";

export default function CtaBanner({
  title = "Partner With Us on Your Next Turnkey Fit-Out Project",
  subtitle = "Share your Bill of Quantities (BOQ), tender drawings, or project specification packages for a comprehensive execution proposal and mobilization schedule.",
  buttonText = "Submit BOQ / Request Tender Proposal",
  buttonLink = "/contact"
}) {
  return (
    <section className="cta-layout-one" style={{ padding: "5rem 4rem" }}>
      <div
        style={{
          maxWidth: "var(--site-width--site-max-width, 1440px)",
          margin: "0 auto",
          backgroundColor: "var(--color--darkest, #3e3128)",
          color: "var(--color--lightest, #f4e6d5)",
          borderRadius: "var(--spacing--xs, 0.75rem)",
          padding: "5rem 3rem",
          textAlign: "center"
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font--heading-font)",
            fontSize: "clamp(2rem, 4vw, 3.25rem)",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            margin: "0 0 1.25rem",
            color: "var(--color--lightest)"
          }}
        >
          {title}
        </h2>
        <p
          style={{
            maxWidth: "600px",
            margin: "0 auto 2.5rem",
            fontSize: "1.0625rem",
            lineHeight: "1.7",
            color: "var(--color--light, #eed5b9)"
          }}
        >
          {subtitle}
        </p>
        <PrimaryButton to={buttonLink} variant="lightest" style={{ padding: "0.875rem 2.25rem" }}>
          {buttonText}
        </PrimaryButton>
      </div>
    </section>
  );
}

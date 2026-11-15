import React from "react";
import PrimaryButton from "../components/PrimaryButton";

export default function NotFoundPage() {
  return (
    <main
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10rem 2rem 6rem",
        textAlign: "center"
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          backgroundColor: "var(--color--lightest, #f4e6d5)",
          border: "1px solid var(--color--light, #eed5b9)",
          borderRadius: "var(--spacing--xs, 0.75rem)",
          padding: "4rem 3rem"
        }}
      >
        <div
          style={{
            fontFamily: "var(--font--heading-font)",
            fontSize: "0.875rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color--darkest)",
            marginBottom: "1rem",
            fontWeight: 700
          }}
        >
          Error
        </div>
        <h3
          style={{
            fontFamily: "var(--font--heading-font)",
            fontSize: "clamp(3rem, 6vw, 4.5rem)",
            margin: "0 0 0.5rem",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            color: "var(--color--darkest)"
          }}
        >
          Error 404
        </h3>
        <h4
          style={{
            fontFamily: "var(--font--heading-font)",
            fontSize: "1.5rem",
            margin: "0 0 1rem",
            color: "var(--color--darkest)"
          }}
        >
          Page not found.
        </h4>
        <p style={{ fontSize: "1.125rem", lineHeight: "1.7", color: "var(--color--darkest)", margin: "0 0 2.5rem" }}>
          This page doesn't exist or has moved.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <PrimaryButton to="/" variant="darkest" style={{ padding: "0.875rem 2.25rem" }}>
            Return Home
          </PrimaryButton>
          <PrimaryButton to="/contact" variant="darkest" style={{ padding: "0.875rem 2.25rem" }}>
            Get a Quote
          </PrimaryButton>
        </div>
      </div>
    </main>
  );
}

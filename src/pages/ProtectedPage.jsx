import React, { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";

export default function ProtectedPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      setError(true);
    } else {
      setError(true); // Demo protection
    }
  };

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
          maxWidth: "480px",
          width: "100%",
          backgroundColor: "var(--color--lightest, #f4e6d5)",
          border: "1px solid var(--color--light, #eed5b9)",
          borderRadius: "var(--spacing--xs, 0.75rem)",
          padding: "3.5rem 2.5rem"
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
          [&nbsp;&nbsp;&nbsp;Protected Page&nbsp;&nbsp;&nbsp;]
        </div>
        <h1
          style={{
            fontFamily: "var(--font--heading-font)",
            fontSize: "1.75rem",
            margin: "0 0 1rem",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            color: "var(--color--darkest)"
          }}
        >
          Password Required
        </h1>
        <p style={{ fontSize: "0.9375rem", lineHeight: "1.6", color: "var(--color--dark, #89684f)", margin: "0 0 2rem" }}>
          This page is password protected. Please enter the access passphrase below.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            style={{
              padding: "0.875rem 1.25rem",
              borderRadius: "var(--spacing--xs, 0.75rem)",
              border: error ? "1px solid #d9534f" : "1px solid var(--color--light, #eed5b9)",
              backgroundColor: "var(--color--lightest)",
              color: "var(--color--darkest)",
              fontSize: "0.9375rem",
              outline: "none"
            }}
          />
          {error && (
            <span style={{ color: "#d9534f", fontSize: "0.75rem" }}>
              Incorrect password. Please try again.
            </span>
          )}
          <PrimaryButton type="submit" variant="darkest" style={{ width: "100%", padding: "0.875rem", justifyContent: "center" }}>
            Submit
          </PrimaryButton>
        </form>
      </div>
    </main>
  );
}

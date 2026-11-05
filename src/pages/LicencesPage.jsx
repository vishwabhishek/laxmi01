import React from "react";
import { Link } from "react-router-dom";

export default function LicencesPage() {
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
          Licences
        </h1>
        <p style={{ fontSize: "1.125rem", lineHeight: "1.8", color: "var(--color--darkest)", marginBottom: "3rem" }}>
          All graphical assets in this template are licensed for personal and commercial use. If you’d like to use a specific asset, please check the license below.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          <div
            style={{
              border: "1px solid var(--color--light, #eed5b9)",
              borderRadius: "var(--spacing--xs, 0.75rem)",
              padding: "2.5rem",
              backgroundColor: "var(--color--lightest)"
            }}
          >
            <h3 style={{ fontFamily: "var(--font--heading-font)", fontSize: "1.5rem", margin: "0 0 1rem", color: "var(--color--darkest)" }}>
              Photography & Imagery
            </h3>
            <p style={{ margin: 0, fontSize: "1rem", lineHeight: "1.7", color: "var(--color--darkest)" }}>
              All photos used across the Woodworked website are sourced from <strong>Unsplash</strong> and <strong>Pexels</strong> under royalty-free, commercial-friendly licenses. Photography credits to HeyHo, Lisa Anna, Skylar Kang, Cristian Rojas, and contributing artisan photographers.
            </p>
          </div>

          <div
            style={{
              border: "1px solid var(--color--light, #eed5b9)",
              borderRadius: "var(--spacing--xs, 0.75rem)",
              padding: "2.5rem",
              backgroundColor: "var(--color--lightest)"
            }}
          >
            <h3 style={{ fontFamily: "var(--font--heading-font)", fontSize: "1.5rem", margin: "0 0 1rem", color: "var(--color--darkest)" }}>
              Typography
            </h3>
            <p style={{ margin: 0, fontSize: "1rem", lineHeight: "1.7", color: "var(--color--darkest)" }}>
              The typefaces powering this site are <strong>Plus Jakarta Sans</strong> (designed by Gumpita Rahayu & Tokotype) and <strong>DM Sans</strong> (designed by Colophon Foundry), licensed under the open-source SIL Open Font License (OFL) and distributed via Google Fonts.
            </p>
          </div>

          <div
            style={{
              border: "1px solid var(--color--light, #eed5b9)",
              borderRadius: "var(--spacing--xs, 0.75rem)",
              padding: "2.5rem",
              backgroundColor: "var(--color--lightest)"
            }}
          >
            <h3 style={{ fontFamily: "var(--font--heading-font)", fontSize: "1.5rem", margin: "0 0 1rem", color: "var(--color--darkest)" }}>
              Icons & Vector Graphics
            </h3>
            <p style={{ margin: 0, fontSize: "1rem", lineHeight: "1.7", color: "var(--color--darkest)" }}>
              Vector logos, brand seals, and navigation glyphs are proprietary to Woodworked and FlowForge, optimized and served as scalable vector graphics.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

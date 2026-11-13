import React, { useState } from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import CtaBanner from "../components/CtaBanner";
import { projects } from "../data/siteData";

export default function PortfolioPage() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Turnkey", "Commercial", "Joinery", "Acoustic", "Modular"];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) =>
          p.tag.toLowerCase().includes(filter.toLowerCase()) ||
          p.title.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <main>
      {/* 1. HERO LAYOUT THREE */}
      <section className="hero-layout-three" style={{ padding: "10rem 4rem 3rem" }}>
        <div style={{ maxWidth: "var(--site-width--site-max-width, 1440px)", margin: "0 auto" }}>
          <div style={{ marginBottom: "1rem" }}>
            <span
              style={{
                fontFamily: "var(--font--heading-font)",
                fontSize: "0.875rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color--darkest)",
                fontWeight: 700
              }}
            >
              Enterprise Project Portfolio
            </span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font--heading-font)",
              fontSize: "clamp(2.5rem, 5vw, 4.25rem)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              margin: "0 0 1.5rem",
              color: "var(--color--darkest)"
            }}
          >
            Commercial Fit-Outs &amp; Executed Projects
          </h1>
        </div>
      </section>

      {/* 2. TEXT INTRO & CATEGORY FILTER */}
      <section className="text-layout-eight" style={{ padding: "0 4rem 4rem" }}>
        <div
          style={{
            maxWidth: "var(--site-width--site-max-width, 1440px)",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "2rem"
          }}
        >
          <div style={{ maxWidth: "680px" }}>
            <h2
              style={{
                fontFamily: "var(--font--heading-font)",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                margin: "0 0 1rem",
                color: "var(--color--darkest)"
              }}
            >
              Contracting Execution Across Corporate &amp; Institutional Facilities
            </h2>
            <p style={{ margin: 0, fontSize: "1.0625rem", lineHeight: "1.7", color: "var(--color--darkest)" }}>
              Demonstrating full-scope turnkey fit-outs, high-volume modular workstation deployments, high-performance acoustic panelling, and executive architectural millwork executed to tight milestone deadlines and stringent tender specifications.
            </p>
          </div>

          {/* Filter Pills */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: "0.625rem 1.25rem",
                  borderRadius: "var(--spacing--xs, 0.75rem)",
                  border: "1px solid var(--color--light, #eed5b9)",
                  backgroundColor: filter === cat ? "var(--color--darkest)" : "var(--color--lightest)",
                  color: filter === cat ? "var(--color--lightest)" : "var(--color--darkest)",
                  cursor: "pointer",
                  fontFamily: "var(--font--heading-font)",
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  transition: "all 0.3s ease"
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PORTFOLIO GRID (PORTFOLIO LAYOUT TWO) */}
      <section className="portfolio-layout-two" style={{ padding: "2rem 4rem 6rem" }}>
        <div style={{ maxWidth: "var(--site-width--site-max-width, 1440px)", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
              gap: "3rem"
            }}
          >
            {filteredProjects.map((proj) => (
              <Link
                key={proj.id}
                to={`/projects/${proj.slug}`}
                className="portfolio-layout-two-card"
                style={{
                  textDecoration: "none",
                  backgroundColor: "var(--color--lightest, #f4e6d5)",
                  border: "1px solid var(--color--light, #eed5b9)",
                  borderRadius: "var(--spacing--xs, 0.75rem)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div style={{ height: "360px", overflow: "hidden" }}>
                  <img
                    src={proj.heroImage}
                    alt={proj.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: "2.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span
                        style={{
                          fontFamily: "var(--font--heading-font)",
                          fontSize: "0.75rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: "var(--color--dark, #89684f)",
                          fontWeight: 700
                        }}
                      >
                        {proj.tag}
                      </span>
                      {proj.trades && (
                        <span
                          style={{
                            fontSize: "0.6875rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            backgroundColor: "var(--color--darkest)",
                            color: "var(--color--lightest)",
                            padding: "0.2rem 0.5rem",
                            borderRadius: "4px"
                          }}
                        >
                          Turnkey Fit-Out
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: "0.875rem", color: "var(--color--dark, #89684f)" }}>
                      {proj.location}
                    </span>
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font--heading-font)",
                      fontSize: "1.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      margin: "0 0 0.75rem",
                      color: "var(--color--darkest)"
                    }}
                  >
                    {proj.title}
                  </h2>
                  <p style={{ margin: "0 0 1.5rem", fontSize: "0.9375rem", lineHeight: "1.6", color: "var(--color--darkest)" }}>
                    {proj.summary}
                  </p>
                  <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--color--darkest)" }}>
                    View Case Study ↗
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA BANNER */}
      <CtaBanner
        title="Share your tender or BOQ for project estimation"
        subtitle="Send us your drawing sets, tender schedules, or joinery elevations for rapid feasibility study and item-rate pricing."
        buttonText="Submit BOQ / Contact Us"
      />
    </main>
  );
}

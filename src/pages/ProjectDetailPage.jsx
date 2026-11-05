import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import CtaBanner from "../components/CtaBanner";
import { projects } from "../data/siteData";

export default function ProjectDetailPage({ forcedSlug }) {
  const { slug: paramSlug } = useParams();
  const slug = forcedSlug || paramSlug;

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  return (
    <main>
      {/* 1. PROJECT HERO & METADATA BAR */}
      <section className="portfolio-page-layout" style={{ padding: "10rem 4rem 3rem" }}>
        <div style={{ maxWidth: "var(--site-width--site-max-width, 1440px)", margin: "0 auto" }}>
          {/* Breadcrumb */}
          <div style={{ marginBottom: "1.25rem", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>
            <Link to="/portfolio" style={{ color: "var(--color--dark, #89684f)", textDecoration: "none" }}>
              Portfolio
            </Link>
            <span style={{ margin: "0 0.5rem", color: "var(--color--light, #eed5b9)" }}>/</span>
            <span style={{ color: "var(--color--darkest)" }}>{project.title}</span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font--heading-font)",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              margin: "0 0 1.5rem",
              color: "var(--color--darkest)"
            }}
          >
            {project.title}
          </h1>

          <p
            className="text-size-large"
            style={{
              maxWidth: "800px",
              fontSize: "1.375rem",
              lineHeight: "1.6",
              color: "var(--color--darkest)",
              margin: "0 0 3rem",
              fontWeight: 500
            }}
          >
            {project.summary}
          </p>

          {/* Project Metadata Ribbon */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "2rem",
              padding: "2rem 0",
              borderTop: "1px solid var(--color--light, #eed5b9)",
              borderBottom: "1px solid var(--color--light, #eed5b9)",
              marginBottom: "4rem"
            }}
          >
            <div>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color--dark, #89684f)", marginBottom: "0.375rem", fontWeight: 700 }}>
                Location
              </div>
              <div style={{ fontFamily: "var(--font--heading-font)", fontSize: "1.125rem", fontWeight: 600, color: "var(--color--darkest)" }}>
                {project.location}
              </div>
            </div>

            <div>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color--dark, #89684f)", marginBottom: "0.375rem", fontWeight: 700 }}>
                Completion Date
              </div>
              <div style={{ fontFamily: "var(--font--heading-font)", fontSize: "1.125rem", fontWeight: 600, color: "var(--color--darkest)" }}>
                {project.date}
              </div>
            </div>

            <div>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color--dark, #89684f)", marginBottom: "0.375rem", fontWeight: 700 }}>
                Discipline / Scope
              </div>
              <div style={{ fontFamily: "var(--font--heading-font)", fontSize: "1.125rem", fontWeight: 600, color: "var(--color--darkest)" }}>
                {project.tag} Joinery
              </div>
            </div>

            <div>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color--dark, #89684f)", marginBottom: "0.375rem", fontWeight: 700 }}>
                Timber Origin
              </div>
              <div style={{ fontFamily: "var(--font--heading-font)", fontSize: "1.125rem", fontWeight: 600, color: "var(--color--darkest)" }}>
                FSC Certified European Hardwood
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FULL-BLEED FEATURE IMAGE */}
      <section style={{ padding: "0 4rem 5rem" }}>
        <div
          style={{
            maxWidth: "var(--site-width--site-max-width, 1440px)",
            margin: "0 auto",
            borderRadius: "var(--spacing--xs, 0.75rem)",
            overflow: "hidden",
            height: "clamp(380px, 60vh, 680px)"
          }}
        >
          <img
            src={project.heroImage}
            alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </section>

      {/* 3. CASE STUDY NARRATIVE */}
      <section style={{ padding: "3rem 4rem 5rem" }}>
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            fontSize: "1.125rem",
            lineHeight: "1.8",
            color: "var(--color--darkest)"
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font--heading-font)",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              margin: 0
            }}
          >
            The Architectural Vision & Execution
          </h2>
          <p style={{ margin: 0 }}>
            {project.description}
          </p>
          <p style={{ margin: 0 }}>
            Working in tight coordination with the interior design studio, our team precision-cut every timber face to harmonize with natural lighting angles throughout the day. Dovetail joints and grain continuity across drawer faces ensure a calm, unified visual rhythm.
          </p>
        </div>
      </section>

      {/* 4. MULTI-IMAGE GALLERY */}
      <section style={{ padding: "2rem 4rem 6rem" }}>
        <div style={{ maxWidth: "var(--site-width--site-max-width, 1440px)", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem"
            }}
          >
            {project.gallery.map((imgUrl, idx) => (
              <div
                key={idx}
                style={{
                  height: "360px",
                  borderRadius: "var(--spacing--xs, 0.75rem)",
                  overflow: "hidden",
                  border: "1px solid var(--color--light, #eed5b9)"
                }}
              >
                <img
                  src={imgUrl}
                  alt={`${project.title} gallery photo ${idx + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA BANNER */}
      <CtaBanner
        title="Inspired by this project?"
        subtitle="Schedule an architect consultation or visit our workshop to see live timber samples."
        buttonText="Enquire Now"
      />
    </main>
  );
}

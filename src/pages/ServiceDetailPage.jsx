import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import TestimonialSlider from "../components/TestimonialSlider";
import FaqAccordion from "../components/FaqAccordion";
import CtaBanner from "../components/CtaBanner";
import { services } from "../data/siteData";

export default function ServiceDetailPage({ forcedSlug }) {
  const { slug: paramSlug } = useParams();
  const slug = forcedSlug || paramSlug;

  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <main>
      {/* 1. HERO & BREADCRUMB */}
      <section className="hero-layout-three" style={{ padding: "10rem 4rem 4rem" }}>
        <div style={{ maxWidth: "var(--site-width--site-max-width, 1440px)", margin: "0 auto" }}>
          {/* Breadcrumb */}
          <div style={{ marginBottom: "1.25rem", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>
            <Link to="/services" style={{ color: "var(--color--dark, #89684f)", textDecoration: "none" }}>
              Services
            </Link>
            <span style={{ margin: "0 0.5rem", color: "var(--color--light, #eed5b9)" }}>/</span>
            <span style={{ color: "var(--color--darkest)" }}>{service.title}</span>
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
            {service.title}
          </h1>

          <p
            style={{
              maxWidth: "720px",
              fontSize: "1.25rem",
              lineHeight: "1.6",
              fontWeight: 500,
              color: "var(--color--darkest)",
              margin: "0 0 2rem"
            }}
          >
            {service.summary}
          </p>

          <PrimaryButton to="/contact" variant="darkest">
            Enquire About {service.title}
          </PrimaryButton>
        </div>
      </section>

      {/* 2. FULL-WIDTH HERO IMAGE */}
      <section style={{ padding: "0 4rem 5rem" }}>
        <div
          style={{
            maxWidth: "var(--site-width--site-max-width, 1440px)",
            margin: "0 auto",
            borderRadius: "var(--spacing--xs, 0.75rem)",
            overflow: "hidden",
            height: "clamp(350px, 50vh, 580px)"
          }}
        >
          <img
            src={service.heroImage}
            alt={service.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </section>

      {/* 3. CRAFTSMANSHIP NARRATIVE */}
      <section style={{ padding: "4rem 4rem" }}>
        <div
          style={{
            maxWidth: "var(--site-width--site-max-width, 1440px)",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "4rem"
          }}
        >
          <div>
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
              [&nbsp;&nbsp;&nbsp;Craftsmanship Methodology&nbsp;&nbsp;&nbsp;]
            </div>
            <h2
              style={{
                fontFamily: "var(--font--heading-font)",
                fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                margin: 0,
                color: "var(--color--darkest)"
              }}
            >
              Tailored for timeless elegance
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", fontSize: "1.0625rem", lineHeight: "1.8" }}>
            <p style={{ margin: 0 }}>
              {service.description}
            </p>
            <p style={{ margin: 0 }}>
              Every installation undergoes strict timber stabilization, ensuring that relative humidity and temperature variations will not compromise joint integrity. We work closely with architects, general contractors, and interior designers to guarantee seamless integration with mechanical, electrical, and plumbing rough-ins.
            </p>
          </div>
        </div>
      </section>

      {/* 4. GALLERY SHOWCASE */}
      <section style={{ padding: "4rem 4rem" }}>
        <div style={{ maxWidth: "var(--site-width--site-max-width, 1440px)", margin: "0 auto" }}>
          <div style={{ marginBottom: "2.5rem" }}>
            <h3
              style={{
                fontFamily: "var(--font--heading-font)",
                fontSize: "1.5rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                margin: 0
              }}
            >
              Detailed Joinery Gallery
            </h3>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem"
            }}
          >
            {service.gallery.map((imgUrl, i) => (
              <div
                key={i}
                style={{
                  height: "320px",
                  borderRadius: "var(--spacing--xs, 0.75rem)",
                  overflow: "hidden",
                  border: "1px solid var(--color--light, #eed5b9)"
                }}
              >
                <img
                  src={imgUrl}
                  alt={`${service.title} detail ${i + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section style={{ padding: "4rem 4rem" }}>
        <div style={{ maxWidth: "var(--site-width--site-max-width, 1440px)", margin: "0 auto" }}>
          <TestimonialSlider />
        </div>
      </section>

      {/* 6. FAQ ACCORDION */}
      <FaqAccordion title={`Frequently Asked Questions on ${service.title}`} />

      {/* 7. CTA BANNER */}
      <CtaBanner
        title={`Enquire today for ${service.title}`}
        subtitle="Book a workshop consultation or request a bespoke quote tailored to your architectural specifications."
        buttonText="Get a Quote"
      />
    </main>
  );
}

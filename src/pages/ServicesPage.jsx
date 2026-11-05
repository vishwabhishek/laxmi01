import React from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import TestimonialSlider from "../components/TestimonialSlider";
import FaqAccordion from "../components/FaqAccordion";
import CtaBanner from "../components/CtaBanner";
import { services, stats } from "../data/siteData";

export default function ServicesPage() {
  return (
    <main>
      {/* 1. HERO LAYOUT THREE */}
      <section className="hero-layout-three" style={{ padding: "10rem 4rem 4rem" }}>
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
              [&nbsp;&nbsp;&nbsp;Woodworking, Joinery & Carpentry Services&nbsp;&nbsp;&nbsp;]
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
            Our Services
          </h1>
          <p style={{ maxWidth: "680px", fontSize: "1.125rem", lineHeight: "1.75", color: "var(--color--darkest)", margin: 0 }}>
            From full architectural kitchens to bespoke timber-frame outbuildings, we provide turnkey woodworking solutions that elevate every residential and commercial interior.
          </p>
        </div>
      </section>

      {/* 2. TEXT LAYOUT SIX (Work in Numbers) */}
      <section className="text-layout-six" style={{ padding: "4rem 4rem" }}>
        <div style={{ maxWidth: "var(--site-width--site-max-width, 1440px)", margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
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
              [&nbsp;&nbsp;&nbsp;Our work in numbers&nbsp;&nbsp;&nbsp;]
            </div>
            <h2
              style={{
                fontFamily: "var(--font--heading-font)",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                margin: 0
              }}
            >
              Quality experience you can always count on
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "2rem"
            }}
          >
            {stats.map((s, idx) => (
              <div
                key={idx}
                style={{
                  border: "1px solid var(--color--light, #eed5b9)",
                  borderRadius: "var(--spacing--xs, 0.75rem)",
                  padding: "2.5rem 2rem",
                  backgroundColor: "var(--color--lightest, #f4e6d5)",
                  textAlign: "center"
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font--heading-font)",
                    fontSize: "3rem",
                    fontWeight: 800,
                    color: "var(--color--accent, #e1af87)",
                    marginBottom: "0.5rem"
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font--body-font)",
                    fontSize: "0.9375rem",
                    color: "var(--color--darkest)",
                    fontWeight: 600
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SERVICES LISTING CARDS */}
      <section className="services-layout-one" style={{ padding: "4rem 4rem 6rem" }}>
        <div style={{ maxWidth: "var(--site-width--site-max-width, 1440px)", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "3rem"
            }}
          >
            {services.map((svc, i) => (
              <div
                key={svc.id}
                style={{
                  border: "1px solid var(--color--light, #eed5b9)",
                  borderRadius: "var(--spacing--xs, 0.75rem)",
                  backgroundColor: "var(--color--lightest, #f4e6d5)",
                  overflow: "hidden",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                  alignItems: "center"
                }}
              >
                <div style={{ height: "360px", overflow: "hidden" }}>
                  <img
                    src={svc.heroImage}
                    alt={svc.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: "3.5rem" }}>
                  <div
                    style={{
                      fontFamily: "var(--font--heading-font)",
                      fontSize: "0.8125rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "var(--color--dark, #89684f)",
                      marginBottom: "0.75rem",
                      fontWeight: 700
                    }}
                  >
                    [&nbsp;{svc.tag}&nbsp;]
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font--heading-font)",
                      fontSize: "clamp(2rem, 3vw, 2.75rem)",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      margin: "0 0 1rem",
                      color: "var(--color--darkest)"
                    }}
                  >
                    {svc.title}
                  </h2>
                  <h3
                    style={{
                      fontFamily: "var(--font--body-font)",
                      fontSize: "1.125rem",
                      fontWeight: 600,
                      margin: "0 0 1rem",
                      color: "var(--color--darkest)"
                    }}
                  >
                    {svc.summary}
                  </h3>
                  <p style={{ fontSize: "1rem", lineHeight: "1.7", color: "var(--color--darkest)", margin: "0 0 2rem" }}>
                    {svc.description}
                  </p>
                  <PrimaryButton to={`/services/${svc.slug}`} variant="darkest">
                    View Service Details ↗
                  </PrimaryButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIAL SLIDER */}
      <section style={{ padding: "2rem 4rem" }}>
        <div style={{ maxWidth: "var(--site-width--site-max-width, 1440px)", margin: "0 auto" }}>
          <TestimonialSlider />
        </div>
      </section>

      {/* 5. FAQ ACCORDION */}
      <FaqAccordion />

      {/* 6. CTA BANNER */}
      <CtaBanner />
    </main>
  );
}

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
            <h1
              style={{
                fontFamily: "var(--font--heading-font)",
                fontSize: "0.875rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color--darkest)",
                fontWeight: 700,
                margin: 0
              }}
            >
              Commercial Fit-Outs &amp; Specialist Joinery
            </h1>
          </div>
          <h2
            style={{
              fontFamily: "var(--font--heading-font)",
              fontSize: "clamp(2.5rem, 5vw, 4.25rem)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              margin: "0 0 1.5rem",
              color: "var(--color--darkest)"
            }}
          >
            Services
          </h2>
          <p style={{ maxWidth: "750px", fontSize: "1.125rem", lineHeight: "1.75", color: "var(--color--darkest)", margin: 0 }}>
            Full-scope turnkey interior contracting, architectural joinery, acoustic wall and ceiling systems, and modular workstation deployments for corporate headquarters, BFSI institutions, data centres, and hospitality facilities.
          </p>
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
                    {svc.tag}
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

      {/* 5. FAQ ACCORDION */}
      <FaqAccordion />

      {/* 6. CTA BANNER */}
      <CtaBanner />
    </main>
  );
}

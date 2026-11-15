import React from "react";
import PrimaryButton from "../components/PrimaryButton";
import CtaBanner from "../components/CtaBanner";

export default function AboutPage() {
  const processSteps = [
    {
      num: "01",
      title: "Drawing & BOQ Study",
      desc: "Review of plans, joinery elevations, hardware specifications and BOQ to confirm site feasibility"
    },
    {
      num: "02",
      title: "Site Survey & Verification",
      desc: "Laser measurement of finished levels, then rapid deployment of verified carpenters and tooling"
    },
    {
      num: "03",
      title: "Execution & Supervision",
      desc: "Daily supervision by our founder, enforcing milestones and joinery tolerances"
    },
    {
      num: "04",
      title: "Snag Audit & Handover",
      desc: "Joint snag audit with project managers and main contractors; defects cleared before handover."
    }
  ];

  return (
    <main>
      {/* 1. HERO LAYOUT TWO */}
      <section className="hero-layout-two" style={{ padding: "10rem 4rem 5rem" }}>
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
              About Us
            </h1>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
              gap: "4rem",
              alignItems: "center"
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "var(--font--heading-font)",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  lineHeight: "1.2",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  margin: "0 0 2rem",
                  color: "var(--color--darkest)"
                }}
              >
                Company Overview
              </h2>
              <p style={{ fontSize: "1.125rem", lineHeight: "1.8", color: "var(--color--darkest)", margin: "0 0 2rem" }}>
                With 25+ years of hands-on site leadership, Laxmi Enterprises delivers commercial fit-outs, bulk modular furniture installation and bespoke architectural joinery across Mumbai and pan-India.</p>
              <PrimaryButton to="/contact" variant="darkest">
                Get a Quote
              </PrimaryButton>
            </div>

            <div style={{ borderRadius: "var(--spacing--xs, 0.75rem)", overflow: "hidden", height: "450px" }}>
              <img
                src="/assets/668bc905512dc504f0dfd42e_pexels-heyho-6933769%20(2).webp"
                alt="Carpentry and Joinery Site"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>

          <div
            style={{
              marginTop: "4rem",
              paddingTop: "3rem",
              borderTop: "1px solid var(--color--light, #eed5b9)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "3rem",
              alignItems: "center"
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "var(--font--heading-font)",
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  margin: "0 0 1rem",
                  color: "var(--color--darkest)"
                }}
              >
                What We Deliver
              </h3>
              <p style={{ fontSize: "1.0625rem", lineHeight: "1.75", color: "var(--color--darkest)", margin: "0 0 1.5rem" }}>
                From high-density workstations and boardroom tables to residential wardrobes and acoustic panelling, our crews deliver precision across every project format.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <PrimaryButton to="/services" variant="darkest">
                  View All Services
                </PrimaryButton>
                <PrimaryButton to="/contact" variant="darkest">
                  Contact Us
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TEXT LAYOUT THREE (Enterprise Background) */}
      <section className="text-layout-three" style={{ padding: "5rem 4rem" }}>
        <div style={{ maxWidth: "var(--site-width--site-max-width, 1440px)", margin: "0 auto" }}>
          <div style={{ marginBottom: "1rem" }}>
            <h2
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
              Enterprise Background
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "3rem",
              alignItems: "baseline"
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font--heading-font)",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                lineHeight: "1.3",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                margin: 0,
                color: "var(--color--darkest)"
              }}
            >
              25+ Years of Field Leadership
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", fontSize: "1.0625rem", lineHeight: "1.75" }}>
              <p style={{ margin: 0 }}>
                Founded and led by a master supervisor with 20+ years of contracting experience across commercial, institutional and residential sites. We bridge design and site reality, managing 16–30+ skilled tradesmen with strict control over drawing deviations, safety and deadlines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DUAL PHOTO FEATURE */}
      <section style={{ padding: "2rem 4rem" }}>
        <div
          style={{
            maxWidth: "var(--site-width--site-max-width, 1440px)",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "2rem"
          }}
        >
          <div style={{ height: "380px", borderRadius: "var(--spacing--xs, 0.75rem)", overflow: "hidden" }}>
            <img
              src="/assets/669e2cafddfd73667fc9da5b_pexels-heyho-7587805%20(1).webp"
              alt="Joinery Crafting"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ height: "380px", borderRadius: "var(--spacing--xs, 0.75rem)", overflow: "hidden" }}>
            <img
              src="/assets/669e2d709ee33e23fd9394eb_pexels-heyho-7214467%20(1).webp"
              alt="Timber Installation"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* 4. TEXT LAYOUT FIVE (Process Steps) */}
      <section className="text-layout-five" style={{ padding: "6rem 4rem" }}>
        <div style={{ maxWidth: "var(--site-width--site-max-width, 1440px)", margin: "0 auto" }}>
          <div style={{ marginBottom: "3.5rem" }}>
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
              Execution Rigor &amp; Governance
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
              Our Process
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "2rem"
            }}
          >
            {processSteps.map((step) => (
              <div
                key={step.num}
                style={{
                  border: "1px solid var(--color--light, #eed5b9)",
                  borderRadius: "var(--spacing--xs, 0.75rem)",
                  padding: "2.5rem 2rem",
                  backgroundColor: "var(--color--lightest, #f4e6d5)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem"
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font--heading-font)",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "var(--color--accent, #e1af87)"
                  }}
                >
                  {step.num}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font--heading-font)",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    margin: 0,
                    color: "var(--color--darkest)"
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ margin: 0, fontSize: "0.9375rem", lineHeight: "1.65", color: "var(--color--darkest)" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LEADERSHIP PROFILE */}
      <section className="leadership-layout" style={{ padding: "4rem 4rem 6rem", backgroundColor: "var(--color--lightest, #f4e6d5)" }}>
        <div style={{ maxWidth: "var(--site-width--site-max-width, 1440px)", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
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
              Field Leadership &amp; Governance
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
              Founder-Led Field Supervision &amp; Trade Mastery
            </h2>
          </div>

          <div
            style={{
              maxWidth: "850px",
              margin: "0 auto",
              border: "1px solid var(--color--light, #eed5b9)",
              borderRadius: "var(--spacing--xs, 0.75rem)",
              backgroundColor: "#fff",
              padding: "3rem",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: "2.5rem", alignItems: "center" }}>
              <div style={{ width: "160px", height: "160px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                <img
                  src="/assets/668fbaf96cc6b383d8fd3335_pexels-shkrabaanthony-5466149.webp"
                  alt="Founder &amp; Principal Field Director"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ flex: "1 1 300px" }}>
                <span style={{ fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700, color: "#8C5E35" }}>
                  25+ Years Field Leadership
                </span>
                <h3 style={{ fontFamily: "var(--font--heading-font)", fontSize: "1.75rem", margin: "0.5rem 0 0.75rem", color: "var(--color--darkest)" }}>
                  Founder &amp; Principal Field Director
                </h3>
                <p style={{ fontSize: "1rem", lineHeight: "1.7", color: "var(--color--darkest)", margin: "0 0 1.25rem" }}>
                  A veteran master craftsman and field director who has spearheaded high-spec interior contracting across commercial headquarters, data centres, luxury hospitality suites, and corporate facilities. Personally oversees daily on-site craftsmanship, drawing compliance, safety protocols, and MEP interface coordination.
                </p>
                <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", fontSize: "0.875rem", fontWeight: 600, color: "var(--color--dark)" }}>
                  <div>✓ 25+ Years Field Contracting</div>
                  <div>✓ Direct On-Site Supervision</div>
                  <div>✓ 16–30+ Certified Tradesmen</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR WORK SECTION */}
      <section className="text-layout-five" style={{ padding: "6rem 4rem" }}>
        <div style={{ maxWidth: "var(--site-width--site-max-width, 1440px)", margin: "0 auto" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <h2
              style={{
                fontFamily: "var(--font--heading-font)",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                margin: 0,
                color: "var(--color--darkest)"
              }}
            >
              Our Work
            </h2>
          </div>
          <p style={{ maxWidth: "700px", fontSize: "1.125rem", lineHeight: "1.75", color: "var(--color--darkest)", marginBottom: "2rem" }}>
            Completed fit-outs, workstation installations, acoustic panelling and bespoke cabinetry across corporate and residential spaces
          </p>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <PrimaryButton to="/services" variant="darkest">
              View All Services
            </PrimaryButton>
            <PrimaryButton to="/contact" variant="darkest">
              Contact Us
            </PrimaryButton>
          </div>
        </div>
      </section>

      {/* 6. CTA BANNER */}
      <CtaBanner />
    </main>
  );
}

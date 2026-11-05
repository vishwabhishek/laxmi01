import React from "react";
import PrimaryButton from "../components/PrimaryButton";
import CtaBanner from "../components/CtaBanner";
import { teamMembers } from "../data/siteData";

export default function AboutPage() {
  const processSteps = [
    {
      num: "01",
      title: "Consultation & Timber Selection",
      desc: "We begin by understanding your space, aesthetic goals, and functional demands. We personally select the ideal FSC-certified sustainable timber species for your environment."
    },
    {
      num: "02",
      title: "3D CAD Modeling & Prototyping",
      desc: "Every cut is drafted in precision 3D CAD. We share detailed digital schematics and full-scale timber joint mockups for your feedback and sign-off before manufacturing."
    },
    {
      num: "03",
      title: "Hand Joinery & Artisan Crafting",
      desc: "Our master carpenters shape, plane, and joint each component by hand using traditional mortise-and-tenon, dovetail, and lap joint carpentry methods."
    },
    {
      num: "04",
      title: "Site Delivery & Seamless Installation",
      desc: "Our installation crew meticulously fits every unit on site, adjusting for room variances to deliver a flawless, whisper-quiet architectural integration."
    }
  ];

  return (
    <main>
      {/* 1. HERO LAYOUT TWO */}
      <section className="hero-layout-two" style={{ padding: "10rem 4rem 5rem" }}>
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
              [&nbsp;&nbsp;&nbsp;Discover the business&nbsp;&nbsp;&nbsp;]
            </span>
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
              <h1
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
                Masterful craftsmanship
              </h1>
              <p style={{ fontSize: "1.125rem", lineHeight: "1.8", color: "var(--color--darkest)", margin: "0 0 2rem" }}>
                Founded in 1967, Woodworked has spent over five decades championing the heritage of British joinery. We believe exceptional timber work is not simply assembled—it is sculpted, grain-matched, and built to outlive generations.
              </p>
              <PrimaryButton to="/contact" variant="darkest">
                Start a Conversation
              </PrimaryButton>
            </div>

            <div style={{ borderRadius: "var(--spacing--xs, 0.75rem)", overflow: "hidden", height: "450px" }}>
              <img
                src="/assets/668bc905512dc504f0dfd42e_pexels-heyho-6933769%20(2).webp"
                alt="Woodworked Workshop"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. TEXT LAYOUT THREE (Who We Are Story) */}
      <section className="text-layout-three" style={{ padding: "5rem 4rem" }}>
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
              [&nbsp;&nbsp;&nbsp;Who we are&nbsp;&nbsp;&nbsp;]
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "3rem",
              alignItems: "baseline"
            }}
          >
            <h2
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
              A team brimming with passion, expertise and knowledge
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", fontSize: "1.0625rem", lineHeight: "1.75" }}>
              <p style={{ margin: 0 }}>
                Our artisan collective brings together cabinetmakers, architectural joiners, restoration specialists, and finish chemists. Working under one roof in our state-of-the-art timber facility, we merge centuries-old hand plane techniques with high-precision digital milling.
              </p>
              <p style={{ margin: 0 }}>
                We respect timber as a living medium. We carefully calculate atmospheric acclimatization, seasonal expansion coefficients, and natural movement so our installations remain flawless across centuries of domestic living.
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
              alt="Hand Chiseling"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ height: "380px", borderRadius: "var(--spacing--xs, 0.75rem)", overflow: "hidden" }}>
            <img
              src="/assets/669e2d709ee33e23fd9394eb_pexels-heyho-7214467%20(1).webp"
              alt="Timber Seasoning"
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
              [&nbsp;&nbsp;&nbsp;Our Process for reliable success&nbsp;&nbsp;&nbsp;]
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
              From raw trunk to refined architecture
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

      {/* 5. TEAM LAYOUT ONE */}
      <section className="team-layout-one" style={{ padding: "4rem 4rem 6rem" }}>
        <div style={{ maxWidth: "var(--site-width--site-max-width, 1440px)", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
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
              [&nbsp;&nbsp;&nbsp;Meet the team&nbsp;&nbsp;&nbsp;]
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
              The faces behind the magic
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "2rem"
            }}
          >
            {teamMembers.map((member, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid var(--color--light, #eed5b9)",
                  borderRadius: "var(--spacing--xs, 0.75rem)",
                  backgroundColor: "var(--color--lightest, #f4e6d5)",
                  overflow: "hidden"
                }}
              >
                <div style={{ height: "300px", overflow: "hidden" }}>
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: "1.75rem" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font--heading-font)",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      margin: "0 0 0.5rem",
                      color: "var(--color--darkest)"
                    }}
                  >
                    {member.name}
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--color--dark, #89684f)", fontWeight: 500 }}>
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA BANNER */}
      <CtaBanner
        title="Ready to commission your bespoke timber project?"
        subtitle="Book a workshop tour or schedule an initial consultation with our master design team."
        buttonText="Get in Touch"
      />
    </main>
  );
}

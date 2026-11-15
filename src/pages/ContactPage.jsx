import React from "react";
import ContactForm from "../components/ContactForm";
import FaqAccordion from "../components/FaqAccordion";

export default function ContactPage() {
  return (
    <main>
      {/* 1. HERO LAYOUT FOUR (SPLIT CONTACT & INQUIRY FORM) */}
      <section className="hero-layout-four" style={{ padding: "10rem 4rem 6rem" }}>
        <div style={{ maxWidth: "var(--site-width--site-max-width, 1440px)", margin: "0 auto" }}>
          <div style={{ marginBottom: "1.5rem" }}>
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
              Tender Submissions &amp; Inquiries
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
              gap: "5rem",
              alignItems: "start"
            }}
          >
            {/* Left Column: Workshop Details */}
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
                Request a Tender Proposal or Detailed Execution Quote
              </h1>
              <p style={{ fontSize: "1.125rem", lineHeight: "1.75", color: "var(--color--darkest)", margin: "0 0 3rem" }}>
                We welcome invitations to tender, BOQ packages, architectural shop drawings, and commercial contractor partnerships. Connect with our estimation and project delivery team to schedule a site survey or discuss project execution timelines.
              </p>

              {/* Direct Details List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginBottom: "3rem" }}>
                <div>
                  <div style={{ fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color--dark, #89684f)", marginBottom: "0.375rem", fontWeight: 700 }}>
                    Direct Telephone
                  </div>
                  <div style={{ fontFamily: "var(--font--heading-font)", fontSize: "1.25rem", fontWeight: 600, color: "var(--color--darkest)" }}>
                    +91 98XXX XXXXX
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color--dark, #89684f)", marginBottom: "0.375rem", fontWeight: 700 }}>
                    Tender &amp; Procurement Desk
                  </div>
                  <div style={{ fontFamily: "var(--font--heading-font)", fontSize: "1.25rem", fontWeight: 600, color: "var(--color--darkest)" }}>
                    contact@laxmienterprises.in
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color--dark, #89684f)", marginBottom: "0.375rem", fontWeight: 700 }}>
                    Operational Base &amp; Deployment Hub
                  </div>
                  <div style={{ fontFamily: "var(--font--heading-font)", fontSize: "1.125rem", fontWeight: 500, color: "var(--color--darkest)", lineHeight: "1.6" }}>
                    Mumbai, Maharashtra, India<br />
                    Pan-India Commercial Project Deployment
                  </div>
                </div>
              </div>

              {/* Workshop Photo */}
              <div style={{ borderRadius: "var(--spacing--xs, 0.75rem)", overflow: "hidden", height: "260px" }}>
                <img
                  src="/assets/669e30930153db0a0283d162_pexels-heyho-7147290%20(1).webp"
                  alt="Woodworked Consultation Desk"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div
              style={{
                backgroundColor: "var(--color--lightest, #f4e6d5)",
                border: "1px solid var(--color--light, #eed5b9)",
                borderRadius: "var(--spacing--xs, 0.75rem)",
                padding: "3.5rem 3rem"
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font--heading-font)",
                  fontSize: "1.5rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  margin: "0 0 0.5rem",
                  color: "var(--color--darkest)"
                }}
              >
                Send Us an Inquiry
              </h2>
              <p style={{ margin: "0 0 2rem", fontSize: "0.9375rem", color: "var(--color--dark, #89684f)" }}>
                Tell us about your project timeline and requirements.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* 2. FAQ ACCORDION */}
      <FaqAccordion />
    </main>
  );
}

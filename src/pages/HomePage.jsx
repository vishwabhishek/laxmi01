import React from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import TestimonialSlider from "../components/TestimonialSlider";
import CtaBanner from "../components/CtaBanner";
import { services, projects, companyValues } from "../data/siteData";

export default function HomePage() {
  return (
    <main>
      {/* 1. HERO LAYOUT ONE */}
      <section className="hero-layout-one" style={{ padding: "0.75rem", minHeight: "100svh", display: "flex" }}>
        <div
          className="hero-layout-one-inner"
          style={{
            borderRadius: "var(--spacing--xs, 0.75rem)",
            position: "relative",
            overflow: "hidden",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end"
          }}
        >
          {/* Background Image with Dark Vignette */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.45)), url('/assets/668bc905512dc504f0dfd42e_pexels-heyho-6933769%20(2).webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 1
            }}
          />

          {/* Hero Content Wrapper */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              padding: "12rem var(--site-width--global-site-padding, 4rem) 4.5rem",
              maxWidth: "var(--site-width--site-max-width, 1440px)",
              margin: "0 auto",
              width: "100%",
              boxSizing: "border-box",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "2.5rem"
            }}
          >
            {/* Left Headline */}
            <div style={{ maxWidth: "750px", color: "var(--color--lightest, #f4e6d5)" }}>
              <div
                style={{
                  fontFamily: "var(--font--heading-font)",
                  fontSize: "0.875rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                  fontWeight: 600,
                  color: "var(--color--lightest)"
                }}
              >
                [&nbsp;&nbsp;&nbsp;Bespoke Joiner, Carpenter & Woodworking&nbsp;&nbsp;&nbsp;]
              </div>
              <h1
                style={{
                  fontFamily: "var(--font--heading-font)",
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                  lineHeight: "1.2",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  margin: 0,
                  fontWeight: 700
                }}
              >
                Turning homes into artwork
              </h1>
            </div>

            {/* Right Corner Link Capsule */}
            <Link
              to="/portfolio"
              style={{
                backgroundColor: "var(--color--lightest, #f4e6d5)",
                color: "var(--color--darkest, #3e3128)",
                borderRadius: "var(--spacing--xs, 0.75rem)",
                padding: "1.75rem 2rem",
                textDecoration: "none",
                maxWidth: "320px",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                transition: "transform 0.3s ease, box-shadow 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>
                  Featured Works
                </span>
                <span style={{ fontSize: "1.25rem" }}>↗</span>
              </div>
              <div style={{ fontSize: "1.0625rem", fontWeight: 600, lineHeight: "1.4" }}>
                Take a look at some of our previous work
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. TEXT LAYOUT ONE (Who We Are Introduction) */}
      <section className="text-layout-one" style={{ padding: "6rem 4rem" }}>
        <div style={{ maxWidth: "var(--site-width--site-max-width, 1440px)", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
            <h2
              style={{
                fontFamily: "var(--font--heading-font)",
                fontSize: "0.875rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color--darkest)",
                margin: 0,
                fontWeight: 700
              }}
            >
              [&nbsp;&nbsp;&nbsp;Who we are&nbsp;&nbsp;&nbsp;]
            </h2>
            <img
              src="/assets/668d3a4363eab755ea4d62c5_Vector.svg"
              alt="Woodworked Seal"
              style={{ width: "64px", height: "64px" }}
            />
          </div>

          <div style={{ maxWidth: "900px", marginBottom: "3rem" }}>
            <h3
              style={{
                fontFamily: "var(--font--heading-font)",
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                lineHeight: "1.25",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                margin: "0 0 2rem",
                color: "var(--color--darkest)"
              }}
            >
              Hand Crafting perfection since 1967
            </h3>
            <div
              className="divider-line background-accent"
              style={{ height: "2px", backgroundColor: "var(--color--accent, #e1af87)", width: "100%", marginBottom: "2.5rem" }}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2.5rem",
                fontSize: "1.0625rem",
                lineHeight: "1.75",
                color: "var(--color--darkest)"
              }}
            >
              <p style={{ margin: 0 }}>
                At Woodworked, we take deep pride in breathing enduring life into raw timber. Established over five decades ago, our family-led workshop has collaborated with leading architects, heritage conservationists, and discerning homeowners.
              </p>
              <p style={{ margin: 0 }}>
                Every dovetail, tenon, and chamfer is cut with absolute structural precision. From sustainable forestry provenance through to the final hand-rubbed wax finish, our commitment to timeless craftsmanship remains uncompromising.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NAVIGATION LAYOUT ONE (Our Services Directory) */}
      <section className="navigation-layout-one" style={{ padding: "4rem 4rem 6rem" }}>
        <div style={{ maxWidth: "var(--site-width--site-max-width, 1440px)", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3.5rem" }}>
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
                [&nbsp;&nbsp;&nbsp;Our services&nbsp;&nbsp;&nbsp;]
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
                View all our services
              </h2>
            </div>
            <PrimaryButton to="/services" variant="darkest">
              All Services
            </PrimaryButton>
          </div>

          {/* Service Cards Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem"
            }}
          >
            {services.map((svc) => (
              <Link
                key={svc.id}
                to={`/services/${svc.slug}`}
                className="navigation-layout-one-card"
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
                <div style={{ height: "240px", overflow: "hidden" }}>
                  <img
                    src={svc.heroImage}
                    alt={svc.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: "2rem" }}>
                  <div
                    style={{
                      fontFamily: "var(--font--heading-font)",
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "var(--color--dark, #89684f)",
                      marginBottom: "0.5rem",
                      fontWeight: 700
                    }}
                  >
                    [&nbsp;{svc.tag}&nbsp;]
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font--heading-font)",
                      fontSize: "1.5rem",
                      margin: "0 0 0.75rem",
                      color: "var(--color--darkest)"
                    }}
                  >
                    {svc.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.9375rem", lineHeight: "1.6", color: "var(--color--darkest)" }}>
                    {svc.summary}
                  </p>
                  <div style={{ marginTop: "1.5rem", fontSize: "0.875rem", fontWeight: 700, color: "var(--color--darkest)" }}>
                    Explore Service ↗
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIAL LAYOUT ONE */}
      <section className="testimonial-layout-one" style={{ padding: "4rem 4rem" }}>
        <div style={{ maxWidth: "var(--site-width--site-max-width, 1440px)", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h2
              style={{
                fontFamily: "var(--font--heading-font)",
                fontSize: "0.875rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color--darkest)",
                margin: 0,
                fontWeight: 700
              }}
            >
              [&nbsp;&nbsp;&nbsp;Testimonials&nbsp;&nbsp;&nbsp;]
            </h2>
          </div>
          <TestimonialSlider />
        </div>
      </section>

      {/* 5. TEXT LAYOUT TWO (Company Values) */}
      <section className="text-layout-two" style={{ padding: "6rem 4rem" }}>
        <div style={{ maxWidth: "var(--site-width--site-max-width, 1440px)", margin: "0 auto" }}>
          <div style={{ marginBottom: "3.5rem" }}>
            <h2
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
              [&nbsp;&nbsp;&nbsp;&nbsp;Our Values&nbsp;&nbsp;&nbsp;&nbsp;]
            </h2>
            <h3
              style={{
                fontFamily: "var(--font--heading-font)",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                margin: 0
              }}
            >
              The principles behind every cut
            </h3>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem"
            }}
          >
            {companyValues.map((val) => (
              <div
                key={val.number}
                style={{
                  border: "1px solid var(--color--light, #eed5b9)",
                  borderRadius: "var(--spacing--xs, 0.75rem)",
                  padding: "2.5rem 2rem",
                  backgroundColor: "var(--color--lightest, #f4e6d5)"
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font--heading-font)",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "var(--color--accent, #e1af87)",
                    marginBottom: "1rem"
                  }}
                >
                  {val.number}
                </div>
                <h4
                  style={{
                    fontFamily: "var(--font--heading-font)",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    margin: "0 0 0.75rem",
                    color: "var(--color--darkest)"
                  }}
                >
                  {val.title}
                </h4>
                <p style={{ margin: 0, fontSize: "0.9375rem", lineHeight: "1.65", color: "var(--color--darkest)" }}>
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PORTFOLIO LAYOUT ONE (Featured Projects) */}
      <section className="portfolio-layout-one" style={{ padding: "4rem 4rem 6rem" }}>
        <div style={{ maxWidth: "var(--site-width--site-max-width, 1440px)", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3.5rem" }}>
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
                [&nbsp;&nbsp;&nbsp;Our Work&nbsp;&nbsp;&nbsp;]
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
                Featured architectural projects
              </h2>
            </div>
            <PrimaryButton to="/portfolio" variant="darkest">
              View Portfolio
            </PrimaryButton>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2.5rem"
            }}
          >
            {projects.slice(0, 3).map((proj) => (
              <Link
                key={proj.id}
                to={`/projects/${proj.slug}`}
                className="portfolio-layout-one-card"
                style={{
                  textDecoration: "none",
                  backgroundColor: "var(--color--lightest, #f4e6d5)",
                  border: "1px solid var(--color--light, #eed5b9)",
                  borderRadius: "var(--spacing--xs, 0.75rem)",
                  overflow: "hidden"
                }}
              >
                <div style={{ height: "300px", overflow: "hidden" }}>
                  <img
                    src={proj.heroImage}
                    alt={proj.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: "2rem" }}>
                  <div
                    style={{
                      fontFamily: "var(--font--heading-font)",
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "var(--color--dark, #89684f)",
                      marginBottom: "0.5rem",
                      fontWeight: 700
                    }}
                  >
                    [&nbsp;{proj.tag}&nbsp;]
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font--heading-font)",
                      fontSize: "1.5rem",
                      margin: "0 0 0.5rem",
                      color: "var(--color--darkest)"
                    }}
                  >
                    {proj.title}
                  </h3>
                  <p style={{ margin: "0 0 1rem", fontSize: "0.9375rem", color: "var(--color--dark, #89684f)" }}>
                    {proj.location} • {proj.date}
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

      {/* 7. CTA LAYOUT ONE */}
      <CtaBanner />
    </main>
  );
}

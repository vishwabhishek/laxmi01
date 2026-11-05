import React, { useState } from "react";
import { testimonials } from "../data/siteData";

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="testimonial-layout-one-slider" style={{ position: "relative", overflow: "hidden", padding: "1rem 0" }}>
      {/* Slider Track */}
      <div
        style={{
          display: "flex",
          transform: `translateX(-${current * 100}%)`,
          transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)"
        }}
      >
        {testimonials.map((item, index) => (
          <div
            key={item.id || index}
            style={{
              flex: "0 0 100%",
              boxSizing: "border-box",
              padding: "1rem 0"
            }}
          >
            <div
              style={{
                backgroundColor: "var(--color--lightest, #f4e6d5)",
                border: "1px solid var(--color--light, #eed5b9)",
                borderRadius: "var(--spacing--xs, 0.75rem)",
                padding: "3.5rem 3rem",
                maxWidth: "800px",
                margin: "0 auto",
                textAlign: "center"
              }}
            >
              <div style={{ color: "var(--color--accent, #e1af87)", fontSize: "1.5rem", marginBottom: "1.5rem" }}>
                ★★★★★
              </div>
              <blockquote
                style={{
                  fontFamily: "var(--font--body-font)",
                  fontSize: "1.375rem",
                  lineHeight: "1.6",
                  fontStyle: "italic",
                  color: "var(--color--darkest, #3e3128)",
                  margin: "0 0 2rem",
                  fontWeight: "400"
                }}
              >
                {item.quote}
              </blockquote>
              <div>
                <h4
                  style={{
                    fontFamily: "var(--font--heading-font)",
                    fontSize: "1.125rem",
                    fontWeight: "700",
                    margin: "0 0 0.25rem",
                    color: "var(--color--darkest)"
                  }}
                >
                  {item.author}
                </h4>
                <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--color--dark, #89684f)" }}>
                  {item.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls: Left & Right Arrows */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.5rem",
          marginTop: "2.5rem"
        }}
      >
        <button
          onClick={prev}
          aria-label="Previous slide"
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            border: "1px solid var(--color--light, #eed5b9)",
            backgroundColor: "var(--color--lightest, #f4e6d5)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--color--darkest)",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color--darkest)";
            e.currentTarget.style.color = "var(--color--lightest)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color--lightest)";
            e.currentTarget.style.color = "var(--color--darkest)";
          }}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Dot Indicators */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {testimonials.map((_, dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => setCurrent(dotIndex)}
              aria-label={`Go to slide ${dotIndex + 1}`}
              style={{
                width: dotIndex === current ? "28px" : "10px",
                height: "10px",
                borderRadius: "5px",
                border: "none",
                backgroundColor:
                  dotIndex === current ? "var(--color--darkest, #3e3128)" : "var(--color--light, #eed5b9)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next slide"
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            border: "1px solid var(--color--light, #eed5b9)",
            backgroundColor: "var(--color--lightest, #f4e6d5)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--color--darkest)",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color--darkest)";
            e.currentTarget.style.color = "var(--color--lightest)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color--lightest)";
            e.currentTarget.style.color = "var(--color--darkest)";
          }}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

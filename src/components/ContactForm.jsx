import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: ""
  });

  const [status, setStatus] = useState("idle"); // 'idle' | 'submitting' | 'success' | 'error'
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.phone.trim()) errs.phone = "Phone number is required";
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!formData.service) errs.service = "Please select a service";
    if (!formData.message.trim()) errs.message = "Message inquiry is required";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("error");
      return;
    }

    setErrors({});
    setStatus("submitting");

    // Simulate reliable submission
    setTimeout(() => {
      setStatus("success");
    }, 800);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  if (status === "success") {
    return (
      <div
        className="w-form-done"
        style={{
          backgroundColor: "var(--color--lightest, #f4e6d5)",
          border: "1px solid var(--color--light, #eed5b9)",
          borderRadius: "var(--spacing--xs, 0.75rem)",
          padding: "3rem 2rem",
          textAlign: "center"
        }}
      >
        <div style={{ color: "var(--color--accent, #e1af87)", fontSize: "2.5rem", marginBottom: "1rem" }}>✓</div>
        <h3 style={{ fontFamily: "var(--font--heading-font)", margin: "0 0 0.5rem", color: "var(--color--darkest)" }}>
          Thank you!
        </h3>
        <p style={{ margin: "0 0 1.5rem", color: "var(--color--dark, #89684f)" }}>
          Your inquiry has been received. Our project estimation team will review your specifications and contact you within 24 hours.
        </p>
        <PrimaryButton
          onClick={() => {
            setStatus("idle");
            setFormData({ name: "", phone: "", email: "", service: "", message: "" });
          }}
          variant="darkest"
        >
          Send Another Inquiry
        </PrimaryButton>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {status === "error" && Object.keys(errors).length > 0 && (
          <div
            className="w-form-fail"
            style={{
              backgroundColor: "rgba(217, 83, 79, 0.1)",
              border: "1px solid #d9534f",
              borderRadius: "0.5rem",
              padding: "1rem",
              fontSize: "0.875rem",
              color: "#d9534f"
            }}
          >
            Oops! Please fill in all required fields marked below.
          </div>
        )}

        <div>
          <input
            type="text"
            name="name"
            placeholder="Name *"
            value={formData.name}
            onChange={handleChange}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "1rem 1.25rem",
              borderRadius: "var(--spacing--xs, 0.75rem)",
              border: errors.name ? "1px solid #d9534f" : "1px solid var(--color--light, #eed5b9)",
              backgroundColor: "var(--color--lightest, #f4e6d5)",
              color: "var(--color--darkest)",
              fontSize: "0.9375rem",
              outline: "none"
            }}
          />
          {errors.name && <span style={{ color: "#d9534f", fontSize: "0.75rem", marginTop: "0.25rem", display: "block" }}>{errors.name}</span>}
        </div>

        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number *"
            value={formData.phone}
            onChange={handleChange}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "1rem 1.25rem",
              borderRadius: "var(--spacing--xs, 0.75rem)",
              border: errors.phone ? "1px solid #d9534f" : "1px solid var(--color--light, #eed5b9)",
              backgroundColor: "var(--color--lightest, #f4e6d5)",
              color: "var(--color--darkest)",
              fontSize: "0.9375rem",
              outline: "none"
            }}
          />
          {errors.phone && <span style={{ color: "#d9534f", fontSize: "0.75rem", marginTop: "0.25rem", display: "block" }}>{errors.phone}</span>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email Address *"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "1rem 1.25rem",
              borderRadius: "var(--spacing--xs, 0.75rem)",
              border: errors.email ? "1px solid #d9534f" : "1px solid var(--color--light, #eed5b9)",
              backgroundColor: "var(--color--lightest, #f4e6d5)",
              color: "var(--color--darkest)",
              fontSize: "0.9375rem",
              outline: "none"
            }}
          />
          {errors.email && <span style={{ color: "#d9534f", fontSize: "0.75rem", marginTop: "0.25rem", display: "block" }}>{errors.email}</span>}
        </div>

        <div>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "1rem 1.25rem",
              borderRadius: "var(--spacing--xs, 0.75rem)",
              border: errors.service ? "1px solid #d9534f" : "1px solid var(--color--light, #eed5b9)",
              backgroundColor: "var(--color--lightest, #f4e6d5)",
              color: formData.service ? "var(--color--darkest)" : "#89684f",
              fontSize: "0.9375rem",
              outline: "none"
            }}
          >
            <option value="">Discipline / Service Required *</option>
            <option value="Turnkey Interior Contracting & Commercial Fit-Outs">Turnkey Interior Contracting &amp; Commercial Fit-Outs</option>
            <option value="Hospitality, Healthcare & Institutional Fit-Outs">Hospitality, Healthcare &amp; Institutional Fit-Outs</option>
            <option value="Architectural Joinery, Executive Millwork & Custom Furnishings">Architectural Joinery, Executive Millwork &amp; Custom Furnishings</option>
            <option value="Acoustic Panelling, Demountable Partitions & Ceilings">Acoustic Panelling, Demountable Partitions &amp; Ceilings</option>
            <option value="Modular Workstation Deployments & Mission-Critical Facilities">Modular Workstation Deployments &amp; Mission-Critical Facilities</option>
            <option value="Tender / BOQ Package Review">Tender / BOQ Package Review</option>
          </select>
          {errors.service && <span style={{ color: "#d9534f", fontSize: "0.75rem", marginTop: "0.25rem", display: "block" }}>{errors.service}</span>}
        </div>

        <div>
          <textarea
            name="message"
            rows="5"
            placeholder="Enter your Inquiry *"
            value={formData.message}
            onChange={handleChange}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "1rem 1.25rem",
              borderRadius: "var(--spacing--xs, 0.75rem)",
              border: errors.message ? "1px solid #d9534f" : "1px solid var(--color--light, #eed5b9)",
              backgroundColor: "var(--color--lightest, #f4e6d5)",
              color: "var(--color--darkest)",
              fontSize: "0.9375rem",
              outline: "none",
              resize: "vertical"
            }}
          />
          {errors.message && <span style={{ color: "#d9534f", fontSize: "0.75rem", marginTop: "0.25rem", display: "block" }}>{errors.message}</span>}
        </div>

        <PrimaryButton
          type="submit"
          variant="darkest"
          disabled={status === "submitting"}
          style={{ width: "100%", padding: "1.125rem", justifyContent: "center" }}
        >
          {status === "submitting" ? "Sending..." : "Submit Inquiry"}
        </PrimaryButton>
      </form>
    </div>
  );
}

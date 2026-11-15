import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import PortfolioPage from "./pages/PortfolioPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedPage from "./pages/ProtectedPage";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Services Routes */}
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/turnkey-interiors" element={<ServiceDetailPage forcedSlug="turnkey-interiors" />} />
            <Route path="/services/hospitality-healthcare" element={<ServiceDetailPage forcedSlug="hospitality-healthcare" />} />
            <Route path="/services/joinery-furnishings" element={<ServiceDetailPage forcedSlug="joinery-furnishings" />} />
            <Route path="/services/acoustics-partitions" element={<ServiceDetailPage forcedSlug="acoustics-partitions" />} />
            <Route path="/services/workstations-facilities" element={<ServiceDetailPage forcedSlug="workstations-facilities" />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />

            {/* Portfolio Routes */}
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/projects/4life-andheri" element={<ProjectDetailPage forcedSlug="4life-andheri" />} />
            <Route path="/projects/boardroom-conference-suites" element={<ProjectDetailPage forcedSlug="boardroom-conference-suites" />} />
            <Route path="/projects/acoustic-panelling-partitions" element={<ProjectDetailPage forcedSlug="acoustic-panelling-partitions" />} />
            <Route path="/projects/reception-lobby-displays" element={<ProjectDetailPage forcedSlug="reception-lobby-displays" />} />
            <Route path="/projects/executive-director-cabins" element={<ProjectDetailPage forcedSlug="executive-director-cabins" />} />
            <Route path="/projects/modular-workstation-deployment" element={<ProjectDetailPage forcedSlug="modular-workstation-deployment" />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />

            {/* Contact & Utility Routes */}
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="/401" element={<ProtectedPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

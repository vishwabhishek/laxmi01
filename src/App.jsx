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
import LicencesPage from "./pages/LicencesPage";
import ChangelogPage from "./pages/ChangelogPage";
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
            <Route path="/services/kitchens" element={<ServiceDetailPage forcedSlug="kitchens" />} />
            <Route path="/services/bathrooms" element={<ServiceDetailPage forcedSlug="bathrooms" />} />
            <Route path="/services/furniture" element={<ServiceDetailPage forcedSlug="furniture" />} />
            <Route path="/services/flooring" element={<ServiceDetailPage forcedSlug="flooring" />} />
            <Route path="/services/buildings" element={<ServiceDetailPage forcedSlug="buildings" />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />

            {/* Portfolio Routes */}
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/projects/light-pine-kitchen" element={<ProjectDetailPage forcedSlug="light-pine-kitchen" />} />
            <Route path="/projects/airy-apartment" element={<ProjectDetailPage forcedSlug="airy-apartment" />} />
            <Route path="/projects/modern-kitchen" element={<ProjectDetailPage forcedSlug="modern-kitchen" />} />
            <Route path="/projects/hamptons-manor-house" element={<ProjectDetailPage forcedSlug="hamptons-manor-house" />} />
            <Route path="/projects/dark-oak-kitchen" element={<ProjectDetailPage forcedSlug="dark-oak-kitchen" />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />

            {/* Contact & Utility Routes */}
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/template-help/licences" element={<LicencesPage />} />
            <Route path="/template-help/changelog" element={<ChangelogPage />} />
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

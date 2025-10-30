import React from "react";
import CommonLayout from "../components/shared/CommonLayout";
import PersonalHero from "../components/personal/PersonalHero";
import MarqueeSection from "../components/personal/MarqueeSection";
import PortfolioGrid from "../components/personal/PortfolioGrid";
import ServicesGrid from "../components/personal/ServicesGrid";
import ToolsMarquee from "../components/personal/ToolsMarquee";
import ProcessSection from "../components/personal/ProcessSection";
import ContactForm from "../components/personal/ContactForm";

// Import CSS
import "../styles/personal/hero.css";
import "../styles/personal/marquee.css";
import "../styles/personal/portfolio.css";
import "../styles/personal/services.css";
import "../styles/personal/tools.css";
import "../styles/personal/process.css";
import "../styles/personal/contact.css";
import "../styles/personal/CardSwap.css";
import "../styles/shared/mode-titles.css";

export default function PersonalPage() {
  return (
    <CommonLayout>
      <div className="section-wrapper"><PersonalHero /></div>
      <div className="section-wrapper"><MarqueeSection /></div>
      <div className="section-wrapper"><PortfolioGrid /></div>
      <div className="section-wrapper"><ServicesGrid /></div>
      <div className="section-wrapper"><ToolsMarquee /></div>
      <div className="section-wrapper"><ProcessSection /></div>
      <div className="section-wrapper"><ContactForm /></div>
    </CommonLayout>
  );
}
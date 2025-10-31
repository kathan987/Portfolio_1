import React, { useState } from "react";
import { motion } from "framer-motion";
import ProjectCascade from "./ProjectCascade";
import { useMode } from "../../App";
import "../../styles/personal/portfolio.css";

type Project = {
  title: string;
  description: string;
  category: string;
  tags: string[];
  color: string;
  year: string;
  client: string;
  services: string[];
};

export default function PortfolioGrid() {
  const { mode } = useMode();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const projects: Project[] = [
    {
      title: "TrueShine Facilities",
      description: "Complete brand identity, social media strategy, and Google SEO optimization for a premium cleaning service.",
      category: "Brand Identity",
      tags: ["Branding", "Social Media", "SEO"],
      color: "#1e40af",
      year: "2024",
      client: "TrueShine",
      services: ["Brand Strategy", "Visual Identity", "Digital Marketing"],
    },
    {
      title: "Vaarso Fashion",
      description: "Exclusive brand management from logo design to complete fashion branding and visual direction.",
      category: "Brand Identity",
      tags: ["Fashion", "Branding", "Creative Direction"],
      color: "#be123c",
      year: "2024",
      client: "Vaarso",
      services: ["Brand Identity", "Fashion Design", "Art Direction"],
    },
    {
      title: "Limitless Frames",
      description: "Motion studio visual identity, content direction, and brand system for a creative production house.",
      category: "Motion & Content",
      tags: ["Motion", "Branding", "Content Strategy"],
      color: "#7c3aed",
      year: "2025",
      client: "Limitless Frames",
      services: ["Visual Identity", "Motion Graphics", "Brand Guidelines"],
    },
    {
      title: "SMMA Dashboard",
      description: "Internal automation tool with client CRM interface, built for streamlined agency workflow management.",
      category: "UI/UX",
      tags: ["UI Design", "Product Design", "SaaS"],
      color: "#0891b2",
      year: "2024",
      client: "Internal",
      services: ["UI/UX Design", "Product Strategy", "System Design"],
    },
  ];

  const filters = [
    { id: "all", label: "All Work" },
    { id: "brand", label: "Brand Identity" },
    { id: "ui", label: "UI/UX" },
    { id: "motion", label: "Motion & Content" },
  ];

  const matchers: Record<string, (p: Project) => boolean> = {
    all: () => true,
    brand: (p) => /brand/i.test(p.category) || p.tags.some((t) => /brand/i.test(t)),
    ui: (p) => /ui|ux/i.test(p.category) || p.tags.some((t) => /ui|ux|product/i.test(t)),
    motion: (p) => /motion/i.test(p.category) || p.tags.some((t) => /motion|content/i.test(t)),
  };

  const filteredProjects = projects.filter(matchers[activeFilter] ?? (() => true));

  const accentColor = mode === 'personal' ? '#FF5B00' : '#00ff88';

  return (
    <section 
      className="portfolio-section" 
      id="work"
      style={{ '--accent-color-override': accentColor } as React.CSSProperties}
    >
      <div className="portfolio-container">
        <div className="portfolio-split">
          <motion.div
            className="left-cards"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="cardswap-wrapper split">
              <ProjectCascade 
                items={filteredProjects.map(p => ({
                  title: p.title, 
                  subtitle: p.description, 
                  year: p.year,
                  color: p.color
                }))} 
                key={activeFilter}
              />
            </div>
          </motion.div>

          <motion.aside
            className="right-content"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="header-top">
              <span className="header-label">Portfolio</span>
              <span className="header-count">{String(filteredProjects.length).padStart(2, "0")} Projects</span>
            </div>
            <h2 className="portfolio-title">
              <span className="title-line">Design</span>
              <span className="title-line accent">in Action</span>
            </h2>
            <p className="portfolio-subtitle">
              Crafting well-balanced visuals driven by aesthetics and behavior. Each project is a story of strategy meeting creativity.
            </p>
            <div className="portfolio-filters">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  className={`filter-btn ${activeFilter === filter.id ? "active" : ""}`}
                  onClick={() => setActiveFilter(filter.id)}
                  aria-pressed={activeFilter === filter.id}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <button className="btn-primary side-cta">
              View All Projects
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
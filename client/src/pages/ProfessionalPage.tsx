import React from "react";
import CommonLayout from "../components/shared/CommonLayout";
import ProfessionalHero from "../components/professional/ProfessionalHero";
import EducationSection from "../components/professional/EducationSection";
import SkillsSection from "../components/professional/SkillsSection";
import ProjectsSection from "../components/professional/ProjectsSection";
import ToolsSection from "../components/professional/ToolsSection";
import AboutSection from "../components/professional/AboutSection"; // NEW
import ExperienceTimeline from "../components/professional/ExperienceTimeline";

// Import CSS files
import "../styles/pro/hero.css";
import "../styles/pro/education.css";
import "../styles/pro/skills.css";
import "../styles/pro/projects.css";
import "../styles/pro/tools.css";
import "../styles/pro/about.css"; // NEW
import "../styles/pro/experience.css";
import "../styles/shared/mode-titles.css";

export default function ProfessionalPage() {
  return (
    <CommonLayout>
      <ProfessionalHero />
      <EducationSection />
      <SkillsSection />
      <ProjectsSection />
      <ToolsSection />
      <AboutSection /> {/* REPLACED TerminalBox */}
      <ExperienceTimeline />
    </CommonLayout>
  );
}
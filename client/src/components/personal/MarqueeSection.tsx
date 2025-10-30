import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import "../../styles/personal/marquee.css";

export default function MarqueeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 25, stiffness: 100 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(cursorY, [-300, 300], [5, -5]);
  const rotateY = useTransform(cursorX, [-300, 300], [-5, 5]);

  // ✅ ENHANCED: Optimized mouse tracking
  useEffect(() => {
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        const rect = containerRef.current!.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        mouseX.set(x);
        mouseY.set(y);
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove, { passive: true });
      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        if (rafId) cancelAnimationFrame(rafId);
      };
    }
  }, [mouseX, mouseY]);

  const projects = [
    {
      title: "TrueShine",
      category: "Brand Identity",
      image: "/images/projects/trueshine.jpg",
      color: "#0B0F19",
      year: "2024"
    },
    {
      title: "Vaarso",
      category: "Fashion Branding",
      image: "/images/projects/vaarso.jpg",
      color: "#FF5B00",
      year: "2024"
    },
    {
      title: "Limitless Frames",
      category: "Motion Studio",
      image: "/images/projects/limitless.jpg",
      color: "#1a1a1a",
      year: "2025"
    },
    {
      title: "Dashboard",
      category: "UI/UX Design",
      image: "/images/projects/dashboard.jpg",
      color: "#2d2d2d",
      year: "2024"
    },
    {
      title: "SMMA Platform",
      category: "Web Design",
      image: "/images/projects/smma.jpg",
      color: "#FF8F00",
      year: "2025"
    }
  ];

  const allProjects = [...projects, ...projects, ...projects];

  return (
    <section 
      className="marquee-section" 
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        className="marquee-header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
      >
        <div className="header-content">
          <span className="header-label">Selected Work</span>
          <h2 className="header-title">
            <span className="title-line">Recent</span>
            <span className="title-line accent">Projects</span>
          </h2>
          <p className="header-description">
            A curated selection of brand identities, digital experiences, and creative systems.
          </p>
        </div>
      </motion.div>

      {/* ✅ ENHANCED: Better 3D perspective */}
      <motion.div
        className="marquee-container"
        style={{
          rotateX: isHovering ? rotateX : 0,
          rotateY: isHovering ? rotateY : 0,
        }}
      >
        <div className="marquee-track top-track">
          <motion.div
            className="marquee-content"
            animate={{
              x: [0, -2000]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear"
              }
            }}
          >
            {allProjects.map((project, index) => (
              <MarqueeCard
                key={`top-${index}`}
                project={project}
                index={index}
              />
            ))}
          </motion.div>
        </div>

        <div className="marquee-track bottom-track">
          <motion.div
            className="marquee-content"
            animate={{
              x: [-2000, 0]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 45,
                ease: "linear"
              }
            }}
          >
            {allProjects.map((project, index) => (
              <MarqueeCard
                key={`bottom-${index}`}
                project={project}
                index={index}
                reverse
              />
            ))}
          </motion.div>
        </div>
      </motion.div>

      <div className="marquee-fade marquee-fade-left"></div>
      <div className="marquee-fade marquee-fade-right"></div>

      <motion.div
        className="marquee-cta"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <a href="#work" className="cta-link">
          <span>View All Projects</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14m0 0l-7-7m7 7l-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </motion.div>
    </section>
  );
}

interface MarqueeCardProps {
  project: {
    title: string;
    category: string;
    image: string;
    color: string;
    year: string;
  };
  index: number;
  reverse?: boolean;
}

const MarqueeCard: React.FC<MarqueeCardProps> = ({ project, index, reverse }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="marquee-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="card-image-wrapper">
        <motion.div
          className="card-image-inner"
          animate={{
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            onError={(e) => {
              const gradients = [
                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
              ];
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                parent.style.background = gradients[index % gradients.length];
              }
            }}
          />
        </motion.div>

        <motion.div
          className="card-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ background: project.color }}
        />

        <motion.div
          className="card-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <span className="card-category">{project.category}</span>
          <h3 className="card-title">{project.title}</h3>
          <div className="card-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M7 17L17 7m0 0H7m10 0v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </motion.div>
      </div>

      <div className="card-year">{project.year}</div>
    </motion.div>
  );
};
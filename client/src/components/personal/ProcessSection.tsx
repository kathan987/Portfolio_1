import React from "react";
import { motion } from "framer-motion";
import "../../styles/personal/process.css";

export default function ProcessSection() {
  const values = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      ),
      title: "Story-Driven Design",
      description: "Every pixel tells a narrative"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      ),
      title: "Strategic Thinking",
      description: "Purpose meets aesthetics"
    },
    
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  return (
    <section className="process-section">
      <div className="process-bg-pattern" aria-hidden="true"></div>

      <div className="process-container">
        <div className="process-content">
          <motion.div className="process-text" {...fadeIn}>
            <span className="process-label">Philosophy</span>
            
            <h2 className="process-title">
              <span className="title-line">Behind</span>
              <span className="title-line accent">the Canvas</span>
            </h2>
            
            <p className="process-subtitle">
              From sketches to shipped — where process meets passion
            </p>
            
            <div className="process-body">
              <p>
                Every design starts as a spark. I turn that spark into stories that move — 
                visually, emotionally, and digitally. My process balances <strong>intuition with intent</strong>, 
                bridging art and usability through storytelling in motion.
              </p>
              <p>
                I've built brands from scratch for cleaning services, fashion labels, and digital platforms. 
                Each project is an opportunity to merge <em>design, technology, and marketing</em> into 
                one cohesive experience that doesn't just look good — it <strong>performs</strong>.
              </p>
            </div>

            <div className="process-values">
              {values.map((value, index) => (
                <div key={index} className="value-card">
                  <div className="value-icon">{value.icon}</div>
                  <h4 className="value-title">{value.title}</h4>
                  <p className="value-description">{value.description}</p>
                </div>
              ))}
            </div>

            <a href="#contact" className="btn-primary process-cta">
              <span>Let's Create Together</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 3L14 10L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </motion.div>

          <div className="process-visual">
            <div className="illustration-container">
              <svg viewBox="0 0 400 400" className="desk-illustration">
                {/* Desk */}
                <rect x="40" y="260" width="320" height="120" fill="#D4B896" rx="8"/>
                <rect x="50" y="270" width="300" height="100" fill="#C4A57B" rx="6"/>
                
                {/* Laptop */}
                <g className="laptop-group">
                  <rect x="110" y="200" width="180" height="110" fill="#1a1a1a" rx="6"/>
                  <rect x="120" y="210" width="160" height="90" fill="#0B0F19" rx="4"/>
                  <rect x="125" y="215" width="150" height="80" fill="url(#screenGlow)" opacity="0.25" rx="3"/>
                  
                  <rect x="130" y="225" width="60" height="3" fill="#00ff88" opacity="0.7" rx="1.5"/>
                  <rect x="130" y="235" width="90" height="3" fill="#00d4ff" opacity="0.6" rx="1.5"/>
                  <rect x="130" y="245" width="70" height="3" fill="#FF5B00" opacity="0.5" rx="1.5"/>
                  <rect x="130" y="255" width="100" height="3" fill="#00ff88" opacity="0.7" rx="1.5"/>
                  <rect x="130" y="265" width="50" height="3" fill="#00d4ff" opacity="0.6" rx="1.5"/>
                  
                  <line x1="200" y1="310" x2="110" y2="260" stroke="#0B0F19" strokeWidth="4"/>
                  <line x1="200" y1="310" x2="290" y2="260" stroke="#0B0F19" strokeWidth="4"/>
                </g>
                
                {/* Coffee Cup */}
                <g className="coffee-cup">
                  <ellipse cx="320" cy="245" rx="18" ry="10" fill="#8B6F47"/>
                  <rect x="302" y="220" width="36" height="25" fill="#A0826D" rx="3"/>
                  <path className="steam" d="M310 210 Q 312 200 310 195" stroke="#94a3b8" strokeWidth="2" fill="none" opacity="0.3"/>
                  <path className="steam" d="M320 210 Q 318 200 320 195" stroke="#94a3b8" strokeWidth="2" fill="none" opacity="0.3"/>
                </g>
                
                {/* Plant */}
                <g className="plant">
                  <rect x="65" y="240" width="24" height="30" fill="#C4A57B" rx="3"/>
                  <circle cx="77" cy="230" r="14" fill="#88C043" opacity="0.9"/>
                  <circle cx="70" cy="223" r="12" fill="#A8E063" opacity="0.85"/>
                  <circle cx="84" cy="223" r="12" fill="#7AB851" opacity="0.85"/>
                  <circle cx="77" cy="216" r="10" fill="#A8E063" opacity="0.9"/>
                </g>
                
                {/* Notebook */}
                <rect x="240" y="280" width="60" height="75" fill="#f0f0f0" rx="2"/>
                <rect x="240" y="280" width="60" height="8" fill="#FF5B00" rx="2"/>
                <line x1="245" y1="295" x2="285" y2="295" stroke="#ccc" strokeWidth="1"/>
                <line x1="245" y1="302" x2="290" y2="302" stroke="#ccc" strokeWidth="1"/>
                <line x1="245" y1="309" x2="280" y2="309" stroke="#ccc" strokeWidth="1"/>
                
                {/* Sparkles */}
                <circle className="sparkle sparkle-1" cx="100" cy="120" r="20" fill="#FF5B00" opacity="0.15"/>
                <circle className="sparkle sparkle-2" cx="150" cy="150" r="3" fill="#FFD700" opacity="0.4"/>
                <circle className="sparkle sparkle-3" cx="270" cy="170" r="2" fill="#FF8F00" opacity="0.4"/>
                
                {/* Gradient Definitions */}
                <defs>
                  <linearGradient id="screenGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#00ff88', stopOpacity: 0.2}}/>
                    <stop offset="100%" style={{stopColor: '#FF5B00', stopOpacity: 0.1}}/>
                  </linearGradient>
                </defs>
              </svg>

              <div className="illustration-frame">
                <div className="frame-corner tl"></div>
                <div className="frame-corner tr"></div>
                <div className="frame-corner bl"></div>
                <div className="frame-corner br"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
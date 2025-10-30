import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, MapPin, Mail, Github, Linkedin, Code, Server, Award } from "lucide-react";
import "../../styles/pro/about.css";

export default function AboutSection() {
  const [typedText, setTypedText] = useState("");
  const fullText = "whoami";

  React.useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 150);
    return () => clearInterval(timer);
  }, []);

  const quickFacts = [
    { icon: "🎓", label: "Education", value: "Computer Systems Technician" },
    { icon: "💼", label: "Current Role", value: "Guest Service Associate @ Hilton" },
    { icon: "🏆", label: "Certifications", value: "A+, CCNA, Google IT Pro" },
    { icon: "📍", label: "Location", value: "London, ON, Canada" }
  ];

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <motion.div
          className="about-terminal"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Terminal Header */}
          <div className="terminal-header">
            <div className="terminal-controls">
              <span className="control red"></span>
              <span className="control yellow"></span>
              <span className="control green"></span>
            </div>
            <div className="terminal-title">kathan@portfolio:~$ {typedText}<span className="cursor-blink">█</span></div>
          </div>

          {/* Terminal Body */}
          <div className="terminal-body">
            <div className="about-content-grid">
              
              {/* Left Side - Photo */}
              <motion.div
                className="about-photo-section"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="photo-frame">
                  <div className="photo-corner tl"></div>
                  <div className="photo-corner tr"></div>
                  <div className="photo-corner bl"></div>
                  <div className="photo-corner br"></div>
                  <img 
                    src="/images/profile-kathan.jpg" 
                    alt="Kathan Thaker - IT Professional"
                  />
                  <div className="photo-glow"></div>
                  <div className="photo-status">
                    <span className="status-dot"></span>
                    <span className="status-text">Available for hire</span>
                  </div>
                </div>

                {/* Quick Facts Grid */}
                <div className="quick-facts-grid">
                  {quickFacts.map((fact, idx) => (
                    <motion.div
                      key={fact.label}
                      className="fact-card"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="fact-icon">{fact.icon}</span>
                      <div className="fact-info">
                        <span className="fact-label">{fact.label}</span>
                        <span className="fact-value">{fact.value}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Terminal Output Footer - Moved Under Photo */}
                <motion.div
                  className="terminal-output-footer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  <span className="output-line">
                    <Code size={14} />
                    Loaded profile successfully
                  </span>
                  <span className="output-line">
                    <Server size={14} />
                    Status: Available for opportunities
                  </span>
                  <span className="output-line">
                    <Award size={14} />
                    3 active certifications, 1 in progress
                  </span>
                </motion.div>
              </motion.div>

              {/* Right Side - Text */}
              <div className="about-text">
                <motion.div
                  className="terminal-prompt"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="prompt-symbol">→</span>
                  <span className="prompt-command">cat about_me.txt</span>
                </motion.div>

                <motion.div
                  className="summary-content"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <h3>Hi, I'm Kathan Thaker 👋</h3>
                  
                  <p>
                    I'm a <strong>Computer Systems Technician</strong> passionate about building and maintaining 
                    robust IT infrastructure. From troubleshooting network issues to automating deployments, 
                    I love solving technical challenges that make systems run smoother.
                  </p>

                  <p>
                    Currently working as a <strong>Guest Service Associate at Hilton</strong>, where I've honed my 
                    customer service and problem-solving skills while maintaining a <strong>98% satisfaction rating</strong>. 
                    On the technical side, I've built home labs with VMware, configured enterprise networks 
                    in Packet Tracer, and earned my <strong>CCNA</strong> through Cisco NetAcad.
                  </p>

                  <p>
                    I recently completed the <strong>SHMC Network Architecture</strong> project—a comprehensive 
                    enterprise design featuring redundant routing, VLAN segmentation, VPN tunnels, and centralized 
                    network monitoring. This hands-on project demonstrates my ability to design scalable, secure 
                    infrastructure solutions.
                  </p>

                  <div className="tech-stack-mini">
                    <span className="tech-tag">Windows Server</span>
                    <span className="tech-tag">Linux</span>
                    <span className="tech-tag">Azure</span>
                    <span className="tech-tag">VMware</span>
                    <span className="tech-tag">Cisco IOS</span>
                    <span className="tech-tag">PowerShell</span>
                    <span className="tech-tag">Docker</span>
                    <span className="tech-tag">Ansible</span>
                  </div>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  className="contact-info"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="info-item">
                    <MapPin size={16} />
                    <span>London, ON, Canada</span>
                  </div>
                  <div className="info-item">
                    <Mail size={16} />
                    <a href="mailto:kathan@example.com">kathan@example.com</a>
                  </div>
                  <div className="info-item">
                    <Github size={16} />
                    <a href="https://github.com/kathanthaker" target="_blank" rel="noopener noreferrer">
                      github.com/kathanthaker
                    </a>
                  </div>
                  <div className="info-item">
                    <Linkedin size={16} />
                    <a href="https://linkedin.com/in/kathanthaker" target="_blank" rel="noopener noreferrer">
                      linkedin.com/in/kathanthaker
                    </a>
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  className="about-actions"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.a
                    href="/resume.pdf"
                    download
                    className="download-resume-btn"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download size={20} />
                    Download Resume
                  </motion.a>

                  <motion.a
                    href="#contact"
                    className="contact-btn"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail size={20} />
                    Get in Touch
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
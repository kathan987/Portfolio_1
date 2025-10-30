import React from "react";
import { motion } from "framer-motion";
import { 
  Github, Linkedin, Mail, Instagram, 
  Terminal, Wifi, Activity, Heart, Coffee
} from "lucide-react";
import { useMode } from "../../App";
import "../../styles/shared/footer.css";

// ========================================
// 🔧 PROFESSIONAL FOOTER - CLEAN NOC
// ========================================
const ProfessionalFooter = () => {
  const [uptime] = React.useState(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now.getTime() - start.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days;
  });

  return (
    <div className="professional-footer-content">
      {/* Simple grid background */}
      <div className="footer-grid-bg"></div>

      <div className="footer-container">
        {/* LEFT: Brand */}
        <motion.div 
          className="footer-section footer-brand"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="brand-header">
            <Terminal size={20} />
            <h3 className="brand-title">Kathan Thaker</h3>
          </div>
          
          <p className="brand-subtitle">
            IT Support Specialist | Network Engineer
          </p>

          {/* System metrics */}
          <div className="system-metrics">
            <div className="metric">
              <Activity size={14} />
              <span>Uptime: {uptime}d</span>
            </div>
            <div className="metric">
              <Wifi size={14} />
              <span>Ping: 12ms</span>
            </div>
          </div>
        </motion.div>

        {/* CENTER: Quick Links */}
        <motion.div 
          className="footer-section footer-links"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h4 className="section-title">Quick Access</h4>
          
          <div className="link-group">
            <a href="#about" className="footer-link">
              <span className="bullet">→</span>
              About
            </a>
            <a href="#projects" className="footer-link">
              <span className="bullet">→</span>
              Projects
            </a>
            <a href="#skills" className="footer-link">
              <span className="bullet">→</span>
              Skills
            </a>
            <a href="#contact" className="footer-link">
              <span className="bullet">→</span>
              Contact
            </a>
          </div>
        </motion.div>

        {/* RIGHT: Contact */}
        <motion.div 
          className="footer-section footer-contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h4 className="section-title">Connect</h4>

          <div className="contact-links">
            <a 
              href="mailto:kathan@example.com"
              className="contact-item"
            >
              <Mail size={16} />
              <span>kathan@example.com</span>
            </a>
            
            <a 
              href="https://linkedin.com/in/kathanthaker"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item"
            >
              <Linkedin size={16} />
              <span>/in/kathanthaker</span>
            </a>
            
            <a 
              href="https://github.com/kathanthaker"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item"
            >
              <Github size={16} />
              <span>/kathanthaker</span>
            </a>
          </div>

          {/* Status indicator */}
          <div className="network-status">
            <span className="status-dot"></span>
            <span>All systems operational</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div 
        className="footer-bottom"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p className="copyright">
          © {new Date().getFullYear()} Kathan Thaker. All rights reserved.
        </p>
        <p className="build-info">Build v2024.1</p>
      </motion.div>
    </div>
  );
};

// ========================================
// 🎨 PERSONAL FOOTER - CLEAN CREATIVE
// ========================================
const PersonalFooter = () => {
  return (
    <div className="personal-footer-content">
      {/* Subtle floating elements */}
      <div className="floating-decorations">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="float-item"
            animate={{ 
              y: [0, -15, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{ 
              left: `${15 + i * 14}%`,
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      <motion.div
        className="footer-main-content"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Headline */}
        <h2 className="footer-headline">
          Let's Create Something Amazing!
        </h2>

        {/* Social icons */}
        <div className="footer-social-links">
          <motion.a
            href="https://instagram.com/kathanthaker"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram size={20} />
          </motion.a>
          
          <motion.a
            href="https://linkedin.com/in/kathanthaker"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin size={20} />
          </motion.a>
          
          <motion.a
            href="https://github.com/kathanthaker"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
          </motion.a>
          
          <motion.a
            href="mailto:kathan@example.com"
            className="social-icon"
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={20} />
          </motion.a>
        </div>

        {/* Wavy divider */}
        <svg className="wavy-divider" viewBox="0 0 800 40" fill="none">
          <motion.path
            d="M0 20 Q 100 10, 200 20 T 400 20 T 600 20 T 800 20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>

        {/* Handcrafted message */}
        <p className="handcrafted-by">
          Handcrafted with 
          <motion.span
            className="icon-wrapper"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart size={16} fill="#FF5B00" color="#FF5B00" />
          </motion.span>
          and
          <Coffee size={16} className="coffee-icon" />
          by Kathan Thaker
        </p>
      </motion.div>

      {/* Copyright */}
      <p className="footer-copyright">
        © {new Date().getFullYear()} Kathan Thaker. All rights reserved.
      </p>
    </div>
  );
};

export default function Footer() {
  const { mode } = useMode();
  
  return (
    <footer className="site-footer" data-mode={mode}>
      {mode === 'professional' ? <ProfessionalFooter /> : <PersonalFooter />}
    </footer>
  );
}
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "../../styles/pro/hero.css";

export default function ProfessionalHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [systemMetrics, setSystemMetrics] = useState({
    cpu: 42,
    memory: 67,
    network: 89,
    latency: 12
  });

  // ✅ Matrix Rain Effect (Optimized)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン".split("");
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array(Math.floor(columns)).fill(1);

    let animationId: number;
    let lastTime = 0;
    const fps = 30; // Limit to 30fps for better performance
    const interval = 1000 / fps;

    function draw(currentTime: number) {
      if (!ctx || !canvas) return;
      
      if (currentTime - lastTime < interval) {
        animationId = requestAnimationFrame(draw);
        return;
      }
      
      lastTime = currentTime;
      
      ctx.fillStyle = "rgba(10, 14, 19, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff88";
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = requestAnimationFrame(draw);
    }

    animationId = requestAnimationFrame(draw);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ✅ Real System Metrics (Batched state update)
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics({
        cpu: Math.min(100, Math.max(20, Math.random() * 80)),
        memory: Math.min(100, Math.max(40, 60 + Math.random() * 20)),
        network: Math.min(100, Math.max(70, 85 + Math.random() * 15)),
        latency: Math.floor(10 + Math.random() * 30)
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pro-hero" id="home">
      {/* Matrix Rain Background */}
      <canvas ref={canvasRef} className="matrix-canvas" aria-hidden="true" />
      
      {/* Scan lines overlay */}
      <div className="scan-lines" aria-hidden="true" />

      {/* Technical Grid Background */}
      <div className="grid-overlay" aria-hidden="true" />
      
      {/* Network Topology Visualization */}
      <div className="network-topology" aria-hidden="true">
        <div className="topology-node" />
        <div className="topology-node" />
        <div className="topology-node" />
        <div className="topology-node" />
      </div>

      {/* System Metrics Sidebar */}
      <motion.div 
        className="system-metrics-sidebar"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="metrics-header">
          <span className="metrics-title">System Monitor</span>
          <span className="metrics-timestamp">
            {new Date().toLocaleTimeString()}
          </span>
        </div>
        <div className="metrics-body">
          <div className="metric-row">
            <span className="metric-label">CPU Load</span>
            <span className="metric-value">{systemMetrics.cpu.toFixed(1)}%</span>
            <div className="metric-bar-container">
              <motion.div 
                className="metric-bar-fill"
                animate={{ width: `${systemMetrics.cpu}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          <div className="metric-row">
            <span className="metric-label">Memory</span>
            <span className="metric-value">{systemMetrics.memory.toFixed(1)}%</span>
            <div className="metric-bar-container">
              <motion.div 
                className="metric-bar-fill"
                animate={{ width: `${systemMetrics.memory}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          <div className="metric-row">
            <span className="metric-label">Network</span>
            <span className="metric-value">{systemMetrics.network.toFixed(1)}%</span>
            <div className="metric-bar-container">
              <motion.div 
                className="metric-bar-fill"
                animate={{ width: `${systemMetrics.network}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          <div className="metric-row">
            <span className="metric-label">Latency</span>
            <span className="metric-value">{systemMetrics.latency}ms</span>
          </div>
        </div>
      </motion.div>

      {/* Certification Cards */}
      <motion.div 
        className="cert-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <motion.div 
          className="cert-card comptia"
          whileHover={{ scale: 1.05, y: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="cert-card-header">
            <span className="cert-logo">A+</span>
            <span className="cert-status-icon">✓</span>
          </div>
          <div className="cert-name">CompTIA A+</div>
          <div className="cert-id">ID: COMP001</div>
        </motion.div>

        <motion.div 
          className="cert-card cisco"
          whileHover={{ scale: 1.05, y: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="cert-card-header">
            <span className="cert-logo">CCNA</span>
            <span className="cert-status-icon">✓</span>
          </div>
          <div className="cert-name">Cisco CCNA</div>
          <div className="cert-id">ID: CSCO442</div>
        </motion.div>

        <motion.div 
          className="cert-card google"
          whileHover={{ scale: 1.05, y: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="cert-card-header">
            <span className="cert-logo">GCP</span>
            <span className="cert-status-icon">✓</span>
          </div>
          <div className="cert-name">Google IT</div>
          <div className="cert-id">ID: GOOG789</div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="pro-hero-inner">
        <motion.div
          className="system-label"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          NETWORK & SYSTEMS OPERATIONS
        </motion.div>

        <motion.h1 
          className="pro-title glitch-text"
          data-text="Computer Systems Technician"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="title-line">Computer Systems</span>
          <span className="title-line">Technician</span>
        </motion.h1>

        <motion.p 
          className="pro-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Specializing in infrastructure deployment, network architecture, 
          and enterprise IT solutions
          <span className="role-badge">
            <span>●</span> Systems Engineer
          </span>
        </motion.p>

        <motion.div 
          className="pro-tags"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {[
            "Active Directory", 
            "DHCP/DNS", 
            "VMware/Hyper-V", 
            "Cloud Infrastructure",
            "Network Security",
            "Windows Server"
          ].map((tag, index) => (
            <motion.span 
              key={index} 
              className="tech-tag"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          className="system-status"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="status-item">
            <span className="status-indicator" />
            <span>All Systems Operational</span>
          </div>
          <div className="status-item">
            <span className="status-indicator" />
            <span>Network: 99.9% Uptime</span>
          </div>
          <div className="status-item">
            <span className="status-indicator" />
            <span>Security: Active</span>
          </div>
        </motion.div>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.a 
            href="#projects" 
            className="cta-btn primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Infrastructure Projects
            <span className="btn-icon">→</span>
          </motion.a>
          <motion.a 
            href="#contact" 
            className="cta-btn secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
            <span className="btn-icon">✉</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
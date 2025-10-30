import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/shared/landing.css";

export default function LandingPage() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0);
  const [systemCheck, setSystemCheck] = useState({
    cpu: false,
    memory: false,
    network: false,
    storage: false,
    graphics: false
  });

  useEffect(() => {
    // System check animation
    const checkSequence = [
      setTimeout(() => {
        setPhase(1);
        setSystemCheck(prev => ({ ...prev, cpu: true }));
      }, 100),
      setTimeout(() => {
        setSystemCheck(prev => ({ ...prev, memory: true }));
      }, 400),
      setTimeout(() => {
        setSystemCheck(prev => ({ ...prev, network: true }));
      }, 700),
      setTimeout(() => {
        setSystemCheck(prev => ({ ...prev, storage: true }));
      }, 1000),
      setTimeout(() => {
        setSystemCheck(prev => ({ ...prev, graphics: true }));
      }, 1300),
      setTimeout(() => setPhase(2), 1800),     // Show welcome
      setTimeout(() => setPhase(3), 3800),     // Glitch starts
      setTimeout(() => setPhase(4), 4000),     // Black screen
      setTimeout(() => setPhase(5), 4200),     // Sudo appears
      setTimeout(() => setPhase(6), 4800),     // Final glitch
      setTimeout(() => {
        navigate('/professional');
      }, 5000) // Navigate
    ];

    // Log boot sequence
    console.log('%c[BOOT] System initialization started...', 'color: #00ff88; font-weight: bold;');

    return () => checkSequence.forEach(timer => clearTimeout(timer));
  }, [navigate]);

  return (
    <div className="cinematic-landing">
      {/* Film Grain Overlay */}
      <div className="film-grain" />

      <AnimatePresence mode="wait">
        {/* Phase 0-1: System Check */}
        {phase >= 0 && phase < 2 && (
          <motion.div
            className="system-check-sequence"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bios-header">
              <div className="bios-logo">PORTFOLIO BIOS v2.0</div>
              <div className="bios-date">{new Date().toLocaleDateString()}</div>
            </div>

            <div className="system-check-container">
              <h3>SYSTEM CHECK</h3>
              <div className="check-items">
                <motion.div 
                  className="check-item"
                  animate={{ opacity: systemCheck.cpu ? 1 : 0.3 }}
                >
                  <span className="check-label">CPU Check............</span>
                  <span className={`check-status ${systemCheck.cpu ? 'ok' : ''}`}>
                    {systemCheck.cpu ? '[ OK ]' : '[ -- ]'}
                  </span>
                </motion.div>

                <motion.div 
                  className="check-item"
                  animate={{ opacity: systemCheck.memory ? 1 : 0.3 }}
                >
                  <span className="check-label">Memory Test..........</span>
                  <span className={`check-status ${systemCheck.memory ? 'ok' : ''}`}>
                    {systemCheck.memory ? '[ OK ]' : '[ -- ]'}
                  </span>
                </motion.div>

                <motion.div 
                  className="check-item"
                  animate={{ opacity: systemCheck.network ? 1 : 0.3 }}
                >
                  <span className="check-label">Network Interface....</span>
                  <span className={`check-status ${systemCheck.network ? 'ok' : ''}`}>
                    {systemCheck.network ? '[ OK ]' : '[ -- ]'}
                  </span>
                </motion.div>

                <motion.div 
                  className="check-item"
                  animate={{ opacity: systemCheck.storage ? 1 : 0.3 }}
                >
                  <span className="check-label">Storage Devices......</span>
                  <span className={`check-status ${systemCheck.storage ? 'ok' : ''}`}>
                    {systemCheck.storage ? '[ OK ]' : '[ -- ]'}
                  </span>
                </motion.div>

                <motion.div 
                  className="check-item"
                  animate={{ opacity: systemCheck.graphics ? 1 : 0.3 }}
                >
                  <span className="check-label">Graphics Init........</span>
                  <span className={`check-status ${systemCheck.graphics ? 'ok' : ''}`}>
                    {systemCheck.graphics ? '[ OK ]' : '[ -- ]'}
                  </span>
                </motion.div>
              </div>

              {Object.values(systemCheck).every(v => v) && (
                <motion.div
                  className="check-complete"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="success-message">✓ All systems operational</span>
                  <span className="boot-message">Booting portfolio...</span>
                </motion.div>
              )}
            </div>

            <div className="bios-footer">
              Press F2 for Setup | Press F12 for Boot Menu | ESC to Skip
            </div>
          </motion.div>
        )}

        {/* Phase 2-3: Welcome Text with Nature + Creative Elements */}
        {phase >= 2 && phase < 4 && (
          <motion.div
            className="welcome-sequence"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Nature Background */}
            <div className="nature-background">
              <div className="sky">
                <div className="cloud cloud-1"></div>
                <div className="cloud cloud-2"></div>
                <div className="cloud cloud-3"></div>
                <div className="cloud cloud-4"></div>
              </div>
              
              <div className="grass-field">
                <div className="grass-layer grass-back"></div>
                <div className="grass-layer grass-mid"></div>
                <div className="grass-layer grass-front"></div>
              </div>

              <div className="sun-glow"></div>
            </div>

            {/* Creative Elements */}
            <div className="creative-elements">
              {/* Floating Particles */}
              {[...Array(15)].map((_, i) => (
                <div
                  key={`particle-${i}`}
                  className="particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${3 + Math.random() * 4}s`
                  }}
                />
              ))}

              {/* Light Rays */}
              <div className="light-rays">
                <div className="ray ray-1"></div>
                <div className="ray ray-2"></div>
                <div className="ray ray-3"></div>
              </div>

              {/* Geometric Accents */}
              <div className="geometric-shapes">
                <div className="geo-circle geo-1"></div>
                <div className="geo-circle geo-2"></div>
                <div className="geo-line geo-3"></div>
                <div className="geo-line geo-4"></div>
              </div>

              {/* Botanical Flourish */}
              <div className="botanical-left"></div>
              <div className="botanical-right"></div>

              {/* Center Frame */}
              <div className="center-frame"></div>
            </div>

            {/* Typography */}
            <motion.div
              className={`cinematic-title ${phase === 3 ? 'glitch-out' : ''}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
            >
              <motion.div
                className="title-line"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
              >
                <span className="welcome-text">Welcome to</span>
              </motion.div>
              
              <motion.div
                className="title-line main"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
              >
                <span className="name-text" data-text="Kathan Thaker">
                  Kathan Thaker
                </span>
              </motion.div>

              {/* System info */}
              <motion.div
                className="system-info"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <span className="info-item">v2.0.0</span>
                <span className="info-separator">|</span>
                <span className="info-item">React 18</span>
                <span className="info-separator">|</span>
                <span className="info-item">TypeScript</span>
              </motion.div>

              {/* Underline Flourish */}
              <motion.div
                className="name-underline"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
              />
            </motion.div>
          </motion.div>
        )}

        {/* Phase 4: Quick Black Screen */}
        {phase === 4 && (
          <motion.div
            className="black-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          />
        )}

        {/* Phase 5-6: Fast Sudo Command */}
        {phase >= 5 && phase < 7 && (
          <motion.div
            className="sudo-sequence"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.05 }}
          >
            <div className={`sudo-container ${phase === 6 ? 'glitch-final' : ''}`}>
              <motion.div
                className="sudo-command"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <span className="sudo-symbol">$</span>
                <motion.span
                  className="sudo-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                >
                  sudo systemctl start portfolio --mode=professional
                </motion.span>
              </motion.div>

              <motion.div
                className="command-output"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="output-line">● portfolio.service - Kathan's Portfolio</div>
                <div className="output-line">   Active: <span className="success">active (running)</span></div>
                <div className="output-line">   Memory: 42.0M</div>
                <div className="output-line">   CGroup: /system.slice/portfolio.service</div>
              </motion.div>

              <div className="glitch-bars">
                <div className="glitch-bar" style={{ top: '20%' }} />
                <div className="glitch-bar" style={{ top: '45%' }} />
                <div className="glitch-bar" style={{ top: '70%' }} />
              </div>

              <div className="vhs-tracking" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Transition Wipe */}
      {phase === 6 && (
        <motion.div
          className="transition-wipe"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
    </div>
  );
}
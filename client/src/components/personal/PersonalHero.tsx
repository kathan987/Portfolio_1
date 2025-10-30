import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useMode } from "../../App"; // ✅ Import useMode
import "../../styles/personal/hero.css";

export default function PersonalHero() {
  const { isMobile } = useMode(); // ✅ Get mobile state
  const [showLogos, setShowLogos] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const blobCanvasRef = useRef<HTMLCanvasElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 100 : 200]); // ✅ Less parallax on mobile
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // ✅ ONLY track mouse on desktop
  useEffect(() => {
    if (isMobile) return; // Skip on mobile
    
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [mouseX, mouseY, isMobile]);

  // ✅ ONLY animate blobs on desktop
  useEffect(() => {
    if (isMobile) return; // Skip blob animation on mobile
    
    const canvas = blobCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId: number;
    let time = 0;
    let lastTime = 0;
    const fps = 30;
    const interval = 1000 / fps;

    const blobs = [
      { x: 0.3, y: 0.4, radius: 0.25, color: 'rgba(255, 91, 0, 0.15)', speed: 0.003, offset: 0 },
      { x: 0.7, y: 0.6, radius: 0.2, color: 'rgba(255, 140, 50, 0.12)', speed: 0.004, offset: Math.PI },
      { x: 0.5, y: 0.3, radius: 0.3, color: 'rgba(139, 92, 246, 0.1)', speed: 0.0025, offset: Math.PI / 2 }
    ];

    function drawBlob(blob: any, t: number) {
      if (!ctx || !canvas) return;
      
      const noise1 = Math.sin(t * blob.speed + blob.offset) * 30;
      const noise2 = Math.cos(t * blob.speed * 1.5 + blob.offset) * 20;
      
      const centerX = canvas.width * blob.x + noise1;
      const centerY = canvas.height * blob.y + noise2;
      const radius = canvas.width * blob.radius;

      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, blob.color);
      gradient.addColorStop(1, 'rgba(255, 91, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    function animate(currentTime: number) {
      if (!ctx || !canvas) return;
      
      if (currentTime - lastTime < interval) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      
      lastTime = currentTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      time++;
      blobs.forEach(blob => drawBlob(blob, time));
      
      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  // ✅ Don't show logos on mobile
  useEffect(() => {
    if (isMobile) return;
    
    const timer = setTimeout(() => {
      setShowLogos(true);
    }, 1400);
    return () => clearTimeout(timer);
  }, [isMobile]);

  const logos = useMemo(() => [
    { name: "Figma", src: "/images/tools/figma.png", position: { top: "15%", left: "8%" }, delay: 0 },
    { name: "Photoshop", src: "/images/tools/adobe-ps.png", position: { top: "20%", right: "10%" }, delay: 0.15 },
    { name: "Instagram", src: "/images/tools/ig.png", position: { bottom: "25%", left: "12%" }, delay: 0.3 },
    { name: "YouTube", src: "/images/tools/yt.png", position: { bottom: "30%", right: "15%" }, delay: 0.45 },
    { name: "Canva", src: "/images/tools/canva.png", position: { top: "45%", left: "6%" }, delay: 0.6 }
  ], []);

  const getMagneticOffset = (logoPos: any) => {
    if (!heroRef.current || isMobile) return { x: 0, y: 0 }; // ✅ Disable on mobile
    
    const rect = heroRef.current.getBoundingClientRect();
    const logoX = (logoPos.left ? parseFloat(logoPos.left) / 100 * rect.width : rect.width - parseFloat(logoPos.right) / 100 * rect.width);
    const logoY = (logoPos.top ? parseFloat(logoPos.top) / 100 * rect.height : rect.height - parseFloat(logoPos.bottom) / 100 * rect.height);
    
    const dx = mousePosition.x - logoX;
    const dy = mousePosition.y - logoY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 200;
    
    if (distance < maxDistance) {
      const force = (maxDistance - distance) / maxDistance;
      return {
        x: -dx * force * 0.5,
        y: -dy * force * 0.5
      };
    }
    
    return { x: 0, y: 0 };
  };

  return (
    <section className="personal-hero" ref={heroRef} id="home">
      {/* ✅ ONLY render blob canvas on desktop */}
      {!isMobile && (
        <canvas ref={blobCanvasRef} className="liquid-blob-canvas" aria-hidden="true" />
      )}
      
      <div className="grid-background" aria-hidden="true"></div>

      {/* ✅ ONLY render Penrose on desktop */}
      {!isMobile && (
        <motion.div 
          className="impossible-geometry"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 200 200" className="penrose-triangle">
            <defs>
              <linearGradient id="penroseGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF5B00" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FF8F50" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="penroseGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FF8F50" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="penroseGrad3" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#FF5B00" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path d="M 100 30 L 170 150 L 100 120 Z" fill="url(#penroseGrad1)" stroke="#FF5B00" strokeWidth="2" opacity="0.6" />
            <path d="M 100 30 L 30 150 L 100 120 Z" fill="url(#penroseGrad2)" stroke="#FF8F50" strokeWidth="2" opacity="0.6" />
            <path d="M 30 150 L 170 150 L 100 120 Z" fill="url(#penroseGrad3)" stroke="#8B5CF6" strokeWidth="2" opacity="0.6" />
          </svg>
        </motion.div>
      )}

      {/* ✅ ONLY render geometric on desktop */}
      {!isMobile && (
        <div className="hero-geometric" aria-hidden="true">
          <motion.div 
            className="geo-circle"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          <div className="geo-line horizontal"></div>
          <div className="geo-line vertical"></div>
        </div>
      )}

      {/* ✅ ONLY render floating logos on desktop */}
      {!isMobile && showLogos && logos.map((logo, index) => {
        const offset = getMagneticOffset(logo.position);
        
        return (
          <motion.div
            key={logo.name}
            className="floating-logo magnetic"
            style={{
              ...logo.position,
              x: offset.x,
              y: offset.y
            }}
            initial={{ 
              scale: 0.3,
              opacity: 0,
              x: "-50%",
              y: "-50%",
              left: "50%",
              top: "50%",
            }}
            animate={{ 
              scale: 1,
              opacity: 1,
              left: logo.position.left || "auto",
              right: logo.position.right || "auto",
              top: logo.position.top || "auto",
              bottom: logo.position.bottom || "auto",
            }}
            transition={{
              delay: logo.delay,
              duration: 0.8,
              ease: [0.6, 0.05, 0.01, 0.9]
            }}
            whileHover={{ 
              scale: 1.25,
              rotate: 8,
              zIndex: 20
            }}
          >
            <div className="logo-container magnetic-container">
              <img 
                src={logo.src} 
                alt={logo.name}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = `<span class="logo-fallback">${logo.name.charAt(0)}</span>`;
                  }
                }}
              />
              <div className="logo-glow magnetic-glow"></div>
            </div>
          </motion.div>
        );
      })}

      <motion.div className="hero-content" style={{ y, opacity }}>
        <motion.p
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Kathan Thaker — Portfolio 2025
        </motion.p>

        <motion.h1
          className="hero-title floating-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
        >
          {/* ✅ Disable parallax on mobile */}
          <motion.span 
            className="title-main"
            style={!isMobile ? {
              x: useTransform(smoothMouseX, [0, window.innerWidth], [-10, 10]),
              y: useTransform(smoothMouseY, [0, window.innerHeight], [-10, 10])
            } : {}}
          >
            Product & Visual
          </motion.span>
          <motion.span 
            className="title-accent"
            style={!isMobile ? {
              x: useTransform(smoothMouseX, [0, window.innerWidth], [-15, 15]),
              y: useTransform(smoothMouseY, [0, window.innerHeight], [-15, 15])
            } : {}}
          >
            Designer
          </motion.span>
        </motion.h1>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={!isMobile ? {
            x: useTransform(smoothMouseX, [0, window.innerWidth], [-8, 8]),
            y: useTransform(smoothMouseY, [0, window.innerHeight], [-8, 8])
          } : {}}
        >
          I design clean, modern experiences that merge creativity and logic.
          <br />
          From brand identity to digital interfaces — built with purpose.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          
          <motion.a 
            href="#contact" 
            className="btn-secondary"
            whileHover={{ scale: isMobile ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </motion.div>

      {/* ✅ ONLY render scroll portal on desktop */}
      {!isMobile && (
        <motion.div
          className="scroll-portal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={() => {
            window.scrollTo({ 
              top: window.innerHeight, 
              behavior: 'smooth' 
            });
          }}
          style={{ cursor: 'pointer' }}
        >
          <div className="portal-ring ring-1"></div>
          <div className="portal-ring ring-2"></div>
          <div className="portal-ring ring-3"></div>
          <div className="portal-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </motion.div>
      )}

      {/* ✅ ONLY render cursor trail on desktop */}
      {!isMobile && (
        <motion.div
          className="cursor-trail"
          style={{
            left: smoothMouseX,
            top: smoothMouseY
          }}
        />
      )}
    </section>
  );
}
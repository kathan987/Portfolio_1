import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useMode } from '../../App'; // ✅ Import useMode
import '../../styles/personal/tools.css';

interface Tool {
  name: string;
  category: string;
  logo: string;
  tagline: string;
  howIUse: string;
  whyIUse: string;
  angle: number;
  radius: number;
  delay: number;
  color: string;
}

export default function ToolsMarquee() {
  const { isMobile } = useMode(); // ✅ Get mobile state
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredTool, setHoveredTool] = useState<Tool | null>(null);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0, side: 'right' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // ✅ TOOLS ARRAY - Complete definition
  const tools: Tool[] = [
    {
      name: 'Figma',
      category: 'UI/UX Design',
      logo: 'https://cdn.worldvectorlogo.com/logos/figma-5.svg',
      tagline: 'Collaborative interface design',
      howIUse: 'I design complete user interfaces, create interactive prototypes, and maintain design systems.',
      whyIUse: 'Real-time collaboration and component systems make it perfect for modern design work.',
      angle: 0,
      radius: 200,
      delay: 0,
      color: '#F24E1E'
    },
    {
      name: 'Photoshop',
      category: 'Photo Editing',
      logo: 'https://cdn.worldvectorlogo.com/logos/photoshop-cc-4.svg',
      tagline: 'Professional image editing',
      howIUse: 'Photo manipulation, marketing materials, and social media graphics creation.',
      whyIUse: 'Industry-standard with unmatched pixel-perfect editing capabilities and creative control.',
      angle: 45,
      radius: 220,
      delay: 0.15,
      color: '#31A8FF'
    },
    {
      name: 'Illustrator',
      category: 'Vector Graphics',
      logo: 'https://cdn.worldvectorlogo.com/logos/illustrator-cc.svg',
      tagline: 'Vector illustration & branding',
      howIUse: 'Creating logos, icons, illustrations, and brand identity systems across all sizes.',
      whyIUse: 'Vector-based precision allows artwork that scales infinitely without quality loss.',
      angle: 90,
      radius: 210,
      delay: 0.3,
      color: '#FF9A00'
    },
    {
      name: 'After Effects',
      category: 'Motion Graphics',
      logo: 'https://cdn.worldvectorlogo.com/logos/after-effects-cc.svg',
      tagline: 'Animation & motion design',
      howIUse: 'Creating animated logos, explainer videos, and UI animations that bring designs to life.',
      whyIUse: 'Most powerful motion graphics tool with extensive plugins for complex animations.',
      angle: 135,
      radius: 215,
      delay: 0.45,
      color: '#9999FF'
    },
    {
      name: 'Premiere Pro',
      category: 'Video Editing',
      logo: 'https://cdn.worldvectorlogo.com/logos/premiere-cc.svg',
      tagline: 'Professional video editing',
      howIUse: 'Editing promotional videos, tutorials, and social media content with polish.',
      whyIUse: 'Industry-standard with powerful timeline editing and seamless After Effects integration.',
      angle: 180,
      radius: 205,
      delay: 0.6,
      color: '#9999FF'
    },
    {
      name: 'Adobe XD',
      category: 'Prototyping',
      logo: 'https://cdn.worldvectorlogo.com/logos/adobe-xd-1.svg',
      tagline: 'Fast prototyping & wireframing',
      howIUse: 'Quick wireframing, interactive prototypes, and testing user flows rapidly.',
      whyIUse: 'Lightning-fast performance makes it ideal for quick iterations and user testing.',
      angle: 225,
      radius: 225,
      delay: 0.75,
      color: '#FF61F6'
    },
    {
      name: 'Canva',
      category: 'Quick Design',
      logo: 'https://cdn.worldvectorlogo.com/logos/canva-1.svg',
      tagline: 'Rapid content creation',
      howIUse: 'Quick social media posts, presentations, and templated marketing materials.',
      whyIUse: 'Incredibly efficient for recurring tasks with template library saving hours.',
      angle: 270,
      radius: 195,
      delay: 0.9,
      color: '#00C4CC'
    },
    {
      name: 'InDesign',
      category: 'Layout Design',
      logo: 'https://cdn.worldvectorlogo.com/logos/adobe-indesign-cc-icon.svg',
      tagline: 'Print & publication design',
      howIUse: 'Creating magazines, brochures, portfolios, and typography-heavy layouts.',
      whyIUse: 'Unmatched for multi-page layouts with master pages and consistent styling.',
      angle: 315,
      radius: 210,
      delay: 1.05,
      color: '#FF3366'
    }
  ];

  // ✅ HANDLE TOOL HOVER - Complete function
  const handleToolHover = (tool: Tool, event: React.MouseEvent) => {
    const containerRect = event.currentTarget.getBoundingClientRect();
    const containerCenterX = window.innerWidth / 2;
    
    // Determine which side to show card based on tool position
    const isLeftSide = containerRect.left < containerCenterX;

    setHoveredTool(tool);
    setCardPosition({
      x: containerRect.left + containerRect.width / 2,
      y: containerRect.top + containerRect.height / 2,
      side: isLeftSide ? 'right' : 'left'
    });
  };

  return (
    <section className="tools-marquee-section" ref={sectionRef}>
      <motion.div className="tools-container" style={{ opacity }}>
        <div className="tools-header">
          <motion.h2
            className="tools-title"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Creative Arsenal
          </motion.h2>
          <motion.p
            className="tools-subtitle"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {isMobile ? 'Tap to explore tools' : 'Hover to explore each tool in my workflow'}
          </motion.p>
        </div>

        <div className="constellation-container">
          <motion.div
            className="constellation-core"
            initial={{ scale: 0, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* ✅ ONLY render pulse on desktop */}
            {!isMobile && <div className="core-pulse"></div>}
            <div className="core-ring"></div>
            <div className="core-center">
              <span className="core-icon">⚡</span>
            </div>
          </motion.div>

          {/* ✅ TOOLS MAPPING - Complete implementation */}
          {tools.map((tool) => {
            const x = Math.cos((tool.angle * Math.PI) / 180) * tool.radius;
            const y = Math.sin((tool.angle * Math.PI) / 180) * tool.radius;

            return (
              <motion.div
                key={tool.name}
                className="tool-orbit"
                initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                animate={isVisible ? { x, y, scale: 1, opacity: 1 } : {}}
                transition={{
                  duration: isMobile ? 0.8 : 1.2,
                  delay: tool.delay,
                  ease: [0.6, 0.05, 0.01, 0.9]
                }}
              >
                {/* ✅ ONLY render connection line on desktop */}
                {!isMobile && (
                  <motion.div
                    className="connection-line"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isVisible ? { scale: 1, opacity: 0.3 } : {}}
                    transition={{ duration: 0.6, delay: tool.delay + 0.8 }}
                    style={{
                      width: `${tool.radius}px`,
                      transform: `rotate(${tool.angle + 180}deg)`,
                      transformOrigin: 'left center',
                      background: `linear-gradient(to right, ${tool.color}80, transparent)`
                    }}
                  />
                )}

                <motion.div
                  className="tool-node"
                  onMouseEnter={(e) => !isMobile && handleToolHover(tool, e)}
                  onMouseLeave={() => !isMobile && setHoveredTool(null)}
                  onClick={(e) => isMobile && handleToolHover(tool, e)}
                  whileHover={!isMobile ? { scale: 1.2 } : {}}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  style={{ '--tool-color': tool.color } as any}
                >
                  <div className="tool-glow" style={{ background: `${tool.color}40` }}></div>
                  
                  <div className="tool-logo-wrapper">
                    <img 
                      src={tool.logo} 
                      alt={tool.name}
                      className="tool-node-logo"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${tool.name}&background=${tool.color.replace('#', '')}&color=fff&size=80`;
                      }}
                    />
                  </div>

                  {!isMobile && <div className="hover-pulse"></div>}
                </motion.div>
              </motion.div>
            );
          })}

          {/* ✅ ONLY render supernova on desktop */}
          {!isMobile && (
            <motion.div
              className="supernova-flash"
              initial={{ scale: 0, opacity: 0 }}
              animate={isVisible ? {
                scale: [0, 3, 0],
                opacity: [0, 0.8, 0]
              } : {}}
              transition={{
                duration: 1.5,
                delay: 2.2,
                ease: "easeOut"
              }}
            />
          )}

          {/* ✅ ONLY render particle burst on desktop */}
          {!isMobile && (
            <div className="particle-burst">
              {[...Array(24)].map((_, i) => (
                <motion.div
                  key={i}
                  className="burst-particle"
                  initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                  animate={isVisible ? {
                    scale: [0, 1, 0],
                    x: Math.cos((i * 15 * Math.PI) / 180) * 300,
                    y: Math.sin((i * 15 * Math.PI) / 180) * 300,
                    opacity: [0, 1, 0]
                  } : {}}
                  transition={{
                    duration: 1.5,
                    delay: 2.2 + (i * 0.02),
                    ease: "easeOut"
                  }}
                  style={{
                    background: `hsl(${i * 15}, 80%, 60%)`
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* ✅ HOVER CARD - Complete implementation */}
        <AnimatePresence>
          {hoveredTool && (
            <motion.div
              className={`tool-info-card compact ${cardPosition.side}`}
              initial={{ opacity: 0, scale: 0.8, x: cardPosition.side === 'right' ? -20 : 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: cardPosition.side === 'right' ? -20 : 20 }}
              transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                left: cardPosition.side === 'right' ? cardPosition.x + 60 : 'auto',
                right: cardPosition.side === 'left' ? window.innerWidth - cardPosition.x + 60 : 'auto',
                top: cardPosition.y,
                borderColor: hoveredTool.color,
                '--accent-color': hoveredTool.color
              } as any}
            >
              {/* Pointer Arrow */}
              <div 
                className="card-arrow" 
                style={{ 
                  borderRightColor: cardPosition.side === 'right' ? hoveredTool.color : 'transparent',
                  borderLeftColor: cardPosition.side === 'left' ? hoveredTool.color : 'transparent'
                }}
              ></div>

              {/* Card Header */}
              <div className="card-header-compact">
                <div className="card-logo-compact">
                  <img 
                    src={hoveredTool.logo} 
                    alt={hoveredTool.name}
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${hoveredTool.name}&background=${hoveredTool.color.replace('#', '')}&color=fff&size=60`;
                    }}
                  />
                </div>
                <div className="card-title-compact">
                  <h3>{hoveredTool.name}</h3>
                  <span className="category-badge" style={{ background: `${hoveredTool.color}20`, color: hoveredTool.color }}>
                    {hoveredTool.category}
                  </span>
                </div>
              </div>

              {/* Tagline */}
              <p className="card-tagline-compact">{hoveredTool.tagline}</p>

              {/* Divider */}
              <div className="card-divider" style={{ background: hoveredTool.color }}></div>

              {/* Info Sections */}
              <div className="card-info-compact">
                <div className="info-block">
                  <div className="info-icon" style={{ color: hoveredTool.color }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="info-content">
                    <h4>How I Use It</h4>
                    <p>{hoveredTool.howIUse}</p>
                  </div>
                </div>

                <div className="info-block">
                  <div className="info-icon" style={{ color: hoveredTool.color }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="info-content">
                    <h4>Why I Choose It</h4>
                    <p>{hoveredTool.whyIUse}</p>
                  </div>
                </div>
              </div>

              {/* Proficiency */}
              <div className="card-footer-compact">
                <span className="proficiency-label">Proficiency</span>
                <div className="proficiency-dots-compact">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="prof-dot-compact"
                      style={{ background: hoveredTool.color }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.03 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="tools-footer"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 2.5 }}
        >
          <p className="tools-footer-text">
            Mastering the craft with industry-leading tools
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
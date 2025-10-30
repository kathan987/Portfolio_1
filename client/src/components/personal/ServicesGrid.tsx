import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useMode } from '../../App'; // ✅ Import useMode
import '../../styles/personal/services.css';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  planets: { size: number; distance: number; speed: number; color: string }[];
}

export default function ServicesGrid() {
  const { isMobile } = useMode(); // ✅ Get mobile state
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  // ✅ COMPLETE SERVICES ARRAY
  const services: Service[] = [
    {
      id: 1,
      title: "Brand Identity",
      description: "Crafting memorable visual identities that resonate with your audience and stand the test of time.",
      icon: "✦",
      planets: [
        { size: 8, distance: 60, speed: 8, color: '#FF5B00' },
        { size: 5, distance: 90, speed: 12, color: '#FF8F50' },
        { size: 6, distance: 120, speed: 16, color: '#8B5CF6' }
      ]
    },
    {
      id: 2,
      title: "Web Design",
      description: "Building beautiful, responsive websites that convert visitors into loyal customers.",
      icon: "◆",
      planets: [
        { size: 7, distance: 70, speed: 10, color: '#3B82F6' },
        { size: 9, distance: 100, speed: 14, color: '#60A5FA' },
        { size: 4, distance: 130, speed: 18, color: '#93C5FD' }
      ]
    },
    {
      id: 3,
      title: "Motion Graphics",
      description: "Bringing stories to life through dynamic animations and compelling visual narratives.",
      icon: "★",
      planets: [
        { size: 6, distance: 65, speed: 9, color: '#EC4899' },
        { size: 8, distance: 95, speed: 13, color: '#F472B6' },
        { size: 5, distance: 125, speed: 17, color: '#F9A8D4' }
      ]
    },
    {
      id: 4,
      title: "UI/UX Design",
      description: "Designing intuitive interfaces that users love, backed by research and data-driven insights.",
      icon: "◉",
      planets: [
        { size: 7, distance: 75, speed: 11, color: '#10B981' },
        { size: 5, distance: 105, speed: 15, color: '#34D399' },
        { size: 9, distance: 140, speed: 19, color: '#6EE7B7' }
      ]
    }
  ];

  return (
    <section className="services-section" ref={ref}>
      <div className="container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="services-title">What I Create</h2>
          <p className="services-subtitle">
            Every project is a universe of possibilities
          </p>
        </motion.div>

        <div className="services-grid">
          {/* ✅ OUTER MAP - Using serviceIndex to avoid confusion */}
          {services.map((service, serviceIndex) => (
            <motion.div
              key={service.id}
              className={`service-universe ${hoveredService === service.id ? 'active' : ''}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: serviceIndex * 0.15, duration: 0.6 }}
              onHoverStart={() => !isMobile && setHoveredService(service.id)}
              onHoverEnd={() => !isMobile && setHoveredService(null)}
              onClick={() => isMobile && setHoveredService(service.id === hoveredService ? null : service.id)}
            >
              <div className="universe-canvas">
                {/* Central Star */}
                <div className="central-star">
                  <span className="star-icon">{service.icon}</span>
                  <div className="star-glow"></div>
                </div>

                {/* ✅ INNER MAP - Using planetIndex for clarity */}
                {service.planets.map((planet, planetIndex) => (
                  <div
                    key={`planet-${service.id}-${planetIndex}`}
                    className="orbit"
                    style={{
                      width: `${planet.distance * 2}px`,
                      height: `${planet.distance * 2}px`,
                      animationDuration: isMobile ? `${planet.speed * 2}s` : `${planet.speed}s`,
                      opacity: hoveredService === service.id ? 1 : 0.4
                    }}
                  >
                    <div
                      className="planet"
                      style={{
                        width: `${planet.size}px`,
                        height: `${planet.size}px`,
                        background: planet.color,
                        boxShadow: isMobile ? 'none' : `0 0 ${planet.size * 2}px ${planet.color}`
                      }}
                    />
                  </div>
                ))}

                {/* ✅ ONLY render particles on desktop */}
                {!isMobile && (
                  <div className="particle-field">
                    {[...Array(12)].map((_, particleIndex) => (
                      <div
                        key={`particle-${service.id}-${particleIndex}`}
                        className="particle"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 3}s`,
                          animationDuration: `${2 + Math.random() * 2}s`
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Service Content */}
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <button className="service-link">
                  Explore
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
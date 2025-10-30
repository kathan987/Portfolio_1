import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/pro/skills.css';

interface Skill {
  name: string;
  level: number;
  category: 'core' | 'networking' | 'infrastructure';
  icon: string;
  latency: number; // Simulated ping
  status: 'online' | 'slow' | 'offline';
  packets: { sent: number; received: number; lost: number };
}

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'core' | 'networking' | 'infrastructure'>('all');
  const [isScanning, setIsScanning] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

  const [skills, setSkills] = useState<Skill[]>([
    { 
      name: 'Windows Server', 
      level: 90, 
      category: 'core', 
      icon: '🪟', 
      latency: 12, 
      status: 'online',
      packets: { sent: 100, received: 100, lost: 0 }
    },
    { 
      name: 'Linux Administration', 
      level: 85, 
      category: 'core', 
      icon: '🐧',
      latency: 8,
      status: 'online',
      packets: { sent: 100, received: 100, lost: 0 }
    },
    { 
      name: 'Active Directory', 
      level: 88, 
      category: 'core', 
      icon: '👥',
      latency: 15,
      status: 'online',
      packets: { sent: 100, received: 99, lost: 1 }
    },
    { 
      name: 'PowerShell Scripting', 
      level: 82, 
      category: 'core', 
      icon: '⚡',
      latency: 5,
      status: 'online',
      packets: { sent: 100, received: 100, lost: 0 }
    },
    { 
      name: 'Help Desk Support', 
      level: 95, 
      category: 'core', 
      icon: '🎫',
      latency: 3,
      status: 'online',
      packets: { sent: 100, received: 100, lost: 0 }
    },
    
    { 
      name: 'TCP/IP Networking', 
      level: 90, 
      category: 'networking', 
      icon: '🌐',
      latency: 22,
      status: 'online',
      packets: { sent: 100, received: 99, lost: 1 }
    },
    { 
      name: 'Cisco IOS', 
      level: 85, 
      category: 'networking', 
      icon: '🔧',
      latency: 18,
      status: 'online',
      packets: { sent: 100, received: 100, lost: 0 }
    },
    { 
      name: 'Network Security', 
      level: 80, 
      category: 'networking', 
      icon: '🔒',
      latency: 45,
      status: 'online',
      packets: { sent: 100, received: 98, lost: 2 }
    },
    { 
      name: 'VLAN Configuration', 
      level: 88, 
      category: 'networking', 
      icon: '🔀',
      latency: 12,
      status: 'online',
      packets: { sent: 100, received: 100, lost: 0 }
    },
    { 
      name: 'Wireshark Analysis', 
      level: 75, 
      category: 'networking', 
      icon: '🦈',
      latency: 156,
      status: 'slow',
      packets: { sent: 100, received: 95, lost: 5 }
    },
    
    { 
      name: 'VMware ESXi', 
      level: 85, 
      category: 'infrastructure', 
      icon: '☁️',
      latency: 28,
      status: 'online',
      packets: { sent: 100, received: 100, lost: 0 }
    },
    { 
      name: 'Microsoft Azure', 
      level: 78, 
      category: 'infrastructure', 
      icon: '☁️',
      latency: 67,
      status: 'online',
      packets: { sent: 100, received: 99, lost: 1 }
    },
    { 
      name: 'Docker Containers', 
      level: 75, 
      category: 'infrastructure', 
      icon: '🐳',
      latency: 9,
      status: 'online',
      packets: { sent: 100, received: 100, lost: 0 }
    },
    { 
      name: 'Git Version Control', 
      level: 88, 
      category: 'infrastructure', 
      icon: '📦',
      latency: 11,
      status: 'online',
      packets: { sent: 100, received: 100, lost: 0 }
    },
    { 
      name: 'System Monitoring', 
      level: 82, 
      category: 'infrastructure', 
      icon: '📊',
      latency: 7,
      status: 'online',
      packets: { sent: 100, received: 100, lost: 0 }
    }
  ]);

  // Simulate real-time latency updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSkills(prevSkills => 
        prevSkills.map(skill => {
          const variance = (Math.random() - 0.5) * 10;
          const newLatency = Math.max(1, skill.latency + variance);
          
          let status: 'online' | 'slow' | 'offline' = 'online';
          if (newLatency > 150) status = 'slow';
          if (newLatency > 500) status = 'offline';
          
          const packetLoss = Math.random() > 0.95 ? Math.floor(Math.random() * 5) : 0;
          
          return {
            ...skill,
            latency: Math.round(newLatency),
            status,
            packets: {
              sent: skill.packets.sent + 1,
              received: skill.packets.received + (packetLoss ? 0 : 1),
              lost: skill.packets.lost + packetLoss
            }
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const runNetworkScan = () => {
    setIsScanning(true);
    setTerminalOutput([]);
    
    const scanSequence = [
      "$ nmap -sP 192.168.1.0/24",
      "Starting Nmap 7.92 scan...",
      "Scanning skill services [15 hosts up]",
      "Host 192.168.1.10 (Windows Server) is up (0.012s latency)",
      "Host 192.168.1.11 (Linux Admin) is up (0.008s latency)",
      "Host 192.168.1.12 (Active Directory) is up (0.015s latency)",
      "MAC Address: 00:0C:29:3E:3B:4F (VMware)",
      "Nmap done: 15 IP addresses (15 hosts up) scanned in 2.31 seconds"
    ];

    scanSequence.forEach((line, index) => {
      setTimeout(() => {
        setTerminalOutput(prev => [...prev, line]);
        if (index === scanSequence.length - 1) {
          setTimeout(() => setIsScanning(false), 500);
        }
      }, index * 300);
    });
  };

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  const categories = [
    { id: 'all' as const, label: 'All Services', count: skills.length },
    { id: 'core' as const, label: 'Core IT', count: skills.filter(s => s.category === 'core').length },
    { id: 'networking' as const, label: 'Networking', count: skills.filter(s => s.category === 'networking').length },
    { id: 'infrastructure' as const, label: 'Infrastructure', count: skills.filter(s => s.category === 'infrastructure').length }
  ];

  const getLatencyColor = (latency: number) => {
    if (latency > 100) return '#ef4444';
    if (latency > 50) return '#f59e0b';
    return '#10b981';
  };

  const getStatusSymbol = (status: string) => {
    switch(status) {
      case 'online': return '●';
      case 'slow': return '◐';
      case 'offline': return '○';
      default: return '●';
    }
  };

  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">
        
        {/* Network Scanner Terminal */}
        <motion.div
          className="network-scanner"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="scanner-header">
            <div className="scanner-dots">
              <span></span><span></span><span></span>
            </div>
            <span className="scanner-title">network-monitor@portfolio</span>
            <button 
              className="scan-button"
              onClick={runNetworkScan}
              disabled={isScanning}
            >
              {isScanning ? 'Scanning...' : 'Run Scan'}
            </button>
          </div>
          <div className="scanner-body">
            {terminalOutput.map((line, i) => (
              <motion.div
                key={i}
                className="scanner-line"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {line}
              </motion.div>
            ))}
            {isScanning && <span className="scanner-cursor">_</span>}
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          className="skills-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="skills-badge">
            <span className="badge-dot"></span>
            <span>NETWORK SERVICES MONITOR</span>
            <span className="live-indicator">
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ● LIVE
              </motion.span>
            </span>
          </div>
          <h2 className="skills-title">Core Competencies</h2>
          <p className="skills-subtitle">
            Real-time service monitoring • {skills.filter(s => s.status === 'online').length}/{skills.length} services operational
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span className="tab-label">{cat.label}</span>
              <span className="tab-count">{cat.count}</span>
              <span className="tab-status">
                {filteredSkills.filter(s => s.status === 'online').length} up
              </span>
            </button>
          ))}
        </div>

        {/* Skills Grid with Network Monitoring */}
        <div className="skills-grid">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className={`skill-card ${skill.status}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05
              }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Service Header */}
              <div className="skill-card-header">
                <span className="skill-icon">{skill.icon}</span>
                <div className="skill-info">
                  <h3 className="skill-name">{skill.name}</h3>
                  <div className="skill-metrics">
                    <span className="metric-item">
                      <span 
                        className="status-symbol" 
                        style={{ color: getLatencyColor(skill.latency) }}
                      >
                        {getStatusSymbol(skill.status)}
                      </span>
                      {skill.status.toUpperCase()}
                    </span>
                    <span className="metric-separator">|</span>
                    <span className="metric-item">
                      Proficiency: {skill.level}%
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Ping Display */}
              <div className="ping-display">
                <div className="ping-label">Response Time:</div>
                <motion.div 
                  className="ping-value"
                  key={skill.latency}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  style={{ color: getLatencyColor(skill.latency) }}
                >
                  {skill.latency}ms
                </motion.div>
                <div className="ping-graph">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className="ping-bar"
                      style={{
                        height: `${20 + Math.random() * 30}%`,
                        backgroundColor: getLatencyColor(skill.latency),
                        opacity: 0.3 + (i / 10) * 0.7
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Skill Bar */}
              <div className="skill-bar-wrapper">
                <motion.div
                  className="skill-bar"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    delay: 0.2 + index * 0.05,
                    ease: "easeOut"
                  }}
                  style={{
                    background: `linear-gradient(90deg, ${getLatencyColor(skill.latency)}, #22d3ee)`
                  }}
                >
                  <div className="skill-bar-shine"></div>
                  <AnimatePresence>
                    {skill.packets.lost > 0 && (
                      <motion.div
                        className="packet-loss-warning"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        ⚠ {skill.packets.lost} packets lost
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Packet Statistics */}
              <div className="packet-stats">
                <span className="packet-stat">
                  ↑ {skill.packets.sent}
                </span>
                <span className="packet-stat">
                  ↓ {skill.packets.received}
                </span>
                <span className="packet-stat loss">
                  ✗ {skill.packets.lost}
                </span>
                <span className="packet-stat">
                  {((skill.packets.received / skill.packets.sent) * 100).toFixed(1)}% success
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Network Summary */}
        <motion.div
          className="network-summary"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="summary-stat">
            <span className="stat-label">Avg Latency:</span>
            <span className="stat-value">
              {Math.round(skills.reduce((acc, s) => acc + s.latency, 0) / skills.length)}ms
            </span>
          </div>
          <div className="summary-stat">
            <span className="stat-label">Services Online:</span>
            <span className="stat-value">
              {skills.filter(s => s.status === 'online').length}/{skills.length}
            </span>
          </div>
          <div className="summary-stat">
            <span className="stat-label">Total Packets:</span>
            <span className="stat-value">
              {skills.reduce((acc, s) => acc + s.packets.sent, 0).toLocaleString()}
            </span>
          </div>
          <div className="summary-stat">
            <span className="stat-label">Packet Loss:</span>
            <span className="stat-value">
              {(skills.reduce((acc, s) => acc + s.packets.lost, 0) / 
                skills.reduce((acc, s) => acc + s.packets.sent, 0) * 100).toFixed(2)}%
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
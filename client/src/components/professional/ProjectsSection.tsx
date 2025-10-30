import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Github, 
  ExternalLink, 
  Server, 
  Activity,
  Thermometer,
  Cpu,
  HardDrive,
  Network,
  X,
  ChevronDown,
  Zap,
  Headphones,
  Cable,
  Database,
  Wind,
  Droplet,
  TrendingUp,
  Shield,
  ArrowLeft
} from "lucide-react";
import "../../styles/pro/projects.css";

interface Project {
  id: number;
  serverName: string;
  title: string;
  description: string;
  image: string;
  status: string;
  temp: number;
  size: string;
  color: string;
  accentColor: string;
  tags: string[];
  roleType: string;
  metrics: {
    uptime: string;
    cpu: number;
    memory: number;
    network: number;
  };
  github: string;
  challenge: string;
  solution: string;
  architecture: string[];
  outcomes: string[];
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [rackTemp, setRackTemp] = useState<number>(24);
  const [rackHumidity, setRackHumidity] = useState<number>(45);
  const [showHVAC, setShowHVAC] = useState(false); // NEW: Show HVAC in monitor

  // Simulate temperature fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setRackTemp(prev => {
        const change = (Math.random() - 0.5) * 0.5;
        return Math.max(18, Math.min(28, prev + change));
      });
      setRackHumidity(prev => {
        const change = (Math.random() - 0.5) * 2;
        return Math.max(40, Math.min(60, prev + change));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      serverName: "DC-PROD-01",
      title: "Data Center Migration",
      description: "Planned and executed a seamless migration of on-premise infrastructure to a hybrid Azure cloud environment, improving uptime and scalability.",
      image: "/images/projects/data-center.jpg",
      status: "operational",
      temp: 42,
      size: "2U",
      color: "#8b5cf6",
      accentColor: "#a78bfa",
      tags: ["Azure", "Hybrid Cloud", "Migration", "Infrastructure"],
      roleType: "datacenter",
      metrics: {
        uptime: "99.99%",
        cpu: 78,
        memory: 82,
        network: 95
      },
      github: "https://github.com/kathanthaker/data-center-migration",
      challenge: "Migrating 50+ on-premise servers to Azure without downtime while maintaining data integrity and security compliance.",
      solution: "Implemented phased migration using Azure Site Recovery, established hybrid connectivity via ExpressRoute, and deployed redundant systems for zero-downtime transition.",
      architecture: ["Azure Virtual Network", "ExpressRoute Gateway", "Azure Backup", "Load Balancers", "Auto-scaling Groups"],
      outcomes: ["Zero downtime during migration", "40% reduction in infrastructure costs", "Improved disaster recovery (RTO < 1hr)", "Enhanced scalability for peak loads"]
    },
    {
      id: 2,
      serverName: "LINUX-PROD-02",
      title: "Linux Server Automation",
      description: "Deployed and configured multiple Ubuntu and CentOS servers with automated setup scripts, hardening, and secure SSH key management.",
      image: "/images/projects/linux-installs.jpg",
      status: "operational",
      temp: 38,
      size: "2U",
      color: "#ec4899",
      accentColor: "#f472b6",
      tags: ["Ubuntu", "CentOS", "Ansible", "Security"],
      roleType: "datacenter",
      metrics: {
        uptime: "99.95%",
        cpu: 65,
        memory: 71,
        network: 88
      },
      github: "https://github.com/kathanthaker/linux-deployment",
      challenge: "Manual server provisioning was time-consuming and prone to configuration drift across 30+ production servers.",
      solution: "Created Ansible playbooks for automated OS installation, configuration management, and security hardening with consistent baseline across all environments.",
      architecture: ["Ansible Automation", "Bash Scripts", "SSH Key Management", "UFW Firewall", "Fail2ban"],
      outcomes: ["Deployment time reduced from 4hrs to 15min", "100% configuration consistency", "Enhanced security posture", "Automated compliance reporting"]
    },
    {
      id: 3,
      serverName: "FIREWALL-03",
      title: "Palo Alto Firewall",
      description: "Implemented Palo Alto firewalls with advanced security profiles, NAT, and site-to-site VPNs to protect multi-site corporate networks.",
      image: "/images/projects/paloalto.jpg",
      status: "operational",
      temp: 45,
      size: "2U",
      color: "#f59e0b",
      accentColor: "#fbbf24",
      tags: ["Palo Alto", "VPN", "Network Security", "NAT"],
      roleType: "network",
      metrics: {
        uptime: "100%",
        cpu: 92,
        memory: 88,
        network: 98
      },
      github: "https://github.com/kathanthaker/paloalto-config",
      challenge: "Secure 5 remote office locations with centralized policy management while maintaining high-performance connectivity.",
      solution: "Deployed Palo Alto PA-3220 firewalls with site-to-site IPSec VPNs, implemented zone-based security policies, and enabled threat prevention.",
      architecture: ["Zone-based Policies", "IPSec VPN Tunnels", "App-ID Technology", "Threat Prevention", "SSL Decryption"],
      outcomes: ["Blocked 10,000+ threats monthly", "Achieved PCI-DSS compliance", "VPN latency < 20ms", "Centralized logging"]
    },
    {
      id: 4,
      serverName: "PWSH-AUTO-04",
      title: "PowerShell Automation",
      description: "Developed PowerShell scripts for automated user provisioning, Active Directory cleanup, and scheduled reporting tasks.",
      image: "/images/projects/powershell-automation.jpg",
      status: "operational",
      temp: 35,
      size: "1U",
      color: "#0ea5e9",
      accentColor: "#38bdf8",
      tags: ["PowerShell", "Active Directory", "Automation"],
      roleType: "itsupport",
      metrics: {
        uptime: "99.92%",
        cpu: 45,
        memory: 52,
        network: 68
      },
      github: "https://github.com/kathanthaker/ad-automation",
      challenge: "HR onboarding/offboarding process took 2-3 hours manually and was error-prone with inconsistent security group assignments.",
      solution: "Built PowerShell modules with CSV import for bulk operations, automated mailbox creation, and scheduled cleanup of stale accounts.",
      architecture: ["Active Directory Module", "Exchange Online PowerShell", "Scheduled Tasks", "Error Logging"],
      outcomes: ["User provisioning reduced to 5 minutes", "Zero manual errors in 6 months", "Automated cleanup of 200+ stale accounts"]
    },
    {
      id: 5,
      serverName: "PY-INVENTORY-05",
      title: "Python Inventory System",
      description: "Built a Python-based system for real-time inventory tracking, CSV exports, and email alerts for low-stock notifications.",
      image: "/images/projects/python-inventory.jpg",
      status: "operational",
      temp: 40,
      size: "1U",
      color: "#6366f1",
      accentColor: "#818cf8",
      tags: ["Python", "Pandas", "Automation", "CSV"],
      roleType: "itsupport",
      metrics: {
        uptime: "99.88%",
        cpu: 58,
        memory: 63,
        network: 75
      },
      github: "https://github.com/kathanthaker/python-inventory",
      challenge: "IT asset management was tracked in spreadsheets leading to stock-outs and duplicate orders costing $15K annually.",
      solution: "Developed Python CLI application with Pandas for data manipulation, automated email alerts via SMTP, and scheduled CSV reports.",
      architecture: ["Python 3.x", "Pandas Library", "SQLite Database", "SMTP Email Integration", "Cron Scheduling"],
      outcomes: ["Real-time inventory visibility", "Eliminated stock-outs", "Saved $12K in duplicate orders"]
    },
    {
      id: 6,
      serverName: "SHMC-ARCH-06",
      title: "SHMC Network Architecture",
      description: "Designed a resilient enterprise network with VLAN segmentation, redundant routing, and centralized monitoring using NetBox.",
      image: "/images/projects/shmc-arch.jpg",
      status: "operational",
      temp: 43,
      size: "3U",
      color: "#10b981",
      accentColor: "#34d399",
      tags: ["Network Design", "VLAN", "NetBox", "HIPAA"],
      roleType: "network",
      metrics: {
        uptime: "99.97%",
        cpu: 85,
        memory: 79,
        network: 92
      },
      github: "https://github.com/kathanthaker/shmc-architecture",
      challenge: "Healthcare facility required HIPAA-compliant network with complete isolation between patient data, staff, and guest networks.",
      solution: "Designed three-tier architecture with segregated VLANs, dual-homed routing with HSRP, and implemented NetBox IPAM for compliance tracking.",
      architecture: ["Cisco Core Switches", "VLAN Segmentation (10+ VLANs)", "HSRP Redundancy", "NetBox IPAM", "802.1X Authentication"],
      outcomes: ["HIPAA compliance achieved", "99.97% network uptime", "Network documentation in NetBox"]
    },
    {
      id: 7,
      serverName: "SQL-REPORT-07",
      title: "SQL Reporting Dashboard",
      description: "Created dynamic SQL Server dashboards with stored procedures and Power BI integration for real-time operational insights.",
      image: "/images/projects/sql-report.jpg",
      status: "operational",
      temp: 41,
      size: "2U",
      color: "#06b6d4",
      accentColor: "#22d3ee",
      tags: ["SQL Server", "Power BI", "Dashboards"],
      roleType: "itsupport",
      metrics: {
        uptime: "99.93%",
        cpu: 72,
        memory: 76,
        network: 84
      },
      github: "https://github.com/kathanthaker/sql-dashboard",
      challenge: "Management lacked real-time visibility into IT ticket metrics, SLA compliance, and resource utilization across departments.",
      solution: "Built SQL Server views and stored procedures aggregating data from multiple sources, connected Power BI for interactive dashboards.",
      architecture: ["SQL Server 2019", "Complex Joins & CTEs", "Stored Procedures", "Power BI Service", "Row-level Security"],
      outcomes: ["Real-time SLA tracking", "Executive dashboards updated hourly", "Identified bottlenecks saving 20hrs/week"]
    },
    {
      id: 8,
      serverName: "ITSM-SYS-08",
      title: "SysAid ITSM Implementation",
      description: "Configured SysAid ITSM for automated ticket routing, SLA tracking, and integrated knowledge base to enhance IT support efficiency.",
      image: "/images/projects/sysaid.jpg",
      status: "operational",
      temp: 37,
      size: "1U",
      color: "#14b8a6",
      accentColor: "#2dd4bf",
      tags: ["ITSM", "SysAid", "Ticketing", "Support"],
      roleType: "itsupport",
      metrics: {
        uptime: "99.90%",
        cpu: 55,
        memory: 61,
        network: 78
      },
      github: "https://github.com/kathanthaker/sysaid-config",
      challenge: "IT helpdesk received 200+ tickets/week with no prioritization, causing critical issues to be missed and user frustration.",
      solution: "Implemented SysAid ITSM with automated ticket categorization, SLA-based escalation rules, and integrated knowledge base.",
      architecture: ["SysAid Cloud Platform", "Email Integration", "AD Authentication", "Automated Workflows", "SLA Policies"],
      outcomes: ["First response time < 30min", "SLA compliance 95%", "Self-service resolved 30% of tickets"]
    }
  ];

  const filters = [
    { id: "all", label: "All Projects", icon: Server, count: projects.length },
    { id: "itsupport", label: "IT Support", icon: Headphones, count: projects.filter(p => p.roleType === "itsupport").length },
    { id: "network", label: "Network Engineer", icon: Cable, count: projects.filter(p => p.roleType === "network").length },
    { id: "datacenter", label: "Data Center", icon: Database, count: projects.filter(p => p.roleType === "datacenter").length }
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(p => p.roleType === activeFilter);

  // Dynamic rack height
  const rackHeight = filteredProjects.length > 6 ? 'expanded' : 'normal';

  const getStatusColor = (status: string): string => {
    return status === "operational" ? "#10b981" : "#f59e0b";
  };

  const getTempColor = (temp: number): string => {
    if (temp < 25) return "#06b6d4";
    if (temp < 35) return "#10b981";
    if (temp < 42) return "#f59e0b";
    return "#ef4444";
  };

  const handleProjectClick = (index: number) => {
    if (selectedProject === index) {
      setSelectedProject(null);
      setExpandedSection(null);
    } else {
      setSelectedProject(index);
      setExpandedSection(null);
      setShowHVAC(false); // Close HVAC when selecting project
    }
  };

  const handleHVACClick = () => {
    setShowHVAC(true);
    setSelectedProject(null);
    setExpandedSection(null);
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Get the selected project safely
  const currentProject = selectedProject !== null ? filteredProjects[selectedProject] : null;

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        
        {/* Header */}
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Infrastructure Projects</h2>
          <p className="subtitle">
            Production systems, networks, and automation solutions
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="projects-filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.id}
                className={`filter-btn-pro ${activeFilter === filter.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveFilter(filter.id);
                  setSelectedProject(null);
                  setExpandedSection(null);
                  setShowHVAC(false);
                }}
              >
                <Icon size={18} />
                <span>{filter.label}</span>
                <motion.span 
                  className="filter-count"
                  key={filter.count}
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {filter.count}
                </motion.span>
              </button>
            );
          })}
        </motion.div>

        {/* Main Layout */}
        <div className="projects-layout">
          
          {/* LEFT: Server Rack */}
          <div className="server-rack-container">
            <motion.div
              className={`server-rack ${rackHeight}`}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Rack Header */}
              <div className="rack-header">
                <Server size={24} style={{ color: '#10b981' }} />
                <div className="rack-title-section">
                  <h3>Production Rack A42</h3>
                  <p className="rack-subtitle">{filteredProjects.length} Active System{filteredProjects.length !== 1 ? 's' : ''}</p>
                </div>
              </div>

              {/* HVAC MONITORING WIDGET - NOW CLICKABLE */}
              <motion.div 
                className="hvac-monitor"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div 
                  className={`hvac-header hvac-clickable ${showHVAC ? 'hvac-active' : ''}`}
                  onClick={handleHVACClick}
                >
                  <Wind size={18} className="hvac-icon" />
                  <span className="hvac-title">Environmental Control</span>
                  <motion.div
                    className="hvac-status-led"
                    animate={{
                      boxShadow: [
                        "0 0 10px #06b6d4",
                        "0 0 20px #06b6d4",
                        "0 0 10px #06b6d4"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div 
                    className="hvac-expand-hint"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    View Details →
                  </motion.div>
                </div>

                <div className="hvac-metrics">
                  <div className="hvac-metric">
                    <Thermometer size={16} style={{ color: getTempColor(rackTemp) }} />
                    <div className="hvac-data">
                      <span className="hvac-label">Temperature</span>
                      <motion.span 
                        className="hvac-value"
                        style={{ color: getTempColor(rackTemp) }}
                        key={Math.floor(rackTemp)}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                      >
                        {rackTemp.toFixed(1)}°C
                      </motion.span>
                    </div>
                    <div className="hvac-bar">
                      <motion.div
                        className="hvac-bar-fill"
                        style={{ 
                          width: `${(rackTemp / 50) * 100}%`,
                          background: getTempColor(rackTemp)
                        }}
                        animate={{ width: `${(rackTemp / 50) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  <div className="hvac-metric">
                    <Droplet size={16} style={{ color: '#06b6d4' }} />
                    <div className="hvac-data">
                      <span className="hvac-label">Humidity</span>
                      <motion.span 
                        className="hvac-value"
                        style={{ color: '#06b6d4' }}
                        key={Math.floor(rackHumidity)}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                      >
                        {rackHumidity.toFixed(0)}%
                      </motion.span>
                    </div>
                    <div className="hvac-bar">
                      <motion.div
                        className="hvac-bar-fill"
                        style={{ 
                          width: `${rackHumidity}%`,
                          background: '#06b6d4'
                        }}
                        animate={{ width: `${rackHumidity}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Cooling Animation */}
                <div className="cooling-animation">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="air-particle"
                      initial={{ y: 0, opacity: 0 }}
                      animate={{ 
                        y: 60,
                        opacity: [0, 0.6, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "linear"
                      }}
                      style={{ left: `${10 + i * 12}%` }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Server Cards */}
              <AnimatePresence mode="popLayout">
                <div className="server-cards">
                  {filteredProjects.map((project, index) => (
                    <motion.article
                      key={project.id}
                      className={`server-card ${selectedProject === index ? 'selected' : ''} ${hoveredProject === index ? 'hovered' : ''}`}
                      layout
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ 
                        layout: { duration: 0.3 },
                        opacity: { duration: 0.3 },
                        x: { type: "spring", stiffness: 300, damping: 30 }
                      }}
                      whileHover={{ x: 8 }}
                      onHoverStart={() => setHoveredProject(index)}
                      onHoverEnd={() => setHoveredProject(null)}
                      onClick={() => handleProjectClick(index)}
                    >
                      {/* Status LEDs */}
                      <div className="server-leds">
                        <motion.div 
                          className="led power" 
                          style={{ background: getStatusColor(project.status) }}
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div 
                          className="led network" 
                          style={{ background: project.color }}
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                        />
                        <motion.div 
                          className="led storage" 
                          style={{ background: project.accentColor }}
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 1.8, repeat: Infinity, delay: 0.6 }}
                        />
                      </div>

                      {/* Server Info */}
                      <div className="server-info">
                        <h4 className="server-title">{project.title}</h4>
                        <div className="server-chips">
                          <span className="server-chip name" style={{ borderColor: project.color, color: project.color }}>
                            {project.serverName}
                          </span>
                          <span className="server-chip temp" style={{ borderColor: getTempColor(project.temp), color: getTempColor(project.temp) }}>
                            <Thermometer size={12} />
                            {project.temp}°C
                          </span>
                          <span className="server-chip size">{project.size}</span>
                        </div>
                      </div>

                      {/* Selection Indicator */}
                      <motion.div
                        className="selection-indicator"
                        style={{ background: `${project.color}33`, color: project.color }}
                        animate={{
                          opacity: selectedProject === index ? 1 : 0,
                          scale: selectedProject === index ? 1 : 0.8
                        }}
                      >
                        <Zap size={16} />
                      </motion.div>

                      {/* Card Glow */}
                      <motion.div
                        className="card-glow"
                        style={{ background: project.color }}
                        animate={{
                          opacity: selectedProject === index ? 0.2 : hoveredProject === index ? 0.1 : 0
                        }}
                      />

                      {/* Data Flow Indicator */}
                      {selectedProject === index && (
                        <motion.div className="data-flow-indicator">
                          <TrendingUp size={14} style={{ color: project.color }} />
                        </motion.div>
                      )}
                    </motion.article>
                  ))}
                </div>
              </AnimatePresence>

              {/* Rack Footer */}
              <div className="rack-footer">
                <Activity size={16} style={{ color: '#10b981' }} />
                <span>All Systems Operational</span>
                <div className="footer-separator" />
                <Zap size={14} style={{ color: '#f59e0b' }} />
                <span className="power-draw">2.4kW</span>
              </div>
            </motion.div>

            {/* Data Packets Animation */}
            <div className="data-packets">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="data-packet"
                  style={{
                    background: `linear-gradient(180deg, transparent, ${
                      ['#10b981', '#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b', '#6366f1'][i]
                    }, transparent)`
                  }}
                  animate={{
                    y: [0, 800],
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.7,
                    ease: "linear"
                  }}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: Monitor Display */}
          <motion.div
            className="monitor-container"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="monitor-frame">
              {/* Monitor Header */}
              <div className="monitor-header">
                <span className="monitor-brand">DELL UltraSharp 27"</span>
                <div className="monitor-controls">
                  {(selectedProject !== null || showHVAC) && (
                    <motion.button
                      className="close-btn"
                      onClick={() => {
                        setSelectedProject(null);
                        setExpandedSection(null);
                        setShowHVAC(false);
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X size={16} />
                    </motion.button>
                  )}
                  <motion.div 
                    className="power-led"
                    animate={{
                      boxShadow: [
                        "0 0 8px #10b981",
                        "0 0 16px #10b981",
                        "0 0 8px #10b981"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
              </div>

              {/* Monitor Screen */}
              <div className="monitor-screen">
                <AnimatePresence mode="wait">
                  {showHVAC ? (
                    /* HVAC DISPLAY IN MONITOR */
                    <motion.div
                      key="hvac"
                      className="hvac-monitor-display"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="hvac-monitor-content">
                        {/* Header with Back Button */}
                        <div className="hvac-monitor-header">
                          <button className="hvac-back-btn" onClick={() => setShowHVAC(false)}>
                            <ArrowLeft size={20} />
                            <span>Back</span>
                          </button>
                          <div className="hvac-monitor-title">
                            <Wind size={28} className="hvac-monitor-icon" />
                            <div>
                              <h3>Environmental Control System</h3>
                              <p>Critical Infrastructure Overview</p>
                            </div>
                          </div>
                        </div>

                        {/* Fan Visualization */}
                        <div className="hvac-fans-compact">
                          <h4>🌀 Active Cooling Units</h4>
                          <div className="hvac-fans-grid-monitor">
                            {[1, 2, 3, 4].map((fan) => (
                              <div key={fan} className="hvac-fan-item">
                                <motion.div
                                  className="hvac-fan-small"
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    duration: 2 - (fan * 0.1),
                                    repeat: Infinity,
                                    ease: "linear"
                                  }}
                                >
                                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                                    <div 
                                      key={angle}
                                      className="fan-blade-small" 
                                      style={{ transform: `rotate(${angle}deg)` }} 
                                    />
                                  ))}
                                  <div className="fan-center-small" />
                                </motion.div>
                                <span className="fan-label-small">Unit {fan}</span>
                                <span className="fan-rpm-small">{2400 + (fan * 100)} RPM</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Airflow Visualization */}
                        <div className="airflow-viz-monitor">
                          <div className="airflow-label-monitor">← Cold Aisle | Hot Aisle →</div>
                          <div className="airflow-particles-monitor">
                            {[...Array(15)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="airflow-particle-monitor"
                                initial={{ x: -30, opacity: 0 }}
                                animate={{ 
                                  x: 300,
                                  opacity: [0, 1, 1, 0]
                                }}
                                transition={{
                                  duration: 2.5,
                                  repeat: Infinity,
                                  delay: i * 0.17,
                                  ease: "linear"
                                }}
                                style={{ top: `${15 + (i * 5)}%` }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Why Cooling is Critical */}
                        <div className="hvac-info-compact critical">
                          <h4>🔥 Why Cooling is Critical</h4>
                          <div className="hvac-info-grid">
                            <div className="info-item-compact">
                              <span className="info-emoji">⚠️</span>
                              <div>
                                <strong>Heat = Failure</strong>
                                <p>Every 10°C increase doubles failure rates</p>
                              </div>
                            </div>
                            <div className="info-item-compact">
                              <span className="info-emoji">💸</span>
                              <div>
                                <strong>Performance Loss</strong>
                                <p>CPUs throttle 20-40% when overheated</p>
                              </div>
                            </div>
                            <div className="info-item-compact">
                              <span className="info-emoji">⏱️</span>
                              <div>
                                <strong>Lifespan Impact</strong>
                                <p>High temps reduce equipment life by 50%</p>
                              </div>
                            </div>
                            <div className="info-item-compact">
                              <span className="info-emoji">🔌</span>
                              <div>
                                <strong>Heat Generation</strong>
                                <p>Servers produce 10-20kW heat per rack</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Temperature Ranges */}
                        <div className="hvac-info-compact">
                          <h4>🎯 Optimal Operating Ranges</h4>
                          <div className="temp-ranges-monitor">
                            <div className="temp-item-monitor">
                              <div className="temp-bar-monitor cold">18°C</div>
                              <span>Min Safe</span>
                            </div>
                            <div className="temp-item-monitor">
                              <div className="temp-bar-monitor ideal">20-25°C</div>
                              <span>✅ Ideal</span>
                            </div>
                            <div className="temp-item-monitor">
                              <div className="temp-bar-monitor warm">27°C</div>
                              <span>Max Safe</span>
                            </div>
                            <div className="temp-item-monitor">
                              <div className="temp-bar-monitor danger">30°C+</div>
                              <span>⚠️ Danger</span>
                            </div>
                          </div>
                          <div className="humidity-note">
                            <Shield size={18} />
                            <span><strong>Humidity: 40-60% RH</strong> - Prevents ESD & condensation</span>
                          </div>
                        </div>

                        {/* HVAC Concepts */}
                        <div className="hvac-info-compact">
                          <h4>🏗️ Data Center Cooling Concepts</h4>
                          <div className="concepts-grid-monitor">
                            <div className="concept-compact">
                              <span className="concept-emoji">🌬️</span>
                              <h5>Hot/Cold Aisle</h5>
                              <p>Separates intake/exhaust air</p>
                            </div>
                            <div className="concept-compact">
                              <span className="concept-emoji">❄️</span>
                              <h5>Precision AC</h5>
                              <p>CRAC/CRAH units for exact control</p>
                            </div>
                            <div className="concept-compact">
                              <span className="concept-emoji">💧</span>
                              <h5>Liquid Cooling</h5>
                              <p>Water/coolant for high-density</p>
                            </div>
                            <div className="concept-compact">
                              <span className="concept-emoji">🔄</span>
                              <h5>N+1 Redundancy</h5>
                              <p>Backup units for zero downtime</p>
                            </div>
                            <div className="concept-compact">
                              <span className="concept-emoji">📊</span>
                              <h5>Real-time Monitor</h5>
                              <p>IoT sensors tracking conditions</p>
                            </div>
                            <div className="concept-compact">
                              <span className="concept-emoji">♻️</span>
                              <h5>Free Cooling</h5>
                              <p>Uses outside air, saves 30-50%</p>
                            </div>
                          </div>
                        </div>

                        {/* Energy Stats */}
                        <div className="hvac-info-compact stats">
                          <h4>⚡ Energy Impact</h4>
                          <div className="energy-stats-monitor">
                            <div className="stat-compact">
                              <div className="stat-value-compact">40%</div>
                              <div className="stat-label-compact">of DC power for cooling</div>
                            </div>
                            <div className="stat-compact">
                              <div className="stat-value-compact">$1M+</div>
                              <div className="stat-label-compact">annual cooling costs</div>
                            </div>
                            <div className="stat-compact">
                              <div className="stat-value-compact">1.5-2.0</div>
                              <div className="stat-label-compact">PUE target</div>
                            </div>
                          </div>
                        </div>

                        {/* Live Metrics */}
                        <div className="hvac-info-compact live">
                          <h4>📡 Current Status</h4>
                          <div className="live-metrics-monitor">
                            <div className="metric-compact">
                              <Thermometer size={18} style={{ color: getTempColor(rackTemp) }} />
                              <div className="metric-value-live" style={{ color: getTempColor(rackTemp) }}>
                                {rackTemp.toFixed(1)}°C
                              </div>
                              <div className="metric-label-live">Temperature</div>
                            </div>
                            <div className="metric-compact">
                              <Droplet size={18} style={{ color: '#06b6d4' }} />
                              <div className="metric-value-live" style={{ color: '#06b6d4' }}>
                                {rackHumidity.toFixed(0)}%
                              </div>
                              <div className="metric-label-live">Humidity</div>
                            </div>
                            <div className="metric-compact">
                              <Wind size={18} style={{ color: '#10b981' }} />
                              <div className="metric-value-live" style={{ color: '#10b981' }}>
                                2,450 CFM
                              </div>
                              <div className="metric-label-live">Airflow</div>
                            </div>
                            <div className="metric-compact">
                              <Zap size={18} style={{ color: '#f59e0b' }} />
                              <div className="metric-value-live" style={{ color: '#f59e0b' }}>
                                8.2 kW
                              </div>
                              <div className="metric-label-live">Cooling Power</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : !currentProject ? (
                    /* Idle State */
                    <motion.div
                      key="idle"
                      className="monitor-idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        animate={{
                          rotate: 360,
                          scale: [1, 1.1, 1]
                        }}
                        transition={{
                          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                          scale: { duration: 2, repeat: Infinity }
                        }}
                      >
                        <Server size={64} className="idle-icon" />
                      </motion.div>
                      <h3>System Monitor Ready</h3>
                      <p>Select a server or view environmental control</p>
                      <motion.div 
                        className="idle-cursor"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      >
                        _
                      </motion.div>
                    </motion.div>
                  ) : (
                    /* Project Display - (keeping your existing project display code) */
                    <motion.div
                      key={`project-${selectedProject}`}
                      className="project-display"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* ... (All your existing project display code remains the same) ... */}
                      <div className="project-content">
                        {/* Boot Sequence */}
                        <div className="boot-sequence">
                          <motion.div 
                            className="boot-line"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <span className="boot-time">[0.001s]</span>
                            <span className="boot-text">Loading {currentProject.serverName}...</span>
                            <span className="boot-status" style={{ color: currentProject.color }}>OK</span>
                          </motion.div>
                          <motion.div 
                            className="boot-line"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <span className="boot-time">[0.045s]</span>
                            <span className="boot-text">Mounting filesystem...</span>
                            <span className="boot-status" style={{ color: currentProject.color }}>OK</span>
                          </motion.div>
                          <motion.div 
                            className="boot-line"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <span className="boot-time">[0.089s]</span>
                            <span className="boot-text">Starting services...</span>
                            <span className="boot-status" style={{ color: currentProject.color }}>READY</span>
                          </motion.div>
                        </div>

                        {/* Project Image */}
                        <motion.div 
                          className="project-image-container"
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          <img src={currentProject.image} alt={currentProject.title} className="project-image" />
                          <div className="image-overlay" style={{ 
                            background: `linear-gradient(180deg, transparent 0%, ${currentProject.color}22 100%)` 
                          }} />
                        </motion.div>

                        {/* Project Header */}
                        <div className="project-header">
                          <h3>{currentProject.title}</h3>
                          <div className="status-badge" style={{ borderColor: getStatusColor(currentProject.status), color: getStatusColor(currentProject.status) }}>
                            <motion.div 
                              className="status-dot" 
                              style={{ background: getStatusColor(currentProject.status) }}
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span>Operational</span>
                          </div>
                        </div>

                        <p className="project-description">{currentProject.description}</p>

                        {/* System Metrics */}
                        <div className="system-metrics">
                          <motion.div 
                            className="metric-item"
                            whileHover={{ scale: 1.05, borderColor: currentProject.color }}
                          >
                            <Activity size={20} style={{ color: '#10b981' }} />
                            <div>
                              <div className="metric-label">Uptime</div>
                              <div className="metric-value">{currentProject.metrics.uptime}</div>
                            </div>
                          </motion.div>
                          <motion.div 
                            className="metric-item"
                            whileHover={{ scale: 1.05, borderColor: currentProject.color }}
                          >
                            <Cpu size={20} style={{ color: currentProject.color }} />
                            <div>
                              <div className="metric-label">CPU Load</div>
                              <div className="metric-value">{currentProject.metrics.cpu}%</div>
                            </div>
                          </motion.div>
                          <motion.div 
                            className="metric-item"
                            whileHover={{ scale: 1.05, borderColor: currentProject.color }}
                          >
                            <HardDrive size={20} style={{ color: '#06b6d4' }} />
                            <div>
                              <div className="metric-label">Memory</div>
                              <div className="metric-value">{currentProject.metrics.memory}%</div>
                            </div>
                          </motion.div>
                          <motion.div 
                            className="metric-item"
                            whileHover={{ scale: 1.05, borderColor: currentProject.color }}
                          >
                            <Network size={20} style={{ color: '#f59e0b' }} />
                            <div>
                              <div className="metric-label">Network</div>
                              <div className="metric-value">{currentProject.metrics.network}%</div>
                            </div>
                          </motion.div>
                        </div>

                        {/* Tags */}
                        <div className="project-tags">
                          {currentProject.tags.map((tag: string, i: number) => (
                            <motion.span 
                              key={i} 
                              className="project-tag"
                              style={{ borderColor: `${currentProject.color}44` }}
                              whileHover={{ 
                                borderColor: currentProject.color,
                                color: currentProject.color,
                                scale: 1.05
                              }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>

                        {/* Expandable Sections */}
                        <div className="expandable-sections">
                          <div className={`expand-section ${expandedSection === 'challenge' ? 'expanded' : ''}`}>
                            <button className="expand-header" onClick={() => toggleSection('challenge')}>
                              <span>🎯 The Challenge</span>
                              <ChevronDown className={expandedSection === 'challenge' ? 'rotated' : ''} size={20} />
                            </button>
                            <div className={`expand-content ${expandedSection === 'challenge' ? 'show' : ''}`}>
                              <p>{currentProject.challenge}</p>
                            </div>
                          </div>

                          <div className={`expand-section ${expandedSection === 'solution' ? 'expanded' : ''}`}>
                            <button className="expand-header" onClick={() => toggleSection('solution')}>
                              <span>💡 The Solution</span>
                              <ChevronDown className={expandedSection === 'solution' ? 'rotated' : ''} size={20} />
                            </button>
                            <div className={`expand-content ${expandedSection === 'solution' ? 'show' : ''}`}>
                              <p>{currentProject.solution}</p>
                            </div>
                          </div>

                          <div className={`expand-section ${expandedSection === 'architecture' ? 'expanded' : ''}`}>
                            <button className="expand-header" onClick={() => toggleSection('architecture')}>
                              <span>🏗️ Architecture</span>
                              <ChevronDown className={expandedSection === 'architecture' ? 'rotated' : ''} size={20} />
                            </button>
                            <div className={`expand-content ${expandedSection === 'architecture' ? 'show' : ''}`}>
                              <ul>
                                {currentProject.architecture.map((item: string, i: number) => (
                                  <li key={i}>
                                    <span className="bullet" style={{ color: currentProject.color }}>▸</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className={`expand-section ${expandedSection === 'outcomes' ? 'expanded' : ''}`}>
                            <button className="expand-header" onClick={() => toggleSection('outcomes')}>
                              <span>📈 Key Outcomes</span>
                              <ChevronDown className={expandedSection === 'outcomes' ? 'rotated' : ''} size={20} />
                            </button>
                            <div className={`expand-content ${expandedSection === 'outcomes' ? 'show' : ''}`}>
                              <ul>
                                {currentProject.outcomes.map((item: string, i: number) => (
                                  <li key={i}>
                                    <span className="bullet" style={{ color: currentProject.color }}>✓</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="project-actions">
                          <motion.a 
                            href={currentProject.github} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="action-btn primary"
                            style={{ 
                              borderColor: `${currentProject.color}44`,
                              background: `${currentProject.color}11`
                            }}
                            whileHover={{
                              borderColor: currentProject.color,
                              background: `${currentProject.color}22`,
                              boxShadow: `0 10px 30px ${currentProject.color}33`
                            }}
                          >
                            <Github size={18} />
                            <span>View Code</span>
                          </motion.a>
                          <motion.a 
                            href="#" 
                            className="action-btn secondary"
                            whileHover={{
                              borderColor: currentProject.accentColor,
                              boxShadow: `0 10px 30px ${currentProject.accentColor}33`
                            }}
                          >
                            <ExternalLink size={18} />
                            <span>Live Demo</span>
                          </motion.a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
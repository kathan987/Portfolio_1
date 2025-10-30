import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GraduationCap, 
  Award, 
  Calendar, 
  MapPin,
  CheckCircle2,
  Trophy,
  Star,
  Headphones, // IT Support icon
  MessageCircle,
  Phone
} from "lucide-react";
import "../../styles/pro/education.css";

interface Education {
  type: 'degree' | 'certification';
  title: string;
  institution: string;
  location?: string;
  period: string;
  status: 'completed' | 'in-progress' | 'planned';
  description?: string;
  skills?: string[];
  credentialId?: string;
  gpa?: string;
  achievements?: string[];
  ticketNumber?: string;
  priority?: 'high' | 'medium' | 'low';
  progress?: number;
}

export default function EducationSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'degree' | 'certification'>('all');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [phoneRinging, setPhoneRinging] = useState(false);

  // Animated phone ringing effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPhoneRinging(true);
      setTimeout(() => setPhoneRinging(false), 2000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const educationData: Education[] = [
    {
      type: 'degree',
      title: 'Computer Systems Technician',
      institution: 'Fanshawe College',
      location: 'London, ON',
      period: '2023 – 2025',
      status: 'completed',
      gpa: '2.9 / 4.0',
      description: 'Comprehensive program covering systems administration, networking, and IT infrastructure.',
      skills: ['Network Administration', 'Windows Server', 'Linux', 'Virtualization', 'Security'],
      achievements: [
        'Peer Tutor for Core IT Courses',
        'Class Representative'
      ],
      ticketNumber: 'TICKET #EDU-2024',
      priority: 'high'
    },
    {
      type: 'certification',
      title: 'CompTIA A+',
      institution: 'CompTIA',
      period: 'Oct 2025',
      status: 'completed',
      description: 'Industry-standard certification for IT operational roles covering hardware, software, and troubleshooting.',
      skills: ['Hardware', 'Operating Systems', 'Security', 'Troubleshooting', 'Networking'],
      credentialId: 'Core 1 & Core 2',
      ticketNumber: 'TICKET #CERT-A001',
      priority: 'high'
    },
    {
      type: 'certification',
      title: 'Google IT Support',
      institution: 'Google Career Certificates',
      period: '2024',
      status: 'completed',
      description: 'Professional certificate covering troubleshooting, customer service, networking, operating systems, and security.',
      skills: ['IT Support', 'Troubleshooting', 'Customer Service', 'Networking'],
      credentialId: 'Google Career Certificate',
      ticketNumber: 'TICKET #CERT-G002',
      priority: 'high'
    },
    {
      type: 'certification',
      title: 'CCNA',
      institution: 'Cisco NetAcad',
      location: 'Powered by Fanshawe College',
      period: 'During Studies',
      status: 'completed',
      description: 'Networking fundamentals, IP connectivity, routing, switching, and security fundamentals.',
      skills: ['Routing', 'Switching', 'Network Security', 'Cisco IOS', 'Automation'],
      credentialId: 'Cisco NetAcad Certified',
      ticketNumber: 'TICKET #CERT-C003',
      priority: 'high'
    },
    {
      type: 'certification',
      title: 'CompTIA Security+',
      institution: 'CompTIA',
      period: 'Expected 2025',
      status: 'in-progress',
      description: 'Cybersecurity certification covering threats, attacks, vulnerabilities, and security architecture.',
      skills: ['Security', 'Risk Management', 'Cryptography', 'Network Security'],
      credentialId: 'In Progress',
      ticketNumber: 'TICKET #SEC-2025',
      priority: 'medium',
      progress: 60
    }
  ];

  const filteredData = activeTab === 'all' 
    ? educationData 
    : educationData.filter(item => item.type === activeTab);

  const stats = {
    totalCertifications: educationData.filter(e => e.type === 'certification').length,
    completedCerts: educationData.filter(e => e.type === 'certification' && e.status === 'completed').length,
    gpa: '2.9',
    achievements: 10
  };


  return (
    <section className="edu-section" id="education">
      <div className="edu-container">
        
        {/* 🎧 IT SUPPORT FLOATING ELEMENTS */}
        <div className="it-support-elements">
          {/* Headphones Icon */}
          <motion.div
            className="floating-headphones"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Headphones size={48} />
          </motion.div>

          {/* Animated Phone */}
          <motion.div
            className={`floating-phone ${phoneRinging ? 'ringing' : ''}`}
            animate={phoneRinging ? {
              rotate: [0, -15, 15, -15, 15, 0],
              scale: [1, 1.1, 1]
            } : {}}
            transition={{
              duration: 0.5,
              ease: "easeInOut"
            }}
          >
            <Phone size={32} />
          </motion.div>
        </div>

          {/* Header */}
            <motion.div
              className="edu-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="header-badge">
                 <Headphones size={24} />
                   <span>IT SUPPORT - HELP DESK</span>
              </div>
              <h2>Education & Certifications</h2>
              <p className="subtitle">
                Resolved tickets • Academic achievements • Professional credentials
              </p>
            </motion.div>
        {/* Stats Dashboard */}
        <motion.div
          className="edu-stats"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="stat-box">
            <GraduationCap className="stat-icon" />
            <div className="stat-content">
              <span className="stat-value">1</span>
              <span className="stat-label">Degree Program</span>
            </div>
          </div>

          <div className="stat-box">
            <Award className="stat-icon" />
            <div className="stat-content">
              <span className="stat-value">{stats.completedCerts}/{stats.totalCertifications}</span>
              <span className="stat-label">Certifications</span>
            </div>
          </div>

          <div className="stat-box">
            <Trophy className="stat-icon" />
            <div className="stat-content">
              <span className="stat-value">{stats.gpa}</span>
              <span className="stat-label">GPA</span>
            </div>
          </div>
          </motion.div>
        

        {/* Tab Filter */}
        <motion.div
          className="edu-tabs"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Tickets
            <span className="tab-count">{educationData.length}</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'degree' ? 'active' : ''}`}
            onClick={() => setActiveTab('degree')}
          >
            Degrees
            <span className="tab-count">{educationData.filter(e => e.type === 'degree').length}</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'certification' ? 'active' : ''}`}
            onClick={() => setActiveTab('certification')}
          >
            Certifications
            <span className="tab-count">{educationData.filter(e => e.type === 'certification').length}</span>
          </button>
        </motion.div>

        {/* Education Grid - TICKET STYLE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="edu-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {filteredData.map((item, index) => (
              <motion.article
                key={index}
                className={`edu-card ticket-card ${item.type} priority-${item.priority}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ y: -8 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                {/* Ticket Header */}
                <div className="ticket-header">
                  <span className="ticket-number">{item.ticketNumber}</span>
                  <div className={`status-badge ${item.status}`}>
                    {item.status === 'completed' && <CheckCircle2 size={14} />}
                    {item.status === 'in-progress' && '⏳'}
                    <span>{item.status === 'completed' ? 'RESOLVED' : 'IN PROGRESS'}</span>
                  </div>
                </div>

                {/* Divider Line */}
                <div className="ticket-divider"></div>

                {/* Card Header */}
                <div className="card-header">
                  <div className={`card-icon ${item.type}`}>
                    {item.type === 'degree' ? (
                      <GraduationCap size={32} />
                    ) : (
                      <Award size={32} />
                    )}
                  </div>
                  <h3>{item.title}</h3>
                </div>

                {/* Card Body */}
                <div className="card-body">
                  <div className="institution-info">
                    <strong>{item.institution}</strong>
                    {item.location && (
                      <span className="location">
                        <MapPin size={14} />
                        {item.location}
                      </span>
                    )}
                  </div>

                  <div className="period-info">
                    <Calendar size={14} />
                    {item.period}
                  </div>

                  {item.gpa && (
                    <div className="gpa-badge">
                      GPA: <strong>{item.gpa}</strong>
                    </div>
                  )}

                  {item.description && (
                    <p className="description">{item.description}</p>
                  )}

                  {/* Progress Bar for In-Progress items */}
                  {item.status === 'in-progress' && item.progress !== undefined && (
                    <div className="progress-container">
                      <div className="progress-label">
                        <span>Completion Progress</span>
                        <span className="progress-percent">{item.progress}%</span>
                      </div>
                      <div className="progress-bar-bg">
                        <motion.div
                          className="progress-bar-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ duration: 1.5, delay: index * 0.2 }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Skills Tags */}
                  {item.skills && (
                    <div className="skills-tags">
                      {item.skills.map((skill, idx) => (
                        <motion.span
                          key={idx}
                          className="skill-tag"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + idx * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  )}
                  {/* Credential Info */}
                  {item.credentialId && (
                    <div className="credential-footer">
                      <span className="credential-id">
                        Credential ID: {item.credentialId}
                      </span>
                    </div>
                  )}
                </div>

                {/* Priority Indicator */}
                <div className={`priority-stripe ${item.priority}`}></div>

                {/* Holographic Effect */}
                <motion.div
                  className="holo-effect"
                  animate={{
                    opacity: hoveredCard === index ? 0.15 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Help Desk Footer */}
        <motion.div
          className="help-desk-footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div className="footer-stat">
            <CheckCircle2 size={20} />
            <span>First Response Time: <strong>Immediate</strong></span>
          </div>
          <div className="footer-stat">
            <Trophy size={20} />
            <span>Resolution Rate: <strong>100%</strong></span>
          </div>
          <div className="footer-stat">
            <Star size={20} />
            <span>User Satisfaction: <strong>98%</strong></span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
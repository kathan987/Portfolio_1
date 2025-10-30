import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  ChevronRight, 
  Award,
  GitBranch,
  GitCommit,
  GitMerge,
  Check,
  Star,
  Users,
  TrendingUp
} from "lucide-react";
import "../../styles/pro/experience.css";

interface Experience {
  logo: string;
  title: string;
  company: string;
  period: string;
  location: string;
  type: string;
  responsibilities: string[];
  achievements?: string[];
  commitHash: string;
  branch: string;
  mergeStatus: 'merged' | 'active';
}

export default function ExperienceTimeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [showingLog, setShowingLog] = useState(false);

  const experiences: Experience[] = [
    {
      logo: "/images/logos/fanshawe.png",
      title: "Peer Tutor & Class Representative",
      company: "Fanshawe College",
      period: "Jan 2025 – Apr 2025",
      location: "London, ON",
      type: "Part-Time",
      responsibilities: [
        "Tutored core IT courses including Networking Fundamentals, Windows Server, and Linux Administration",
        "Delivered hands-on troubleshooting demonstrations for 50+ students",
        "Liaison between faculty and students for curriculum feedback"
      ],
      achievements: [
        "Improved student pass rates by 15%",
        "Created study materials used by 100+ students",
        "Received 4.8/5 satisfaction rating"
      ],
      commitHash: 'a3f7b2c',
      branch: 'feature/education',
      mergeStatus: 'active'
    },
    {
      logo: "/images/logos/hilton.png",
      title: "Guest Service Associate",
      company: "Home2 Suites by Hilton",
      period: "Jun 2024 – Present",
      location: "London, ON",
      type: "Full-Time",
      responsibilities: [
        "Managed front desk operations handling 100+ daily guest requests",
        "Processed reservations and check-ins achieving 98% satisfaction",
        "Documented SOPs and resolved customer escalations"
      ],
      achievements: [
        "Maintained 98% customer satisfaction over 6 months",
        "Reduced check-in time by 30%",
        "Recognized for exceptional problem-solving"
      ],
      commitHash: '7d8e4a1',
      branch: 'feature/hospitality',
      mergeStatus: 'merged'
    }
  ];

  const runGitLog = () => {
    setShowingLog(true);
    setTerminalOutput([]);
    
    const logLines = [
      "$ git log --graph --oneline --decorate",
      "",
      `* ${experiences[0].commitHash} (HEAD -> main, ${experiences[0].branch}) ${experiences[0].title} @ ${experiences[0].company}`,
      "|   Author: Kathan Thaker <kathan@example.com>",
      `|   Date: ${experiences[0].period}`,
      "|",
      `* ${experiences[1].commitHash} (${experiences[1].branch}, merged) ${experiences[1].title} @ ${experiences[1].company}`,
      "|   Author: Kathan Thaker <kathan@example.com>",
      `|   Date: ${experiences[1].period}`,
      "|",
      "* 2 commits total",
      "* Multiple achievements unlocked",
      "$ "
    ];

    logLines.forEach((line, index) => {
      setTimeout(() => {
        setTerminalOutput(prev => [...prev, line]);
        if (index === logLines.length - 1) {
          setTimeout(() => setShowingLog(false), 500);
        }
      }, index * 200);
    });
  };

  useEffect(() => {
    // Auto-run on mount
    setTimeout(() => runGitLog(), 500);
  }, []);

  return (
    <section className="exp-section" id="experience">
      <div className="exp-container">
        
        {/* Git Terminal */}
        <motion.div
          className="git-terminal"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="git-header">
            <div className="git-dots">
              <span></span><span></span><span></span>
            </div>
            <span className="git-title">git-log@career</span>
            <button 
              className="git-button"
              onClick={runGitLog}
              disabled={showingLog}
            >
              {showingLog ? 'Loading...' : 'git log'}
            </button>
          </div>
          <div className="git-body">
            {terminalOutput.map((line, i) => (
              <motion.div
                key={i}
                className={`git-line ${line.startsWith('*') ? 'commit-line' : ''}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {line}
              </motion.div>
            ))}
            {showingLog && <span className="git-cursor">_</span>}
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          className="exp-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="exp-label">
            <GitBranch size={16} />
            <span>CAREER TIMELINE</span>
            <span className="commits-count">{experiences.length} commits</span>
          </div>
          <h2 className="exp-title">Professional Journey</h2>
          <p className="exp-subtitle">
            Version-controlled career path • All changes committed
          </p>
        </motion.div>

        {/* Git Graph Timeline */}
        <div className="git-graph">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className={`git-commit ${exp.mergeStatus === 'active' ? 'active' : 'merged'}`}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {/* Git Graph Line */}
              <div className="git-line-visual">
                {index === 0 ? (
                  <div className="git-head">
                    <GitBranch size={20} />
                    <span className="head-label">HEAD</span>
                  </div>
                ) : (
                  <GitMerge size={20} className="merge-icon" />
                )}
                {index < experiences.length - 1 && <div className="git-connector" />}
              </div>

              {/* Commit Card */}
              <div className="commit-card">
                {/* Commit Header */}
                <div className="commit-header">
                  <div className="commit-meta">
                    <div className="commit-hash-group">
                      <GitCommit size={14} />
                      <span className="commit-hash">{exp.commitHash}</span>
                      <span className={`branch-badge ${exp.mergeStatus}`}>
                        {exp.mergeStatus === 'active' ? `(${exp.branch})` : '(merged)'}
                      </span>
                    </div>
                    <span className={`status-badge ${exp.mergeStatus === 'active' ? 'active' : 'merged'}`}>
                      {exp.mergeStatus === 'active' ? (
                        <>
                          <TrendingUp size={12} />
                          CURRENT
                        </>
                      ) : (
                        <>
                          <Check size={12} />
                          COMPLETED
                        </>
                      )}
                    </span>
                  </div>

                  <div className="commit-message">
                    <h3>{exp.title}</h3>
                    <div className="commit-details">
                      <span className="company-name">
                        <Briefcase size={14} />
                        {exp.company}
                      </span>
                      <span className="commit-date">
                        <Calendar size={14} />
                        {exp.period}
                      </span>
                      <span className="commit-location">
                        <MapPin size={14} />
                        {exp.location}
                      </span>
                      <span className={`type-tag ${exp.type.toLowerCase()}`}>
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <button
                    className="expand-toggle"
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    aria-label={expandedIndex === index ? 'Collapse' : 'Expand'}
                  >
                    <motion.div
                      animate={{ rotate: expandedIndex === index ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight size={20} />
                    </motion.div>
                  </button>
                </div>

                {/* Commit Diff Preview */}
                <div className="diff-preview">
                  <div className="diff-stats">
                    <span className="additions">
                      +++ {exp.responsibilities.length} responsibilities
                    </span>
                    {exp.achievements && (
                      <span className="achievements-count">
                        <Star size={12} />
                        {exp.achievements.length} achievements
                      </span>
                    )}
                  </div>
                </div>

                {/* Quick Preview */}
                <div className="commit-preview">
                  {exp.responsibilities.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="preview-line">
                      <span className="line-prefix">+</span>
                      <span className="line-content">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      className="commit-expanded"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Full Responsibilities */}
                      {exp.responsibilities.length > 2 && (
                        <div className="diff-section">
                          <div className="diff-header">
                            <span>📋 Additional Responsibilities</span>
                          </div>
                          {exp.responsibilities.slice(2).map((item, idx) => (
                            <motion.div
                              key={idx}
                              className="diff-line addition"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                            >
                              <span className="line-prefix">+</span>
                              <span className="line-content">{item}</span>
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {/* Achievements */}
                      {exp.achievements && (
                        <div className="diff-section achievements">
                          <div className="diff-header">
                            <Award size={16} />
                            <span>Key Achievements Unlocked</span>
                          </div>
                          <div className="achievement-grid">
                            {exp.achievements.map((achievement, idx) => (
                              <motion.div
                                key={idx}
                                className="achievement-badge"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                              >
                                <Star size={14} className="achievement-icon" />
                                <span>{achievement}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Commit Stats */}
                      <div className="commit-stats">
                        <div className="stat-item">
                          <Users size={14} />
                          <span>Impact: High</span>
                        </div>
                        <div className="stat-item">
                          <TrendingUp size={14} />
                          <span>Growth: +{exp.achievements?.length || 0} skills</span>
                        </div>
                        <div className="stat-item">
                          <Check size={14} />
                          <span>Status: {exp.mergeStatus === 'active' ? 'In Progress' : 'Completed'}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Repository Stats */}
        <motion.div
          className="repo-stats"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div className="stat-card">
            <GitCommit size={20} />
            <div className="stat-content">
              <span className="stat-value">{experiences.length}</span>
              <span className="stat-label">Total Commits</span>
            </div>
          </div>
          
          <div className="stat-card">
            <GitBranch size={20} />
            <div className="stat-content">
              <span className="stat-value">
                {experiences.filter(e => e.mergeStatus === 'active').length}
              </span>
              <span className="stat-label">Active Branches</span>
            </div>
          </div>
          
          <div className="stat-card">
            <Star size={20} />
            <div className="stat-content">
              <span className="stat-value">
                {experiences.reduce((acc, exp) => acc + (exp.achievements?.length || 0), 0)}
              </span>
              <span className="stat-label">Achievements</span>
            </div>
          </div>
          
          <div className="stat-card">
            <Award size={20} />
            <div className="stat-content">
              <span className="stat-value">100%</span>
              <span className="stat-label">Success Rate</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
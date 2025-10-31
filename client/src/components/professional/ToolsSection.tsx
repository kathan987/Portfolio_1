import { useState } from 'react';
import '../../styles/pro/tools.css';

interface Tool {
  name: string;
  icon: string;
  description: string;
  status: 'active' | 'standby';
}

export default function ToolsSection() {
  const [activeTab, setActiveTab] = useState<'it' | 'net' | 'infra'>('it');

  const categories = {
    it: {
      title: 'IT Support',
      color: '#3B82F6',
      tools: [
        { name: 'SysAid', icon: '🎫', description: 'Ticketing & Asset Management', status: 'active' },
        { name: 'Remote Desktop', icon: '🖥️', description: 'Remote Support Tools', status: 'active' },
        { name: 'Active Directory', icon: '👥', description: 'User & Group Management', status: 'active' },
        { name: 'Microsoft 365', icon: '📧', description: 'Email & Productivity', status: 'active' },
        { name: 'PowerShell', icon: '⚡', description: 'Automation & Scripting', status: 'active' },
        { name: 'Endpoint Security', icon: '🛡️', description: 'Antivirus & Protection', status: 'active' },
        { name: 'Backup Solutions', icon: '💾', description: 'Data Backup & Recovery', status: 'standby' },
        { name: 'Print Management', icon: '🖨️', description: 'Printer Administration', status: 'active' }
      ]
    },
    net: {
      title: 'Networking',
      color: '#10B981',
      tools: [
        { name: 'Wireshark', icon: '🦈', description: 'Packet Analysis & Debug', status: 'active' },
        { name: 'Palo Alto', icon: '🔥', description: 'Next-Gen Firewall', status: 'active' },
        { name: 'Cisco IOS', icon: '🔧', description: 'Router & Switch Config', status: 'active' },
        { name: 'VLAN Manager', icon: '🔀', description: 'Network Segmentation', status: 'active' },
        { name: 'DNS/DHCP', icon: '🌐', description: 'Network Services', status: 'active' },
        { name: 'Monitoring', icon: '📊', description: 'Performance Tracking', status: 'active' },
        { name: 'VPN Gateway', icon: '🔐', description: 'Secure Remote Access', status: 'active' },
        { name: 'Load Balancer', icon: '⚖️', description: 'Traffic Distribution', status: 'standby' }
      ]
    },
    infra: {
      title: 'Infrastructure',
      color: '#F59E0B',
      tools: [
        { name: 'VMware ESXi', icon: '☁️', description: 'Virtualization Platform', status: 'active' },
        { name: 'Azure', icon: '☁️', description: 'Cloud Infrastructure', status: 'active' },
        { name: 'Docker', icon: '🐳', description: 'Container Platform', status: 'active' },
        { name: 'Linux Admin', icon: '🐧', description: 'Server Management', status: 'active' },
        { name: 'Storage', icon: '💿', description: 'SAN/NAS Systems', status: 'active' },
        { name: 'HVAC', icon: '🌡️', description: 'Data Center Cooling', status: 'active' },
        { name: 'Power', icon: '⚡', description: 'UPS & Redundancy', status: 'active' },
        { name: 'Rack Systems', icon: '🗄️', description: 'Physical Infrastructure', status: 'standby' }
      ]
    }
  };

  const currentCategory = categories[activeTab];

  return (
    <section className="tools-section">
      <div className="tools-container">
        
        {/* Header */}
        <div className="tools-header">
          <div className="header-top">
            <div className="status-indicator">
              <span className="status-dot"></span>
              <span className="status-text">SYSTEM OPERATIONAL</span>
            </div>
            <div className="timestamp">
              {new Date().toLocaleTimeString('en-US', { hour12: false })} UTC
            </div>
          </div>
          <h2 className="tools-pro-title">Technical Toolkit</h2>
          <p className="tools-subtitle">Production environment tools & technologies</p>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          {(['it', 'net', 'infra'] as const).map((tab) => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
              style={{
                '--tab-color': categories[tab].color
              } as React.CSSProperties}
            >
              <span className="tab-label">{categories[tab].title}</span>
              <span className="tab-count">{categories[tab].tools.length}</span>
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="tools-grid">
          {currentCategory.tools.map((tool, index) => (
            <div
              key={tool.name}
              className="tool-card"
              style={{
                animationDelay: `${index * 0.05}s`
              }}
            >
              <div className="tool-card-header">
                <span className="tool-icon">{tool.icon}</span>
                <span className={`tool-status ${tool.status}`}>
                  <span className="status-dot-small"></span>
                  {tool.status}
                </span>
              </div>
              <div className="tool-card-body">
                <h3 className="tool-name">{tool.name}</h3>
                <p className="tool-description">{tool.description}</p>
              </div>
              <div className="tool-card-footer">
                <div className="tool-metrics">
                  <div className="metric">
                    <span className="metric-label">Uptime</span>
                    <span className="metric-value">99.9%</span>
                  </div>
                  <div className="metric-divider"></div>
                  <div className="metric">
                    <span className="metric-label">Response</span>
                    <span className="metric-value">&lt;50ms</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Bar */}
        <div className="summary-bar">
          <div className="summary-item">
            <span className="summary-icon">🔧</span>
            <div className="summary-data">
              <span className="summary-value">24</span>
              <span className="summary-label">Total Tools</span>
            </div>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-item">
            <span className="summary-icon">✅</span>
            <div className="summary-data">
              <span className="summary-value">22</span>
              <span className="summary-label">Active</span>
            </div>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-item">
            <span className="summary-icon">⏸️</span>
            <div className="summary-data">
              <span className="summary-value">2</span>
              <span className="summary-label">Standby</span>
            </div>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-item">
            <span className="summary-icon">📊</span>
            <div className="summary-data">
              <span className="summary-value">99.9%</span>
              <span className="summary-label">Avg Uptime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
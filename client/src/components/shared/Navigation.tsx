import React, { useCallback, memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMode } from "../../App";
import { Github, Linkedin, Instagram, Code, Palette } from "lucide-react";
import "../../styles/shared/nav.css";

const Navigation = memo(() => {
  const { mode, setMode } = useMode();
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggle = useCallback((newMode: 'professional' | 'personal') => {
    if (mode === newMode && location.pathname === `/${newMode}`) return;
    setMode(newMode);
    navigate(`/${newMode}`);
  }, [mode, location.pathname, setMode, navigate]);

  const handleHomeClick = useCallback(() => navigate('/'), [navigate]);

  const proSocials = [
    { name: "GitHub", url: "https://github.com/kathanthaker", icon: Github },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/kathanthaker", icon: Linkedin }
  ];

  const personalSocials = [
    { name: "Instagram", url: "https://instagram.com/kathanthaker", icon: Instagram },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/kathanthaker", icon: Linkedin }
  ];

  const socialLinks = mode === 'professional' ? proSocials : personalSocials;

  return (
    <header className="nav-shell" data-mode={mode}>
      <div className="nav-topline" aria-hidden="true">
        <div className="data-packet" />
      </div>
      
      <div className="nav-inner">
        <div className="brand" onClick={handleHomeClick}>
          <span className="brand-dot" />
          <span className="brand-text">Kathan Thaker</span>
          <span className="brand-status">[SYS-{mode === 'professional' ? 'PRO' : 'PER'}]</span>
        </div>

        <div className="fusion-toggle-wrapper">
          <div className="fusion-toggle">
            <div
              className="toggle-slider"
              style={{ transform: mode === 'professional' ? 'translateX(0%)' : 'translateX(calc(100% - 4px))' }}
            />
            <button type="button" className={`toggle-option ${mode === 'professional' ? 'active' : ''}`} onClick={() => handleToggle('professional')}>
              <Code size={14} />
              <span className="toggle-label">Technical</span>
            </button>
            <button type="button" className={`toggle-option ${mode === 'personal' ? 'active' : ''}`} onClick={() => handleToggle('personal')}>
              <Palette size={14} />
              <span className="toggle-label">Creative</span>
            </button>
          </div>
        </div>

        <div className="nav-actions">
          {socialLinks.map(link => {
            const Icon = link.icon;
            return (
              <a key={link.name} className="icon-btn" href={link.url} target="_blank" rel="noreferrer" aria-label={link.name}>
                <Icon size={18} />
                <span className="icon-tooltip">{link.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
});

Navigation.displayName = 'Navigation';
export default Navigation;
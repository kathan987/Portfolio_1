import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import './index.css';
import './styles/shared/global.css';
import './styles/shared/mobile-responsive.css';

// ===== LAZY LOADED PAGES =====
const Landing = lazy(() => import('./pages/Landing'));
const PersonalPage = lazy(() => import('./pages/PersonalPage'));
const ProfessionalPage = lazy(() => import('./pages/ProfessionalPage'));

// ===== OPTIMIZED LOADING COMPONENT =====
const PageLoader: React.FC = () => (
  <div className="page-loader">
    <div className="loader-content">
      <div className="loader-spinner" />
      <p className="loader-text">Loading...</p>
    </div>
  </div>
);

// ===== MODE TYPES =====
type Mode = 'professional' | 'personal';

interface ModeContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
  isTransitioning: boolean;
  isMobile: boolean;
}

// ===== MODE CONTEXT =====
const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const useMode = (): ModeContextType => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within ModeProvider');
  }
  return context;
};

// ===== SCROLL TO TOP COMPONENT =====
const ScrollToTop: React.FC = React.memo(() => {
  const { pathname } = useLocation();

  useEffect(() => {
    // ✅ Smooth scroll to top on route change
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // ✅ Also scroll container if it exists
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
  }, [pathname]);

  return null;
});

ScrollToTop.displayName = 'ScrollToTop';

// ===== MAIN APP =====
export default function App() {
  const [mode, setMode] = useState<Mode>('professional');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // ✅ DETECT MOBILE DEVICE
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 968;
      setIsMobile(mobile);
      
      // Add class to body for mobile-specific styles
      if (mobile) {
        document.body.classList.add('mobile-device');
      } else {
        document.body.classList.remove('mobile-device');
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ✅ PREVENT HORIZONTAL SCROLL
  useEffect(() => {
    // Prevent horizontal overflow on mount
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    
    return () => {
      document.documentElement.style.overflowX = '';
      document.body.style.overflowX = '';
    };
  }, []);

  // ===== SYNC MODE WITH ROUTE =====
  useEffect(() => {
    if (location.pathname === '/personal') {
      setMode('personal');
    } else if (location.pathname === '/professional') {
      setMode('professional');
    }
  }, [location.pathname]);

  // ===== MEMOIZED TOGGLE MODE =====
  const toggleMode = useCallback(() => {
    setIsTransitioning(true);
    
    // ✅ Shorter transition on mobile for performance
    const transitionDuration = isMobile ? 200 : 300;
    
    requestAnimationFrame(() => {
      setMode((prev) => (prev === 'professional' ? 'personal' : 'professional'));
      setTimeout(() => setIsTransitioning(false), transitionDuration);
    });
  }, [isMobile]);

  // ===== UPDATE BODY CLASSES & THEME COLOR =====
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    
    // Set mode attributes
    body.setAttribute('data-mode', mode);
    html.setAttribute('data-mode', mode);
    body.className = `mode-${mode}${isMobile ? ' mobile-device' : ''}`;
    
    // Add transitioning class
    if (isTransitioning) {
      body.classList.add('is-transitioning');
    } else {
      body.classList.remove('is-transitioning');
    }
    
    // ✅ Update theme color dynamically
    const themeColor = mode === 'professional' ? '#0B1118' : '#FFFCF5';
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }
    
    metaThemeColor.setAttribute('content', themeColor);
    
    // ✅ Update iOS status bar color
    let appleStatusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    if (appleStatusBar) {
      appleStatusBar.setAttribute(
        'content',
        mode === 'professional' ? 'black-translucent' : 'default'
      );
    }
  }, [mode, isTransitioning, isMobile]);

  // ===== KEYBOARD SHORTCUTS (DESKTOP ONLY) =====
  useEffect(() => {
    if (isMobile) return; // ✅ Disable keyboard shortcuts on mobile
    
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl+Shift+M - Toggle mode
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'M') {
        e.preventDefault();
        toggleMode();
        console.log('🔄 Mode toggled via keyboard shortcut');
      }
    };

    window.addEventListener('keydown', handleKeyPress, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [toggleMode, isMobile]);

  // ✅ HANDLE ORIENTATION CHANGE (MOBILE)
  useEffect(() => {
    if (!isMobile) return;
    
    const handleOrientationChange = () => {
      // Force layout recalculation on orientation change
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    };
    
    window.addEventListener('orientationchange', handleOrientationChange);
    
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [isMobile]);

  // ✅ DISABLE PULL-TO-REFRESH ON MOBILE
  useEffect(() => {
    let lastTouchY = 0;
    let preventPullToRefresh = false;

    const touchStartHandler = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      lastTouchY = e.touches[0].clientY;
      preventPullToRefresh = window.pageYOffset === 0;
    };

    const touchMoveHandler = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const touchYDelta = touchY - lastTouchY;
      lastTouchY = touchY;

      if (preventPullToRefresh && touchYDelta > 0) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchstart', touchStartHandler, { passive: false });
    document.addEventListener('touchmove', touchMoveHandler, { passive: false });

    return () => {
      document.removeEventListener('touchstart', touchStartHandler);
      document.removeEventListener('touchmove', touchMoveHandler);
    };
  }, []);

  // ===== MEMOIZED CONTEXT VALUE =====
  const contextValue = useMemo(
    () => ({
      mode,
      setMode,
      toggleMode,
      isTransitioning,
      isMobile
    }),
    [mode, toggleMode, isTransitioning, isMobile]
  );

  return (
    <ModeContext.Provider value={contextValue}>
      <div className={`app-container mode-${mode}`} data-mode={mode}>
        <ScrollToTop />
        
        {/* Transition Overlay - Simplified on Mobile */}
        {isTransitioning && !isMobile && (
          <div className="mode-transition-overlay">
            <div className="mode-transition-content">
              <div className="mode-transition-terminal">
                <div className="terminal-window">
                  <div className="terminal-header">
                    <div className="terminal-dots">
                      <span className="dot dot-red"></span>
                      <span className="dot dot-yellow"></span>
                      <span className="dot dot-green"></span>
                    </div>
                    <span className="terminal-title">system-control</span>
                  </div>
                  <div className="terminal-body">
                    <div className="terminal-line">
                      <span className="prompt">$</span> sudo systemctl restart portfolio
                    </div>
                    <div className="terminal-line">
                      [  OK  ] Stopping {mode} mode...
                    </div>
                    <div className="terminal-line">
                      [  OK  ] Starting {mode === 'professional' ? 'personal' : 'professional'} mode...
                    </div>
                    <div className="terminal-line success">
                      ✓ Mode switch complete
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ✅ Simple Transition Overlay for Mobile */}
        {isTransitioning && isMobile && (
          <div className="mode-transition-overlay mobile-transition">
            <div className="simple-loader">
              <div className="loader-spinner" />
              <p>Switching mode...</p>
            </div>
          </div>
        )}
        
        {/* Routes */}
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/" element={<Landing />} />
            <Route path="/professional" element={<ProfessionalPage />} />
            <Route path="/personal" element={<PersonalPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </ModeContext.Provider>
  );
}
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
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
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
  const [showContent, setShowContent] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // ✅ DETECT MOBILE DEVICE
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 968;
      setIsMobile(mobile);
      
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
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    
    return () => {
      document.documentElement.style.overflowX = '';
      document.body.style.overflowX = '';
    };
  }, []);

  // ===== SYNC MODE WITH ROUTE - SMOOTH BLACKOUT TRANSITION =====
  useEffect(() => {
    const newMode = location.pathname === '/personal' ? 'personal' : 
                    location.pathname === '/professional' ? 'professional' : mode;
    
    if (newMode !== mode) {
      // Start blackout transition
      setIsTransitioning(true);
      setShowContent(false);
      
      // Change mode while screen is black
      setTimeout(() => {
        setMode(newMode);
      }, 300);
      
      // Reveal new content
      setTimeout(() => {
        setShowContent(true);
        setIsTransitioning(false);
      }, 700);
    }
  }, [location.pathname]);

  // ===== MEMOIZED TOGGLE MODE =====
  const toggleMode = useCallback(() => {
    // Transition is handled by route change effect
  }, []);

  // ===== UPDATE BODY CLASSES & THEME COLOR =====
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    
    body.setAttribute('data-mode', mode);
    html.setAttribute('data-mode', mode);
    body.className = `mode-${mode}${isMobile ? ' mobile-device' : ''}`;
    
    if (isTransitioning) {
      body.classList.add('is-transitioning');
    } else {
      body.classList.remove('is-transitioning');
    }
    
    const themeColor = mode === 'professional' ? '#0B1118' : '#FFFCF5';
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }
    
    metaThemeColor.setAttribute('content', themeColor);
    
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
    if (isMobile) return;
    
    const handleKeyPress = (e: KeyboardEvent) => {
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
        
        {/* Blackout Transition Overlay */}
        <div 
          className={`blackout-overlay ${isTransitioning ? 'active' : ''}`}
          style={{
            background: mode === 'professional' 
              ? 'linear-gradient(135deg, #0a0e13 0%, #1a1f2e 100%)'
              : 'linear-gradient(135deg, #FFFCF5 0%, #FFF8F0 100%)'
          }}
        >
          <div className="blackout-content">
            <div className="blackout-spinner"></div>
            <p className="blackout-text">
              {mode === 'professional' ? 'Loading Technical Mode' : 'Loading Creative Mode'}
            </p>
          </div>
        </div>
        
        {/* Content - Hidden during transition */}
        <div className={`app-content ${showContent ? 'visible' : 'hidden'}`}>
          <Suspense fallback={<PageLoader />}>
            <Routes location={location}>
              <Route path="/" element={<Landing />} />
              <Route path="/professional" element={<ProfessionalPage />} />
              <Route path="/personal" element={<PersonalPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </ModeContext.Provider>
  );
}
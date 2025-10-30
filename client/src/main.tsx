import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// ===== PERFORMANCE MONITORING =====
const startTime = performance.now();

// ===== CONSOLE ASCII ART =====
console.log(`
%c
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   ██╗  ██╗ █████╗ ████████╗██╗  ██╗ █████╗ ███╗   ██╗   ║
║   ██║ ██╔╝██╔══██╗╚══██╔══╝██║  ██║██╔══██╗████╗  ██║   ║
║   █████╔╝ ███████║   ██║   ███████║███████║██╔██╗ ██║   ║
║   ██╔═██╗ ██╔══██║   ██║   ██╔══██║██╔══██║██║╚██╗██║   ║
║   ██║  ██╗██║  ██║   ██║   ██║  ██║██║  ██║██║ ╚████║   ║
║   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝   ║
║                                                           ║
║   👋 Hey there, fellow developer!                        ║
║   🔍 Inspecting the code? I like your style.            ║
║                                                           ║
║   💡 Try these commands:                                 ║
║      → konami()      Unlock secret mode                 ║
║      → stats()       View performance metrics           ║
║      → coffee()      You probably need this ☕          ║
║      → help()        Show all commands                  ║
║                                                           ║
║   📧 Built with React 18 + TypeScript + ❤️              ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`, 'color: #00ff88; font-family: monospace; font-size: 12px;');

// ===== EASTER EGG COMMANDS =====
(window as any).konami = () => {
  console.log('%c🎉 KONAMI CODE ACTIVATED!', 'color: #ff0; font-size: 20px; font-weight: bold;');
  document.body.style.animation = 'rainbow-border 2s linear infinite';
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rainbow-border {
      0% { box-shadow: inset 0 0 0 5px #ff0000; }
      16% { box-shadow: inset 0 0 0 5px #ff8800; }
      33% { box-shadow: inset 0 0 0 5px #ffff00; }
      50% { box-shadow: inset 0 0 0 5px #00ff00; }
      66% { box-shadow: inset 0 0 0 5px #0088ff; }
      83% { box-shadow: inset 0 0 0 5px #8800ff; }
      100% { box-shadow: inset 0 0 0 5px #ff0000; }
    }
  `;
  document.head.appendChild(style);
  setTimeout(() => {
    document.body.style.animation = '';
    style.remove();
  }, 5000);
};

(window as any).stats = () => {
  if ('performance' in window) {
    const perf = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paintEntries = performance.getEntriesByType('paint');
    
    console.table({
      'DOM Load': `${(perf.domContentLoadedEventEnd - perf.domContentLoadedEventStart).toFixed(2)}ms`,
      'Page Load': `${(perf.loadEventEnd - perf.loadEventStart).toFixed(2)}ms`,
      'DNS Lookup': `${(perf.domainLookupEnd - perf.domainLookupStart).toFixed(2)}ms`,
      'TCP Connect': `${(perf.connectEnd - perf.connectStart).toFixed(2)}ms`,
      'First Paint': paintEntries.length > 0 ? `${paintEntries[0].startTime.toFixed(2)}ms` : 'N/A',
      'Memory Used': 'performance' in window && 'memory' in (performance as any) 
        ? `${((performance as any).memory.usedJSHeapSize / 1048576).toFixed(2)} MB`
        : 'N/A'
    });
  }
};

(window as any).coffee = () => {
  console.log(`
%c              (  )   (   )  )
               ) (   )  (  (
               ( )  (    ) )
               _____________
              <_____________> ___
              |             |/ _ \\
              |   COFFEE    | | | |
              |   LOADING   |_| |_|
           ___|             |\\___/
          /    \\___________/    \\
          \\_____________________/
  
  ☕ Here's your virtual coffee. Stay caffeinated!
  `, 'color: #8B4513; font-family: monospace;');
};

(window as any).help = () => {
  console.log(`
%c📚 Available Commands:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ konami()    Activate secret rainbow mode
→ stats()     View detailed performance metrics  
→ coffee()    Get virtual coffee ☕
→ clear()     Clear console
→ help()      Show this menu
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `, 'color: #00d4ff; font-family: monospace; font-size: 14px;');
};

// ===== ERROR BOUNDARY =====
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error('%c💥 ERROR CAUGHT', 'color: #ef4444; font-size: 16px; font-weight: bold;', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('🚨 Error Details:', { error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0B1118 0%, #1a1f2e 100%)',
          color: '#ffffff',
          padding: '2rem',
          fontFamily: '"JetBrains Mono", monospace'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '600px' }}>
            <pre style={{
              background: '#1a1f2e',
              border: '2px solid #ef4444',
              borderRadius: '8px',
              padding: '2rem',
              textAlign: 'left',
              fontSize: '0.875rem',
              color: '#ef4444',
              marginBottom: '2rem',
              boxShadow: '0 0 30px rgba(239, 68, 68, 0.3)'
            }}>
{`$ sudo systemctl status portfolio
● portfolio.service - Portfolio App
   Loaded: loaded
   Active: failed (Result: exit-code)

[ERROR] ${this.state.error?.message || 'Unknown error'}

// Attempting auto-recovery...`}
            </pre>

            <h1 style={{ 
              fontSize: '2rem', 
              marginBottom: '1rem', 
              color: '#ef4444'
            }}>
              ⚠️ System Error
            </h1>
            <p style={{ 
              fontSize: '1.125rem', 
              marginBottom: '2rem', 
              opacity: 0.8,
              color: '#cbd5e1'
            }}>
              Something went wrong. Let's reboot the system.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '1rem 2rem',
                fontSize: '1rem',
                background: '#00ff88',
                color: '#0B1118',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '700',
                fontFamily: '"JetBrains Mono", monospace',
                boxShadow: '0 8px 24px rgba(0, 255, 136, 0.3)',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              🔄 sudo reboot --now
            </button>

            {import.meta.env.DEV && this.state.error && (
              <details style={{ 
                marginTop: '2rem', 
                textAlign: 'left', 
                fontSize: '0.875rem', 
                opacity: 0.6,
                background: 'rgba(0,0,0,0.3)',
                padding: '1rem',
                borderRadius: '8px'
              }}>
                <summary style={{ 
                  cursor: 'pointer', 
                  marginBottom: '0.5rem',
                  color: '#00ff88',
                  fontWeight: 'bold'
                }}>
                  🔍 Stack Trace (Dev Mode)
                </summary>
                <pre style={{ 
                  background: '#0a0e13', 
                  padding: '1rem', 
                  borderRadius: '4px', 
                  overflow: 'auto',
                  border: '1px solid #334155',
                  color: '#cbd5e1'
                }}>
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// ===== RENDER APP =====
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('❌ FATAL: Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

// ===== PERFORMANCE LOGGING =====
window.addEventListener('load', () => {
  const loadTime = performance.now() - startTime;
  console.log(`%c🚀 Portfolio loaded in ${loadTime.toFixed(2)}ms`, 'color: #10b981; font-weight: bold; font-size: 14px;');
});

// ===== WEB VITALS MONITORING (Dev Only) =====
if (import.meta.env.DEV && 'PerformanceObserver' in window) {
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log(`%c🎨 LCP: ${entry.startTime.toFixed(2)}ms`, 'color: #f59e0b; font-weight: bold;');
        }
        if (entry.entryType === 'first-input' && 'processingStart' in entry) {
          const fid = (entry as any).processingStart - entry.startTime;
          console.log(`%c⚡ FID: ${fid.toFixed(2)}ms`, 'color: #06b6d4; font-weight: bold;');
        }
      }
    });
    
    if (PerformanceObserver.supportedEntryTypes) {
      if (PerformanceObserver.supportedEntryTypes.includes('largest-contentful-paint')) {
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      }
      if (PerformanceObserver.supportedEntryTypes.includes('first-input')) {
        observer.observe({ entryTypes: ['first-input'] });
      }
    }
  } catch (e) {
    // Silent fail
  }
}

// ===== WELCOME MESSAGE =====
if (import.meta.env.DEV) {
  console.log('%c⚡ Dev Mode Active', 'color: #00d4ff; font-size: 14px; font-weight: bold;');
  console.log('%c👨‍💻 Welcome! Type help() for commands', 'color: #64748b; font-size: 12px;');
}
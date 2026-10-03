import React, { useState, useEffect } from 'react';

export const TopBar = ({ activeTab, onToggleMobile, currentUser }) => {
  const tabTitles = {
    dispatcher: { step: 'STAGE 01', title: 'FLEET BROADCAST & PQC ENVELOPE' },
    officer: { step: 'STAGE 02', title: 'LOCAL DECRYPT & DYNAMIC WATERMARKING' },
    forensic: { step: 'STAGE 03', title: 'FORENSIC LEAK ATTRIBUTION LAB' },
    ledger: { step: 'STAGE 04', title: 'CONSORTIUM DLT MERKLE LEDGER' }
  };

  const currentInfo = tabTitles[activeTab] || tabTitles.officer;

  // UI Scale state (zoom factor)
  const [scale, setScale] = useState(() => {
    try {
      const saved = localStorage.getItem('navalsentinel_ui_scale');
      return saved ? parseFloat(saved) : 1.0;
    } catch {
      return 1.0;
    }
  });

  // Font Scale state (text size factor)
  const [fontScale, setFontScale] = useState(() => {
    try {
      const saved = localStorage.getItem('navalsentinel_font_scale');
      return saved ? parseFloat(saved) : 1.0;
    } catch {
      return 1.0;
    }
  });

  // Apply scale updates to document root
  useEffect(() => {
    document.documentElement.style.setProperty('--ui-scale', scale.toString());
    try {
      localStorage.setItem('navalsentinel_ui_scale', scale.toString());
    } catch {}
  }, [scale]);

  // Apply font scale updates to document root
  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', fontScale.toString());
    try {
      localStorage.setItem('navalsentinel_font_scale', fontScale.toString());
    } catch {}
  }, [fontScale]);

  const handleScaleChange = (delta) => {
    setScale((prev) => {
      const next = Math.round((prev + delta) * 100) / 100;
      return Math.min(Math.max(next, 0.8), 1.35);
    });
  };

  const handleFontScaleChange = (delta) => {
    setFontScale((prev) => {
      const next = Math.round((prev + delta) * 100) / 100;
      return Math.min(Math.max(next, 0.85), 1.3);
    });
  };

  const handleResetScale = () => {
    setScale(1.0);
    setFontScale(1.0);
  };

  return (
    <header className="topbar-container">
      {/* Streamlined Executive Action Bar */}
      <div className="topbar-action-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Mobile Menu Toggle Button */}
          <button 
            className="topbar-mobile-burger"
            onClick={onToggleMobile}
            aria-label="Toggle Navigation Menu"
          >
            ☰
          </button>

          {/* Breadcrumb Info */}
          <div className="topbar-breadcrumb">
            <span className="topbar-step-pill">{currentInfo.step}</span>
            <span className="topbar-slash" aria-hidden="true">/</span>
            <h1 className="topbar-stage-title">{currentInfo.title}</h1>
          </div>
        </div>

        {/* Tactical Session Stats & Ultra-Compact Scale/Font Adjuster at Far Right */}
        <div className="topbar-telemetry-right">
          <div className="topbar-telemetry-item">
            <span className="topbar-telemetry-label">STATION:</span>
            <span className="topbar-telemetry-val">{currentUser?.unit?.split('-')[0] || 'WESEE HQ'}</span>
          </div>

          <span className="topbar-security-mark">
            DEFENCE CLASSIFIED
          </span>

          <div className="topbar-divider-v" />

          {/* Discrete Micro Scale & Font Control at Far Right */}
          <div className="topbar-scale-compact" role="group" aria-label="Display Zoom and Text Scale Controls">
            <button 
              className="scale-btn-micro" 
              onClick={() => handleScaleChange(-0.05)}
              disabled={scale <= 0.8}
              title="Zoom Out (-5%)"
              aria-label="Zoom Out"
            >
              −
            </button>
            <span className="scale-val-micro" title="Interface Zoom">{Math.round(scale * 100)}%</span>
            <button 
              className="scale-btn-micro" 
              onClick={() => handleScaleChange(0.05)}
              disabled={scale >= 1.35}
              title="Zoom In (+5%)"
              aria-label="Zoom In"
            >
              +
            </button>
            <span className="scale-sep">|</span>
            <button 
              className="scale-btn-micro font-btn" 
              onClick={() => handleFontScaleChange(-0.05)}
              disabled={fontScale <= 0.85}
              title="Smaller Text (Font -5%)"
              aria-label="Smaller Text"
            >
              A−
            </button>
            <button 
              className="scale-btn-micro font-btn" 
              onClick={() => handleFontScaleChange(0.05)}
              disabled={fontScale >= 1.3}
              title="Larger Text (Font +5%)"
              aria-label="Larger Text"
            >
              A+
            </button>
            {(scale !== 1.0 || fontScale !== 1.0) && (
              <button 
                className="scale-reset-micro"
                onClick={handleResetScale}
                title="Reset Zoom and Font to 100%"
                aria-label="Reset Zoom and Font to 100%"
              >
                ↺
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;

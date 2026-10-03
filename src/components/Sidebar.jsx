import React from 'react';
import { 
  NavalInsigniaIcon, 
  QuantumShieldIcon, 
  TerminalIcon, 
  CrosshairIcon, 
  MerkleBlockIcon, 
  UserIcon,
  CheckCircleIcon 
} from './Icons';

export const Sidebar = ({ 
  activeTab, 
  setActiveTab, 
  currentUser, 
  setIsAuthModalOpen, 
  leakCount = 0,
  isDecrypted = false,
  isMobileOpen = false,
  setIsMobileOpen
}) => {
  const navItems = [
    {
      id: 'dispatcher',
      step: '01',
      title: 'Fleet Broadcast',
      sub: 'Envelop & Dispatch',
      icon: QuantumShieldIcon
    },
    {
      id: 'officer',
      step: '02',
      title: 'Officer Terminal',
      sub: 'Decrypt & Stego Watermark',
      icon: TerminalIcon,
      badge: isDecrypted ? 'DECRYPTED' : null
    },
    {
      id: 'forensic',
      step: '03',
      title: 'Forensic Scanner',
      sub: 'Attribution & Leak Audit',
      icon: CrosshairIcon,
      badge: leakCount > 0 ? `${leakCount} LEAK` : null,
      badgeType: 'crimson'
    },
    {
      id: 'ledger',
      step: '04',
      title: 'Consortium Ledger',
      sub: 'Tamper-Proof DLT Chain',
      icon: MerkleBlockIcon
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="sidebar-mobile-backdrop" 
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`sidebar-nav ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* Top: Official Indian Navy Seal & WESEE Title */}
        <div>
          <div className="sidebar-brand-box">
            <div className="sidebar-crest-wrapper">
              <NavalInsigniaIcon size={42} />
            </div>
            <div className="sidebar-brand-text">
              <h2>NAVAL-SENTINEL</h2>
              <span className="sidebar-navy-sub">INDIAN NAVY • WESEE</span>
              <span className="sidebar-enclave-tag">OPERATIONAL C2 SYSTEM</span>
            </div>
          </div>

          {/* Understated Executive Operational Status */}
          <div className="sidebar-system-status">
            <span className="status-dot-green"></span>
            <span>SECURE HARBOR LINK // ACTIVE</span>
          </div>

          {/* Chronological Navigation Section */}
          <div className="sidebar-nav-section-title">
            <span>CHRONOLOGICAL WORKFLOW</span>
          </div>

          <nav className="sidebar-nav-list" aria-label="Sidebar Workflow Navigation">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  className={`sidebar-nav-btn ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (setIsMobileOpen) setIsMobileOpen(false);
                  }}
                >
                  <div className="sidebar-btn-left">
                    <span className="sidebar-step-num">{item.step}</span>
                    <div className="sidebar-icon-wrap">
                      <IconComp size={18} color={isActive ? 'var(--text-main)' : 'var(--text-muted)'} />
                    </div>
                    <div className="sidebar-btn-titles">
                      <span className="sidebar-item-title">{item.title}</span>
                      <span className="sidebar-item-sub">{item.sub}</span>
                    </div>
                  </div>

                  {item.badge && (
                    <span className={`badge ${item.badgeType === 'crimson' ? 'badge-crimson' : 'badge-emerald'}`} style={{ fontSize: '0.68rem', padding: '2px 6px' }}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom: Active Officer Personnel Card */}
        <div className="sidebar-footer-officer">
          <div 
            className="sidebar-officer-card"
            role="button"
            tabIndex={0}
            onClick={() => setIsAuthModalOpen(true)}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                setIsAuthModalOpen(true);
              }
            }}
            title="Click to Switch Active Personnel / Tactical Workstation"
            aria-label={`Logged in as ${currentUser?.name}. Click to switch officer workstation.`}
          >
            <div className="avatar-initials">
              {currentUser?.avatarInitials || 'OF'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="sidebar-officer-name" title={currentUser?.name}>
                {currentUser?.name}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px', flexWrap: 'wrap' }}>
                <span className="badge badge-amber" style={{ fontSize: '0.7rem', padding: '2px 6px' }}>
                  {currentUser?.rank}
                </span>
                <span className="sidebar-officer-role">
                  {currentUser?.roleLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

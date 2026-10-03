import React from 'react';
import { 
  NavalInsigniaIcon, 
  RadarIcon, 
  QuantumShieldIcon, 
  UserIcon, 
  TerminalIcon, 
  MerkleBlockIcon, 
  CrosshairIcon, 
  InfoIcon 
} from './Icons';

export const Header = ({ 
  activeTab, 
  setActiveTab, 
  currentUser, 
  setIsAuthModalOpen,
  setIsSpecsModalOpen,
  leakCount = 0
}) => {
  return (
    <header>
      {/* Top Defence Classification Banner */}
      <div className="classification-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="status-dot-airgap"></span>
          <span>WESEE COMMAND ENCLAVE // SECTOR-07</span>
        </div>
        <span className="classification-badge">SECRET // NOFORN // WESEE TACTICAL NET</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>NODE: SECURE HARBOR LINK</span>
          <span>PQC FIPS 203/204</span>
        </div>
      </div>

      {/* Main Command Center Header */}
      <div className="command-header">
        <div className="header-inner">
          {/* Brand & Crest */}
          <div className="brand-section" onClick={() => setActiveTab('officer')}>
            <div className="brand-logo-shield">
              <NavalInsigniaIcon size={28} color="#f59e0b" />
            </div>
            <div className="brand-title-group">
              <h1>
                NAVAL-SENTINEL
                <span className="pqc-badge">POST-QUANTUM FIPS 203</span>
              </h1>
              <p>MINISTRY OF DEFENCE • INDIAN NAVY (WESEE)</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="nav-tabs-group" aria-label="Main Navigation">
            <button 
              className={`nav-tab-btn ${activeTab === 'officer' ? 'active' : ''}`}
              onClick={() => setActiveTab('officer')}
            >
              <TerminalIcon size={16} color={activeTab === 'officer' ? '#f59e0b' : 'currentColor'} />
              <span>Officer Terminal</span>
            </button>

            <button 
              className={`nav-tab-btn ${activeTab === 'dispatcher' ? 'active' : ''}`}
              onClick={() => setActiveTab('dispatcher')}
            >
              <QuantumShieldIcon size={16} color={activeTab === 'dispatcher' ? '#f59e0b' : 'currentColor'} />
              <span>Fleet Dispatcher</span>
            </button>

            <button 
              className={`nav-tab-btn ${activeTab === 'forensic' ? 'active active-forensic' : ''}`}
              onClick={() => setActiveTab('forensic')}
            >
              <CrosshairIcon size={16} color={activeTab === 'forensic' ? '#f59e0b' : 'currentColor'} />
              <span>Forensic Scanner</span>
              {leakCount > 0 && (
                <span className="badge badge-crimson" style={{ padding: '1px 6px', fontSize: '0.62rem' }}>
                  {leakCount}
                </span>
              )}
            </button>

            <button 
              className={`nav-tab-btn ${activeTab === 'ledger' ? 'active' : ''}`}
              onClick={() => setActiveTab('ledger')}
            >
              <MerkleBlockIcon size={16} color={activeTab === 'ledger' ? '#f59e0b' : 'currentColor'} />
              <span>Consortium Ledger</span>
            </button>
          </nav>

          {/* Quick Actions: System Specs & Active Role Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div 
              className="user-role-card" 
              onClick={() => setIsAuthModalOpen(true)}
              title="Click to Switch Active Officer / Role"
            >
              <div className="avatar-initials">
                {currentUser?.avatarInitials || 'OF'}
              </div>
              <div className="user-role-info">
                <span className="user-role-title">{currentUser?.name || 'Officer'}</span>
                <span className="user-role-sub">{currentUser?.roleLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

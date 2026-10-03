import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { ChronologyStepper } from './components/ChronologyStepper';
import { OfficerTerminal } from './components/OfficerTerminal';
import { DispatcherTab } from './components/DispatcherTab';
import { ForensicScanner } from './components/ForensicScanner';
import { LedgerInspector } from './components/LedgerInspector';
import { AuthModal } from './components/AuthModal';
import { OFFICERS, INITIAL_DOCUMENTS, GENESIS_LEDGER } from './utils/mockData';

export function App() {
  // Current active logged-in officer (default: Lt. Cdr. Ananya Roy on INS Vikrant)
  const [currentUser, setCurrentUser] = useState(OFFICERS[1]);
  const [activeTab, setActiveTab] = useState('officer');
  const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);
  const [ledger, setLedger] = useState(GENESIS_LEDGER);
  const [simulatedLeak, setSimulatedLeak] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Track if any document has been decrypted
  const isAnyDecrypted = ledger.length > 1;

  // Handle document dispatched by Commander
  const handleDocumentDispatched = (newDoc) => {
    setActiveTab('officer');
  };

  // Handle leak simulation triggered from officer terminal
  const handleSimulateLeak = (leakData) => {
    setSimulatedLeak(leakData);
  };

  return (
    <div className="app-shell">
      {/* Left Persistent Navigation Bar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        setIsAuthModalOpen={setIsAuthModalOpen}
        leakCount={simulatedLeak ? 1 : 0}
        isDecrypted={isAnyDecrypted}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div className="content-area-main">
        {/* Tactical Top Bar with Classification & Telemetry */}
        <TopBar
          activeTab={activeTab}
          onToggleMobile={() => setIsMobileOpen(!isMobileOpen)}
          currentUser={currentUser}
        />

        {/* Main Interactive Stage with Chronology */}
        <main className="main-content-stage">
          {/* Chronological Pipeline Stepper */}
          <ChronologyStepper
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isDecrypted={isAnyDecrypted}
            hasLeak={Boolean(simulatedLeak)}
            ledgerCount={ledger.length}
          />

        {activeTab === 'dispatcher' && (
          <DispatcherTab
            documents={documents}
            setDocuments={setDocuments}
            onDocumentDispatched={handleDocumentDispatched}
          />
        )}

        {activeTab === 'officer' && (
          <OfficerTerminal
            currentUser={currentUser}
            documents={documents}
            ledger={ledger}
            setLedger={setLedger}
            onSimulateLeak={handleSimulateLeak}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'forensic' && (
          <ForensicScanner
            ledger={ledger}
            simulatedLeak={simulatedLeak}
            onClearSimulatedLeak={() => setSimulatedLeak(null)}
          />
        )}

        {activeTab === 'ledger' && (
          <LedgerInspector
            ledger={ledger}
            setLedger={setLedger}
          />
        )}
      </main>

      {/* Role / Identity Switcher Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onSelectUser={(officer) => {
          setCurrentUser(officer);
          // When switching role, intuitively switch to that officer's primary task
          if (officer.role === 'dispatcher') setActiveTab('dispatcher');
          else if (officer.role === 'auditor') setActiveTab('forensic');
          else setActiveTab('officer');
        }}
      />

      {/* Footer in Clean Institutional Style */}
      <footer style={{ 
        borderTop: '1px solid var(--border-subtle)', 
        background: '#ffffff', 
        padding: '16px 24px',
        marginTop: '36px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.74rem',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)'
        }}>
          <div>
            <strong style={{ color: 'var(--text-main)' }}>MINISTRY OF DEFENCE (MoD) • INDIAN NAVY (WESEE)</strong>
            <span style={{ margin: '0 8px' }}>—</span>
            <span>POST-QUANTUM CRYPTOGRAPHIC ATTRIBUTION & PROVENANCE SYSTEM</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>NIST FIPS 203 (ML-KEM)</span>
            <span>NIST FIPS 204 (ML-DSA)</span>
            <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>SECURE ENCLAVE NODE #07</span>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import { 
  QuantumShieldIcon, 
  TerminalIcon, 
  CrosshairIcon, 
  MerkleBlockIcon,
  CheckCircleIcon 
} from './Icons';

export const ChronologyStepper = ({ 
  activeTab, 
  setActiveTab, 
  isDecrypted = false, 
  hasLeak = false, 
  ledgerCount = 1 
}) => {
  const steps = [
    {
      id: 'dispatcher',
      num: 1,
      title: '1. Fleet Broadcast',
      sub: 'Commander Envelopes & Sends',
      icon: QuantumShieldIcon,
      isCompleted: true
    },
    {
      id: 'officer',
      num: 2,
      title: '2. Local Decrypt & Watermark',
      sub: 'Officer Decrypts • Stego Injected',
      icon: TerminalIcon,
      isCompleted: isDecrypted
    },
    {
      id: 'forensic',
      num: 3,
      title: '3. Forensic Leak Audit',
      sub: 'Extract Provenance • Identify Culprit',
      icon: CrosshairIcon,
      isCompleted: hasLeak
    },
    {
      id: 'ledger',
      num: 4,
      title: '4. Consortium DLT Ledger',
      sub: `${ledgerCount} Cryptographic Blocks Sealed`,
      icon: MerkleBlockIcon,
      isCompleted: ledgerCount > 1
    }
  ];

  return (
    <div className="chronology-stepper" aria-label="Chronological Defense Workflow">
      {steps.map((step, index) => {
        const IconComponent = step.icon;
        const isActive = activeTab === step.id;

        return (
          <React.Fragment key={step.id}>
            <button
              className={`stepper-item ${isActive ? 'active' : ''} ${step.isCompleted ? 'completed' : ''}`}
              onClick={() => setActiveTab(step.id)}
              title={`Switch to Chronological Stage ${step.num}: ${step.title}`}
            >
              <div className="stepper-num">
                {step.isCompleted ? (
                  <CheckCircleIcon size={14} color="#ffffff" />
                ) : (
                  step.num
                )}
              </div>

              <div className="stepper-label-group">
                <span className="stepper-step-title" style={{ color: isActive ? 'var(--text-main)' : 'var(--text-secondary)' }}>
                  {step.title}
                </span>
                <span className="stepper-step-sub">
                  {step.sub}
                </span>
              </div>
            </button>

            {index < steps.length - 1 && (
              <span className="stepper-arrow" aria-hidden="true">→</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

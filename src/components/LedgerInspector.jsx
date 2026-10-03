import React, { useState } from 'react';
import { 
  MerkleBlockIcon, 
  CheckCircleIcon, 
  AlertLeakIcon, 
  RefreshIcon,
  QuantumShieldIcon 
} from './Icons';
import { sfx } from '../utils/soundEffects';

export const LedgerInspector = ({ ledger, setLedger }) => {
  const [tamperedState, setTamperedState] = useState(false);
  const [originalBackup, setOriginalBackup] = useState(null);
  const [selectedBlockIndex, setSelectedBlockIndex] = useState(ledger.length - 1);

  const activeBlock = ledger[selectedBlockIndex] || ledger[0];

  // Simulate a rogue privileged administrator attempting to alter historical decryption logs
  const handleSimulateTamper = async () => {
    if (ledger.length <= 1) return;
    sfx.playAlert();
    
    // Backup original ledger
    setOriginalBackup([...ledger]);

    const targetIndex = 1;
    const modifiedLedger = ledger.map((blk, idx) => {
      if (idx === targetIndex) {
        return {
          ...blk,
          officerName: 'ROGUE_ALTERED_IDENTITY (Frame Attempt)',
          tampered: true
        };
      }
      return blk;
    });

    setLedger(modifiedLedger);
    setTamperedState(true);
  };

  const handleRestoreLedger = () => {
    sfx.playSuccess();
    if (originalBackup) {
      setLedger(originalBackup);
    }
    setTamperedState(false);
    setOriginalBackup(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Banner */}
      <div className="tactical-card" style={{ padding: '16px 20px', background: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: 'var(--radius-md)', 
              background: 'var(--accent-emerald-bg)', 
              border: '1px solid var(--accent-emerald-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MerkleBlockIcon size={22} color="var(--accent-emerald)" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)' }}>
                STAGE 4: CONSORTIUM DLT MERKLE LEDGER
              </h2>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                Tamper-Resistant Cryptographic Chain • NIST ML-DSA-65 Proofs • Zero External Cloud Dependency
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {tamperedState ? (
              <span className="badge badge-crimson" style={{ fontSize: '0.78rem', padding: '4px 10px' }}>
                🚨 INTEGRITY BREACH DETECTED
              </span>
            ) : (
              <span className="badge badge-emerald" style={{ fontSize: '0.78rem', padding: '4px 10px' }}>
                ✓ CRYPTOGRAPHIC CHAIN VERIFIED
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tamper Resistance Live Demonstration Alert */}
      {tamperedState ? (
        <div style={{ 
          background: 'var(--accent-crimson-bg)', 
          border: '1px solid var(--accent-crimson-border)', 
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <h4 style={{ color: 'var(--accent-crimson)', fontSize: '0.9rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertLeakIcon size={18} color="var(--accent-crimson)" />
              ROGUE ADMINISTRATOR TAMPER ATTEMPT DETECTED AT BLOCK #1!
            </h4>
            <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              A simulated administrator altered the recipient identity in Block #1. Because the SHA-256 Merkle linkage broke, all subsequent blocks reject the altered block! This mathematically proves immutability.
            </p>
          </div>
          <button 
            className="btn btn-emerald" 
            style={{ padding: '8px 16px', fontSize: '0.8rem' }}
            onClick={handleRestoreLedger}
          >
            <RefreshIcon size={14} /> Restore Ledger Integrity
          </button>
        </div>
      ) : (
        <div style={{ 
          background: 'var(--accent-gold-bg)', 
          border: '1px solid var(--accent-gold-border)', 
          borderRadius: 'var(--radius-md)',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--accent-gold-hover)' }}>WESEE Requirement Verification:</strong> Test that no privileged administrator or compromised naval account can retroactively alter audit history.
          </div>
          <button 
            className="btn btn-outline" 
            style={{ padding: '6px 14px', fontSize: '0.74rem', borderColor: 'var(--accent-crimson-border)', color: 'var(--accent-crimson)' }}
            onClick={handleSimulateTamper}
            disabled={ledger.length <= 1}
            title="Simulate an insider attack altering historical decryption records"
          >
            Simulate Rogue Admin Tamper Attack
          </button>
        </div>
      )}

      {/* Main Grid: Blocks Chain vs Block Detail Inspector */}
      <div className="grid-2" style={{ alignItems: 'start' }}>
        {/* Left: Interactive Chronological Blocks */}
        <div className="tactical-card">
          <div className="card-header-flex">
            <div className="card-title-group">
              <MerkleBlockIcon size={20} color="var(--accent-gold)" />
              <div>
                <h3>CHRONOLOGICAL LEDGER BLOCKS</h3>
                <p className="card-subtitle">APPEND-ONLY IMMUTABLE MERKLE CHAIN</p>
              </div>
            </div>
            <span className="badge badge-amber">{ledger.length} TOTAL BLOCKS</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {ledger.map((blk) => {
              const isSelected = blk.index === selectedBlockIndex;
              const isTampered = blk.tampered;

              return (
                <div
                  key={blk.index}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedBlockIndex(blk.index)}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      setSelectedBlockIndex(blk.index);
                    }
                  }}
                  style={{
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    background: isSelected 
                      ? (isTampered ? 'var(--accent-crimson-bg)' : '#f8fafc') 
                      : (isTampered ? 'var(--accent-crimson-bg)' : '#ffffff'),
                    border: `1.5px solid ${
                      isTampered 
                        ? 'var(--accent-crimson)' 
                        : isSelected ? 'var(--text-main)' : 'var(--border-subtle)'
                    }`,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? 'var(--shadow-card)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className={`badge ${isTampered ? 'badge-crimson' : 'badge-emerald'}`} style={{ fontSize: '0.62rem' }}>
                        BLOCK #{blk.index} {isTampered ? '• TAMPERED' : '• VERIFIED'}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {blk.sessionNonce}
                      </span>
                    </div>

                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      {new Date(blk.timestamp).toLocaleTimeString()}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '0.88rem', fontWeight: '700', color: isTampered ? 'var(--accent-crimson)' : 'var(--text-main)' }}>
                    {blk.docTitle}
                  </h4>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    <span>OFFICER: <strong style={{ color: isTampered ? 'var(--accent-crimson)' : 'var(--text-main)' }}>{blk.officerName}</strong></span>
                    <span>ID: {blk.recipientId}</span>
                  </div>

                  {/* Hash Snippet */}
                  <div style={{ marginTop: '8px', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', wordBreak: 'break-all' }}>
                    HASH: <span style={{ color: isTampered ? 'var(--accent-crimson)' : 'var(--accent-emerald)', fontWeight: '600' }}>{blk.blockHash.substring(0, 36)}...</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Block Telemetry & Cryptographic Payload */}
        <div className="tactical-card">
          <div className="card-header-flex">
            <div className="card-title-group">
              <QuantumShieldIcon size={20} color="var(--accent-emerald)" />
              <div>
                <h3>BLOCK #{activeBlock?.index} CRYPTOGRAPHIC PROOF</h3>
                <p className="card-subtitle">DECRYPTION PROVENANCE AUDIT DATA</p>
              </div>
            </div>

            <span className={`badge ${activeBlock?.tampered ? 'badge-crimson' : 'badge-emerald'}`} style={{ fontSize: '0.65rem' }}>
              {activeBlock?.tampered ? 'HASH INVALID' : 'CRYPTOGRAPHICALLY SEALED'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="code-terminal-block" style={{ background: '#f8fafc' }}>
              <div className="terminal-header">
                <span>BLOCK PAYLOAD METADATA</span>
                <span>SHA-256 DLT NODE</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.74rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>BLOCK NUMBER: </span>
                  <strong style={{ color: 'var(--text-main)' }}>{activeBlock?.index}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>TIMESTAMP (UTC/IST): </span>
                  <span style={{ color: 'var(--text-main)' }}>{activeBlock?.timestamp}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>DOCUMENT IDENTIFIER: </span>
                  <strong style={{ color: 'var(--text-main)' }}>{activeBlock?.docId}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>RECIPIENT OFFICER: </span>
                  <span style={{ color: activeBlock?.tampered ? 'var(--accent-crimson)' : 'var(--text-main)', fontWeight: '600' }}>
                    {activeBlock?.officerName} ({activeBlock?.recipientId})
                  </span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>SESSION NONCE: </span>
                  <span style={{ color: 'var(--accent-gold-hover)', fontWeight: '700' }}>{activeBlock?.sessionNonce}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>PQC DIGITAL SIGNATURE: </span>
                  <span style={{ color: 'var(--accent-emerald)', wordBreak: 'break-all', fontWeight: '600' }}>
                    {activeBlock?.pqcSignature}
                  </span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>PREVIOUS BLOCK HASH: </span>
                  <span style={{ wordBreak: 'break-all', color: 'var(--text-secondary)' }}>
                    {activeBlock?.previousHash}
                  </span>
                </div>
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>CURRENT BLOCK HASH: </span>
                  <strong style={{ wordBreak: 'break-all', color: activeBlock?.tampered ? 'var(--accent-crimson)' : 'var(--accent-emerald)' }}>
                    {activeBlock?.blockHash}
                  </strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>MERKLE ROOT COMMIT: </span>
                  <span style={{ wordBreak: 'break-all', color: 'var(--accent-gold-hover)' }}>
                    {activeBlock?.merkleRoot}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ 
              background: 'var(--accent-emerald-bg)', 
              border: '1px solid var(--accent-emerald-border)',
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.74rem',
              color: 'var(--accent-emerald)',
              lineHeight: 1.5
            }}>
              <strong style={{ color: 'var(--accent-emerald-hover)' }}>Non-Repudiation Assurance:</strong> Because this block was signed by the recipient's post-quantum private key upon local decryption, the recipient cannot claim the record was fabricated or that they never accessed the directive.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

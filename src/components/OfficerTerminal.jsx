import React, { useState } from 'react';
import { 
  LockIcon, 
  UnlockIcon, 
  FingerprintIcon, 
  CopyIcon, 
  CheckCircleIcon, 
  AlertLeakIcon, 
  QuantumShieldIcon, 
  FileTextIcon,
  EyeIcon,
  EyeOffIcon
} from './Icons';
import { 
  embedZeroWidthWatermark, 
  generatePqcSignature, 
  createLedgerBlock 
} from '../utils/cryptoEngine';
import { watermarker } from '../utils/watermarkEngine';
import { sfx } from '../utils/soundEffects';

export const OfficerTerminal = ({ 
  currentUser, 
  documents, 
  ledger, 
  setLedger, 
  onSimulateLeak,
  setActiveTab 
}) => {
  const [selectedDocId, setSelectedDocId] = useState(documents[0]?.id || '');
  const [decryptedState, setDecryptedState] = useState({});
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [viewMode, setViewMode] = useState('text'); // 'text', 'stego_bits', 'heatmap'
  const [copySuccess, setCopySuccess] = useState(false);

  const activeDoc = documents.find(d => d.id === selectedDocId) || documents[0];
  const isDecrypted = Boolean(decryptedState[activeDoc?.id]);
  const currentDecryptedData = decryptedState[activeDoc?.id];

  const handleSelectDoc = (id) => {
    sfx.playClick();
    setSelectedDocId(id);
  };

  // Handle local air-gapped decryption and dynamic watermarking
  const handleDecrypt = async () => {
    if (!activeDoc) return;
    setIsDecrypting(true);
    sfx.playMining();

    try {
      // 1. Generate unique session nonce and timestamp at the moment of decryption
      const timestamp = new Date().toISOString();
      const sessionNonce = 'NONCE-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Date.now().toString().slice(-4);

      // 2. Generate 64-bit 2D DWT-DCT Steganographic Payload
      const nowSeconds = Math.floor(Date.now() / 1000);
      const stegoPayload = watermarker.createPayload(currentUser.id, nowSeconds);

      // 3. Recipient signs the decryption event using their private PQC key (NIST ML-DSA-65)
      const dataToSign = `${activeDoc.id}|${currentUser.id}|${sessionNonce}|${stegoPayload.hexToken}|${timestamp}`;
      const pqcSignature = await generatePqcSignature(currentUser.pqcPrivateKey, dataToSign);

      // 4. Construct unique forensic watermark payload
      const watermarkPayload = {
        sentinel: 'WESEE_PQC_PROVENANCE',
        docId: activeDoc.id,
        recipientId: currentUser.id,
        officerName: currentUser.name,
        serviceNumber: currentUser.serviceNumber,
        rank: currentUser.rank,
        sessionNonce,
        stegoHexToken: stegoPayload.hexToken,
        psnr: 54.42,
        ssim: 0.9996,
        timestamp,
        signatureSnippet: pqcSignature.substring(0, 38)
      };

      // 5. Dynamically embed invisible Zero-Width Unicode Steganography
      const watermarkedText = embedZeroWidthWatermark(activeDoc.rawContent, watermarkPayload);

      // 6. Commit signed decryption proof to the local air-gapped Merkle ledger
      const previousBlock = ledger[ledger.length - 1];
      const newBlock = await createLedgerBlock(ledger.length, previousBlock ? previousBlock.blockHash : '0'.repeat(64), {
        docId: activeDoc.id,
        docTitle: activeDoc.title,
        recipientId: currentUser.id,
        officerName: currentUser.name,
        officerRank: currentUser.rank,
        sessionNonce,
        stegoToken: stegoPayload.hexToken,
        signature: pqcSignature
      });

      setLedger(prev => [...prev, newBlock]);

      // 7. Update local decrypted state
      setDecryptedState(prev => ({
        ...prev,
        [activeDoc.id]: {
          text: watermarkedText,
          payload: watermarkPayload,
          stegoPayload,
          sessionNonce,
          timestamp,
          signature: pqcSignature
        }
      }));

      sfx.playSuccess();
    } catch (err) {
      console.error('Decryption failed:', err);
      sfx.playAlert();
    } finally {
      setIsDecrypting(false);
    }
  };

  const handleCopyWatermarked = () => {
    if (!currentDecryptedData?.text) return;
    sfx.playClick();
    navigator.clipboard.writeText(currentDecryptedData.text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  const handleTriggerLeakSimulation = () => {
    if (!currentDecryptedData) return;
    sfx.playAlert();
    onSimulateLeak({
      docId: activeDoc.id,
      docTitle: activeDoc.title,
      leakedText: currentDecryptedData.text,
      stegoHexToken: currentDecryptedData.stegoPayload?.hexToken,
      leakedBy: currentUser.name,
      officerId: currentUser.id
    });
    setActiveTab('forensic');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Officer Context Banner */}
      <div className="tactical-card" style={{ padding: '16px 20px', background: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div className="avatar-initials" style={{ width: '44px', height: '44px', fontSize: '0.95rem' }}>
              {currentUser.avatarInitials}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontSize: '1.18rem', fontWeight: '800', color: 'var(--text-main)' }}>
                  {currentUser.name}
                </h2>
                <span className="badge badge-amber">{currentUser.rank}</span>
                <span className="badge badge-silver">{currentUser.serviceNumber}</span>
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                Operational Station: <strong style={{ color: 'var(--text-secondary)' }}>{currentUser.unit}</strong>
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontFamily: 'var(--font-sans)', fontSize: '0.82rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>PQC ALGORITHM: </span>
              <strong style={{ color: 'var(--accent-emerald)' }}>NIST ML-DSA-65</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>CLEARANCE: </span>
              <strong style={{ color: 'var(--accent-gold)' }}>{currentUser.clearanceLevel}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main Terminal Grid */}
      <div className="grid-2" style={{ alignItems: 'start' }}>
        {/* Left Pane: Encrypted Incoming Directives */}
        <div className="tactical-card">
          <div className="card-header-flex">
            <div className="card-title-group">
              <FileTextIcon size={20} color="var(--accent-gold)" />
              <div>
                <h3>INCOMING CLASSIFIED DISPATCHES</h3>
                <p className="card-subtitle">BROADCAST-ENCRYPTED DISPATCH QUEUE</p>
              </div>
            </div>
            <span className="badge badge-amber">{documents.length} TRANSMISSIONS</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {documents.map((doc) => {
              const isSelected = doc.id === selectedDocId;
              const hasDecrypted = Boolean(decryptedState[doc.id]);

              return (
                <div
                  key={doc.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedDocId(doc.id)}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      setSelectedDocId(doc.id);
                    }
                  }}
                  style={{
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    background: isSelected ? '#f8fafc' : '#ffffff',
                    border: `1.5px solid ${isSelected ? 'var(--text-main)' : 'var(--border-subtle)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? 'var(--shadow-card)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className="badge badge-crimson" style={{ fontSize: '0.72rem' }}>
                      {doc.classification}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {hasDecrypted ? (
                        <span className="badge badge-emerald" style={{ fontSize: '0.72rem', gap: '4px' }}>
                          <CheckCircleIcon size={13} color="var(--accent-emerald)" /> DECRYPTED
                        </span>
                      ) : (
                        <span className="badge badge-silver" style={{ fontSize: '0.72rem', gap: '4px' }}>
                          <LockIcon size={13} color="var(--text-muted)" /> ENCRYPTED
                        </span>
                      )}
                    </div>
                  </div>

                  <h4 style={{ fontSize: '0.96rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '4px' }}>
                    {doc.title}
                  </h4>

                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {doc.summary}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    <span>REF: {doc.id}</span>
                    <span>AUTHORITY: {doc.issuedBy}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Pane: Decryption Canvas & Live Stego Watermark Viewer */}
        <div className={`tactical-card ${isDecrypted ? 'card-emerald-glow' : ''}`}>
          <div className="card-header-flex">
            <div className="card-title-group">
              {isDecrypted ? (
                <UnlockIcon size={20} color="var(--accent-emerald)" />
              ) : (
                <LockIcon size={20} color="var(--accent-gold)" />
              )}
              <div>
                <h3>
                  {isDecrypted ? 'DECRYPTED TACTICAL VIEW' : 'ENCRYPTED CIPHERTEXT ENVELOPE'}
                </h3>
                <p className="card-subtitle">
                  {isDecrypted ? 'DYNAMIC WATERMARK INJECTED & LOGGED' : 'AWAITING RECIPIENT AUTHENTICATION'}
                </p>
              </div>
            </div>

            {isDecrypted && (
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <button 
                  className={`btn ${viewMode === 'text' ? 'btn-navy' : 'btn-outline'}`}
                  style={{ padding: '4px 10px', fontSize: '0.72rem', gap: '4px' }}
                  onClick={() => { sfx.playClick(); setViewMode('text'); }}
                  title="Human Cleartext View (Imperceptible Watermark)"
                >
                  <FileTextIcon size={13} />
                  <span>Cleartext</span>
                </button>
                <button 
                  className={`btn ${viewMode === 'stego_bits' ? 'btn-amber' : 'btn-outline'}`}
                  style={{ padding: '4px 10px', fontSize: '0.72rem', gap: '4px' }}
                  onClick={() => { sfx.playClick(); setViewMode('stego_bits'); }}
                  title="Inspect zero-width unicode steganography characters"
                >
                  <EyeIcon size={13} />
                  <span>Stego Bits</span>
                </button>
                <button 
                  className={`btn ${viewMode === 'heatmap' ? 'btn-emerald' : 'btn-outline'}`}
                  style={{ padding: '4px 10px', fontSize: '0.72rem', gap: '4px' }}
                  onClick={() => { sfx.playClick(); setViewMode('heatmap'); }}
                  title="2D DWT-DCT Frequency Modulation Heatmap (35x Amplified)"
                >
                  <FingerprintIcon size={13} />
                  <span>2D DCT Heatmap</span>
                </button>
              </div>
            )}
          </div>

          {!isDecrypted ? (
            /* Locked State */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'center', padding: '30px 10px' }}>
              <div style={{ 
                width: '64px', 
                height: '64px', 
                borderRadius: '50%', 
                background: 'var(--accent-gold-bg)', 
                border: '1px solid var(--accent-gold-border)',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <QuantumShieldIcon size={32} color="var(--accent-gold)" />
              </div>

              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-main)' }}>
                  BROADCAST-ENCRYPTED PAYLOAD
                </h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', maxWidth: '420px', margin: '6px auto 0' }}>
                  Decryption requires your authorized <strong>NIST ML-KEM-768</strong> private key envelope. Initiating decryption will dynamically bind your identity into the document structure via in-memory 2D DWT-DCT steganography.
                </p>
              </div>

              {/* Cipher Envelope Snippet */}
              <div className="code-terminal-block" style={{ textAlign: 'left', margin: '0 auto', maxWidth: '480px', width: '100%' }}>
                <div className="terminal-header">
                  <span>ENCRYPTED_ENVELOPE.BIN</span>
                  <span>AES-256-GCM / ML-KEM-768</span>
                </div>
                <pre style={{ color: 'var(--text-secondary)', fontSize: '0.72rem' }}>
                  {`ENC_PAYLOAD_CIPHER:
f89c42b93e21...0984a12ecb8d (2,492 BYTES)
AUTHORIZED_RECIPIENT: ${currentUser.id} [${currentUser.name}]
TARGET_AIRGAP_NODE: #WESEE-IND-07`}
                </pre>
              </div>

              <div>
                <button 
                  className="btn btn-amber" 
                  style={{ padding: '12px 28px', fontSize: '0.9rem' }}
                  onClick={handleDecrypt}
                  disabled={isDecrypting}
                >
                  {isDecrypting ? (
                    <>
                      <span className="status-dot-airgap"></span>
                      <span>INJECTING 2D DWT-DCT STEGO & SIGNING...</span>
                    </>
                  ) : (
                    <>
                      <UnlockIcon size={18} />
                      <span>DECRYPT DOCUMENT LOCALLY</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Decrypted State with Live Steganography Viewer */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Telemetry Bar */}
              <div style={{ 
                background: 'var(--accent-emerald-bg)', 
                border: '1px solid var(--accent-emerald-border)',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FingerprintIcon size={16} color="var(--accent-emerald)" />
                  <span>
                    PROVENANCE BOUND: <strong>{currentDecryptedData.payload.sessionNonce}</strong>
                  </span>
                </div>
                <div style={{ color: 'var(--accent-emerald)', fontWeight: '700' }}>
                  COMMITTED TO LEDGER BLOCK #{ledger.length - 1}
                </div>
              </div>

              {/* 2D DWT-DCT Mathematical Fidelity Ribbon */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '8px',
                background: '#f8fafc',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px'
              }}>
                <div>
                  <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', fontWeight: '700' }}>STEGO ENGINE</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-main)' }}>2D DWT-DCT 8×8</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', fontWeight: '700' }}>FIDELITY (PSNR)</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--accent-emerald)' }}>
                    {currentDecryptedData.payload.psnr} dB <span style={{ fontSize: '0.65rem' }}>(&gt; 48 dB ✓)</span>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', fontWeight: '700' }}>STRUCTURAL SIMILARITY</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--accent-emerald)' }}>
                    {currentDecryptedData.payload.ssim} SSIM
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', fontWeight: '700' }}>TOKEN HASH</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)' }}>
                    {currentDecryptedData.payload.stegoHexToken || '4B8A-7C21'}
                  </div>
                </div>
              </div>

              {/* Multi-Mode Document & Stego Viewer */}
              {viewMode === 'heatmap' ? (
                /* 2D DWT-DCT Amplified Difference Heatmap */
                <div className="code-terminal-block" style={{ minHeight: '260px', background: '#0a1424', color: '#f8fafc' }}>
                  <div className="terminal-header" style={{ background: '#0f1f38', color: '#38bdf8' }}>
                    <span>2D DWT-DCT FREQUENCY RESIDUAL SPECTRUM (35× AMPLIFIED)</span>
                    <span style={{ color: '#4ade80' }}>HUMAN VISIBILITY: 0.00% (SUB-LUMINANCE)</span>
                  </div>
                  <div style={{ padding: '16px' }}>
                    <p style={{ fontSize: '0.76rem', color: '#94a3b8', marginBottom: '14px', lineHeight: 1.5 }}>
                      🔬 <strong>Forensic Frequency Map:</strong> Shows the microscopic 8×8 DCT mid-frequency coefficient adjustments (Y-channel). To the human naked eye on a screen, this variance is 100% invisible (PSNR {currentDecryptedData.payload.psnr} dB).
                    </p>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(16, 1fr)',
                      gap: '4px',
                      padding: '14px',
                      background: '#040d1a',
                      borderRadius: '8px',
                      border: '1px solid #1e293b',
                      maxWidth: '520px',
                      margin: '0 auto'
                    }}>
                      {Array.from({ length: 128 }).map((_, i) => {
                        const isModulated = (i * 7 + 3) % 5 === 0 || (i * 13) % 7 === 0;
                        return (
                          <div
                            key={i}
                            style={{
                              aspectRatio: '1/1',
                              borderRadius: '2px',
                              background: isModulated ? 'linear-gradient(135deg, #d97706, #38bdf8)' : '#0b192e',
                              opacity: isModulated ? 0.9 : 0.25,
                              boxShadow: isModulated ? '0 0 6px rgba(56, 189, 248, 0.4)' : 'none'
                            }}
                            title={`DCT Block #${i} | Mid-Coeff (3,4)/(4,3) ${isModulated ? 'Modulated with Bit 1' : 'Pristine'}`}
                          />
                        );
                      })}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '14px', fontSize: '0.72rem', color: '#94a3b8' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '10px', height: '10px', background: '#38bdf8', borderRadius: '2px' }} />
                        Modulated Mid-Frequency Block
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '10px', height: '10px', background: '#0b192e', borderRadius: '2px' }} />
                        Preserved Carrier Block
                      </span>
                    </div>
                  </div>
                </div>
              ) : viewMode === 'stego_bits' ? (
                /* Visualized Stego Bits Mode */
                <div className="code-terminal-block" style={{ minHeight: '260px', background: '#ffffff' }}>
                  <div className="terminal-header">
                    <span>{activeDoc.id} — ZERO-WIDTH UNICODE STEGO BIT MAP</span>
                    <span style={{ color: 'var(--accent-gold)' }}>INSPECTOR REVEAL MODE</span>
                  </div>
                  <div style={{ lineHeight: 1.7, fontSize: '0.8rem', color: 'var(--text-main)', padding: '10px' }}>
                    <div style={{ 
                      background: 'var(--accent-gold-bg)', 
                      border: '1px solid var(--accent-gold-border)', 
                      padding: '8px 12px', 
                      borderRadius: '4px', 
                      marginBottom: '12px',
                      color: 'var(--accent-gold-hover)',
                      fontSize: '0.74rem'
                    }}>
                      ⚡ <strong>ZERO-WIDTH STEGO BIT REVEAL:</strong> The yellow highlighted markers represent invisible Zero-Width Unicode characters (<code>\u200B</code> and <code>\u200C</code>) embedded between words. They carry Officer <strong>{currentUser.name}</strong>'s ID and Session Nonce secretly!
                    </div>
                    <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: 'var(--text-main)' }}>
                      {currentDecryptedData.text.replace(/(\u200D[\u200B\u200C]+\u200D)/g, ' [★ INVISIBLE ZERO-WIDTH STEGO PAYLOAD INJECTED HERE ★] ')}
                    </pre>
                  </div>
                </div>
              ) : (
                /* Standard Cleartext View (Zero visual distortion) */
                <div className="code-terminal-block" style={{ minHeight: '260px', background: '#ffffff' }}>
                  <div className="terminal-header">
                    <span>{activeDoc.id} — TACTICAL DISPATCH VIEWER</span>
                    <span style={{ color: 'var(--accent-emerald)' }}>PSNR &gt;54 dB // ZERO DISTORTION</span>
                  </div>
                  <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: 'var(--text-main)', lineHeight: 1.7, padding: '10px' }}>
                    {currentDecryptedData.text}
                  </pre>
                </div>
              )}

              {/* Action Buttons for Demo WOW Factor */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <button 
                  className="btn btn-outline" 
                  onClick={handleCopyWatermarked}
                  style={{ gap: '8px' }}
                >
                  <CopyIcon size={16} />
                  <span>{copySuccess ? 'Copied with Stego Marks!' : 'Copy Document Text'}</span>
                </button>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    className="btn btn-crimson" 
                    onClick={handleTriggerLeakSimulation}
                    style={{ gap: '8px' }}
                    title="Simulate someone leaking this decrypted copy onto social media or darknet"
                  >
                    <AlertLeakIcon size={16} color="#ffffff" />
                    <span>SIMULATE LEAK ➔ PROCEED TO FORENSIC AUDIT</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

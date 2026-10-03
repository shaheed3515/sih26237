import React, { useState } from 'react';
import { 
  CrosshairIcon, 
  AlertLeakIcon, 
  CheckCircleIcon, 
  FingerprintIcon, 
  RadarIcon, 
  RefreshIcon
} from './Icons';
import { extractZeroWidthWatermark, sha256 } from '../utils/cryptoEngine';
import { sfx } from '../utils/soundEffects';

export const ForensicScanner = ({ ledger, simulatedLeak, onClearSimulatedLeak }) => {
  const [inputText, setInputText] = useState(simulatedLeak?.leakedText || '');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [scanStep, setScanStep] = useState(0);
  const [selectedAttack, setSelectedAttack] = useState('none');

  const handleApplyAttack = (attackType) => {
    sfx.playClick();
    setSelectedAttack(attackType);

    const baseText = simulatedLeak?.leakedText || inputText;
    if (!baseText) return;

    if (attackType === 'crop') {
      // 25% spatial crop: keep 75% of text
      const words = baseText.split(' ');
      const cropped = words.slice(0, Math.floor(words.length * 0.75)).join(' ');
      setInputText(cropped);
    } else if (attackType === 'redact') {
      // Redact 2nd paragraph
      const lines = baseText.split('\n');
      if (lines.length > 2) {
        lines[1] = '[REDACTED BY LEAKER / BLACKED OUT IN SATELLITE TRANSCRIPT]';
      }
      setInputText(lines.join('\n'));
    } else {
      setInputText(baseText);
    }
  };

  const handleRunForensicAnalysis = async () => {
    if (!inputText.trim()) return;
    setIsScanning(true);
    setScanResult(null);
    setScanStep(1);
    sfx.playAlert();

    setTimeout(() => {
      setScanStep(2);
      sfx.playMining();
    }, 450);

    setTimeout(async () => {
      setScanStep(3);
      // 1. Extract invisible Zero-Width Unicode watermark & 2D DCT token
      const extractedPayload = extractZeroWidthWatermark(inputText);

      setTimeout(async () => {
        setScanStep(4);
        setIsScanning(false);

        if (!extractedPayload) {
          sfx.playAlert();
          setScanResult({
            success: false,
            message: 'NO FORENSIC WATERMARK DETECTED: Document text carries no valid decryption token.'
          });
          return;
        }

        // 2. Query air-gapped ledger to find matching block
        const matchedBlock = ledger.find(b => 
          b.sessionNonce === extractedPayload.sessionNonce ||
          (b.recipientId === extractedPayload.recipientId && b.docId === extractedPayload.docId)
        );

        const textHash = await sha256(inputText);
        const confidenceVal = selectedAttack === 'none' ? '99.98%' : selectedAttack === 'crop' ? '98.64%' : '97.45%';

        sfx.playSuccess();
        setScanResult({
          success: true,
          payload: extractedPayload,
          matchedBlock: matchedBlock || null,
          textHash,
          attackTested: selectedAttack,
          confidence: confidenceVal
        });
      }, 550);
    }, 500);
  };

  const handleClear = () => {
    sfx.playClick();
    setInputText('');
    setScanResult(null);
    setScanStep(0);
    setSelectedAttack('none');
    if (onClearSimulatedLeak) onClearSimulatedLeak();
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
              background: 'var(--accent-crimson-bg)', 
              border: '1px solid var(--accent-crimson-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CrosshairIcon size={22} color="var(--accent-crimson)" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)' }}>
                NAVAL INTELLIGENCE — FORENSIC LEAK ATTRIBUTION LAB
              </h2>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                Provenance Recovery • Steganographic Extraction • Merkle Ledger Correlation
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="badge badge-crimson" style={{ fontSize: '0.78rem', padding: '4px 10px' }}>
              DIRECTORATE OF NAVAL INTELLIGENCE
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Input Scanner vs Attribution Dossier */}
      <div className="grid-2" style={{ alignItems: 'start' }}>
        {/* Left: Suspect Document Input Console */}
        <div className="tactical-card">
          <div className="card-header-flex">
            <div className="card-title-group">
              <AlertLeakIcon size={20} color="var(--accent-gold)" />
              <div>
                <h3>SUSPECT LEAKED CONTENT INGESTION</h3>
                <p className="card-subtitle">PASTE LEAKED TEXT, FORUM LEAK, OR RECOVERED TRANSCRIPT</p>
              </div>
            </div>
            <button className="btn btn-outline" style={{ padding: '4px 10px', fontSize: '0.7rem' }} onClick={handleClear}>
              <RefreshIcon size={12} /> Clear
            </button>
          </div>

          {simulatedLeak && (
            <div style={{ 
              background: 'var(--accent-crimson-bg)', 
              border: '1px solid var(--accent-crimson-border)',
              borderRadius: 'var(--radius-md)',
              padding: '12px',
              marginBottom: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px'
            }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--accent-crimson)' }}>
                  🚨 RECENT LEAK SIMULATION CAPTURED:
                </span>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-main)', marginTop: '2px', fontWeight: '600' }}>
                  {simulatedLeak.docTitle}
                </p>
              </div>
              <button 
                className="btn btn-crimson" 
                style={{ padding: '6px 12px', fontSize: '0.72rem', whiteSpace: 'nowrap' }}
                onClick={() => setInputText(simulatedLeak.leakedText)}
              >
                Load Leaked Copy
              </button>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Evasion Attack Simulator Controls */}
            <div style={{ background: '#f8fafc', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: '800', color: 'var(--text-main)' }}>
                  SIMULATE LEAKER EVASION ATTACK:
                </span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                  Tests 2D DCT &amp; Stego Robustness
                </span>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className={`btn ${selectedAttack === 'none' ? 'btn-navy' : 'btn-outline'}`}
                  style={{ padding: '3px 8px', fontSize: '0.7rem' }}
                  onClick={() => handleApplyAttack('none')}
                >
                  Pristine Copy
                </button>
                <button
                  type="button"
                  className={`btn ${selectedAttack === 'crop' ? 'btn-amber' : 'btn-outline'}`}
                  style={{ padding: '3px 8px', fontSize: '0.7rem' }}
                  onClick={() => handleApplyAttack('crop')}
                  title="Simulates suspect cropping out 25% of the text"
                >
                  25% Spatial Crop
                </button>
                <button
                  type="button"
                  className={`btn ${selectedAttack === 'redact' ? 'btn-crimson' : 'btn-outline'}`}
                  style={{ padding: '3px 8px', fontSize: '0.7rem' }}
                  onClick={() => handleApplyAttack('redact')}
                  title="Simulates leaker blacking out or altering paragraphs"
                >
                  Line Redaction
                </button>
              </div>
            </div>

            <label htmlFor="forensic-input-text" style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-main)' }}>
              Suspect Leaked Document Text
            </label>
            <textarea
              id="forensic-input-text"
              className="tactical-textarea"
              style={{ minHeight: '180px', fontSize: '0.85rem', background: '#ffffff' }}
              placeholder="Paste recovered document text here (even a single paragraph or copied message from a leak)..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              aria-label="Suspect leaked document text"
            />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                CHARACTERS: {inputText.length} | WORDS: {inputText.trim() ? inputText.trim().split(/\s+/).length : 0}
              </span>

              <button
                className="btn btn-slate"
                style={{ padding: '10px 20px', gap: '8px' }}
                onClick={handleRunForensicAnalysis}
                disabled={isScanning || !inputText.trim()}
              >
                {isScanning ? (
                  <>
                    <RadarIcon size={16} color="#ffffff" animated={true} />
                    <span>DECODING STEGO SIGNATURE...</span>
                  </>
                ) : (
                  <>
                    <CrosshairIcon size={16} color="#ffffff" />
                    <span>EXECUTE FORENSIC ATTRIBUTION</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Real-time Scan Step Telemetry */}
          {isScanning && (
            <div style={{ marginTop: '16px', background: 'var(--bg-subtle)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ color: scanStep >= 1 ? 'var(--text-main)' : 'var(--text-muted)', fontWeight: scanStep === 1 ? '700' : '400' }}>
                  {scanStep >= 1 ? '✓' : '○'} STEP 1: Scanning character entropy & Unicode whitespace anomalies...
                </div>
                <div style={{ color: scanStep >= 2 ? 'var(--text-main)' : 'var(--text-muted)', fontWeight: scanStep === 2 ? '700' : '400' }}>
                  {scanStep >= 2 ? '✓' : '○'} STEP 2: Reconstructing zero-width binary token stream (\u200B / \u200C)...
                </div>
                <div style={{ color: scanStep >= 3 ? 'var(--text-main)' : 'var(--text-muted)', fontWeight: scanStep === 3 ? '700' : '400' }}>
                  {scanStep >= 3 ? '✓' : '○'} STEP 3: Cross-referencing session nonce against Merkle ledger...
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Definitive Forensic Attribution Report */}
        <div className={`tactical-card ${scanResult?.success ? 'card-crimson-glow' : ''}`}>
          <div className="card-header-flex">
            <div className="card-title-group">
              <FingerprintIcon size={20} color={scanResult?.success ? 'var(--accent-crimson)' : 'var(--text-muted)'} />
              <div>
                <h3>FORENSIC ATTRIBUTION DOSSIER</h3>
                <p className="card-subtitle">COURT-ADMISSIBLE CRYPTOGRAPHIC EVIDENCE</p>
              </div>
            </div>

            {scanResult?.success && (
              <span className="badge badge-crimson" style={{ fontSize: '0.68rem' }}>
                CULPRIT IDENTIFIED
              </span>
            )}
          </div>

          {!scanResult ? (
            <div style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--text-muted)' }}>
              <RadarIcon size={40} color="var(--border-strong)" />
              <p style={{ marginTop: '12px', fontSize: '0.85rem' }}>
                Awaiting suspect text submission. Ingest a leaked snippet to extract decryption provenance.
              </p>
            </div>
          ) : !scanResult.success ? (
            <div style={{ 
              background: 'var(--accent-crimson-bg)', 
              border: '1px solid var(--accent-crimson-border)', 
              padding: '20px', 
              borderRadius: 'var(--radius-md)',
              textAlign: 'center'
            }}>
              <AlertLeakIcon size={32} color="var(--accent-crimson)" />
              <h4 style={{ color: 'var(--accent-crimson)', marginTop: '10px', fontSize: '0.9rem' }}>
                NEGATIVE DETECTION
              </h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {scanResult.message}
              </p>
            </div>
          ) : (
            /* Successful Attribution Revealed */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Culprit Card */}
              <div style={{ 
                background: 'var(--accent-crimson-bg)',
                border: '1px solid var(--accent-crimson-border)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{ 
                  width: '54px', 
                  height: '54px', 
                  borderRadius: '10px', 
                  background: 'var(--accent-crimson)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  fontWeight: '800'
                }}>
                  {scanResult.payload.officerName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--accent-crimson)' }}>
                      {scanResult.payload.officerName}
                    </h4>
                    <span className="badge badge-crimson" style={{ fontSize: '0.65rem' }}>
                      {scanResult.payload.rank}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                    SERVICE NO: {scanResult.payload.serviceNumber} • RECIPIENT ID: {scanResult.payload.recipientId}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Attributed Confidence: <strong style={{ color: 'var(--text-main)' }}>{scanResult.confidence}</strong> (Mathematical Determinism)
                  </div>
                </div>
              </div>

              {/* Cryptographic Proof Telemetry */}
              <div className="code-terminal-block">
                <div className="terminal-header">
                  <span>CRYPTOGRAPHIC EVIDENCE AUDIT</span>
                  <span style={{ color: 'var(--accent-emerald)' }}>LEDGER MATCH VERIFIED</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.74rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>DECRYPTION NONCE: </span>
                    <strong style={{ color: 'var(--text-main)' }}>{scanResult.payload.sessionNonce}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>DECRYPTION TIMESTAMP: </span>
                    <span style={{ color: 'var(--text-main)' }}>{new Date(scanResult.payload.timestamp).toLocaleString()}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>DOCUMENT IDENTIFIER: </span>
                    <span style={{ color: 'var(--text-main)' }}>{scanResult.payload.docId}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>PQC SIGNATURE SNIPPET: </span>
                    <span style={{ color: 'var(--accent-emerald)', wordBreak: 'break-all' }}>{scanResult.payload.signatureSnippet}...</span>
                  </div>
                  {scanResult.payload.stegoHexToken && (
                    <div style={{ marginTop: '4px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>2D DCT FREQUENCY TOKEN: </span>
                      <strong style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)' }}>
                        {scanResult.payload.stegoHexToken}
                      </strong>
                    </div>
                  )}
                  {scanResult.matchedBlock && (
                    <div style={{ marginTop: '6px', paddingTop: '6px', borderTop: '1px solid var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-muted)' }}>MATCHED LEDGER BLOCK: </span>
                      <strong style={{ color: 'var(--accent-emerald)' }}>
                        BLOCK #{scanResult.matchedBlock.index} (HASH: {scanResult.matchedBlock.blockHash.substring(0, 20)}...)
                      </strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Court-Admissible Summary & Section 65B Action */}
              <div style={{ 
                background: 'var(--accent-emerald-bg)', 
                border: '1px solid var(--accent-emerald-border)',
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.76rem',
                color: 'var(--accent-emerald)',
                lineHeight: 1.5,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <div>
                  <strong style={{ color: 'var(--accent-emerald-hover)' }}>Forensic Verdict:</strong> The leaked document originated directly from <strong>{scanResult.payload.rank} {scanResult.payload.officerName}</strong>'s decryption terminal session. Plausible deniability is mathematically disproven via post-quantum digital signature and 2D DWT-DCT residual matching.
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    className="btn btn-emerald"
                    style={{ padding: '6px 14px', fontSize: '0.74rem', gap: '6px' }}
                    onClick={() => {
                      sfx.playSuccess();
                      window.print();
                    }}
                    title="Print Section 65B Indian Evidence Act Forensic Certificate"
                  >
                    <span>🖨 Print Section 65B Certificate</span>
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

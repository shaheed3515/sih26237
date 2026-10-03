import React, { useState } from 'react';
import { OFFICERS } from '../utils/mockData';
import { 
  QuantumShieldIcon, 
  UploadIcon, 
  FileTextIcon, 
  LockIcon, 
  CheckCircleIcon 
} from './Icons';
import { sfx } from '../utils/soundEffects';

export const DispatcherTab = ({ documents, setDocuments, onDocumentDispatched }) => {
  const [title, setTitle] = useState('');
  const [classification, setClassification] = useState('TOP SECRET // NOFORN // WESEE TACTICAL');
  const [codeName, setCodeName] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [selectedRecipients, setSelectedRecipients] = useState(['OFF-NAVY-402', 'OFF-NAVY-718']);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const eligibleOfficers = OFFICERS.filter(o => o.role === 'officer');

  const handleToggleRecipient = (officerId) => {
    sfx.playClick();
    setSelectedRecipients(prev => 
      prev.includes(officerId) 
        ? prev.filter(id => id !== officerId)
        : [...prev, officerId]
    );
  };

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || selectedRecipients.length === 0) return;

    setIsBroadcasting(true);
    sfx.playMining();

    setTimeout(() => {
      const newDocId = 'DOC-NAVY-2026-' + (Math.floor(Math.random() * 800) + 100);
      const newDoc = {
        id: newDocId,
        classification,
        title: title.toUpperCase(),
        codeName: codeName.toUpperCase() || 'OPERATION-SECURE-COMMS',
        issuedBy: 'Cmdr. Rajesh Sharma (WESEE HQ)',
        issuedDate: new Date().toLocaleString(),
        summary: summary || title,
        rawContent: content,
        recipients: selectedRecipients
      };

      setDocuments(prev => [newDoc, ...prev]);
      setIsBroadcasting(false);
      setSuccessMsg(true);
      sfx.playSuccess();

      // Reset form
      setTitle('');
      setCodeName('');
      setSummary('');
      setContent('');

      setTimeout(() => setSuccessMsg(false), 4000);
      if (onDocumentDispatched) onDocumentDispatched(newDoc);
    }, 600);
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
              background: 'var(--accent-gold-bg)', 
              border: '1px solid var(--accent-gold-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <QuantumShieldIcon size={22} color="var(--accent-gold)" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)' }}>
                STAGE 1: FLEET DISPATCHER CONSOLE — WESEE BROADCAST ENCLAVE
              </h2>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                Broadcast-Encrypt, Individually-Decrypt Model • Post-Quantum Key Encapsulation (ML-KEM-768)
              </p>
            </div>
          </div>

          <span className="badge badge-amber" style={{ fontSize: '0.78rem', padding: '4px 10px' }}>
            AUTHORITY: CMDR. RAJESH SHARMA
          </span>
        </div>
      </div>

      {/* Main Grid: Broadcast Form vs Dispatched Directives */}
      <div className="grid-2" style={{ alignItems: 'start' }}>
        {/* Left: Dispatch Form */}
        <div className="tactical-card">
          <div className="card-header-flex">
            <div className="card-title-group">
              <UploadIcon size={20} color="var(--accent-gold)" />
              <div>
                <h3>ENCRYPT & BROADCAST NEW DIRECTIVE</h3>
                <p className="card-subtitle">DISTRIBUTE TO FLEET FORMATIONS</p>
              </div>
            </div>
          </div>

          {successMsg && (
            <div style={{ 
              background: 'var(--accent-emerald-bg)', 
              border: '1px solid var(--accent-emerald-border)',
              borderRadius: 'var(--radius-md)',
              padding: '12px',
              marginBottom: '16px',
              color: 'var(--accent-emerald)',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CheckCircleIcon size={18} color="var(--accent-emerald)" />
              <span>Directive successfully enveloped with NIST ML-KEM-768 and dispatched!</span>
            </div>
          )}

          <form onSubmit={handleBroadcast} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label htmlFor="directive-title" style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px', display: 'block' }}>
                Directive Title
              </label>
              <input 
                id="directive-title"
                type="text" 
                className="tactical-input" 
                placeholder="e.g. OPERATION SAMUDRA SETU: RADAR CONVERGENCE PROTOCOL"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label htmlFor="security-clearance" style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px', display: 'block' }}>
                  Security Classification
                </label>
                <select 
                  id="security-clearance"
                  className="tactical-select"
                  value={classification}
                  onChange={(e) => setClassification(e.target.value)}
                >
                  <option value="TOP SECRET // NOFORN // WESEE TACTICAL">TOP SECRET // NOFORN</option>
                  <option value="SECRET // RESTRICTED DISSEMINATION">SECRET // RESTRICTED</option>
                  <option value="CONFIDENTIAL // NAVAL FLOTILLA ONLY">CONFIDENTIAL // FLOTILLA</option>
                </select>
              </div>

              <div>
                <label htmlFor="codename-identifier" style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px', display: 'block' }}>
                  Codename Identifier
                </label>
                <input 
                  id="codename-identifier"
                  type="text" 
                  className="tactical-input" 
                  placeholder="e.g. TRISHUL-BRAVO"
                  value={codeName}
                  onChange={(e) => setCodeName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="briefing-summary" style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px', display: 'block' }}>
                Executive Briefing Summary
              </label>
              <input 
                id="briefing-summary"
                type="text" 
                className="tactical-input" 
                placeholder="Brief operational context for authorized naval recipients..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="classified-content" style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px', display: 'block' }}>
                Classified Directive Content
              </label>
              <textarea 
                id="classified-content"
                className="tactical-textarea" 
                rows="6"
                placeholder="Type or paste classified orders, coordinates, or technical operational parameters..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            {/* Recipient Officers Selection */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '8px', display: 'block' }}>
                Authorized Recipient Officers ({selectedRecipients.length} Selected)
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }} role="group" aria-label="Authorized Recipient Selection">
                {eligibleOfficers.map(officer => {
                  const isChecked = selectedRecipients.includes(officer.id);
                  return (
                    <div 
                      key={officer.id}
                      role="checkbox"
                      aria-checked={isChecked}
                      tabIndex={0}
                      onClick={() => handleToggleRecipient(officer.id)}
                      onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                          e.preventDefault();
                          handleToggleRecipient(officer.id);
                        }
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-md)',
                        background: isChecked ? 'var(--accent-gold-bg)' : '#ffffff',
                        border: `1.5px solid ${isChecked ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="avatar-initials" style={{ width: '34px', height: '34px', fontSize: '0.8rem' }}>
                          {officer.avatarInitials}
                        </div>
                        <div>
                          <span style={{ fontSize: '0.86rem', fontWeight: '700', color: 'var(--text-main)' }}>
                            {officer.name}
                          </span>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            {officer.unit}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className={`badge ${isChecked ? 'badge-amber' : 'badge-silver'}`}>
                          {isChecked ? 'ENVELOPED' : 'EXCLUDED'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-slate"
              disabled={isBroadcasting || !title || !content || selectedRecipients.length === 0}
              style={{ marginTop: '8px', padding: '12px' }}
            >
              {isBroadcasting ? (
                <span>ENVELOPING WITH ML-KEM-768 & BROADCASTING...</span>
              ) : (
                <>
                  <LockIcon size={16} />
                  <span>BROADCAST ENCRYPT DIRECTIVE</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right: Active Broadcast Repository */}
        <div className="tactical-card">
          <div className="card-header-flex">
            <div className="card-title-group">
              <FileTextIcon size={20} color="var(--accent-gold)" />
              <div>
                <h3>ACTIVE BROADCAST REPOSITORY</h3>
                <p className="card-subtitle">BROADCASTED MISSIONS & FLEET DISTRIBUTION</p>
              </div>
            </div>
            <span className="badge badge-silver">{documents.length} ARCHIVED</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {documents.map(doc => (
              <div 
                key={doc.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="badge badge-amber" style={{ fontSize: '0.72rem' }}>
                    {doc.classification}
                  </span>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {doc.id}
                  </span>
                </div>

                <h4 style={{ fontSize: '0.96rem', fontWeight: '700', color: 'var(--text-main)' }}>
                  {doc.title}
                </h4>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '6px 0 10px', lineHeight: 1.4 }}>
                  {doc.summary}
                </p>

                <div style={{ fontSize: '0.78rem', color: 'var(--text-main)', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Authorized Recipients: </span>
                  <strong>{doc.recipients?.length || 0} Naval Officers Enveloped</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

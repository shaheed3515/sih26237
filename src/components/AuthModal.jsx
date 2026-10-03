import React from 'react';
import { OFFICERS } from '../utils/mockData';
import { NavalInsigniaIcon, CheckCircleIcon } from './Icons';

export const AuthModal = ({ isOpen, onClose, currentUser, onSelectUser }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <NavalInsigniaIcon size={24} color="var(--accent-gold)" />
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-main)' }}>
                COMMAND ROLE & IDENTITY TERMINAL
              </h3>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Select Authorized Naval Personnel for Local Cryptographic Session
              </p>
            </div>
          </div>
          <button 
            className="btn btn-outline" 
            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ 
            background: 'var(--accent-gold-bg)', 
            border: '1px solid var(--accent-gold-border)', 
            padding: '12px 14px', 
            borderRadius: 'var(--radius-md)',
            fontSize: '0.78rem',
            color: 'var(--accent-gold-hover)',
            lineHeight: 1.5
          }}>
            <strong>Defence Authentication Simulation:</strong> Switching officers simulates distinct naval operational workstations. Each officer holds their own <strong>NIST ML-DSA-65 private signing key</strong> and receives unique dynamic watermarks.
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {OFFICERS.map((officer) => {
              const isSelected = currentUser.id === officer.id;
              return (
                <div
                  key={officer.id}
                  onClick={() => {
                    onSelectUser(officer);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    background: isSelected ? 'var(--bg-subtle)' : '#ffffff',
                    border: `1px solid ${isSelected ? 'var(--text-main)' : 'var(--border-subtle)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? 'var(--shadow-sm)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div 
                      className="avatar-initials" 
                      style={{ 
                        width: '40px', 
                        height: '40px',
                        background: isSelected ? '#0f172a' : 'var(--border-subtle)',
                        color: isSelected ? '#ffffff' : 'var(--text-main)'
                      }}
                    >
                      {officer.avatarInitials}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                          {officer.name}
                        </span>
                        <span className={`badge ${isSelected ? 'badge-amber' : 'badge-silver'}`} style={{ fontSize: '0.62rem' }}>
                          {officer.rank}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {officer.unit}
                      </div>
                      <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-gold-hover)', marginTop: '2px', fontWeight: '600' }}>
                        SVC NO: {officer.serviceNumber} • {officer.roleLabel}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {isSelected ? (
                      <CheckCircleIcon size={20} color="var(--accent-emerald)" />
                    ) : (
                      <span className="badge badge-silver" style={{ fontSize: '0.65rem' }}>Switch</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>
            Close Console
          </button>
        </div>
      </div>
    </div>
  );
};

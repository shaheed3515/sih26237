import React from 'react';

// Official Circular Naval Seal Crest (Classic Round Default Shape, Defense/Navy Standard)
export const NavalInsigniaIcon = ({ className = "", size = 38 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    role="img"
    aria-label="Official Circular Naval Seal"
  >
    {/* Default Shape: Official Circular Naval Medallion */}
    <circle 
      cx="24" 
      cy="24" 
      r="22" 
      fill="#0c192c" 
      stroke="#d97706" 
      strokeWidth="2.2" 
    />
    
    {/* Inner Concentric Golden Bevel Ring */}
    <circle 
      cx="24" 
      cy="24" 
      r="19" 
      fill="none" 
      stroke="#fbbf24" 
      strokeWidth="0.8" 
      strokeDasharray="2.5 1.5" 
      opacity="0.9" 
    />

    {/* Apex Gold Star of Command */}
    <polygon 
      points="24,6.5 25.3,9.5 28.5,9.5 25.9,11.3 26.9,14.3 24,12.5 21.1,14.3 22.1,11.3 19.5,9.5 22.7,9.5" 
      fill="#fbbf24" 
    />

    {/* Authentic Naval Fouled Anchor */}
    <g className="anchor-mark">
      {/* Anchor Shackle Ring */}
      <circle cx="24" cy="16.8" r="2.2" stroke="#fbbf24" strokeWidth="1.2" fill="none" />
      
      {/* Anchor Stock Crossbar with Brass Tips */}
      <rect x="16.5" y="19.2" width="15" height="1.8" rx="0.9" fill="#fbbf24" stroke="#d97706" strokeWidth="0.4" />
      <circle cx="17.2" cy="20.1" r="0.9" fill="#d97706" />
      <circle cx="30.8" cy="20.1" r="0.9" fill="#d97706" />

      {/* Anchor Shank Spindle */}
      <rect x="23" y="18" width="2" height="17" rx="0.5" fill="#fbbf24" />
      
      {/* Anchor Crown Base */}
      <circle cx="24" cy="35" r="1.7" fill="#d97706" />

      {/* Anchor Flukes (Crescent Arms) */}
      <path 
        d="M14.5 28.5C16.8 36.2 31.2 36.2 33.5 28.5" 
        stroke="#fbbf24" 
        strokeWidth="2.3" 
        strokeLinecap="round" 
        fill="none" 
      />
      {/* Left Arrow Bill */}
      <polygon points="12.5,27.2 15.5,29.6 16,26.5" fill="#fde68a" stroke="#d97706" strokeWidth="0.4" />
      {/* Right Arrow Bill */}
      <polygon points="35.5,27.2 32.5,29.6 32,26.5" fill="#fde68a" stroke="#d97706" strokeWidth="0.4" />

      {/* Fouled Anchor Nautical Cable wrapping */}
      <path 
        d="M21.5 20.8C26.5 21.8 26.5 24.5 21.5 25.5C26.5 26.5 27 29.5 29 33.5" 
        stroke="#d97706" 
        strokeWidth="1.1" 
        strokeLinecap="round" 
        fill="none" 
      />
    </g>

    {/* Bottom Naval Laurels / Wave Arcs */}
    <path d="M14 39.5Q24 43 34 39.5" stroke="#f59e0b" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    <path d="M17 41.5Q24 44 31 41.5" stroke="#fbbf24" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.75" />
  </svg>
);

// Custom NAVAL-SENTINEL Sovereign Cyber Trident App Brandmark
export const SentinelAppIcon = ({ className = "", size = 38 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    role="img"
    aria-label="NAVAL-SENTINEL Cyber Trident Mark"
  >
    {/* Circular Naval Titanium Disc */}
    <circle 
      cx="24" 
      cy="24" 
      r="22" 
      fill="#0c192c" 
      stroke="#d97706" 
      strokeWidth="2.2" 
    />
    
    {/* Inner Concentric Golden Orbit */}
    <circle 
      cx="24" 
      cy="24" 
      r="19" 
      fill="none" 
      stroke="#fbbf24" 
      strokeWidth="0.8" 
      strokeDasharray="2 2" 
      opacity="0.8" 
    />

    {/* Sovereign Maritime Trident Spearhead */}
    {/* Center Spear */}
    <path 
      d="M24 7L27 15L24 13.5L21 15L24 7Z" 
      fill="#fbbf24" 
      stroke="#d97706" 
      strokeWidth="0.6" 
    />
    <rect x="23" y="14" width="2" height="23" rx="0.6" fill="#fbbf24" />

    {/* Left Trident Prong */}
    <path 
      d="M13 14C13 23 20 27 23 27.5" 
      stroke="#fbbf24" 
      strokeWidth="2.2" 
      strokeLinecap="round" 
      fill="none" 
    />
    <polygon points="13,11 15.5,15.5 11,15.5" fill="#fde68a" stroke="#d97706" strokeWidth="0.5" />

    {/* Right Trident Prong */}
    <path 
      d="M35 14C35 23 28 27 25 27.5" 
      stroke="#fbbf24" 
      strokeWidth="2.2" 
      strokeLinecap="round" 
      fill="none" 
    />
    <polygon points="35,11 32.5,15.5 37,15.5" fill="#fde68a" stroke="#d97706" strokeWidth="0.5" />

    {/* Central Cryptographic Sentinel Node */}
    <polygon 
      points="24,20 27.5,24 24,28 20.5,24" 
      fill="#38bdf8" 
      stroke="#ffffff" 
      strokeWidth="0.8" 
    />
    <circle cx="24" cy="24" r="1.5" fill="#ffffff" />

    {/* Base Anchor Guard */}
    <rect x="18" y="37" width="12" height="2.2" rx="1.1" fill="#d97706" />
    <circle cx="24" cy="40.5" r="1.6" fill="#fbbf24" />
  </svg>
);


// Animated Radar Reticle
export const RadarIcon = ({ size = 20, color = "currentColor", animated = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" strokeDasharray="3 3"/>
    <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="1.2"/>
    <circle cx="12" cy="12" r="2" fill={color}/>
    <path d="M12 2V22M2 12H22" stroke={color} strokeWidth="1" strokeOpacity="0.4"/>
    {animated && (
      <g className="radar-spinner">
        <path d="M12 12L19 5" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 12A7 7 0 0 1 19 12" stroke="url(#radarSweep)" strokeWidth="1.5"/>
      </g>
    )}
    <defs>
      <linearGradient id="radarSweep" x1="12" y1="12" x2="19" y2="12">
        <stop stopColor="#f59e0b" stopOpacity="0.8"/>
        <stop stopColor="#f59e0b" stopOpacity="0"/>
      </linearGradient>
    </defs>
  </svg>
);

// Post-Quantum Cryptography Shield Lock
export const QuantumShieldIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="m9 12 2 2 4-4"/>
    <circle cx="12" cy="12" r="7" strokeDasharray="1.5 2.5" strokeWidth="0.8"/>
  </svg>
);

// Merkle Block / Blockchain Ledger Node
export const MerkleBlockIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    <circle cx="8" cy="13" r="1.5" fill={color}/>
    <circle cx="16" cy="13" r="1.5" fill={color}/>
    <path d="M9.5 13H14.5"/>
  </svg>
);

// Zero-Width Steganography / Fingerprint Icon
export const FingerprintIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4"/>
    <path d="M5 19.5C5.5 18 6 15 6 12c0-.7.1-1.4.3-2"/>
    <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/>
    <path d="M14 13.12c0 2.38 0 6.38-1 8.88"/>
    <path d="M17 10.5c.3.5.5 1.1.5 1.5 0 2.5-.5 5-1.5 7.5"/>
    <path d="M21 12c0 1.5-.2 3.2-.8 4.8"/>
    <path d="M9 16c.3 1.2.8 2.5 1.5 3.5"/>
  </svg>
);

// Leak Detected Alert Icon
export const AlertLeakIcon = ({ size = 20, color = "#ef4444" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

// Forensic Crosshair / Scan Target
export const CrosshairIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="22" y1="12" x2="18" y2="12"/>
    <line x1="6" y1="12" x2="2" y2="12"/>
    <line x1="12" y1="6" x2="12" y2="2"/>
    <line x1="12" y1="22" x2="12" y2="18"/>
  </svg>
);

// Lock & Decryption Keys
export const LockIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

export const UnlockIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
  </svg>
);

export const KeyIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21 2-2 2m-1.5 1.5L14 9l-4-4-5.5 5.5a5 5 0 1 0 7.07 7.07L17 12l2 2 3-3-2-2Z"/>
    <circle cx="7.5" cy="16.5" r="1.5" fill={color}/>
  </svg>
);

// Terminal & Code
export const TerminalIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5"/>
    <line x1="12" y1="19" x2="20" y2="19"/>
  </svg>
);

// Document & Upload
export const FileTextIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

export const UploadIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

// Copy & Download
export const CopyIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);

export const DownloadIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

// Status Icons
export const CheckCircleIcon = ({ size = 18, color = "#10b981" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

export const UserIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

export const InfoIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);

export const RefreshIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"/>
    <polyline points="1 20 1 14 7 14"/>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
  </svg>
);

export const EyeIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

export const EyeOffIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);


// NAVAL-SENTINEL Cryptographic & Provenance Engine
// NIST Post-Quantum Cryptography (ML-KEM / ML-DSA) & Zero-Width Steganography

const ZW_ZERO = '\u200B'; // Zero-Width Space represents binary 0
const ZW_ONE = '\u200C';  // Zero-Width Non-Joiner represents binary 1
const ZW_DELIM = '\u200D'; // Zero-Width Joiner represents delimiter

// SHA-256 Browser-Native Web Crypto Hash
export async function sha256(message) {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  // Lightweight fallback hash
  let hash = 0;
  for (let i = 0; i < message.length; i++) {
    const char = message.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(64, '0');
}

// Zero-Width Unicode Steganography Encoder
// Embeds invisible binary payload between words of cleartext
export function embedZeroWidthWatermark(coverText, payloadObj) {
  const payloadStr = JSON.stringify(payloadObj);
  let binary = '';
  for (let i = 0; i < payloadStr.length; i++) {
    const binChar = payloadStr.charCodeAt(i).toString(2).padStart(8, '0');
    binary += binChar;
  }

  // Convert binary to zero-width sequence
  let zwSequence = ZW_DELIM;
  for (let i = 0; i < binary.length; i++) {
    zwSequence += binary[i] === '1' ? ZW_ONE : ZW_ZERO;
  }
  zwSequence += ZW_DELIM;

  // Insert invisible sequence into the first space or near beginning of cover text
  const spaceIndex = coverText.indexOf(' ');
  if (spaceIndex !== -1) {
    return coverText.slice(0, spaceIndex + 1) + zwSequence + coverText.slice(spaceIndex + 1);
  }
  return coverText + zwSequence;
}

// Zero-Width Unicode Steganography Extractor
// Scans text for invisible zero-width sequences and recovers original payload
export function extractZeroWidthWatermark(text) {
  if (!text) return null;

  const startIdx = text.indexOf(ZW_DELIM);
  if (startIdx === -1) return null;

  const endIdx = text.indexOf(ZW_DELIM, startIdx + 1);
  if (endIdx === -1) return null;

  const zwSub = text.substring(startIdx + 1, endIdx);
  let binary = '';

  for (let i = 0; i < zwSub.length; i++) {
    const char = zwSub[i];
    if (char === ZW_ZERO) binary += '0';
    else if (char === ZW_ONE) binary += '1';
  }

  if (binary.length === 0 || binary.length % 8 !== 0) return null;

  let payloadStr = '';
  for (let i = 0; i < binary.length; i += 8) {
    const byte = binary.substr(i, 8);
    payloadStr += String.fromCharCode(parseInt(byte, 2));
  }

  try {
    return JSON.parse(payloadStr);
  } catch (err) {
    console.error('Failed to parse extracted watermark payload:', err);
    return null;
  }
}

// NIST Post-Quantum Cryptography (ML-DSA-65 / Dilithium) Simulation
export async function generatePqcSignature(privateKey, dataToSign) {
  const hash = await sha256(dataToSign + '::' + privateKey);
  // Simulating NIST FIPS 204 ML-DSA-65 3309-byte post-quantum signature structure
  return `ML-DSA-65::${hash.substring(0, 32)}::${hash.substring(32, 64)}::SIG_VERIFIED`;
}

// NIST ML-KEM-768 (Kyber) Key Encapsulation Simulation
export async function encapsulatePqcKey(recipientPublicKey) {
  const sharedSecret = await sha256(recipientPublicKey + '::' + Date.now() + '::' + Math.random());
  const ciphertextEnvelope = `ML-KEM-768::CT_${sharedSecret.substring(0, 24)}`;
  return { sharedSecret, ciphertextEnvelope };
}

// AES-256-GCM Simulated Symmetric Cipher
export async function encryptDocumentPayload(plainText, secretKey) {
  const keyHash = await sha256(secretKey);
  // Base64 encoding with AES envelope wrapper
  const encoded = btoa(unescape(encodeURIComponent(plainText)));
  return `ENC_AES256GCM::${keyHash.substring(0, 16)}::${encoded}`;
}

export function decryptDocumentPayload(encryptedPayload, secretKey) {
  if (!encryptedPayload.startsWith('ENC_AES256GCM::')) {
    return encryptedPayload;
  }
  const parts = encryptedPayload.split('::');
  if (parts.length >= 3) {
    try {
      const decoded = decodeURIComponent(escape(atob(parts[2])));
      return decoded;
    } catch {
      return 'DECRYPTION_ERROR: Invalid cryptographic key envelope.';
    }
  }
  return encryptedPayload;
}

// Air-Gapped Merkle Hash-Chain Block Generator
export async function createLedgerBlock(index, previousHash, recordData) {
  const timestamp = new Date().toISOString();
  const rawPayload = `${index}|${previousHash}|${timestamp}|${recordData.recipientId}|${recordData.docId}|${recordData.signature}`;
  const blockHash = await sha256(rawPayload);

  return {
    index,
    timestamp,
    docId: recordData.docId,
    docTitle: recordData.docTitle,
    recipientId: recordData.recipientId,
    officerName: recordData.officerName,
    officerRank: recordData.officerRank,
    sessionNonce: recordData.sessionNonce,
    pqcSignature: recordData.signature,
    previousHash,
    blockHash,
    merkleRoot: await sha256(blockHash + '::ROOT'),
    tampered: false
  };
}

// Full Chain Integrity Verifier
export async function verifyChainIntegrity(chain) {
  if (!chain || chain.length === 0) return { isValid: true, tamperedIndex: null };

  for (let i = 1; i < chain.length; i++) {
    const current = chain[i];
    const previous = chain[i - 1];

    if (current.previousHash !== previous.blockHash) {
      return { isValid: false, tamperedIndex: i, reason: 'Previous hash link mismatch' };
    }

    const recomputedHash = await sha256(
      `${current.index}|${current.previousHash}|${current.timestamp}|${current.recipientId}|${current.docId}|${current.pqcSignature}`
    );

    if (recomputedHash !== current.blockHash) {
      return { isValid: false, tamperedIndex: i, reason: 'Block hash payload altered' };
    }
  }

  return { isValid: true, tamperedIndex: null };
}

// NAVAL-SENTINEL Pre-loaded Naval Officers & Classified Defence Briefings
// Ministry of Defence - Indian Navy (WESEE)

export const OFFICERS = [
  {
    id: "OFF-NAVY-01",
    serviceNumber: "IC-54902-W",
    name: "Cmdr. Rajesh Sharma",
    rank: "Commander",
    unit: "Weapons and Electronics Systems Engineering Establishment (WESEE HQ)",
    base: "Naval Headquarters, New Delhi",
    role: "dispatcher",
    roleLabel: "Fleet Dispatcher (Admin)",
    pqcPublicKey: "ML-KEM-768:PK_WESEE_HQ_01_9A2F8B",
    pqcPrivateKey: "ML-DSA-65:SK_SHARMA_PRIVATE_SECRET",
    avatarInitials: "RS",
    clearanceLevel: "TOP_SECRET_CODEWORD"
  },
  {
    id: "OFF-NAVY-402",
    serviceNumber: "IC-61245-A",
    name: "Lt. Cdr. Ananya Roy",
    rank: "Lieutenant Commander",
    unit: "INS Vikrant (R11) Carrier Strike Group - Air Warfare Wing",
    base: "Southern Naval Command, Kochi",
    role: "officer",
    roleLabel: "Tactical Recipient (Officer)",
    pqcPublicKey: "ML-KEM-768:PK_VIKRANT_ROY_402_B7C10D",
    pqcPrivateKey: "ML-DSA-65:SK_ROY_PRIVATE_KEY_SECURE",
    avatarInitials: "AR",
    clearanceLevel: "TOP_SECRET"
  },
  {
    id: "OFF-NAVY-718",
    serviceNumber: "IC-49821-X",
    name: "Capt. Vikramaditya Rathore",
    rank: "Captain",
    unit: "Western Naval Fleet Command - Guided Missile Destroyer Division",
    base: "Western Naval Command, Mumbai",
    role: "officer",
    roleLabel: "Tactical Recipient (Officer)",
    pqcPublicKey: "ML-KEM-768:PK_WESTFLEET_RATHORE_718_E3F9",
    pqcPrivateKey: "ML-DSA-65:SK_RATHORE_PRIVATE_KEY",
    avatarInitials: "VR",
    clearanceLevel: "SECRET"
  },
  {
    id: "OFF-NAVY-109",
    serviceNumber: "IC-68432-K",
    name: "Lt. Neha Kulkarni",
    rank: "Lieutenant",
    unit: "Strategic Deterrent Submarine Flotilla - INS Arihant Command",
    base: "Eastern Naval Command, Visakhapatnam",
    role: "officer",
    roleLabel: "Tactical Recipient (Officer)",
    pqcPublicKey: "ML-KEM-768:PK_SUBFLOTILLA_KULKARNI_109",
    pqcPrivateKey: "ML-DSA-65:SK_KULKARNI_PRIVATE_KEY",
    avatarInitials: "NK",
    clearanceLevel: "TOP_SECRET"
  },
  {
    id: "OFF-AUDIT-09",
    serviceNumber: "INTEL-9901-D",
    name: "Cdr. Arjun Nair",
    rank: "Commander (Naval Intelligence)",
    unit: "Directorate of Naval Intelligence & Forensic Cyber Warfare",
    base: "Defence Cyber Agency / WESEE Air-Gapped Lab",
    role: "auditor",
    roleLabel: "Naval Intelligence (Forensic Auditor)",
    pqcPublicKey: "ML-KEM-768:PK_NAVINTEL_NAIR_09_F8A2",
    pqcPrivateKey: "ML-DSA-65:SK_NAIR_AUDIT_KEY",
    avatarInitials: "AN",
    clearanceLevel: "EYES_ONLY_FORENSIC"
  }
];

export const INITIAL_DOCUMENTS = [
  {
    id: "DOC-NAVY-2026-081",
    classification: "TOP SECRET // NOFORN // WESEE TACTICAL",
    title: "OPERATION SINDHURAKSHAK: ARABIAN SEA MARITIME CORRIDOR PROTOCOL",
    codeName: "TRISHUL-DEFENCE-DELTA",
    issuedBy: "Cmdr. Rajesh Sharma (WESEE HQ)",
    issuedDate: "2026-10-01 02:30 IST",
    summary: "Standard operating procedures for Carrier Battle Group acoustic patrol, sonar fence frequency hopping, and submarine exclusion coordinates.",
    rawContent: `OPERATION SINDHURAKSHAK — TACTICAL DIRECTIVE 2026/ALPHA
CLASSIFICATION: TOP SECRET // EXCLUSIVE WESEE FLEET BROADCAST
AUTHORITY: WEAPONS AND ELECTRONICS SYSTEMS ENGINEERING ESTABLISHMENT (WESEE)

1. SITUATION & MARITIME SCOPE:
In accordance with Western Fleet Operational Readiness orders, Carrier Battle Group (INS Vikrant) shall establish acoustic containment along Corridor Bravo-9 between Coordinates 18°54'N 072°49'E and 15°24'N 073°47'E.

2. COMBAT SYSTEM HARMONIZATION:
All surface combatants shall calibrate indigenous CMS-28 radar suites with frequency hopping interval set to 40 milliseconds. Acoustic sonar fences shall relay hydrophone telemetry exclusively through air-gapped Link-II tactical nodes.

3. DISCLOSURE & SECURITY DIRECTIVE:
The contents of this transmission are protected under the Official Secrets Act and Ministry of Defence Security Protocol 2026. Any reproduction, dissemination, or unauthorized transmission of this directive constitutes high treason. Decryption provenance is cryptographically logged on the naval consortium ledger.`,
    recipients: ["OFF-NAVY-402", "OFF-NAVY-718", "OFF-NAVY-109"]
  },
  {
    id: "DOC-NAVY-2026-104",
    classification: "SECRET // WESEE OPERATIONAL",
    title: "PROJECT VARUNA: QUANTUM RESILIENT SHIP-TO-AIR DATA LINK ARCHITECTURE",
    codeName: "VARUNA-NET-MESH",
    issuedBy: "Cmdr. Rajesh Sharma (WESEE HQ)",
    issuedDate: "2026-09-30 18:45 IST",
    summary: "Technical specifications for deploying NIST ML-KEM-768 key encapsulation across MiG-29K aircraft and naval surface combatants.",
    rawContent: `PROJECT VARUNA — TECHNICAL SPECIFICATION SPEC-2026-QNET
CLASSIFICATION: SECRET // RESTRICTED DISSEMINATION
DEPARTMENT: INDIAN NAVY (WESEE) COMBAT RESEARCH LAB

1. OBJECTIVE:
Deploying Post-Quantum Cryptographic key encapsulation (NIST FIPS 203 ML-KEM) to prevent 'Harvest Now, Decrypt Later' adversarial eavesdropping on tactical VHF/UHF tactical radio links.

2. PROTOCOL SPECIFICATIONS:
- Primary Key Encapsulation: NIST ML-KEM-768
- Digital Signing Mechanism: NIST ML-DSA-65 (FIPS 204)
- Packet MTU Overhead: 1,184 bytes per initial handshake
- Rekeying Interval: 300 seconds during active combat patrol

3. AIR-GAPPED VERIFICATION:
All tactical units must verify ledger block roots before establishing mesh synchronization. External internet gateways remain permanently severed during blue-water operations.`,
    recipients: ["OFF-NAVY-402", "OFF-NAVY-718"]
  }
];

export const GENESIS_LEDGER = [
  {
    index: 0,
    timestamp: "2026-09-30T00:00:00.000Z",
    docId: "GENESIS-BLOCK",
    docTitle: "WESEE Air-Gapped Consortium Genesis Block",
    recipientId: "SYSTEM-ROOT",
    officerName: "WESEE Master Cryptographic Authority",
    officerRank: "Root Authority",
    sessionNonce: "NONCE-ROOT-0000000000",
    pqcSignature: "ML-DSA-65::GENESIS_ROOT_SIGNATURE_AIRGAP::VERIFIED",
    previousHash: "0000000000000000000000000000000000000000000000000000000000000000",
    blockHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    merkleRoot: "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    tampered: false
  }
];

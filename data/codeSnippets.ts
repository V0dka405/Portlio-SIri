/**
 * Cybersecurity, Cryptography, Intrusion Detection & Zero-Trust code snippets
 * streamed in real-time on the interactive background.
 */
export const codeSnippets: string[] = [
  `// [SEC-CRYPTO] AES-256-GCM Authenticated Encryption
package crypto

func EncryptPayload(key, plaintext, aad []byte) ([]byte, error) {
  block, err := aes.NewCipher(key)
  if err != nil {
    return nil, err
  }
  gcm, err := cipher.NewGCM(block)
  nonce := make([]byte, gcm.NonceSize())
  rand.Read(nonce)
  return gcm.Seal(nonce, nonce, plaintext, aad), nil
}`,
  `// [IDS-ENGINE] Real-Time SYN Flood & Port Scan Detector
import scapy.all as net
from collections import defaultdict

syn_tracker = defaultdict(set)

def inspect_packet(pkt):
  if pkt.haslayer("TCP") and pkt["TCP"].flags == "S":
    src_ip = pkt["IP"].src
    dst_port = pkt["TCP"].dport
    syn_tracker[src_ip].add(dst_port)
    if len(syn_tracker[src_ip]) > 50:
      trigger_firewall_drop(src_ip, reason="PORT_SCAN_DETECTED")`,
  `// [ZERO-TRUST] HMAC-SHA256 Token & Replay Guard
import crypto from "node:crypto";

export function verifySignedRequest(payload: string, sig: string, secret: string) {
  const digest = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  const a = Buffer.from(sig, "hex");
  const b = Buffer.from(digest, "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}`,
  `// [WAF-FILTER] Deep Packet SQLi & XSS Payload Inspector
const THREAT_SIGS = [
  /(\bUNION\b.*\bSELECT\b|--|\bDROP\s+TABLE\b)/i,
  /(<script\b[^>]*>|javascript:|onerror\s*=)/i,
];

export function inspectHttpPayload(rawBody: string, clientIp: string) {
  for (const rule of THREAT_SIGS) {
    if (rule.test(rawBody)) {
      quarantineSession(clientIp, "WAF_SIGNATURE_MATCH");
      return { allowed: false, status: 403 };
    }
  }
  return { allowed: true, status: 200 };
}`,
  `// [mTLS-GUARD] X.509 Certificate Pinning & TLS 1.3 Verifier
pub fn verify_peer_cert(cert_der: &[u8], expected_sha256: &[u8; 32]) -> bool {
  let digest = Sha256::digest(cert_der);
  if constant_time_eq(&digest, expected_sha256) {
    audit_log("mTLS_HANDSHAKE_VERIFIED");
    return true;
  }
  alert_soc("CERT_PINNING_MISMATCH_BLOCKED");
  false
}`,
  `// [SOC-AUDIT] Argon2id Password Hashing & Brute-Force Lockout
export async function authenticateUser(uid: string, secret: string) {
  const attempts = await redis.incr(\`sec:auth:fail:\${uid}\`);
  if (attempts > 5) {
    await redis.expire(\`sec:auth:fail:\${uid}\`, 900);
    throw new SecurityLockoutError("ACCOUNT_TEMPORARILY_LOCKED");
  }
  return argon2.verify( await getStoredHash(uid), secret );
}`,
];

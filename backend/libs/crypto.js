import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const ALGORITHM = 'aes-256-gcm';
const SECRET_RAW = process.env.DOWNLOAD_ENCRYPTION_KEY || 'default_secret_download_key_moybd_2026';

// Derived 256-bit Key
const KEY = crypto.createHash('sha256').update(SECRET_RAW).digest();

/**
 * Encrypt a URL string using AES-256-GCM
 * Output format: "gcm:<iv_hex>:<ciphertext_hex>:<tag_hex>"
 */
export function encryptUrl(text) {
  if (!text || typeof text !== 'string' || !text.trim()) return '';
  // If already encrypted, return as is
  if (text.startsWith('gcm:')) return text;

  try {
    const iv = crypto.randomBytes(12); // 96-bit IV for GCM
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const tag = cipher.getAuthTag().toString('hex');
    return `gcm:${iv.toString('hex')}:${encrypted}:${tag}`;
  } catch (error) {
    console.error('Error encrypting download URL:', error);
    return text;
  }
}

/**
 * Decrypt a URL string using AES-256-GCM
 * Handles fallback for legacy plaintext URLs safely
 */
export function decryptUrl(encryptedText) {
  if (!encryptedText || typeof encryptedText !== 'string') return '';
  
  // Backward compatibility: If not encrypted with gcm prefix, assume plaintext
  if (!encryptedText.startsWith('gcm:')) return encryptedText;

  try {
    const parts = encryptedText.split(':');
    if (parts.length !== 4) return encryptedText;
    const [, ivHex, ciphertextHex, tagHex] = parts;

    const iv = Buffer.from(ivHex, 'hex');
    const tag = Buffer.from(tagHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
    decipher.setAuthTag(tag);

    let decrypted = decipher.update(ciphertextHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    console.error('Error decrypting download URL:', error);
    return '';
  }
}

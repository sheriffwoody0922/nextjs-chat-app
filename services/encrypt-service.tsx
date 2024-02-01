import * as CryptoJS from 'crypto-js';

// Encryption function
function encryptText(text: string, secretKey: string): string {
  const encryptedText = CryptoJS.AES.encrypt(text, secretKey).toString();
  return encryptedText;
}

// Decryption function
function decryptText(encryptedText: string, secretKey: string): string {
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return decryptedText;
}
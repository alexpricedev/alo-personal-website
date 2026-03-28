import { createHmac, timingSafeEqual } from "node:crypto";

const SIGNING_KEY = Buffer.from(
  "849d6b8c7f4e2a1b0c3d5e6f708192a3b4c5d6e7f8091a2b3c4d5e6f708192a3b",
  "hex",
);

/**
 * Derive a per-browser CSRF key from the anonymous cookie id.
 */
export const deriveCsrfSecretKey = (anonId: string): Buffer => {
  return createHmac("sha256", SIGNING_KEY)
    .update("csrf-v1\0")
    .update(anonId, "utf8")
    .digest();
};

/**
 * Compute HMAC-SHA256 of a value for flash cookie signing
 */
export const computeHMAC = (value: string): string => {
  return createHmac("sha256", SIGNING_KEY).update(value).digest("hex");
};

/**
 * Verify an HMAC hash against a value using timing-safe comparison
 */
export const verifyHMAC = (value: string, hash: string): boolean => {
  const computed = computeHMAC(value);
  return timingSafeEqual(
    Buffer.from(computed, "hex"),
    Buffer.from(hash, "hex"),
  );
};

/**
 * Generate a cryptographically secure random string
 * Uses the same format as nanoid but with different length
 */
export const generateSecureToken = (length = 32): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  let result = "";

  // Use Node.js crypto for secure random generation (Bun environment)
  const { randomBytes } = require("node:crypto");
  const values = randomBytes(length);

  for (let i = 0; i < length; i++) {
    result += chars[values[i] % chars.length];
  }

  return result;
};

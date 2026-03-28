import { createHmac, timingSafeEqual } from "node:crypto";
import { deriveCsrfSecretKey, generateSecureToken } from "../utils/crypto";

export const CSRF_HEADER_NAME = "X-CSRF-Token";
export const CSRF_FIELD_NAME = "_csrf";
export const CSRF_NONCE_LENGTH = 16;
export const TIME_WINDOW_MINUTES = 15;

const failureCounters = new Map<string, { count: number; resetAt: number }>();
const MAX_FAILURES_PER_WINDOW = 10;
const FAILURE_WINDOW_MS = 60 * 1000;

export const createCsrfToken = (
  anonId: string,
  method: string,
  path: string,
): string => {
  const key = deriveCsrfSecretKey(anonId);
  const nonce = generateSecureToken(CSRF_NONCE_LENGTH);
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const pathOnly = normalizedPath.split("?")[0].split("#")[0];
  const now = Math.floor(Date.now() / 1000);
  const timeBucket = Math.floor(now / (TIME_WINDOW_MINUTES * 60));
  const payload = `${nonce}${method.toUpperCase()}${pathOnly}${timeBucket}`;
  const token = createHmac("sha256", key).update(payload).digest("base64url");
  return `${nonce}.${token}`;
};

export const verifyCsrfToken = (
  anonId: string,
  method: string,
  path: string,
  providedToken: string,
): boolean => {
  try {
    if (isRateLimited(anonId)) {
      return false;
    }

    const parts = providedToken.split(".");
    if (parts.length !== 2) {
      recordFailure(anonId);
      return false;
    }

    const [nonce, token] = parts;
    const key = deriveCsrfSecretKey(anonId);

    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const pathOnly = normalizedPath.split("?")[0].split("#")[0];
    const now = Math.floor(Date.now() / 1000);
    const currentBucket = Math.floor(now / (TIME_WINDOW_MINUTES * 60));
    const previousBucket = currentBucket - 1;

    for (const timeBucket of [currentBucket, previousBucket]) {
      const payload = `${nonce}${method.toUpperCase()}${pathOnly}${timeBucket}`;
      const expectedToken = createHmac("sha256", key)
        .update(payload)
        .digest("base64url");

      if (
        token.length === expectedToken.length &&
        timingSafeEqual(Buffer.from(token), Buffer.from(expectedToken))
      ) {
        clearFailures(anonId);
        return true;
      }
    }

    recordFailure(anonId);
    return false;
  } catch {
    recordFailure(anonId);
    return false;
  }
};

export const validateOrigin = (
  req: Request,
  expectedOrigin?: string,
): boolean => {
  try {
    const origin = req.headers.get("Origin");
    const referer = req.headers.get("Referer");

    const expected = expectedOrigin ?? new URL(req.url).origin;

    if (origin) {
      return origin === expected;
    }

    if (referer) {
      const refererOrigin = new URL(referer).origin;
      return refererOrigin === expected;
    }

    return false;
  } catch {
    return false;
  }
};

const isRateLimited = (key: string): boolean => {
  const now = Date.now();
  const counter = failureCounters.get(key);

  if (!counter) {
    return false;
  }

  if (now > counter.resetAt) {
    failureCounters.delete(key);
    return false;
  }

  return counter.count >= MAX_FAILURES_PER_WINDOW;
};

const recordFailure = (key: string): void => {
  const now = Date.now();
  const counter = failureCounters.get(key);

  if (!counter || now > counter.resetAt) {
    failureCounters.set(key, {
      count: 1,
      resetAt: now + FAILURE_WINDOW_MS,
    });
  } else {
    counter.count++;
  }
};

const clearFailures = (key: string): void => {
  failureCounters.delete(key);
};

import { randomUUID } from "node:crypto";
import type { BunRequest } from "bun";

export const ANON_COOKIE_NAME = "anon_id";
export const ANON_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 365 * 24 * 60 * 60,
};

export const getAnonIdFromRequest = (req: BunRequest): string | null =>
  req.cookies.get(ANON_COOKIE_NAME) || null;

export const setAnonCookie = (req: BunRequest, anonId: string): void => {
  req.cookies.set(ANON_COOKIE_NAME, anonId, ANON_COOKIE_OPTIONS);
};

export const createNewAnonId = (): string => randomUUID();

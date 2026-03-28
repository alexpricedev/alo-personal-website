import type { BunRequest } from "bun";
import { createNewAnonId, getAnonIdFromRequest } from "../services/anon-cookie";

export interface RequestContext {
  anonId: string;
  requiresSetCookie: boolean;
}

export const getRequestContext = (req: BunRequest): RequestContext => {
  const existing = getAnonIdFromRequest(req);
  if (existing) {
    return { anonId: existing, requiresSetCookie: false };
  }
  return { anonId: createNewAnonId(), requiresSetCookie: true };
};

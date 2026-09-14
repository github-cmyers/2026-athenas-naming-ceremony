import { createHmac, timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";

export const ADMIN_SESSION_COOKIE = "admin_session";

const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

// The session used to be the fixed string "authenticated", which anyone could
// type into devtools to become an admin. The cookie is now an expiry stamped
// with an HMAC, so it cannot be forged without knowing ADMIN_PASSWORD.
// Changing that password invalidates every outstanding session, which is the
// behaviour you want from a shared password anyway.
function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function createSessionToken(secret: string): string {
  const expiresAt = String(Date.now() + SESSION_TTL_MS);
  return `${expiresAt}.${sign(expiresAt, secret)}`;
}

export function isValidSessionToken(token: string | undefined): boolean {
  const secret = process.env.ADMIN_PASSWORD;
  if (!token || !secret) return false;

  const [expiresAt, signature] = token.split(".");
  if (!expiresAt || !signature) return false;

  const expected = sign(expiresAt, secret);
  const given = Buffer.from(signature, "hex");
  const want = Buffer.from(expected, "hex");

  // Length check first: timingSafeEqual throws on a mismatch, and a malformed
  // hex signature decodes to a short buffer.
  if (given.length !== want.length) return false;
  if (!timingSafeEqual(given, want)) return false;

  return Number(expiresAt) > Date.now();
}

export function isAuthenticated(request: NextRequest): boolean {
  return isValidSessionToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
}

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
  maxAge: SESSION_TTL_MS / 1000,
} as const;

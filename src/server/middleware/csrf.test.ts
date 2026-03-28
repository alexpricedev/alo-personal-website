import { describe, expect, test } from "bun:test";
import { ANON_COOKIE_NAME } from "../services/anon-cookie";
import { createCsrfToken } from "../services/csrf";
import { createBunRequest } from "../test-utils/bun-request";
import { csrfProtection } from "./csrf";

const ORIGIN = "http://localhost:3333";
const TEST_ANON = "550e8400-e29b-41d4-a716-446655440099";

describe("CSRF Middleware", () => {
  describe("csrfProtection", () => {
    test("allows GET requests without token", async () => {
      const req = createBunRequest(`${ORIGIN}/test`, {
        method: "GET",
      });

      const response = await csrfProtection(req, {
        method: "GET",
        path: "/test",
      });

      expect(response).toBeNull();
    });

    test("allows HEAD requests without token", async () => {
      const req = createBunRequest(`${ORIGIN}/test`, {
        method: "HEAD",
      });

      const response = await csrfProtection(req, {
        method: "HEAD",
        path: "/test",
      });

      expect(response).toBeNull();
    });

    test("allows OPTIONS requests without token", async () => {
      const req = createBunRequest(`${ORIGIN}/test`, {
        method: "OPTIONS",
      });

      const response = await csrfProtection(req, {
        method: "OPTIONS",
        path: "/test",
      });

      expect(response).toBeNull();
    });

    test("rejects POST request without Origin/Referer", async () => {
      const cookieHeader = `${ANON_COOKIE_NAME}=${TEST_ANON}`;
      const req = createBunRequest(`${ORIGIN}/test`, {
        method: "POST",
        headers: {
          Cookie: cookieHeader,
        },
      });

      const response = await csrfProtection(req, {
        method: "POST",
        path: "/test",
      });

      expect(response).toBeTruthy();
      expect(response?.status).toBe(403);
      expect(await response?.text()).toBe("Invalid request origin");
    });

    test("rejects POST request without anon cookie", async () => {
      const req = createBunRequest(`${ORIGIN}/test`, {
        method: "POST",
        headers: {
          Origin: ORIGIN,
        },
      });

      const response = await csrfProtection(req, {
        method: "POST",
        path: "/test",
      });

      expect(response).toBeTruthy();
      expect(response?.status).toBe(403);
      expect(await response?.text()).toBe("Invalid CSRF token");
    });

    test("rejects POST request without CSRF token", async () => {
      const cookieHeader = `${ANON_COOKIE_NAME}=${TEST_ANON}`;
      const req = createBunRequest(`${ORIGIN}/test`, {
        method: "POST",
        headers: {
          Origin: ORIGIN,
          Cookie: cookieHeader,
        },
      });

      const response = await csrfProtection(req, {
        method: "POST",
        path: "/test",
      });

      expect(response).toBeTruthy();
      expect(response?.status).toBe(403);
      expect(await response?.text()).toBe("Invalid CSRF token");
    });

    test("accepts POST request with valid CSRF token in header", async () => {
      const cookieHeader = `${ANON_COOKIE_NAME}=${TEST_ANON}`;
      const csrfToken = createCsrfToken(TEST_ANON, "POST", "/test");

      const req = createBunRequest(`${ORIGIN}/test`, {
        method: "POST",
        headers: {
          Origin: ORIGIN,
          Cookie: cookieHeader,
          "X-CSRF-Token": csrfToken,
        },
      });

      const response = await csrfProtection(req, {
        method: "POST",
        path: "/test",
      });

      expect(response).toBeNull();
    });

    test("accepts POST request with valid CSRF token in form data", async () => {
      const cookieHeader = `${ANON_COOKIE_NAME}=${TEST_ANON}`;
      const csrfToken = createCsrfToken(TEST_ANON, "POST", "/test");

      const formData = new FormData();
      formData.append("_csrf", csrfToken);
      formData.append("other", "data");

      const req = createBunRequest(`${ORIGIN}/test`, {
        method: "POST",
        headers: {
          Origin: ORIGIN,
          Cookie: cookieHeader,
        },
        body: formData,
      });

      const response = await csrfProtection(req, {
        method: "POST",
        path: "/test",
      });

      expect(response).toBeNull();
    });

    test("rejects POST request with invalid CSRF token", async () => {
      const cookieHeader = `${ANON_COOKIE_NAME}=${TEST_ANON}`;
      const req = createBunRequest(`${ORIGIN}/test`, {
        method: "POST",
        headers: {
          Origin: ORIGIN,
          Cookie: cookieHeader,
          "X-CSRF-Token": "invalid.token",
        },
      });

      const response = await csrfProtection(req, {
        method: "POST",
        path: "/test",
      });

      expect(response).toBeTruthy();
      expect(response?.status).toBe(403);
      expect(await response?.text()).toBe("Invalid CSRF token");
    });

    test("protects PUT requests", async () => {
      const req = createBunRequest(`${ORIGIN}/test`, {
        method: "PUT",
        headers: {
          Origin: ORIGIN,
        },
      });

      const response = await csrfProtection(req, {
        method: "PUT",
        path: "/test",
      });

      expect(response).toBeTruthy();
      expect(response?.status).toBe(403);
    });

    test("protects PATCH requests", async () => {
      const req = createBunRequest(`${ORIGIN}/test`, {
        method: "PATCH",
        headers: {
          Origin: ORIGIN,
        },
      });

      const response = await csrfProtection(req, {
        method: "PATCH",
        path: "/test",
      });

      expect(response).toBeTruthy();
      expect(response?.status).toBe(403);
    });

    test("protects DELETE requests", async () => {
      const req = createBunRequest(`${ORIGIN}/test`, {
        method: "DELETE",
        headers: {
          Origin: ORIGIN,
        },
      });

      const response = await csrfProtection(req, {
        method: "DELETE",
        path: "/test",
      });

      expect(response).toBeTruthy();
      expect(response?.status).toBe(403);
    });

    test("uses custom expected origin", async () => {
      const cookieHeader = `${ANON_COOKIE_NAME}=${TEST_ANON}`;
      const csrfToken = createCsrfToken(TEST_ANON, "POST", "/test");

      const req = createBunRequest(`${ORIGIN}/test`, {
        method: "POST",
        headers: {
          Origin: "http://custom.com",
          Cookie: cookieHeader,
          "X-CSRF-Token": csrfToken,
        },
      });

      const response = await csrfProtection(req, {
        method: "POST",
        path: "/test",
        expectedOrigin: "http://custom.com",
      });

      expect(response).toBeNull();
    });

    test("detects method mismatch - returns 500 for configuration error", async () => {
      const cookieHeader = `${ANON_COOKIE_NAME}=${TEST_ANON}`;
      const req = createBunRequest(`${ORIGIN}/test`, {
        method: "POST",
        headers: {
          Origin: ORIGIN,
          Cookie: cookieHeader,
        },
      });

      const response = await csrfProtection(req, {
        method: "PUT",
        path: "/test",
      });

      expect(response).toBeTruthy();
      expect(response?.status).toBe(500);
      expect(await response?.text()).toBe("Invalid request configuration");
    });

    test("works without method in options - uses req.method", async () => {
      const cookieHeader = `${ANON_COOKIE_NAME}=${TEST_ANON}`;
      const csrfToken = createCsrfToken(TEST_ANON, "POST", "/test");

      const req = createBunRequest(`${ORIGIN}/test`, {
        method: "POST",
        headers: {
          Origin: ORIGIN,
          Cookie: cookieHeader,
          "X-CSRF-Token": csrfToken,
        },
      });

      const response = await csrfProtection(req, {
        path: "/test",
      });

      expect(response).toBeNull();
    });

    test("detects GET request method mismatch - returns 500 for configuration error", async () => {
      const req = createBunRequest(`${ORIGIN}/test`, {
        method: "GET",
        headers: {
          Origin: ORIGIN,
        },
      });

      const response = await csrfProtection(req, {
        method: "POST",
        path: "/test",
      });

      expect(response).toBeTruthy();
      expect(response?.status).toBe(500);
      expect(await response?.text()).toBe("Invalid request configuration");
    });

    test("uses actual request method for token verification", async () => {
      const cookieHeader = `${ANON_COOKIE_NAME}=${TEST_ANON}`;
      const csrfToken = createCsrfToken(TEST_ANON, "PATCH", "/test");

      const req = createBunRequest(`${ORIGIN}/test`, {
        method: "PATCH",
        headers: {
          Origin: ORIGIN,
          Cookie: cookieHeader,
          "X-CSRF-Token": csrfToken,
        },
      });

      const response = await csrfProtection(req, {
        method: "PATCH",
        path: "/test",
      });

      expect(response).toBeNull();
    });

    test("rejects token created for different method than actual request", async () => {
      const cookieHeader = `${ANON_COOKIE_NAME}=${TEST_ANON}`;
      const csrfToken = createCsrfToken(TEST_ANON, "PUT", "/test");

      const req = createBunRequest(`${ORIGIN}/test`, {
        method: "POST",
        headers: {
          Origin: ORIGIN,
          Cookie: cookieHeader,
          "X-CSRF-Token": csrfToken,
        },
      });

      const response = await csrfProtection(req, {
        method: "POST",
        path: "/test",
      });

      expect(response).toBeTruthy();
      expect(response?.status).toBe(403);
      expect(await response?.text()).toBe("Invalid CSRF token");
    });
  });
});

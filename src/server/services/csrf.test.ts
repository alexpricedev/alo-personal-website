import { describe, expect, test } from "bun:test";
import { createCsrfToken, validateOrigin, verifyCsrfToken } from "./csrf";

const ANON_A = "550e8400-e29b-41d4-a716-446655440001";
const ANON_B = "550e8400-e29b-41d4-a716-446655440002";

describe("CSRF Service", () => {
  describe("createCsrfToken and verifyCsrfToken", () => {
    test("creates and verifies valid token", () => {
      const method = "POST";
      const path = "/examples";

      const token = createCsrfToken(ANON_A, method, path);
      const isValid = verifyCsrfToken(ANON_A, method, path, token);

      expect(token).toBeTruthy();
      expect(token).toContain(".");
      expect(isValid).toBe(true);
    });

    test("rejects token with wrong method", () => {
      const path = "/examples";
      const token = createCsrfToken(ANON_A, "POST", path);
      const isValid = verifyCsrfToken(ANON_A, "PUT", path, token);

      expect(isValid).toBe(false);
    });

    test("rejects token with wrong path", () => {
      const token = createCsrfToken(ANON_A, "POST", "/examples");
      const isValid = verifyCsrfToken(ANON_A, "POST", "/other", token);

      expect(isValid).toBe(false);
    });

    test("rejects token with wrong anon id", () => {
      const token = createCsrfToken(ANON_A, "POST", "/examples");
      const isValid = verifyCsrfToken(ANON_B, "POST", "/examples", token);

      expect(isValid).toBe(false);
    });

    test("rejects malformed token", () => {
      expect(verifyCsrfToken(ANON_A, "POST", "/x", "invalid")).toBe(false);
      expect(verifyCsrfToken(ANON_A, "POST", "/x", "too.many.parts.here")).toBe(
        false,
      );
      expect(verifyCsrfToken(ANON_A, "POST", "/x", "")).toBe(false);
    });

    test("tokens are method case insensitive", () => {
      const path = "/examples";
      const token = createCsrfToken(ANON_A, "post", path);
      const isValid = verifyCsrfToken(ANON_A, "POST", path, token);

      expect(isValid).toBe(true);
    });

    test("path normalization - token valid for same path with query params", () => {
      const basePath = "/examples";
      const pathWithQuery = "/examples?x=1&y=2";
      const token = createCsrfToken(ANON_A, "POST", basePath);
      const isValid = verifyCsrfToken(ANON_A, "POST", pathWithQuery, token);

      expect(isValid).toBe(true);
    });

    test("path normalization - token valid for same path with fragments", () => {
      const basePath = "/examples";
      const pathWithFragment = "/examples#section";
      const token = createCsrfToken(ANON_A, "POST", basePath);
      const isValid = verifyCsrfToken(ANON_A, "POST", pathWithFragment, token);

      expect(isValid).toBe(true);
    });

    test("multiple tokens for same anon remain valid for their paths", () => {
      const t1 = createCsrfToken(ANON_A, "POST", "/test1");
      const t2 = createCsrfToken(ANON_A, "POST", "/test2");
      expect(verifyCsrfToken(ANON_A, "POST", "/test1", t1)).toBe(true);
      expect(verifyCsrfToken(ANON_A, "POST", "/test2", t2)).toBe(true);
    });
  });

  describe("validateOrigin", () => {
    test("accepts matching Origin header", () => {
      const req = new Request("http://example.com/test", {
        headers: { Origin: "http://example.com" },
      });

      expect(validateOrigin(req, "http://example.com")).toBe(true);
    });

    test("accepts matching Referer header when no Origin", () => {
      const req = new Request("http://example.com/test", {
        headers: { Referer: "http://example.com/page" },
      });

      expect(validateOrigin(req, "http://example.com")).toBe(true);
    });

    test("rejects mismatched Origin", () => {
      const req = new Request("http://example.com/test", {
        headers: { Origin: "http://evil.com" },
      });

      expect(validateOrigin(req, "http://example.com")).toBe(false);
    });

    test("rejects mismatched Referer", () => {
      const req = new Request("http://example.com/test", {
        headers: { Referer: "http://evil.com/page" },
      });

      expect(validateOrigin(req, "http://example.com")).toBe(false);
    });

    test("rejects request with no Origin or Referer", () => {
      const req = new Request("http://example.com/test");

      expect(validateOrigin(req, "http://example.com")).toBe(false);
    });

    test("uses request URL origin when no expected origin provided", () => {
      const req = new Request("http://test.com/page", {
        headers: { Origin: "http://test.com" },
      });

      expect(validateOrigin(req)).toBe(true);
    });
  });
});

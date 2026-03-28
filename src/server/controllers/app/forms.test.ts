import { beforeEach, describe, expect, test } from "bun:test";
import { ANON_COOKIE_NAME } from "../../services/anon-cookie";
import { createCsrfToken } from "../../services/csrf";
import type { FormsState } from "../../templates/forms";
import { createBunRequest, findSetCookie } from "../../test-utils/bun-request";
import { cleanupTestData } from "../../test-utils/helpers";
import { stateHelpers } from "../../utils/state";
import { forms } from "./forms";

const TEST_ANON = "660e8400-e29b-41d4-a716-446655440001";

describe("Forms Controller", () => {
  beforeEach(async () => {
    await cleanupTestData();
  });

  const anonCookie = `${ANON_COOKIE_NAME}=${TEST_ANON}`;

  describe("GET /forms", () => {
    test("renders forms page with CSRF token when anon cookie present", async () => {
      const request = createBunRequest("http://localhost:3333/forms", {
        headers: { Cookie: anonCookie },
      });
      const response = forms.index(request);
      const html = await response.text();

      expect(response.headers.get("content-type")).toBe("text/html");
      expect(html).toContain("Form Patterns");
      expect(html).toContain('name="_csrf"');
      expect(html).toContain('action="/forms"');
      expect(html).toContain('method="POST"');
    });

    test("renders forms page with new anon cookie for first-time visitors", async () => {
      const request = createBunRequest("http://localhost:3333/forms");
      const response = forms.index(request);
      const html = await response.text();

      expect(html).toContain("Form Patterns");
      expect(html).toContain('name="_csrf"');
      const setCookie = findSetCookie(request, ANON_COOKIE_NAME);
      expect(setCookie).toBeDefined();
    });

    test("shows flash message when state is submission-success", async () => {
      const request = createBunRequest("http://localhost:3333/forms", {
        headers: { Cookie: anonCookie },
      });

      const { setFlash } = stateHelpers<FormsState>();
      setFlash(request, {
        state: "submission-success",
        name: "Alex",
        email: "alex@example.com",
        message: "Hello world",
      });

      const response = forms.index(request);
      const html = await response.text();

      expect(html).toContain("Submitted successfully");
      expect(html).toContain("Alex");
      expect(html).toContain("alex@example.com");
      expect(html).toContain("Hello world");
    });

    test("does not show flash message when no state", async () => {
      const request = createBunRequest("http://localhost:3333/forms", {
        headers: { Cookie: anonCookie },
      });

      const response = forms.index(request);
      const html = await response.text();

      expect(html).not.toContain("Submitted successfully");
    });
  });

  describe("POST /forms", () => {
    test("sets flash and redirects with valid submission", async () => {
      const csrfToken = createCsrfToken(TEST_ANON, "POST", "/forms");

      const mockFormData = new FormData();
      mockFormData.append("name", "Alex");
      mockFormData.append("email", "alex@example.com");
      mockFormData.append("message", "Hello world");
      mockFormData.append("_csrf", csrfToken);

      const request = createBunRequest("http://localhost:3333/forms", {
        method: "POST",
        headers: {
          Origin: "http://localhost:3333",
          Cookie: anonCookie,
        },
        body: mockFormData,
      });

      const response = await forms.create(request);

      expect(response.status).toBe(303);
      expect(response.headers.get("location")).toBe("/forms");

      const setCookie = findSetCookie(request, "flash_state");
      expect(setCookie).toBeDefined();
      expect(setCookie).toContain("submission-success");
      expect(setCookie).toContain("Alex");
    });

    test("redirects without flash when name is missing", async () => {
      const csrfToken = createCsrfToken(TEST_ANON, "POST", "/forms");

      const mockFormData = new FormData();
      mockFormData.append("name", "");
      mockFormData.append("_csrf", csrfToken);

      const request = createBunRequest("http://localhost:3333/forms", {
        method: "POST",
        headers: {
          Origin: "http://localhost:3333",
          Cookie: anonCookie,
        },
        body: mockFormData,
      });

      const response = await forms.create(request);

      expect(response.status).toBe(303);
      expect(response.headers.get("location")).toBe("/forms");

      const setCookie = findSetCookie(request, "flash_state");
      expect(setCookie).toBeUndefined();
    });

    test("redirects without flash when name is too short", async () => {
      const csrfToken = createCsrfToken(TEST_ANON, "POST", "/forms");

      const mockFormData = new FormData();
      mockFormData.append("name", "ab");
      mockFormData.append("_csrf", csrfToken);

      const request = createBunRequest("http://localhost:3333/forms", {
        method: "POST",
        headers: {
          Origin: "http://localhost:3333",
          Cookie: anonCookie,
        },
        body: mockFormData,
      });

      const response = await forms.create(request);

      expect(response.status).toBe(303);
      expect(response.headers.get("location")).toBe("/forms");

      const setCookie = findSetCookie(request, "flash_state");
      expect(setCookie).toBeUndefined();
    });

    test("rejects request without CSRF token", async () => {
      const mockFormData = new FormData();
      mockFormData.append("name", "Alex");

      const request = createBunRequest("http://localhost:3333/forms", {
        method: "POST",
        headers: {
          Origin: "http://localhost:3333",
          Cookie: anonCookie,
        },
        body: mockFormData,
      });

      const response = await forms.create(request);

      expect(response.status).toBe(403);
      expect(await response.text()).toBe("Invalid CSRF token");
    });

    test("redirects when anon cookie missing", async () => {
      const mockFormData = new FormData();
      mockFormData.append("name", "Alex");

      const request = createBunRequest("http://localhost:3333/forms", {
        method: "POST",
        headers: {
          Origin: "http://localhost:3333",
        },
        body: mockFormData,
      });

      const response = await forms.create(request);

      expect(response.status).toBe(303);
      expect(response.headers.get("location")).toBe("/forms");
    });

    test("trims whitespace from submitted values", async () => {
      const csrfToken = createCsrfToken(TEST_ANON, "POST", "/forms");

      const mockFormData = new FormData();
      mockFormData.append("name", "  Alex  ");
      mockFormData.append("email", "  alex@example.com  ");
      mockFormData.append("message", "  Hello  ");
      mockFormData.append("_csrf", csrfToken);

      const request = createBunRequest("http://localhost:3333/forms", {
        method: "POST",
        headers: {
          Origin: "http://localhost:3333",
          Cookie: anonCookie,
        },
        body: mockFormData,
      });

      const response = await forms.create(request);

      expect(response.status).toBe(303);
      expect(response.headers.get("location")).toBe("/forms");

      const setCookie = findSetCookie(request, "flash_state");
      expect(setCookie).toBeDefined();
      expect(setCookie).toContain("submission-success");
    });

    test("works with CSRF token in header", async () => {
      const csrfToken = createCsrfToken(TEST_ANON, "POST", "/forms");

      const mockFormData = new FormData();
      mockFormData.append("name", "Alex");

      const request = createBunRequest("http://localhost:3333/forms", {
        method: "POST",
        headers: {
          Origin: "http://localhost:3333",
          Cookie: anonCookie,
          "X-CSRF-Token": csrfToken,
        },
        body: mockFormData,
      });

      const response = await forms.create(request);

      expect(response.status).toBe(303);
      expect(response.headers.get("location")).toBe("/forms");

      const setCookie = findSetCookie(request, "flash_state");
      expect(setCookie).toBeDefined();
      expect(setCookie).toContain("submission-success");
    });
  });
});

import { beforeEach, describe, expect, test } from "bun:test";
import { createBunRequest } from "../../test-utils/bun-request";
import { cleanupTestData } from "../../test-utils/helpers";
import { forms } from "./forms";
import { stack } from "./stack";

describe("Static Page Controllers", () => {
  beforeEach(async () => {
    await cleanupTestData();
  });

  describe("Stack Controller", () => {
    test("renders stack page", async () => {
      const req = createBunRequest("http://localhost:3333/stack");
      const response = stack.index(req);
      const html = await response.text();

      expect(response).toBeInstanceOf(Response);
      expect(response.headers.get("content-type")).toBe("text/html");

      expect(html).toContain("The Stack");
    });
  });

  describe("Forms Controller", () => {
    test("renders forms page", async () => {
      const req = createBunRequest("http://localhost:3333/forms");
      const response = forms.index(req);
      const html = await response.text();

      expect(response).toBeInstanceOf(Response);
      expect(response.headers.get("content-type")).toBe("text/html");

      expect(html).toContain("Form");
    });
  });
});

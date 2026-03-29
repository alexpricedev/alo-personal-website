import { beforeEach, describe, expect, test } from "bun:test";
import { createBunRequest } from "../../test-utils/bun-request";
import { cleanupTestData } from "../../test-utils/helpers";
import { home } from "./home";

describe("Home Controller", () => {
  beforeEach(async () => {
    await cleanupTestData();
  });

  describe("GET /", () => {
    test("renders personal homepage with workbook sections", async () => {
      const request = createBunRequest("http://localhost:3333/", {
        method: "GET",
      });
      const response = home.index(request);
      const html = await response.text();

      expect(response.headers.get("content-type")).toBe("text/html");

      expect(html).toContain(
        "For founders who&#x27;ve already sold the vision",
      );
      expect(html).toContain('id="track-record"');
      expect(html).toContain("How I think");
      expect(html).toContain("hello@annettelynoneil.com");
      expect(html).toContain('id="expertise"');
      expect(html).toContain('id="contact"');
    });
  });
});

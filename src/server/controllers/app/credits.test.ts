import { beforeEach, describe, expect, test } from "bun:test";
import { createBunRequest } from "../../test-utils/bun-request";
import { cleanupTestData } from "../../test-utils/helpers";
import { credits } from "./credits";

describe("Credits Controller", () => {
  beforeEach(async () => {
    await cleanupTestData();
  });

  describe("GET /motion-picture-producing-credits", () => {
    test("renders the credits page with title and entries", async () => {
      const request = createBunRequest(
        "http://localhost:3333/motion-picture-producing-credits",
        { method: "GET" },
      );
      const response = credits.index(request);
      const html = await response.text();

      expect(response.headers.get("content-type")).toBe("text/html");
      expect(html).toContain("Motion Picture Producing Credits");
      expect(html).toContain("Selected Film/TV Credits");
      expect(html).toContain("Vanessa Hudgens");
      expect(html).toContain("Karma Kollective");
    });
  });
});

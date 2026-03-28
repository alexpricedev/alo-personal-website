import { afterAll, beforeEach, describe, expect, mock, test } from "bun:test";
import { ANON_COOKIE_NAME } from "../../services/anon-cookie";
import { createCsrfToken } from "../../services/csrf";
import type { Project } from "../../services/project";
import type { ProjectsState } from "../../templates/projects";
import { createBunRequest, findSetCookie } from "../../test-utils/bun-request";
import { createMockProject } from "../../test-utils/factories";
import { cleanupTestData } from "../../test-utils/helpers";
import { stateHelpers } from "../../utils/state";

const mockGetProjects = mock(async (): Promise<Project[]> => []);
const mockCreateProject = mock(
  async (): Promise<Project> => createMockProject(),
);
const mockDeleteProject = mock(async (): Promise<boolean> => true);

mock.module("../../services/project", () => ({
  getProjects: mockGetProjects,
  createProject: mockCreateProject,
  deleteProject: mockDeleteProject,
}));

import { projects } from "./projects";

const TEST_ANON = "770e8400-e29b-41d4-a716-446655440001";
const anonCookie = `${ANON_COOKIE_NAME}=${TEST_ANON}`;

describe("Projects Controller", () => {
  beforeEach(async () => {
    await cleanupTestData();
    mockGetProjects.mockClear();
    mockCreateProject.mockClear();
    mockDeleteProject.mockClear();
  });

  afterAll(() => {
    mock.restore();
  });

  describe("GET /projects", () => {
    test("renders projects page with create form", async () => {
      const mockProjectsList = [
        createMockProject({ id: 1, title: "Project 1" }),
        createMockProject({ id: 2, title: "Project 2" }),
      ];
      mockGetProjects.mockResolvedValue(mockProjectsList);

      const request = createBunRequest("http://localhost:3333/projects", {
        headers: { Cookie: anonCookie },
      });
      const response = await projects.index(request);
      const html = await response.text();

      expect(mockGetProjects).toHaveBeenCalled();
      expect(response.headers.get("content-type")).toBe("text/html");

      expect(html).toContain("CRUD");
      expect(html).toContain("Project 1");
      expect(html).toContain("Project 2");
      expect(html).toContain("Add Project");
      expect(html).toContain('name="_csrf"');
      expect(html).toContain("Delete");
    });

    test("shows success message when state is submission-success", async () => {
      mockGetProjects.mockResolvedValue([]);

      const request = createBunRequest("http://localhost:3333/projects", {
        headers: {
          Cookie: anonCookie,
        },
      });

      const { setFlash } = stateHelpers<ProjectsState>();
      setFlash(request, {
        state: "submission-success",
      });

      const response = await projects.index(request);
      const html = await response.text();

      expect(html).toContain("Project added successfully.");
    });

    test("shows deletion success message", async () => {
      mockGetProjects.mockResolvedValue([]);

      const request = createBunRequest("http://localhost:3333/projects", {
        headers: {
          Cookie: anonCookie,
        },
      });
      const { setFlash } = stateHelpers<ProjectsState>();
      setFlash(request, {
        state: "deletion-success",
      });
      const response = await projects.index(request);
      const html = await response.text();

      expect(html).toContain("Project deleted successfully.");
    });

    test("shows delete buttons with per-row CSRF tokens", async () => {
      const mockProjectsList = [
        createMockProject({ id: 1, title: "Project 1" }),
        createMockProject({ id: 2, title: "Project 2" }),
      ];
      mockGetProjects.mockResolvedValue(mockProjectsList);

      const request = createBunRequest("http://localhost:3333/projects", {
        headers: { Cookie: anonCookie },
      });
      const response = await projects.index(request);
      const html = await response.text();

      expect(html).toContain('action="/projects/1/delete"');
      expect(html).toContain('action="/projects/2/delete"');
    });
  });

  describe("POST /projects", () => {
    test("creates project with valid CSRF token", async () => {
      const csrfToken = createCsrfToken(TEST_ANON, "POST", "/projects");

      const mockFormData = new FormData();
      mockFormData.append("title", "Guest Project");
      mockFormData.append("_csrf", csrfToken);

      const request = createBunRequest("http://localhost:3333/projects", {
        method: "POST",
        headers: {
          Origin: "http://localhost:3333",
          Cookie: anonCookie,
        },
        body: mockFormData,
      });

      const response = await projects.create(request);

      expect(mockCreateProject).toHaveBeenCalledWith("Guest Project");
      expect(response.status).toBe(303);
      expect(response.headers.get("location")).toBe("/projects");
    });

    test("rejects request without CSRF token", async () => {
      const mockFormData = new FormData();
      mockFormData.append("title", "New Project");

      const request = createBunRequest("http://localhost:3333/projects", {
        method: "POST",
        headers: {
          Origin: "http://localhost:3333",
          Cookie: anonCookie,
        },
        body: mockFormData,
      });

      const response = await projects.create(request);

      expect(mockCreateProject).not.toHaveBeenCalled();
      expect(response.status).toBe(403);
      expect(await response.text()).toBe("Invalid CSRF token");
    });

    test("rejects request with invalid CSRF token", async () => {
      const mockFormData = new FormData();
      mockFormData.append("title", "New Project");
      mockFormData.append("_csrf", "invalid.token");

      const request = createBunRequest("http://localhost:3333/projects", {
        method: "POST",
        headers: {
          Origin: "http://localhost:3333",
          Cookie: anonCookie,
        },
        body: mockFormData,
      });

      const response = await projects.create(request);

      expect(mockCreateProject).not.toHaveBeenCalled();
      expect(response.status).toBe(403);
      expect(await response.text()).toBe("Invalid CSRF token");
    });

    test("rejects request without Origin/Referer", async () => {
      const csrfToken = createCsrfToken(TEST_ANON, "POST", "/projects");

      const mockFormData = new FormData();
      mockFormData.append("title", "New Project");
      mockFormData.append("_csrf", csrfToken);

      const request = createBunRequest("http://localhost:3333/projects", {
        method: "POST",
        headers: { Cookie: anonCookie },
        body: mockFormData,
      });

      const response = await projects.create(request);

      expect(mockCreateProject).not.toHaveBeenCalled();
      expect(response.status).toBe(403);
      expect(await response.text()).toBe("Invalid request origin");
    });

    test("trims whitespace from title before creating", async () => {
      const csrfToken = createCsrfToken(TEST_ANON, "POST", "/projects");

      const mockFormData = new FormData();
      mockFormData.append("title", "  Trimmed Project  ");
      mockFormData.append("_csrf", csrfToken);

      const request = createBunRequest("http://localhost:3333/projects", {
        method: "POST",
        headers: {
          Origin: "http://localhost:3333",
          Cookie: anonCookie,
        },
        body: mockFormData,
      });

      const response = await projects.create(request);

      expect(mockCreateProject).toHaveBeenCalled();
      expect(response.status).toBe(303);
      expect(response.headers.get("location")).toBe("/projects");

      const setCookie = findSetCookie(request, "flash_state");
      expect(setCookie).toBeDefined();
      expect(setCookie).toContain("submission-success");
    });

    test("redirects without creating when title is empty", async () => {
      const csrfToken = createCsrfToken(TEST_ANON, "POST", "/projects");

      const mockFormData = new FormData();
      mockFormData.append("title", "");
      mockFormData.append("_csrf", csrfToken);

      const request = createBunRequest("http://localhost:3333/projects", {
        method: "POST",
        headers: {
          Origin: "http://localhost:3333",
          Cookie: anonCookie,
        },
        body: mockFormData,
      });

      const response = await projects.create(request);

      expect(mockCreateProject).not.toHaveBeenCalled();
      expect(response.status).toBe(303);
      expect(response.headers.get("location")).toBe("/projects");
    });

    test("works with CSRF token in header instead of form", async () => {
      const csrfToken = createCsrfToken(TEST_ANON, "POST", "/projects");

      const mockFormData = new FormData();
      mockFormData.append("title", "Header Token Project");

      const request = createBunRequest("http://localhost:3333/projects", {
        method: "POST",
        headers: {
          Origin: "http://localhost:3333",
          Cookie: anonCookie,
          "X-CSRF-Token": csrfToken,
        },
        body: mockFormData,
      });

      const response = await projects.create(request);

      expect(mockCreateProject).toHaveBeenCalled();
      expect(response.status).toBe(303);
      expect(response.headers.get("location")).toBe("/projects");

      const setCookie = findSetCookie(request, "flash_state");
      expect(setCookie).toBeDefined();
      expect(setCookie).toContain("submission-success");
    });
  });

  describe("POST /projects/:id/delete", () => {
    test("redirects when anon cookie missing", async () => {
      const request = createBunRequest<"/projects/:id/delete">(
        "http://localhost:3333/projects/42/delete",
        {
          method: "POST",
          headers: { Origin: "http://localhost:3333" },
          body: new FormData(),
        },
        { id: "42" },
      );

      const response = await projects.destroy(request);

      expect(mockDeleteProject).not.toHaveBeenCalled();
      expect(response.status).toBe(303);
      expect(response.headers.get("location")).toBe("/projects");
    });

    test("rejects request without CSRF token", async () => {
      const request = createBunRequest<"/projects/:id/delete">(
        "http://localhost:3333/projects/42/delete",
        {
          method: "POST",
          headers: {
            Origin: "http://localhost:3333",
            Cookie: anonCookie,
          },
          body: new FormData(),
        },
        { id: "42" },
      );

      const response = await projects.destroy(request);

      expect(mockDeleteProject).not.toHaveBeenCalled();
      expect(response.status).toBe(403);
      expect(await response.text()).toBe("Invalid CSRF token");
    });

    test("deletes project with valid CSRF token", async () => {
      const csrfToken = createCsrfToken(
        TEST_ANON,
        "POST",
        "/projects/42/delete",
      );

      mockDeleteProject.mockResolvedValue(true);

      const mockFormData = new FormData();
      mockFormData.append("_csrf", csrfToken);

      const request = createBunRequest<"/projects/:id/delete">(
        "http://localhost:3333/projects/42/delete",
        {
          method: "POST",
          headers: {
            Origin: "http://localhost:3333",
            Cookie: anonCookie,
          },
          body: mockFormData,
        },
        { id: "42" },
      );

      const response = await projects.destroy(request);

      expect(response.status).toBe(303);
      expect(mockDeleteProject).toHaveBeenCalledWith(42);
      expect(response.headers.get("location")).toBe("/projects");

      const setCookie = findSetCookie(request, "flash_state");
      expect(setCookie).toBeDefined();
      expect(setCookie).toContain("deletion-success");
    });

    test("redirects without error when project not found", async () => {
      const csrfToken = createCsrfToken(
        TEST_ANON,
        "POST",
        "/projects/999/delete",
      );

      mockDeleteProject.mockResolvedValue(false);

      const mockFormData = new FormData();
      mockFormData.append("_csrf", csrfToken);

      const request = createBunRequest<"/projects/:id/delete">(
        "http://localhost:3333/projects/999/delete",
        {
          method: "POST",
          headers: {
            Origin: "http://localhost:3333",
            Cookie: anonCookie,
          },
          body: mockFormData,
        },
        { id: "999" },
      );

      const response = await projects.destroy(request);

      expect(mockDeleteProject).toHaveBeenCalledWith(999);
      expect(response.status).toBe(303);
      expect(response.headers.get("location")).toBe("/projects");
    });

    test("redirects when id is not a valid number", async () => {
      const csrfToken = createCsrfToken(
        TEST_ANON,
        "POST",
        "/projects/invalid/delete",
      );

      const mockFormData = new FormData();
      mockFormData.append("_csrf", csrfToken);

      const request = createBunRequest<"/projects/:id/delete">(
        "http://localhost:3333/projects/invalid/delete",
        {
          method: "POST",
          headers: {
            Origin: "http://localhost:3333",
            Cookie: anonCookie,
          },
          body: mockFormData,
        },
        { id: "invalid" },
      );

      const response = await projects.destroy(request);

      expect(mockDeleteProject).not.toHaveBeenCalled();
      expect(response.status).toBe(303);
      expect(response.headers.get("location")).toBe("/projects");
    });
  });
});

import type { BunRequest } from "bun";
import { csrfProtection } from "../../middleware/csrf";
import { getRequestContext } from "../../middleware/request-context";
import {
  getAnonIdFromRequest,
  setAnonCookie,
} from "../../services/anon-cookie";
import { createCsrfToken } from "../../services/csrf";
import {
  createProject,
  deleteProject,
  getProjects,
} from "../../services/project";
import type { ProjectsState } from "../../templates/projects";
import { Projects } from "../../templates/projects";
import { redirect, render } from "../../utils/response";
import { stateHelpers } from "../../utils/state";

const { getFlash, setFlash } = stateHelpers<ProjectsState>();

export const projects = {
  async index(req: BunRequest): Promise<Response> {
    const ctx = getRequestContext(req);
    const projectList = await getProjects();

    if (ctx.requiresSetCookie) {
      setAnonCookie(req, ctx.anonId);
    }

    const state = getFlash(req);

    const createCsrfTokenValue = createCsrfToken(
      ctx.anonId,
      "POST",
      "/projects",
    );
    const deleteCsrfTokens: Record<number, string> = {};
    for (const project of projectList) {
      deleteCsrfTokens[project.id] = createCsrfToken(
        ctx.anonId,
        "POST",
        `/projects/${project.id}/delete`,
      );
    }

    return render(
      <Projects
        createCsrfToken={createCsrfTokenValue}
        deleteCsrfTokens={deleteCsrfTokens}
        projects={projectList}
        state={state}
      />,
    );
  },

  async create(req: BunRequest): Promise<Response> {
    if (!getAnonIdFromRequest(req)) {
      return redirect("/projects");
    }

    const csrfResponse = await csrfProtection(req, {
      method: "POST",
      path: "/projects",
    });
    if (csrfResponse) {
      return csrfResponse;
    }

    const formData = await req.formData();
    const title = formData.get("title") as string;

    if (!title || title.trim().length < 2) {
      return redirect("/projects");
    }

    await createProject(title.trim());
    setFlash(req, { state: "submission-success" });
    return redirect("/projects");
  },

  async destroy<T extends `${string}:id${string}`>(
    req: BunRequest<T>,
  ): Promise<Response> {
    if (!getAnonIdFromRequest(req)) {
      return redirect("/projects");
    }

    const csrfResponse = await csrfProtection(req, {
      method: "POST",
      path: new URL(req.url).pathname,
    });
    if (csrfResponse) {
      return csrfResponse;
    }

    const idParam = req.params.id;
    const id = Number.parseInt(idParam, 10);

    if (!idParam || Number.isNaN(id)) {
      return redirect("/projects");
    }

    const deleted = await deleteProject(id);

    if (!deleted) {
      return redirect("/projects");
    }

    setFlash(req, { state: "deletion-success" });
    return redirect("/projects");
  },
};

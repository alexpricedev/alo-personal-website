import type { BunRequest } from "bun";
import { csrfProtection } from "../../middleware/csrf";
import { getRequestContext } from "../../middleware/request-context";
import {
  getAnonIdFromRequest,
  setAnonCookie,
} from "../../services/anon-cookie";
import { createCsrfToken } from "../../services/csrf";
import type { FormsState } from "../../templates/forms";
import { Forms } from "../../templates/forms";
import { redirect, render } from "../../utils/response";
import { stateHelpers } from "../../utils/state";

const { getFlash, setFlash } = stateHelpers<FormsState>();

export const forms = {
  index(req: BunRequest): Response {
    const ctx = getRequestContext(req);
    if (ctx.requiresSetCookie) {
      setAnonCookie(req, ctx.anonId);
    }

    const state = getFlash(req);
    const formCsrfToken = createCsrfToken(ctx.anonId, "POST", "/forms");

    return render(<Forms formCsrfToken={formCsrfToken} state={state} />);
  },

  async create(req: BunRequest): Promise<Response> {
    if (!getAnonIdFromRequest(req)) {
      return redirect("/forms");
    }

    const csrfResponse = await csrfProtection(req, {
      method: "POST",
      path: "/forms",
    });
    if (csrfResponse) {
      return csrfResponse;
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || name.trim().length < 3) {
      return redirect("/forms");
    }

    setFlash(req, {
      state: "submission-success",
      name: name.trim(),
      email: email?.trim() || undefined,
      message: message?.trim() || undefined,
    });
    return redirect("/forms");
  },
};

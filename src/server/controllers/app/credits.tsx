import type { BunRequest } from "bun";
import { getRequestContext } from "../../middleware/request-context";
import { setAnonCookie } from "../../services/anon-cookie";
import { Credits } from "../../templates/credits";
import { render } from "../../utils/response";

export const credits = {
  index(req: BunRequest): Response {
    const ctx = getRequestContext(req);
    if (ctx.requiresSetCookie) {
      setAnonCookie(req, ctx.anonId);
    }
    return render(<Credits />);
  },
};

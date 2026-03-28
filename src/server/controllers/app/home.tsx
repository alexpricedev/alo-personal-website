import type { BunRequest } from "bun";
import { getRequestContext } from "../../middleware/request-context";
import { setAnonCookie } from "../../services/anon-cookie";
import { Home } from "../../templates/home";
import { render } from "../../utils/response";

export const home = {
  index(req: BunRequest): Response {
    const ctx = getRequestContext(req);
    if (ctx.requiresSetCookie) {
      setAnonCookie(req, ctx.anonId);
    }
    return render(<Home />);
  },
};

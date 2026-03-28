import type { BunRequest } from "bun";
import { Stack } from "../../templates/stack";
import { render } from "../../utils/response";

export const stack = {
  index(_req: BunRequest): Response {
    return render(<Stack />);
  },
};

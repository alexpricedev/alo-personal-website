import { credits, home } from "../controllers/app";

export const appRoutes = {
  "/": home.index,
  "/motion-picture-producing-credits": credits.index,
};

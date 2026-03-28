import { apiRoutes } from "./routes/api";
import { appRoutes } from "./routes/app";
import { handleAssetRequest, initAssets } from "./services/assets";
import { log } from "./services/logger";
import { seedStarterProjectsIfEmpty } from "./services/project";

seedStarterProjectsIfEmpty();
await initAssets();

const server = Bun.serve({
  port: Number(process.env.PORT) || 3333,
  idleTimeout: 30,
  routes: {
    ...appRoutes,
    ...apiRoutes,
  },
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname.startsWith("/assets/")) {
      const cached = handleAssetRequest(url);
      if (cached) return cached;

      const file = Bun.file(`dist${url.pathname}`);
      if (await file.exists()) return new Response(file);
      return new Response("Asset not found", { status: 404 });
    }

    if (url.pathname.startsWith("/")) {
      const file = Bun.file(`public${url.pathname}`);
      if (await file.exists()) return new Response(file);
    }

    return new Response("Not found", { status: 404 });
  },
});

log.info("server", `Listening on port ${server.port}`);

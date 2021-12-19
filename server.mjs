import next from "next";
import shrinkRay from "shrink-ray-current";
import morgan from "morgan";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import Rollbar from "rollbar";

import { cacheControlPublicFiles } from "./middleware/long-cache.mjs";

// This is only for the Express part.
let rollbar = null;
if (process.env.ROLLBAR_ACCESS_TOKEN) {
  rollbar = new Rollbar({ accessToken: process.env.ROLLBAR_ACCESS_TOKEN });
  console.log("Rollbar access token enabled");
} else if (process.env.NODE_ENV !== "development") {
  console.warn("Rollbar access token NOT enabled!");
}

const BACKEND_BASE_URL = process.env.API_BASE || "http://127.0.0.1:8000";
const dev = process.env.NODE_ENV !== "production";
const port = parseInt(process.env.PORT || "3000", 10);
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(morgan(dev ? "dev" : "short"));
    // server.use(morgan("short"));
    server.use(shrinkRay());

    const backendProxy = createProxyMiddleware({
      target: BACKEND_BASE_URL,
      changeOrigin: true,
    });
    server.use("*/rss.xml", backendProxy);
    server.use("/robots.txt", backendProxy);
    server.use("/sitemap.xml", backendProxy);
    server.use("/avatar.random.png", backendProxy);
    server.use("/avatar.png", backendProxy);
    // If the server is localhost:3000 and the backend is https://www.peterbe.com
    // it might be a problem with cookies because that server will have `Secure`
    // in the `Set-Cookie` which won't be acceptable on http://localhost:3000
    server.use("/api/", backendProxy);
    server.use("/cache/", backendProxy);
    server.use("*/ping", backendProxy);
    // Legacy. Can probably delete later.
    server.use("*/submit", backendProxy);

    // These will be served via the Next server, but here's our chance
    // to givet them a long cache-control.
    server.use(cacheControlPublicFiles);

    server.use(handle);

    // Use the rollbar error handler to send exceptions to your rollbar account
    if (rollbar) server.use(rollbar.errorHandler());

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })

  // XXX Is this necessary?!
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

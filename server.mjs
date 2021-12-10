import next from "next";
import shrinkRay from "shrink-ray-current";
import morgan from "morgan";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

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
    server.use(shrinkRay());

    const backendProxy = createProxyMiddleware({
      target: BACKEND_BASE_URL,
      changeOrigin: true,
    });
    server.use("/rss.xml", backendProxy);
    // If the server is localhost:3000 and the backend is https://www.peterbe.com
    // it might be a problem with cookies because that server will have `Secure`
    // in the `Set-Cookie` which won't be acceptable on http://localhost:3000
    server.use("/api/", backendProxy);
    server.use("/cache/", backendProxy);
    server.use("*/ping", backendProxy);

    // It's important that this line comes *after* the setting up for the proxy
    // middleware for `/api/` above.
    // See https://github.com/chimurai/http-proxy-middleware/issues/40#issuecomment-163398924
    // server.use(express.urlencoded({ extended: true }));

    // server.head("/ping", (req, res) => {
    //   res.send("ping");
    // });

    server.get("/images/*", (req, res) => {
      res.setHeader("Cache-Control", "public,max-age=86400");
      return handle(req, res);
    });

    // XXX replace with middleware (aka. .use())
    server.head("*", (req, res) => {
      return handle(req, res);
    });
    server.put("*", (req, res) => {
      return handle(req, res);
    });
    server.get("*", (req, res) => {
      return handle(req, res);
    });

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

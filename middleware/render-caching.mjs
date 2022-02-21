import express from "express";
import QuickLRU from "quick-lru";
import dotenv from "dotenv";

dotenv.config();

const PURGE_SECRET = process.env.PURGE_SECRET || "";

const router = express.Router();

router.use(express.json());

// Doesn't need to be large because in production, the CDN should
// terminate the request once it's warmed up.
const MAX_AGE_MS = 1000 * 60; // 1min

const MAX_SIZE = 2000;

const cache = new QuickLRU({
  maxSize: MAX_SIZE,
  maxAge: MAX_AGE_MS,
  onEviction: (key) => {
    console.log(`LRU kicked out '${key}'`, cache.size);
  },
});

router.post("/__purge__", async function purgeCache(req, res, next) {
  const { body } = req;
  if (!body) {
    return res.status(400).send("No JSON post body");
  }
  let { pathnames } = body;
  if (!pathnames || !pathnames.length) {
    return res.status(400).send("No 'pathnames' in JSON body");
  }
  if (!Array.isArray(pathnames) && typeof pathnames === "string") {
    pathnames = [pathnames];
  }
  if (pathnames.find((x) => !x)) {
    return res.status(400).send("'pathnames' not array or empty entry");
  }

  if (PURGE_SECRET) {
    if (!req.headers.authorization) {
      return res.status(401).send("Unauthorized");
    }

    const bearer = req.headers.authorization;
    const token = bearer.replace("Bearer", "").trim();
    if (token !== PURGE_SECRET) {
      return res.status(403).send("Forbidden");
    }
  }

  const results = {};
  const purged = [];

  for (const pathname of pathnames) {
    for (const key of cache.keys()) {
      if (
        key === pathname ||
        (key.startsWith("/_next/data/") && key.includes(`${pathname}.json`))
      ) {
        cache.delete(key);
        purged.push(key);
      }
    }
    results[pathname] = purged;
  }
  console.log("PURGE RESULTS", results);
  res.json({ results });
});

const HEADER_NAME = "x-middleware-cache";

router.get("/*", async function renderCaching(req, res, next) {
  if (
    req.path.startsWith("/_next/image") ||
    req.path.startsWith("/_next/static")
  ) {
    return next();
  }

  const key =
    req.path.startsWith("/search") || req.path.startsWith("/_next/data")
      ? req.url
      : req.path;

  if (cache.has(key)) {
    res.setHeader(HEADER_NAME, "hit");
    const [body, headers] = cache.get(key);
    Object.entries(headers).forEach(([key, value]) => {
      if (key !== HEADER_NAME) res.setHeader(key, value);
    });
    return res.status(200).send(body);
  } else {
    res.setHeader(HEADER_NAME, "miss");
  }

  const originalEndFunc = res.end.bind(res);
  res.end = function (body) {
    if (body && res.statusCode === 200) {
      cache.set(key, [body, res.getHeaders()]);
    }
    return originalEndFunc(body);
  };

  next();
});

export default router;

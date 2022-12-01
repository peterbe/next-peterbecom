export function detectBadSearches(req, res, next) {
  if (req.url === "/_next/webpack-hmr") {
    return res.status(404).send("Not in development");
  }
  if (req.path === "/search" && req.query.q) {
    if (req.query.q.length >= 80) {
      return res.status(400).send("query too long");
    }
  }
  next();
}

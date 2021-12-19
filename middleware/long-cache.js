export function longCache(req, res, next) {
  console.log("PATH:", req.path);
  if (req.path === "/autocompeter/autocompeter.min.js") {
    res.setHeader("Cache-Control", "public,max-age=86400");
  }
  return next();
}

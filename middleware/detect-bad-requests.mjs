export function detectBadURIComponents(req, res, next) {
  try {
    decodeURIComponent(req.path);
  } catch (err) {
    if (err instanceof URIError) {
      return res.status(400).set("Content-Type", "text/plain").send("Bad path");
    }
    throw err;
  }
  next();
}

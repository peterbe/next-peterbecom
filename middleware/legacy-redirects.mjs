export function legacyRedirects(req, res, next) {
  if (req.query.comments === "all" || req.query.magmadomain) {
    // All these legacy `?comments=all`, redirect those
    return res.redirect(301, req.path);
  }

  // TODO: Consider to redirect all unknown query strings that aren't known.
  if (req.query.magmadomain) {
    // I don't know what these are or where they come from. But they
    // bypass the CDN cache.
    return res.redirect(301, req.path);
  }

  // Maybe turn all sorts of other junk query strings into redirects

  return next();
}

export function legacyRedirects(req, res, next) {
  // I have no idea where these came from but perhaps some bug during
  // the Next work. They'll 500 on the server if let through.
  if (req.path === "/plog/[oid]" || req.path === "/plog/[oid]/[page]") {
    return res.redirect(301, "/");
  }

  if (req.query.comments === "all") {
    // All these legacy `?comments=all`, redirect those
    return res.redirect(301, req.path);
  }

  // TODO: Consider to redirect all unknown query strings that aren't known.
  if (req.query.magmadomain || req.query.author) {
    // I don't know what these are or where they come from. But they
    // bypass the CDN cache.
    return res.redirect(301, req.path);
  }

  // Maybe turn all sorts of other junk query strings into redirects

  return next();
}

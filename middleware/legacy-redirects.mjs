export function legacyRedirects(req, res, next) {
  if (req.query.comments === "all") {
    // All these legacy `?comments=all`, redirect those
    return res.redirect(301, req.path);
  }

  // Maybe turn all sorts of other junk query strings into redirects

  return next();
}

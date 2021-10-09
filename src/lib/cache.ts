import type { ServerResponse } from "http";

export function cacheHeader(
  res: ServerResponse,
  cacheControl = "public,max-age=86400"
) {
  if (process.env.NODE_ENV !== "development") {
    res.setHeader("Cache-Control", cacheControl);
  }
}

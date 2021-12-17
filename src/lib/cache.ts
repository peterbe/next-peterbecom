import type { ServerResponse } from "http";

export function cacheHeader(
  res: ServerResponse,
  cacheControl = "public,max-age=43200" // 12h
) {
  if (process.env.NODE_ENV !== "development") {
    res.setHeader("Cache-Control", cacheControl);
  }
}

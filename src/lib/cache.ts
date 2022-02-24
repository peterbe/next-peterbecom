import type { ServerResponse } from "http";

export function cacheHeader(
  res: ServerResponse,
  cacheControl: string | number = "public,max-age=43200" // 12h
) {
  if (process.env.NODE_ENV !== "development" && res.statusCode < 400) {
    if (typeof cacheControl === "number") {
      if (cacheControl > 0) {
        cacheControl = `public,max-age=${cacheControl}`;
      } else {
        cacheControl = `private,max-age=0`;
      }
    }
    res.setHeader("Cache-Control", cacheControl);
  }
}

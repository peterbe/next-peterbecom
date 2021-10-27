export const USE_GOOGLE_ANALYTICS = process.env.NODE_ENV !== "development";
// export const USE_GOOGLE_ANALYTICS = true;
export const GOOGLE_ANALYTICS_DEBUG = false;

export const API_BASE = process.env.API_BASE || "http://127.0.0.1:8000";
if (!API_BASE) throw new Error("$API_BASE must be set");

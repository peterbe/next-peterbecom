import { useRouter } from "next/router";

export function useQueryString(name: string) {
  let value: string | undefined;
  const { query } = useRouter();
  const v = query[name];
  if (v) {
    if (Array.isArray(v)) return v[0];
    return v;
  }
  return value;
}

export function useQueryBoolean(name: string) {
  const v = useQueryString(name);
  return v === "true" || v === "1";
}

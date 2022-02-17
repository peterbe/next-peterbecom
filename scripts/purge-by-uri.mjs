#!/usr/bin/env node

import got from "got";

const PURGE_URL = (process.env.PURGE_URL = "http://localhost:3000/__purge__");
const PURGE_SECRET = process.env.PURGE_SECRET || "";

main(process.argv.slice(2));

async function main(uris) {
  if (!uris.length) throw new Error("No URIs? Really??!");

  const pathnames = [];
  for (const uri of uris) {
    const url = new URL(uri, "http://example.com");
    const { pathname } = url;
    pathnames.push(pathname);
  }
  const headers = {};
  if (PURGE_SECRET) {
    headers.Authorization = `Bearer ${PURGE_SECRET}`;
  }
  const response = await got.post(PURGE_URL, {
    headers,
    json: {
      pathnames,
    },
    timeout: {
      request: 3000,
    },
    throwHttpErrors: false,
  });

  // TODO: Why doesn't `response.json()` work??
  if (response.statusCode === 200) {
    const result = JSON.parse(response.body);
    console.log(JSON.stringify(result, undefined, 2));
  } else {
    console.error(response.body);
    throw new Error(response.statusCode);
  }
}

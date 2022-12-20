import { test } from "uvu";
import * as assert from "uvu/assert";
import got from "got";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

async function get(uri, followRedirect = false, throwHttpErrors = false) {
  return got(BASE_URL + uri, { followRedirect, throwHttpErrors });
}

function isCached(res) {
  const cc = res.headers["cache-control"];
  if (!cc) return false;
  const maxAge = parseInt(cc.match(/max-age=(\d+)/)[1], 10);
  return maxAge > 0 && /public/.test(cc);
}

test("home page", async () => {
  const response = await get("/");
  assert.is(response.statusCode, 200);
  assert.ok(isCached(response));
  assert.is(response.headers["content-encoding"], "br");
});

test("middleware caching", async () => {
  let response = await get("/");
  assert.is(response.statusCode, 200);
  const etagFirst = response.headers["etag"];
  response = await get("/");
  assert.is(response.statusCode, 200);
  assert.is(response.headers["x-middleware-cache"], "hit");
  assert.is(response.headers["etag"], etagFirst);

  response = await get("/about");
  assert.is(response.statusCode, 200);
  response = await get("/about");
  assert.is(response.statusCode, 200);
  assert.is(response.headers["x-middleware-cache"], "hit");

  response = await get(`/search?q=${Math.random()}`);
  assert.is(response.statusCode, 200);
  assert.is(response.headers["x-middleware-cache"], "miss");
  response = await get(`/search?q=${Math.random()}`);
  assert.is(response.statusCode, 200);
  assert.is(response.headers["x-middleware-cache"], "hit");

  response = await get("/search?q=zope");
  assert.is(response.statusCode, 200);
  response = await get("/search?q=zope");
  assert.is(response.statusCode, 200);
  assert.is(response.headers["x-middleware-cache"], "hit");

  response = await get("/oc-JavaScript/p2");
  assert.is(response.statusCode, 200);
  response = await get("/oc-JavaScript/p2");
  assert.is(response.statusCode, 200);
  assert.is(response.headers["x-middleware-cache"], "hit");
});

test("home page (page 2)", async () => {
  const response = await get("/p2");
  assert.is(response.statusCode, 200);
  assert.ok(isCached(response));
});

test("plog archive page", async () => {
  const response = await get("/plog");
  assert.is(response.statusCode, 200);
  assert.ok(isCached(response));
});

test("about page", async () => {
  const response = await get("/about");
  assert.is(response.statusCode, 200);
  assert.ok(isCached(response));
});

test("contact page", async () => {
  const response = await get("/contact");
  assert.is(response.statusCode, 200);
  assert.ok(isCached(response));
});

test("filter home page by category", async () => {
  const response = await get("/oc-JavaScript");
  assert.is(response.statusCode, 200);
  assert.ok(isCached(response));
});

test("filter home page by category (page 2)", async () => {
  const response = await get("/oc-JavaScript/p2");
  assert.is(response.statusCode, 200);
  assert.ok(isCached(response));
});

test("filter home page by bad category", async () => {
  const response = await get("/oc-Neverheardof");
  assert.is(response.statusCode, 404);
  assert.ok(!isCached(response));
});

test("redirect to correct case of oc categoru", async () => {
  const response = await get("/oc-jAVAsCRIPT");
  assert.is(response.statusCode, 308);
  assert.is(response.headers["location"], "/oc-JavaScript");
});

test("lyrics post page", async () => {
  const response = await get("/plog/blogitem-040601-1");
  assert.is(response.statusCode, 200);
  assert.ok(isCached(response));
});

test("lyrics post page (page 2)", async () => {
  const response = await get("/plog/blogitem-040601-1/p2");
  assert.is(response.statusCode, 200);
  assert.ok(isCached(response));
});

test("certain query strings cause a redirect", async () => {
  for (const querystring of ["comments=all", "magmadomain=something"]) {
    const response = await get(`/anything?${querystring}`);
    assert.is(response.statusCode, 301);
    assert.is(response.headers["location"], "/anything");
  }
});

test("public static assets", async () => {
  const response = await get("/favicon.ico");
  assert.is(response.statusCode, 200);
  assert.ok(isCached(response));
  assert.is(response.headers["content-type"], "image/x-icon");
});

test("404'ing should not be cached", async () => {
  const response = await get("/plog/thisdoesnotexist");
  assert.is(response.statusCode, 404);
  assert.ok(!isCached(response));
});

test.run();

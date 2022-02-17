import express from "express";

const router = express.Router();

router.post("/__purge__", async function purgeCache(req, res, next) {
  console.log("PURGE FOR", req.query);
  next();
});

router.get("/*", async function getSearch(req, res, next) {
  console.log(req.path);
  next();
});

export default router;

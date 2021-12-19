import fs from "fs";
import path from "path";

const publicFiles = new Set();

walk("public");

function walk(root, originalRoot = null) {
  originalRoot = originalRoot || root;
  for (const dirent of fs.readdirSync(root, { withFileTypes: true })) {
    const filepath = path.join(root, dirent.name);
    if (dirent.isDirectory()) {
      walk(filepath, originalRoot);
    } else {
      publicFiles.add(filepath.replace(originalRoot, ""));
    }
  }
}

export function cacheControlPublicFiles(req, res, next) {
  if (publicFiles.has(req.path)) {
    res.setHeader("Cache-Control", "public,max-age=86400");
  }
  return next();
}

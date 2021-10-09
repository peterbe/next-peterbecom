import fs from "fs";
import path from "path";
import { brotliCompressSync } from "zlib";

main();

function main() {
  walk(process.argv[2]);
}

function walk(root) {
  const things = fs.readdirSync(root, { withFileTypes: true });
  for (const thing of things) {
    if (thing.isDirectory()) {
      walk(path.join(root, thing.name));
    } else if (thing.isFile()) {
      const filepath = path.join(root, thing.name);

      if ([".css", ".js", ".json"].includes(path.extname(filepath))) {
        const stats = fs.statSync(filepath);
        if (stats.size > 1000) {
          const buffer = fs.readFileSync(filepath);
          const compresedBuffer = brotliCompressSync(buffer);
          const compressedFilepath = filepath + ".br";
          fs.writeFileSync(compressedFilepath, compresedBuffer);
          const compressedStats = fs.statSync(compressedFilepath);
          const ratio = 1 - compressedStats.size / stats.size;
          console.log(
            filepath,
            kb(stats.size),
            "->",
            kb(compressedStats.size),
            percent(ratio),
            "smaller"
          );
        }
      }
    }
  }
}

function kb(bytes) {
  return `${(bytes / 1024).toFixed(1)}KB`;
}

function percent(ratio) {
  return `${(100 * ratio).toFixed(0)}%`;
}

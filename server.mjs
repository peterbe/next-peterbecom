import next from "next";
import morgan from "morgan";
import express from "express";

const dev = process.env.NODE_ENV !== "production";
const port = parseInt(process.env.PORT || "3000", 10);
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(morgan("tiny"));

    server.put("*", (req, res) => {
      return handle(req, res);
    });
    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })

  // XXX Is this necessary?!
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

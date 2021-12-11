import type { NextApiResponse, NextApiRequest } from "next";
import Rollbar from "rollbar";

import Custom500 from "../components/500";
import Custom404 from "../components/404";

let rollbar: Rollbar | null = null;
if (process.env.ROLLBAR_ACCESS_TOKEN) {
  rollbar = new Rollbar({
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    // captureUncaught: true,
    // captureUnhandledRejections: true
  });
  console.log("Rollbar access token enabled");
} else if (process.env.NODE_ENV !== "development") {
  console.warn("Rollbar access token NOT enabled!");
}

function Error({ statusCode }: { statusCode: number }) {
  if (statusCode >= 400 && statusCode < 500) return <Custom404 />;
  return <Custom500 />;
}

Error.getInitialProps = ({
  req,
  res,
  err,
}: {
  err: Error;
  // I don't think these two are right but it seems to work.
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  // console.log("Custom error:", { statusCode, hasError: !!err });

  // 'err' will by falsy if it's a 404
  if (rollbar && err) {
    rollbar.error(err, req);
  }

  return { statusCode };
};

export default Error;

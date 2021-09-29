// https://nextjs.org/docs/api-reference/next.config.js/introduction

const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
/** @type {import('next').NextConfig} */
module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
      async rewrites() {
        return [
          {
            source: "/api/:path*",
            destination: "http://localhost:8000/api/:path*",
          },
        ];
      },
    };
  }

  return {
    /* config options for all phases except development here */
  };
};
// module.exports = {
//   reactStrictMode: true,
// }

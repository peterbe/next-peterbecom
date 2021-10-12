// https://nextjs.org/docs/api-reference/next.config.js/introduction

const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const BACKEND_BASE_URL =
  process.env.BACKEND_BASE_URL || "http://localhost:8000";

const REWRITES = [
  {
    source: "/rss.xml",
    destination: `${BACKEND_BASE_URL}/rss.xml`,
  },
  {
    source: "/api/:path*",
    destination: `${BACKEND_BASE_URL}/api/:path*`,
  },
  {
    source: "/cache/:path*",
    destination: `${BACKEND_BASE_URL}/cache/:path*`,
  },
  {
    source: "/:path*/ping",
    destination: `${BACKEND_BASE_URL}/:path*/ping`,
  },
];

/** @type {import('next').NextConfig} */
module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
      async rewrites() {
        return [
          ...REWRITES,
          // {
          //   source: "/api/:path*",
          //   destination: `${BACKEND_BASE_URL}/api/:path*`,
          // },
        ];
      },
    };
  }

  return {
    /* config options for all phases except development here */

    i18n: {
      locales: ["en"],
      defaultLocale: "en",
    },

    experimental: { optimizeCss: true },

    // https://nextjs.org/docs/api-reference/next.config.js/disabling-x-powered-by
    poweredByHeader: false,

    async rewrites() {
      return REWRITES;
    },
  };
};

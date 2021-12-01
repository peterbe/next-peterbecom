// https://nextjs.org/docs/api-reference/next.config.js/introduction

// const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const BACKEND_BASE_URL = process.env.API_BASE || "http://127.0.0.1:8000";

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
  // console.log({ phase, PHASE_DEVELOPMENT_SERVER });
  // if (phase === PHASE_DEVELOPMENT_SERVER) {
  //   return {
  //     /* development only config options here */
  //     async rewrites() {
  //       return [
  //         ...REWRITES,
  //         // {
  //         //   source: "/api/:path*",
  //         //   destination: `${BACKEND_BASE_URL}/api/:path*`,
  //         // },
  //       ];
  //     },
  //   };
  // }

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

    // https://nextjs.org/docs/advanced-features/source-maps
    productionBrowserSourceMaps: false, // disabled because I can't think of a reason to keep it on

    // https://nextjs.org/docs/api-reference/next.config.js/compression
    // If you don't do this, the `shrink-ray-current` middleware can't do
    // its thing.
    compress: false,
  };
};

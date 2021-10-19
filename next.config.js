const { getRedirectStatus } = require("next/dist/lib/load-custom-routes");

const DEFAULT_PAGE = "/products";

module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: DEFAULT_PAGE,
        permanent: true,
      },
    ];
  },
};

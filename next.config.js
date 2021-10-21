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
  images: {
    domains: ["raw.githubusercontent.com"],
  },
};

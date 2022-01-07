const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const withTM = require("next-transpile-modules")([
  "@blocto/sdk",
  "@project-serum/sol-wallet-adapter",
]);

const nextConfig = {
  reactStrictMode: true,
  webpack5: true,
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    runtimeCaching,
  },
  images: {
    domains: ["arweave.net", "ipfs.io"],
  },
};

module.exports = withPWA(withTM(nextConfig));

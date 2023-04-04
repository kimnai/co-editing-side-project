/** @type {import('next').NextConfig} */

const publicRuntimeConfig = {
  BACKEND_API: process.env.API_ENDPOINT,
};

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig,
  async rewrites() {
    return [
      {
        source: `${process.env.API_ENDPOINT}/:path*`,
        destination: `${process.env.BACKEND_HTTP_ADDRESS}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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

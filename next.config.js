/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'driveapistorage.blob.core.windows.net',
      },
    ],
  },
  async rewrites() {
    return {
      afterFiles: [
        {
          source: '/api/:path*',
          destination: `${process.env.API_BASE_URL}/api/:path*`,
        },
      ],
    }
  },
}

module.exports = nextConfig

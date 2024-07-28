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
  webpack: (config) => {
    // Workaround for Tailwind dark mode resolution with CSS modules
    // https://github.com/tailwindlabs/tailwindcss/discussions/3109#discussioncomment-7603842
    const rules = config.module.rules.find((r) => !!r.oneOf)

    rules.oneOf.forEach((loaders) => {
      if (Array.isArray(loaders.use)) {
        loaders.use.forEach((loader) => {
          const isCssLoader =
            typeof loader?.loader === 'string' &&
            /(?<!post)css-loader/.test(loader?.loader)
          const hasGetLocalIdent = !!loader?.options?.modules?.getLocalIdent

          if (isCssLoader && hasGetLocalIdent) {
            const { getLocalIdent } = loader.options.modules

            if (getLocalIdent) {
              loader.options.modules.getLocalIdent = (...args) => {
                if (args.includes('dark')) return 'dark'
                return getLocalIdent(...args)
              }
            }
          }
        })
      }
    })
    return config
  },
}

module.exports = nextConfig

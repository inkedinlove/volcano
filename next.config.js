/** @type {import('next').NextConfig} */

const nextConfig = {
  // your next.js configuration options
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'images.unsplash.com',
      'izkohedcagagpmxongyf.supabase.in',
      'lh3.googleusercontent.com',
      'assets.coingecko.com'
    ],
    minimumCacheTTL: 60 * 60 * 24,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig

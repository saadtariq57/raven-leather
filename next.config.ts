// /** @type {import('next').NextConfig} */
// const nextConfig = {
  
//   images: {
//     domains: ["res.cloudinary.com"], // ✅ Add Cloudinary's domain here
//   },
// };

// module.exports = nextConfig;

// next.config.ts
import { NextConfig } from 'next'
import withBundleAnalyzer from '@next/bundle-analyzer'

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // ✅ Add Cloudinary's domain here
  },
  reactStrictMode: true, // Optional, but helps with identifying issues
}

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig)

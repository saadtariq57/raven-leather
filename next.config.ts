// /** @type {import('next').NextConfig} */
// const nextConfig = {
  
//   images: {
//     domains: ["res.cloudinary.com"], // ✅ Add Cloudinary's domain here
//   },
// };

// module.exports = nextConfig;

// next.config.ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Disable type checking during the build process
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['res.cloudinary.com'], // ✅ Add Cloudinary's domain here
  },
  reactStrictMode: true, // Optional, but helps with identifying issues
};

export default nextConfig;
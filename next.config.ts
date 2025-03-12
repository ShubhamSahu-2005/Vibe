/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  // appDir is now enabled by default in Next.js 13.4 and later
  // so we can remove the experimental config
  output: "standalone", // Ensures API routes are included in deployment
}

module.exports = nextConfig

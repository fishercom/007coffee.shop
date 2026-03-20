/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ]
  },
  // Enable PostCSS support (usually enabled by default, but explicit can help)
  experimental: {
    // This option might be needed for older Next.js versions or specific setups
    // For newer versions, PostCSS is typically handled automatically
    // remove if it causes issues
    // postcss: true, 
  },
};

module.exports = nextConfig;

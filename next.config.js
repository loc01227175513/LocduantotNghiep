/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'laptrinhkid.com',
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
      'encrypted-tbn0.gstatic.com',
      'your-image-domain.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  webpack: (config, { dev, isServer }) => {
    // Only disable source maps in production
    if (!dev && !isServer) {
      config.devtool = 'source-map';
    }

    // Revert devtool to false in development mode to avoid performance issues
    if (dev) {
      config.devtool = false;
    }

    return config;
  },
}

module.exports = nextConfig
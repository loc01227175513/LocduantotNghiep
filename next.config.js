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
      config.devtool = false;
    }
    
    // Handle source maps properly in development
    if (dev) {
      config.devtool = 'eval-source-map';
    }
    
    return config;
  },
}

module.exports = nextConfig
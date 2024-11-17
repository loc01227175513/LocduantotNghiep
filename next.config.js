/**  @type {import('next'). NextConfig}  */
const nextConfig = {
  images: {
    domains: ['via.placeholder.com', 'res.cloudinary.com', 'scontent-atl3-2.xx.fbcdn.net', 'png.pngtree.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.ico$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'static/',
        publicPath: '/_next/static/',
      },
    });
    return config;
  },
};

module.exports = nextConfig;
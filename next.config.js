/**  @type {import('next').NextConfig}  */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
      {
        protocol: 'https',
        hostname: 'scontent-atl3-2.xx.fbcdn.net'
      },
      {
        protocol: 'https',
        hostname: 'png.pngtree.com'
      },
      {
        protocol: 'https',
        hostname: 'th.bing.com'
      },
      {
        protocol: 'https',
        hostname: 'frontends.udemycdn.com'
      },
      {
        protocol: 'https',
        hostname: 'cdn.vus.edu.vn'
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com' // Add this entry
      },
    ],
  },
  webpack(config, { dev }) {
    if (dev) {
      config.devtool = 'eval-source-map';
    } else {
      config.devtool = false;
    }
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
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
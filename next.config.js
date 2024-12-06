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
}

module.exports = nextConfig
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'laptrinhkid.com',
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
      'encrypted-tbn0.gstatic.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
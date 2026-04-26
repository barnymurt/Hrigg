/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hazelriggenterprises.co.uk',
      },
      {
        protocol: 'https',
        hostname: '**.hazelriggenterprises.co.uk',
      },
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig
/** @type {import('next').NextConfig} */
const nextConfig = { 
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['jorgim-ecommerce.s3.sa-east-1.amazonaws.com'], 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jorgim-ecommerce.s3.sa-east-1.amazonaws.com',
      },
    ],
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_WP_HOSTNAME || 'bk.puralpha.fr',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

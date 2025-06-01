/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com', // For Prime Video logo
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com', // For YouTube thumbnails
      },
      {
        protocol: 'https',
        hostname: 'cdn.kinocheck.com', // For Kinocheck thumbnails
      },
    ],
  },
};

export default nextConfig;

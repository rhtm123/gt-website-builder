/** @type {import('next').NextConfig} */

// const path = require('path');
import path from 'path';

const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: '/docs',
        destination: '/docs/index.html',
      },
      {
        source: '/docs/:path*',
        destination: '/docs/:path*/index.html',
      },
    ];
  },
  webpack(config) {
    config.resolve.alias['@docs'] = path.join(process.cwd(), 'public/docs');
    return config;
  },


  env: {
    API_URL: process.env.API_URL,
    // HOSTNAME: process.env.HOSTNAME,
    // API_PYTHON_CODE_URL:process.env.API_PYTHON_CODE_URL,
    // EDITOR_HANDLE_URL:process.env.EDITOR_HANDLE_URL,
    // LAB_SITE:process.env.LAB_SITE,
  },
};

export default nextConfig;

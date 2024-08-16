/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {
    API_URL: process.env.API_URL,
    // HOSTNAME: process.env.HOSTNAME,
    // API_PYTHON_CODE_URL:process.env.API_PYTHON_CODE_URL,
    // EDITOR_HANDLE_URL:process.env.EDITOR_HANDLE_URL,
    // LAB_SITE:process.env.LAB_SITE,
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async rewrites() {
    // the prototype is a static app served out of /public/app
    return [{ source: '/app', destination: '/app/index.html' }];
  },
  async redirects() {
    return [
      { source: '/demo', destination: '/app/', permanent: false },
      { source: '/merchant', destination: '/app/#/m/home', permanent: false },
    ];
  },
};
export default nextConfig;

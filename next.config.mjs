/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The prototype in /public/app is a plain static app whose assets are
  // referenced relatively (css/app.css, js/store.js). Serving it at "/app"
  // would resolve those to "/css/..." and 404, so "/app" redirects to the
  // directory form "/app/" where the relative paths are correct.
  async redirects() {
    return [
      { source: '/app', destination: '/app/', permanent: false },
      { source: '/demo', destination: '/app/', permanent: false },
      { source: '/merchant', destination: '/app/#/m/home', permanent: false },
    ];
  },
};
export default nextConfig;

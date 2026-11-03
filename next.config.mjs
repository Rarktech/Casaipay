/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The prototype in /public/app is a plain static app. Its assets are now
  // referenced absolutely (/app/css/..., /app/js/...), so it renders correctly
  // whether the URL carries a trailing slash or not. "/app" is rewritten to the
  // index rather than redirected: a redirect to "/app/" fights Next's default
  // trailing-slash normalisation and produces a redirect loop.
  async rewrites() {
    return [{ source: '/app', destination: '/app/index.html' }];
  },
  async redirects() {
    return [
      { source: '/demo', destination: '/app', permanent: false },
      { source: '/merchant', destination: '/app#/m/home', permanent: false },
    ];
  },
};
export default nextConfig;

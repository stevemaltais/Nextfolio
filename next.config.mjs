import 'dotenv/config';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.stevemaltais.dev',
        pathname: '**',
      },
    ],
  },
  compress: true,
  productionBrowserSourceMaps: false,

  async redirects() {
    return [
      // Redirection www vers la version sans www
      {
        source: '/(.*)',
        has: [{ type: 'host', value: 'www.stevemaltais.dev' }],
        destination: 'https://stevemaltais.dev/:path*',
        permanent: true,  // Redirection 301 permanente
      },
      // Redirection de /cv.html vers /curriculum
      {
        source: '/cv.html',
        destination: '/curriculum',  // Redirige vers la nouvelle page du CV
        permanent: true,  // Redirection 301 permanente
      },
    ];
  }
};

export default nextConfig;

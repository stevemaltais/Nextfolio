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

  // Ajout des redirections
  async redirects() {
    return [
      {
        source: '/(.*)',  // Redirige toutes les pages
        has: [
          {
            type: 'host',
            value: 'stevemaltais.dev',  // Rediriger seulement le domaine sans "www"
          },
        ],
        destination: 'https://www.stevemaltais.dev/:path*',  // Destination avec "www"
        permanent: true,  // Redirection 301
      },
      {
        source: '/www/(.*)', // Empêche la redirection des URLs déjà avec "www"
        has: [
          {
            type: 'host',
            value: 'www.stevemaltais.dev',
          },
        ],
        destination: '/:path*', // Ne pas rediriger
        permanent: false, // Pas de redirection
      },
    ];
  },
};

export default nextConfig;

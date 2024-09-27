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
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'stevemaltais.dev', // Si le domaine sans www est appelé
          },
        ],
        destination: 'https://www.stevemaltais.dev/:path*', // Redirige vers www.stevemaltais.dev
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

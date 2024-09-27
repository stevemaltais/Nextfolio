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
        source: '/:path*',  // Redirige toutes les pages
        has: [
          {
            type: 'host',
            value: 'stevemaltais.dev',  // Redirige si le domaine est sans "www"
          },
        ],
        destination: 'https://www.stevemaltais.dev/:path*',  // Destination avec "www"
        permanent: true,  // Redirection 301
      },
    ];
  },
};

export default nextConfig;

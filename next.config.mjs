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
            value: 'stevemaltais.dev',  // Seulement rediriger si l'URL est sans "www"
          },
        ],
        destination: 'https://www.stevemaltais.dev/:path*',  // Destination avec "www"
        permanent: true,  // Redirection 301
      },
      // Assurez-vous que le domaine avec "www" ne soit pas redirigé à nouveau
    ];
  },
};

export default nextConfig;

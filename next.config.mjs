import 'dotenv/config';

/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  
  // Gestion des images distantes, ici pour l'API sur un sous-domaine
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.stevemaltais.dev',
        pathname: '**',
      },
    ],
  },
  
  // Compression des réponses HTTP pour des performances améliorées
  compress: true,
  
  // Désactivation des source maps en production pour éviter de révéler des informations sensibles
  productionBrowserSourceMaps: !isProduction,

  // Configuration des redirections
  async redirects() {
    return [
      // Redirection de www vers sans www
      {
        source: '/(.*)',
        has: [{ type: 'host', value: 'www.stevemaltais.dev' }],
        destination: 'https://stevemaltais.dev/:path*',
        permanent: true,  // Redirection 301 permanente
      },
      // Redirection de /cv.html vers /curriculum
      {
        source: '/cv.html',
        destination: '/curriculum',
        permanent: true,  // Redirection 301 permanente
      },
      // Redirection de /blog sans slash vers /blog avec slash
      {
        source: '/blog',
        destination: '/blog/',
        permanent: true,  // Redirection 301 permanente
      },
    ];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.stevemaltais.dev'], // Remplacez 'exemple.com' par le domaine de votre API ou des images que vous voulez autoriser
  },
};

export default nextConfig;

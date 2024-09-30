import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL, 
  cache: new InMemoryCache({
    typePolicies: {
      Projet: {
        keyFields: ['id'], // Utilise l'ID du projet comme clé unique
        fields: {
          detailsDuProjet: {
            merge(existing, incoming) {
              return { ...existing, ...incoming }; // Fusionne les données entrantes avec celles existantes
            },
          },
          etudeDeCas: {
            merge(existing, incoming) {
              return { ...existing, ...incoming }; // Fusion pour éviter les conflits
            },
          },
        },
      },
      Technologie: {
        keyFields: ['id'], // Identifie chaque technologie avec son ID
      },
    },
  }),
});

export default client;

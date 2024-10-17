import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
  cache: new InMemoryCache({
    typePolicies: {
      Projet: {
        keyFields: ['id'], // Utilise l'ID du projet comme clé unique
        fields: {
          detailsDuProjet: {
            merge(existing = {}, incoming) {
              return { ...existing, ...incoming };
            },
          },
          etudeDeCas: {
            merge(existing = {}, incoming) {
              return { ...existing, ...incoming };
            },
          },
        },
      },
      Technologie: {
        keyFields: ['id'], // Utilise l'ID de la technologie comme clé unique
      },
    },
  }),
});

export default client;

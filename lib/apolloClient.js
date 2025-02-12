import { ApolloClient, InMemoryCache } from '@apollo/client';

const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
const IS_MAINTENANCE = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

const client = IS_MAINTENANCE
  ? null  // Désactive Apollo si la maintenance est activée
  : new ApolloClient({
      uri: GRAPHQL_API_URL,
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

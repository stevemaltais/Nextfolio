import client from '@/lib/apolloClient';
import { gql } from '@apollo/client';

const IS_MAINTENANCE = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

// Fonction helper pour bloquer les requêtes en mode maintenance
const checkMaintenanceMode = () => {
  if (IS_MAINTENANCE) {
    console.warn("🔧 Mode maintenance activé, aucune requête API envoyée.");
    return true;
  }
  return false;
};

// Requête pour la page d'accueil (liste des projets)
export async function getStaticProps() {
  if (checkMaintenanceMode()) return { props: { projets: [] } };

  try {
    const { data } = await client.query({
      query: gql`
      query projets {
        projets(first: 10) {
          nodes {
            title
            id
            slug
            detailsDuProjet {
              titreCourtDuProjet
              descriptionCourteDuProjet
              categorieDuProjet
              anneeDuProjet
            }
            featuredImage {
              node {
                mediaItemUrl
              }
            }
            etudeDeCas {
              mockupimage {
                node {
                  sourceUrl
                }
              }
              urlDuProjet
              technologiesutilisees {
                nodes {
                  ... on Technologie {
                    id
                    title
                    slug
                  }
                }
              }
            }
            champsSeo {
              descriptionSeo
              titreSeo
              technologiePrincipale
            }
          }
        }
      }
      `,
    });

    return {
      props: { projets: data.projets.nodes },
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    return { props: { projets: [] } };
  }
}

// Exemple pour fetchProjectBySlug
export const getProjectBySlug = async (slug) => {
  if (checkMaintenanceMode()) return null;

  try {
    const { data } = await client.query({
      query: gql`
      query ProjectBySlug($slug: String!) {
        projetBy(slug: $slug) {
          title
          id
          slug
          detailsDuProjet {
            titreCourtDuProjet
            descriptionCourteDuProjet
            categorieDuProjet
            anneeDuProjet
          }
        }
      }
      `,
      variables: { slug },
    });

    return data?.projetBy ?? null;
  } catch (error) {
    console.error("Erreur lors de la récupération du projet:", error);
    return null;
  }
};

// Même chose pour fetchTechnologiesByCategory
export const fetchTechnologiesByCategory = async () => {
  if (checkMaintenanceMode()) return [];

  try {
    const { data } = await client.query({
      query: gql`
      query GetTechnologiesByCategory {
        categoriesDeTechnologie {
          nodes {
            id
            name
            slug
          }
        }
      }
      `,
    });

    return data?.categoriesDeTechnologie?.nodes ?? [];
  } catch (error) {
    console.error("Erreur lors de la récupération des technologies:", error);
    return [];
  }
};

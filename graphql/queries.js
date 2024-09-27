import { gql } from '@apollo/client';
import client from '@/lib/apolloClient';

// Requête pour la page d'accueil (liste des projets)
export async function getStaticProps() {
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
          }
        }
      }
      `,
    });

    // Vérifier les projets récupérés
    console.log('Projets récupérés:', data.projets.nodes);

    return {
      props: {
        projets: data.projets.nodes, // Retourner les projets dans les props
      },
      revalidate: 60,  // Revalider toutes les 60 secondes
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    return {
      notFound: true,  // Si erreur, renvoyer la page 404
    };
  }
}

export const getProjectBySlug = async (slug) => {
  try {
    const { data } = await client.query({
      query: gql`
        query ProjectBySlug($slug: String!) {
          projetBy(slug: $slug) {
            title
            id
            content
            slug
            detailsDuProjet {
              titreCourtDuProjet
              descriptionCourteDuProjet
              categorieDuProjet
              anneeDuProjet
            }
            etudeDeCas {
              descriptionDuProjet
              technologiesutilisees {
                nodes {
                  ... on Technologie {
                    id
                    title
                    slug
                  }
                }
              }
              urlDuProjet
              problemeAResoudre
              solutionProposee
              processusDeDeveloppement
              fonctionnalitesCles
              imageDuProjet {
                node {
                  mediaItemUrl
                }
              }
              mockupimage {
                node {
                  sourceUrl
                }
              }
            }
            featuredImage {
              node {
                mediaItemUrl
              }
            }
          }
        }
      `,
      variables: { slug },
    });

    if (!data || !data.projetBy) {
      return null;  // Retourner null si aucun projet n'est trouvé
    }

    return data.projetBy;
  } catch (error) {
    console.error('Erreur lors de la récupération du projet par slug:', error);
    return null;
  }
};

// Requête pour récupérer les slugs des projets
export const fetchProjectSlugs = async () => {
  try {
    const { data } = await client.query({
      query: gql`
        query GetAllProjectSlugs {
          projets {
            nodes {
              slug
            }
          }
        }
      `,
    });

    if (!data || !data.projets) {
      return [];
    }

    return data.projets.nodes.map((node) => node.slug);
  } catch (error) {
    console.error('Erreur lors de la récupération des slugs:', error);
    return [];
  }
};

// Requête pour récupérer les slugs des technologies
export const fetchTechSlugs = async () => {
  try {
    const { data } = await client.query({
      query: gql`
        query GetAllTechSlugs {
          technologies {
            nodes {
              slug
            }
          }
        }
      `,
    });

    if (!data || !data.technologies) {
      return [];
    }

    return data.technologies.nodes.map((node) => node.slug);
  } catch (error) {
    console.error('Erreur lors de la récupération des slugs de technologies:', error);
    return [];
  }
};

// Requête pour récupérer les détails d'une technologie spécifique
export const fetchTechDetails = async (techSlug) => {
  try {
    const { data } = await client.query({
      query: gql`
        query GetTechDetails($slug: String!) {
          technologieBy(slug: $slug) {
            title
            id
            content
          }
        }
      `,
      variables: { slug: techSlug },
    });

    if (!data || !data.technologieBy) {
      return null;
    }

    return data.technologieBy;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de la technologie:', error);
    return null;
  }
};

// Requête pour récupérer des projets par technologie
export const fetchProjectsByTech = async (techSlug) => {
  try {
    const { data } = await client.query({
      query: gql`
        query GetProjectsByTech {
          projets {
            nodes {
              title
              id
              slug
              detailsDuProjet {
                descriptionCourteDuProjet
              }
              etudeDeCas {
                technologiesutilisees {
                  nodes {
                    ... on Technologie {
                      slug
                      title
                    }
                  }
                }
              }
              featuredImage {
                node {
                  mediaItemUrl
                }
              }
            }
          }
        }
      `,
    });

    if (!data || !data.projets) {
      return [];
    }

    // Filtrer les projets pour ceux qui contiennent la technologie avec le slug spécifié
    const filteredProjects = data.projets.nodes.filter((project) =>
      project.etudeDeCas?.technologiesutilisees?.nodes?.some(
        (tech) => tech.slug.toLowerCase() === techSlug.toLowerCase()
      )
    );

    return filteredProjects;
  } catch (error) {
    console.error('Erreur lors de la récupération des projets par technologie:', error);
    return [];
  }
};
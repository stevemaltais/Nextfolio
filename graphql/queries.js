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

    console.log('Données projets récupérées:', data.projets.nodes); // Ajouter un log ici

    return {
      props: {
        projets: data.projets.nodes, // Retourner les projets dans les props
      },
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    return {
      notFound: true,
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
              id
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
          technologies(first: 100) {
            nodes {
              id
              slug
            }
          }
        }
      `,
    });

    if (!data || !data.technologies) {
      return [];
    }

    // Log the slugs to check if the missing ones are here
    console.log('Slugs récupérés :', data.technologies.nodes.map((node) => node.slug));

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
            slug
            content
          }
        }
      `,
      variables: { slug: techSlug },
    });

    if (!data || !data.technologieBy) {
      console.error('Technologie non trouvée pour ce slug:', techSlug);
      return null;
    }

    console.log('Technologie récupérée:', data.technologieBy); // Log des données
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
                      id
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
      `, variables: { slug: techSlug },
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
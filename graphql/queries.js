import { gql } from '@apollo/client';
import client from '@/lib/apolloClient';

export async function getStaticProps() {
  try {
    const { data } = await client.query({
      query: gql`
        query projets {
          projets(first: 10) {
            nodes {
              title
              content
              slug
              uri
              id
              deTailsDuProjet {
                technologiesUtilisees
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
      console.error('No projets data found');
      return {
        notFound: true,
      };
    }

    return {
      props: {
        projets: data.projets.nodes,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching projects:', error);
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
      return null; // Retourne null si le projet n'est pas trouvé
    }

    return data.projetBy;
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    return null;
  }
};

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
      return []; // Retourne un tableau vide si aucun slug n'est trouvé
    }

    return data.projets.nodes.map((node) => node.slug);
  } catch (error) {
    console.error('Error fetching project slugs:', error);
    return [];
  }
};

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
      return []; // Retourne un tableau vide si aucun slug de technologie n'est trouvé
    }

    return data.technologies.nodes.map((node) => node.slug);
  } catch (error) {
    console.error('Error fetching tech slugs:', error);
    return [];
  }
};

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
      return null; // Retourne null si les détails de la technologie ne sont pas trouvés
    }

    return data.technologieBy;
  } catch (error) {
    console.error('Error fetching tech details:', error);
    return null;
  }
};

export const fetchProjectsByTech = async (techSlug) => {
  try {
    const { data } = await client.query({
      query: gql`
        query GetProjectsByTech($slug: String!) {
          projets(where: { technologieSlug: $slug }) {
            nodes {
              title
              id
              content
              featuredImage {
                node {
                  mediaItemUrl
                }
              }
            }
          }
        }
      `,
      variables: { slug: techSlug },
    });

    if (!data || !data.projets) {
      return []; // Retourne un tableau vide si aucun projet n'est trouvé pour cette technologie
    }

    return data.projets.nodes;
  } catch (error) {
    console.error('Error fetching projects by tech:', error);
    return [];
  }
};

export const GET_PHOTOS_QUERY = gql`
  query GetPhoto {
    photos {
      nodes {
        photosMe {
          imageDeMoi {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

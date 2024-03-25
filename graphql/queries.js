import { gql } from '@apollo/client';
import client from '@/lib/apolloClient';

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query projets {
        projets(first: 6) {
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

  return {
    props: {
      projets: data.projets.nodes,
    },
  };
}

export const getProjectBySlug = async (slug) => {
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

  return data.projetBy;
};

export const fetchProjectSlugs = async () => {
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
  return data.projets.nodes.map((node) => node.slug);
};

export const fetchTechSlugs = async () => {
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
  return data.technologies.nodes.map((node) => node.slug);
};

export const fetchTechDetails = async (techSlug) => {
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

  return data.technologieBy;
};

export const fetchProjectsByTech = async (techSlug) => {
  // Exemple de requête qui récupère tous les projets sans filtrage direct par technologie
  const { data } = await client.query({
    query: gql`
      query GetAllProjects {
        projets {
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
  });



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
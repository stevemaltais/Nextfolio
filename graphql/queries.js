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
          deTailsDuProjet{
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

  return data.projetBy; // Assurez-vous que ceci correspond à ce que retourne votre requête.
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
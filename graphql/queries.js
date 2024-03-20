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



// services/projectService.js
import { gql } from '@apollo/client';
import apolloClient from '../lib/apolloClient'; // Ajustez le chemin selon votre structure

export const fetchProjectDetails = async (slug) => {
  const { data } = await apolloClient.query({
    query: gql`
      query GetProjectBySlug($slug: ID!) {
        project(id: $slug, idType: SLUG) {
          title
          content
   
        }
      }
    `,
    variables: { slug },
  });
  return data.project;
};

export const fetchSlugs = async () => {
  const { data } = await apolloClient.query({
    query: gql`
      query GetAllProjectSlugs {
        projects {
          nodes {
            slug
          }
        }
      }
    `,
  });
  const slugs = data.projects.nodes.map((node) => node.slug);
  return slugs;
};

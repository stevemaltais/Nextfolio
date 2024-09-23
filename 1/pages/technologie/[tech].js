import React from 'react';
import { fetchTechSlugs, fetchTechDetails, fetchProjectsByTech } from '@/graphql/queries';

const TechPage = ({ techInfo, projects }) => {
  return (
    <div>
      <h1>{techInfo.title}</h1>
      <p>{techInfo.content}</p>
      
      <h2>Projets Relatifs</h2>
      <div>
        {projects.map(project => (
          <div key={project.id}>
            <h3>{project.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const slugs = await fetchTechSlugs();
  const paths = slugs.map(slug => ({ params: { tech: slug } }));
  
  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const techInfo = await fetchTechDetails(params.tech);
  const projects = await fetchProjectsByTech(params.tech);

  // Vérifiez ici que techInfo et projects ne sont pas undefined
  return {
    props: {
      techInfo: techInfo || {}, // Utilisez un objet vide si techInfo est undefined
      projects: projects || [], // Utilisez un tableau vide si projects est undefined
    },
  };
}

export default TechPage;

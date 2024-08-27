import React from 'react';
import { useRouter } from 'next/router';
import { fetchProjectSlugs, getProjectBySlug } from '@/graphql/queries';

export async function getStaticPaths() {
  const slugs = await fetchProjectSlugs(); // Récupère tous les slugs des projets
  const paths = slugs.map((slug) => ({
    params: { slug }, // Crée un chemin pour chaque slug
  }));

  return { 
    paths, 
    fallback: 'blocking' // 'blocking' génère les pages à la demande si elles n'existent pas déjà
  };
}

export async function getStaticProps({ params }) {
  const project = await getProjectBySlug(params.slug); // Utilise le slug pour récupérer les détails du projet
  
  if (!project) {
    return {
      notFound: true, // Retourne une 404 si le projet n'est pas trouvé
    };
  }

  return {
    props: {
      project,
    },
  };
}

const ProjectPage = ({ project }) => {
  const router = useRouter();

  if (router.isFallback || !project) {
    return <div>Loading...</div>; // Gérer l'affichage pour le projet non trouvé ou lors du chargement
  }

  // Assurez-vous d'utiliser `dangerouslySetInnerHTML` de manière responsable
  const createMarkupForContent = () => {
    return { __html: project.content };
  };

  return (
    <div>
      <h1>{project.title}</h1>
      {project.featuredImage && project.featuredImage.node && (
        <img src={project.featuredImage.node.mediaItemUrl} alt={`Image mise en avant pour ${project.title}`} />
      )}
      <div dangerouslySetInnerHTML={createMarkupForContent()} />
      <p>ID du projet : {project.id}</p>
      <p>Slug du projet : {project.slug}</p>
      {/* Ici, vous pouvez ajouter d'autres informations sur le projet en utilisant la même méthode */}
    </div>
  );
};

export default ProjectPage;

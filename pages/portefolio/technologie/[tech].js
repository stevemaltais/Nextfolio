import React from 'react';
import { useRouter } from 'next/router';

// Imaginons que vous avez une fonction pour récupérer des projets par technologie
// import { fetchProjectsByTech } from '../../lib/api';

const TechArchivePage = () => {
  const router = useRouter();
  const { tech } = router.query; // Obtenez le slug de la technologie de l'URL

  // Vous pourriez ici charger les données spécifiques à cette technologie, par exemple :
  // const projects = fetchProjectsByTech(tech);

  return (
    <div>
      <h1>Projets utilisant {tech}</h1>
      {/* Ici, vous pourriez mapper sur `projects` pour afficher les projets liés à `tech` */}
      {/* {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))} */}
    </div>
  );
};

export default TechArchivePage;

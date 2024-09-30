import React from 'react';
import { NextSeo } from 'next-seo';
import { fetchTechSlugs, fetchTechDetails, fetchProjectsByTech } from '@/graphql/queries';

const TechPage = ({ techInfo, projects }) => {
  // Si techInfo est manquant ou n'a pas de titre, on affiche un message d'erreur.
  if (!techInfo || !techInfo.title) {
    console.error("Technologie introuvable ou slug undefined : ", techInfo);
    return <div>Aucune information disponible pour cette technologie.</div>;
  }

  // Affichage dans la console des projets associés (pour débogage).
  console.log('Projets associés:', projects);

  // URL par défaut pour l'image si aucune n'est trouvée.
  const defaultImage = '/images/default-tech-image.jpg';
  
  return (
    <>
      {/* SEO Dynamique pour chaque page de technologie */}
      <NextSeo
        title={`Technologie: ${techInfo.title} - Steve Maltais`}  // Titre SEO dynamique
        description={`Découvrez les détails de la technologie ${techInfo.title} et les projets associés.`}  // Description SEO
        canonical={`https://www.stevemaltais.dev/technologie/${techInfo.slug || 'undefined'}`}   // URL canonique dynamique
        openGraph={{
          url: `https://www.stevemaltais.dev/technologie/${techInfo.slug}`,  // URL OpenGraph dynamique
          title: `Technologie: ${techInfo.title} - Steve Maltais`,
          description: `Découvrez la technologie ${techInfo.title} et les projets associés.`,
          images: [
            {
              url: techInfo.featuredImage?.node?.mediaItemUrl || defaultImage,  // Image OpenGraph dynamique ou par défaut
              width: 1200,
              height: 630,
              alt: `Image de la technologie ${techInfo.title}`,
            },
          ],
          site_name: 'Steve Maltais Portfolio',
        }}
        twitter={{
          handle: '@stevemaltais',
          site: '@stevemaltais',
          cardType: 'summary_large_image',
        }}
      />

      {/* Contenu de la page technologie */}
      <div>
        <h1>{techInfo.title}</h1>
        {/* Affiche le contenu de la technologie s'il existe */}
          {/* Vérification si le slug existe avant d'utiliser le lien */}
          <a href={`/technologie/${encodeURIComponent(techInfo.slug)}`}>
  {techInfo.title || "Technologie non définie"}
</a>
        <p>{techInfo.content || "Aucune description disponible."}</p>
        
        <h2>Projets Relatifs</h2>
        <div>
          {projects.length > 0 ? (
            projects.map(project => (
              <div key={project.id}>
                <h3>{project.title}</h3>
                <p>{project.detailsDuProjet?.descriptionCourteDuProjet || "Pas de description disponible."}</p>
              </div>
            ))
          ) : (
            <p>Aucun projet disponible pour cette technologie.</p>
          )}
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const slugs = await fetchTechSlugs();
  const paths = slugs.map(slug => ({ params: { tech: slug } }));

  return {
    paths,
    fallback: 'blocking',  // Si un slug n'est pas pré-rendu, on utilise la stratégie de fallback.
  };
}

export async function getStaticProps({ params }) {
  const techInfo = await fetchTechDetails(params.tech);
  const projects = await fetchProjectsByTech(params.tech);

  if (!techInfo) {
    return {
      notFound: true,  // Si aucune technologie n'est trouvée, renvoie une page 404.
    };
  }

  return {
    props: {
      techInfo,
      projects: projects || [], // Renvoie un tableau vide si aucun projet n'est associé
    },
    revalidate: 60,  // Revalidation ISR toutes les 60 secondes
  };
}

export default TechPage;

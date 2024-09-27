import React from 'react';
import { NextSeo } from 'next-seo';
import { fetchTechSlugs, fetchTechDetails, fetchProjectsByTech } from '@/graphql/queries';

const TechPage = ({ techInfo, projects }) => {
  if (!techInfo || !techInfo.title) {
    return <div>Aucune information disponible pour cette technologie.</div>;
  }


  console.log('Projets associés:', projects);
  return (
    <>
      {/* SEO Dynamique pour chaque page de technologie */}
      <NextSeo
        title={`Technologie: ${techInfo.title} - Steve Maltais`}  // Titre SEO dynamique
        description={`Découvrez les détails de la technologie ${techInfo.title} et les projets associés.`}  // Description SEO
        canonical={`https://www.stevemaltais.dev/technologies/${techInfo.slug}`}  // URL canonique dynamique
        openGraph={{
          url: `https://www.stevemaltais.dev/technologies/${techInfo.slug}`,  // URL OpenGraph dynamique
          title: `Technologie: ${techInfo.title} - Steve Maltais`,
          description: `Découvrez la technologie ${techInfo.title} et les projets associés.`,
          images: [
            {
              url: techInfo.featuredImage?.node?.mediaItemUrl || '/images/default-tech-image.jpg',  // Image OpenGraph dynamique ou par défaut
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
        <p>{techInfo.content}</p>
        
        <h2>Projets Relatifs</h2>
        <div>
          {projects.length > 0 ? (
            projects.map(project => (
              <div key={project.id}>
                <h3>{project.title}</h3>
                <p>{project.detailsDuProjet?.descriptionCourteDuProjet}</p>
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
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const techInfo = await fetchTechDetails(params.tech);
  const projects = await fetchProjectsByTech(params.tech);

  if (!techInfo) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      techInfo,
      projects: projects || [], // Renvoie un tableau vide si aucun projet n'est associé
    },
  };
}

export default TechPage;

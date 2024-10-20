import React from 'react';
import { NextSeo } from 'next-seo';
import { fetchTechSlugs, fetchTechDetails, fetchProjectsByTech } from '@/graphql/queries';

const TechPage = ({ techInfo, projects }) => {
  // Gestion des erreurs pour les informations de la technologie
  if (!techInfo || !techInfo.title) {
    console.error("Technologie introuvable :", techInfo);
    return <div>Aucune information disponible pour cette technologie.</div>;
  }

  const defaultImage = '/images/default-tech-image.jpg';

  return (
    <>
      {/* SEO dynamique pour chaque technologie */}
      <NextSeo
        title={`Technologie : ${techInfo.title} - Steve Maltais`}
        description={`Découvrez la technologie ${techInfo.title} et ses projets associés.`}
        canonical={`https://stevemaltais.dev/technologie/${techInfo.slug}`}
        noindex={true} 
        openGraph={{
          url: `https://stevemaltais.dev/technologie/${techInfo.slug}`,
          title: `Technologie : ${techInfo.title} - Steve Maltais`,
          description: `Détails et projets liés à ${techInfo.title}.`,
          images: [
            {
              url: techInfo.deTailsTechnologies?.logo?.node?.mediaItemUrl || defaultImage,
              width: 1200,
              height: 630,
              alt: `Logo de la technologie ${techInfo.title}`,
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

      <div>
        <h1>{techInfo.title}</h1>
        <img
          src={techInfo.deTailsTechnologies?.logo?.node?.mediaItemUrl || defaultImage}
          alt={`Logo de la technologie ${techInfo.title}`}
        />
        <p>{techInfo.deTailsTechnologies?.descriptionDuProjet || "Aucune description disponible."}</p>

        {/* Lien vers le site officiel si disponible */}
        {techInfo.deTailsTechnologies?.siteOfficiel && (
          <a href={techInfo.deTailsTechnologies.siteOfficiel} target="_blank" rel="noopener noreferrer">
            Visitez le site officiel
          </a>
        )}

        <h2>Projets Relatifs</h2>
        <div>
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id}>
                <h3>{project.title}</h3>
                <p>{project.detailsDuProjet?.descriptionCourteDuProjet || "Pas encore de description détaillée."}</p>
              </div>
            ))
          ) : (
            <p>Aucun projet associé pour cette technologie.</p>
          )}
        </div>
      </div>
    </>
  );
};

// Gestion des chemins dynamiques pour chaque technologie
export async function getStaticPaths() {
  const slugs = await fetchTechSlugs();
  const paths = slugs.map((slug) => ({ params: { tech: slug } }));

  return {
    paths,
    fallback: 'blocking', // Bloquer pour générer la page si elle n'est pas encore générée
  };
}

// Gestion des données pour chaque technologie
export async function getStaticProps({ params }) {
  const techInfo = await fetchTechDetails(params.tech);
  const projects = await fetchProjectsByTech(params.tech);

  // Retourner une page 404 si la technologie n'est pas trouvée
  if (!techInfo) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      techInfo,
      projects: projects || [],
    },
    revalidate: 10, // ISR: Revalidate tous les 60 secondes
  };
}

export default TechPage;

import React from 'react';
import { NextSeo } from 'next-seo';
import { getStaticProps as fetchProjects } from '@/graphql/queries';  // Importer la fonction qui récupère les projets

// Récupérer les projets via la requête GraphQL
export async function getStaticProps() {
  const result = await fetchProjects();
  
  return {
    props: {
      projets: result.props.projets, // Charger les projets récupérés dans les props
    },
  };
}

const PortfolioPage = ({ projets }) => {
  return (
    <>
      {/* Configuration SEO pour la page d'accueil du Portfolio */}
      <NextSeo
        title="Portfolio - Steve Maltais"
        description="Bienvenue sur mon portfolio. Découvrez mes projets de développement web, mes compétences et mes expériences professionnelles."
        canonical="https://stevemaltais.dev/portefolio"
        openGraph={{
          url: 'https://stevemaltais.dev/portefolio',
          title: 'Portfolio - Steve Maltais',
          description: 'Découvrez mes projets, compétences, et expériences en tant que développeur web.',
          images: [
            {
              url: '/images/portfolio-preview.jpg',
              width: 1200,
              height: 630,
              alt: 'Aperçu du Portfolio',
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

      {/* Contenu de la page de Portfolio */}
      <div>
        <h1>Mon Portfolio</h1>
        <p>Bienvenue sur mon portfolio. Découvrez mes projets de développement web.</p>

        {/* Liste des projets */}
        <div>
          {projets.map((projet) => (
            <div key={projet.id} style={{ marginBottom: '20px' }}>
              <h2>{projet.title}</h2>
              <p>{projet.detailsDuProjet.descriptionCourteDuProjet}</p> {/* Description courte du projet */}
              
              {/* Image du projet */}
              <a href={`/portefolio/${projet.slug}`}>
                <img 
                  src={projet.featuredImage?.node?.mediaItemUrl || '/images/default.jpg'}
                  alt={`Image de ${projet.title}`}
                  style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
                />
              </a>

              {/* Catégorie du projet */}
              <p>
                <strong>Catégorie :</strong> {projet.detailsDuProjet.categorieDuProjet}
              </p>

              {/* Lien vers la page du projet */}
              <a href={`/portefolio/${projet.slug}`}>Voir les détails</a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PortfolioPage;

import React from 'react';
import { NextSeo } from 'next-seo';  // Import de NextSeo

const Index = () => {
  return (
    <>
      {/* Configuration SEO pour la page d'accueil du Portfolio */}
      <NextSeo
        title="Portfolio - Steve Maltais"  // Titre pour la page
        description="Bienvenue sur mon portfolio. Découvrez mes projets de développement web, mes compétences et mes expériences professionnelles."  // Description SEO
        canonical="https://stevemaltais.dev/portefolio"  // URL canonique
        openGraph={{
          url: 'https://stevemaltais.dev/portefolio',  // URL Open Graph
          title: 'Portfolio - Steve Maltais',
          description: 'Découvrez mes projets, compétences, et expériences en tant que développeur web.',
          images: [
            {
              url: '/images/portfolio-preview.jpg',  // Image Open Graph pour l'aperçu
              width: 1200,
              height: 630,
              alt: 'Aperçu du Portfolio',
            },
          ],
          site_name: 'Steve Maltais Portfolio',
        }}
        twitter={{
          handle: '@stevemaltais',  // Ton handle Twitter
          site: '@stevemaltais',     // Handle Twitter du site
          cardType: 'summary_large_image',  // Carte Twitter avec grande image
        }}
      />

      {/* Contenu de la page de Portfolio */}
      <div>
        <h1>Mon Portfolio</h1>
        <p>Bienvenue sur mon portfolio. Découvrez mes projets de développement web.</p>
      </div>
    </>
  );
};

export default Index;

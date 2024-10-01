import React from 'react';
import { NextSeo } from 'next-seo';  // Import de NextSeo

const Curriculum = () => {
  return (
    <>
      {/* Configuration SEO pour la page de Curriculum */}
      <NextSeo
        title="Curriculum - Steve Maltais"  // Titre pour la page
        description="Découvrez mon parcours professionnel et mes compétences en tant que développeur web."  // Description SEO
        canonical="https://stevemaltais.dev/curriculum"  // URL canonique
        openGraph={{
          url: 'https://stevemaltais.dev/curriculum',  // URL Open Graph
          title: 'Curriculum - Steve Maltais',
          description: 'Parcours professionnel et compétences de Steve Maltais, développeur web.',
          images: [
            {
              url: '/images/curriculum-preview.jpg',  // Image Open Graph pour l'aperçu
              width: 1200,
              height: 630,
              alt: 'Aperçu du Curriculum',
            },
          ],
          site_name: 'Steve Maltais Curriculum',
        }}
        twitter={{
          handle: '@stevemaltais',  // Ton handle Twitter
          site: '@stevemaltais',     // Handle Twitter du site
          cardType: 'summary_large_image',  // Carte Twitter avec grande image
        }}
      />

      {/* Contenu de la page de Curriculum */}
      <div>
        <h1>Mon Curriculum</h1>
        <p>Explorez mon parcours professionnel, mes compétences et mes expériences en tant que développeur web.</p>
      </div>
    </>
  );
};

export default Curriculum;

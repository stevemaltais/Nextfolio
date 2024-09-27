import React from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';  // Import de NextSeo

const TechnologiePage = () => {
  return (
    <>
      {/* Configuration SEO pour la page des technologies */}
      <NextSeo
        title="Technologies - Steve Maltais"  // Titre pour la page
        description="Découvrez les technologies que j'utilise, telles que React, Next.js, et bien d'autres, pour créer des applications web performantes."  // Description SEO
        canonical="https://www.stevemaltais.dev/technologies"  // URL canonique
        openGraph={{
          url: 'https://www.stevemaltais.dev/technologies',  // URL Open Graph
          title: 'Technologies - Steve Maltais',
          description: 'Présentation des technologies utilisées pour le développement web, notamment React et Next.js.',
          images: [
            {
              url: '/images/technologies-preview.jpg',  // Image Open Graph pour l'aperçu
              width: 1200,
              height: 630,
              alt: 'Aperçu des technologies',
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

      {/* Contenu de la page des technologies */}
      <div>
        <h1>Technologies</h1>
        <p>Cette page est dédiée à présenter les technologies que j'utilise.</p>
        <ul>
          <li>React - Une bibliothèque JavaScript pour construire des interfaces utilisateur.</li>
          <li>Next.js - Un framework React pour la production.</li>
          {/* Ajoutez d'autres technologies ici */}
        </ul>
        <Link href="/portefolio">Retour au portefeuille</Link>
      </div>
    </>
  );
};

export default TechnologiePage;

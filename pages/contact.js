import React from 'react';
import { NextSeo } from 'next-seo';  // Import de NextSeo

const Contact = () => {
  return (
    <>
      {/* Configuration SEO pour la page de Contact */}
      <NextSeo
        title="Contact - Steve Maltais"  // Titre pour la page
        description="N'hésitez pas à me contacter pour des opportunités de collaboration ou toute autre question."  // Description SEO
        canonical="https://stevemaltais.dev/contact"  // URL canonique
        openGraph={{
          url: 'https://stevemaltais.dev/contact',  // URL Open Graph
          title: 'Contact - Steve Maltais',
          description: 'Contactez-moi pour toute demande, opportunité ou projet.',
          images: [
            {
              url: '/images/contact-preview.jpg',  // Image Open Graph pour l'aperçu
              width: 1200,
              height: 630,
              alt: 'Page de contact',
            },
          ],
          site_name: 'Steve Maltais Contact',
        }}
        twitter={{
          handle: '@stevemaltais',  // Ton handle Twitter
          site: '@stevemaltais',     // Handle Twitter du site
          cardType: 'summary_large_image',  // Carte Twitter avec grande image
        }}
      />

      {/* Contenu de la page de contact */}
      <div>
        <h1>Contactez-moi</h1>
        <p>N'hésitez pas à me contacter pour toute question ou opportunité de collaboration.</p>
      </div>
    </>
  );
};

export default Contact;

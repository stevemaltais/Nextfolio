import { 
  ImageOverlay, 
  HomeSection, 
  AboutSection, 
  CompetenceSection, 
  ContactSection, 
  PorteFolioSection 
} from '@/components/HomePageComponents';
import { getStaticProps as getProjetsStaticProps } from '@/graphql/queries';
import { useState } from 'react';
import { NextSeo, BreadcrumbJsonLd, ArticleJsonLd } from 'next-seo';
import PersonSchema from '@/components/SEO/PersonSchema';  // Import de PersonSchema

export default function Home({ projets }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Date de publication fixe et date de modification dynamique
  const datePublished = '2024-07-15T08:00:00+08:00';  // Date fixe
  const dateModified = new Date().toISOString();  // Date de modification dynamique

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      {/* Configuration SEO avec OpenGraph, Twitter, etc. */}
      <NextSeo
  title="Création de Sites Web  | Développeur Web - React, WordPress"
  description="Développeur web freelance spécialisé en création de sites modernes avec React, Next.js, et WordPress. Consultez mon portfolio pour découvrir mes projets."
  canonical="https://stevemaltais.dev/"
  openGraph={{
    url: 'https://stevemaltais.dev/',
    title: 'Création de Sites Web  | Développeur Web - React, WordPress',
    description: 'Développeur web freelance spécialisé en création de sites modernes avec React, Next.js, et WordPress. Consultez mon portfolio pour découvrir mes projets.',
    images: [
      {
        url: '/images/portfolio-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'Aperçu de mon portfolio',
      },
    ],
    site_name: 'Mon Portfolio',
  }}
  twitter={{
    handle: '@stevemaltais',
    site: '@stevemaltais',
    cardType: 'summary_large_image',
  }}
/>



      {/* Schéma JSON-LD pour Breadcrumb */}
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: 'Accueil',
            item: 'https://stevemaltais.dev/',
          },
          {
            position: 2,
            name: 'Portfolio',
            item: 'https://stevemaltais.dev/portfolio',
          },
        ]}
      />

      {/* Schéma JSON-LD pour l'article ou la page */}
      <ArticleJsonLd
        url="https://stevemaltais.dev/"
        title="Accueil - Mon Portfolio"
        images={['https://stevemaltais.dev/assets/portfolio-preview.jpg']}
        datePublished={datePublished}
        dateModified={dateModified}
        author={{
          "@type": "Person",
          "name": "Steve Maltais",
          "url": "https://stevemaltais.dev/about"  // Ajoute ici une URL vers une page "À propos" ou un profil social
        }}
        publisher={{
          "@type": "Organization",
          "name": "Steve Maltais",
          "logo": {
            "@type": "ImageObject",
            "url": "https://stevemaltais.dev/assets/logo.png"  // Exemple de logo
          }
        }}
        description="Bienvenue sur mon portfolio. Découvrez mes compétences, mes projets et contactez-moi pour plus d'informations."
      />


      {/* Schéma JSON-LD pour la personne */}
      <PersonSchema
          name="Steve Maltais"
          jobTitle="Développeur Web Freelance"
          url="https://stevemaltais.dev/"
          image="https://stevemaltais.dev/profilePicture.jpg"
          sameAs={[
            'https://www.linkedin.com/in/stevemaltais/',
            'https://twitter.com/stevemaltais',
          ]}
      /> 

      {/* Composant pour l'overlay d'image d'arrière-plan */}
      <ImageOverlay isDrawerOpen={isDrawerOpen} />

      {/* Section d'accueil */}
      <HomeSection />

      {/* Section "À propos" */}
      <AboutSection />

      {/* Section des compétences */}
      <CompetenceSection />

      {/* Section du portfolio */}
      <PorteFolioSection 
        projets={projets} 
        onOpenDrawer={handleOpenDrawer} 
        onCloseDrawer={handleCloseDrawer} 
        isDrawerOpen={isDrawerOpen} 
      />

      {/* Section de contact */}
      <ContactSection />
    </>
  );
}

// Récupération des données pour la page d'accueil
export const getStaticProps = getProjetsStaticProps;

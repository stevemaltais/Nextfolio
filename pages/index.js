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
import { NextSeo, BreadcrumbJsonLd } from 'next-seo';
import PersonSchema from '@/components/SEO/PersonSchema';  // Import de PersonSchema

export default function Home({ projets }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
        title="Accueil - Mon Portfolio"
        description="Bienvenue sur mon portfolio. Découvrez mes compétences, mes projets et contactez-moi pour plus d'informations."
        canonical="https://www.stevemaltais.dev/"
        openGraph={{
          url: 'https://www.stevemaltais.dev/',
          title: 'Accueil - Mon Portfolio',
          description: 'Découvrez mes compétences et projets en tant que développeur web.',
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

      {/* Schéma JSON-LD pour la Personne (toi) */}
      <PersonSchema
        name="Steve Maltais"
        jobTitle="Développeur Web"
        url="https://www.stevemaltais.dev/"
        image="https://www.stevemaltais.dev/images/stevemaltais.jpg"
        sameAs={[
          'https://www.linkedin.com/in/stevemaltais/',
          'https://www.twitter.com/stevemaltais',
        ]}
      />

      {/* Schéma JSON-LD pour Breadcrumb */}
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: 'Accueil',
            item: 'https://www.stevemaltais.dev/',
          },
          {
            position: 2,
            name: 'Portfolio',
            item: 'https://www.stevemaltais.dev/portfolio',
          },
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

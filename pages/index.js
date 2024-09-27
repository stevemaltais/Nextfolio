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
import { NextSeo } from 'next-seo';  // Importation de NextSeo

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
      <NextSeo
        title="Accueil - Mon Portfolio"  // Titre pour la page
        description="Bienvenue sur mon portfolio. Découvrez mes compétences, mes projets et contactez-moi pour plus d'informations."  // Description SEO
        canonical="https://ton-site.com/"  // URL canonique de la page
        openGraph={{
          url: 'https://ton-site.com/',  // URL Open Graph
          title: 'Accueil - Mon Portfolio',
          description: 'Découvrez mes compétences et projets en tant que développeur web.',
          images: [
            {
              url: '/images/portfolio-preview.jpg',  // Image de prévisualisation pour Open Graph
              width: 1200,
              height: 630,
              alt: 'Aperçu de mon portfolio',
            },
          ],
          site_name: 'Mon Portfolio',
        }}
        twitter={{
          handle: '@tonhandle',  // Twitter handle de l'utilisateur
          site: '@tonhandle',  // Twitter handle du site
          cardType: 'summary_large_image',  // Type de carte Twitter
        }}
      />

      {/* Composant pour l'overlay d'image d'arrière-plan */}
      <ImageOverlay isDrawerOpen={isDrawerOpen} />

      {/* Section d'accueil */}
      <HomeSection />

      {/* Section "À propos" */}
      <AboutSection />

      {/* Section des compétences */}
      <CompetenceSection />

      {/* Section du portefolio */}
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

// Importation des composants de la page d'accueil
import { 
  ImageOverlay, 
  HomeSection, 
  AboutSection, 
  CompetenceSection, 
  ContactSection, 
  PorteFolioSection 
} from '@/components/HomePageComponents';

// Importation des données pour la page
import { getStaticProps as getProjetsStaticProps } from '@/graphql/queries';

import { useState } from 'react'; // Importation de useState pour gérer l'état du drawer

export default function Home({ projets }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // État pour gérer l'ouverture du drawer

  // Fonction pour ouvrir le drawer
  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  // Fonction pour fermer le drawer
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      {/* Composant pour l'overlay d'image d'arrière-plan */}
      <ImageOverlay isDrawerOpen={isDrawerOpen} />  {/* Passer l'état du drawer */}

      {/* Section d'accueil */}
      <HomeSection />

      {/* Section "À propos" */}
      <AboutSection />

      {/* Section des compétences */}
      <CompetenceSection />

      {/* Section du portefolio */}
      <PorteFolioSection projets={projets} onOpenDrawer={handleOpenDrawer} onCloseDrawer={handleCloseDrawer} isDrawerOpen={isDrawerOpen} />

      {/* Section de contact */}
      <ContactSection />
    </>
  );
}

// Récupération des données pour la page d'accueil
export const getStaticProps = getProjetsStaticProps;

import { 
  NextSeo, 
  BreadcrumbJsonLd, 
  ArticleJsonLd 
} from 'next-seo';
import { useState } from 'react';
import { 
  ImageOverlay, 
  HomeSection, 
  AboutSection, 
  CompetenceSection, 
  ContactSection, 
  PorteFolioSection 
} from '@/components/HomePageComponents';
import { getStaticProps as getProjetsStaticProps } from '@/graphql/queries';
import PersonSchema from '@/components/SEO/PersonSchema';

export default function Home({ projets, datePublished }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Génération automatique de la date actuelle au format ISO pour la date de modification
  const dateModified = new Date().toISOString();

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
      {/* Configuration SEO avec OpenGraph, Twitter, etc. */}
      <NextSeo
        title="Accueil - Mon Portfolio"
        description="Bienvenue sur mon portfolio. Découvrez mes compétences, mes projets et contactez-moi pour plus d'informations."
        canonical="https://stevemaltais.dev/"
        openGraph={{
          url: 'https://stevemaltais.dev/',
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

      {/* Schéma JSON-LD pour la Personne */}
      <PersonSchema
        name="Steve Maltais"
        jobTitle="Développeur Web"
        url="https://stevemaltais.dev/"
        image="https://stevemaltais.dev/images/stevemaltais.jpg"
        sameAs={[
          'https://www.linkedin.com/in/stevemaltais/',
          'https://twitter.com/stevemaltais',
        ]}
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
        images={['https://stevemaltais.dev/images/portfolio-preview.jpg']}
        datePublished={datePublished}  // Date de publication fixe
        dateModified={dateModified}    // Date de modification automatique
        authorName="Steve Maltais"
        publisherName="Steve Maltais"
        description="Bienvenue sur mon portfolio. Découvrez mes compétences, mes projets et contactez-moi pour plus d'informations."
      />

      {/* Composant pour l'overlay d'image d'arrière-plan */}
      <ImageOverlay isDrawerOpen={isDrawerOpen} aria-hidden={!isDrawerOpen} />

      {/* Section d'accueil */}
      <HomeSection />

      {/* Section "À propos" */}
      <AboutSection />

      {/* Section des compétences */}
      <CompetenceSection />

      {/* Section du portfolio */}
      <PorteFolioSection 
        projets={Array.isArray(projets) ? projets : []} // Vérification que projets est bien un tableau
        onOpenDrawer={handleOpenDrawer} 
        onCloseDrawer={handleCloseDrawer} 
        isDrawerOpen={isDrawerOpen} 
      />

      {/* Section de contact */}
      <ContactSection />
    </>
  );
}

// Récupération des données pour la page d'accueil avec la date de publication fixe
export const getStaticProps = async () => {
  const projets = await getProjetsStaticProps();

  // Vérification que la réponse est un tableau, sinon renvoyer un tableau vide
  const validProjets = Array.isArray(projets) ? projets : [];

  // Date de publication fixe (15 janvier 2023)
  const datePublished = '2024-08-15T08:00:00+08:00';

  return {
    props: {
      projets: validProjets,  // Toujours renvoyer un tableau, même si vide
      datePublished,  // Passer la date de publication à la page
    },
  };
};

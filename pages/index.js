// Dans index.js ou là où vous voulez utiliser le Carousel
import React from 'react';

import ImageOverlay from "@/components/HomePageComponents/ImageOverlay";
import HomeSection from "@/components/HomePageComponents/HomeSection";
import AboutSection from "@/components/HomePageComponents/AboutSection";
import CompetenceSection from "@/components/HomePageComponents/CompetenceSection";
import ContactSection from '@/components/HomePageComponents/ContactSection';

import { getStaticProps as getProjetsStaticProps } from '@/graphql/queries';
import { PorteFolioSection } from '@/components/HomePageComponents/PorteFolioSection'; 

export default function Home({ projets }) {

  return (
    < >
    
      <ImageOverlay />
      <HomeSection />
      <AboutSection />
      <CompetenceSection />
      <PorteFolioSection  projets={projets} options={{ loop: true }} />
      <ContactSection/>
      
    </>
  );
}

export const getStaticProps = getProjetsStaticProps;

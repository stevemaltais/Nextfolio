import React from 'react';
import Link from 'next/link';
import styles from "@/styles/components/HomePageModule/AboutSection.module.scss";

const formatWithLinks = (text) => {
  // Remplacer explicitement "C++" par un placeholder unique pour éviter les problèmes avec \b
  const cppPlaceholder = "CPLUSPLUS";
  let processedText = text.replace(/C\+\+/g, cppPlaceholder);

  const techTerms = {
    "HTML": "/technologie/html",
    "CSS": "/technologie/css",
    "SCSS": "/technologie/scss",
    "JavaScript": "/technologie/javascript",
    "SQL": "/technologie/sql",
    "Java": "/technologie/java",
    // Utilisez le placeholder pour "C++"
    [cppPlaceholder]: "/technologie/cplusplus",
    "UML": "/technologie/uml",
    "RUP": "/technologie/rup",
    "UX": "/technologie/ux",
    "UI": "/technologie/ui",
  };

  const regexPattern = Object.keys(techTerms).map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const regex = new RegExp(`\\b(${regexPattern})\\b`, 'g');

  // Séparez le texte en parties basées sur la regex, en traitant le placeholder comme tout autre terme
  const parts = processedText.split(regex);

  // Mappez chaque partie au composant Link ou texte brut, en remplaçant le placeholder par "C++" dans le rendu
  return parts.map((part, index) => {
    if (techTerms[part]) {
      const href = techTerms[part];
      const displayText = part === cppPlaceholder ? "C++" : part; // Remplacez le placeholder par "C++"
      return (
        <Link key={index} href={href}className={styles.techLink}>{displayText}</Link>
      );
    }
    return part;
  });
};

export default formatWithLinks;

import React from 'react';
import Link from 'next/link';
import styles from "@/styles/components/HomePageModule/AboutSection.module.scss";

const formatWithLinks = (text) => {
  // Utiliser un placeholder pour "C++"
  const cppPlaceholder = "CPLUSPLUS";
  let processedText = text.replace(/C\+\+/g, cppPlaceholder);

  const techTerms = {
    "HTML": "/technologie/html",
    "CSS": "/technologie/css",
    "SCSS": "/technologie/scss",
    "JavaScript": "/technologie/javascript",
    "SQL": "/technologie/sql",
    "Java": "/technologie/java",
    [cppPlaceholder]: "/technologie/cpp",
    "UML": "/technologie/uml",
    "RUP": "/technologie/rup",
    "UX": "/technologie/ux",
    "UI": "/technologie/ui",
  };

  const regexPattern = Object.keys(techTerms)
    .map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');

  const regex = new RegExp(`\\b(${regexPattern})\\b`, 'g');
  const parts = processedText.split(regex);

  return parts.map((part, index) => {
    if (techTerms[part]) {
      const href = techTerms[part];
      const displayText = part === cppPlaceholder ? "C++" : part;

      // Vérification supplémentaire pour éviter les liens incorrects
      return href ? (
        <Link key={index} href={href} className={styles.techLink}>
          {displayText}
        </Link>
      ) : (
        <span key={index}>{displayText}</span>
      );
    }
    return part;
  });
};

export default formatWithLinks;

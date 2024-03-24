import React from 'react';
import Link from 'next/link';
import styles from '../../styles/components/HomePageModule/PorteFolioSection.module.scss'; // Ajustez le chemin selon votre structure

const TechnologiePage = () => {
  // Ici, vous pourriez récupérer les données des technologies via une API, ou les définir directement dans le composant
  return (
    <div className={styles.container}>
      <h1>Technologies</h1>
      <p>Cette page est dédiée à présenter les technologies que j'utilise.</p>
      {/* Exemple de liste de technologies */}
      <ul>
        <li>React - Une bibliothèque JavaScript pour construire des interfaces utilisateur.</li>
        <li>Next.js - Un framework React pour la production.</li>
        {/* Ajoutez d'autres technologies ici */}
      </ul>
      <Link href="/portefolio">Retour au portefeuille</Link>
    </div>
  );
};

export default TechnologiePage;
    
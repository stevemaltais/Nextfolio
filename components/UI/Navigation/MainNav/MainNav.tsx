import styles from '@/components/UI/Navigation/MainNav/MainNav.module.scss';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import client from '@/lib/apolloClient';

const GET_GUIDES = gql`
  query GetGuides {
    guideDeVoyage {
      nodes {
        id
        title
        slug
      }
    }
  }
`;

const Navigation = () => {
  const { loading, error, data } = useQuery(GET_GUIDES, { client });
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    if (data && data.guideDeVoyage && data.guideDeVoyage.nodes) {
      setGuides(data.guideDeVoyage.nodes);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <nav className={styles.navigation}>
      <h1 className={styles.branding}>A NOUS 5 L'AMÉRIQUE</h1>
      <ul className={styles.navList}>
        <li>
          <Link href="/" className={styles.link}>
            <span className={styles.linkName}>Accueil</span>
          </Link>
        </li>
        <li>
          <Link href="/about" className={styles.link}>
            <span className={styles.linkName}>A propos</span>
          </Link>
        </li>
        <li>
          <Link href="/blog" className={styles.link}>
            <span className={styles.linkName}>Blog</span>
          </Link>
        </li>
        <li className={styles.dropdown}>
          <Link href="/guide-de-voyage" className={styles.link}>
            <span className={styles.linkName}>Guides de Voyage</span>
          </Link>
          <ul className={styles.dropdownMenu}>
            {guides.map(guide => (
              <li key={guide.id}>
                <Link href={`/guide-de-voyage/${guide.slug}`}>
                  {guide.title}
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li className={styles.dropdown}>
          <Link href="/contact" className={styles.link}>
            <span className={styles.linkName}>Contact</span>
          </Link>
          <ul className={styles.dropdownMenu}>
            <li><Link href="/contact/form">Formulaire</Link></li>
            <li><Link href="/contact/map">Carte</Link></li>
            <li><Link href="/contact/support">Support</Link></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

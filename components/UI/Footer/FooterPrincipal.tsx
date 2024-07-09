// components/UI/Footer/FooterPrincipal.js
import React from 'react';
import Link from 'next/link';
import styles from '@/components/UI/Footer/footerPrincipale.module.scss';

const FooterPrincipal = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>&copy; {new Date().getFullYear()} A Nous 5 L'Amérique. All rights reserved.</p>
        <nav className={styles.footerNav}>
          <ul>
            <li><Link href="/privacy-policy">Politique de confidentialité</Link></li>
            <li><Link href="/terms-of-service">Conditions d'utilisation</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/about">À propos</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default FooterPrincipal;

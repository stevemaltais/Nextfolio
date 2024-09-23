/* eslint-disable react/no-unescaped-entities */
// Navigation Component
import styles from '@/components/UI/Navigation/BlogNav/BlogNav.module.scss';
import Link from 'next/link';
import React from 'react';


const Navigation = () => {
  return (


<nav className={styles.navigation}>

<ul className={styles.navList}>
  <li>
    <Link href="/" className={styles.link}>  
      <span className={styles.linkName}>Destination</span>
    </Link>
  </li>
  <li>
    <Link href="/about" className={styles.link}>  
      <span className={styles.linkName}>Mode de vie</span>
    </Link>
  </li>
  <li>
    <Link href="/blog" className={styles.link}>  
      <span className={styles.linkName}>Trucs & astuces</span>
    </Link>
  </li>
  <li>
    <Link href="/blog" className={styles.link}>  
      <span className={styles.linkName}>Photographie</span>
    </Link>
  </li>
</ul>
</nav>
  )
}

export default Navigation   

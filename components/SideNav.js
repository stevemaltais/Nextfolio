import { useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/components/sideNavBar.module.scss';
import SettingsMenu from '@/components/SettingsMenu';




const SideNav = ({ isOpen, toggleNav }) => {
 // État pour contrôler l'affichage de SettingsMenu
 const [isSettingsOpen, setIsSettingsOpen] = useState(false);
 const toggleSettingsMenu = () => {
  setIsSettingsOpen(!isSettingsOpen);
};


  return (
    <>
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      
      <div className={styles.logoDetails}>
      <div className={`${isOpen ? styles.rotate : ''} ${styles.logoName}`}>M</div>
      <div className={styles.topBar}></div>
        <i className={`bx ${isOpen ? 'bx-menu-alt-right' : 'bx-menu'} ${styles.menuIcon}`} onClick={toggleNav}></i>
        </div>
  
      <nav className={styles.navList}>
        <ul>
          <li>
            <Link href="/" className={styles.link}>
       
                <i className='bx bx-home'></i>
                <span className={styles.linkName}>Accueil</span>
       
            </Link>
            <span className={styles.tooltip}>Accueil</span>
          </li>
          <li>
            <Link href="/about" className={styles.link}>
        
                <i className="bx bx-user"></i>
                <span className={styles.linkName}>À propos</span>
           
            </Link>
            <span className={styles.tooltip}>À propos</span>
          </li>
          <li>
            <Link href="/curriculum" className={styles.link}>
        
                <i className='bx bx-news'></i>
                <span className={styles.linkName}>Curriculum</span>
            
            </Link>
            <span className={styles.tooltip}>Curriculum</span>
          </li>
          <li>
            <Link href="/blog" className={styles.link}>
            
                <i className='bx bx-message-detail'></i>
                <span className={styles.linkName}>Blog</span>
          
            </Link>
            <span className={styles.tooltip}>Blog</span>
          </li>
          <li>
            <Link href="/portfolio" className={styles.link}>
      
                <i className='bx bx-briefcase-alt'></i>
                <span className={styles.linkName}>Portfolio</span>
        
            </Link>
            <span className={styles.tooltip}>Portfolio</span>
          </li>
          <li>
            <Link href="/contact" className={styles.link}>
 
                <i className='bx bx-envelope'></i>
                <span className={styles.linkName}>Contact</span>
     
            </Link>
            <span className={styles.tooltip}>Contact</span>
          </li>
          <li onClick={toggleSettingsMenu}>
          <a href="#" className={styles.link} onClick={(e) => e.preventDefault()}>
            <i className={`bx bx-cog ${styles.setupToggle}`}></i>
              <span className={styles.linkName}>Paramètres</span>
            </a>
            <span className={styles.tooltip}>Paramètres</span>
   
            
          </li>
        </ul>
       
        <div className={styles.socialIcons}>
         
          <a href="#"><i className='bx bxl-facebook'></i></a>
          <a href="#"><i className='bx bxl-instagram'></i></a>
          <a href="#"><i className='bx bxl-twitter'></i></a>
          <a href="#"><i className='bx bxl-linkedin'></i></a>
        </div>
        <div className={styles.profile}>
            <div className={styles.profileDetails}>
              <div className={styles.nameJob}>
                <div className={styles.name}>2023 © Steve Maltais</div>
                <div className={styles.job}>Tous droits réservés.</div>
              </div>
            </div>
          </div>
      
      </nav>
    
    
    
    </aside>
            <SettingsMenu isOpen={isSettingsOpen} sidebarIsOpen={isOpen} />
            </>
  );
};

export default SideNav;

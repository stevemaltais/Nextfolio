import React, { useState, useEffect } from 'react';
import styles from '@/styles/components/SettingsMenu.module.scss';
import PrimaryButton from '@/components/PrimaryButton';
import { getLeftPosition } from '@/utils/breakpoints'; // Import de la fonction utilitaire

const SettingsMenu = ({ isOpen, sidebarIsOpen }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [leftPosition, setLeftPosition] = useState('-350px'); // État pour stocker la position gauche
  const [accentColor, setAccentColor] = useState('#64d8ff'); // Stocker l'accent color

  useEffect(() => {
    // Récupérer les paramètres du thème et de la couleur du localStorage lors du montage
    const savedTheme = localStorage.getItem('isDarkMode') === 'true';
    const savedAccentColor = localStorage.getItem('accentColor') || '#64d8ff';
  
    setIsDarkMode(savedTheme);
    setAccentColor(savedAccentColor);
  
    document.body.classList.toggle('dark-theme', savedTheme);
    document.body.classList.toggle('light-theme', !savedTheme);
    document.documentElement.style.setProperty('--accent-color', savedAccentColor);
  
    // Fonction pour ajuster dynamiquement la position
    const handleResize = () => {
      setLeftPosition(getLeftPosition(isOpen, sidebarIsOpen));
    };
  
    handleResize(); // Appeler une fois pour définir la position initiale
    window.addEventListener('resize', handleResize); // Ajouter un écouteur pour les changements de taille de fenêtre
  
    return () => window.removeEventListener('resize', handleResize); // Nettoyer l'écouteur lorsque le composant est démonté
  }, [isOpen, sidebarIsOpen]);

  const changeTheme = (e) => {
    const isDark = e.target.checked;
    setIsDarkMode(isDark);
    localStorage.setItem('isDarkMode', isDark); // Sauvegarder le mode dans le localStorage
    document.body.classList.toggle('dark-theme', isDark);
    document.body.classList.toggle('light-theme', !isDark);
  };

  const changeColor = (colorName) => {
    const themeSuffix = isDarkMode ? '-d' : '-l';
    const colorVarName = `var(--${colorName}${themeSuffix})`;

    document.documentElement.style.setProperty('--accent-color', colorVarName);
    setAccentColor(colorVarName); // Mettre à jour l'état local
    localStorage.setItem('accentColor', colorVarName); // Sauvegarder la couleur dans le localStorage
  };

  const resetThemeAndColor = () => {
    setIsDarkMode(false);
    setAccentColor('#64d8ff');
    localStorage.setItem('isDarkMode', false);
    localStorage.setItem('accentColor', '#64d8ff');
    document.documentElement.style.setProperty('--accent-color', '#64d8ff');
  };

  const menuStyle = {
    left: leftPosition,
    transition: 'left 0.5s ease',
    top: '0',
    width: '300px',
    zIndex: 10,
  };

  return (
    <section style={menuStyle} id="menu-container" className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
      <div id="menu">
        <h3>Style Theme</h3>
        <div className={styles.toggle}>
          <input type="checkbox" id="dark-mode" checked={isDarkMode} onChange={changeTheme} />
          <label htmlFor="dark-mode" className={styles.themeLabel}></label>
        </div>
        <hr />
        <h4>Couleurs Theme</h4>
        <div className={styles.colorPalette}>
          <div onClick={() => changeColor('greenFluo')} className={styles.color} style={{ backgroundColor: 'var(--greenFluo)' }}></div>
          <div onClick={() => changeColor('pinkFluo')} className={styles.color} style={{ backgroundColor: 'var(--pinkFluo)' }}></div>
          <div onClick={() => changeColor('purpleFluo')} className={styles.color} style={{ backgroundColor: 'var(--purpleFluo)' }}></div>
          <div onClick={() => changeColor('yellowFluo')} className={styles.color} style={{ backgroundColor: 'var(--yellowFluo)' }}></div>
        </div>
        <PrimaryButton data-scroll text="Reset" onClick={resetThemeAndColor} className={styles.resetButton}>Reset</PrimaryButton>
      </div>
    </section>
  );
};

export default SettingsMenu;

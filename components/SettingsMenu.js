import React, { useState, useEffect } from 'react';
import styles from '@/styles/components/SettingsMenu.module.scss';
import PrimaryButton from '@/components/PrimaryButton';

const SettingsMenu = ({ isOpen, sidebarIsOpen }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkMode);
    document.body.classList.toggle('light-theme', !isDarkMode);
  }, [isDarkMode]);

  const changeTheme = (e) => {
    setIsDarkMode(e.target.checked);
  };

  const changeColor = (colorValue) => {
    document.documentElement.style.setProperty('--accent-color', colorValue);
  };

  const resetThemeAndColor = () => {
    setIsDarkMode(false);
    document.documentElement.style.setProperty('--accent-color', '#64d8ff');
  };

  const menuStyle = {
    left: isOpen ? (sidebarIsOpen ? '250px' : '7.8rem') : '-350px',
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
          {/* Assurez-vous que la propriété checked est correctement passée */}
          <input type="checkbox" id="dark-mode" checked={isDarkMode} onChange={changeTheme} />
          <label htmlFor="dark-mode" className={styles.themeLabel}></label>
        </div>
        <hr />
        <h4>Couleurs Theme</h4>
        <div className={styles.colorPalette}>
          <div onClick={() => changeColor('var(--greenFluo)')} className={styles.color} style={{ backgroundColor: 'var(--greenFluo)' }}></div>
          <div onClick={() => changeColor('var(--pinkFluo)')} className={styles.color} style={{ backgroundColor: 'var(--pinkFluo)' }}></div>
          <div onClick={() => changeColor('var(--purpleFluo)')} className={styles.color} style={{ backgroundColor: 'var(--purpleFluo)' }}></div>
          <div onClick={() => changeColor('var(--yellowFluo)')} className={styles.color} style={{ backgroundColor: 'var(--yellowFluo)' }}></div>
        </div>
        <PrimaryButton data-scroll text="Reset" onClick={resetThemeAndColor} className={styles.resetButton}>Reset</PrimaryButton>
      </div>
    </section>
  );
};

export default SettingsMenu;

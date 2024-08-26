


import React, { useState, useCallback } from 'react';
import SideNav from "@/components/SideNav";
import "@/styles/globals.scss";
import styles from "@/styles/components/Layout.module.scss";
import Footer from '@/components/Footer';
import { NextUIProvider } from '@nextui-org/react'; // Importation du NextUIProvider

export default function App({ Component, pageProps }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = useCallback(() => {
    setIsNavOpen(prev => !prev);
  }, []);

  return (
    <NextUIProvider> {/* Enveloppez votre application dans NextUIProvider */}
      <header>
        <SideNav isOpen={isNavOpen} toggleNav={toggleNav} />
        <div id="modal-root"></div>  
      </header>

      <main data-scroll-container className={`${styles.appContent} ${isNavOpen ? styles.contentWithSidebarOpen : styles.contentWithSidebarClosed}`}>
        <div className={`${styles.homeMain} ${isNavOpen ? styles.homeMainWithSidebarOpen : styles.homeMainWithSidebarClosed}`}>
          <Component {...pageProps} />
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </NextUIProvider>
  );
}
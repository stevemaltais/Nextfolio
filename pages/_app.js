import React, { useState } from 'react';
import SideNav from "@/components/SideNav";
import "@/styles/globals.scss";
import styles from "@/styles/components/Layout.module.scss";
import Footer from '@/components/Footer';


export default function App({ Component, pageProps }) {



  const [isNavOpen, setIsNavOpen] = useState(false);
  
  return (
    <>
      <header>
          <SideNav isOpen={isNavOpen} toggleNav={() => setIsNavOpen(!isNavOpen)} />
          <div id="modal-root"></div>  
      </header>

     
      <main data-scroll-container  className={`${styles.appContent} ${isNavOpen ? styles.contentWithSidebarOpen : styles.contentWithSidebarClosed}`}>
          <div className={`${styles.homeMain} ${isNavOpen ? styles.homeMainWithSidebarOpen : styles.homeMainWithSidebarClosed}`}>
              <Component {...pageProps} />
          </div>
      </main>
 
      <footer>
          <Footer/>
      </footer>
    </>
  );
}

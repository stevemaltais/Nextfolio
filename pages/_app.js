import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import SideNav from "@/components/SideNav";
import "@/styles/globals.scss";
import styles from "@/styles/components/Layout.module.scss";
import Footer from '@/components/Footer';
import { NextUIProvider } from '@nextui-org/react';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';
import Script from 'next/script';  // Pour inclure le script Google Analytics
import * as gtag from '@/components/SEO/gtag';  // Importe les fonctions gtag.js

export default function App({ Component, pageProps }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();

  const toggleNav = useCallback(() => {
    setIsNavOpen(prev => !prev);
  }, []);

  // Suivre les changements de pages pour Google Analytics
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url); // Appel de la fonction pageview à chaque changement de page
    };
    
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <NextUIProvider>
      <DefaultSeo {...SEO} />

      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <header>
        <SideNav isOpen={isNavOpen} toggleNav={toggleNav} />
      </header>

      <main
        data-scroll-container
        className={`${styles.appContent} ${isNavOpen ? styles.contentWithSidebarOpen : styles.contentWithSidebarClosed}`}
      >
        <div
          className={`${styles.homeMain} ${isNavOpen ? styles.homeMainWithSidebarOpen : styles.homeMainWithSidebarClosed}`}
        >
          <Component {...pageProps} />
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </NextUIProvider>
  );
}

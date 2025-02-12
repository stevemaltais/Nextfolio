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

// Page "En Construction"
const MaintenancePage = () => {
  const targetDate = new Date("2025-03-01T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = targetDate - now;
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center">
      <h1 className="text-4xl font-bold mb-4">🚧 Site en construction 🚧</h1>
      <p className="text-lg mb-6">Nous serons de retour bientôt !</p>
      <div className="text-2xl flex space-x-4">
        <span>{timeLeft.days}j</span> :
        <span>{timeLeft.hours}h</span> :
        <span>{timeLeft.minutes}m</span> :
        <span>{timeLeft.seconds}s</span>
      </div>
    </div>
  );
};

export default function App({ Component, pageProps }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true"; // Vérifie si le mode maintenance est activé

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

  // ✅ Si mode maintenance activé, affiche uniquement la page "En construction"
  if (isMaintenance) {
    return <MaintenancePage />;
  }

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

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import SideNav from "@/components/SideNav";
import "@/styles/globals.scss";
import styles from "@/styles/components/Layout.module.scss";
import Footer from '@/components/Footer';
import { NextUIProvider } from '@nextui-org/react';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';
import Script from 'next/script';
import * as gtag from '@/components/SEO/gtag';

// Page "En Construction"
const MaintenancePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center">
      <h1 className="text-4xl font-bold mb-4">🚧 Site en construction 🚧</h1>
      <p className="text-lg mb-6">Nous serons de retour bientôt !</p>
    </div>
  );
};

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isStaging = process.env.NEXT_PUBLIC_ENV === "staging";

  return (
    <NextUIProvider>
      <DefaultSeo {...SEO} />

      {/* Activer la page "En construction" uniquement sur Staging */}
      {isStaging ? (
        <MaintenancePage />
      ) : (
        <>
          {/* Google Analytics */}
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
            <SideNav />
          </header>

          <main className={styles.appContent}>
            <Component {...pageProps} />
          </main>

          <footer>
            <Footer />
          </footer>
        </>
      )}
    </NextUIProvider>
  );
}

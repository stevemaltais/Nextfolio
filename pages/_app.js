import { useState, useRef } from 'react';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import SideNav from "@/components/SideNav";
import "@/styles/globals.scss";
import styles from "@/styles/components/Layout.module.scss";


export default function App({ Component, pageProps }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const containerRef = useRef(null);

  return (
<>
  <SideNav isOpen={isNavOpen} toggleNav={() => setIsNavOpen(!isNavOpen)} />
  <LocomotiveScrollProvider
    options={{
      smooth: true,
      // autres options ici...
    }}
    watch={[]}
    containerRef={containerRef}
  >
    <div data-scroll-container ref={containerRef} className={`${styles.appContent} ${isNavOpen ? styles.contentWithSidebarOpen : styles.contentWithSidebarClosed}`}>
      <main className={`${styles.homeMain} ${isNavOpen ? styles.homeMainWithSidebarOpen : styles.homeMainWithSidebarClosed}`}>
        <Component {...pageProps} />
      </main>
    </div>
   
  </LocomotiveScrollProvider>
</>

  );
}

import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import { useEffect } from 'react';
import Footer from "../components/Footer";
import AboutSection from "@/components/AboutSection";
import ImageOverlay from "@/components/ImageOverlay";





const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    

  return (
    <>
      <Head>
        {/* Vos métadonnées ici */}
      </Head>

      <ImageOverlay/>
      <main   className={styles.homeMain}>


          <section  className={styles.homeSection}>   
            <div  className={styles.profileSection} >
                  <a href="https://www.linkedin.com/in/steve-maltais/" target="_blank" rel="noopener noreferrer">
                      <div  className= {styles.profileSection__image} data-scroll data-scroll-speed="3"  >
                            <Image 
                            
                              src="/profilePicture.jpg" 
                              alt="Photo de profil de Steve Maltais" 
                              width={450} // Définissez la largeur désirée
                              height={600} // Définissez la hauteur désirée
                              objectFit="COVER"    
                            />
                        </div>
                    </a>          
            
                  <div className={styles.profileSection__content}>  
                    <span className={styles.profileSection__fname} data-scroll data-scroll-speed="4" data-scroll-position="top">STEVE</span>
                    <h1 className={styles.profileSection__name} data-scroll data-scroll-speed="-2" data-scroll-direction="horizontal" data-scroll-position="top">Maltais</h1>
                    
                    <div data-scroll data-scroll-speed="1" data-scroll-direction="horizontal" data-scroll-position="top" data-scroll-delay="0.05" className="profile-section__animated-container">
                      <span className="text">Je suis </span>
                      <span id="text-target"><span className={styles.profileSection__animated_text}></span></span>
                    </div>

                    <a data-scroll data-scroll-speed="-1" href="#" data-text="Dites moi Bonjour!" className="openModalButton btn">Dites moi Bonjour!</a>
                  </div>
            </div>
          </section>
     
        


        

      </main>
    <Footer/>
    </>
  );
}

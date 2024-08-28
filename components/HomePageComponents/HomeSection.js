
import React, { useState } from 'react';
import styles from "@/styles/components/HomePageModule/HomeSection.module.scss"
import Image from "next/image";
import TextScroller from '../Textecroller';
import PrimaryButton from '../PrimaryButton';
import Modal from '../Modal';


const HomeSection = () => {

  
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  }; 

    
  return (
    <section id="home" className={styles.homeSection}>   
    <div  className={styles.profileSection} >
          <a href="https://www.linkedin.com/in/steve-maltais/" target="_blank" rel="noopener noreferrer">
              <div  className= {styles.profileSection__image} data-scroll data-scroll-speed="2" >
                    <Image
                      src="/profilePicture.jpg"
                      alt="Description"
                      width={600}
                      height={800}
                      style={{ objectFit: 'contain', objectPosition: 'center', borderRadius:'40px',boxShadow: '2px 0 5px rgba(0,0,0,.5)' }}
                      priority
                      
                    />
                </div>
            </a>          
    
          <div className={styles.profileSection__content} >  
            <span className={styles.profileSection__fname} data-scroll data-scroll-speed="4" >STEVE</span>
            <h1 className={styles.profileSection__name} data-scroll data-scroll-speed="-2" data-scroll-direction="horizontal" >Maltais</h1>
            
            <div data-scroll data-scroll-speed="1" data-scroll-direction="horizontal" data-scroll-delay="0.05" className={styles.profileSection__animatedContainer}>
              <span className={styles.text}>Je suis </span>
              <TextScroller />
           
            </div>
          
           
            <PrimaryButton data-scroll  data-scroll-speed="1" text="Dites moi Bonjour!" onClick={toggleModal}></PrimaryButton>
                <Modal isVisible={isModalVisible} onClose={toggleModal}/>
                  {/* Contenu du modal ici */}
             
             
            
             
          
          </div>
    </div>
  </section>
  )
}

export default HomeSection
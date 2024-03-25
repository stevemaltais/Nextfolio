
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/components/about.module.scss'; // Adaptez selon votre structure de dossiers
import Modal from '@/components/Modal';
import PrimaryButton from '@/components/PrimaryButton'
import Image from 'next/image';
import Gallery from '@/components/Gallery';

const About = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  }; 
  return (
    <main className={styles.aboutPage}>
      <div className={styles.wrapper}>
        <a href="https://www.linkedin.com/in/steve-maltais/" target="_blank" rel="noopener noreferrer">
            <div  className= {styles.profileSection__image} data-scroll data-scroll-speed="2" >
                  <Image
                    src="/profilePicture.jpg"
                    alt="Description"
                    width={450}
                    height={600}
                    style={{ objectFit: 'cover', objectPosition: 'center', boxShadow: '2px 0 5px rgba(0,0,0,.5)' }}
                    priority
                    
                  />
              </div>
          </a>      
        <div className={styles.aboutMe}>
        <h1>a propos</h1>
        <p className={styles.aboutMe__Title}>
        Nomade numérique de Montréal, embrassant la liberté de travailler aux quatre coins du monde.
        </p>


        <p className={styles.aboutMe__Explain}>
        Depuis 2020, ma passion est de déchiffrer des défis complexes grâce au codage, en trouvant des solutions élégantes. 
        Si je ne suis pas en train de programmer, je suis probablement en train d'explorer un nouveau coin du monde.
        </p>
        </div>
      </div>
    

      <h2>Ma Vision du Développement en 2024</h2>
      <p>
        En 2024, je vois le développement web comme une opportunité encore plus grande pour connecter les gens, résoudre des problèmes environnementaux 
        et sociaux, et innover dans la façon dont nous interagissons avec le monde numérique. Ma vision est de contribuer à des projets qui non seulement 
        poussent les limites de la technologie, mais qui ont aussi un impact positif sur la société.
      </p>

      <h2>Mes Objectifs</h2>
      <ul>
        <li><strong>À court terme :</strong> Continuer à explorer les technologies émergentes, notamment l'IA et le développement mobile, pour élargir mon expertise.</li>
        <li><strong>À moyen terme :</strong> Lancer un projet personnel qui combine technologie et durabilité, contribuant à un avenir plus vert.</li>
        <li><strong>À long terme :</strong> Devenir un mentor pour les futurs développeurs, partager mes connaissances et expériences, et encourager 
        l'innovation responsable.</li>
      </ul>

      <h2>Mes Aspirations</h2>
      <p>
        Je suis constamment à la recherche de nouvelles manières de repousser les limites de ce qui est possible avec le développement web. J'aspire à 
        travailler sur des projets qui me défient et m'obligent à sortir de ma zone de confort, tout en apportant une contribution significative à la communauté.
      </p>

      <h2>Mes Voyages</h2>
      <p>
        Le nomadisme digital m'a offert l'opportunité unique de m'immerger dans diverses cultures, m'inspirant ainsi dans mon travail et ma vision 
        du développement. Chaque destination est une source d'inspiration et un rappel de l'impact mondial que le développement web peut avoir.
      </p>

      <div className={styles.contactMe}>
        <p>Si vous êtes intéressé à en savoir plus sur moi ou à discuter d'opportunités de collaboration, n'hésitez pas à me contacter.</p>
     
        <PrimaryButton data-scroll  text="Dites moi Bonjour!" onClick={toggleModal}></PrimaryButton>
                    <Modal isVisible={isModalVisible} onClose={toggleModal}/>
                  {/* Contenu du modal ici */}
      </div>
    </main>
  );
};

export default About;

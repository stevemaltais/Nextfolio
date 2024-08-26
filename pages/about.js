import React from 'react';
import Link from 'next/link';
import styles from '@/styles/components/AboutPage/about.module.scss';
import ObjectiveCard from '@/components/ObjectiveCard';
import AspirationsAccordion from "@/components/UI/Accordeon/AspirationsAccordion";


import InstagramGallery from '@/components/SocialMedia/InstagramGallery';
import MasonryGallery from '@/components/MasonryGallery';
import VisionSection from '@/components/AboutPage/VisionSection';
import ObjectivesSection from '@/components/AboutPage/ObjectivesSection';

const About = () => {

  const objectives = [
    {
      term: "A court terme",
      description: "Continuer à explorer les technologies émergentes, en particulier l'IA et le développement mobile, pour élargir mon expertise.",
      pourquoi: "Rester à la pointe de la technologie est crucial dans un environnement professionnel en constante évolution.",
      comment: "Participer à des formations spécialisées, des webinaires, et travailler sur des projets intégrant ces technologies.",
      impact: "Une amélioration continue de mes compétences et une capacité accrue à aborder des projets technologiques avancés."
    },
    {
      term: "A moyen terme",
      description: "Lancer un projet personnel alliant technologie et durabilité, contribuant ainsi à un avenir plus vert.",
      pourquoi: "Face aux défis environnementaux actuels, contribuer à des solutions durables est essentiel.",
      comment: "Développer un prototype utilisant des technologies éco-responsables, tester et itérer en fonction des retours d'expérience.",
      impact: "La création d'un produit visant à réduire l'empreinte écologique tout en sensibilisant le public à l'importance de la durabilité."
    },
    {
      term: "A long terme",
      description: "Devenir un mentor pour les futurs développeurs, partageant mes connaissances et encourageant l'innovation responsable.",
      pourquoi: "Il est crucial d'encourager la prochaine génération de développeurs à innover de manière éthique et responsable.",
      comment: "Organiser des sessions de mentorat, donner des conférences, et produire du contenu éducatif.",
      impact: "Le développement d'une communauté de développeurs bien formés, prêts à relever les défis futurs de manière responsable."
    }
  ];

  return (
    <main className={styles.aboutPage}>
      <section className={`${styles.wrapper}`}>
        <MasonryGallery />
        <div className={styles.aboutMe}>
          <h1 className={styles.title1}>A propos</h1>
          <p className={`${styles.aboutMe__Title}`}>
            Nomade numérique de Montréal, embrassant la<br /> liberté de travailler aux quatre coins du monde.
          </p>
          <div className={styles.rightContent}>
            <p className={styles.aboutMe__Explain}>
            Depuis 2020, je me consacre à résoudre des défis complexes grâce au codage, trouvant des solutions élégantes et efficaces.
            Quand je ne suis pas plongé dans la programmation, il est probable que je sois en train de découvrir un nouveau coin du globe.
            </p>
          </div>
          <ul className={styles.socialIcons}>
            <li><Link href="https://www.facebook.com"><div><i className='bx bxl-facebook'></i></div></Link></li>
            <li><Link href="https://www.twitter.com"><div><i className='bx bxl-twitter'></i></div></Link></li>
            <li><Link href="https://www.instagram.com"><div><i className='bx bxl-instagram'></i></div></Link></li>
            <li><Link href="https://www.linkedin.com"><div><i className='bx bxl-linkedin'></i></div></Link></li>
            <li><Link href="https://www.youtube.com"><div><i className='bx bxl-youtube'></i></div></Link></li>
          </ul>
        </div>
      </section>
      <section className={styles.TS}>
        
        <div className={styles.titleWrap}>
        <div>
            <VisionSection/>
          </div>
            <ObjectivesSection/>
        </div>
        <div className={styles.objectivesContainer}>
        {objectives.map((obj, index) => (
            <ObjectiveCard key={index} {...obj} />
    ))}
        </div>
        </section>
        <section>
        <h2>Mes Aspirations</h2>
        <div className={styles.aboutSeparator}></div>
        <p className={styles.aboutMe__Explain}>
        Je suis constamment à la recherche de nouvelles manières de repousser les limites du développement web. 
        Mon ambition est de travailler sur des projets exigeants qui me forcent à sortir de ma zone de confort, 
        tout en apportant une contribution significative à la communauté technologique.

        
        </p>
        </section>
        <section className={styles.travelSection}>
        <h2 className={styles.travelTitle}>Mes Voyages</h2>
        <div className={styles.aboutSeparator}></div>
        <p className={styles.aboutMe__Explain}>
        Le nomadisme digital m'a offert l'opportunité unique de m'immerger dans diverses cultures, enrichissant ainsi mon approche du développement. 
        Chaque destination m'inspire et me rappelle l'impact global que le développement web peut avoir. 
        Ces expériences de voyage se reflètent dans mon travail, nourrissant ma créativité et mon engagement envers des solutions globales.
        Nos Aventures : Anous5lamerique
        Découvrez les aventures de notre famille nomade à travers notre projet Anous5lamerique sur Instagram. 
        Nous partageons notre expérience unique de voyages en famille, où nous explorons les coins les plus 
        fascinants des Amériques tout en jonglant avec nos carrières numériques.
       
        </p>
        <InstagramGallery/>
        </section>
      <div className={styles.contactMe}>
        <p className={styles.aboutMe__Explain}>Si vous souhaitez en savoir plus sur moi ou discuter d'opportunités de collaboration, n'hésitez pas à me contacter. 
        Je suis toujours ouvert aux nouvelles idées et aux défis passionnants.</p>
      </div>
    </main>
  );
};

export default About;

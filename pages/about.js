import React from 'react';
import Link from 'next/link';
import styles from '@/styles/components/about.module.scss';
import ObjectiveCard from '@/components/ObjectiveCard';


import InstagramGallery from '@/components/SocialMedia/InstagramGallery';
import MasonryGallery from '@/components/MasonryGallery';

const About = () => {

  const objectives = [
    {
      term: "À court terme",
      description: "Continuer à explorer les technologies émergentes, notamment l'IA et le développement mobile, pour élargir mon expertise.",
      pourquoi: "Rester à la pointe de la technologie est crucial pour rester compétitif dans un environnement professionnel qui évolue rapidement.",
      comment: "Participer à des formations spécialisées, des webinaires et travailler sur des projets utilisant ces technologies.",
      impact: "Amélioration continue de mes compétences et capacité à travailler sur des projets technologiques avancés."
    },
    {
      term: "À moyen terme",
      description: "Lancer un projet personnel qui combine technologie et durabilité, contribuant à un avenir plus vert.",
      pourquoi: "Contribuer à des solutions durables est essentiel pour faire face aux défis environnementaux actuels.",
      comment: "Développer un prototype utilisant des technologies éco-responsables, tester et itérer basé sur les feedbacks.",
      impact: "Création d'un produit qui aide à réduire l'empreinte écologique tout en sensibilisant à l'importance de la durabilité."
    },
    {
      term: "À long terme",
      description: "Devenir un mentor pour les futurs développeurs, partager mes connaissances et expériences, et encourager l'innovation responsable.",
      pourquoi: "Encourager la prochaine génération de développeurs à innover de manière éthique et responsable.",
      comment: "Organiser des sessions de mentorat, donner des conférences, et créer du contenu éducatif.",
      impact: "Construire une communauté de développeurs bien formés qui sont prêts à relever les défis futurs de manière responsable."
    }
  ];

  return (
    <main className={styles.aboutPage}>
      <section className={`${styles.wrapper}`}>
        <MasonryGallery />
        <div className={styles.aboutMe}>
          <h1 className={styles.title1}>À propos</h1>
          <p className={`${styles.aboutMe__Title}`}>
            Nomade numérique de Montréal, embrassant la<br /> liberté de travailler aux quatre coins du monde.
          </p>
          <div className={styles.rightContent}>
            <p className={styles.aboutMe__Explain}>
              Depuis 2020, ma passion est de déchiffrer des défis complexes grâce au codage, en trouvant des solutions élégantes.
              Si je ne suis pas en train de programmer, je suis probablement en train d'explorer un nouveau coin du monde.
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
        <div className={styles.wrapperAbout}>
          <h2 className={styles.title}>Ma Vision du Développement en 2024</h2>
          <div className={styles.aboutSeparator}></div>
          <p className={styles.aboutMe__Explain}>
            En 2024, je vois le développement web comme une opportunité encore plus grande pour connecter les gens, résoudre des problèmes environnementaux
            et sociaux, et innover dans la façon dont nous interagissons avec le monde numérique. Ma vision est de contribuer à des projets qui non seulement
            poussent les limites de la technologie, mais qui ont aussi un impact positif sur la société.
          </p>
        </div>
        <h2 className={styles.titleBig}>Mes Objectifs</h2>
        <div className={styles.objectivesContainer}>
  
        </div>
        <h2>Mes Aspirations</h2>
        <div className={styles.aboutSeparator}></div>
        <p className={styles.aboutMe__Explain}>
          Je suis constamment à la recherche de nouvelles manières de repousser les limites de ce qui est possible avec le développement web. J'aspire à
          travailler sur des projets qui me défient et m'obligent à sortir de ma zone de confort, tout en apportant une contribution significative à la communauté.
        </p>
        <h2>Mes Voyages</h2>
        <div className={styles.aboutSeparator}></div>
        <p className={styles.aboutMe__Explain}>
          Le nomadisme digital m'a offert l'opportunité unique de m'immerger dans diverses cultures, m'inspirant ainsi dans mon travail et ma vision
          du développement. Chaque destination est une source d'inspiration et un rappel de l'impact mondial que le développement web peut avoir.
       
        </p>
        <InstagramGallery/>
      </section>
      <div className={styles.contactMe}>
        <p className={styles.aboutMe__Explain}>Si vous êtes intéressé à en savoir plus sur moi ou à discuter d'opportunités de collaboration, n'hésitez pas à me contacter.</p>
      </div>
    </main>
  );
};

export default About;

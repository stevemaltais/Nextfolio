import styles from "@/styles/components/HomePageModule/CompetenceSection.module.scss"
import AnimatedText from '@/components/AnimatedText';
import useIntersectionObserver from '@/Hooks/useIntersectionObserver'
import React, { useState, useRef } from 'react';

const CompetenceSection = () => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const h4Ref = useRef(null);

  // Fonction de rappel pour gérer les changements de visibilité
  const handleVisibilityChange = (isVisible) => {
    setIsIntersecting(isVisible);
  };

  // Utiliser le hook useIntersectionObserver pour observer h4Ref
  useIntersectionObserver(h4Ref, () => handleVisibilityChange(true), () => handleVisibilityChange(false));

  return (
           
    <section  id="competence" className={styles.wrapper}>
        <div className={styles.title}>
          <h2>
          <AnimatedText text="Compétences" onVisibilityChange={handleVisibilityChange} />

          </h2>
          <h4 ref={h4Ref} className={`${styles.title2} ${isIntersecting ? styles.animate : ''}`}>

          Stack Technique
        </h4>
        </div>

      
      <div className={`${styles.competencesWeb} ${styles.fadeIn}`}>
        <div className={styles.domaines}>
          <h2 data-scroll data-scroll-direction="vertical" data-scroll-speed="-1">Domaines d'Expertise</h2>
          <ul data-scroll data-scroll-direction="horizontal" data-scroll-speed="-1"className="fa-ul">

            <li><span className="fa-li"><i className="fa-regular fa-square-check"></i></span><strong>Développement Front-End</strong><br/><em>HTML5, CSS3, SASS, Javascrip, React, Angular, jQuery, Bootstrap, Tailwind CSS</em> </li>
            <li><span className="fa-li"><i className="fa-regular fa-square-check"></i></span><strong>DÉVELOPPEMENT BACK-END</strong><br/><em>Java,C++, PHP, Swing, Spring, Lavarel</em> </li>
            <li><span className="fa-li"><i className="fa-regular fa-square-check"></i></span><strong>BASES DE DONNÉES</strong><br/><em>SQL, MySql, phpMyAdmin</em> </li>
            <li><span className="fa-li"><i className="fa-regular fa-square-check"></i></span><strong>VERSIONING ET GESTION DE PROJET</strong><br/><em>Git, GitHub, Scrum, Slack, Asana</em> </li>
            <li><span className="fa-li"><i className="fa-regular fa-square-check"></i></span><strong>CONCEPTION ET GRAPHISME</strong><br/><em>Suite Adobe, Figma</em> </li>
            <li><span className="fa-li"><i className="fa-regular fa-square-check"></i></span><strong>RÉFÉRENCEMENT ET ANALYSE</strong><br/><em>SEO : référencement naturel, optimisation de contenu, etc.<br/>Analytics : Google Analytics, Mixpanel, etc.</em> </li>

          </ul>
        </div>
        
        <div data-scroll data-scroll-direction="horizontal" data-scroll-speed="1" className={styles.developpement} id="dev-progress">
          <h2 data-scroll data-scroll-direction="vertical" data-scroll-speed="-1">Niveaux de Maîtrise</h2>
          <div>
          <ul >
              <li>
                <div className={styles.progressBar}>
                  <div className={styles.progress} ><span>Développement Front-End</span></div>
                </div>
              </li>
              <li>
                <div className={styles.progressBar}>
                  <div className={styles.progress}  data-width="75" ><span>Développement Back-End</span></div>
                </div>
              </li>
              <li>
                <div className={styles.progressBar}>
                  <div className={styles.progress} ><span>Bases de données</span></div>
                </div>
              </li>
              <li>
                <div className={styles.progressBar}>
                  <div className={styles.progress} ><span>Versioning et Gestion de projets</span></div>
                </div>
              </li>
              <li>
                <div className={styles.progressBar}>
                  <div className={styles.progress} ><span>Conception et Graphisme</span></div>
                </div>
              </li>
              <li>
                <div className={styles.progressBar}>
                  <div className={styles.progress} ><span>Référencement et Analyse</span></div>
                </div>
              </li>
              <li>
                <div className={styles.progressBar}>
                  <div className={styles.progress} ><span>Gestion de projets</span></div>
                </div>
              </li>
            </ul>
            </div>
        </div>
      </div>
    </section>

  );
};

export default CompetenceSection;
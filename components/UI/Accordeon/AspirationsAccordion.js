import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import styles from './AspirationsAccordion.module.scss';

export default function AspirationsAccordion() {
  return (
    <Accordion variant="splitted" className={styles.accordion}>
      <AccordionItem 
        key="1" 
        aria-label="Repousser les limites" 
        title={<span className={styles.accordionTitle}>Repousser les limites technologiques</span>} 
        className={styles.accordionItem}
      >
        <span className={styles.accordionContent}>
          Travailler sur des projets utilisant les dernières technologies pour rester à la pointe de l'innovation.
        </span>
      </AccordionItem>
      <AccordionItem 
        key="2" 
        aria-label="Impact social" 
        title={<span className={styles.accordionTitle}>Contribuer à des projets à impact social</span>} 
        className={styles.accordionItem}
      >
        <span className={styles.accordionContent}>
          Intégrer des initiatives qui favorisent un développement durable et éthique.
        </span>
      </AccordionItem>
      <AccordionItem 
        key="3" 
        aria-label="Solutions évolutives" 
        title={<span className={styles.accordionTitle}>Développer des solutions évolutives</span>} 
        className={styles.accordionItem}
      >
        <span className={styles.accordionContent}>
          Concevoir des applications et des sites web capables de s'adapter aux besoins futurs tout en offrant une expérience utilisateur optimale.
        </span>
      </AccordionItem>
      <AccordionItem 
        key="4" 
        aria-label="Apprendre et enseigner" 
        title={<span className={styles.accordionTitle}>Apprendre et enseigner</span>} 
        className={styles.accordionItem}
      >
        <span className={styles.accordionContent}>
          Participer activement à la formation de la prochaine génération de développeurs, en partageant mes connaissances et en encourageant l'innovation responsable.
        </span>
      </AccordionItem>
    </Accordion>
  );
}

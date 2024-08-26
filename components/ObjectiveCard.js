import React from 'react';
import { Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import styles from '@/styles/components/ObjectiveCard.module.scss'; // Assurez-vous que le chemin est correct

const ObjectiveCard = ({ term, description, pourquoi, comment, impact }) => {
  return (
    <Card className={styles.objectiveCard}>
      <CardHeader className={styles.cardHeader}>
        <h4>{term}</h4> 
      </CardHeader>

      <CardBody className={styles.objectiveContent}>
        <p className={styles.title}>{description}</p> 
       <Divider className={styles.customDivider} />
        <p><strong>Pourquoi cet objectif ?<br></br></strong> {pourquoi}</p>
        <p><strong>Comment y parvenir ?<br></br></strong> {comment}</p>
        <p><strong>Impact attendu :<br></br></strong> {impact}</p>
      </CardBody>
      <Divider className={styles.customDivider} />
      <CardFooter className={styles.cardFooter}>
        <span>En savoir plus</span>
      </CardFooter>
    </Card>
  );
};

export default ObjectiveCard;
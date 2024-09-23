import React, { useState, useEffect } from 'react';
import styles from '@/styles/components/HomePageModule/HomeSection.module.scss'; 

const TextScroller = () => {
  const phrases = ['Développeur web', 'Développeur logiciel', 'Développeur full stack', 'Designer graphique', 'Freelancer'];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [typingForward, setTypingForward] = useState(true);

  useEffect(() => {
    const type = () => {
      if (typingForward) {
        if (charIndex < phrases[phraseIndex].length) {
          setTimeout(() => {
            setCharIndex(charIndex + 1);
            setCursorVisible(true);
          }, 50);
        } else {
          setTimeout(() => {
            setTypingForward(false);
          }, 500); // Pause à la fin avant de reculer
        }
      } else {
        if (charIndex > 0) {
          setTimeout(() => {
            setCharIndex(charIndex - 1);
            setCursorVisible(false);
          }, 50);
        } else {
          setTimeout(() => {
            setTypingForward(true);
            setPhraseIndex((phraseIndex + 1) % phrases.length);
          }, 500); // Pause à la fin avant d'avancer à nouveau
        }
      }
    };

    type();
  }, [charIndex, typingForward, phraseIndex]);

  // Gérer l'affichage du curseur
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
   
     
        <span className={styles.profileSection__animatedText}  id="text-target">
          {phrases[phraseIndex].slice(0, charIndex)}
          {cursorVisible ? '|' : ''}
        </span>
   
    
  );
};

export default TextScroller;

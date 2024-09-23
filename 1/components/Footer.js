import React from 'react';
import styles from '@/styles/components/Footer.module.scss';


const Footer = () => {
  return (
    <aside>
      <div className={styles.side__StyledSideElement}>
        <div className={styles.email__StyledLinkWrapper}>
            <div className={styles.email__StyledLinkContainer}>
                <a className={styles.email__StyledText} href="mailto:stevemaltais@icloud.com">codingWith@stevemaltais.ca</a>
            </div>
        </div>
      </div>
    </aside>
  )
}

export default Footer;
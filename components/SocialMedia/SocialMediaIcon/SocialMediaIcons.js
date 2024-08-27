import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import Image from 'next/image';
import styles from '@/components/SocialMedia/SocialMediaIcon/SocialMediaIcons.module.scss';

const SocialMediaIcons = () => {
  const [followers, setFollowers] = useState({
    facebook: 0,
    instagram: 0,
    youtube: 0,
  });

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const [fbResult, igResult, ytResult] = await Promise.allSettled([
          axios.get('/api/facebook-followers'),
          axios.get('/api/instagram-followers'),
          axios.get('/api/youtube-followers'),
        ]);

        const updatedFollowers = {
          facebook: fbResult.status === 'fulfilled' ? fbResult.value.data.followers : followers.facebook,
          instagram: igResult.status === 'fulfilled' ? igResult.value.data.followers : followers.instagram,
          youtube: ytResult.status === 'fulfilled' ? ytResult.value.data.followers : followers.youtube,
        };

        setFollowers(updatedFollowers);
      } catch (error) {
        console.error('Erreur lors de la récupération des followers:', error);
      }
    };

    fetchFollowers();
  }, []);

  return (
    <div className={styles.socialMediaWrapper}>
      <div className={styles.socialMediaIcons}>
        {/* Facebook Icon */}
        <div className={styles.socialMediaIconsWrap}>
          <div className={`${styles.icon} ${styles.fb}`}>
            <FontAwesomeIcon icon={faFacebookF} />
            <span>Facebook</span>
          </div>
          <div className={styles.followersCount}>{followers.facebook} followers</div>
        </div>
        
        {/* Instagram Icon */}
        <div className={styles.socialMediaIconsWrap}>
          <div className={`${styles.icon} ${styles.ig}`}>
            <FontAwesomeIcon icon={faInstagram} />
            <span>Instagram</span>
          </div>
          <div className={styles.followersCount}>{followers.instagram} followers</div>
        </div>
        
        {/* YouTube Icon */}
        <div className={styles.socialMediaIconsWrap}>
          <div className={`${styles.icon} ${styles.yt}`}>
            <FontAwesomeIcon icon={faYoutube} />
            <span>YouTube</span>
          </div>
          <div className={styles.followersCount}>{followers.youtube} subscribers</div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaIcons;


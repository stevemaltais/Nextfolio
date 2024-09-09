import axios from 'axios';

export default async function handler(req, res) {
  // Vérification de l'autorisation avec CRON_SECRET
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).end('Unauthorized');
  }

  try {
    // Appel API Facebook
    const facebookResponse = await axios.get(
      `https://graph.facebook.com/v14.0/${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}?fields=followers_count&access_token=${process.env.NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN}`
    );
    const facebookFollowers = facebookResponse.data.followers_count;
  
    // Appel API Instagram
    const instagramResponse = await axios.get(
      `https://graph.instagram.com/me?fields=id,username,followers_count&access_token=${process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN}`
    );
    const instagramFollowers = instagramResponse.data.followers_count;
  
    // Appel API YouTube
    const youtubeResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
    );
    const youtubeSubscribers = youtubeResponse.data.items[0].statistics.subscriberCount;
  
    // Regrouper les résultats des trois API
    res.status(200).json({
      facebookFollowers,
      instagramFollowers,
      youtubeSubscribers
    });
  
  } catch (error) {
    // Log plus détaillé pour identifier l'API qui échoue
    if (error.response) {
      console.error(`Erreur API: ${error.config.url} - Status: ${error.response.status}`);
    } else {
      console.error('Erreur inconnue:', error.message);
    }
    res.status(500).json({ error: 'Erreur lors de la récupération des followers' });
  }
}  

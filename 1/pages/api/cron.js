import axios from 'axios';

export default async function handler(req, res) {
  const receivedAuthorizationHeader = req.headers.authorization;

  // Vérification de l'autorisation avec CRON_SECRET
  if (receivedAuthorizationHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).end('Unauthorized');
  }

  try {
    // Appel pour rafraîchir le token Facebook long-lived
    const facebookResponse = await axios.get(
      `https://graph.facebook.com/v14.0/oauth/access_token`, {
        params: {
          grant_type: 'fb_exchange_token',
          client_id: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID, // Utilise l'ID de l'application ici
          client_secret: process.env.NEXT_PUBLIC_FACEBOOK_APP_SECRET,
          fb_exchange_token: process.env.NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN
        }
      }
    );

    const newFacebookToken = facebookResponse.data.access_token;

    // Appel API pour récupérer les informations de la page Facebook
    const pageInfoResponse = await axios.get(
      `https://graph.facebook.com/v14.0/${process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID}?fields=followers_count&access_token=${newFacebookToken}`
    );

    const facebookFollowers = pageInfoResponse.data.followers_count;

    res.status(200).json({
      message: 'Token rafraîchi avec succès',
      facebookFollowers: facebookFollowers,
      newFacebookToken: newFacebookToken
    });

  } catch (error) {
    console.error('Erreur lors du rafraîchissement des tokens:', error.response?.data || error.message);
    res.status(500).json({ error: 'Erreur lors du rafraîchissement des tokens' });
  }
}

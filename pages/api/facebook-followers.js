import axios from 'axios';

export default async function handler(req, res) {
  try {
    // Assurez-vous d'utiliser l'ID de la page Facebook, pas celui de l'application
    const response = await axios.get(
      `https://graph.facebook.com/v14.0/${process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID}?fields=fan_count&access_token=${process.env.NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN}`
    );
    
    // Récupérer le nombre de fans de la page
    const facebookFollowers = response.data.fan_count;

    res.status(200).json({ followers: facebookFollowers });
  } catch (error) {
    console.error('Erreur Facebook API:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des followers' });
  }
}

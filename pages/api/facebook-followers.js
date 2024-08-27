import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      `https://graph.facebook.com/v14.0/me?fields=followers_count&access_token=${process.env.NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN}`
    );
    res.status(200).json({ followers: response.data.followers_count });
  } catch (error) {
    console.error('Erreur Facebook API:', error.response.data);
    res.status(500).json({ error: 'Erreur lors de la récupération des followers' });
  }
}

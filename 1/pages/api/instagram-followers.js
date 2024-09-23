// pages/api/instagram-followers.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get(`https://graph.instagram.com/me?fields=id,username,followers_count&access_token=${process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN}`);
    res.status(200).json({ followers: response.data.followers_count });
  } catch (error) {
    console.error('Erreur Instagram API:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des followers' });
  }
}

import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
    );
    const subscribers = response.data.items[0].statistics.subscriberCount;
    res.status(200).json({ followers: subscribers });
  } catch (error) {
    console.error('Erreur lors de la récupération des abonnés YouTube:', error.response?.data || error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des abonnés YouTube' });
  }
}

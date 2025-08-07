import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simple in-memory cache for Vercel
const cache = new Map<string, { data: any, timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid giveaway ID' });
    }

    const GAMERPOWER_BASE_URL = "https://www.gamerpower.com/api";
    const cacheKey = `giveaway-${id}`;
    const cachedData = cache.get(cacheKey);
    
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return res.json(cachedData.data);
    }

    console.log(`Fetching giveaway ${id} from GamerPower API`);
    const response = await fetch(`${GAMERPOWER_BASE_URL}/giveaway?id=${id}`, {
      headers: {
        'User-Agent': 'GameFreebie Tracker'
      }
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ error: 'Giveaway not found' });
      }
      throw new Error(`GamerPower API error: ${response.status} ${response.statusText}`);
    }

    const giveaway = await response.json();
    
    if (!giveaway || typeof giveaway !== 'object') {
      return res.status(404).json({ error: 'Giveaway not found' });
    }

    // Cache the successful response
    cache.set(cacheKey, { data: giveaway, timestamp: Date.now() });
    
    res.json(giveaway);

  } catch (error: any) {
    console.error('Error fetching giveaway:', error);
    res.status(500).json({ 
      error: 'Failed to fetch giveaway', 
      message: error?.message || 'Unknown error' 
    });
  }
}
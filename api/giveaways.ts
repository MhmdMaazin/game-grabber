import type { VercelRequest, VercelResponse } from '@vercel/node';
import { filterSchema } from "../shared/schema";

// Simple in-memory cache for Vercel
const cache = new Map<string, { data: any, timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function applyClientSideFilters(giveaways: any[], filters: any) {
  return giveaways.filter(giveaway => {
    // Platform filter
    if (filters.platform && filters.platform !== 'all') {
      const giveawayPlatforms = giveaway.platforms.toLowerCase();
      if (!giveawayPlatforms.includes(filters.platform.toLowerCase())) {
        return false;
      }
    }
    
    // Type filter
    if (filters.type && filters.type !== 'all') {
      if (giveaway.type.toLowerCase() !== filters.type.toLowerCase()) {
        return false;
      }
    }
    
    return true;
  });
}

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
    const filters = filterSchema.parse(req.query);
    const GAMERPOWER_BASE_URL = "https://www.gamerpower.com/api";
    
    // Build cache key based on filters
    const cacheKey = JSON.stringify(filters);
    const cachedData = cache.get(cacheKey);
    
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      const filteredGiveaways = applyClientSideFilters(cachedData.data, filters);
      return res.json(filteredGiveaways);
    }

    // Build API URL with filters
    let apiUrl = `${GAMERPOWER_BASE_URL}/giveaways`;
    const params = new URLSearchParams();
    
    // Map platform filter to correct API values
    if (filters.platform && filters.platform !== 'all') {
      let platformParam = filters.platform;
      const platformMap: Record<string, string> = {
        'steam': 'steam',
        'epic-games-store': 'epic-games-store',
        'gog': 'gog',
        'ubisoft': 'ubisoft',
        'origin': 'origin'
      };
      platformParam = platformMap[filters.platform] || filters.platform;
      params.append('platform', platformParam);
    }
    
    if (filters.type && filters.type !== 'all') {
      params.append('type', filters.type);
    }
    
    // Sort parameter mapping
    if (filters.sort === 'value') {
      params.append('sort-by', 'value');
    } else if (filters.sort === 'popularity') {
      params.append('sort-by', 'popularity');
    }

    if (params.toString()) {
      apiUrl += `?${params.toString()}`;
    }

    console.log(`Fetching from GamerPower API: ${apiUrl}`);
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'GameFreebie Tracker'
      }
    });
    
    if (!response.ok) {
      throw new Error(`GamerPower API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Handle both array response and error object
    if (!Array.isArray(data)) {
      if (data.status_code) {
        throw new Error(`GamerPower API returned error: ${data.status_code}`);
      }
      return res.status(500).json({ error: 'Invalid response format from GamerPower API' });
    }

    // Cache the successful response
    cache.set(cacheKey, { data, timestamp: Date.now() });
    
    const filteredGiveaways = applyClientSideFilters(data, filters);
    res.json(filteredGiveaways);

  } catch (error: any) {
    console.error('Error fetching giveaways:', error);
    res.status(500).json({ 
      error: 'Failed to fetch giveaways', 
      message: error?.message || 'Unknown error' 
    });
  }
}
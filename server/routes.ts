import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { giveawaysResponseSchema, giveawaySchema, filterSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  const GAMERPOWER_BASE_URL = "https://www.gamerpower.com/api";

  // Fetch giveaways with optional filters
  app.get("/api/giveaways", async (req, res) => {
    try {
      const filters = filterSchema.parse(req.query);
      
      // Build cache key based on filters
      const cacheKey = JSON.stringify(filters);
      const cachedData = await storage.getCachedGiveawaysByKey(cacheKey);
      
      if (cachedData) {
        const filteredGiveaways = applyClientSideFilters(cachedData, filters);
        return res.json(filteredGiveaways);
      }

      // Build API URL with filters
      let apiUrl = `${GAMERPOWER_BASE_URL}/giveaways`;
      const params = new URLSearchParams();
      
      // Map platform filter to correct API values
      if (filters.platform && filters.platform !== 'all') {
        let platformParam = filters.platform;
        // Map frontend platform values to API values
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
          'User-Agent': 'Pixel Pass Giveaway Tracker'
        }
      });
      
      if (!response.ok) {
        throw new Error(`GamerPower API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Handle both array response and error object
      if (!Array.isArray(data)) {
        if (data.status_code) {
          throw new Error(`API Error: ${data.error_message || 'Unknown error'}`);
        }
        // If it's not an array and not an error, wrap it
        const giveaways = Array.isArray(data) ? data : [data];
        const validatedGiveaways = giveawaysResponseSchema.parse(giveaways);
        
        await storage.setCachedGiveawaysByKey(cacheKey, validatedGiveaways);
        const filteredGiveaways = applyClientSideFilters(validatedGiveaways, filters);
        return res.json(filteredGiveaways);
      }
      
      const giveaways = giveawaysResponseSchema.parse(data);

      // Cache the results with filters as key
      await storage.setCachedGiveawaysByKey(cacheKey, giveaways);
      
      const filteredGiveaways = applyClientSideFilters(giveaways, filters);
      res.json(filteredGiveaways);
    } catch (error) {
      console.error('Error fetching giveaways:', error);
      res.status(500).json({ 
        error: 'Failed to fetch giveaways',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Fetch single giveaway by ID
  app.get("/api/giveaway/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid giveaway ID' });
      }

      const response = await fetch(`${GAMERPOWER_BASE_URL}/giveaway?id=${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return res.status(404).json({ error: 'Giveaway not found' });
        }
        throw new Error(`GamerPower API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const giveaway = giveawaySchema.parse(data);

      res.json(giveaway);
    } catch (error) {
      console.error('Error fetching giveaway:', error);
      res.status(500).json({ 
        error: 'Failed to fetch giveaway details',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Get giveaway statistics using worth API endpoint
  app.get("/api/stats", async (req, res) => {
    try {
      // Use the worth API endpoint for total value
      const worthResponse = await fetch(`${GAMERPOWER_BASE_URL}/worth`, {
        headers: {
          'User-Agent': 'Pixel Pass Giveaway Tracker'
        }
      });
      
      let worthData = null;
      if (worthResponse.ok) {
        worthData = await worthResponse.json();
      }

      // Get all giveaways for other stats
      let giveaways = await storage.getCachedGiveaways();
      
      if (!giveaways) {
        const response = await fetch(`${GAMERPOWER_BASE_URL}/giveaways`, {
          headers: {
            'User-Agent': 'Pixel Pass Giveaway Tracker'
          }
        });
        if (!response.ok) {
          throw new Error(`GamerPower API error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        giveaways = giveawaysResponseSchema.parse(data);
        
        await storage.setCachedGiveaways(giveaways);
        await storage.setCacheTimestamp(Date.now());
      }

      const stats = {
        totalGiveaways: worthData?.active_giveaways_number || giveaways.length,
        totalValue: worthData?.worth_estimation_usd || giveaways.reduce((sum, g) => {
          const value = parseFloat(g.worth.replace('$', '').replace('N/A', '0'));
          return sum + (isNaN(value) ? 0 : value);
        }, 0),
        platforms: new Set(giveaways.map(g => g.platforms.split(', ')).flat()).size,
        newToday: giveaways.filter(g => {
          const publishedDate = new Date(g.published_date);
          const today = new Date();
          return publishedDate.toDateString() === today.toDateString();
        }).length
      };

      res.json(stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
      res.status(500).json({ 
        error: 'Failed to fetch statistics',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Get total worth estimation from GamerPower API
  app.get("/api/worth", async (req, res) => {
    try {
      const response = await fetch(`${GAMERPOWER_BASE_URL}/worth`, {
        headers: {
          'User-Agent': 'Pixel Pass Giveaway Tracker'
        }
      });
      
      if (!response.ok) {
        throw new Error(`GamerPower API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching worth data:', error);
      res.status(500).json({ 
        error: 'Failed to fetch worth estimation',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Filter & group platforms and giveaway types - using GamerPower filter API
  app.get("/api/filter", async (req, res) => {
    try {
      const { platform, type } = req.query;
      
      if (!platform && !type) {
        return res.status(400).json({ 
          error: 'At least one filter parameter (platform or type) is required' 
        });
      }

      const params = new URLSearchParams();
      if (platform) {
        params.append('platform', platform as string);
      }
      if (type) {
        params.append('type', type as string);
      }

      const apiUrl = `${GAMERPOWER_BASE_URL}/filter?${params.toString()}`;
      console.log(`Fetching filtered giveaways: ${apiUrl}`);
      
      const response = await fetch(apiUrl, {
        headers: {
          'User-Agent': 'Pixel Pass Giveaway Tracker'
        }
      });
      
      if (!response.ok) {
        throw new Error(`GamerPower API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const giveaways = giveawaysResponseSchema.parse(data);
      
      res.json(giveaways);
    } catch (error) {
      console.error('Error fetching filtered giveaways:', error);
      res.status(500).json({ 
        error: 'Failed to fetch filtered giveaways',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function applyClientSideFilters(giveaways: any[], filters: any) {
  let filtered = [...giveaways];

  // Apply search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filtered = filtered.filter(g => 
      g.title.toLowerCase().includes(searchTerm) ||
      g.description.toLowerCase().includes(searchTerm)
    );
  }

  // Sort results
  if (filters.sort === 'date') {
    filtered.sort((a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime());
  } else if (filters.sort === 'value') {
    filtered.sort((a, b) => {
      const valueA = parseFloat(a.worth.replace('$', '').replace('N/A', '0'));
      const valueB = parseFloat(b.worth.replace('$', '').replace('N/A', '0'));
      return valueB - valueA;
    });
  } else if (filters.sort === 'popularity') {
    filtered.sort((a, b) => b.users - a.users);
  }

  return filtered;
}

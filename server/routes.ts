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
      
      // Check cache first
      const cachedGiveaways = await storage.getCachedGiveaways();
      if (cachedGiveaways) {
        const filteredGiveaways = applyFilters(cachedGiveaways, filters);
        return res.json(filteredGiveaways);
      }

      // Build API URL with filters
      let apiUrl = `${GAMERPOWER_BASE_URL}/giveaways`;
      const params = new URLSearchParams();
      
      if (filters.platform) {
        params.append('platform', filters.platform);
      }
      if (filters.type) {
        params.append('type', filters.type);
      }
      if (filters.sort === 'value') {
        params.append('sort-by', 'value');
      } else if (filters.sort === 'popularity') {
        params.append('sort-by', 'popularity');
      }

      if (params.toString()) {
        apiUrl += `?${params.toString()}`;
      }

      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`GamerPower API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const giveaways = giveawaysResponseSchema.parse(data);

      // Cache the results
      await storage.setCachedGiveaways(giveaways);
      await storage.setCacheTimestamp(Date.now());

      const filteredGiveaways = applyFilters(giveaways, filters);
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

  // Get giveaway statistics
  app.get("/api/stats", async (req, res) => {
    try {
      let giveaways = await storage.getCachedGiveaways();
      
      if (!giveaways) {
        const response = await fetch(`${GAMERPOWER_BASE_URL}/giveaways`);
        if (!response.ok) {
          throw new Error(`GamerPower API error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        giveaways = giveawaysResponseSchema.parse(data);
        
        await storage.setCachedGiveaways(giveaways);
        await storage.setCacheTimestamp(Date.now());
      }

      const stats = {
        totalGiveaways: giveaways.length,
        totalValue: giveaways.reduce((sum, g) => {
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

  const httpServer = createServer(app);
  return httpServer;
}

function applyFilters(giveaways: any[], filters: any) {
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

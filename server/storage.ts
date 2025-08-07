import { type Giveaway } from "@shared/schema";

export interface IStorage {
  // Cache for giveaways to avoid excessive API calls
  getCachedGiveaways(): Promise<Giveaway[] | null>;
  setCachedGiveaways(giveaways: Giveaway[]): Promise<void>;
  getCacheTimestamp(): Promise<number | null>;
  setCacheTimestamp(timestamp: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private giveawaysCache: Giveaway[] | null = null;
  private cacheTimestamp: number | null = null;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  async getCachedGiveaways(): Promise<Giveaway[] | null> {
    const now = Date.now();
    const timestamp = this.cacheTimestamp;
    
    if (!timestamp || now - timestamp > this.CACHE_DURATION) {
      return null;
    }
    
    return this.giveawaysCache;
  }

  async setCachedGiveaways(giveaways: Giveaway[]): Promise<void> {
    this.giveawaysCache = giveaways;
  }

  async getCacheTimestamp(): Promise<number | null> {
    return this.cacheTimestamp;
  }

  async setCacheTimestamp(timestamp: number): Promise<void> {
    this.cacheTimestamp = timestamp;
  }
}

export const storage = new MemStorage();

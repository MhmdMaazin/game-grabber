import { NextResponse } from 'next/server';
import { giveawaysResponseSchema } from '@shared/schema';

const GAMERPOWER_BASE_URL = 'https://www.gamerpower.com/api';
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000;

export async function GET() {
  try {
    const cacheKey = 'all-giveaways';
    let giveaways: any[] | null = null;
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      giveaways = cached.data;
    }
    if (!giveaways) {
      const resp = await fetch(`${GAMERPOWER_BASE_URL}/giveaways`, {
        headers: { 'User-Agent': 'Game Grabber Giveaway Tracker' },
      });
      if (!resp.ok) throw new Error(`GamerPower API error: ${resp.status}`);
      const data = await resp.json();
      giveaways = giveawaysResponseSchema.parse(data);
      cache.set(cacheKey, { data: giveaways, timestamp: Date.now() });
    }

    const stats = {
      totalGiveaways: giveaways.length,
      totalValue: giveaways.reduce((sum, g) => {
        const value = parseFloat(String(g.worth).replace('$', '').replace('N/A', '0'));
        return sum + (isNaN(value) ? 0 : value);
      }, 0),
      platforms: new Set(giveaways.map((g) => String(g.platforms).split(', ')).flat()).size,
      newToday: giveaways.filter((g) => {
        const publishedDate = new Date(g.published_date);
        const today = new Date();
        return publishedDate.toDateString() === today.toDateString();
      }).length,
    };

    return NextResponse.json(stats, { headers: { 'Access-Control-Allow-Origin': '*' } });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to fetch statistics', message: err?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}



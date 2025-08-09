import { NextRequest, NextResponse } from 'next/server';
import { giveawaySchema } from '@shared/schema';

const GAMERPOWER_BASE_URL = 'https://www.gamerpower.com/api';
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000;

export async function GET(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    if (!id) return NextResponse.json({ error: 'Invalid giveaway ID' }, { status: 400 });

    const cacheKey = `giveaway-${id}`;
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return NextResponse.json(cached.data, { headers: { 'Access-Control-Allow-Origin': '*' } });
    }

    const resp = await fetch(`${GAMERPOWER_BASE_URL}/giveaway?id=${id}`, {
      headers: { 'User-Agent': 'Game Grabber Giveaway Tracker' },
    });
    if (!resp.ok) {
      if (resp.status === 404) return NextResponse.json({ error: 'Giveaway not found' }, { status: 404 });
      throw new Error(`GamerPower API error: ${resp.status}`);
    }
    const data = await resp.json();
    const giveaway = giveawaySchema.parse(data);
    cache.set(cacheKey, { data: giveaway, timestamp: Date.now() });
    return NextResponse.json(giveaway, { headers: { 'Access-Control-Allow-Origin': '*' } });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to fetch giveaway', message: err?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}



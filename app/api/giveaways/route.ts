import { NextRequest, NextResponse } from 'next/server';
import { filterSchema, giveawaysResponseSchema } from '@shared/schema';

const GAMERPOWER_BASE_URL = 'https://www.gamerpower.com/api';

const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000;

function applyClientSideFilters(giveaways: any[], filters: any) {
  let filtered = [...giveaways];
  if (filters.search) {
    const searchTerm = String(filters.search).toLowerCase();
    filtered = filtered.filter((g) =>
      g.title.toLowerCase().includes(searchTerm) || g.description.toLowerCase().includes(searchTerm)
    );
  }
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

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const parsed = filterSchema.parse(Object.fromEntries(url.searchParams.entries()));

    const cacheKey = JSON.stringify(parsed);
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      const filtered = applyClientSideFilters(cached.data, parsed);
      return NextResponse.json(filtered, { headers: { 'Access-Control-Allow-Origin': '*' } });
    }

    let apiUrl = `${GAMERPOWER_BASE_URL}/giveaways`;
    const params = new URLSearchParams();

    if (parsed.platform && parsed.platform !== 'all') {
      const platformMap: Record<string, string> = {
        steam: 'steam',
        'epic-games-store': 'epic-games-store',
        gog: 'gog',
        ubisoft: 'ubisoft',
        origin: 'origin',
      };
      params.append('platform', platformMap[parsed.platform] || parsed.platform);
    }
    if (parsed.type && parsed.type !== 'all') {
      params.append('type', parsed.type);
    }
    if (parsed.sort === 'value') {
      params.append('sort-by', 'value');
    } else if (parsed.sort === 'popularity') {
      params.append('sort-by', 'popularity');
    }

    if (params.toString()) apiUrl += `?${params.toString()}`;

    const resp = await fetch(apiUrl, { headers: { 'User-Agent': 'Game Grabber Giveaway Tracker' } });
    if (!resp.ok) throw new Error(`GamerPower API error: ${resp.status}`);
    const data = await resp.json();
    if (!Array.isArray(data)) {
      if (data.status_code) throw new Error(`API Error: ${data.error_message || 'Unknown error'}`);
      return NextResponse.json([], { status: 500 });
    }
    const giveaways = giveawaysResponseSchema.parse(data);
    cache.set(cacheKey, { data: giveaways, timestamp: Date.now() });
    const filtered = applyClientSideFilters(giveaways, parsed);
    return NextResponse.json(filtered, { headers: { 'Access-Control-Allow-Origin': '*' } });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to fetch giveaways', message: err?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}



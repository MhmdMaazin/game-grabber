import { NextRequest, NextResponse } from 'next/server';
import { giveawaysResponseSchema } from '@shared/schema';

const GAMERPOWER_BASE_URL = 'https://www.gamerpower.com/api';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const platform = url.searchParams.get('platform');
    const type = url.searchParams.get('type');
    if (!platform && !type) {
      return NextResponse.json({ error: 'At least one filter parameter (platform or type) is required' }, { status: 400 });
    }
    const params = new URLSearchParams();
    if (platform) params.append('platform', platform);
    if (type) params.append('type', type);
    const apiUrl = `${GAMERPOWER_BASE_URL}/filter?${params.toString()}`;
    const resp = await fetch(apiUrl, { headers: { 'User-Agent': 'Game Grabber Giveaway Tracker' } });
    if (!resp.ok) throw new Error(`GamerPower API error: ${resp.status}`);
    const data = await resp.json();
    const giveaways = giveawaysResponseSchema.parse(data);
    return NextResponse.json(giveaways, { headers: { 'Access-Control-Allow-Origin': '*' } });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to fetch filtered giveaways', message: err?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}



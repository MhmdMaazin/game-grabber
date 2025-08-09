import { NextResponse } from 'next/server';

const GAMERPOWER_BASE_URL = 'https://www.gamerpower.com/api';

export async function GET() {
  try {
    const resp = await fetch(`${GAMERPOWER_BASE_URL}/worth`, {
      headers: { 'User-Agent': 'Game Grabber Giveaway Tracker' },
    });
    if (!resp.ok) throw new Error(`GamerPower API error: ${resp.status}`);
    const data = await resp.json();
    return NextResponse.json(data, { headers: { 'Access-Control-Allow-Origin': '*' } });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to fetch worth estimation', message: err?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}



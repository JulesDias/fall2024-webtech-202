// src/app/api/war/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://helldiverstrainingmanual.com/api/v1/war/status');
    if (!response.ok) {
      throw new Error('Failed to fetch data from external API');
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

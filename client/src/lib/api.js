// lib/api.js
export async function fetchData() {
    const res = await fetch('https://helldiverstrainingmanual.com/api/v1/war/status');
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  }
  
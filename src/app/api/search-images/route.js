import { google } from 'googleapis';

const customSearch = google.customsearch('v1');

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return new Response(JSON.stringify({ error: 'Query parameter is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const res = await customSearch.cse.list({
      cx: process.env.GOOGLE_CX,
      q: query,
      searchType: 'image',
      key: process.env.GOOGLE_API_KEY,
      num: 10
    });

    return new Response(JSON.stringify({ items: res.data.items || [] }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error searching images:', error);
    return new Response(JSON.stringify({ error: 'Failed to search images' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
} 
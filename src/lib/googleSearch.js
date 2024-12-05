import { google } from 'googleapis';

const customSearch = google.customsearch('v1');

export const searchImages = async (query) => {
  try {
    const res = await customSearch.cse.list({
      cx: process.env.NEXT_PUBLIC_GOOGLE_CX,
      q: query,
      searchType: 'image',
      key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
      num: 10
    });
    return res.data.items || [];
  } catch (error) {
    console.error('Error searching images:', error);
    return [];
  }
}; 
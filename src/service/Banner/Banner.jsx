export const fetchBanner = async () => {
  const url = 'https://huuphuoc.id.vn/api/showBanner';

  try {
    const response = await fetch(url, {
      referrerPolicy: 'unsafe-url',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch banners');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching banners:', error);
    throw error;
  }
};
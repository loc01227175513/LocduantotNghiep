export const fetchBanner = async () => {
    const url = 'http://huuphuoc.id.vn/api/showBanner';
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch banners');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
};
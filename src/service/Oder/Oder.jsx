export const Oder = async () => {
    const url = 'https://huuphuoc.id.vn/api/lichsumuahang';
  
    // Retrieve data from local storage
    const data = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('data')) : null;
  
    if (!data || !data.id) {
      throw new Error('No valid data found in local storage');
    }
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_nguoidung: data.id }), // Ensure the body is an object
        referrerPolicy: 'unsafe-url',
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
  
      return response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw new Error('Network error or server is down');
    }
  };
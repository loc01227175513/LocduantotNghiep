export const Login = async (data) => {
    const url = 'https://huuphuoc.id.vn/api/login';
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      referrerPolicy: 'unsafe-url',
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
  
    return response.json();
  };
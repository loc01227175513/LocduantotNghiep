export const user = async () => {
    const url = 'http://127.0.0.1:8000/api/laynguoidung';
  
    // Retrieve data from local storage
    const data = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('data')) : null;
  
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
        const errorResponse = await response.json();
        console.error('Error Response:', errorResponse);
        throw new Error('Failed to fetch user data');
      }
  
      return response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw new Error('Network error or server is down');
    }
  };
  
  export const updateUser = async (data) => {
    const url = 'http://127.0.0.1:8000/api/CapNhatNguoiDung';
    const localData = JSON.parse(localStorage.getItem('data')); // Renamed to localData
  
    if (!localData || !localData.id) {
      throw new Error('No valid data found in local storage');
    }
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_nguoidung: localData.id, ...data }),
        referrerPolicy: 'unsafe-url',
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error Response:', errorResponse);
        throw new Error('Failed to update user data');
      }
  
      return response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw new Error('Network error or server is down');
    }
  };
  
  export const ShowUser = async () => {
    const url = 'http://127.0.0.1:8000/api/ShowNguoiDung';
    const localData = JSON.parse(localStorage.getItem('data')); // Renamed to localData
  
    if (!localData || !localData.id) {
      throw new Error('No valid data found in local storage');
    }
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_nguoidung: localData.id }),
        referrerPolicy: 'unsafe-url',
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error Response:', errorResponse);
        throw new Error('Failed to show user data');
      }
  
      return response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw new Error('Network error or server is down');
    }
  };
  
  export const UpdatePassWord = async (data) => {
    const url = 'http://127.0.0.1:8000/api/CapNhatMatKhau';
    const localData = JSON.parse(localStorage.getItem('data'));
  
    if (!localData || !localData.id) {
      throw new Error('No valid data found in local storage');
    }
  
    const requestBody = {
      id_nguoidung: localData.id,
      ...data
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        referrerPolicy: 'unsafe-url',
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error Response:', errorResponse);
        throw new Error('Failed to update password');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw new Error('Network error or server is down');
    }
  };
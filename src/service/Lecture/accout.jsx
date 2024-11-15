
export const updateUser = async (data) => {
    const url = 'http://huuphuoc.id.vn/api/CapNhatGiangVien';
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
        });

        if (!response.ok) {
            throw new Error('Failed to update user data');
        }

        return response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Network error or server is down');
    }
};
export const ShowUser = async () => {
    const url = 'http://huuphuoc.id.vn/api/ShowGiangVien';
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
            body: JSON.stringify({ id_nguoidung: localData.id}),
        });

        if (!response.ok) {
            throw new Error('Failed to update user data');
        }

        return response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Network error or server is down');
    }
};
export const UpdatePassWord = async (data) => {
    const url = 'http://huuphuoc.id.vn/api/CapNhatMatKhauGiangVien';
    const localData = JSON.parse(localStorage.getItem('data'));
  
    if (!localData || !localData.id) {
      throw new Error('No valid data found in local storage');
    }
  
    const requestBody = {
      id_nguoidung: localData.id,
      ...data
    };
  
    // Remove sensitive data logging
    // console.log('Request Body:', requestBody);
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error Response:', errorResponse);
        throw new Error('Failed to update user data');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw new Error('Network error or server is down');
    }
  };

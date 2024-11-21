export const updateUser = async (data) => {
  const url = 'https://huuphuoc.id.vn/api/CapNhatGiangVien';
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
      throw new Error('Failed to update user data');
    }

    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error('Network error or server is down');
  }
};

export const ShowUser = async () => {
  const url = 'https://huuphuoc.id.vn/api/ShowGiangVien';
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
      throw new Error('Failed to update user data');
    }

    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error('Network error or server is down');
  }
};

export const UpdatePassWord = async (data) => {
  const url = 'https://huuphuoc.id.vn/api/CapNhatMatKhauGiangVien';
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
      throw new Error('Failed to update user data');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error('Network error or server is down');
  }
};
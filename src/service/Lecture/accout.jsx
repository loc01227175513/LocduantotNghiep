export const updateUser = async (data) => {
  const url = 'https://huuphuoc.id.vn/api/CapNhatGiangVien';
  
  try {
    const localData = JSON.parse(localStorage.getItem('data'));
    if (!localData?.id) {
      throw new Error('No valid data found in local storage');
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_nguoidung: localData.id, ...data }),
      referrerPolicy: 'unsafe-url',
    });

    const responseData = await response.json();
    
    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to update user data');
    }

    return responseData;
  } catch (error) {
    console.error('Update user error:', error);
    throw error instanceof Error ? error : new Error('Network error or server is down');
  }
};

export const ShowUser = async () => {
  const url = 'https://huuphuoc.id.vn/api/ShowGiangVien';
  
  try {
    const localData = JSON.parse(localStorage.getItem('data'));
    if (!localData?.id) {
      throw new Error('No valid data found in local storage');
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_nguoidung: localData.id }),
      referrerPolicy: 'unsafe-url',
    });

    const responseData = await response.json();
    
    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to fetch user data');
    }

    return responseData;
  } catch (error) {
    console.error('Show user error:', error);
    throw error instanceof Error ? error : new Error('Network error or server is down');
  }
};

export const UpdatePassWord = async (data) => {
  const url = 'https://huuphuoc.id.vn/api/CapNhatMatKhauGiangVien';
  
  try {
    const localData = JSON.parse(localStorage.getItem('data'));
    if (!localData?.id) {
      throw new Error('No valid data found in local storage');
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        id_nguoidung: localData.id,
        ...data 
      }),
      referrerPolicy: 'unsafe-url',
    });

    const responseData = await response.json();
    
    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to update password');
    }

    return responseData;
  } catch (error) {
    console.error('Update password error:', error);
    throw error instanceof Error ? error : new Error('Network error or server is down');
  }
};
export const Lecture = async () => {
  const url = 'https://huuphuoc.id.vn/api/khoahocbanduocgiangvien';

  try {
    // Retrieve and validate data from local storage
    const data = JSON.parse(localStorage.getItem('data'));
    if (!data?.id) {
      throw new Error('No valid data found in local storage');
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_nguoidung: data.id }),
      referrerPolicy: 'unsafe-url',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error('Lecture fetch error:', error.message);
    throw error; // Re-throw để component có thể xử lý lỗi
  }
};

export const GiangVienHienTai = async () => {
  const url = 'https://huuphuoc.id.vn/api/giangvienhientai';

  try {
    // Retrieve and validate data from local storage
    const data = JSON.parse(localStorage.getItem('lecturerId'));
    if (!data?.giangvien) {
      throw new Error('No valid lecturer data found in local storage');
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_giangvien: data.giangvien }),
      referrerPolicy: 'unsafe-url',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error('GiangVienHienTai fetch error:', error.message);
    throw error;
  }
};

export const TatCaGiangVien = async () => {
  const url = 'https://huuphuoc.id.vn/api/giangvien';
  
  try {
    const response = await fetch(url, {
      referrerPolicy: 'unsafe-url',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
    
  } catch (error) {
    console.error('TatCaGiangVien fetch error:', error.message);
    throw error;
  }
};
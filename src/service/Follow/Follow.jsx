export const TheoDoiGiangVien = async () => {
    const url = 'https://huuphuoc.id.vn/api/TheoDoiGiangVien';
    const userData = localStorage.getItem('data');
  
    if (!userData) {
      throw new Error('No user data found');
    }
  
    let parsedLecturer;
    try {
      parsedLecturer = JSON.parse(userData);
    } catch (error) {
      throw new Error('Invalid user data');
    }
  
    const urlParams = new URLSearchParams(window.location.search);
    const id_giangvien = urlParams.get('id');
  
    if (!id_giangvien) {
      throw new Error('No lecturer ID provided');
    }
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_giangvien: id_giangvien,
        id_nguoidung: parsedLecturer.id,
      }),
      referrerPolicy: 'unsafe-url',
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    return response.json();
  };
  
  export const DanhSachTheoDoi = async () => {
    const userData = localStorage.getItem('data');
    const parsedLecturer = JSON.parse(userData);
    const url = 'https://huuphuoc.id.vn/api/showAllTheoDoi';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_nguoidung: parsedLecturer.id,
      }),
      referrerPolicy: 'unsafe-url',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    return response.json();
  };
  
  export const BoTheoDoiGiangVien = async (id) => {
    const url = `https://huuphuoc.id.vn/api/deleteTheoDoi/${id}`;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        referrerPolicy: 'unsafe-url',
      });
      if (!response.ok) {
        throw new Error('Failed to unfollow lecturer');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
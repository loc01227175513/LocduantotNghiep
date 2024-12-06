export const DanhSachTinNhan = async () => {
  try {
    if (typeof window === 'undefined') {
      throw new Error('localStorage is not available');
    }
    const userData = window.localStorage.getItem('data');
    if (!userData) {
      throw new Error('No user data found');
    }
    const parsedLecturer = JSON.parse(userData);
    
    const response = await fetch('https://huuphuoc.id.vn/api/showAllNhanTin', {
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error in DanhSachTinNhan:', error);
    throw error;
  }
};
  
  export const NguoiDungTinNhan = async () => {
    if (typeof window === 'undefined') {
      throw new Error('localStorage is not available');
    }
    const userData = window.localStorage.getItem('data');
    if (!userData) {
      throw new Error('No user data found');
    }
    let parsedLecturer;
    try {
      parsedLecturer = JSON.parse(userData);
    } catch (error) {
      throw new Error('Invalid user data');
    }
    const url = 'https://huuphuoc.id.vn/api/laynguoidung';
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
      throw new Error('Failed to fetch messages');
    }
    return response.json();
  };
  
  export const showGiangVien = async () => {
    try {
      const response = await fetch('https://huuphuoc.id.vn/api/giangvien', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        referrerPolicy: 'unsafe-url',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error in showGiangVien:', error);
      throw error;
    }
  };
  
  export const DanhSachTinNhanGiangVien = async () => {
    if (typeof window === 'undefined') {
      throw new Error('localStorage is not available');
    }
    const userData = window.localStorage.getItem('lecturerId');
    if (!userData) {
      throw new Error('No lecturer ID found in localStorage');
    }
    const parsedLecturer = JSON.parse(userData);
    const url = process.env.REACT_APP_API_URL || 'https://huuphuoc.id.vn/api/showAllNhanTinGiangVien';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_giangvien: parsedLecturer.giangvien,
        }),
        referrerPolicy: 'unsafe-url',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      return response.json();
    } catch (error) {
      throw new Error('Network error');
    }
  };
  
  export const ShowAllNguoiDung = async () => {
    const url = 'https://huuphuoc.id.vn/api/showAllNguoiDung';
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        referrerPolicy: 'unsafe-url',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return response.json();
    } catch (error) {
      throw new Error('Network error');
    }
  };
  
  export const GiangVienHientai = async () => {
    try {
      if (typeof window === 'undefined') {
        throw new Error('localStorage is not available');
      }
      
      const userData = localStorage.getItem('lecturerId');
      if (!userData) {
        throw new Error('No lecturer ID found in localStorage');
      }

      const parsedLecturer = JSON.parse(userData);
      const response = await fetch('https://huuphuoc.id.vn/api/giangVienHientai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_giangvien: parsedLecturer.giangvien,
        }),
        referrerPolicy: 'unsafe-url',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error in GiangVienHientai:', error);
      throw error;
    }
  };
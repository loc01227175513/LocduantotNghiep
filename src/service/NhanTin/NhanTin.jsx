export const DanhSachTinNhan = async () => {
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
    const url = 'https://huuphuoc.id.vn/api/showAllNhanTin';
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
  
  export const NguoiDungTinNhan = async () => {
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
    } catch (error) {
      throw new Error('Invalid user data');
    }
    const url = `https://huuphuoc.id.vn/api/giangvien`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'unsafe-url',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch lecturers');
    }
    return response.json();
  };
  
  export const DanhSachTinNhanGiangVien = async () => {
    const userData = localStorage.getItem('lecturerId');
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
    const userData = localStorage.getItem('lecturerId');
    if (!userData) {
      throw new Error('No lecturer ID found in localStorage');
    }
  
    let parsedLecturer;
    try {
      parsedLecturer = JSON.parse(userData);
    } catch (error) {
      throw new Error('Failed to parse lecturer data');
    }
  
    const url = 'https://huuphuoc.id.vn/api/giangVienHientai';
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
      throw new Error('Failed to fetch current lecturer data');
    }
    return response.json();
  };
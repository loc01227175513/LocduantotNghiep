export const Dashboard = async () => {
    const userData = localStorage.getItem('data');
    const parsedData = JSON.parse(userData);
    const url = 'https://huuphuoc.id.vn/api/khoahocdadangky';
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_nguoidung: parsedData.id }),
      referrerPolicy: 'unsafe-url',
    }); // Gọi API nội bộ
  
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    return response.json();
  };
  
  export const KhoaHocDaHoc = async () => {
    const userData = localStorage.getItem('data');
    const parsedData = JSON.parse(userData);
    const url = 'https://huuphuoc.id.vn/api/KhoaHocDaHoc';
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_nguoidung: parsedData.id }),
      referrerPolicy: 'unsafe-url',
    }); // Gọi API nội bộ
  
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    return response.json();
  };
  
  export const KhoaHocDangHoc = async () => {
    const userData = localStorage.getItem('data');
    const parsedData = JSON.parse(userData);
    const url = 'https://huuphuoc.id.vn/api/khoahocdanghoc';
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_nguoidung: parsedData.id }),
      referrerPolicy: 'unsafe-url',
    }); // Gọi API nội bộ
  
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    return response.json();
  };
  
  export const KhoaHocDaHoanThanh = async () => {
    const userData = localStorage.getItem('data');
    const parsedData = JSON.parse(userData);
    const url = 'https://huuphuoc.id.vn/api/KhoaHocDaHoc ';
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_nguoidung: parsedData.id }),
      referrerPolicy: 'unsafe-url',
    }); // Gọi API nội bộ
  
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    return response.json();
  };
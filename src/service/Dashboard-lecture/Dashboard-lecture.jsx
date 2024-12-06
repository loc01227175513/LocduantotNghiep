export const Dashboard = async () => {
    const userData = localStorage.getItem('data');
    const parsedData = JSON.parse(userData);
    const url = 'https://huuphuoc.id.vn/api/kiemtragiangvien';
  
    try {
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
    } catch (error) {
        console.error('Error in Dashboard:', error);
        throw error; // Rethrow the error after logging
    }
};
  
export const GiangvienKhoaHoc = async () => {
    const userData = localStorage.getItem('lecturerId');
    const parsedLecturer = JSON.parse(userData);
    const url = 'https://huuphuoc.id.vn/api/laykhoahocdanglam';
  
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_giangvien: parsedLecturer.giangvien }),
            referrerPolicy: 'unsafe-url',
        }); // Gọi API nội bộ
  
        if (!response.ok) {
            throw new Error('Failed to fetch courses');
        }
        return response.json();
    } catch (error) {
        console.error('Error in GiangvienKhoaHoc:', error);
        throw error; // Rethrow the error after logging
    }
};
  
export const GiangvienKhoaHocDaMua = async () => {
    const userData = localStorage.getItem('lecturerId');
    const parsedLecturer = JSON.parse(userData);
    const url = 'https://huuphuoc.id.vn/api/TongSoDangKy';
  
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_giangvien: parsedLecturer.giangvien }),
            referrerPolicy: 'unsafe-url',
        }); // Gọi API nội bộ
  
        if (!response.ok) {
            throw new Error('Failed to fetch courses');
        }
        return response.json();
    } catch (error) {
        console.error('Error in GiangvienKhoaHocDaMua:', error);
        throw error; // Rethrow the error after logging
    }
};
  
export const GiangvienDoanhThu = async () => {
    const userData = localStorage.getItem('lecturerId');
    const parsedLecturer = JSON.parse(userData);
    const url = 'https://huuphuoc.id.vn/api/DoanhThuGiangVien';
  
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_giangvien: parsedLecturer.giangvien }),
            referrerPolicy: 'unsafe-url',
        }); // Gọi API nội bộ
  
        if (!response.ok) {
            throw new Error('Failed to fetch courses');
        }
        return response.json();
    } catch (error) {
        console.error('Error in GiangvienDoanhThu:', error);
        throw error; // Rethrow the error after logging
    }
};
// Utility function to fetch data
const fetchData = async (url, id) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_nguoidung: id }),
        referrerPolicy: 'unsafe-url',
    });
  
    if (!response.ok) {
        throw new Error('Failed to fetch courses');
    }
    return response.json();
};

export const Dashboard = async () => {
    const userData = localStorage.getItem('data');
    const parsedData = JSON.parse(userData);
    const url = 'https://huuphuoc.id.vn/api/khoahocdadangky';
  
    return fetchData(url, parsedData.id);
};

export const KhoaHocDaHoc = async () => {
    const userData = localStorage.getItem('data');
    const parsedData = JSON.parse(userData);
    const url = 'https://huuphuoc.id.vn/api/KhoaHocDaHoc';
  
    return fetchData(url, parsedData.id);
};

export const KhoaHocDangHoc = async () => {
    const userData = localStorage.getItem('data');
    const parsedData = JSON.parse(userData);
    const url = 'https://huuphuoc.id.vn/api/khoahocdanghoc';
  
    return fetchData(url, parsedData.id);
};

export const KhoaHocDaHoanThanh = async () => {
    const userData = localStorage.getItem('data');
    const parsedData = JSON.parse(userData);
    const url = 'https://huuphuoc.id.vn/api/KhoaHocDaHoc';
    
    return fetchData(url, parsedData.id);
};
export const LayThongBao = async () => {
    const userData = localStorage.getItem('data');
    const user = JSON.parse(userData);
    const url = `https://huuphuoc.id.vn/api/Nhanthongbao/${user.id}`;
  
    const response = await fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'unsafe-url',
    }); // Gọi API nội bộ
  
    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }
    
    const data = await response.json();
    
    // Process the data as needed
    return data.data.map(notification => {
        const content = JSON.parse(notification.noidung);
        return {
            ...notification,
            noidung: content
        };
    });
};
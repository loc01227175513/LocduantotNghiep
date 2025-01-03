export const ThanhToanKhoaHocFree = async (id_giangvien) => {
    const url = 'https://huuphuoc.id.vn/api/thanhtoanKhoahocFree';
    const data = JSON.parse(localStorage.getItem('data'));
    const urlParams = new URLSearchParams(window.location.search);
    const id_khoahoc = urlParams.get('id');
  
    if (!data || !data.id) {
      throw new Error('No valid data found in local storage');
    }
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          total: 0,
          id_nguoidung: data.id,
          id_khoahoc: [[id_khoahoc]],
          id_giangvien: [[id_giangvien]],
          gia: [[0]],
          giamgia: [[0]],
        }),
        referrerPolicy: 'unsafe-url',
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch user data: ${errorMessage}`);
      }
  
      return response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw new Error('Network error or server is down');
    }
  };
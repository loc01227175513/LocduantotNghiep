export const AddKhuyenMaiKhoaHoc = async (selectedCoupon) => {
    const url = 'https://huuphuoc.id.vn/api/addMaGiamGiaKhoaHoc';
  
    const urlParams = new URLSearchParams(window.location.search);
    const id_khoahoc = urlParams.get('id');
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_khoahoc: id_khoahoc,
          id_magiamgia: selectedCoupon,
        }),
        referrerPolicy: 'unsafe-url',
      });
  
      if (!response.ok) {
        throw new Error('Failed to add MaGiamGia');
      }
  
      return response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw new Error('Network error or server is down');
    }
  };
  
  export const TatCaKhuyenMaiKhoaHoc = async () => {
    const url = 'https://huuphuoc.id.vn/api/showAllMaGiamGiaKhoaHoc';
    try {
      const response = await fetch(url, {
        referrerPolicy: 'unsafe-url',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch MaGiamGia data');
      }
      return response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw new Error('Network error or server is down');
    }
  };
  
  export const TatCaKhuyenMai = async () => {
    const url = 'https://huuphuoc.id.vn/api/showAllMaGiamGia';
    try {
      const response = await fetch(url, {
        referrerPolicy: 'unsafe-url',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch MaGiamGia data');
      }
      return response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw new Error('Network error or server is down');
    }
  };
  
  export const NguoiDungMaGiamGia = async (DataCoupon) => {
    const url = 'https://huuphuoc.id.vn/api/addNguoiDungMaGiamGia';
    const userData = localStorage.getItem('data');
  
    if (!userData) {
      throw new Error('User not authenticated');
    }
  
    const user = JSON.parse(userData);
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trangthai: "Chưa sử dụng",
          dasudunghientai: "0",
          id_nguoidung: user.id,
          id_magiamgia: DataCoupon.id_magiamgia,
        }),
        referrerPolicy: 'unsafe-url',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add MaGiamGia');
      }
  
      return response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw new Error(error.message || 'Network error or server is down');
    }
  };
  
  export const showAllNguoiDungMaGiamGia = async () => {
    const user = JSON.parse(localStorage.getItem('data'));
    if (!user || !user.id) {
      throw new Error('User data is missing or invalid');
    }
  
    const url = 'https://huuphuoc.id.vn/api/showAllNguoiDungMaGiamGia';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_nguoidung: user.id }),
        referrerPolicy: 'unsafe-url',
      });
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
  
      return response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw new Error('Network error or server is down');
    }
  };
  
  export const TinhMaGiamGia = async () => {
    const url = "https://huuphuoc.id.vn/api/TinhMaGiamGia";
    const userData = localStorage.getItem('data');
    const MaGiamGia = localStorage.getItem('appliedCoupons');
  
    if (!userData) {
      throw new Error('User not authenticated');
    }
  
    if (!MaGiamGia) {
      throw new Error('No applied coupons found');
    }
  
    try {
      const user = JSON.parse(userData);
      const MaArray = MaGiamGia ? JSON.parse(MaGiamGia) : [];
  
      if (!user.id || !MaArray[0]?.id_magiamgia) {
        throw new Error('Invalid user or coupon data');
      }
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_nguoidung: user.id,
          id_magiamgia: MaArray[0].id_magiamgia,
        }),
        referrerPolicy: 'unsafe-url',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add MaGiamGia');
      }
  
      return response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw new Error(error.message || 'Network error or server is down');
    }
  };
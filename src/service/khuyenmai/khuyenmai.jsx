export const AddKhuyenMaiKhoaHoc = async (selectedCoupon) => {
    const url = 'https://huuphuoc.id.vn/api/addMaGiamGiaKhoaHoc';
    const urlParams = new URLSearchParams(window.location.search);
    const id_khoahoc = urlParams.get('id');
  
    if (!id_khoahoc) {
      throw new Error('Không tìm thấy ID khóa học');
    }
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_khoahoc,
          id_magiamgia: selectedCoupon,
        }),
        referrerPolicy: 'unsafe-url',
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Thêm mã giảm giá thất bại');
      }
  
      return data;
    } catch (error) {
      console.error('Lỗi:', error);
      throw new Error(error.message || 'Lỗi kết nối hoặc máy chủ');
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
  
    try {
      const userData = localStorage.getItem('data');
      if (!userData) {
        throw new Error('Người dùng chưa đăng nhập');
      }
  
      const user = JSON.parse(userData);
      if (!user.id) {
        throw new Error('Thông tin người dùng không hợp lệ');
      }
  
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
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Thêm mã giảm giá thất bại');
      }
  
      return data;
    } catch (error) {
      console.error('Lỗi:', error);
      throw new Error(error.message || 'Lỗi kết nối hoặc máy chủ');
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
  
    try {
      const userData = localStorage.getItem('data');
      const MaGiamGia = localStorage.getItem('appliedCoupons');
  
      if (!userData) {
        throw new Error('Người dùng chưa đăng nhập');
      }
  
      if (!MaGiamGia) {
        throw new Error('Không tìm thấy mã giảm giá đã áp dụng');
      }
  
      const user = JSON.parse(userData);
      const MaArray = JSON.parse(MaGiamGia);
  
      if (!user.id || !MaArray[0]?.id_magiamgia) {
        throw new Error('Dữ liệu người dùng hoặc mã giảm giá không hợp lệ');
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
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Tính mã giảm giá thất bại');
      }
  
      return data;
    } catch (error) {
      console.error('Lỗi:', error);
      throw new Error(error.message || 'Lỗi kết nối hoặc máy chủ');
    }
  };
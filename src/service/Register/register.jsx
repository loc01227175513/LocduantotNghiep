export const Register = async (formData) => {
    const url = 'https://huuphuoc.id.vn/api/dangky';
    const timeout = 15000; // Timeout sau 15 giây
  
    try {
      // Tạo controller để có thể hủy request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        referrerPolicy: 'unsafe-url',
        signal: controller.signal // Thêm signal để có thể abort request
      });
  
      // Xóa timeout nếu request thành công
      clearTimeout(timeoutId);
  
      if (!response.ok) {
        const errorData = await response.json();
        // Xử lý các mã lỗi HTTP cụ thể
        switch (response.status) {
          case 400:
            throw new Error('Dữ liệu đăng ký không hợp lệ');
          case 409:
            throw new Error('Email đã được sử dụng');
          default:
            throw new Error(errorData.message || 'Đăng ký thất bại');
        }
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      // Xử lý các loại lỗi khác nhau
      if (error.name === 'AbortError') {
        throw new Error('Yêu cầu đăng ký đã hết thời gian');
      }
      if (error instanceof TypeError) {
        throw new Error('Lỗi kết nối mạng');
      }
      console.error('Lỗi trong quá trình đăng ký:', error);
      throw error;
    }
  };
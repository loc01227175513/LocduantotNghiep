export const Login = async (data) => {
    const url = 'http://127.0.0.1:8000/api/login';
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        referrerPolicy: 'unsafe-url',
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(responseData.message || 'Đăng nhập thất bại');
      }
  
      return responseData;
  
    } catch (error) {
      if (error.name === 'TypeError') {
        throw new Error('Lỗi kết nối server. Vui lòng kiểm tra kết nối mạng của bạn.');
      }
      throw error;
    }
  };
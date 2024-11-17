export const Register = async (formData) => {
    const url = 'https://huuphuoc.id.vn/api/dangky';
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        referrerPolicy: 'unsafe-url',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to register');
      }
  
      return response.json();
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  };
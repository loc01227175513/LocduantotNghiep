export const GiangvienTaoKhoaHoc = async (tieude, chude) => {
    const userData = localStorage.getItem('lecturerId');
    const parsedLecturer = JSON.parse(userData);
    const url = 'https://huuphuoc.id.vn/api/taokhoahoc';
  
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_giangvien: parsedLecturer.giangvien,
                ten: tieude,
                id_chude: chude,
            }),
            referrerPolicy: 'unsafe-url',
        });
  
        if (!response.ok) {
            throw new Error('Failed to fetch courses');
        }
        return response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error after logging it
    }
  };
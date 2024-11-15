export const GiangvienTaoKhoaHoc = async (tieude, chude) => {
    const userData = localStorage.getItem('lecturerId');
    const parsedLecturer = JSON.parse(userData);
    const url = 'http://huuphuoc.id.vn/api/taokhoahoc';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id_giangvien: parsedLecturer.giangvien,
            ten: tieude,
            id_chude: chude,
        })
    });

    if (!response.ok) {
        throw new Error('Failed to fetch courses');
    }
    return response.json();
}
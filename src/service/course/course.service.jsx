export const Allcoursesss = async () => {
  const url = 'https://huuphuoc.id.vn/api/allkhoahoc';

  try {
    const response = await fetch(url, {
      referrerPolicy: 'unsafe-url',
    }); // Gọi API nội bộ
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error; // Re-throw the error after logging it
  }
};

export const CourseDetails = async (id) => {
  const url = `https://huuphuoc.id.vn/api/Khoahocchitiet/${id}`;
  try {
    const response = await fetch(`${url}`, {
      referrerPolicy: 'unsafe-url',
    }); // Gọi API nội bộ
    if (!response.ok) {
      throw new Error('Failed to fetch course details');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching course details:', error);
    throw error; // Re-throw the error after logging it
  }
};

export const ThemKhoaHocDaHoc = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id_khoahoc = urlParams.get('id');
  console.log("id_khoahoc", id_khoahoc);
  const user = localStorage.getItem('data');
  const userJson = JSON.parse(user);

  if (!id_khoahoc) {
    throw new Error('Course ID not found in URL');
  }

  const url = `https://huuphuoc.id.vn/api/ThemKhoaHocDaHoc`;

  try {
    const response = await fetch(`${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_khoahoc: id_khoahoc,
        id_nguoidung: userJson.id,
      }),
      referrerPolicy: 'unsafe-url',
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Failed to fetch certificate: ${response.status} ${response.statusText} - ${errorDetails}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const GiangVienKhoaHocHienThi = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id_khoahoc = urlParams.get('id');

  if (!id_khoahoc) {
    console.error('Error: id_khoahoc is null or undefined');
    throw new Error('Invalid course ID');
  }

  const url = `https://huuphuoc.id.vn/api/GiangVienKhoaHocHienThi/${id_khoahoc}`;
  console.log('Fetching URL:', url);

  try {
    const response = await fetch(`${url}`, {
      referrerPolicy: 'unsafe-url',
    }); // Gọi API nội bộ

    if (!response.ok) {
      throw new Error('Failed to fetch course instructors');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching course instructors:', error);
    throw error; // Re-throw the error after logging it
  }
};
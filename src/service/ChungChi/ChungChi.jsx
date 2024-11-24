export const ChungChi = async () => {
  const url = 'https://huuphuoc.id.vn/api/ChungChi';

  const response = await fetch(`${url}`, {
    referrerPolicy: 'unsafe-url',
  }); // Gọi API nội bộ
  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }
  return response.json();
};

export const ChonChungChi = async (id) => {
  const urlParams = new URLSearchParams(window.location.search);
  const id_khoahoc = urlParams.get('id');
  console.log("id_khoahoc", id_khoahoc);

  if (!id_khoahoc) {
    throw new Error('Course ID not found in URL');
  }

  const url = `https://huuphuoc.id.vn/api/GiangVienCourseChungChi`;

  try {
    const response = await fetch(`${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_khoahoc: id_khoahoc,
        id_chungchi: id,
      }),
      referrerPolicy: 'unsafe-url',
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Failed to fetch certificate: ${response.status} ${response.statusText} - ${errorDetails}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
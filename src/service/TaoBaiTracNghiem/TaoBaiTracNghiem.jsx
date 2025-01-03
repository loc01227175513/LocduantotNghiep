export const TaoBaiTracNghiem = async ({ id_baihoc, tieu_de, mo_ta }) => {
  const url = 'https://huuphuoc.id.vn/api/TaoTracNghiem';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_baihoc,
        noidung: [
          {
            tieu_de: tieu_de,
            mota: mo_ta
          }
        ]
      }),
      referrerPolicy: 'unsafe-url',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to register');
    }

    return await response.json();
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};
export const ShowTracNghiem = async ({ id_baihoc }) => {
  const url = 'https://huuphuoc.id.vn/api/showTracNghiemGiangVien';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_baihoc: id_baihoc
      }),
      referrerPolicy: 'unsafe-url',
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Error Response:', errorResponse);
      throw new Error(`Failed to fetch data: ${errorResponse.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error('Network error or server is down');
  }
};

export const TaoCauHoi = async ({ id_baihoc, id_baitracnghiem, cau_hoi, cau_traloi }) => {
  const url = 'https://huuphuoc.id.vn/api/TaoCauHoiTracNghiem';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_baihoc: id_baihoc,
        noidung: [
          {
            id_baitracnghiem: id_baitracnghiem,
            cau_hoi: cau_hoi,
            cau_traloi: cau_traloi.map(answer => ({
              text: answer.text,
              is_correct: answer.is_correct
            }))
          }
        ]
      }),
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

export const XoaCauHoi = async ({ BaihocidNe, quizId, hoiIndex }) => {
  const url = 'https://huuphuoc.id.vn/api/XoaCauHoiTracNghiem';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_baihoc: BaihocidNe,
        id_baitracnghiem: quizId,
        thutumang: hoiIndex
      }),
      referrerPolicy: 'unsafe-url',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete question');
    }

    return response.json();
  } catch (error) {
    console.error('Error during deletion:', error);
    throw error;
  }
};



export const XoaPhanTracNghiem = async ({ id_baihoc, id_baitracnghiem}) => {
  const url = 'https://huuphuoc.id.vn/api/XoaPhanTracNghiem';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_baihoc,
        id_baitracnghiem,
      }),
      referrerPolicy: 'unsafe-url',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete question');
    }

    return response.json();
  } catch (error) {
    console.error('Error during deletion:', error);
    throw error;
  }
};

export const ShowCauHoi = async (BaihocidNe, quizId) => {
  const url = 'https://huuphuoc.id.vn/api/ShowCauHoi';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_baihoc: BaihocidNe,
        id_baitracnghiem: quizId,
      }),
      referrerPolicy: 'unsafe-url',
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Error Response:', errorResponse);
      throw new Error(`Failed to fetch data: ${errorResponse.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error('Network error or server is down');
  }
};


export const GuiCauTraLoi = async ({ id_baihoc, noidung }) => {
  const user = localStorage.getItem("data");
  const url = "https://huuphuoc.id.vn/api/NguoiDungGuiDapAn";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_baihoc,
        id_nguoidung: JSON.parse(user).id,
        noidung,
      }),
      referrerPolicy: "unsafe-url",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to send answers");
    }

    return response.json();
  } catch (error) {
    console.error("Error during sending answers:", error);
    throw error;
  }
};

export const showAllTracNghiemNguoiDung = async ({ id_baihoc }) => {
  const user = localStorage.getItem("data");
  const url = 'https://huuphuoc.id.vn/api/showAllTracNghiemNguoiDung';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_baihoc :id_baihoc,
        id_nguoidung: JSON.parse(user).id,
      }),
      referrerPolicy: 'unsafe-url',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to complete quiz');
    }

    return response.json();
  } catch (error) {
    console.error('Error during completion:', error);
    throw error;
  }
}
export const HoanThanhTracNghiem = async ({ id_baihoc }) => {
  const user = localStorage.getItem("data");
  const url = 'https://huuphuoc.id.vn/api/GuiTrangThaiBaiTracNghiem';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        trangthai :"Active",
        id_baihoc :id_baihoc,
        id_nguoidung: JSON.parse(user).id,
      }),
      referrerPolicy: 'unsafe-url',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to complete quiz');
    }

    return response.json();
  } catch (error) {
    console.error('Error during completion:', error);
    throw error;
  }
};

export const checkQuizCompletion = async ({ id_baihoc }) => {
  const url = 'https://huuphuoc.id.vn/api/showTrangThaiHoangThanh';
  const userData = localStorage.getItem("data");

  if (!userData) {
      throw new Error('User not authenticated.');
  }

  let user;
  try {
      user = JSON.parse(userData);
  } catch (parseError) {
      console.error('Error parsing user data:', parseError);
      throw new Error('Invalid user data.');
  }

  if (!id_baihoc) {
      throw new Error('id_baihoc is required.');
  }

  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              id_baihoc: id_baihoc,
              id_nguoidung: user.id,
          }),
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to complete quiz');
      }

      const data = await response.json();

      if (!data.trangthai) {
          throw new Error('Invalid response from server.');
      }

      return data;
  } catch (error) {
      console.error('Error during quiz completion check:', error);
      throw error;
  }
}
export const Addcart = async () => {
  const url = 'https://huuphuoc.id.vn/api/addcart';
  const user = localStorage.getItem('data');

  if (!user) {
    return null;
  }

  let parsedUser;
  try {
    parsedUser = JSON.parse(user);
  } catch (error) {
    return null;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const id_khoahoc = urlParams.get('id');

  if (!id_khoahoc) {
    return null;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_nguoidung: parsedUser.id,
        id_khoahoc: id_khoahoc,
      }),
      referrerPolicy: 'unsafe-url',
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    return null;
  }
};

export const Showcart = async () => {
  const url = 'https://huuphuoc.id.vn/api/showgiohang';
  const user = localStorage.getItem('data');

  if (!user) {
    return null;
  }

  let parsedUser;
  try {
    parsedUser = JSON.parse(user);
  } catch (error) {
    return null;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_nguoidung: parsedUser.id,
      }),
      referrerPolicy: 'unsafe-url',
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (!data || !data.data) {
      return null;
    }

    return data;
  } catch (error) {
    return null;
  }
};

export const KhoaHocDaDanKy = async () => {
  const url = 'https://huuphuoc.id.vn/api/khoahocdadangky';
  const user = localStorage.getItem('data');

  if (!user) {
    return null;
  }

  let parsedUser;
  try {
    parsedUser = JSON.parse(user);
  } catch (error) {
    return null;
  }

  if (!parsedUser.id) {
    return null;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_nguoidung: parsedUser.id,
      }),
      referrerPolicy: 'unsafe-url',
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (!data || !data.data) {
      return null;
    }

    return data;
  } catch (error) {
    return null;
  }
};
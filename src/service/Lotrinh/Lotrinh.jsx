
export const LoTrinhKhoaHoc =async()=>{
    const url = 'http://huuphuoc.id.vn/api/lotrinhkhoahoc'

    const response = await fetch(`${url}`); // Gọi API nội bộ
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    return response.json(); 
}

export const LoTrinhKhoaHocCon =async()=>{
    const url = 'http://huuphuoc.id.vn/api/lotrinhkhoahoccon'

    const response = await fetch(`${url}`); // Gọi API nội bộ
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    return response.json(); 
}
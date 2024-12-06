export const Oder = async () => {
    const url = 'https://huuphuoc.id.vn/api/lichsumuahang';
    
    try {
        // Kiểm tra và lấy dữ liệu từ localStorage một cách an toàn
        const data = await new Promise((resolve, reject) => {
            try {
                const storageData = localStorage.getItem('data');
                if (!storageData) {
                    reject(new Error('Không tìm thấy dữ liệu trong localStorage'));
                }
                resolve(JSON.parse(storageData));
            } catch (error) {
                reject(new Error('Lỗi khi đọc dữ liệu từ localStorage'));
            }
        });

        // Kiểm tra id người dùng
        if (!data?.id) {
            throw new Error('ID người dùng không hợp lệ');
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ id_nguoidung: data.id }),
            referrerPolicy: 'unsafe-url',
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Lỗi API: ${response.status} - ${errorData}`);
        }

        return await response.json();
        
    } catch (error) {
        console.error('Lỗi trong quá trình xử lý:', error.message);
        throw error; // Ném lỗi để component cha có thể xử lý
    }
};
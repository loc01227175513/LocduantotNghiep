import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

function TrangDich() {
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTopics, setFilteredTopics] = useState([]);
    const userData = typeof window !== 'undefined' ? localStorage.getItem('lecturerId') : null;
    const parsedData = userData ? JSON.parse(userData) : {};
    const cloudName = 'dn7s1su66';
    const uploadPreset = 'my_unsigned_preset';
    const [id, setId] = useState(null);
    const [formData, setFormData] = useState({
        ten: '',
        hinh: '',
        id_khoahoc: '',
        id_chude: '',
        id_theloaicon: '',
        id_theloai: '',
        trinhdo: '',
        mota: '',
        id_giangvien: parsedData?.giangvien || '',
    });
    const [imageSelected, setImageSelected] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (typeof window !== "undefined") {
            const currentUrl = window.location.href;
            const url = new URL(currentUrl);
            const idFromUrl = url.searchParams.get("id");
            setId(idFromUrl);
            setFormData(prevFormData => ({
                ...prevFormData,
                id_khoahoc: idFromUrl
            }));
        }
    }, []);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await axios.post('https://huuphuoc.id.vn/api/ShowTrangDichKhoaHoc', { id_khoahoc: id }, {
                    referrerPolicy: 'unsafe-url'
                });
                const data = response.data;
                setFormData({
                    ten: data.khoahoc.ten,
                    id_khoahoc: data.khoahoc.id,
                    id_theloai: data.theloai.id,
                    id_theloaicon: data.theloaicon.id,
                    id_chude: data.chude.id,
                    mota: data.khoahoc.mota,
                    trinhdo: data.trinhdo.ten,
                    id_giangvien: parsedData.giangvien,
                    hinh: data.khoahoc.hinh,
                });
                setImageUrl(data.khoahoc.hinh);
            } catch (error) {
                console.error("Error fetching course data: ", error);
            }
        };

        if (id) {
            fetchCourseData();
        }
    }, [id, parsedData.giangvien]);

    useEffect(() => {
        axios.get('https://huuphuoc.id.vn/api/theloai', {
            referrerPolicy: 'unsafe-url'
        })
            .then(response => {
                setCategories(response.data.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setSubCategory('');
        setFormData({
            ...formData,
            id_theloai: e.target.value,
            id_theloaicon: ''
        });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value === '') {
            setFilteredTopics([]);
        } else {
            const allTopics = categories.flatMap(cat => cat.theloaicons.flatMap(subCat => subCat.chudes));
            const filtered = allTopics.filter(topic => topic.ten.toLowerCase().includes(e.target.value.toLowerCase()));
            setFilteredTopics(filtered);
        }
    };

    const handleTopicClick = (topicName, topicId) => {
        setSearchTerm(topicName);
        setFilteredTopics([]);
        setFormData({
            ...formData,
            id_chude: topicId
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageSelected(file);
    };

    const uploadImage = async () => {
        if (!imageSelected) return;
        const imageFormData = new FormData();
        imageFormData.append("file", imageSelected);
        imageFormData.append("upload_preset", uploadPreset);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: "POST",
                body: imageFormData,
            });
            const data = await response.json();
            setImageUrl(data.secure_url);
            setFormData(prevFormData => ({
                ...prevFormData,
                hinh: data.secure_url
            }));
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (imageSelected) {
            await uploadImage();
        }

        const submitData = new FormData();
        Object.keys(formData).forEach(key => {
            submitData.append(key, formData[key]);
        });

        try {
            const response = await axios.post('https://huuphuoc.id.vn/api/TrangDichKhoaHoc', submitData, {
                referrerPolicy: 'unsafe-url'
            });
            console.log(response.data);
        } catch (error) {
            console.error('There was an error submitting the form!', error);
        }
    };

    return (
        <div className="max-w-4xl p-8 mx-auto bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-100"
            style={{ animation: "float 6s ease-in-out infinite" }}>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-500  to-sky-400 bg-300% animate-shimmer"
                    style={{ animation: "shimmer 8s linear infinite" }}>
                  Tạo khóa học của bạn
                </h1>
                <p className="mt-3 text-gray-600 text-lg">
                    Làm cho khóa học của bạn nổi bật và tiếp cận nhiều sinh viên hơn trên Udemy
                </p>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="transition-all duration-200 hover:transform hover:scale-[1.01]">
                    <label className="block text-xl font-semibold text-gray-700 mb-2">Course Title</label>
                    <input
                        type="text"
                        name="ten"
                        className="placeholder:text-xl block w-full p-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="Nhập tiêu đề thu hút sự chú ý"
                        value={formData.ten}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label className="block text-xl font-medium text-gray-700">Mô tả khóa học</label>
                    <textarea
                        name="mota"
                        className="placeholder:text-xl block w-full p-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Nhập mô tả khóa học của bạn"
                        value={formData.mota}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="group">
                        <label className="block text-xl font-semibold text-gray-700 mb-2">Level</label>
                        <select
                            name="trinhdo"
                            className="block w-full p-3 text-gray-700 bg-white border border-gray-200 rounded-lg group-hover:border-purple-300 focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                            value={formData.trinhdo}
                            onChange={handleInputChange}
                        >
                            <option value="-1">-- Chọn cấp độ --</option>
                            <option value="Trình độ sơ cấp"> Cấp độ mới bắt đầu</option>
                            <option value="Trình độ trung cấp">Cấp độ trung gian</option>
                            <option value="Cấp độ chuyên gia">Trình độ chuyên môn</option>
                            <option value="Tất cả các cấp độ">Tất cả các cấp độ</option>
                        </select>
                    </div>
                    <div className="group">
                        <label className="block text-xl font-semibold text-gray-700 mb-2">Loại</label>
                        <select
                            name="id_theloai"
                            className="block w-full p-3 text-gray-700 bg-white border border-gray-200 rounded-lg group-hover:border-purple-300 focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                            value={category}
                            onChange={handleCategoryChange}
                        >
                            <option value="">-- Chọn mục thể loại --</option>
                            {categories
                                .filter(cat => cat.theloaicons && cat.theloaicons.length > 0)
                                .map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.ten}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                {category && (
                    <div>
                        <label className="block text-xl font-medium text-gray-700">Chọn chuyên ngành</label>
                        <select
                            name="id_theloaicon"
                            className="block w-full p-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                            value={subCategory}
                            onChange={(e) => {
                                setSubCategory(e.target.value);
                                setFormData({
                                    ...formData,
                                    id_theloaicon: e.target.value
                                });
                            }}
                        >
                            <option value="">-- Chọn chuyên ngành --</option>
                            {categories.find(cat => cat.id === parseInt(category))?.theloaicons.map(subCat => (
                                <option key={subCat.id} value={subCat.id}>{subCat.ten}</option>
                            ))}
                        </select>
                    </div>
                )}

                <div>
                    <label className="block text-xl font-medium text-gray-700">Search Topics</label>
                    <input
                        type="text"
                        className="placeholder:text-xl block w-full p-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Tìm kiếm các chủ đề"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>

                {searchTerm && filteredTopics.length > 0 && (
                    <div>
                        <label className="block text-xl font-medium text-gray-700">Filtered Topics</label>
                        <ul className="block w-full p-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md">
                            {filteredTopics.map(topic => (
                                <li key={topic.id} onClick={() => handleTopicClick(topic.ten, topic.id)} className="p-1 cursor-pointer hover:bg-gray-100">
                                    {topic.ten}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="mt-8">
                    <label className="block text-xl font-semibold text-gray-700 mb-2">Course Image</label>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-200">
                            <div className="flex flex-col items-center justify-center pt-7">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="pt-1 text-xl text-gray-500">Tải lên khóa học khóa học</p>
                            </div>
                            <input type="file" className="hidden" name="hinh" onChange={handleFileChange} />
                        </label>
                    </div>
                                    {imageUrl && (
                      <div className="mt-2 group perspective-[1000px] hover:cursor-pointer">
                        <div
                          className={`
                            relative overflow-hidden rounded-lg
                            transform-gpu transition-all duration-700 ease-out
                            group-hover:rotate-y-2 group-hover:scale-[1.02]
                            animate-float
                            before:absolute before:inset-0 before:z-10
                            before:bg-gradient-to-tr before:from-purple-500/20 before:via-pink-500/10 before:to-blue-500/20
                            after:absolute after:inset-0 after:z-0
                            after:bg-gradient-to-br after:from-purple-200/30 after:to-transparent
                            shadow-[0_0_15px_rgba(168,85,247,0.4)]
                            group-hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]
                          `}
                          style={{
                            animation: "float 6s ease-in-out infinite, fadeScale 0.8s ease-out"
                          }}
                        >
                          <Image
                            width={500}
                            height={300}
                            src={imageUrl}
                            alt="Uploaded"
                            className={`
                              w-full h-auto rounded-lg 
                              border-2 border-purple-200/50
                              transition-all duration-700
                              group-hover:scale-110
                              relative z-20
                            `}
                            loading="lazy"
                            onLoadStart={() => (
                              <div className={`
                                animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200
                                rounded-lg w-full h-[300px]
                                background-animate
                              `}/>
                            )}
                          />
                        </div>
                      </div>
                    )}
                </div>

                <button type="submit"
                    className="w-full py-4 text-lg font-medium text-white bg-gradient-to-r from-sky-500 to-sky-300 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2"
                    style={{ animation: "pulse 2s infinite" }}>
                   Tạo khóa học
                </button>
            </form>
        </div>
    );
}

export default TrangDich;
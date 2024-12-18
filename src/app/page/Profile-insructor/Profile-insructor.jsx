"use client";
import React, { useState, useEffect } from 'react';
import { GiangVienKhoaHocHienThi } from '../../../service/course/course.service';
import { TheoDoiGiangVien, DanhSachTheoDoi, BoTheoDoiGiangVien } from '../../../service/Follow/Follow';
import { KhoaHocYeuThich } from "../../../service/YeuThich/YeuThich";
import Link from 'next/link';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegSadTear } from "react-icons/fa";

export const Profileinsructor = () => {
    const [data, setData] = useState([]);
    const [follow, setFollow] = useState(false);
    const [followStatusChanged, setFollowStatusChanged] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await GiangVienKhoaHocHienThi();
                const dataWithSocialLinks = res.data.map((item) => ({
                    ...item,
                    giangVien: {
                        ...item.giangVien,
                        MangXaHoi: res.MangXaHoi.filter(
                            (social) => social.id_giangvien === item.giangVien.id
                        ),
                    },
                    isLiked: false
                }));
                setData(dataWithSocialLinks);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Lỗi khi tải dữ liệu');
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        const fetchFollowStatus = async () => {
            try {
                const res = await DanhSachTheoDoi();
                const urlParams = new URLSearchParams(window.location.search);
                const id_giangvien = urlParams.get('id');

                if (id_giangvien) {
                    const isFollowing = res.some(
                        (item) => String(item.id_giangvien) === id_giangvien
                    );
                    setFollow(isFollowing);
                    setData(prevData =>
                        prevData.map(item =>
                            item.giangVien.id === parseInt(id_giangvien)
                                ? {
                                    ...item,
                                    giangVien: {
                                        ...item.giangVien,
                                        isFollowed: isFollowing
                                    }
                                }
                                : item
                        )
                    );
                }
            } catch (error) {
                console.error('Error fetching follow status:', error);
                toast.error('Đăng nhập để theo dõi');
            }
        };

        fetchFollowStatus();
    }, [followStatusChanged]);
    // console.log(follow, "follow");      

    // console.log(data, "data");
    const TongBaiHoc = data
        .map((item) => item.baihoc.length)
        .reduce((a, b) => a + b, 0);
    const TongHocVien = data
        .map((item) => item.ThanhToan.length)
        .reduce((a, b) => a + b, 0);

    const renderStars = (rating) => {
        rating = parseFloat(rating);
        rating = Math.max(0, Math.min(rating, 5));
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <>
                {[...Array(fullStars)].map((_, i) => (
                    <i key={`full-${i}`} className="fa-solid fa-star" />
                ))}
                {halfStar && <i className="fa-solid fa-star-half" />}
                {[...Array(emptyStars)].map((_, i) => (
                    <i key={`empty-${i}`} className="fa-regular fa-star" />
                ))}
            </>
        );
    }

    const DanhGia = (rate) => {
        if (rate.length === 0) return 0;
        const ratings = rate.map((r) => parseFloat(r.danhgia));
        const total = ratings.reduce((sum, r) => sum + r, 0);
        return (total / ratings.length).toFixed(1);
    };

    const overallAverageRating = () => {
        const allRatings = data.flatMap(course => course.danhgia.map(r => parseFloat(r.danhgia)));
        if (allRatings.length === 0) return 0;
        const total = allRatings.reduce((sum, r) => sum + r, 0);
        return (total / allRatings.length).toFixed(1);
    };
    const handleFollow = async () => {
        try {
            setIsLoading(true);
            const urlParams = new URLSearchParams(window.location.search);
            const id_giangvien = urlParams.get('id');

            if (!id_giangvien) {
                toast.error('Không tìm thấy ID giảng viên');
                return;
            }

            const response = await TheoDoiGiangVien(id_giangvien);

            if (response && (response.status === 200 || response.status === "success")) {
                setFollow(true);
                setFollowStatusChanged(prev => !prev);
                toast.success('Theo dõi thành công');
            } else if (response && response.message) {
                toast.error(response.message);
            } else {
                window.location.reload();
            }
        } catch (error) {
            window.location.reload();
        } finally {
            setIsLoading(false);
        }
    };
    const handleYeuThich = async (id) => {
        try {
            const response = await KhoaHocYeuThich(id);
            if (response && response.status === "success") {
                setData(prevData =>
                    prevData.map(item =>
                        item.id === id
                            ? { ...item, isLiked: !item.isLiked }
                            : item
                    )
                );
                toast.success("Đã thêm vào danh sách yêu thích!");
            } else {
                throw new Error(response?.message || 'Không thể thêm vào yêu thích');
            }
        } catch (error) {
            window.location.reload();
        }
    };

    const handleUnfollow = async () => {
        try {
            setIsLoading(true);
            const urlParams = new URLSearchParams(window.location.search);
            const id_giangvien = urlParams.get('id');

            if (!id_giangvien) {
                toast.error('Không tìm thấy ID giảng viên');
                return;
            }

            const followList = await DanhSachTheoDoi();
            const followRecord = followList.find(item => String(item.id_giangvien) === id_giangvien);

            if (!followRecord) {
                toast.error('Không tìm thấy thông tin theo dõi');
                return;
            }

            const response = await BoTheoDoiGiangVien(followRecord.id);

            if (response && (response.status === 200 || response.status === "success")) {
                setFollow(false);
                setFollowStatusChanged(prev => !prev);
                toast.success('Đã bỏ theo dõi thành công');
            } else if (response && response.message) {
                toast.error(response.message);
            } else {
                toast.error('Không thể bỏ theo dõi. Vui lòng thử lại sau');
            }
        } catch (error) {
            console.error('Error unfollowing:', error);
            if (error.response) {
                toast.error(`Lỗi: ${error.response.data?.message || 'Không thể bỏ theo dõi'}`);
            } else if (error.request) {
                toast.error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng');
            } else {
                toast.error('Có lỗi xảy ra: ' + (error.message || 'Không thể bỏ theo dõi'));
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (<>
    
        <div className="container">
            {data.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <FaRegSadTear className="text-6xl text-gray-400 mb-4" />
                    <p className="text-xl text-gray-500">Không có thông tin giảng viên</p>
                </div>
            ) : (
                <>
                    {data.slice(0, 1).map((item) => (
                        <div className="profile-header" key={item.giangVien.id}>
                            <div className="profile-cover-image bg-gradient-to-r from-blue-900 to-pink-700 via-pink-700 mt-52  relative">
                                <div className="profile-info-overlay max-w-4xl mx-auto relative z-10">
                                    <div className="flex justify-center items-center">
                                        <Image
                                            width={120}
                                            height={120}
                                            src={item.giangVien.hinh}
                                            alt="profile"
                                            className="avatar-image rounded-full h-40 w-40 object-cover"
                                        />
                                    </div>
                                    <div className="text-center ">
                                        <h1 className="profile-name text-white text-[20px]">{item.giangVien.ten}</h1>
                                        <p className="profile-username text-white text-[16px] ">@{item.giangVien.ten.toLowerCase().replace(/\s+/g, '')}</p>
                                    </div>

                                    <div className="profile-stats flex justify-center gap-[100px] ">
                                        <div className="stat-item text-center">
                                            <span className="stat-value text-white text-[14px] block">{TongBaiHoc}</span>
                                            <span className="stat-label text-white text-[14px] block mt-1">Bài học</span>
                                        </div>
                                        <div className="stat-item text-center">
                                            <span className="stat-value text-white text-[14px] block">{TongHocVien}</span>
                                            <span className="stat-label text-white text-[14px] block mt-1">Học viên</span>
                                        </div>
                                        <div className="stat-item text-center">
                                            <span className="stat-value text-white text-[14px] block">{overallAverageRating()}</span>
                                            <span className="stat-label text-white text-[14px] block mt-1">Đánh giá</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-center mt-6">
                                        <button
                                            onClick={follow ? handleUnfollow : handleFollow}
                                            className={`follow-button ${follow ? 'following' : ''} w-80 text-[14px]`}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <span>Đang xử lý...</span>
                                            ) : (
                                                follow ? 'Đang Follow' : 'Follow'
                                            )}
                                        </button>
                                    </div>

                                    <div className="social-links flex justify-center gap-4 mt-6">
                                        {item.giangVien.MangXaHoi.map((social) => (
                                            <a href={social.url} key={social.id} className="social-icon text-white hover:text-gray-200">
                                                <i className={`fa-brands fa-${social.nentang}`} />
                                            </a>
                                        ))}
                                    </div>

                                    <div className="bio-text text-white text-[14px] text-center  max-w-2xl mx-auto px-4">
                                        {item.giangVien.tieusu}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="chialaiflex bg-white ">
                        {data.length > 0 ? (
                            data.map((item) => (
                                <div key={item.id} className=" ">
                                    <div className="rts-single-course">
                                        <Link
                                            href={`/page/course-detail?id=${item.id}`}
                                            className="thumbnail relative"
                                        >
                                            <div className="relative w-full h-[170px]">
                                                <Image
                                                    src={item.hinh}
                                                    alt={item.ten || 'Course thumbnail'}
                                                    width={500}
                                                    height={300}
                                                    className="object-cover w-full h-full"
                                                    priority={false}
                                                    quality={75}
                                                    unoptimized={true}
                                                />
                                            </div>
                                            <div className="course-tags">
                                                {item.gia === 0 ? (
                                                    <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-lg shadow-lg transform -rotate-12 z-10">
                                                        Miễn phí
                                                    </span>
                                                ) : item.giamgia > 0 ? (
                                                    <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-lg shadow-lg transform -rotate-12 z-10">
                                                        -{Math.round(((item.gia - item.giamgia) / item.gia) * 100)}% OFF
                                                    </span>
                                                ) : null}
                                            </div>
                                        </Link>
                                        <div
                                            className="save-icon"
                                            onClick={() => handleYeuThich(item.id)}
                                        >
                                            <i className="fa-sharp fa-light fa-bookmark text-lg" />
                                        </div>
                                        <div className="course-card p-4 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
                                            <Link
                                                href={`/page/course-detail?id=${item.id}`}
                                                className="title-link"
                                            >
                                                <h5
                                                    className="title text-2xl font-medium hover:text-primary-600 transition-all duration-300 truncate whitespace-nowrap overflow-hidden"
                                                    title={item.ten}
                                                >
                                                    <strong>{item.ten}</strong>
                                                </h5>
                                            </Link>

                                            <div className="flex flex-row space-x-4 bg-gradient-to-r from-gray-50 to-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 mt-4">
                                                <div className="flex items-center space-x-2 pr-2 pt-2 pb-2 rounded-full">
                                                    <i className="fa-light fa-calendar-lines-pen text-gray-600 text-lg" />
                                                    <div className="flex flex-col">
                                                        <span className="text-lg" style={{ fontWeight: "400" }}>
                                                            {item.baihoc.length}
                                                            <span className="text-lg text-gray-600 uppercase tracking-wider pl-1">
                                                                Bài
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-2 p-2 rounded-full">
                                                    <i className="fa-light fa-user-group text-gray-600 text-xl" />
                                                    <div className="flex flex-col">
                                                        <span className="text-lg" style={{ fontWeight: "400" }}>
                                                            {item.ThanhToan.length}
                                                            <span className="text-lg text-gray-600 uppercase tracking-wider pl-1">
                                                                Học viên
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="rating-area text-lg p-2 flex flex-row items-center">
                                                    <i className="fa-solid fa-star text-yellow-400" />
                                                    <span className="rating-number ml-1 text-xl" style={{ fontWeight: "400" }}>
                                                        {DanhGia(item.danhgia)}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="course-top relative mt-5">
                                                <div className="price">
                                                    {item.gia === 0 || item.giamgia === 0 ? (
                                                        <span className="text-red-500 font-bold text-2xl">
                                                            0 VNĐ
                                                        </span>
                                                    ) : (
                                                        <div className="flex items-center">
                                                            <span className="text-red-500 font-bold text-2xl mr-3">
                                                                {item.giamgia.toLocaleString('vi-VN')}
                                                                <span className="text-xl">VNĐ</span>
                                                            </span>
                                                            <span className="line-through text-gray-500 text-2xl">
                                                                {item.gia.toLocaleString('vi-VN')}
                                                                <span className="text-xl">VNĐ</span>
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center w-full p-8">
                                <FaRegSadTear className="text-4xl text-gray-400 mb-2" />
                                <p className="text-gray-500">Không có khóa h���c nào</p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>

        <style jsx>{`
            .tiktok-profile-container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
                color: #fff;
            }

            .profile-header {
                position: relative;
                margin-bottom: 40px;
            }

            .profile-cover-image {
                position: relative;
                min-height: fit-content;
                border-radius: 8px;
                overflow: visible;
            }

            .profile-info-overlay {
                position: relative;
                padding: 40px;
                text-align: center;
            }

            .profile-avatar {
                margin-bottom: 20px;
            }

            .avatar-image {
                width: 120px;
                height: 120px;
                border-radius: 50%;
                border: 4px solid #fff;
                object-fit: cover;
            }

            .profile-name {
                font-size: 32px;
                font-weight: bold;
               
            }

            .profile-username {
                color: #a7a7a7;
                
            }

            .profile-stats {
                display: flex;
                justify-content: center;
                margin-top: 15px;

                gap: 80px;
                margin-bottom: 15px;
            }

            .stat-item {
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .stat-value {
                font-size: 24px;
                font-weight: bold;
            }

            .stat-label {
                color: #a7a7a7;
            }

            .follow-button {
                background: #fe2c55;
                color: #fff;
                border: none;
                padding: 12px 48px;
                border-radius: 4px;
                font-weight: 400;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .follow-button.following {
                background: #fff;
                color: #000;
            }

            .social-links {
                margin-top: 24px;
                display: flex;
                justify-content: center;
                gap: 16px;
            }

            .social-icon {
                color: #fff;
                font-size: 24px;
                transition: color 0.3s ease;
            }

            .social-icon:hover {
                color: #fe2c55;
            }

          

            .course-card {
                background: #1f1f1f;
                border-radius: 8px;
                overflow: hidden;
                transition: transform 0.3s ease;
            }

            .course-card:hover {
                transform: translateY(-4px);
            }

            .course-thumbnail {
                position: relative;
                aspect-ratio: 16/9;
            }

            .thumbnail-image {
                width: 150%;
                height: 200px; /* Fixed height for all thumbnails */
                object-fit: cover;
            }

            .like-button {
                position: absolute;
                right: 12px;
                top: 12px;
                background: rgba(0,0,0,0.5);
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                color: #fff;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .like-button:hover {
                background: rgba(254,44,85,0.8);
            }

            .price-tag {
                position: absolute;
                left: 12px;
                top: 12px;
                padding: 4px 12px;
                border-radius: 4px;
                font-weight: bold;
            }

            .price-tag.free {
                background: #25f4ee;
                color: #000;
            }

            .price-tag.discount {
                background: #fe2c55;
                color: #fff;
            }

            .course-info {
                padding: 16px;
            }

            .course-title {
                font-size: 18px;
                margin-bottom: 12px;
                color: #fff;
            }

            .course-meta {
                display: flex;
                justify-content: space-between;
                color: #a7a7a7;
            }
        `}</style>
    </>);
}
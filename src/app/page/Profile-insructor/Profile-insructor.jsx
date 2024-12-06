"use client";
import React, { useState, useEffect } from 'react';
import { GiangVienKhoaHocHienThi } from '../../../service/course/course.service';
import { TheoDoiGiangVien, DanhSachTheoDoi, BoTheoDoiGiangVien } from '../../../service/Follow/Follow';
import { KhoaHocYeuThich } from "../../../service/YeuThich/YeuThich";
import Link from 'next/link';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                toast.error('Lỗi khi kiểm tra trạng thái theo dõi');
            }
        };

        fetchFollowStatus();
    }, [followStatusChanged]);
    console.log(follow, "follow");


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
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />

        <div className="container ">
            {data.slice(0, 1).map((item) => (
                <div className="profile-header " key={item.giangVien.id}>
                    <div className="profile-cover-image mt-52">
                        <div className="profile-info-overlay  ">
                            <div className="flex justify-center items-center">
                                <Image 
                                    width={120} 
                                    height={120}
                                    src={item.giangVien.hinh}
                                    alt="profile"
                                    className="avatar-image rounded-full h-40 w-40"
                                />
                            </div>
                            <h1 className="profile-name text-white">{item.giangVien.ten}</h1>
                            <p className="profile-username text-white">@{item.giangVien.ten.toLowerCase().replace(/\s+/g, '')}</p>
                            
                            <div className="profile-stats">
                                <div className="stat-item">
                                    <span className="stat-value text-white">{TongBaiHoc}</span>
                                    <span className="stat-label text-white">Bài học</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-value text-white">{TongHocVien}</span>
                                    <span className="stat-label text-white">Học viên</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-value text-white">{overallAverageRating()}</span>
                                    <span className="stat-label text-white">Đánh giá</span>
                                </div>
                            </div>

                            <button
                                onClick={follow ? handleUnfollow : handleFollow}
                                className={`follow-button ${follow ? 'following' : ''} w-80`}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span>Đang xử lý...</span>
                                ) : (
                                    follow ? 'Đang Follow' : 'Follow'
                                )}
                            </button>

                            <div className="social-links">
                                {item.giangVien.MangXaHoi.map((social) => (
                                    <a href={social.url} key={social.id} className="social-icon">
                                        <i className={`fa-brands fa-${social.nentang}`} />
                                    </a>
                                ))}
                            </div>

                            <div className="bio-text text-white">
                                {item.giangVien.tieusu}
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <div className="courses-grid">
                {data.map((item) => (
                    <div className="course-card" key={item.id}>
                        <Link href={`/page/course-detail?id=${item.id}`}>
                            <div className="course-thumbnail">
                                <Image
                                    width={300}
                                    height={300}
                                    src={item.hinh}
                                    alt="course"
                                    className="thumbnail-image w-full h-full"
                                />
                                <button
                                    className="like-button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleYeuThich(item.id);
                                    }}
                                >
                                    <i className={`fa-${item.isLiked ? 'solid' : 'regular'} fa-heart`} />
                                </button>
                                {(item.gia === 0 || item.giamgia === 0) ? (
                                    <span className="price-tag free text-white" style={{ background: '#fe2c55' }}>Miễn phí</span>
                                ) : (
                                    <span className="price-tag discount">
                                        -{Math.round(((item.gia - item.giamgia) / item.gia) * 100)}%
                                    </span>
                                )}
                            </div>
                            <div className="course-info">
                                <h3 className="course-title">{item.ten}</h3>
                                <div className="course-meta">
                                    <span className="students-count">
                                        <i className="fa-light fa-users" /> {item.ThanhToan.length}
                                    </span>
                                    <span className="rating">
                                        {DanhGia(item.danhgia)} <i className="fa-solid fa-star" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
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
                height: 400px;
                background: linear-gradient(to right, #1a1a1a, #d63384, #4a5568);
                border-radius: 8px;
                overflow: hidden;
            }

            .profile-info-overlay {
                position: absolute;
                top:0px;
                left: 0;
                right: 0;
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
                margin-bottom: 8px;
            }

            .profile-username {
                color: #a7a7a7;
                margin-bottom: 20px;
            }

            .profile-stats {
                display: flex;
                justify-content: center;
                gap: 40px;
                margin-bottom: 24px;
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
                font-weight: bold;
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

            .courses-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: 24px;
                padding: 20px 0;
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
"use client";
import React, { useState, useEffect } from 'react';
import { GiangVienKhoaHocHienThi } from '../../../service/course/course.service';
import { TheoDoiGiangVien, DanhSachTheoDoi } from '../../../service/Follow/Follow';
import { KhoaHocYeuThich } from "../../../service/YeuThich/YeuThich";
import Link from 'next/link';
import Image from 'next/image';
export const Profileinsructor = () => {
    const [data, setData] = useState([]);
    const [follow, setFollow] = useState(false);

    useEffect(() => {
        GiangVienKhoaHocHienThi().then((res) => {
            const dataWithSocialLinks = res.data.map((item) => {
                const socialLinks = res.MangXaHoi.filter(
                    (social) => social.id_giangvien === item.giangVien.id
                );
                return {
                    ...item,
                    giangVien: {
                        ...item.giangVien,
                        MangXaHoi: socialLinks,
                    },
                };
            });
            setData(dataWithSocialLinks);
        });
    }, []);
    useEffect(() => {
        const fetchFollowStatus = async () => {
            try {
                const res = await DanhSachTheoDoi();
                console.log(res, "res");

                const urlParams = new URLSearchParams(window.location.search);
                const id_giangvien = urlParams.get('id');

                if (id_giangvien) {
                    const isFollowing = res.some(
                        (item) => String(item.id_giangvien) === id_giangvien
                    );
                    setFollow(isFollowing);
                } else {
                    console.warn('id_giangvien not found in URL');
                }
            } catch (error) {
                console.error('Error fetching follow status:', error);
            }
        };

        fetchFollowStatus();
    }, []);
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
            await TheoDoiGiangVien();
            setFollow(true);
            alert('Theo dõi thành công');
        } catch (error) {
            alert('Theo dõi thất bại');
        }
    }
    const handleYeuThich = async (id) => {
        try {
            const response = await KhoaHocYeuThich(id);
            console.log(response);
            toast.success("Added to favorites!");
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error adding to favorites!");
        }
    };

    return (<>

        <div className="container">
            <div className="dashboard-banner-area-wrapper">
                <div className="container">
                    <div className="row">
                        {data.slice(0, 1).map((item) => (
                            <div className="col-lg-12" key={item.giangVien.id}>
                                <div className="dashboard-banner-area-start bg_image">
                                    <div className="rating-area-banner-dashboard">
                                        <div className="stars">
                                            <span>{overallAverageRating()}</span>
                                            {renderStars(overallAverageRating())}
                                        </div>
                                        <p>Giảng viên tiếp thị kỹ thuật số</p>
                                        <button onClick={handleFollow} className="create-btn" disabled={follow}>
                                            <i className="fa-regular fa-circle-plus" /> {follow ? 'Đã Theo Dõi' : 'Theo Dõi'}
                                        </button>
                                    </div>
                                    <div className="author-profile-image-and-name absolute top-0 flex items-center space-x-4 p-4 h-60 mt-40 bg-white shadow-md rounded-lg">
                                        <div className="flex-shrink-0">
                                            <Image width={500} height={300}
                                                src={item.giangVien.hinh}
                                                className="w-24 h-24 rounded-full object-cover"
                                                alt="dashboard"
                                            />
                                        </div>
                                        <div>
                                            <h1 className="title text-3xl font-extrabold text-black">
                                                {item.giangVien.ten}
                                            </h1>
                                            <div className="course-video mt-2">
                                                <div className="single flex items-center space-x-2 text-black">
                                                    <i className="fa-regular fa-video" />
                                                    <span className="text-lg font-semibold">
                                                        {TongBaiHoc} Bài Học
                                                    </span>
                                                </div>
                                                <div className="single flex items-center space-x-2 text-black mt-1">
                                                    <i className="fa-light fa-users" />
                                                    <span className="text-lg font-semibold">
                                                        {TongHocVien} Sinh viên
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="rts-instructor-profile rts-section-gapBottom pt-12">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3"></div>
                        <div className="col-lg-9">
                            <div className="instructor-profile-right-area-start">
                                <div className="bio-graphyarea">
                                    <h5 className="title">Tiểu sử</h5>
                                    {data.slice(0, 1).map((item) => (
                                        <div key={item.giangVien.id}>
                                            <p className="disc">
                                                {item.giangVien.tieusu}
                                            </p>
                                            <div className="social-area-dashboard-footer">
                                                <ul>
                                                    {item.giangVien.MangXaHoi.map((social) => (
                                                        <li key={social.id}>
                                                            <a href={social.url}>
                                                                <i className={`fa-brands fa-${social.nentang}`} />
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="row g-5 mt-8">
                                    {data.map((item) => (
                                        <div
                                            className="col-lg-4 col-md-6 col-sm-12"
                                            key={item.id}
                                        >
                                            <Link href={`/page/course-detail?id=${item.id}`}>
                                                <div className="rts-single-course">
                                                <div className="thumbnail relative group">
    <Image 
        width={500} 
        height={300}
        src={item.hinh}
        alt="course"
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
    />
    {item.gia === 0 || item.giamgia === 0 ? (
        <div className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full font-bold shadow-lg transform -rotate-12">
            Miễn Phí
        </div>
    ) : (
        <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold shadow-lg transform -rotate-12">
            -{Math.round(((item.gia - item.giamgia) / item.gia) * 100)}%
        </div>
    )}
</div>
                                                    <div
                                                        className="save-icon"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#exampleModal-login"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            handleYeuThich(item.id);
                                                        }}
                                                    >
                                                        <i className="fa-sharp fa-light fa-bookmark" />
                                                    </div>
                                                                                                     <div className="tags-area-wrapper flex gap-2 p-4">
                                                        <div className="single-tag transform hover:-translate-y-1 transition-all duration-300">
                                                            <span className="bg-gradient-to-r from-blue-100 to-blue-50 px-3 py-1 rounded-full text-blue-600 text-sm font-medium hover:shadow-lg">
                                                                {item.theLoaiCon.ten}
                                                            </span>
                                                        </div>
                                                        <div className="single-tag transform hover:-translate-y-1 transition-all duration-300">
                                                            <span className="bg-gradient-to-r from-purple-100 to-purple-50 px-3 py-1 rounded-full text-purple-600 text-sm font-medium hover:shadow-lg">
                                                                {item.chuDe.ten}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="lesson-studente p-4 flex justify-between items-center border-b border-gray-100">
                                                        <div className="lesson group flex items-center space-x-2">
                                                            <i className="fa-light fa-calendar-lines-pen text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                                                            <span className="text-gray-600 group-hover:text-blue-500 transition-colors duration-300">
                                                                {item.baihoc.length} Lessons
                                                            </span>
                                                        </div>
                                                        <div className="lesson group flex items-center space-x-2">
                                                            <i className="fa-light fa-user-group text-purple-500 group-hover:scale-110 transition-transform duration-300" />
                                                            <span className="text-gray-600 group-hover:text-purple-500 transition-colors duration-300">
                                                                {item.ThanhToan.length} Students
                                                            </span>
                                                        </div>
                                                    </div>
                                                    
                                                    <h5 className="title p-4 text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300">
                                                        {item.ten}
                                                    </h5>
                                                    
                                                    <p className="teacher px-4 text-gray-600 hover:text-purple-600 transition-colors duration-300">
                                                        {item.giangVien.ten}
                                                    </p>
                                                    
                                                    <div className="rating-and-price p-4 flex justify-between items-center">
                                                        <div className="stars flex items-center space-x-1 group">
                                                            <span className="text-yellow-500 group-hover:scale-105 transition-transform duration-300">
                                                                {DanhGia(item.danhgia)}
                                                            </span>
                                                            {renderStars(DanhGia(item.danhgia))}
                                                        </div>
                                                        <div className="price-area">
                                                            {item.gia === 0 || item.giamgia === 0 ? (
                                                                <div className="price bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full font-bold transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
                                                                    Miễn Phí
                                                                </div>
                                                            ) : (
                                                                <div className="flex items-center space-x-2 group">
                                                                    <div className="not price line-through text-gray-400 group-hover:text-gray-600 transition-colors duration-300">
                                                                        ${item.gia}
                                                                    </div>
                                                                    <div className="price bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
                                                                        ${item.giamgia}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <style jsx>{`
        /* Add these styles */
.rts-single-course {
    transform: translateY(0);
    transition: all 0.3s ease-in-out;
}

.rts-single-course:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.stars i {
    transition: all 0.3s ease;
    transform-origin: center;
}

.stars:hover i {
    animation: starPulse 1s infinite;
}

@keyframes starPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
}
        /* Add these styles */
.thumbnail {
    overflow: hidden;
    border-radius: 12px;
}

.thumbnail::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.thumbnail:hover::after {
    opacity: 1;
}
/* Add these styles to your CSS file */

.rts-instructor-profile {
  background: linear-gradient(to right, #f6f9fc 0%, #ffffff 100%);
  padding: 3rem 0;
}

.bio-graphyarea {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.18);
  margin-bottom: 3rem;
}

.bio-graphyarea .title {
  font-size: 1.8rem;
  color: #1a237e;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #e3f2fd;
  padding-bottom: 0.5rem;
}

.bio-graphyarea .disc {
  line-height: 1.8;
  color: #37474f;
}

.social-area-dashboard-footer ul {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.social-area-dashboard-footer a {
  background: #f5f5f5;
  padding: 0.8rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.social-area-dashboard-footer a:hover {
  transform: translateY(-3px);
  background: #e3f2fd;
  color: #1976d2;
}

.rts-single-course {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
}

.rts-single-course:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
}

.thumbnail {
  position: relative;
  overflow: hidden;
}

.thumbnail img {
  transition: transform 0.5s ease;
}

.rts-single-course:hover .thumbnail img {
  transform: scale(1.05);
}

.tags-area-wrapper {
  padding: 1rem;
  display: flex;
  gap: 0.5rem;
}

.single-tag span {
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.lesson-studente {
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f5f5f5;
}

.lesson {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #616161;
}

.rating-and-price {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.save-icon {
  position: absolute;
  right: 1rem;
  top: 1rem;
  background: rgba(255,255,255,0.9);
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.save-icon:hover {
  transform: scale(1.1);
  background: white;
}

.price-area {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Add these styles to your CSS file */

.dashboard-banner-area-wrapper {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  padding: 3rem 0;
  color: white;
  border-radius: 1rem;
  margin-top: 2rem;
}

.dashboard-banner-area-start {
  position: relative;
  overflow: hidden;
  padding: 2rem;
  backdrop-filter: blur(10px);
}

.author-profile-image-and-name {
  transform: translateY(20px);
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.author-profile-image-and-name:hover {
  transform: translateY(0);
  box-shadow: 0 15px 40px rgba(0,0,0,0.2);
}

.create-btn {
  background: linear-gradient(45deg, #2196F3, #00BCD4);
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 2rem;
  color: white;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.create-btn:hover:not([disabled]) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}

.create-btn:disabled {
  background: #gray;
  cursor: not-allowed;
}

.rts-single-course {
  border-radius: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.rts-single-course:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.tags-area-wrapper .single-tag span {
  background: #f0f2f5;
  padding: 0.3rem 0.8rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  color: #2a5298;
}

.stars {
  color: #ffc107;
  font-size: 1.2rem;
}

.bio-graphyarea {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 5px 20px rgba(0,0,0,0.05);
}

.social-area-dashboard-footer ul {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.social-area-dashboard-footer a {
  color: #1e3c72;
  font-size: 1.5rem;
  transition: all 0.3s ease;
}

.social-area-dashboard-footer a:hover {
  color: #2a5298;
  transform: translateY(-2px);
}





            
            `}</style>
    </>
    );
}
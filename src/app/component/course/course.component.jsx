"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Category } from "../category/category.component";
import { KhoaHocYeuThich } from "../../../service/YeuThich/YeuThich";
import { KhoaHocDangHoc } from "../../../service/dashbordStuden/Dashboard-service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { FaStar, FaRegStar } from "react-icons/fa";
import Image from "next/image";
import CardProduct from "../CardProductHome/CardProduct";
import ProductStudent from "../Card/ProductStudent";

const CourseArea = () => {
    const [KhoaHoc, setKhoaHoc] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch("https://huuphuoc.id.vn/api/allkhoahoc", {
                    referrerPolicy: "unsafe-url",
                });
                const data = await response.json();
                const sortedCourses = data.data.sort((a, b) =>
                    b.dangky.length - a.dangky.length
                ).slice(0, 3); // Only take first 3 courses
                setKhoaHoc(sortedCourses);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Error fetching data!");
            }
        };
        fetchCourses();
    }, []);

    // Rest of your helper functions remain the same
    const getAverageRating = (danhgia) => {
        if (!danhgia || danhgia.length === 0) return 0;
        const total = danhgia.reduce((acc, item) => acc + Number(item.danhgia), 0);
        return total / danhgia.length;
    };

    return (
        <div className="container">
            <section className="py-10 md:py-20">
                <div className="max-w-8xl mx-auto">
                    {/* Header section remains the same */}
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="title-between-area bg-gradient-to-r from-blue-900 via-pink-700 to-pink-700 p-4 sm:p-6 lg:p-8 rounded-xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                                <div className="title-area-left-style">
                                    <div className="pre-title flex items-center mb-4 space-x-2 animate-fade-in">
                                        <div className="flex items-center justify-center text-white w-10 h-10 rounded-full bg-pink-300">
                                            <i className="bi bi-lightbulb text-white text-xl animate-pulse"></i>
                                        </div>
                                        <span className="text-white uppercase text-lg">
                                            Khóa học
                                        </span>
                                    </div>
                                    <h2 className="title text-2xl sm:text-3xl lg:text-4xl font-medium mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                        <strong>Khám phá các khóa học xu hướng</strong>
                                    </h2>
                                    <p className="post-title text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed mt-2 text-white">
                                        Bạn sẽ tìm thấy thứ gì đó khơi dậy sự tò mò của bạn và nâng cao kiến thức
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Updated Course Cards Container */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 px-4">
                        {KhoaHoc.map((course, index) => (
                            <Link 
                                key={index} 
                                href={`/page/course-detail?id=${course.id}`}
                                className="block transform hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="group relative bg-black rounded-2xl overflow-hidden h-[450px] shadow-lg hover:shadow-2xl transition-all duration-300">
                                    {/* Background Image */}
                                    <div className="absolute inset-0">
                                        <Image
                                            width={100}
                                            height={100}
                                            src={course.hinh}
                                            alt={course.ten}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90" />
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="absolute inset-0 p-4 flex flex-col justify-end">
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 line-clamp-2">
                                            {course.ten}
                                        </h3>

                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-white">
                                                <Image
                                                    width={32}
                                                    height={32}
                                                    src={course.hinh}
                                                    alt="instructor"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <span className="text-white font-medium">{course.giangvien}</span>
                                        </div>

                                        {/* Stats Row */}
                                        <div className="flex items-center gap-4 text-white/90 text-sm mb-3">
                                            <div className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span>{getAverageRating(course.danhgia).toFixed(1)}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                                <span>{course.dangky.length}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                                <span>{course.baihocs.length} bài học</span>
                                            </div>
                                        </div>

                                        {/* Price and Action Button */}
                                        <div className="flex items-center justify-between">
                                            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                                <span className="text-white font-bold">
                                                    {course.giamgia ? (
                                                        <>
                                                            <span className="line-through text-white/60 mr-2">
                                                                {course.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                            </span>
                                                            <span className="text-red-400">
                                                                {course.giamgia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                            </span>
                                                        </>
                                                    ) : course.gia === 0 ? (
                                                        "Miễn phí"
                                                    ) : (
                                                        course.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                                                    )}
                                                </span>
                                            </div>

                                            <button className="bg-gradient-to-r w-40 from-gray-900 via-pink-700 to-gray-600 hover:via-pink-700 text-white px-4 py-2 rounded-full font-medium transform hover:scale-105 transition-all duration-300 border border-white">
                                                Xem ngay
                                            </button>
                                        </div>
                                    </div>

                                    {/* Floating Badges */}
                                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                                        <span className="bg-black/75 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium border border-white/20 animate-pulse">
                                            🔥 Hot
                                        </span>
                                        <span className="bg-gradient-to-r from-gray-900 via-pink-700 to-gray-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg border border-white">
                                            ⭐ Trending
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export { CourseArea };

export const OutstandingCourse = () => {
  // Implementation for outstanding courses
};

export const CourseNew = () => {
  // Implementation for new courses
};

export const Courseseal = () => {
  // Implementation for course seal
};

export const Coursefree = () => {
  // Implementation for free courses
};

export const KhoaHocDangHocDay = () => {
  // Implementation for ongoing courses
};

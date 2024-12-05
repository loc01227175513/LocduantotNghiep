
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Img from 'next/image';
import Swiper from 'swiper';
import Link from 'next/link';
import { TatCaKhuyenMaiKhoaHoc } from '../../../service/khuyenmai/khuyenmai';
import HorizontalScrollImages from "@/app/component/course/Slider";


const Home = () => {
    return (
        <>
            <BannerAreaTen />
            <ServiceArea />
            <CourseArea />
            <WhyChooseUs />
            <UpcomingEvents />
            <FunFacts />
            <FeedbackArea />
            <div className='container'>
                <HorizontalScrollImages />
            </div>

        </>
    );
};


const BannerAreaTen = () => {
    return (
        <div className="banner-area-ten min-h-screen py-20 relative overflow-hidden bg-gradient-to-br from-blue-900 to-purple-600">
            {/* Enhanced animated background */}
            <div className="absolute inset-0 z-0">
                <iframe
                    src="https://www.youtube.com/embed/9bFruGkD4Vw?autoplay=1&mute=1&loop=1&controls=0&playlist=9bFruGkD4Vw"
                    className="absolute w-full h-full object-cover scale-110 pointer-events-none"
                    title="Background Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                {/* Gradient overlay on video */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent"></div>

                {/* Animated glowing orbs */}
                <div className="animate-pulse-slow absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/30 rounded-full blur-[100px]"></div>
                <div className="animate-pulse-slow absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[100px]"></div>

                {/* Noise texture overlay */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
            </div>

            <div className="container lg:mt-32 mx-auto px-6 lg:px-8 space-y-20 relative z-10">
                <div className="grid mt-80 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div className="space-y-10 order-2 lg:order-1">
                        <div className="flex items-center space-x-4 animate-fadeIn backdrop-blur-sm bg-white/10 rounded-full py-2 px-4 w-fit">
                            <Img width={24} height={24} src="https://res.cloudinary.com/dxqoaj2jt/image/upload/v1733238928/11_jyq71p.png"
                                alt="pre-title" className="w-6 h-6 animate-bounce-slow" />
                            <span className="text-transparent bg-gradient-to-r text-white bg-clip-text font-medium">
                                Học cùng chúng tôi
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl xl:text-8xl font-bold text-white leading-tight animate-slideUp tracking-tight">
                            Học những gì <br />
                            bạn <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 animate-pulse-slow">
                                có hứng thú
                            </span> <br />
                            Với <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600">
                                TECHSTUDENT
                            </span>
                        </h1>

                        <p className="text-gray-300 text-lg md:text-xl max-w-xl animate-fadeIn leading-relaxed">
                            Các kỹ năng cho hiện tại (và tương lai của bạn). Hãy bắt đầu học với chúng tôi.
                        </p>

                        <div className="flex flex-wrap items-center gap-6 animate-slideUp">
                            <Link href="/page/login" className="group relative px-8 py-4 bg-gradient-to-r from-gray-900 via-pink-700 to-gray-600
        rounded-xl font-medium transition-all duration-300
        hover:shadow-xl hover:shadow-pink-500/25
        before:absolute before:inset-0 before:-z-10 
        before:rounded-xl before:border before:border-white/20
        before:transform before:transition-all before:duration-300
        before:hover:scale-105 before:hover:border-white/40
        before:hover:blur-sm after:absolute after:inset-0 after:-z-20 
        after:rounded-xl after:border-2 after:border-white/10
        after:transition-all after:duration-500
        hover:after:scale-110 hover:after:blur-md
        border-1 border-white
        ">
                                <span className="text-white group-hover:text-pink-100 relative z-10">
                                    Tìm khóa học
                                </span>
                            </Link>
                            <Img width={50} height={50}
                                src="https://res.cloudinary.com/dxqoaj2jt/image/upload/v1733238927/06_opsgah.png"
                                alt="arrow"
                                className="w-12 h-12 animate-bounce-slow" />
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="order-1 lg:order-2">
                        <div className="relative group animate-float-slow">
                            {/* Background glow effects */}
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-500/30 
                            rounded-3xl blur-3xl transform -rotate-6 group-hover:scale-110 transition-transform duration-700"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 
                            rounded-3xl blur-2xl transform rotate-3 group-hover:scale-105 transition-transform duration-700"></div>

                            {/* Image container */}
                            <div className="relative z-10 p-2 backdrop-blur-sm bg-white/10 rounded-3xl 
                            border border-white/10 shadow-2xl
                            before:absolute before:inset-0 before:-z-10 before:rounded-3xl 
                            before:bg-gradient-to-r before:from-pink-500/20 before:to-purple-500/20 
                            before:blur-xl before:transition-all before:duration-700
                            group-hover:before:scale-105 group-hover:border-white/20">

                                <Img width={600} height={500}
                                    src="https://res.cloudinary.com/dxqoaj2jt/image/upload/v1733241704/05_pkkhfu.png"
                                    alt="banner"
                                    className="w-full h-auto max-w-2xl mx-auto rounded-2xl
                                    transform transition-all duration-700 
                                    hover:scale-[1.02] hover:-rotate-1
                                    shadow-[0_0_15px_rgba(255,255,255,0.1)]
                                    group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]" />
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500/30 to-purple-500/30 
                            rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


//chủ đề
const ServiceArea = () => {
    const [DanhMuc, setDanhMuc] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://huuphuoc.id.vn/api/theloai", {
                    referrerPolicy: 'unsafe-url',
                });
                const data = await response.json();
                // Limit to 7 items
                setDanhMuc(data.data.slice(0, 7));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container">
            <section className="py-32 bg-gray-50 relative overflow-hidden">
                {/* Enhanced floating decorations */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
                    <div className="absolute top-40 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-40 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
                </div>

                <div className="container mx-auto px-4 relative">
                    <div className="text-center mb-20 space-y-6">
                        <div className="inline-flex items-center justify-center gap-4 mb-6">
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-900 via-pink-700 to-gray-600 rounded-full blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
                                <div className="relative bg-white rounded-full p-2">
                                    <Img
                                        width={50}
                                        height={50}
                                        src="https://res.cloudinary.com/dxqoaj2jt/image/upload/v1733241753/bulb_y2heue.png"
                                        alt="icon"
                                        className="object-contain hover:scale-125 transition-transform duration-300"
                                    />
                                </div>
                            </div>
                            <span className="text-white font-bold text-lg bg-gradient-to-r from-gray-900 via-pink-700 to-gray-600 px-6 py-3 rounded-full hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300">
                                Dịch vụ
                            </span>
                        </div>

                        <h2 className="text-5xl font-bold text-gray-900 leading-tight">
                            Kinh doanh chuyên dụng của chúng tôi
                            <br />
                            <span className="bg-gradient-to-r from-gray-900 via-pink-700 to-gray-600 bg-clip-text text-transparent">
                                Khóa học
                            </span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {DanhMuc.map((item, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl 
            transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 bg-gradient-to-br from-gray-900 via-pink-700 to-gray-600 rounded-lg p-4 group-hover:shadow-lg transition-all duration-300">
                                        <Img
                                            width={80}
                                            height={80}
                                            src={item.hinh}
                                            alt="service"
                                            className="object-contain rounded-lg group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <div>
                                        <h5 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-pink-700 
                transition-colors duration-300">
                                            {item.ten}
                                        </h5>
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm
                bg-gradient-to-r from-gray-900 via-pink-700 to-gray-600 text-white">
                                            30+ Khóa học
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};


//khóa học



// ... existing code ...
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
                );
                setKhoaHoc(sortedCourses);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Error fetching data!");
            }
        };
        fetchCourses();

        // Initialize Swiper
        const swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
        });

        return () => swiper.destroy();
    }, []);
    console.log(KhoaHoc, "khoahoc");
    const getAverageRating = (danhgia) => {
        if (!danhgia || danhgia.length === 0) return 0;
        const total = danhgia.reduce((acc, item) => acc + Number(item.danhgia), 0);
        return total / danhgia.length;
    };

    // Hàm hiển thị sao
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                );
            } else if (i === fullStars && halfStar) {
                stars.push(
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                );
            } else {
                stars.push(
                    <svg key={i} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                );
            }
        }
        return stars;
    };
    return (
        <div className="container">
            <div className="w-full">
                <section className="py-20 bg-gray-50 ">
                    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-16 bg-gradient-to-r from-gray-900 via-pink-700 to-gray-600 rounded-2xl shadow-2xl p-8 transform hover:scale-[1.02] transition-all duration-300">
                            <div className="max-w-2xl">
                                <div className="flex items-center gap-4 mb-6 group">
                                    <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg">
                                        <Img
                                            width={40}
                                            height={40}
                                            src="https://res.cloudinary.com/dxqoaj2jt/image/upload/v1733241754/bulb-3_ppeidc.png"
                                            alt="courses icon"
                                            className="object-contain w-10 h-10 animate-pulse"
                                        />
                                    </div>
                                    <span className="text-white font-bold text-xl tracking-wider animate-fade-in">Khóa học</span>
                                </div>
                                <h2 className="text-2xl lg:text-2xl font-extrabold text-white leading-tight mb-4 drop-shadow-2xl">
                                    Khám phá mới và xu hướng
                                </h2>
                            </div>
                            <Link
                                href="#"
                                className="inline-flex items-center gap-3 px-8 py-4 text-white font-bold bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 rounded-full group border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl"
                            >
                                <span>Xem tất cả các khóa học</span>
                                <svg
                                    className="w-6 h-6 transform transition-all duration-300 group-hover:translate-x-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </Link>
                        </div>

                        {/* Swiper Container */}
                        <div className="relative px-4 py-8">
                            <div className="swiper-container overflow-hidden">
                                <div className="swiper-wrapper">
                                    {KhoaHoc.map((course, index) => (
                                        <div key={index} className="swiper-slide w-full p-4">
                                            <Link href={`/page/course-detail?id=${course.id}`}>
                                                <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-1 h-[320px] flex overflow-hidden border border-gray-200 hover:border-gray-300">
                                                    {/* Course Image */}
                                                    <div className="relative w-1/2">
                                                        <Img
                                                            width={400}
                                                            height={320}
                                                            src={course.hinh}
                                                            alt={course.ten}
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                        <div className="absolute top-4 left-4 flex gap-2">
                                                            <span className="bg-[#ff6b6b] text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-lg">
                                                                {/* Updated color for better visibility */}
                                                                Phổ biến
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Course Content */}
                                                    <div className="p-8 w-1/2 flex flex-col justify-between bg-white">
                                                        <div>
                                                            <div className="flex justify-between items-center mb-4">
                                                                <span className="bg-[#fff0f0] text-[#ff6b6b] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide">
                                                                    Người bán tốt nhất
                                                                </span>

                                                                <span className={`text-2xl font-extrabold ${course.giamgia ? 'text-red-600' : 'text-red-600 '}`}>
                                                                    {course.giamgia ? (
                                                                        <>
                                                                            <span className="line-through mr-2 text-gray-500 text-lg">
                                                                                {course.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                                            </span>
                                                                            <span className="text-red-600">
                                                                                {course.giamgia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                                            </span>
                                                                        </>
                                                                    ) : course.gia === 0 ? (
                                                                        <span className="text-red-600'">Miễn phí</span>
                                                                    ) : (
                                                                        course.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                                                                    )}
                                                                </span>
                                                            </div>

                                                            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-snug hover:text-[#ff6b6b] transition-colors">
                                                                {course.ten}
                                                            </h3>

                                                            <div className="flex items-center justify-between mb-4">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-gray-600 font-medium truncate">{course.giangvien}</span>
                                                                </div>

                                                                <span className="flex items-center">
                                                                    <span className="text-[#ffd230] font-semibold">
                                                                        {getAverageRating(course.danhgia).toFixed(1)}
                                                                    </span>
                                                                    <div className="flex ml-2">
                                                                        {renderStars(getAverageRating(course.danhgia))}
                                                                    </div>
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center justify-between text-gray-500 text-sm font-medium">
                                                            <div className="flex items-center gap-2 group-hover:text-black transition-colors">
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                                </svg>
                                                                <span>{course.baihocs.length} Lessons</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 group-hover:text-black transition-colors">
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                                </svg>
                                                                <span>{course.dangky.length} Students</span>
                                                            </div>
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
                </section>
            </div>
        </div>
    );
}
// ... existing code ...






const WhyChooseUs = () => {
    return (
        <div className="why-choose-us bg-blue bg-choose-us-one bg-gradient-to-r  bg_image rts-section-gap shape-move from-gray-900 via-pink-700 to-gray-600">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="why-choose-us-area-image pb--50">
                            <Img width={100} height={50}
                                className="one"
                                src="https://res.cloudinary.com/dxqoaj2jt/image/upload/v1733240062/02_xa4bqd.jpg"
                                alt="why-choose"
                            />
                            <div className="border-img">
                                <Img width={100} height={50}
                                    className="two ml--20"
                                    src="https://res.cloudinary.com/dxqoaj2jt/image/upload/v1733240062/03_qubiro.jpg"
                                    alt="why-choose"
                                />
                            </div>
                            <div className="circle-animation">
                                <Link
                                    className="uni-circle-text uk-background-white dark:uk-background-gray-80 uk-box-shadow-large uk-visible@m"
                                    href="#view_in_opensea"
                                >
                                    <svg
                                        className="uni-circle-text-path uk-text-secondary uni-animation-spin"
                                        viewBox="0 0 100 100"
                                        width={140}
                                        height={140}
                                    >
                                        <defs>
                                            <path
                                                id="circle"
                                                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                                            ></path>
                                        </defs>
                                        <text fontSize="11.2">
                                            <textPath xlinkHref="#circle">
                                                Về TECHSTUDENT • Giới thiệu về TECHSTUDENT •
                                            </textPath>
                                        </text>
                                    </svg>
                                    <i className="fa-regular fa-arrow-up-right" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 pl--90 pl_sm--15 pt_sm--50">
                        <div className="title-area-left-style">
                            <div className="pre-title">
                                <Img width={100} height={50} src="https://res.cloudinary.com/dxqoaj2jt/image/upload/v1733238928/11_jyq71p.png" alt="icon" />
                                <span>Tại sao chọn chúng tôi</span>
                            </div>
                            <h2 className="title">
                                Nghiên cứu con đường xuất sắc của bạn &amp; Thành công
                            </h2>
                            <p className="post-title">
                                Chúng tôi đam mê giáo dục và tận tâm cung cấp cao-{" "}
                                <br /> Tài nguyên học tập chất lượng cho người học của tất cả các nền tảng.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
                            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="mb-4 p-3 bg-blue-50 rounded-full">
                                    <Img width={100} height={50} src="https://res.cloudinary.com/dxqoaj2jt/image/upload/v1733239744/05_hznj2t.svg"
                                        alt="Expert Teachers"
                                        className="w-16 h-16" />
                                </div>
                                <h6 className="text-xl font-semibold text-gray-800">Giáo viên hướng dẫn chuyên gia</h6>
                            </div>
                            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="mb-4 p-3 bg-green-50 rounded-full">
                                    <Img width={100} height={50} src="https://res.cloudinary.com/dxqoaj2jt/image/upload/v1733239742/02_nc0mnq.svg"
                                        alt="Interactive Learning"
                                        className="w-16 h-16" />
                                </div>
                                <h6 className="text-xl font-semibold text-gray-800">Học tập tương tác</h6>
                            </div>
                            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="mb-4 p-3 bg-yellow-50 rounded-full">
                                    <Img width={100} height={50} src="https://res.cloudinary.com/dxqoaj2jt/image/upload/v1733239742/04_tbowfk.svg"
                                        alt="Affordable Learning"
                                        className="w-16 h-16" />
                                </div>
                                <h6 className="text-xl font-semibold text-gray-800">Học tập giá cả phải chăng</h6>
                            </div>
                            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="mb-4 p-3 bg-purple-50 rounded-full">
                                    <Img width={100} height={50} src="https://res.cloudinary.com/dxqoaj2jt/image/upload/v1733239742/06_nubzt8.svg"
                                        alt="Career Progress"
                                        className="w-16 h-16" />
                                </div>
                                <h6 className="text-xl font-semibold text-gray-800">Tiến bộ nghề nghiệp</h6>
                            </div>
                            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="mb-4 p-3 bg-red-50 rounded-full">
                                    <Img width={100} height={50} src="https://res.cloudinary.com/dxqoaj2jt/image/upload/v1733239742/01_ajk4w2.svg"
                                        alt="Course Selection"
                                        className="w-16 h-16" />
                                </div>
                                <h6 className="text-xl font-semibold text-gray-800">Lựa chọn khóa học</h6>
                            </div>
                            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="mb-4 p-3 bg-indigo-50 rounded-full">
                                    <Img width={100} height={50} src="https://res.cloudinary.com/dxqoaj2jt/image/upload/v1733239742/07_zqiucw.svg"
                                        alt="Support Community"
                                        className="w-16 h-16" />
                                </div>
                                <h6 className="text-xl font-semibold text-gray-800">Cộng đồng hỗ trợ</h6>
                            </div>
                        </div>
                        <Link
                            href="/page/Cours-Filter"
                            className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white 
                    bg-gradient-to-r from-gray-900 via-pink-700 to-gray-600
                    border-1 border-white
                    hover:from-gray-900 hover:to-pink-700
                    rounded-full shadow-lg 
                    transform transition-all duration-300 
                    hover:scale-105 hover:shadow-xl 
                    focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                        >
                            Xem tất cả các khóa học
                            <svg
                                className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="shape-image">
                <div className="shape one" data-speed="0.04" data-revert="true">
                    <Img width={50} height={50} src="https://res.cloudinary.com/dxqoaj2jt/image/upload/v1733241758/bulb-7_vnw838.png" alt="" />
                </div>
                <div className="shape two" data-speed="0.04">
                    <Img width={50} height={50} src="https://res.cloudinary.com/dxqoaj2jt/image/upload/v1733241760/globe_witi7q.png" alt="" />
                </div>
                <div className="shape three" data-speed="0.04">
                    <Img width={50} height={50} src="https://res.cloudinary.com/dxqoaj2jt/image/upload/v1733241755/bulb-5_wuimjg.png" alt="" />
                </div>
            </div>
        </div>
    );
};



const UpcomingEvents = () => {
    const [KhuyenMai, setKhuyenMai] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await TatCaKhuyenMaiKhoaHoc();
                setKhuyenMai(response);
            } catch (error) {
                console.error('Fetch error:', error);
                toast.error("Failed to fetch vouchers.");
            }
        };
        fetchData();
    }, []);
    console.log(KhuyenMai, "khuyenmai");

    return (
        <div className="up-coming-events rts-section-gap">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="title-area-center-style">
                            <div className="pre-title">
                                <Img
                                    width={100}
                                    height={50}
                                    src="https://res.cloudinary.com/dxqoaj2jt/image/upload/v1733241704/07_uqfitz.png"
                                    alt="icon"
                                />
                                <span>Sự Kiện Nổi Bật</span>
                            </div>
                            <h2 className="title">Khám Phá Sự Kiện Đặc Sắc</h2>
                            <p className="post-title">
                                Khám phá những trải nghiệm độc đáo, kích thích sự tò mò và mở ra cánh cửa tri thức mới
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row mt--50">
                    <div className="col-lg-12">
                        <div className="upcoming-events-main-wrapper-1">
                            {KhuyenMai.slice(0, 3).map((voucher) => (
                                <div key={voucher.id} className="single-upcoming-events">
                                    <div className="img-information">
                                        <Link href="/page/login" className="thumbnail">
                                            <Img width={100} height={50} src={voucher.khoahoc.hinh} alt="events" />
                                        </Link>
                                        <div className="information">
                                            <div className="date-details">
                                                <div className="date">
                                                    <i className="fa-thin fa-calendar-days" />
                                                    <p>Bắt đầu: {new Date(voucher.magiamgia.ngaybatdau).toLocaleDateString()}</p>
                                                </div>
                                                <div className="date">
                                                    <i className="fa-thin fa-calendar-days" />
                                                    <p>Kết thúc: {new Date(voucher.magiamgia.ngayketthuc).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <Link href="/page/login">
                                                <h5 className="title">
                                                    {voucher.khoahoc.ten}
                                                </h5>
                                            </Link>
                                        </div>
                                    </div>
                                    <Link
                                        href="/page/login"
                                        className="rts-btn btn-primary with-arrow"
                                    >
                                        Nhận vé <i className="fa-light fa-arrow-right" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const useCountAnimation = (end, duration = 2000) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);

    const animateCount = useCallback(() => {
        const start = 0;
        const steps = 60;
        const stepTime = Math.floor(duration / steps);
        let current = start;

        const timer = setInterval(() => {
            current += Math.ceil((end - start) / steps);
            if (current >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(current);
            }
        }, stepTime);
    }, [end, duration]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    animateCount();
                }
            },
            { threshold: 0.5 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, [end, animateCount]);

    return [count, countRef];
};


const FunFacts = () => {
    const [count1, ref1] = useCountAnimation(65972);
    const [count2, ref2] = useCountAnimation(5321);
    const [count3, ref3] = useCountAnimation(44239);
    const [count4, ref4] = useCountAnimation(75992);
    return (
        <div className="relative py-20 bg-gradient-to-br from-gray-900 via-pink-700 to-gray-600 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Fact Card 1 */}
                        <div className="backdrop-blur-sm bg-white/10 rounded-xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20">
                            <div className="flex justify-center mb-4">
                                <Img width={80} height={80} src="https://res.cloudinary.com/dxqoaj2jt/image/upload/v1733239744/05_hznj2t.svg"
                                    alt="icon" className="hover:rotate-6 transition-transform" />
                            </div>
                            <h5 className="text-4xl font-bold text-white text-center mb-2">
                                <span ref={ref1} className="counter">{count1.toLocaleString()}</span>
                            </h5>
                            <p className="text-gray-200 text-center text-lg font-medium">Học sinh ghi danh</p>
                        </div>

                        {/* Fact Card 2 */}
                        <div className="backdrop-blur-sm bg-white/10 rounded-xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20">
                            <div className="flex justify-center mb-4">
                                <Img width={80} height={80} src="https://res.cloudinary.com/dxqoaj2jt/image/upload/v1733239742/02_nc0mnq.svg"
                                    alt="icon" className="hover:rotate-6 transition-transform" />
                            </div>
                            <h5 className="text-4xl font-bold text-white text-center mb-2">
                                <span ref={ref2} className="counter">{count2.toLocaleString()}</span>
                            </h5>
                            <p className="text-gray-200 text-center text-lg font-medium">Hoàn thành các khóa học</p>
                        </div>

                        {/* Fact Card 3 */}
                        <div className="backdrop-blur-sm bg-white/10 rounded-xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20">
                            <div className="flex justify-center mb-4">
                                <Img width={80} height={80} src="https://res.cloudinary.com/dxqoaj2jt/image/upload/v1733239742/04_tbowfk.svg"
                                    alt="icon" className="hover:rotate-6 transition-transform" />
                            </div>
                            <h5 className="text-4xl font-bold text-white text-center mb-2">
                                <span ref={ref3} className="counter">{count3.toLocaleString()}</span>
                            </h5>
                            <p className="text-gray-200 text-center text-lg font-medium">Người học tích cực</p>
                        </div>

                        {/* Fact Card 4 */}
                        <div className="backdrop-blur-sm bg-white/10 rounded-xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20">
                            <div className="flex justify-center mb-4">
                                <Img width={80} height={80} src="https://res.cloudinary.com/dxqoaj2jt/image/upload/v1733239742/06_nubzt8.svg"
                                    alt="icon" className="hover:rotate-6 transition-transform" />
                            </div>
                            <h5 className="text-4xl font-bold text-white text-center mb-2">
                                <span ref={ref4} className="counter">{count4.toLocaleString()}</span>
                            </h5>
                            <p className="text-gray-200 text-center text-lg font-medium">Tổng số tuyển sinh</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -left-10 top-10 opacity-20 animate-pulse" data-speed="0.04" data-revert="true">
                    <Img width={150} height={150} src="https://res.cloudinary.com/dxqoaj2jt/image/upload/v1733238927/04_ennjfn.svg" alt="" />
                </div>
                <div className="absolute right-0 bottom-0 opacity-20 animate-pulse" data-speed="0.04">
                    <Img width={200} height={200} src="https://res.cloudinary.com/dxqoaj2jt/image/upload/v1733238928/11_jyq71p.png" alt="" />
                </div>
            </div>
        </div>
    );
};



const FeedbackArea = () => {
    const [danhGia, setData] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://huuphuoc.id.vn/api/danhgia', {
                    referrerPolicy: 'unsafe-url',
                });
                const data = await response.json();
                setData(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % danhGia.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + danhGia.length) % danhGia.length);
    };

    console.log(danhGia, "danhgia");

    return (
        <div className='container'>
            <div className="rts-feedback-area py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    {/* Header section remains the same... */}

                    {/* Updated Testimonial Slider */}
                    <div className=" mx-auto">
                        <div className="bg-gradient-to-r from-gray-900 to-pink-800 rounded-2xl p-8 shadow-xl">
                            <div className="relative">
                                {/* Slider Container */}
                                <div className="overflow-hidden">
                                    <div
                                        className="flex transition-transform duration-500 ease-out"
                                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                    >
                                        {danhGia.map((item, index) => (
                                            <div key={index} className="w-full flex-shrink-0">
                                                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:bg-white/10 transition">
                                                    <div className="flex flex-col md:flex-row gap-6 items-center">
                                                        {/* Profile Image */}
                                                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-pink-500/30">
                                                            <Img width={100} height={100}
                                                                src={item.nguoi_danh_gia.hinh || ''}
                                                                alt={item.nguoi_danh_gia.ten}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>

                                                        {/* Content */}
                                                        <div className="flex-1 text-white">
                                                            <div className="flex mb-4">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <svg
                                                                        key={i}
                                                                        className={`w-5 h-5 ${i < parseInt(item.so_sao) ? 'text-yellow-400' : 'text-gray-400'}`}
                                                                        fill="currentColor"
                                                                        viewBox="0 0 20 20"
                                                                    >
                                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                    </svg>
                                                                ))}
                                                            </div>
                                                            <p className="text-lg italic text-gray-100 mb-4">&quot;{item.noi_dung}&quot;</p>
                                                            <h5 className="text-xl font-bold">{item.nguoi_danh_gia.ten}</h5>
                                                            <p className="text-pink-300">{item.ngay_danh_gia}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Navigation Controls */}
                                <div className="flex items-center justify-between mt-6">
                                    <button
                                        onClick={() => setCurrentSlide((prev) => (prev - 1 + danhGia.length) % danhGia.length)}
                                        className="p-2 rounded-full w-10 m-2  bg-white/20 hover:bg-white/30 transition-colors"
                                    >
                                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>

                                    {/* Slide Indicators */}
                                    <div className="flex gap-2">
                                        {danhGia.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentSlide(index)}
                                                className={`w-2.5 h-2.5 rounded-full transition-colors ${currentSlide === index ? 'bg-white' : 'bg-white/30'
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setCurrentSlide((prev) => (prev + 1) % danhGia.length)}
                                        className="p-2 rounded-full w-10 m-2 bg-white/20 hover:bg-white/30 transition-colors"
                                    >
                                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};





export default Home;
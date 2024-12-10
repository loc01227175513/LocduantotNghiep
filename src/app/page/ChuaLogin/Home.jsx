"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Img from 'next/image';
import Swiper from 'swiper';
import Link from 'next/link';
import { TatCaKhuyenMaiKhoaHoc } from '../../../service/khuyenmai/khuyenmai';
import HorizontalScrollImages from "@/app/component/course/Slider";
import Image from 'next/image';
import Counter from "@/app/component/home/Counter";
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
            <div className='container my-20'>
                <HorizontalScrollImages />
            </div>

        </>
    );
};


const BannerAreaTen = () => {
    return (
        <div className="banner-area-ten min-h-screen py-20 relative overflow-hidden bg-gradient-to-br from-blue-900 to-purple-600">
            {/* Enhanced animated background */}
            <div className="absolute inset-0 z-0 opacity-80">
                <iframe
                    src="https://www.youtube.com/embed/9bFruGkD4Vw?autoplay=1&mute=1&loop=1&controls=0&playlist=9bFruGkD4Vw"
                    className="absolute w-full h-full object-cover scale-110 pointer-events-none "
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

            <div className="container lg:mt-32 mx-auto px-6 lg:px-8 space-y-20 relative z-10" >
                <div className="grid mt-80 lg:grid-cols-2 gap-16 items-center" >
                    {/* Left Content */}
                    <div className="space-y-10 order-2 lg:order-1">
                        <div className="flex items-center space-x-4 animate-fadeIn backdrop-blur-sm bg-white/10 rounded-full py-2 px-4 w-fit" >
                            <i className="bi bi-lightbulb text-white text-2xl"></i>
                            <span className="text-transparent bg-gradient-to-r text-white bg-clip-text font-medium" >
                                Học cùng chúng tôi
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl xl:text-8xl font-medium text-white leading-tight animate-slideUp tracking-tight">
                            Học những gì <br />
                            bạn <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-pink-700 to-pink-700 animate-pulse-slow text-stroke-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}>
                                có hứng thú
                            </span> <br />
                            Với <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-pink-700 to-pink-700 animate-pulse-slow text-stroke-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}>
                                TECHSTUDENT
                            </span>
                        </h1>

                        <p className="text-white text-xl md:text-xl max-w-xl animate-fadeIn leading-relaxed">
                            Các kỹ năng cho hiện tại (và tương lai của bạn). Hãy bắt đầu học với chúng tôi.
                        </p>

                        <div className="flex flex-wrap items-center gap-6 animate-slideUp">
                            <Link href="/page/login" className="group relative px-8 py-4 bg-gradient-to-r from-blue-900 via-pink-700 to-pink-700
        rounded-xl font-medium transition-all duration-300
        hover:shadow-xl hover:from-pink-700 hover:to-pink-700
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
                                <span className="text-white text-xl group-hover:text-pink-100 relative z-10">
                                    Tìm khóa học
                                </span>
                            </Link>

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
                                    src="https://res.cloudinary.com/dxqoaj2jt/image/upload/v1733241747/32_inhyjx.png"
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
                setDanhMuc(data.data.slice(0, 5));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container">
            <section className="py-10 relative overflow-hidden">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center  mb-6">
                        <div className="relative group flex items-center justify-center">

                            <div className="relative bg-pink-200 rounded-[100%] p-2 h-16 w-16 flex items-center justify-center">
                                <i className="bi bi-lightbulb text-white text-2xl"></i>
                            </div>
                        </div>
                        <span className="text-black font-semibold text-4xl px-6 py-3 bg-gradient-to-r from-blue-900 to-pink-700 bg-clip-text text-transparent hover:text-pink-700">
                            Danh Mục Khóa Học Nổi Bật
                        </span>
                    </div>
                </div>

                {/* TikTok-style Vertical Scroll Container */}
                <div className="mx-auto  ">
                    <div className="flex gap-5  ">
                        {DanhMuc.map((item, index) => (
                            <div
                                key={index}
                                className="group bg-white "
                            >
                                <div className="relative bg-white rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.1)] overflow-hidden hover:shadow-[0_0_20px_rgba(0,0,0,0.05)] transform hover:scale-105 transition-all duration-300">
                                    {/* Category Image */}
                                    <div className="relative overflow-hidden rounded-t-md aspect-video ">
                                        <Img
                                            width={300}
                                            height={200}
                                            src={item.hinh}
                                            alt={item.ten}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                        />
                                        {/* Overlay Gradient */}

                                    </div>

                                    {/* Category Info */}



                                    {/* Stats Row */}
                                    <div className="p-3 sm:p-6 text-center">
                                        <h6 className="text-lg sm:text-2xl text-gray-800 mb-2 group-hover:text-pink-700 transition-colors">
                                            {item.ten}
                                        </h6>
                                        <p className="text-xs sm:text-xl flex items-center justify-center gap-1 sm:gap-2">
                                            <i className="bi bi-collection text-xl sm:text-2xl"></i>
                                            <span className="text-lg sm:text-2xl" style={{ fontWeight: '400' }}>130+ khóa học</span>
                                        </p>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Add custom scrollbar styles */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #111827, #be185d, #111827);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, #1f2937, #db2777, #1f2937);
                }
            `}</style>
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
                ).slice(0, 6); // Changed to show 6 courses
                setKhoaHoc(sortedCourses);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Error fetching data!");
            }
        };
        fetchCourses();

        // Updated Swiper configuration
        const swiper = new Swiper('.swiper-container', {
            slidesPerView: 4, // Show 4 slides per view
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                // When window width is >= 320px
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                // When window width is >= 768px
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                // When window width is >= 1024px
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 20
                }
            }
        });

        return () => swiper.destroy();
    }, []);
    console.log(KhoaHoc, "khoahoc");
    const getAverageRating = (danhgia) => {
        if (!danhgia || danhgia.length === 0) return 0;
        const total = danhgia.reduce((acc, item) => acc + Number(item.danhgia), 0);
        return total / danhgia.length;
    };


    return (
        <div className="container">

            <section className="py-10 md:py-20 ">
                <div className=" mx-auto ">
                    {/* Header */}
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="title-between-area bg-gradient-to-r from-blue-900 via-pink-700 to-pink-700 p-4 sm:p-6 lg:p-8 rounded-xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                                <div className="title-area-left-style">
                                    <div className="pre-title flex items-center mb-4 space-x-2 animate-fade-in">
                                        <div className="flex items-center justify-center text-white w-10 h-10 rounded-full bg-pink-300">
                                            <i className="bi bi-lightbulb text-white  text-xl animate-pulse"></i>
                                        </div>
                                        <span className="text-white  uppercase text-lg">
                                            Khóa học
                                        </span>
                                    </div>
                                    <h2 className="title text-2xl sm:text-3xl lg:text-4xl font-medium mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                        <strong> Khám phá các khóa học xu hướng</strong>
                                        <p className="post-title text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed mt-2">
                                            Bạn sẽ tìm thấy thứ gì đó khơi dậy sự tò mò của bạn và
                                            nâng cao
                                        </p>
                                    </h2>
                                </div>
                                <div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Swiper Container */}
                    <div className="relative px-2 md:px-4 py-4 md:py-8">
                        <div className="swiper-container overflow-hidden">
                            <div className="swiper-wrapper">
                                {KhoaHoc.map((course, index) => (
                                    <div key={index} className="swiper-slide w-full p-2 md:p-4">
                                        <Link href={`/page/course-detail?id=${course.id}`}>
                                            <div className="group relative bg-black rounded-2xl overflow-hidden  h-[250px] mx-auto hover:scale-[1.02] transition-transform duration-300">
                                                {/* Background Video/Image */}
                                                <div className="absolute inset-0">
                                                    <Img
                                                        width={100}
                                                        height={100}
                                                        src={course.hinh}
                                                        alt={course.ten}
                                                        className="w-full h-full object-cover opacity-75"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/90" />
                                                </div>

                                                {/* Content Overlay */}
                                                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                                                    {/* Course Title and Description */}
                                                    <h3 className="text-2xl md:text-2xl font-bold text-white mb-2 line-clamp-2">
                                                        {course.ten}
                                                    </h3>

                                                    <div className="flex items-center gap-2 mb-3">
                                                        <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-white">
                                                            <Img
                                                                width={32}
                                                                height={32}
                                                                src={course.hinh}
                                                                alt="instructor"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <span className="text-white font-medium text-xl ">{course.giangvien}</span>
                                                    </div>

                                                    {/* Stats Row */}
                                                    <div className="flex items-center gap-4 text-white/90 text-xl mb-3">
                                                        <div className="flex items-center gap-1">
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            <span className="text-xl">{getAverageRating(course.danhgia).toFixed(1)}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                            </svg>
                                                            <span className="text-xl">{course.dangky.length}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                            </svg>
                                                            <span className="text-xl">{course.baihocs.length} bài học</span>
                                                        </div>
                                                    </div>

                                                    {/* Price Tag */}
                                                    <div className="flex items-center justify-between">
                                                        <div className="px-4 py-2 rounded-full">
                                                            <span className="text-white font-bold">
                                                                {course.giamgia ? (
                                                                    <> <span className="text-red-400 text-xl mr-2 ">
                                                                        {course.giamgia.toLocaleString('vi-VN')}
                                                                        VNĐ
                                                                    </span>

                                                                        <span className="line-through text-xl  text-white/60">
                                                                            {course.gia.toLocaleString('vi-VN')}
                                                                            VNĐ
                                                                        </span>

                                                                    </>
                                                                ) : course.gia === 0 ? (

                                                                    <span className="text-red-400 text-xl ">
                                                                        Miễn phí
                                                                    </span>
                                                                ) : (
                                                                    course.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                                                                )}
                                                            </span>
                                                        </div>

                                                        {/* Action Button */}
                                                        <button className="bg-gradient-to-r w-40 from-blue-900 via-pink-700 to-pink-700 hover:bg-pink-700 text-xl  text-white px-4 py-2 rounded-full font-medium transform hover:scale-105 transition-all duration-300 border border-white">
                                                            <Link href={`/page/course-detail?id=${course.id}`}>
                                                                Xem ngay
                                                            </Link>
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Floating Badges */}
                                                <div className="absolute top-4 right-4 flex flex-col gap-2">
                                                    <span className="bg-black/75 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xl font-medium border border-white/20 ">
                                                        🔥 Hot
                                                    </span>
                                                    <span className="bg-white text-black px-3 py-1 rounded-full text-xl font-sans shadow-lg border border-black">
                                                        ⭐ Trending
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Add Navigation Arrows */}
                        <button
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full 
                                bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300
                                border border-white/20 hover:border-white/40 group w-20 h-20
                                transform -translate-x-1/2 hover:scale-110"
                            onClick={() => {
                                const swiper = document.querySelector('.swiper-container').swiper;
                                swiper.slidePrev();
                            }}
                        >
                            <svg
                                className="text-black transform transition-transform group-hover:-translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>

                        <button
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full
                                bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300
                                border border-white/20 hover:border-white/40 group w-20 h-20
                                transform translate-x-1/2 hover:scale-110"
                            onClick={() => {
                                const swiper = document.querySelector('.swiper-container').swiper;
                                swiper.slideNext();
                            }}
                        >
                            <svg
                                className=" text-black transform transition-transform group-hover:translate-x-1"
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
                        </button>
                    </div>

                </div>
            </section>

        </div>
    );
}
// ... existing code ...






const WhyChooseUs = () => {
    return (
        <div className="why-choose-us bg-gradient-to-r  from-blue-900 via-pink-700 to-pink-700 bg-choose-us-one bg_image rts-section-gap shape-move">
            <div className="container mx-auto  px-4">
                <div className="flex flex-col lg:flex-row items-start gap-20">
                    {/* Left Column - Images */}
                    <div className="lg:w-5/12">
                        <div className="relative">
                            <Image
                                width={300}
                                height={500}
                                className="rounded-xl shadow-lg"
                                src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1728218768/02_atsgze.jpg"
                                alt="why-choose"
                                style={{ height: "500px", width: "270px" }}
                            />
                            <div className="absolute -right-10 bottom-10">
                                <Image
                                    width={400}
                                    height={320}
                                    className="rounded-xl shadow-lg"
                                    src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1728218908/03_grf0on.jpg"
                                    alt="why-choose"
                                    style={{ height: "320px", width: "320px" }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Content */}
                    <div className="lg:w-7/12 p-10">
                        <div className="space-y-6">
                            {/* Header */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <i className="bi bi-lightbulb text-white animate-pulse text-xl"></i>
                                    <span className="text-white font-bold text-xl">
                                        Tại sao chọn chúng tôi
                                    </span>
                                </div>
                                <h2 className="text-white text-5xl font-medium">
                                    Techstudent - Con đường dẫn đến{" "}
                                    <span className="font-medium">
                                        sự xuất sắc
                                    </span>
                                </h2>
                                <p className="text-white text-2xl">
                                    Chúng tôi đam mê giáo dục và tận tâm cung cấp các nguồn
                                    học tập chất lượng cao cho người học mọi lúc.
                                </p>
                            </div>

                            {/* Grid of Features */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[
                                    {
                                        img: "01_s9m4hw.png",
                                        title: "Chất lượng hàng đầu",
                                        desc: "Đội ngũ giảng viên xuất sắc",
                                    },
                                    {
                                        img: "02_vnmc5y.png",
                                        title: "Học linh hoạt",
                                        desc: "Học mọi lúc, mọi nơi",
                                    },
                                    {
                                        img: "03_gqwcdw.png",
                                        title: "Hỗ trợ 24/7",
                                        desc: "Luôn sẵn sàng giúp đỡ",
                                    },
                                    {
                                        img: "04_zdj1tq.png",
                                        title: "Chứng chỉ giá trị",
                                        desc: "Được công nhận toàn cầu",
                                    },
                                    {
                                        img: "05_qkz8ke.png",
                                        title: "Cộng đồng lớn",
                                        desc: "Kết nối & học hỏi",
                                    },
                                    {
                                        img: "05_qkz8ke.png",
                                        title: "Giá cả hợp lý",
                                        desc: "Phù hợp mọi đối tượng",
                                    },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/10 rounded-xl  backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                                    >
                                        <div className="flex flex-col items-center p-10  justify-between flex-wrap">
                                            <div className=" p-2">
                                                <Image
                                                    width={64}
                                                    height={64}
                                                    src={`https://res.cloudinary.com/dnjakwi6l/image/upload/v1728219100/${item.img}`}
                                                    alt={item.title}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <h4 className="text-white text-xl font-bold mb-2 text-center">
                                                {item.title}
                                            </h4>
                                            <p className="text-gray-200 text-center">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/page/Cours-Filter"
                                    className="px-6 py-3 bg-gradient-to-r border border-white from-blue-900 via-pink-700 to-pink-700 text-white rounded-full hover:from-pink-700 hover:to-pink-700 transition-all duration-300 flex items-center gap-2"
                                >
                                    <span className="text-xl">Xem tất cả các khóa học</span>
                                    <i className="fas fa-arrow-right"></i>
                                </Link>
                                <Link
                                    href="#khoahocmoi"
                                    className="px-6 py-3 border border-white text-white rounded-full hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                                >
                                    <span className="text-xl">Xem các khóa học mới</span>
                                    <i className="fas fa-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
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
                        <div className="title-between-area bg-gradient-to-r from-blue-900 via-pink-700 to-pink-700 p-4 sm:p-6 lg:p-8 rounded-xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                            <div className="title-area-left-style">
                                <div className="pre-title flex items-center mb-4 space-x-2 animate-fade-in">
                                    <div className="flex items-center justify-center text-white w-10 h-10 rounded-full bg-pink-300">
                                        <i className="bi bi-lightbulb text-white  text-xl animate-pulse"></i>
                                    </div>
                                    <span className="text-white  uppercase text-lg">
                                        Khóa học
                                    </span>
                                </div>
                                <h2 className="title text-2xl sm:text-3xl lg:text-4xl font-medium mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                    <strong>     Khám Phá Sự Kiện Đặc Sắc</strong>
                                    <p className="post-title text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed mt-2">
                                        Khám phá những trải nghiệm độc đáo, kích thích sự tò mò và mở ra cánh cửa tri thức mới
                                    </p>
                                </h2>
                            </div>
                            <div>

                            </div>
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
                                                    <i className="fa-thin fa-calendar-days " style={{ marginRight: "-6px" }} />
                                                    <p>Bắt đầu: {new Date(voucher.magiamgia.ngaybatdau).toLocaleDateString()}</p>
                                                </div>
                                                <div className="date">
                                                    <i className="fa-thin fa-calendar-days" style={{ marginRight: "-6px" }} />
                                                    <p>Kết thúc: {new Date(voucher.magiamgia.ngayketthuc).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <Link href="/page/login">
                                                <h5 className="title text-2xl">
                                                    {voucher.khoahoc.ten}
                                                </h5>
                                            </Link>
                                        </div>
                                    </div>
                                    <Link
                                        href="/page/login"
                                        className="rts-btn text-xl bg-gradient-to-r from-blue-900 via-pink-700 to-pink-700 text-white hover:from-pink-700 hover:to-pink-700 with-arrow"
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



const FunFacts = () => {

    return (
        <div className="fun-facts-area bg-gradient" data-aos="fade-up">
            {/* Each fact item */}
            <div className="fact-item" data-aos="fade-up" data-aos-delay="100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="fun-facts-wrapper d-flex flex-wrap justify-content-around">
                                <div className="fact-item text-center wow fadeInUp" data-wow-delay="0.2s">
                                    <div className="icon-wrapper mb-3">
                                        <i className="fas fa-user-graduate fa-3x text-primary"></i>
                                    </div>
                                    <h2 className="counter-value mb-2">
                                        <Counter target={872} />+
                                    </h2>
                                    <p className="text-xl">Tổng Học Viên Đăng Ký</p>
                                </div>

                                <div className="fact-item text-center wow fadeInUp" data-wow-delay="0.4s">
                                    <div className="icon-wrapper mb-3">
                                        <i className="fas fa-graduation-cap fa-2x text-success"></i>
                                    </div>
                                    <h2 className="counter-value mb-2">
                                        <Counter target={221} />+
                                    </h2>
                                    <p className="text-xl">Học Viên Tốt Nghiệp</p>
                                </div>

                                <div className="fact-item text-center wow fadeInUp" data-wow-delay="0.6s">
                                    <div className="icon-wrapper mb-3">
                                        <i className="fas fa-users fa-2x text-info"></i>
                                    </div>
                                    <h2 className="counter-value mb-2">
                                        <Counter target={639} />+
                                    </h2>
                                    <p className="text-xl">Học Viên Đang Học</p>
                                </div>

                                <div className="fact-item text-center wow fadeInUp" data-wow-delay="0.8s">
                                    <div className="icon-wrapper mb-3">
                                        <i className="fas fa-star fa-2x text-warning"></i>
                                    </div>
                                    <h2 className="counter-value mb-2">
                                        <Counter target={792} />+
                                    </h2>
                                    <p className="text-xl">Đánh Giá Tích Cực</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
          [data-aos] {
            pointer-events: none;
          }
          [data-aos].aos-animate {
            pointer-events: auto;
          }

          /* Optional: Add custom transitions */
          [data-aos="custom-fade"] {
            opacity: 0;
            transition-property: opacity, transform;

            &.aos-animate {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Optional: Add scroll-based parallax effect */
          .parallax {
            transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }

          @media (prefers-reduced-motion: no-preference) {
            .parallax {
              transform: translateY(var(--parallax-y, 0));
            }
          }
          .fun-facts-area {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          }

          .fact-item {
            padding: 2rem;
            transition: all 0.3s ease;
          }

          .fact-item:hover {
            transform: translateY(-5px);
          }

          .icon-wrapper {
            height: 70px;
            width: 70px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.9);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          }

          .counter-value {
            font-size: 2.5rem;
            font-weight: 700;
            color: #2d3748;
          }

          .fact-label {
            font-size: 1.1rem;
            color: #4a5568;
            margin: 0;
          }
          .why-choose-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            margin: 3rem 0;
          }

          .reason-card {
            padding: 1.5rem;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.05);
            transition: all 0.3s ease;
          }

          .reason-card:hover {
            transform: translateY(-5px);
            background: rgba(255, 255, 255, 0.1);
          }

          .hover-scale {
            transition: transform 0.3s ease;
          }

          .hover-scale:hover {
            transform: scale(1.05);
          }

          .animate-pulse {
            animation: pulse 1s infinite;
          }

          .hover-effect {
            transition: all 0.3s ease;
          }

          .hover-effect:hover {
            transform: translateX(10px);
          }

          @keyframes pulse {
            0% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
            100% {
              opacity: 1;
            }
          }
        `}</style>
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
            <div className="rts-feedback-area py-20 ">
                <div className="container mx-auto px-4">
                    {/* Header section remains the same... */}

                    {/* Updated Testimonial Slider */}
                    <div className=" mx-auto">
                        <div className="bg-gradient-to-r from-blue-900 via-pink-700 to-pink-700 rounded-2xl p-8 shadow-xl">
                            <div className="relative">
                                {/* Slider Container */}
                                <div className="overflow-hidden">
                                    <div
                                        className="flex transition-transform duration-500 ease-out"
                                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                    >
                                        {danhGia.map((item, index) => (
                                            <div key={index} className="w-full flex-shrink-0 mt-3 mx-3">
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
                                                            <div className="flex mb-4  text-2xl">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <svg
                                                                        key={i}
                                                                        className={`w-8 h-8 ${i < parseInt(item.so_sao) ? 'text-yellow-400' : 'text-gray-400'}`}
                                                                        fill="currentColor"
                                                                        viewBox="0 0 20 20"
                                                                        style={{ marginRight: "-2px" }}
                                                                    >
                                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                    </svg>
                                                                ))}
                                                            </div>
                                                            <p className=" italic text-gray-100 mb-4 text-2xl">&quot;{item.noi_dung}&quot;</p>
                                                            <h5 className="text-xl font-bold">{item.nguoi_danh_gia.ten}</h5>
                                                            <p className="text-white">{item.ngay_danh_gia.split('T')[0]}</p>
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
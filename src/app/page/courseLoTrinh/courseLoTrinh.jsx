"use client";
import React, { useState, useEffect } from 'react';
import { LoTrinhKhoaHoc, LoTrinhKhoaHocCon } from "../../../service/Lotrinh/Lotrinh";
import { FaBook, FaArrowRight, FaGraduationCap, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';
import Image from 'next/image';

const fallbackImageUrl = '/images/default-avatar.png'; // Ensure this path is correct

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 m-4 h-[400px] min-w-[400px]">
                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-red-600 transition-all"
                >
                    <FaTimes size={24} />
                </button>
                {children}
            </div>
        </div>
    );
};

// ... existing code ...
export default function Roadmap() {
    const [loTrinhKhoaHoc, setLoTrinhKhoaHoc] = useState([]);
    const [loTrinhKhoaHocCon, setLoTrinhKhoaHocCon] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        LoTrinhKhoaHoc().then((response) => {
            setLoTrinhKhoaHoc(response);
        }).catch(error => console.error(error));

        LoTrinhKhoaHocCon().then((response) => {
            setLoTrinhKhoaHocCon(response);
        }).catch(error => console.error(error));
    }, []);

    const getSubCourses = (courseId) => {
        return loTrinhKhoaHocCon.filter(subCourse => subCourse.id_lotrinhkhoahoc === courseId);
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('.course-section');
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                if (rect.top >= 0 && rect.bottom <= windowHeight) {
                    section.classList.remove('dark-overlay');
                } else {
                    section.classList.add('dark-overlay');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="py-20 min-h-screen bg-gradient-to-br mt-60 from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-purple-100/20 blur-3xl -z-10"></div>
                    <h1 className="text-center text-6xl font-bold mb-8 bg-gradient-to-r text-black bg-clip-text">
                        Lộ Trình Khóa Học
                    </h1>
                    <p className="text-2xl text-gray-600 max-w-2xl mx-auto font-medium">
                        Lên kế hoạch cho hành trình học tập của bạn với lộ trình được chế tác chuyên nghiệp của chúng tôi
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {loTrinhKhoaHoc.map((course) => (
                        <div
                            key={course.id}
                            className="course-section group relative border border-pink-700 bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer mx-auto w-full max-w-[300px]"
                            onClick={() => setSelectedCourse(course)}
                        >
                            <div className="overflow-hidden rounded-t-2xl w-full">
                                <Image
                                    src={course.hinh || fallbackImageUrl}
                                    alt={course.ten}
                                    width={400}
                                    height={300}
                                    className="w-full h-48 sm:h-64 object-cover transition-all duration-700"
                                    onError={(e) => {
                                        e.target.src = fallbackImageUrl;
                                    }}
                                />
                            </div>
                            <div className="p-4 sm:p-6 relative z-10">
                                <div className="flex items-center mb-4">
                                    <FaGraduationCap className="text-black text-2xl sm:text-3xl mr-2 sm:mr-3" />
                                    <h2 className="text-[16px] font-bold text-gray-800 line-clamp-2">
                                        {course.ten}
                                    </h2>
                                </div>
                                <p className="text-gray-600 text-[16px] line-clamp-1 overflow-hidden whitespace-nowrap text-ellipsis">
                                    {course.mota}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                isOpen={!!selectedCourse}
                onClose={() => setSelectedCourse(null)}
            >
                {selectedCourse && (
                    <div className=" ">
                        <h3 className="flex items-center gap-2 text-pink-700 text-4xl">
                            <FaBook className="" />
                            Lộ trình: {selectedCourse.ten}
                        </h3>
                        <div className="flex mt-4">
                            {getSubCourses(selectedCourse.id).map((subCourse, index) => (
                                <Link
                                    key={subCourse.id}
                                    href={`/page/course-detail?id=${subCourse.khoahoc.id}`}
                                >
                                    <div
                                        className={`containerhshss group ${index > 0 ? "shift-left" : ""}`}
                                    >
                                        <div className="arrow-box relative inline-block bg-pink-700 text-white py-[10px] px-[30px] text-xl group-hover:bg-pink-800 transition-colors duration-500">
                                            <div className="content p-3">
                                                <p className='font-bold'>{subCourse.khoahoc.ten}</p>
                                            </div>
                                        </div>
                                        <div className="h-[270px] m-[10px] bg-white absolute left-0 rounded-md shadow p-2 overflow-hidden" style={{ width: 'calc(100% - 30px)' }} >
                                            <p className=' text-black text-[16px] group-hover:text-pink-700 transition-colors duration-300 line-clamp-3'>{subCourse.khoahoc.mota}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
// ... existing code ...
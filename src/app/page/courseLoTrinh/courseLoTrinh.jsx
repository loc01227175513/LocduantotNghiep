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
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 m-4 max-w-2xl w-full">
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
        <div className="py-80 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-purple-100/20 blur-3xl -z-10"></div>
                <h1 className="text-center text-6xl font-medium mb-8 bg-gradient-to-r text-black bg-clip-text">
                    Lộ Trình Khóa Học
                </h1>
                <p className="text-2xl text-gray-600 max-w-2xl mx-auto font-medium">
                    Lên kế hoạch cho hành trình học tập của bạn với lộ trình được chế tác chuyên nghiệp của chúng tôi
                </p>
            </div>
    
            <div className="flex flex-wrap -mx-4">
    {loTrinhKhoaHoc.map((course) => (
        <div
            key={course.id}
            className="course-section group relative border-1  border-amber-500 bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer m-4"
            style={{ width: '300px' }}
            onClick={() => setSelectedCourse(course)}
        >
            <div className="overflow-hidden rounded-t-2xl" style={{ width: '300px' }}>
                <Image
                    src={course.hinh || fallbackImageUrl}
                    alt={course.ten}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover transition-all duration-700"
                    onError={(e) => {
                        e.target.src = fallbackImageUrl;
                    }}
                />
            </div>
            <div className="p-8 relative z-10" style={{ width: '300px' }}>
                <div className="flex items-center mb-4">
                    <FaGraduationCap className="text-blue-500 text-3xl mr-3" />
                    <h2 className="text-2xl font-bold text-gray-800">
                        {course.ten}
                    </h2>
                </div>
                <p className="text-gray-600">
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
                <div className="space-y-6 overflow-hidden">
                    <h3 className="text-3xl font-bold text-blue-600 flex items-center">
                        <FaBook className="mr-3" />
                        Lộ trình: {selectedCourse.ten}
                    </h3>
                    <div className="space-y-4">
                        {getSubCourses(selectedCourse.id).map((subCourse) => (
                            <Link
                                key={subCourse.id}
                                href={`/page/course-detail?id=${subCourse.khoahoc.id}`}
                            >
                                <div
                                    className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300 group cursor-pointer transform hover:scale-105 hover:shadow-xl"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="transition-all duration-300">
                                            <h4 className="font-bold text-blue-700 group-hover:text-purple-700">
                                                {subCourse.khoahoc.ten}
                                            </h4>
                                            <p className="text-sm text-gray-600 mt-1 group-hover:text-gray-800">
                                                {subCourse.khoahoc.mota}
                                            </p>
                                        </div>
                                        <FaArrowRight className="text-blue-500 group-hover:text-purple-500 transition-all duration-300" />
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
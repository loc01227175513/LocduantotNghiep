"use client";
import React, { useState, useEffect } from 'react';
import { LoTrinhKhoaHoc, LoTrinhKhoaHocCon } from "../../../service/Lotrinh/Lotrinh";
import { FaBook, FaArrowRight, FaGraduationCap, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';
import Image from 'next/image';
import ReactConfetti from 'react-confetti';

const fallbackImageUrl = '/images/default-avatar.png'; // Ensure this path is correct

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <ReactConfetti
                numberOfPieces={200}
                recycle={false}
                tweenDuration={4000}
            />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 m-4 max-w-2xl w-full animate-modal-entrance">
            <button
    onClick={onClose}
    className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-red-600 transform hover:rotate-90 transition-all hover:animate-spin"
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-purple-100/20 blur-3xl -z-10"></div>
                    <h1 className="text-6xl font-extrabold mb-8 bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 bg-clip-text text-transparent bg-size-200 animate-gradient">
                        Lộ Trình Khóa Học
                    </h1>
                    <p className="text-2xl text-gray-600 max-w-2xl mx-auto font-medium animate-fade-in">
                        Plan your learning journey with our expertly crafted roadmap
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {loTrinhKhoaHoc.map((course, index) => (
                        <div
                            key={course.id}
                            className={`course-section group relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl 
                transform hover:-translate-y-2 transition-all duration-300 cursor-pointer 
                hover:bg-gradient-to-br hover:from-white hover:to-blue-50
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-400/0 before:via-purple-400/10 before:to-blue-400/0 
                before:opacity-0 before:group-hover:opacity-100 before:transition-opacity before:duration-500`}
                            onClick={() => setSelectedCourse(course)}
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <div className="overflow-hidden rounded-t-2xl">
                                <Image
                                    src={course.hinh || fallbackImageUrl}
                                    alt={course.ten}
                                    width={400}
                                    height={300}
                                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-all duration-700 
                        group-hover:brightness-110 group-hover:contrast-110"
                                    onError={(e) => {
                                        e.target.src = fallbackImageUrl;
                                    }}
                                />
                            </div>
                            <div className="p-8 relative z-10">
                                <div className="flex items-center mb-4 transform group-hover:translate-x-2 transition-transform duration-300">
                                    <FaGraduationCap className="text-blue-500 text-3xl mr-3 group-hover:scale-110 group-hover:text-purple-500 transition-all" />
                                    <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 group-hover:from-blue-600 group-hover:to-purple-600 bg-clip-text text-transparent transition-all duration-300">
                                        {course.ten}
                                    </h2>
                                </div>
                                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
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
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center animate-slide-down">
                            <FaBook className="mr-3 animate-bounce" />
                            Lộ trình: {selectedCourse.ten}
                        </h3>
                        <div className="space-y-4">
                            {getSubCourses(selectedCourse.id).map((subCourse, index) => (
                                <Link
                                    key={subCourse.id}
                                    href={`/page/course-detail?id=${subCourse.khoahoc.id}`}
                                >
                                    <div
                                        className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300 group cursor-pointer transform hover:scale-105 hover:shadow-xl animate-slide-up"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="transform transition-all duration-300 group-hover:translate-x-2">
                                                <h4 className="font-bold text-blue-700 group-hover:text-purple-700 transition-colors">
                                                    {subCourse.khoahoc.ten}
                                                </h4>
                                                <p className="text-sm text-gray-600 mt-1 group-hover:text-gray-800">
                                                    {subCourse.khoahoc.mota}
                                                </p>
                                            </div>
                                            <FaArrowRight className="text-blue-500 transform group-hover:translate-x-4 group-hover:scale-110 transition-all duration-300 group-hover:text-purple-500" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </Modal>

            <style jsx>{`
               @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    .hover\\:animate-spin:hover {
        animation: spin 1s linear infinite;
    }
              @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    .animate-gradient {
        animation: gradient 6s linear infinite;
        background-size: 200% auto;
    }
    @keyframes fade-in {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
        animation: fade-in 0.6s ease-out forwards;
    }
                @keyframes modal-entrance {
                    0% { opacity: 0; transform: scale(0.5) rotate(-10deg); }
                    50% { transform: scale(1.1) rotate(5deg); }
                    100% { opacity: 1; transform: scale(1) rotate(0); }
                }
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(50px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slide-down {
                    from { opacity: 0; transform: translateY(-50px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-modal-entrance {
                    animation: modal-entrance 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
                .animate-slide-up {
                    opacity: 0;
                    animation: slide-up 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }
                .animate-slide-down {
                    animation: slide-down 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
                .dark-overlay::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 1;
                }
            `}</style>
        </div>
    );
}
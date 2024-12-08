"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion'; // Add animation library

const TabContent = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
    >
        {children}
    </motion.div>
);

const BecomeInstructor = () => {
    return (
        <div className="relative p-8 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg 
            hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100 rounded-full -mr-20 -mt-20 opacity-20"/>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-100 rounded-full -ml-16 -mb-16 opacity-20"/>
            
            {/* Content with enhanced styling */}
            <div className="relative z-10">
                <div className="flex items-center mb-8">
                    <i className="fas fa-chalkboard-teacher text-3xl text-blue-500 mr-4"></i>
                    <p className="text-lg text-gray-700 border-l-4 border-blue-500 pl-4 italic">
                        Trở thành một người hướng dẫn liên quan đến một loạt các bước có thể thay đổi tùy thuộc vào loại hướng dẫn mà bạn quan tâm (ví dụ: giảng dạy học thuật, đào tạo công ty, khóa học trực tuyến). Đây là một hướng dẫn chung để giúp bạn trở thành một người hướng dẫn:
                    </p>
                </div>

                <div className="space-y-8">
                    <div className="transform hover:scale-102 transition-all p-4 bg-white rounded-lg shadow-sm">
                        <h6 className="mb-3 text-xl font-bold text-blue-600 flex items-center">
                            <i className="fas fa-lightbulb text-yellow-400 mr-2"></i>
                            Xác định lĩnh vực chuyên môn của bạn:
                        </h6>
                        <p className="text-gray-700 ml-6">
                            Xác định môn học hoặc kỹ năng mà bạn có chuyên môn và đam mê giảng dạy.
                        </p>
                    </div>

                    <div className="transform hover:scale-102 transition-all p-4 bg-white rounded-lg shadow-sm">
                        <h6 className="mb-3 text-xl font-bold text-blue-600 flex items-center">
                            <i className="fas fa-graduation-cap text-blue-400 mr-2"></i>
                            Trình độ học vấn:
                        </h6>
                        <p className="text-gray-700 ml-6">
                            Có được các bằng cấp giáo dục cần thiết cho cấp độ và loại hướng dẫn mà bạn đang hướng tới. Điều này có thể bao gồm bằng cử nhân.
                        </p>
                    </div>
                </div>

                <div className="mt-12 flex justify-center transform hover:scale-105 transition-all duration-500">
                    <div className="relative rounded-xl overflow-hidden shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"/>
                        <Image 
                            width={300}
                            height={200}    
                            src="https://cdn.vus.edu.vn/webroot/css/images/website/2024/giaovien/ANNE-KENTHILL-ELOISE.webp" 
                            alt="instructor" 
                            className="w-[300px] h-[200px] object-cover rounded-xl" 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
const InstructorRules = () => {
    return (
        <div className="relative p-8 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg 
            hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -mr-16 -mt-16 opacity-20"/>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-100 rounded-full -ml-12 -mb-12 opacity-20"/>
            
            <div className="relative z-10">
                {/* Header section */}
                <div className="flex items-center mb-8 bg-white p-6 rounded-lg shadow-sm">
                    <i className="fas fa-book-reader text-3xl text-blue-500 mr-4"></i>
                    <p className="text-lg text-gray-700 border-l-4 border-blue-500 pl-4 italic">
                        Trở thành một người hướng dẫn liên quan đến một loạt các bước có thể thay đổi tùy thuộc vào loại hướng dẫn mà bạn quan tâm (ví dụ: giảng dạy học thuật, đào tạo công ty, khóa học trực tuyến). Đây là một hướng dẫn chung để giúp bạn trở thành một người hướng dẫn:
                    </p>
                </div>

                {/* Content cards */}
                <div className="space-y-6">
                    <div className="transform hover:scale-102 transition-all p-6 bg-white rounded-lg shadow-sm border-l-4 border-yellow-400">
                        <h6 className="mb-3 text-xl font-bold text-blue-600 flex items-center">
                            <i className="fas fa-star text-yellow-400 mr-3"></i>
                            Xác định lĩnh vực chuyên môn của bạn:
                        </h6>
                        <p className="text-gray-700 ml-8">
                            Xác định môn học hoặc kỹ năng mà bạn có chuyên môn và đam mê giảng dạy.
                        </p>
                    </div>

                    <div className="transform hover:scale-102 transition-all p-6 bg-white rounded-lg shadow-sm border-l-4 border-blue-400">
                        <h6 className="mb-3 text-xl font-bold text-blue-600 flex items-center">
                            <i className="fas fa-graduation-cap text-blue-400 mr-3"></i>
                            Trình độ học vấn:
                        </h6>
                        <p className="text-gray-700 ml-8">
                            Có được các bằng cấp giáo dục cần thiết cho cấp độ và loại hướng dẫn mà bạn đang hướng tới. Điều này có thể bao gồm bằng cử nhân.
                        </p>
                    </div>
                </div>

                {/* Image section */}
                <div className="mt-12 flex justify-center">
                    <div className="relative rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"/>
                        <Image 
                            width={300}
                            height={200}    
                            src="https://cdn.vus.edu.vn/webroot/css/images/website/2024/giaovien/EMILIE-SLATER.webp" 
                            alt="instructor" 
                            className="w-[300px] h-[200px] object-cover rounded-xl" 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const StartWithCourses = () => {
    return (
        <div className="relative p-8 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg 
            hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-100 rounded-full -mr-20 -mt-20 opacity-20"/>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-100 rounded-full -ml-16 -mb-16 opacity-20"/>
            
            <div className="relative z-10">
                {/* Header with icon */}
                <div className="flex items-center mb-8 bg-white p-6 rounded-lg shadow-sm border-l-4 border-indigo-500">
                    <i className="fas fa-rocket text-3xl text-indigo-500 mr-4"></i>
                    <p className="text-lg text-gray-700 pl-4">
                        Trở thành một người hướng dẫn liên quan đến một loạt các bước có thể thay đổi tùy thuộc vào loại hướng dẫn mà bạn quan tâm (ví dụ: giảng dạy học thuật, đào tạo công ty, khóa học trực tuyến). Đây là một hướng dẫn chung để giúp bạn trở thành một người hướng dẫn:
                    </p>
                </div>

                {/* Content cards */}
                <div className="space-y-6">
                    <div className="transform hover:scale-102 transition-all p-6 bg-white rounded-lg shadow-sm hover:shadow-md">
                        <h6 className="mb-3 text-xl font-bold text-indigo-600 flex items-center">
                            <i className="fas fa-compass text-yellow-500 mr-3"></i>
                            Xác định lĩnh vực chuyên môn của bạn:
                        </h6>
                        <p className="text-gray-700 ml-8">
                            Xác định môn học hoặc kỹ năng mà bạn có chuyên môn và đam mê giảng dạy.
                        </p>
                    </div>

                    <div className="transform hover:scale-102 transition-all p-6 bg-white rounded-lg shadow-sm hover:shadow-md">
                        <h6 className="mb-3 text-xl font-bold text-indigo-600 flex items-center">
                            <i className="fas fa-graduation-cap text-indigo-500 mr-3"></i>
                            Trình độ học vấn:
                        </h6>
                        <p className="text-gray-700 ml-8">
                            Có được các bằng cấp giáo dục cần thiết cho cấp độ và loại hướng dẫn mà bạn đang hướng tới. Điều này có thể bao gồm bằng cử nhân.
                        </p>
                    </div>
                </div>

                {/* Enhanced image section */}
                <div className="mt-12 flex justify-center">
                    <div className="relative rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"/>
                        <Image 
                            width={300}
                            height={200}     
                            src="https://cdn.vus.edu.vn/webroot/css/images/website/2024/giaovien/ARMANDO-DE-CRESCENZO.webp" 
                            alt="instructor" 
                            className="w-[300px] h-[200px] object-cover rounded-xl" 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Main1() {
    const [activeTab, setActiveTab] = useState('home');
    
    return (
        <>
            {/* Enhanced header area */}
            <div className="p-8 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="mb-16 relative">
                    <div className="absolute -top-4 -left-4 w-20 h-20 bg-yellow-400 rounded-full opacity-20"/>
                    <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-300 rounded-full opacity-20"/>
                    <h2 className="mb-6 text-4xl font-bold text-white">Làm thế nào để trở thành một người hướng dẫn</h2>
                    <p className="text-white text-lg opacity-90">
                        Trở thành người hướng dẫn liên quan đến một loạt các bước có thể thay đổi tùy thuộc vào loại hướng dẫn mà bạn quan tâm
                    </p>
                </div>
                <div className="mb-16 transform hover:scale-102 transition-all duration-500 flex justify-center">
                    <Image 
                        width={500} 
                        height={300}    
                        src="https://cdn.vus.edu.vn/webroot/css/images/website/2024/banner_inside/banner_giaovien.webp" 
                        alt="instructor" 
                        className="w-[500px] h-[300px]  rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300" 
                    />
                </div>
            </div>

            {/* Enhanced tabs */}
            <div className="mt-16">
                <ul className="flex border-b-2 border-gray-200 gap-2">
                    {[
                        {id: 'home', icon: 'fa-user', text: 'Trở thành một người hướng dẫn'},
                        {id: 'profile', icon: 'fa-list', text: 'Quy tắc hướng dẫn'},
                        {id: 'contact', icon: 'fa-box', text: 'Bắt đầu với các khóa học'}
                    ].map(tab => (
                        <li key={tab.id}>
                            <button
                                className={`
                                    inline-block px-8 py-4 text-lg font-semibold rounded-t-lg
                                    transition-all duration-300 transform hover:-translate-y-1
                                    ${activeTab === tab.id 
                                        ? 'text-blue-600 border-b-4 border-blue-600 bg-white shadow-lg' 
                                        : 'text-gray-500 hover:text-blue-400 hover:bg-gray-50'}
                                `}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <i className={`mr-2 fa-regular ${tab.icon}`}></i>
                                {tab.text}
                            </button>
                        </li>
                    ))}
                </ul>
                
                <AnimatePresence mode="wait">
                    <div className="mt-8 tab-content">
                        {activeTab === 'home' && <TabContent><BecomeInstructor /></TabContent>}
                        {activeTab === 'profile' && <TabContent><InstructorRules /></TabContent>}
                        {activeTab === 'contact' && <TabContent><StartWithCourses /></TabContent>}
                    </div>
                </AnimatePresence>
            </div>
        </>
    );
}
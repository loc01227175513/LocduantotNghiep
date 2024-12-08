"use client";
import React, { useEffect, useState } from "react";
import './comment.css';
import Image from 'next/image';

const Commenthome = () => {
    const [DanhGia, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedComments, setExpandedComments] = useState({});
    const [isExpanded, setIsExpanded] = useState(false);
    const itemsPerPage = 5;

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

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(DanhGia.length / itemsPerPage);
    const displayedComments = DanhGia.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const toggleDescription = (index) => {
        setExpandedComments(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div className="container mx-auto px-4 mb-10 mt-18">
            <div className="grid gap-8 mx-6 small:grid-cols-1 md:grid-cols-5 mt-20">
                {displayedComments.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="relative flex-shrink-0">
                                <Image
                                    width={56}
                                    height={56}
                                    src={item.nguoi_danh_gia.hinh}
                                    alt=""
                                    className="rounded-full object-cover"
                                />
                            </div>
                            <div className="min-w-0">
                                <h6
                                    className="font-semibold text-2xl mb-2 truncate hover:cursor-help"
                                    title={item.nguoi_danh_gia.ten}
                                >
                                    {item.nguoi_danh_gia.ten}
                                </h6>
                                <span className="inline-block px-3 py-1 bg-pink-200 rounded-full text-pink-700 text-lg">
                                    Học viên
                                </span>
                            </div>
                        </div>

                        <div className="flex-grow overflow-hidden">
                            <div className={`relative ${expandedComments[index] ? '' : 'max-h-[24px]'}`}>
                                <p className="text-gray-600">
                                    {item.noi_dung}
                                </p>
                            </div>
                            {item.noi_dung.length > 50 && (
                                <button
                                    onClick={() => toggleDescription(index)}
                                    className="text-pink-500 hover:text-pink-700 text-lg font-medium mt-2 transition-colors duration-200"
                                >
                                    {expandedComments[index] ? '← Thu gọn' : 'Xem tiếp →'}
                                </button>
                            )}
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center space-x-1">
                                <span className="font-medium text-lg">{item.so_sao}</span>
                                <div className="flex">
                                    {Array.from({ length: 5 }).map((_, idx) => (
                                        <svg key={idx} style={{ marginLeft: "-4px" }} className={`w-8 h-8 ${idx < item.so_sao ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                            <span className="text-lg text-gray-500">
                                {new Date(item.ngay_danh_gia
                                ).toLocaleDateString('vi-VN')}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                    {[...Array(totalPages).keys()].map((page) => (
                        <button
                            key={page}
                            className={`px-4 py-2 rounded-md transition-colors duration-200 ${page + 1 === currentPage
                                    ? 'bg-pink-800 text-white border boder-white'
                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                }`}
                            onClick={() => handlePageChange(page + 1)}
                        >
                            {page + 1}
                        </button>
                    ))}
                </div>
            </div>
            <style jsx>{`
               /* comment.css */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.grid > div {
    animation: fadeIn 0.5s ease-out forwards;
}

.grid > div:nth-child(2) {
    animation-delay: 0.1s;
}

.grid > div:nth-child(3) {
    animation-delay: 0.2s;
}

.relative {
    overflow: hidden;
    transition: max-height 0.3s ease-out;
}

.relative p {
    margin: 0;
    line-height: 1.5;
}
    `}</style>
        </div>
    );
};

export { Commenthome };
"use client";
import React, { useEffect, useState } from "react";
import './comment.css';
import Image from 'next/image';

const Commenthome = () => {
    const [DanhGia, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

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

    return (
        <div className="max-w-7xl mx-auto px-4 mb-10 mt-18">
            <div className="grid gap-8 mx-6 small:grid-cols-1 md:grid-cols-3">
                {displayedComments.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Image
                                    width={56}
                                    height={56}
                                    src={item.nguoi_danh_gia.hinh}
                                    alt=""
                                    className="rounded-full object-cover"
                                />
                            </div>
                            <div>
                                <h6 className="font-semibold text-2xl">{item.nguoi_danh_gia.ten}</h6>
                                <div className="px-3 py-1 bg-teal-100 rounded-full text-teal-800 text-lg font-medium">
                                    Học viên
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-4">
                            <p className="text-gray-600 line-clamp-3">
                                {item.noi_dung}
                            </p>
                            <button className="text-teal-600 hover:text-teal-800 text-lg font-medium mt-2 transition-colors duration-200">
                                Xem tiếp →
                            </button>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center space-x-1">
                                <span className="font-medium text-lg">{item.so_sao}</span>
                                <div className="flex">
                                    {Array.from({ length: 5 }).map((_, idx) => (
                                        <svg key={idx} className={`w-8 h-8 ${idx < item.so_sao ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                            <span className="text-lg text-gray-500">20/20/2020</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                    {[...Array(totalPages).keys()].map((page) => (
                        <button
                            key={page}
                            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                                page + 1 === currentPage 
                                ? 'bg-blue-800 text-white border boder-white' 
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
    `}</style>
        </div>
    );
};

export { Commenthome };
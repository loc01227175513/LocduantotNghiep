"use client";
import React, { useEffect, useState } from 'react';
import { TatCaGiangVien } from '../../../service/Lecture/Lecture';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const AllGiangVien = () => {
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchInstructors = async () => {
            setLoading(true);
            const data = await TatCaGiangVien();
            if (data) {
                setInstructors(data);
            }
            setLoading(false);
        };
        fetchInstructors();
    }, []);

    const filteredInstructors = instructors.filter(instructor =>
        instructor.ten.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white my-40">
            <div className="rts-bread-crumbarea-1 py-16 bg-blue-50">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4 text-white">Người hướng dẫn</h1>
                        <div className="flex justify-center items-center gap-2">
                            <Link href="/" className="text-white text-xl">Trang chủ</Link>
                            <span className='text-xl text-white'>›</span>
                            <span className="text-white text-xl">Tất cả người hướng dẫn</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Tìm kiếm giảng viên..."
                        className="placeholder:text-xl w-full md:w-96 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {loading ? (
                        [...Array(8)].map((_, index) => (
                            <div key={index} className="animate-pulse">
                                <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        ))
                    ) : (
                        filteredInstructors.map((instructor) => (
                            // Update the instructor card markup inside the filteredInstructors.map()
                            <motion.div
                                key={instructor.id}
                                variants={item}
                                className="group relative p-[2px] rounded-xl bg-gradient-to-r from-[#1e3c72]  to-[#ff6b6b] animate-gradient-xy"
                            >
                                <div className="bg-white rounded-xl overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                                    <div className="relative">
                                        <Link href={`/page/Profile-insructor?id=${instructor.id}`}>
                                            <div className="aspect-w-3 aspect-h-2">
                                                <Image
                                                    fill
                                                    src={instructor.hinh}
                                                    alt={instructor.ten}
                                                    className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </div>
                                        </Link>
                                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out transform translate-y-2 group-hover:translate-y-0">
                                            <div className="flex gap-3 justify-center">
                                                {instructor.mangxahoi?.map((social) => (
                                                    <a
                                                        key={social.id}
                                                        href={social.url}
                                                        className="text-white hover:text-blue-400 transition-colors transform hover:scale-125 duration-300"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <i className={`fa-brands fa-${social.nentang} text-xl`} />
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 hover:text-blue-600">
                                            {instructor.ten}
                                        </h3>
                                        <p className="text-gray-600 line-clamp-2">{instructor.tieusu}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </motion.div>
            </div>
            <style jsx>{`@keyframes gradient-xy {
  0%, 100% {
    background-size: 400% 400%;
    background-position: left top;
  }
  25% {
    background-size: 400% 400%;
    background-position: right top;
  }
  50% {
    background-size: 400% 400%;
    background-position: right bottom;
  }
  75% {
    background-size: 400% 400%;
    background-position: left bottom;
  }
}

.animate-gradient-xy {
  animation: gradient-xy 15s ease infinite;
}`}</style>
        </div>
    );
};
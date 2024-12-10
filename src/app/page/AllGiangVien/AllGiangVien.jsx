"use client";
import React, { useEffect, useState } from 'react';
import { TatCaGiangVien } from '../../../service/Lecture/Lecture';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaUserGraduate } from "react-icons/fa";

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
        <>
            <div className="border-b border-gray-800 py-4 absolute top-[130px] w-full bg-gradient-to-r from-blue-900 via-pink-700 to-gray-600 z-[5]">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                        <h1 className="text-[20px] font-bold">Người hướng dẫn</h1>
                        <div className="relative w-full md:w-1/3">
                            <input
                                type="text"
                                placeholder="Tìm kiếm giảng viên..."
                                className="w-full px-4 py-2 text-[14px] placeholder:text-[14px] rounded-full bg-gray-900 border border-gray-700 focus:outline-none focus:border-gray-600"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <i className="fas fa-search absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-40 mx-auto px-4 pt-20">
                {!loading && filteredInstructors.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <FaUserGraduate className="text-6xl text-gray-600 mb-4" />
                        <p className="text-xl text-gray-400">
                            Không tìm thấy giảng viên nào phù hợp với từ khóa &quot;{searchTerm}&quot;
                        </p>
                    </div>
                ) : (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
                    >
                        {loading ? (
                            [...Array(8)].map((_, index) => (
                                <div key={index} className="animate-pulse bg-gray-900 rounded-lg p-4 h-[500px]">
                                    <div className="bg-gray-800 h-[400px] rounded-lg mb-3"></div>
                                    <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                                </div>
                            ))
                        ) : (
                            filteredInstructors.map((instructor) => (
                                <motion.div
                                    key={instructor.id}
                                    variants={item}
                                    className="group relative bg-gray-900 rounded-lg overflow-hidden hover:scale-[1.02] transition-all duration-300"
                                >
                                    <div className="relative h-[260px]">
                                        <Link href={`/page/Profile-insructor?id=${instructor.id}`}>
                                            <Image
                                                fill
                                                src={instructor.hinh}
                                                alt={instructor.ten}
                                                className="object-cover h-[200px]"
                                            />
                                        </Link>

                                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent">
                                            <h3 className="text-[14px] font-semibold mb-2">
                                                {instructor.ten}
                                            </h3>
                                            <p className="text-[13px] text-gray-300 line-clamp-2 mb-3">
                                                {instructor.tieusu}
                                            </p>

                                            <div className="flex items-center gap-4">
                                                {instructor.mangxahoi?.map((social) => (
                                                    <a
                                                        key={social.id}
                                                        href={social.url}
                                                        className="text-white hover:text-pink-500 transition-colors"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <i className={`fa-brands fa-${social.nentang} text-xl`} />
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                )}
            </div>
        </>
    );
};
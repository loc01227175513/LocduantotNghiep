"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
export default function BannerUser() {
    const NguoiDungString = typeof window !== 'undefined' ? localStorage.getItem('data') : null;
    const NguoiDung = NguoiDungString ? JSON.parse(NguoiDungString) : {};


    return (
        <>
            <div className="rts-banner-five bg_image">
                
                <div className="container">
                    <div className="row align-items-center">
                        <motion.div
                            className="col-lg-6 order-xl-1 order-lg-1 order-md-2 order-sm-2 order-2"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >

                            <div className="rts-banner-five-content-wrapper pt--100 pb--150">
                                <span className="pre-title animate-pulse">Xin chào!</span>
                                <h1 className="title-m-5 font-bold">
                                    Chào mừng <br />
                                    <span className="gradient-text">{NguoiDung.ten} </span>



                                </h1>
                                <div className="banner-btn-author-wrapper">
                                    <Link
                                        href="/page/Cours-Filter"
                                        className="rts-btn text-xl btn-primary-white hover:scale-105 transition-transform"
                                    >
                                        Khám phá các khóa học của tôi
                                    </Link>
                                    <div className="rts-wrapper-stars-area">
                                        <h5 className="title">
                                            4.5 <span className="text-gray-600"> Xếp hạng người hướng dẫn</span>
                                        </h5>
                                        {[...Array(4)].map((_, i) => (
                                            <i key={i} className="fa-solid fa-star text-yellow-400" />
                                        ))}
                                        <i className="fa-regular fa-star text-yellow-400" />
                                    </div>
                                    <p className="disc leading-relaxed">
                                    Các kỹ năng cho hiện tại (và tương lai của bạn). Hãy bắt đầu học với chúng tôi.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                       
                    </div>
                </div>

                <motion.div
                    className="banner-absolute-wrapper"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="sm-image-wrapper hover:shadow-lg transition-shadow">
                        <div className="images-wrap">

                            <Image
                                width={100}
                                height={100}
                                src={NguoiDung.hinh}
                                alt="Student statistics"
                            />

                        </div>
                        <div className="info">
                            <h6 className="title font-bold">2K+ Sinh viên</h6>
                            <span>Tham gia các lớp học trực tuyến của chúng tôi</span>
                        </div>
                    </div>

                    <div className="review-thumb">
                        <div className="review-single two hover:shadow-xl transition-all">
                            <Image width={50} height={50} src="https://res.cloudinary.com/dxqoaj2jt/image/upload/v1733241747/33_eohdf3.png" alt="Course statistics" />
                            <div className="info-right">
                                <h6 className="title font-bold">100+</h6>
                                <span>Khóa học trực tuyến</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    )
}
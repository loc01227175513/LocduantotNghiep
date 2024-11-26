"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DanhSachYeuThich, XoaKhoaHocYeuThich } from '../../../../service/YeuThich/YeuThich';
import Image from 'next/image';

export default function VoucherPage() {
    const [love, setLove] = useState([]);

    useEffect(() => {
        const fetchLove = async () => {
            try {
                const response = await DanhSachYeuThich();
                setLove(response.khoahoc);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchLove();
    }, []);

        const deleteFavorite = async (id) => {
        try {
            const response = await XoaKhoaHocYeuThich(id);
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`Course with ID ${id} not found. Status: ${response.status}`);
                } else {
                    throw new Error(`Failed to delete course with ID ${id}. Status: ${response.status}`);
                }
            }
            setTimeout(() => {
                setLove(prevLove => prevLove.filter(item => item.khoahoc.id !== id));
            }, 500);
        } catch (error) {
            window.location.reload();
        }
    };

    return (
        <>
            <div className="col-lg-9 h-lvh">
                <div className="page-background">
                    <div className="exrolled-course-wrapper-dashed">
                        <p className='p-0 m-0 font-bold text-3xl text-black'>khóa học yêu thích</p>
                        <div className="flex gap-3 overflow-x-scroll mt-4">
                            {love.map((item, index) => (
                                <div key={index} className="w-[300px] flex-shrink-0" data-id={item.khoahoc.id}>
                                    <div className="single-course-style-three enroll-course">
                                        <Link href={`/page/course-detail?id=${item.khoahoc.id}`} className="thumbnail">
                                            <Image 
                                                width={250}
                                                height={120}
                                                className="hover-scale w-[250px] h-[120px] object-cover rounded-2xl"
                                                src={item.khoahoc.hinh} alt="course" 
                                            />
                                        </Link>
                                        <div className="body-area">
                                            <div className="course-top">
                                                <div className="price">
                                                    {item.khoahoc.gia === 0 && item.khoahoc.giamgia === 0 ? 'Miễn phí' : `$ ${item.khoahoc.gia}`}
                                                </div>
                                                {item.khoahoc.gia !== 0 || item.khoahoc.giamgia !== 0 ? (
                                                    <div className="line-through price">
                                                        $ {item.khoahoc.giamgia}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <Link href={`/page/course-detail?id=${item.khoahoc.id}`}>
                                                <h5 className="title">{item.khoahoc.ten}</h5>
                                            </Link>
                                            <div className="teacher-stars">
                                                <div className="teacher">
                                                    <span>{item.khoahoc.tenGiangVien}</span>
                                                </div>
                                            </div>
                                            <div className="leasson-students">
                                                <div className="lesson">
                                                    <i className="fa-light fa-calendar-lines-pen" />
                                                    <span>{item.baihoc.length || 0} Bài học</span>
                                                </div>
                                                <div className="students">
                                                    <i className="fa-light fa-users" />
                                                    <span>{item.thanhtoan.length || 0} Học sinh</span>
                                                </div>
                                            </div>
                                            <button className="rts-btn btn-border">
                                                <Link href={`/page/course-detail?id=${item.khoahoc.id}`}>
                                                    Xem Chi Tiết
                                                </Link>
                                            </button>
                                            <button className="rts-btn btn-border" onClick={() => deleteFavorite(item.id)}>
                                                <i className="fa-sharp fa-solid fa-trash" /> Xóa
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
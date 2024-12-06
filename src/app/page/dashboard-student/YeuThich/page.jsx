"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { DanhSachYeuThich, XoaKhoaHocYeuThich } from '../../../../service/YeuThich/YeuThich';
import Image from 'next/image';

export default function VoucherPage() {
    const [love, setLove] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Memoize fetchLove to prevent unnecessary re-renders
    const fetchLove = useCallback(async () => {
        try {
            setError(null);
            const response = await DanhSachYeuThich();
            
            if (!response) {
                throw new Error('Không thể tải dữ liệu');
            }

            if (response?.khoahoc) {
                setLove(response.khoahoc);
            }
        } catch (error) {
            console.error("Error fetching favorites:", error);
            setError(error.message || 'Đã xảy ra lỗi khi tải danh sách yêu thích');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        let isMounted = true;
        
        const initializeFetch = async () => {
            if (isMounted) {
                await fetchLove();
            }
        };

        initializeFetch();

        // Set up polling interval
        const interval = setInterval(() => {
            if (isMounted) {
                fetchLove();
            }
        }, 5000);

        // Cleanup function
        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [fetchLove]);

    const deleteFavorite = async (id) => {
        try {
            setError(null);
            const response = await XoaKhoaHocYeuThich(id);
            
            if (!response) {
                throw new Error('Không thể xóa khóa học');
            }

            if (response?.ok) {
                // Optimistic update
                setLove(prevLove => prevLove.filter(item => item.khoahoc.id !== id));
                
                // Verify update with server
                await fetchLove();
            } else {
                throw new Error(response?.message || 'Không thể xóa khóa học');
            }
        } catch (error) {
            console.error("Error deleting favorite:", error);
            setError(error.message || 'Đã xảy ra lỗi khi xóa khóa học');
            // Rollback on error by refetching
            await fetchLove();
        }
    };

    if (isLoading) {
        return (
            <div className="col-lg-9 h-lvh">
                <div className="page-background">
                    <div className="exrolled-course-wrapper-dashed">
                        <p>Đang tải...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="col-lg-9 h-lvh">
                <div className="page-background">
                    <div className="exrolled-course-wrapper-dashed">
                        <p className="text-red-500">{error}</p>
                        <button 
                            onClick={fetchLove}
                            className="rts-btn btn-border mt-3"
                        >
                            Thử lại
                        </button>
                    </div>
                </div>
            </div>
        );
    }

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
                                                <div className="price line-through ">
                                                    {item.khoahoc.gia === 0 && item.khoahoc.giamgia === 0 ? 'Miễn phí' : `$ ${item.khoahoc.gia}`}
                                                </div>
                                                {item.khoahoc.gia !== 0 || item.khoahoc.giamgia !== 0 ? (
                                                    <div className="price">
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
"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { DanhSachYeuThich, XoaKhoaHocYeuThich } from '../../../../service/YeuThich/YeuThich';
import Image from 'next/image';

// Update font style to match Shopee's font system
const shopeeFont = {
    fontFamily: 'Roboto, Helvetica Neue, Helvetica, Arial, sans-serif',
    WebkitFontSmoothing: 'antialiased',
    color: 'rgba(0,0,0,.87)'
};

export default function VoucherPage() {
    const [love, setLove] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3); // Changed from 5 to 3

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

    // Calculate pagination values
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = love.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(love.length / itemsPerPage);

    // Handle page changes
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (isLoading) {
        return (
            <div className="col-lg-9">
                <div className="dashboard-content">
                    <div className="card">
                        <div className="card-body p-4">
                            <div className="text-center">
                                <p>Đang tải...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="col-lg-9">
                <div className="dashboard-content">
                    <div className="card">
                        <div className="card-body p-4">
                            <div className="text-center">
                                <p className="text-red-500">{error}</p>
                                <button 
                                    onClick={fetchLove}
                                    className="rts-btn btn-primary mt-3"
                                >
                                    Thử lại
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="col-lg-9" style={shopeeFont}>
            <div className="dashboard-content">
                <div className="card">
                    {/* Removed p-4 from card-body and adjusted inner spacing */}
                    <div className="card-body">
                        <h4 className="card-title px-4 py-3 border-b text-[20px] font-normal text-[rgba(0,0,0,.87)] mb-0">
                            Khóa Học Yêu Thích
                        </h4>
                        
                        <div className="grid grid-cols-1 divide-y">
                            {currentItems.map((item, index) => (
                                <div key={index} className="course-card hover:bg-[#FAFAFA] transition-all duration-300">
                                    <div className="flex gap-4 p-4">
                                        {/* Thumbnail */}
                                        <div className="flex-shrink-0 w-48 h-48 relative">
                                            <Link href={`/page/course-detail?id=${item.khoahoc.id}`}>
                                                <Image 
                                                    width={192}
                                                    height={192}
                                                    className="rounded-lg object-cover w-full h-full"
                                                    src={item.khoahoc.hinh} 
                                                    alt={item.khoahoc.ten}
                                                />
                                            </Link>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start mb-2">
                                                <Link 
                                                    href={`/page/course-detail?id=${item.khoahoc.id}`}
                                                    className="text-decoration-none"
                                                >
                                                    <h5 className="text-2xl text-[rgba(0,0,0,.87)] hover:text-pink-500 font-medium">
                                                        {item.khoahoc.ten}
                                                    </h5>
                                                </Link>
                                                <button 
                                                    className="text-black/70 w-10 h-10 hover:text-pink-500 transition-colors"
                                                    onClick={() => deleteFavorite(item.id)}
                                                >
                                                    <i className="fa-sharp fa-solid fa-trash text-xl"></i>
                                                </button>
                                            </div>

                                           

                                            {/* Stats */}
                                            <div className="flex gap-4 text-[rgba(0,0,0,.65)] mb-4 text-[15px]">
                                                <span className="flex items-center gap-1">
                                                    <i className="far fa-book-open"></i>
                                                    {item.baihoc.length || 0} Bài học
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <i className="far fa-users"></i>
                                                    {item.thanhtoan.length || 0} Học viên
                                                </span>
                                            </div>

                                            {/* Price and Action */}
                                            <div className="flex justify-between items-center">
                                                <div className="text-xl">
                                                    {item.khoahoc.gia > 0 && (
                                                        <span className="text-[rgba(0,0,0,.26)] line-through mr-2 text-base">
                                                            ${item.khoahoc.gia}
                                                        </span>
                                                    )}
                                                    <span className="text-pink-700 font-medium">
                                                        {item.khoahoc.giamgia > 0 ? `$${item.khoahoc.giamgia}` : 'Miễn phí'}
                                                    </span>
                                                </div>
                                                <Link 
                                                    href={`/page/course-detail?id=${item.khoahoc.id}`}
                                                    className="px-6 py-2 bg-pink-700 text-white rounded-sm hover:bg-pink-400 transition-colors text-[15px]"
                                                >
                                                    Xem Chi Tiết
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Adjusted pagination spacing */}
                        {love.length > 3 && (
                            <div className="flex justify-center items-center gap-2 py-4 border-t">
                                <button
                                    onClick={() => handlePageChange(1)}
                                    disabled={currentPage === 1}
                                    className={`h-9 w-9 flex items-center justify-center rounded-full text-sm transition-all ${
                                        currentPage === 1 
                                        ? 'bg-gray-50 text-[rgba(0,0,0,.4)] cursor-not-allowed' 
                                        : 'bg-white text-[rgba(0,0,0,.87)] hover:bg-[#ee4d2d] hover:text-white border-2 border-[#ee4d2d]'
                                    }`}
                                >
                                    <i className="fas fa-angle-double-left text-xs"></i>
                                </button>

                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`h-9 w-9 flex items-center justify-center rounded-full transition-all ${
                                        currentPage === 1 
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                        : 'bg-white text-[#ee4d2d] hover:bg-[#ee4d2d] hover:text-white border-2 border-[#ee4d2d]'
                                    }`}
                                >
                                    <i className="fas fa-chevron-left text-xs"></i>
                                </button>

                                {[...Array(totalPages)].map((_, index) => {
                                    if (
                                        index + 1 === 1 ||
                                        index + 1 === totalPages ||
                                        (index + 1 >= currentPage - 1 && index + 1 <= currentPage + 1)
                                    ) {
                                        return (
                                            <button
                                                key={index + 1}
                                                onClick={() => handlePageChange(index + 1)}
                                                className={`h-9 w-9 flex items-center justify-center rounded-full text-sm transition-all ${
                                                    currentPage === index + 1
                                                    ? 'bg-[#ee4d2d] text-white border-2 border-[#ee4d2d] font-normal'
                                                    : 'bg-white text-[rgba(0,0,0,.87)] hover:bg-[#ee4d2d] hover:text-white border-2 border-[#ee4d2d] font-normal'
                                                }`}
                                            >
                                                {index + 1}
                                            </button>
                                        );
                                    } else if (
                                        index + 1 === currentPage - 2 ||
                                        index + 1 === currentPage + 2
                                    ) {
                                        return (
                                            <span key={index} className="h-9 w-9 flex items-center justify-center text-[rgba(0,0,0,.6)]">
                                                ...
                                            </span>
                                        );
                                    }
                                    return null;
                                })}

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`h-9 w-9 flex items-center justify-center rounded-full transition-all ${
                                        currentPage === totalPages
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-white text-[#ee4d2d] hover:bg-[#ee4d2d] hover:text-white border-2 border-[#ee4d2d]'
                                    }`}
                                >
                                    <i className="fas fa-chevron-right text-xs"></i>
                                </button>

                                <button
                                    onClick={() => handlePageChange(totalPages)}
                                    disabled={currentPage === totalPages}
                                    className={`h-9 w-9 flex items-center justify-center rounded-full transition-all ${
                                        currentPage === totalPages
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-white text-[#ee4d2d] hover:bg-[#ee4d2d] hover:text-white border-2 border-[#ee4d2d]'
                                    }`}
                                >
                                    <i className="fas fa-angle-double-right text-xs"></i>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
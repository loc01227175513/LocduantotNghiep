"use client";
import React, { useState, useEffect } from 'react';
import Img from 'next/image';
import { TatCaKhuyenMaiKhoaHoc } from '../../../service/khuyenmai/khuyenmai';
import { toast } from 'react-toastify';

export default function SaleComponent() {
    const [showTimeSlots, setShowTimeSlots] = useState(false);
    const [KhuyenMai, setKhuyenMai] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeDate, setActiveDate] = useState(null);
    const [showFullText, setShowFullText] = useState(false);
    const [countdown, setCountdown] = useState({
        hours: '00',
        minutes: '00',
        seconds: '00',
    });
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [showUpcoming, setShowUpcoming] = useState(false);

    const handleToggleSlots = () => {
        setShowTimeSlots(!showTimeSlots);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await TatCaKhuyenMaiKhoaHoc();
                setKhuyenMai(response);

                const now = new Date().getTime();
                const ongoingDiscounts = response
                    .filter(item => item.magiamgia && item.magiamgia.giamgia > 0)
                    .filter(item => {
                        const end = new Date(item.magiamgia.ngayketthuc).getTime();
                        return now < end;
                    });

                if (ongoingDiscounts.length > 0) {
                    setSelectedSlot(null); // Show all ongoing promotions
                } else {
                    // Fallback to promotions that haven't started yet
                    const upcomingDiscounts = response
                        .filter(item => item.magiamgia && item.magiamgia.giamgia > 0)
                        .filter(item => {
                            const start = new Date(item.magiamgia.ngaybatdau).getTime();
                            return now < start;
                        });

                    if (upcomingDiscounts.length > 0) {
                        const defaultSlot = upcomingDiscounts.reduce((prev, current) => {
                            return new Date(prev.magiamgia.ngaybatdau) < new Date(current.magiamgia.ngaybatdau) ? prev : current;
                        });
                        setSelectedSlot(defaultSlot);
                    }
                }
            } catch (error) {
                console.error('Fetch error:', error);
                toast.error("Failed to fetch vouchers.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        let targetDate;

        if (selectedSlot) {
            const endDate = new Date(selectedSlot.magiamgia.ngayketthuc).getTime();
            targetDate = endDate;
        } else {
            // Find the promotion with the latest end date
            const now = new Date().getTime();
            const validDiscounts = KhuyenMai
                .filter(item => item.magiamgia && item.magiamgia.giamgia > 0)
                .filter(item => {
                    const end = new Date(item.magiamgia.ngayketthuc).getTime();
                    return now < end;
                });

            if (validDiscounts.length > 0) {
                const latestEndDate = validDiscounts.reduce((prev, current) => {
                    return new Date(prev.magiamgia.ngayketthuc) > new Date(current.magiamgia.ngayketthuc) ? prev : current;
                });
                targetDate = new Date(latestEndDate.magiamgia.ngayketthuc).getTime();
            } else {
                setCountdown({ hours: '00', minutes: '00', seconds: '00' });
                return;
            }
        }

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                setCountdown({
                    hours: '00',
                    minutes: '00',
                    seconds: '00',
                });
                clearInterval(interval);
                return;
            }

            const hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
            const minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            const seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');

            setCountdown({ hours, minutes, seconds });
        };

        const interval = setInterval(updateCountdown, 1000);
        updateCountdown();

        return () => clearInterval(interval);
    }, [selectedSlot, KhuyenMai]);

    const getTimeSlots = () => {
        const now = new Date().getTime();
        
        const validDiscounts = KhuyenMai
            .filter(item => item.magiamgia && item.magiamgia.giamgia > 0)
            .filter(item => {
                const end = new Date(item.magiamgia.ngayketthuc).getTime();
                return now < end;
            });
    
        const groupedByDate = validDiscounts.reduce((groups, item) => {
            const date = new Date(item.magiamgia.ngaybatdau).toLocaleDateString();
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(item);
            return groups;
        }, {});
    
        return Object.entries(groupedByDate)
            .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
            .map(([date, items]) => {
                const status = items.some(item => {
                    const start = new Date(item.magiamgia.ngaybatdau).getTime();
                    return now >= start;
                }) ? 'Đang diễn ra' : 'Chưa tới';
    
                const isActive = activeDate === date;
    
                return (
                    <div key={date} 
                        className={`time-slot rounded-lg p-4 border cursor-pointer transition-all duration-300 ease-in-out
                            ${isActive 
                                ? 'bg-orange-50 border-orange-500 shadow-md' 
                                : 'bg-gray-50 border-gray-200 hover:border-orange-300 hover:bg-orange-50/50'}`}
                        onClick={() => {
                            setActiveDate(date);
                            setSelectedSlot(items[0]);
                        }}>
                        <p className="slot-time flex items-center gap-2 text-gray-700">
                            <i className="fas fa-calendar"></i>
                            {date}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                            {items.length} khuyến mãi
                        </p>
                        <p className={`slot-status mt-1 ${status === 'Chưa tới' ? 'text-green-500' : 'text-red-500'}`}>
                            {status}
                        </p>
                    </div>
                );
            });
    };

    const getFilteredCourses = () => {
        const now = new Date().getTime();
        let courses = KhuyenMai;
    
        // Group by date first
        const groupByDate = (items) => {
            return items.reduce((groups, item) => {
                const date = new Date(item.magiamgia.ngaybatdau).toLocaleDateString();
                if (!groups[date]) {
                    groups[date] = [];
                }
                groups[date].push(item);
                return groups;
            }, {});
        };
    
        // Filter by selected slot if exists
        if (selectedSlot) {
            const selectedDate = new Date(selectedSlot.magiamgia.ngaybatdau).toLocaleDateString();
            const grouped = groupByDate(courses);
            courses = grouped[selectedDate] || [];
        } else {
            // Filter active courses
            courses = courses.filter(item => {
                const end = new Date(item.magiamgia.ngayketthuc).getTime();
                return now < end;
            });
    
            // Add upcoming courses if enabled
            if (showUpcoming) {
                const upcomingCourses = KhuyenMai.filter(item => {
                    const start = new Date(item.magiamgia.ngaybatdau).getTime();
                    return now < start;
                });
                courses = [...courses, ...upcomingCourses];
            }
    
            // Group by date and flatten
            const grouped = groupByDate(courses);
            courses = Object.values(grouped).flat();
        }
    
        return courses;
    };
    console.log(KhuyenMai, 'KhuyenMai');

    return (
        <div className="container mx-auto px-4 py-8">
            <section className="flash-sale-section relative">
                <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 h-full">
                    <div className="flash-sale-banner flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl shadow-lg">
                        <h2 className="text-3xl font-extrabold flex items-center gap-6">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 drop-shadow-sm text-4xl">
                                FLASH SALE
                            </span>
                            <span className="text-red-500 text-2xl font-semibold">Kết thúc sau</span>
                            <div className="flash-sale-countdown flex items-center space-x-3">
                                <span className="countdown-box bg-gradient-to-br from-red-500 to-red-600 text-white px-4 py-3 rounded-lg font-mono text-2xl shadow-md">{countdown.hours}</span>
                                <span className="countdown-separator font-bold text-red-500 text-2xl">:</span>
                                <span className="countdown-box bg-gradient-to-br from-red-500 to-red-600 text-white px-4 py-3 rounded-lg font-mono text-2xl shadow-md">{countdown.minutes}</span>
                                <span className="countdown-separator font-bold text-red-500 text-2xl">:</span>
                                <span className="countdown-box bg-gradient-to-br from-red-500 to-red-600 text-white px-4 py-3 rounded-lg font-mono text-2xl shadow-md">{countdown.seconds}</span>
                            </div>
                        </h2>
                        <button
                            onClick={handleToggleSlots}
                            className="relative right-0 toggle-slots-btn bg-white text-orange-500 border-2 border-orange-500 hover:bg-orange-500 hover:text-white px-6 py-2.5 rounded-lg transition-all duration-300 font-semibold flex items-center justify-between gap-3 shadow-sm hover:shadow-md w-44"
                        >
                            <span>Xem tất cả</span>
                            <svg
                                className={`w-5 h-5 transition-transform duration-300 ${showTimeSlots ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className={`time-slots-wrapper w-full transition-all duration-300 ease-in-out overflow-hidden ${showTimeSlots ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="grid grid-cols-2 md:grid-cols-10 gap-4 mt-4 text-center">
                            {getTimeSlots()}
                        </div>
                    </div>

                    <div className="flash-sale-container mt-12 px-4">
                        <div className="flash-sale-row grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                            {getFilteredCourses().map((item) => (
                                <div key={item.id} className="flash-sale-col relative group">
                                    <div className="flash-sale-card bg-white border border-gray-200 rounded-2xl shadow-sm p-5 
                                        hover:shadow-2xl hover:border-orange-200 hover:scale-105 transform transition-all duration-300 ease-in-out">
                                        <div>
                                            {item.magiamgia && item.magiamgia.giamgia > 0 && (
                                                <div className="absolute -top-2 -left-2 discount-badge bg-gradient-to-r from-red-500 to-orange-500 
                                                    text-white px-4 py-1.5 rounded-full text-lg font-bold shadow-lg transform -rotate-12">
                                                    -{item.magiamgia.giamgia}%
                                                </div>
                                            )}
                                            <Img
                                                width={150}
                                                height={100}
                                                alt={item.khoahoc.ten}
                                                src={item.khoahoc.hinh}
                                                className="w-full h-52 object-cover rounded-xl shadow-md group-hover:opacity-95 transition"
                                                loading="lazy"
                                            />
                                            <div className="bestseller-product-actions mt-3 flex justify-end">
                                                <button className="bestseller-icon-favorite text-gray-400 hover:text-red-500 
                                                    transition-colors duration-300 transform hover:scale-125">
                                                    <span role="img" aria-label="heart" className="anticon anticon-heart text-2xl absolute top-4 right-4">
                                                        <svg viewBox="64 64 896 896" focusable="false" data-icon="heart" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                                            <path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z"></path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="category-product-info mt-4 space-y-3">
                                            <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-500 bg-clip-text text-transparent">
                                                {item.khoahoc.giamgia === 0
                                                    ? 'Miễn phí'
                                                    : `${item.khoahoc.giamgia.toLocaleString()} ₫`}
                                            </div>
                                            <div className="relative min-h-[4rem] flex flex-col">
    <div 
        className={`text-xl text-gray-600 font-medium overflow-hidden transition-all duration-300
            ${showFullText ? 'max-h-[500px]' : 'max-h-[4rem]'} flex-grow`}
        onMouseEnter={() => setShowFullText(true)}
        onMouseLeave={() => setShowFullText(false)}
    >
        {item.khoahoc.ten}
    </div>
    {!showFullText && item.khoahoc.ten.length > 50 && (
        <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-white to-transparent" />
    )}
</div>
                                            {item.magiamgia && item.magiamgia.giamgia > 0 && (
                                                <div className="mt-3 p-3 bg-orange-50 rounded-lg">
                                                    <p className="text-xl text-gray-700">Mã giảm giá: <strong className="text-orange-600">{item.magiamgia.maso}</strong></p>
                                                    <p className="text-base text-gray-500 mt-1">
                                                        Thời gian: {new Date(item.magiamgia.ngaybatdau).toLocaleDateString()} - {new Date(item.magiamgia.ngayketthuc).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
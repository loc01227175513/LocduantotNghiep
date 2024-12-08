"use client";
import React, { useState, useEffect } from 'react';
import Img from 'next/image';
import { TatCaKhuyenMaiKhoaHoc } from '../../../service/khuyenmai/khuyenmai';
import { toast } from 'react-toastify';
import { KhoaHocYeuThich } from "../../../service/YeuThich/YeuThich";
import Link from 'next/link';
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
                        className={`time-slot rounded-lg p-4 border cursor-pointer transition-all duration-300 ease-in-out max-w-full
                            ${isActive
                                ? 'bg-pink-50 border-pink-500 shadow-md'
                                : 'bg-gray-50 border-gray-200 hover:border-pink-500 hover:bg-pink-50/50'}`}
                        onClick={() => {
                            setActiveDate(date);
                            setSelectedSlot(items[0]);
                        }}>
                        <p className="slot-time flex items-center gap-2 text-gray-700 overflow-hidden text-ellipsis whitespace-nowrap">
                            <i className="fas fa-calendar"></i>
                            <span className="overflow-hidden text-ellipsis">{date}</span>
                        </p>
                        <p className="text-lg text-gray-600 mt-1 overflow-hidden text-ellipsis whitespace-nowrap">
                            {items.length} khuyến mãi
                        </p>
                        <p className={`slot-status mt-1 overflow-hidden text-ellipsis whitespace-nowrap 
                            ${status === 'Chưa tới' ? 'text-green-500' : 'text-pink-700'}`}>
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
    const handleYeuThich = async (id) => {
        try {
            const response = await KhoaHocYeuThich(id);
            console.log(response);
            toast.success("Added to favorites!");
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error adding to favorites!");
        }
    };



    return (
        <div className="container mx-auto px-4 py-8">
            <section className="flash-sale-section relative">
                <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 h-full">
                    <div className="flash-sale-banner flex flex-col md:flex-row justify-between items-start md:items-center gap-6  bg-gradient-to-r from-blue-900 via-pink-700 to-pink-700 p-6 rounded-xl shadow-lg">
                        <h2 className="text-3xl font-extrabold flex items-center gap-6">
                            <span className="text-white bg-clip-text bg-gradient-to-r from-pink-600 to-pink-600 drop-shadow-sm text-4xl">
                                FLASH SALE
                            </span>
                            <span className=" text-white text-2xl font-semibold">Kết thúc sau</span>
                            <div className="flash-sale-countdown flex items-center space-x-3">
                                <span className="countdown-box border-2 border-white text-white  px-4 py-3 rounded-lg font-mono text-2xl shadow-md">{countdown.hours}</span>
                                <span className="countdown-separator font-bold text-white  text-2xl">:</span>
                                <span className="countdown-box border-2 border-white text-white  px-4 py-3 rounded-lg font-mono text-2xl shadow-md">{countdown.minutes}</span>
                                <span className="countdown-separator font-bold text-white  text-2xl">:</span>
                                <span className="countdown-box border-2 border-white text-white px-4 py-3 rounded-lg font-mono text-2xl shadow-md">{countdown.seconds}</span>
                            </div>
                        </h2>
                        <button
                            onClick={handleToggleSlots}
                            className="relative right-0 toggle-slots-btn px-6 py-3 rounded-xl transition-all duration-300  justify-center
          flex items-center gap-2 border border-gray-200
          bg-gradient-to-r from-blue-900 via-pink-700  to-pink-700 text-white border-transparent shadow-xl shadow-white-200 hover:from-pink-700 hover:to-pink-700  w-[124px] "
                        >
                            <span className=' text-xl  ' style={{fontWeight:"400"}}>Xem tất cả</span>
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

                    <div className="mt-12 px-1 mx-auto overflow-x-auto">
                        <div className="flex flex-nowrap gap-4 min-w-full pb-2">
                            {getFilteredCourses().map((item) => (
                                <div key={item.id} className="flash-sale-col relative group flex-none w-[280px]">

                                    <div className="flash-sale-card  bg-white rounded-2xl shadow-[5px_0_15px_-3px_rgba(0,0,0,0.1),-5px_0_15px_-3px_rgba(0,0,0,0.1)] p-2 hover:shadow-lg transform transition-all duration-300 ease-in-out">

                                        <div>
                                            {item.magiamgia && item.magiamgia.giamgia > 0 && (
                                                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-lg shadow-lg transform -rotate-12 z-10">
                                                    -{item.magiamgia.giamgia}% OFF
                                                </div>
                                            )}
                                            <Link href={`/page/course-detail?id=${item.khoahoc.id}`}>
                                                <Img
                                                    width={150}
                                                    height={150}
                                                    alt={item.khoahoc.ten}
                                                    src={item.khoahoc.hinh}
                                                    className="w-100 h-44 object-cover rounded-xl shadow-md group-hover:opacity-95 transition"
                                                    loading="lazy"
                                                />
                                            </Link>
                                            <div className="bestseller-product-actions mt-2 flex justify-end absolute top-28 right-4">
                                                <button className="bestseller-icon-favorite text-white hover:text-pink-700 hover:bg-pink-700  hover:rounded-full " onClick={() => handleYeuThich(item.khoahoc.id)}>
                                                    <span role="img" aria-label="bookmark" className="flex items-center justify-center w-14 h-14 rounded-full  bg-white/15">
                                                        <i className="fa-sharp fa-light fa-bookmark text-lg"></i>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="category-product-info mt-2 space-y-2 p-3">
                                            <div className="text-2xl font-bold text-gray-800  ">
                                                {item.khoahoc.giamgia === 0 ? 'Miễn phí' : `${item.khoahoc.giamgia.toLocaleString()} VNĐ`}
                                            </div>
                                            <div className="relative min-h-[4rem] flex flex-col">
                                                <div
                                                    className={`text-2xl text-gray-600 font-medium overflow-hidden transition-all duration-300 ${showFullText ? 'max-h-[500px]' : 'max-h-[4rem]'} flex-grow`}
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
                                                <div className="mt-2 p-2 bg-pink-200 rounded-lg pt-2 pb-2">
                                                    <p className="text-2xl text-gray-700">Mã giảm giá: <strong className="text-pink-700">{item.magiamgia.maso}</strong></p>
                                                    <p className="text-xl text-gray-500 mt-1">
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
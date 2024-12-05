"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Category } from "../category/category.component";
import { KhoaHocYeuThich } from "../../../service/YeuThich/YeuThich";
import { Dashboard } from "@/service/dashbordStuden/Dashboard-service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { FaStar, FaRegStar } from "react-icons/fa";
import CardProduct from "../CardProductHome/CardProduct";

const CourseDeXuat = () => {
    const [khoaHoc, setKhoaHoc] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; 
    const [khoaHocDaThanhToan, setKhoaHocDaThanhToan] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        Dashboard()
            .then((res) => {
                setKhoaHocDaThanhToan(res.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching dashboard data:", error);
                toast.error("Failed to load dashboard data.");
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        fetch("https://huuphuoc.id.vn/api/allkhoahoc")
            .then((response) => response.json())
            .then((data) => {
                if (
                    Array.isArray(khoaHocDaThanhToan) &&
                    khoaHocDaThanhToan.length > 0 &&
                    Array.isArray(khoaHocDaThanhToan[0].khoahocs)
                ) {
                    const filteredCourses = data.data.filter((course) =>
                        khoaHocDaThanhToan[0].khoahocs.some(
                            (item) => item.id_chude === course.id_chude
                        )
                    );
                    setKhoaHoc(filteredCourses);
                } else {
                    setKhoaHoc([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching courses:", error);
                toast.error("Failed to load courses.");
            });
    }, [khoaHocDaThanhToan]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const filteredCourses = selectedCategory
        ? khoaHoc.filter(
            (item) => item.theloai === selectedCategory && item.gia === 0
        )
        : khoaHoc.filter((item) => item.gia === 0);

    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
    const displayedCourses = filteredCourses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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

    const renderStars = (rating) => {
        const filledStars = Math.floor(rating);
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            stars.push(
                i <= filledStars ? (
                    <FaStar
                        key={i}
                        className="text-yellow-400 w-5 h-5"
                        aria-label="Filled Star"
                    />
                ) : (
                    <FaRegStar
                        key={i}
                        className="text-gray-300 w-5 h-5"
                        aria-label="Empty Star"
                    />
                )
            );
        }
        return stars;
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <ToastContainer />
            <div className="course-area-start rts-section-gap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="title-between-area bg-gradient-to-r from-gray-900 via-pink-700 to-gray-600 p-8 rounded-xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                                <div className="title-area-left-style">
                                    <div className="pre-title flex items-center mb-4 space-x-2 animate-fade-in">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-300">
                                            <i className="bi bi-lightbulb text-white-500 text-xl animate-pulse"></i>
                                        </div>
                                        <span className="text-white-500 uppercase text-lg">
                                            Khóa học
                                        </span>
                                    </div>
                                    <h2 className="title text-4xl font-medium mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                        <strong> Khám phá các khóa học đề xuất</strong>
                                        <p className="post-title text-white-500 text-xl max-w-2xl leading-relaxed mt-2">
                                            Bạn sẽ tìm thấy thứ gì đó khơi dậy sự tò mò của bạn và
                                            nâng cao
                                        </p>
                                    </h2>
                                </div>
                                <div>
                                    <Category onCategoryChange={handleCategoryChange} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-orange-100 ms-portfolio-filter-area main-isotop">
                        <div className="portfolio_wrap">
                            <div className="filter mt--30 portfolio-feed grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                                {displayedCourses.map((item) => {
                                    // Calculate averageRating per course
                                    const averageRating =
                                        item.danhgia && item.danhgia.length > 0
                                            ? item.danhgia.reduce(
                                                (acc, rating) => acc + parseInt(rating.danhgia, 10),
                                                0
                                            ) / item.danhgia.length
                                            : 0;

                                    return (
                                        <CardProduct
                                            key={item.id}
                                            id={item.id}
                                            hinh={item.hinh}
                                            ten={item.ten}
                                            chude={item.chude}
                                            giangvien={item.giangvien}
                                            baihocs={item.baihocs}
                                            dangky={item.dangky}
                                            gia={item.gia}
                                            giamgia={item.giamgia}
                                            averageRating={averageRating}
                                            handleYeuThich={handleYeuThich}
                                            renderStars={renderStars}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Pagination Buttons */}
                    <Box display="flex" justifyContent="center">
                        <ButtonGroup spacing="2">
                            {[...Array(totalPages).keys()].map((page) => (
                                <Button
                                    key={page}
                                    className={`btn ${page + 1 === currentPage ? "btn-primary" : "btn-secondary"
                                        }`}
                                    style={{
                                        outline: "none",
                                        border: "none",
                                        backgroundColor:
                                            page + 1 === currentPage ? "#C71585" : "", // Màu hồng-700
                                        color: page + 1 === currentPage ? "#FFFFFF" : "", // Màu trắng
                                        borderColor:
                                            page + 1 === currentPage ? "teal.500" : "gray.500",
                                        borderWidth: "1px",
                                    }}
                                    onClick={() => handlePageChange(page + 1)}
                                >
                                    {page + 1}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </Box>
                </div>
            </div>
        </div>
    );
};

export default CourseDeXuat;
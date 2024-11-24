"use client";

import React, { useState, useEffect } from "react";
import { Category } from "../category/category.component";
import { KhoaHocYeuThich } from "../../../service/YeuThich/YeuThich";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { FaStar, FaRegStar } from 'react-icons/fa';
import Image from 'next/image';


const OutstandingCourse = () => {
  const [KhoaHoc, setKhoaHoc] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetch("https://huuphuoc.id.vn/api/allkhoahoc", {
      referrerPolicy: 'unsafe-url',
    })
      .then((response) => response.json())
      .then((data) => {
        setKhoaHoc(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data!");
      });
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const trungbinhDangKy = KhoaHoc.length > 0
    ? KhoaHoc.map((item) => item.dangky).reduce((a, b) => a + b, 0) / KhoaHoc.length
    : 0;

  const filteredCourses = selectedCategory
    ? KhoaHoc.filter((item) => item.theloai === selectedCategory && item.dangky > trungbinhDangKy)
    : KhoaHoc.filter((item) => item.dangky > trungbinhDangKy);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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


  // Function to render stars based on averageRating
  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= filledStars ? (
          <FaStar key={i} className="text-yellow-400 w-5 h-5" aria-label="Filled Star" />
        ) : (
          <FaRegStar key={i} className="text-gray-300 w-5 h-5" aria-label="Empty Star" />
        )
      );
    }
    return stars;
  };


  return (
    <div>
      <ToastContainer />
      <div className="course-area-start rts-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-between-area bg-gradient-to-br from-gray-900 to-black text-white p-8 rounded-xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                <div className="title-area-left-style">
                  <div className="pre-title flex items-center mb-4 space-x-2 animate-fade-in">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10">
                      <i className="bi bi-lightbulb text-blue-400 text-xl animate-pulse"></i>
                    </div>
                    <span className="font-bold text-blue-400 tracking-wide uppercase">Courses</span>
                  </div>
                  <h2 className="title text-4xl font-medium mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    <strong> Khám phá các khóa học nổi bật</strong>
                  </h2>
                  <p className="post-title text-gray-400 text-xl max-w-2xl leading-relaxed">
                    Bạn sẽ tìm thấy thứ gì đó khơi dậy sự tò mò của bạn và nâng cao
                  </p>
                </div>
                <div className="mt-6">
                  <Category onCategoryChange={handleCategoryChange} />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-orange-100 ms-portfolio-filter-area main-isotop">
            <div className="portfolio_wrap">
              <div className="filter row g-5 mt--20 portfolio-feed personal">
                {paginatedCourses.map((item) => {
                  // Calculate averageRating per course
                  const averageRating = item.danhgia && item.danhgia.length > 0
                    ? item.danhgia.reduce((acc, rating) => acc + parseInt(rating.danhgia, 10), 0) / item.danhgia.length
                    : 0;

                  return (
                    <div
                      className="transition flash grid-item-p element-item creative col-xl-3 col-lg-4 col-md-6 col-sm-6"
                      data-category="transition"
                      key={item.id} // Use a unique key, preferably item.id
                    >
                      <div className="rts-single-course">
                        <a href={`/page/course-detail?id=${item.id}`} className="thumbnail relative">
                          <Image width={500} height={300} src={item.hinh} alt="course" style={{height:"150px"}} />
                          {/* Free course badge */}
                          {(item.gia === 0 || item.giamgia === 0) && (
                            <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg transform -rotate-12 z-10">
                              Miễn Phí
                            </div>
                          )}
                          {/* Discount badge - only show if course has discount but isn't free */}
                          {(item.giamgia < item.gia && item.giamgia !== 0) && (
                            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg transform -rotate-12 z-10">
                              -{Math.round((1 - item.giamgia / item.gia) * 100)}% OFF
                            </div>
                          )}
                        </a>
                        <div
                          className="save-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal-login"
                          onClick={() => handleYeuThich(item.id)}
                        >
                          <i className="fa-sharp fa-light fa-bookmark" />
                        </div>
                        <div className="tags-area-wrapper">
                          <div className="single-tag">
                            <span>{item.chude}</span>
                          </div>
                        </div>
                        <div className="flex space-x-4 p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                          <div className="flex items-center space-x-2 bg-blue-50 p-2 rounded-full">
                            <i className="fa-light fa-calendar-lines-pen text-blue-500 text-lg" />
                            <div className="flex flex-col">
                              <span className="text-2xl font-bold text-blue-600">{item.baihocs}</span>
                              <span className="text-xs text-gray-600 uppercase tracking-wider">Lessons</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 bg-green-50 p-2 rounded-full">
                            <i className="fa-light fa-user-group text-green-500 text-lg" />
                            <div className="flex flex-col">
                              <span className="text-2xl font-bold text-green-600">{item.dangky}</span>
                              <span className="text-xs text-gray-600 uppercase tracking-wider">Students</span>
                            </div>
                          </div>
                        </div>
                        <div className="course-card">
                          <a href={`/page/course-detail?id=${item.id}`} className="title-link">
                            <h5 className="title ">{item.ten}</h5>
                          </a>
                          <p className="teacher">
                            <i className="fas fa-user-tie mr-2 text-blue-500"></i>
                            {item.giangvien}
                          </p>
                          <div className="rating-and-price">
                            <div className="rating-area">
                              <span className="rating-number">{averageRating.toFixed(1)}</span>
                              <div className="stars">{renderStars(averageRating)}</div>
                            </div>
                            <div className="price-area">
                              {item.gia === 0 || item.giamgia === 0 ? (
                                <div className="free-badge">Miễn Phí</div>
                              ) : (
                                <div className="price-wrapper">
                                  <div className="original-price">${item.gia}</div>
                                  <div className="sale-price">${item.giamgia}</div>
                                </div>
                              )}
                            </div>
                          </div>

                          <style jsx>{`
    .course-card {
      padding: 1.5rem;
      transition: all 0.3s ease;
      border-radius: 12px;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .course-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 20px rgba(0,0,0,0.1);
    }

    .title-link {
      display: block;
      margin-bottom: 0.75rem;
    }

    .title {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2d3748;
      line-height: 1.4;
      transition: color 0.2s ease;
    }

    .title:hover {
      color: #4299e1;
    }

    .teacher {
      font-size: 0.9rem;
      color: #718096;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
    }

    .rating-area {
      display: flex;
      align-items: center;
      background: #f7fafc;
      padding: 0.5rem;
      border-radius: 8px;
    }

    .rating-number {
      font-weight: 600;
      color: #2d3748;
      margin-right: 0.5rem;
    }

    .stars {
      display: flex;
      color: #ecc94b;
    }

    .free-badge {
      background: linear-gradient(135deg, #0bc5ea 0%, #0086f5 100%);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-weight: 500;
      animation: pulse 2s infinite;
    }

    .price-wrapper {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .original-price {
      color: #a0aec0;
      text-decoration: line-through;
      font-size: 0.9rem;
    }

    .sale-price {
      color: #e53e3e;
      font-weight: 600;
      font-size: 1.1rem;
    }

    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(11, 197, 234, 0.4); }
      70% { box-shadow: 0 0 0 10px rgba(11, 197, 234, 0); }
      100% { box-shadow: 0 0 0 0 rgba(11, 197, 234, 0); }
    }
  `}</style>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Box display="flex" justifyContent="center" mt="4">
              <ButtonGroup spacing="2">
                {[...Array(totalPages).keys()].map((page) => (
                  <Button
                    key={page}
                    className={`btn ${page + 1 === currentPage ? "btn-primary" : "btn-secondary"} mt-5 m-1`}
                    borderColor={page + 1 === currentPage ? "teal.500" : "gray.500"}
                    borderWidth="1px"
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
    </div>
  );
};





const CourseNew = () => {
  const [KhoaHoc, setKhoaHoc] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetch("https://huuphuoc.id.vn/api/allkhoahoc", {
      referrerPolicy: 'unsafe-url',
    })
      .then((response) => response.json())
      .then((data) => {
        setKhoaHoc(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data!");
      });
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

  const filteredCourses = selectedCategory
    ? KhoaHoc.filter((item) =>
      item.theloai === selectedCategory &&
      new Date(item.created_at) >= tenDaysAgo &&
      new Date(item.created_at) < new Date()
    )
    : KhoaHoc.filter((item) =>
      new Date(item.created_at) >= tenDaysAgo &&
      new Date(item.created_at) < new Date()
    );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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

  // Function to render stars based on averageRating
  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= filledStars ? (
          <FaStar key={i} className="text-yellow-400 w-5 h-5" aria-label="Filled Star" />
        ) : (
          <FaRegStar key={i} className="text-gray-300 w-5 h-5" aria-label="Empty Star" />
        )
      );
    }
    return stars;
  };

  return (
    <div>
      <ToastContainer />
      <div className="course-area-start rts-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-between-area bg-gradient-to-br from-gray-900 to-black text-white p-8 rounded-xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                <div className="title-area-left-style">
                  <div className="pre-title flex items-center mb-4 space-x-2 animate-fade-in">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10">
                      <i className="bi bi-lightbulb text-blue-400 text-xl animate-pulse"></i>
                    </div>
                    <span className="font-bold text-blue-400 tracking-wide uppercase">Courses</span>
                  </div>
                  <h2 className="title text-4xl font-medium mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    <strong> Khám phá các khóa học mới</strong>
                  </h2>
                  <p className="post-title text-gray-400 text-xl max-w-2xl leading-relaxed">
                    Bạn sẽ tìm thấy thứ gì đó khơi dậy sự tò mò của bạn và nâng cao
                  </p>
                </div>
                <div className="mt-6">
                  <Category onCategoryChange={handleCategoryChange} />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-orange-100 ms-portfolio-filter-area main-isotop">
            <div className="portfolio_wrap">
              <div className="filter row g-5 mt--20 portfolio-feed personal">
                {paginatedCourses.map((item) => {
                  // Calculate averageRating per course
                  const averageRating = item.danhgia && item.danhgia.length > 0
                    ? item.danhgia.reduce((acc, rating) => acc + parseInt(rating.danhgia, 10), 0) / item.danhgia.length
                    : 0;

                  return (
                    <div
                      className="transition flash grid-item-p element-item creative col-xl-3 col-lg-4 col-md-6 col-sm-6"
                      data-category="transition"
                      key={item.id} // Use a unique key
                    >
                      <div className="rts-single-course">
                        <a href={`/page/course-detail?id=${item.id}`} className="thumbnail relative">
                          <Image width={500} height={300} src={item.hinh} alt="course " style={{height:"150px"}} />
                          {/* Free course badge */}
                          {(item.gia === 0 || item.giamgia === 0) && (
                            <div className="absolute top-3 left-3 bg-red-500   text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg transform -rotate-12 z-10">
                              Miễn Phí
                            </div>
                          )}
                          {/* Discount badge - only show if course has discount but isn't free */}
                          {(item.giamgia < item.gia && item.giamgia !== 0) && (
                            <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg transform -rotate-12 z-10">
                              -{Math.round((1 - item.giamgia / item.gia) * 100)}% OFF
                            </div>
                          )}
                        </a>
                        <div
                          className="save-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal-login"
                          onClick={() => handleYeuThich(item.id)}
                        >
                          <i className="fa-sharp fa-light fa-bookmark" />
                        </div>
                        <div className="tags-area-wrapper">
                          <div className="single-tag">
                            <span>{item.chude}</span>
                          </div>
                        </div>
                        <div className="flex space-x-4 p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                          <div className="flex items-center space-x-2 bg-blue-50 p-2 rounded-full hover:bg-blue-100 transition-colors">
                            <i className="fa-light fa-calendar-lines-pen text-blue-500 text-lg" />
                            <div className="flex flex-col">
                              <span className="text-2xl font-bold text-blue-600">{item.baihocs}</span>
                              <span className="text-xs text-gray-600 uppercase tracking-wider">Lessons</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 bg-green-50 p-2 rounded-full hover:bg-green-100 transition-colors">
                            <i className="fa-light fa-user-group text-green-500 text-lg" />
                            <div className="flex flex-col">
                              <span className="text-2xl font-bold text-green-600">{item.dangky}</span>
                              <span className="text-xs text-gray-600 uppercase tracking-wider">Students</span>
                            </div>
                          </div>
                        </div>
                        <div className="course-item">
                          <a href={`/page/course-detail?id=${item.id}`} className="course-link">
                            <h5 className="text-xl"><strong>{item.ten}</strong></h5>
                          </a>
                                                   <p className="teacher-info flex items-center font-semibold  hover:text-blue-600 transition-all duration-300" >
                            <i className="fas fa-user-circle text-blue-500 mr-3 text-xl"></i>
                            {item.giangvien}
                          </p>
                          <div className="details-container">
                            <div className="rating-section">
                              <span className="rating-score">{averageRating.toFixed(1)}</span>
                              <div className="stars-container">
                                {renderStars(averageRating)}
                              </div>
                            </div>
                            <div className="price-section">
                              {!(item.gia === 0 || item.giamgia === 0) && (
                                <>
                                  <span className="original-price">${item.gia}</span>
                                  <span className="discount-price">${item.giamgia}</span>
                                </>
                              )}
                            </div>
                          </div>

                          <style jsx>{`
    .course-item {
      background: white;
      padding: 1.25rem;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      transition: all 0.3s ease;
    }

    .course-item:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0,0,0,0.12);
    }

    .course-link {
      display: block;
      text-decoration: none;
    }

    .course-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 0.75rem;
      line-height: 1.4;
      transition: color 0.2s ease;
    }

    .course-link:hover .course-title {
      color: #4299e1;
    }

    .teacher-info {
      display: flex;
      align-items: center;
      font-size: 0.9rem;
      color: #718096;
      margin-bottom: 1rem;
      padding: 0.5rem 0;
      border-bottom: 1px solid #e2e8f0;
    }

    .details-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.75rem;
    }

    .rating-section {
      display: flex;
      align-items: center;
      background: #f7fafc;
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
    }

    .rating-score {
      font-weight: 600;
      color: #2d3748;
      margin-right: 0.5rem;
    }

    .stars-container {
      display: flex;
      color: #ecc94b;
    }

    .original-price {
      text-decoration: line-through;
      color: #a0aec0;
      font-size: 0.9rem;
      margin-right: 0.75rem;
    }

    .discount-price {
      color: #e53e3e;
      font-weight: 600;
      font-size: 1.1rem;
      background: #fff5f5;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
    }
  `}</style>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Box display="flex" justifyContent="center" mt="4">
              <ButtonGroup spacing="2">
                {[...Array(totalPages).keys()].map((page) => (
                  <Button
                    key={page}
                    className={`btn ${page + 1 === currentPage ? "btn-primary" : "btn-secondary"} mt-5 m-1`}
                    borderColor={page + 1 === currentPage ? "teal.500" : "gray.500"}
                    borderWidth="1px"
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
    </div>
  );
};

const Courseseal = () => {
  const [KhoaHoc, setKhoaHoc] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    fetch("https://huuphuoc.id.vn/api/allkhoahoc", {
      referrerPolicy: 'unsafe-url',
    })
      .then((response) => response.json())
      .then((data) => {
        setKhoaHoc(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data!");
      });
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredCourses = selectedCategory
    ? KhoaHoc.filter((item) => item.theloai === selectedCategory && item.giamgia < item.gia)
    : KhoaHoc.filter((item) => item.giamgia < item.gia);

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const displayedCourses = filteredCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

  // Function to render stars based on averageRating
  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= filledStars ? (
          <FaStar key={i} className="text-yellow-400 w-5 h-5" aria-label="Filled Star" />
        ) : (
          <FaRegStar key={i} className="text-gray-300 w-5 h-5" aria-label="Empty Star" />
        )
      );
    }
    return stars;
  };

  return (
    <div>
      <ToastContainer />
      <div className="p-0 course-area-start rts-section-gap mt-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-between-area bg-gradient-to-br from-gray-900 to-black text-white p-8 rounded-xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                <div className="title-area-left-style">
                  <div className="pre-title flex items-center mb-4 space-x-2 animate-fade-in">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10">
                      <i className="bi bi-lightbulb text-blue-400 text-xl animate-pulse"></i>
                    </div>
                    <span className="font-bold text-blue-400 tracking-wide uppercase">Khóa học</span>
                  </div>
                  <h2 className="title text-4xl font-medium mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    <strong> Khám phá các khóa học giảm giá</strong>
                  </h2>
                  <p className="post-title text-gray-400 text-xl max-w-2xl leading-relaxed">
                    Bạn sẽ tìm thấy thứ gì đó khơi dậy sự tò mò của bạn và nâng cao
                  </p>
                </div>
                <div className="mt-6">
                  <Category onCategoryChange={handleCategoryChange} />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-orange-100 ms-portfolio-filter-area main-isotop">
            <div className="portfolio_wrap">
              <div className="filter row g-5 mt--20 portfolio-feed personal">
                {displayedCourses.map((item) => {
                  // Calculate averageRating per course
                  const averageRating = item.danhgia && item.danhgia.length > 0
                    ? item.danhgia.reduce((acc, rating) => acc + parseInt(rating.danhgia, 10), 0) / item.danhgia.length
                    : 0;

                  return (
                    <div
                      className="transition flash grid-item-p element-item creative col-xl-3 col-lg-4 col-md-6 col-sm-6"
                      data-category="transition"
                      key={item.id} // Use unique key
                    >
                      <div className="rts-single-course">
                        <a href={`/page/course-detail?id=${item.id}`} className="thumbnail relative">
                          <Image width={500} height={300} src={item.hinh} alt="course" style={{height:"150px"}}/>
                          {item.giamgia < item.gia && (
                            <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg transform -rotate-12 z-10">
                              -{Math.round((1 - item.giamgia / item.gia) * 100)}% OFF
                            </div>
                          )}
                        </a>
                        <div
                          className="save-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal-login"
                          onClick={() => handleYeuThich(item.id)}
                        >
                          <i className="fa-sharp fa-light fa-bookmark" />
                        </div>
                        <div className="tags-area-wrapper">
                          <div className="single-tag">
                            <span>{item.chude}</span>
                          </div>
                        </div>
                        <div className="flex space-x-4 p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                          <div className="flex items-center space-x-2 bg-blue-50 p-2 rounded-full hover:bg-blue-100 transition-colors">
                            <i className="fa-light fa-calendar-lines-pen text-blue-500 text-lg" />
                            <div className="flex flex-col">
                              <span className="text-2xl font-bold text-blue-600">{item.baihocs}</span>
                              <span className="text-xs text-gray-600 uppercase tracking-wider">Lessons</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 bg-green-50 p-2 rounded-full hover:bg-green-100 transition-colors">
                            <i className="fa-light fa-user-group text-green-500 text-lg" />
                            <div className="flex flex-col">
                              <span className="text-2xl font-bold text-green-600">{item.dangky}</span>
                              <span className="text-xs text-gray-600 uppercase tracking-wider">Students</span>
                            </div>
                          </div>
                        </div>
                        <div className="course-container">
                          <a href={`/page/course-detail?id=${item.id}`} className="course-link">
                            <h5 className=" text-xl"> <strong>{item.ten}</strong></h5>
                          </a>
                          <p className="teacher flex items-center font-semibold hover:text-blue-600 transition-all duration-300" style={{ fontSize: '13px',marginTop:"-5px" }}>
                            <i className="fas fa-user-circle text-blue-500 mr-4" style={{ fontSize: '15px' }}></i>
                            {item.giangvien}
                          </p>
                          <div className="rating-and-price flex items-center justify-between gap-4">
                            <div className="rating-area flex items-center gap-2">
                              <span className="rating-score text-sm font-medium" style={{ fontSize: '11px' }}>{averageRating.toFixed(1)}</span>
                              <div className="stars text-xs text-yellow-400">{renderStars(averageRating)}</div>
                            </div>
                            <div className="price-area">
                              {item.gia === 0 || item.giamgia === 0 ? (
                                <span className="free-tag font-medium text-green-600" style={{ fontSize: '13px' }}>Miễn Phí</span>
                              ) : (
                                <div className="price-wrapper flex items-center gap-1">
                                  <span className="original line-through text-gray-400" style={{ fontSize: '13px' }}>${item.gia}</span>
                                  <span className="discounted font-bold text-blue-600" style={{ fontSize: '13px' }}>${item.giamgia}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <style jsx>{`
    .course-container {
      background: white;
      padding: 1.25rem;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      transition: all 0.3s ease;
    }

    .course-container:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0,0,0,0.12);
    }

    .course-link {
      display: block;
      margin-bottom: 0.75rem;
    }

    .title {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2d3748;
      transition: color 0.2s ease;
    }

    .course-link:hover .title {
      color: #4299e1;
    }

    .teacher {
      display: flex;
      align-items: center;
      font-size: 0.9rem;
      color: #718096;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid #e2e8f0;
    }

    .rating-and-price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
    }

    .rating-area {
      display: flex;
      align-items: center;
      background: #f7fafc;
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
    }

    .rating-score {
      font-weight: 600;
      color: #2d3748;
      margin-right: 0.5rem;
    }

    .stars {
      display: flex;
      color: #ecc94b;
    }

    .free-tag {
      background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-weight: 500;
      animation: pulse 2s infinite;
    }

    .price-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .original {
      text-decoration: line-through;
      color: #a0aec0;
      font-size: 0.9rem;
    }

    .discounted {
      color: #e53e3e;
      font-weight: 600;
      font-size: 1.1rem;
      background: #fff5f5;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
    }

    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(72, 187, 120, 0.4); }
      70% { box-shadow: 0 0 0 10px rgba(72, 187, 120, 0); }
      100% { box-shadow: 0 0 0 0 rgba(72, 187, 120, 0); }
    }
  `}</style>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Pagination Buttons */}
          <Box display="flex" justifyContent="center" mt="4">
            <ButtonGroup spacing="2">
              {[...Array(totalPages).keys()].map((page) => (
                <Button
                  key={page}
                  className={`btn ${page + 1 === currentPage ? "btn-primary" : "btn-secondary"} mt-5 m-1`}
                  borderColor={page + 1 === currentPage ? "teal.500" : "gray.500"}
                  borderWidth="1px"
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


const Coursefree = () => {
  const [KhoaHoc, setKhoaHoc] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    fetch("https://huuphuoc.id.vn/api/allkhoahoc", {
      referrerPolicy: 'unsafe-url',
    })
      .then((response) => response.json())
      .then((data) => {
        setKhoaHoc(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data!");
      });
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredCourses = selectedCategory
    ? KhoaHoc.filter((item) => item.theloai === selectedCategory && item.gia === 0)
    : KhoaHoc.filter((item) => item.gia === 0);

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const displayedCourses = filteredCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

  // Function to render stars based on averageRating
  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= filledStars ? (
          <FaStar key={i} className="text-yellow-400 w-5 h-5" aria-label="Filled Star" />
        ) : (
          <FaRegStar key={i} className="text-gray-300 w-5 h-5" aria-label="Empty Star" />
        )
      );
    }
    return stars;
  };

  return (
    <div>
      <ToastContainer />
      <div className="p-0 course-area-start rts-section-gap mt-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-between-area bg-gradient-to-br from-gray-900 to-black text-white p-8 rounded-xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                <div className="title-area-left-style">
                  <div className="pre-title flex items-center mb-4 space-x-2 animate-fade-in">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10">
                      <i className="bi bi-lightbulb text-blue-400 text-xl animate-pulse"></i>
                    </div>
                    <span className="font-bold text-blue-400 tracking-wide uppercase">Khóa học</span>
                  </div>
                  <h2 className="title text-4xl font-medium mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    <strong> Khám phá các khóa học miến phí</strong>
                  </h2>
                  <p className="post-title text-gray-400 text-xl max-w-2xl leading-relaxed">
                    Bạn sẽ tìm thấy thứ gì đó khơi dậy sự tò mò của bạn và nâng cao
                  </p>
                </div>
                <div className="mt-6">
                  <Category onCategoryChange={handleCategoryChange} />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-orange-100 ms-portfolio-filter-area main-isotop">
            <div className="portfolio_wrap">
              <div className="filter row g-5 mt--20 portfolio-feed personal">
                {displayedCourses.map((item) => {
                  // Calculate averageRating per course
                  const averageRating = item.danhgia && item.danhgia.length > 0
                    ? item.danhgia.reduce((acc, rating) => acc + parseInt(rating.danhgia, 10), 0) / item.danhgia.length
                    : 0;

                  return (
                    <div
                      className="transition flash grid-item-p element-item creative col-xl-3 col-lg-4 col-md-6 col-sm-6"
                      data-category="transition"
                      key={item.id} // Use unique key
                    >
                      <div className="rts-single-course">
                        <a href={`/page/course-detail?id=${item.id}`} className="thumbnail relative">
                          <Image width={500} height={300} src={item.hinh} alt="course" style={{height:"150px"}} />
                          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg transform -rotate-12 z-10">
                            Miễn Phí
                          </div>
                        </a>
                        <div
                          className="save-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal-login"
                          onClick={() => handleYeuThich(item.id)}
                        >
                          <i className="fa-sharp fa-light fa-bookmark" />
                        </div>
                        <div className="tags-area-wrapper">
                          <div className="single-tag">
                            <span>{item.chude}</span>
                          </div>
                        </div>
                        <div className="flex space-x-4 p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                          <div className="flex items-center space-x-2 bg-blue-50 p-2 rounded-full hover:bg-blue-100 transition-colors">
                            <i className="fa-light fa-calendar-lines-pen text-blue-500 text-lg" />
                            <div className="flex flex-col">
                              <span className="text-2xl font-bold text-blue-600">{item.baihocs}</span>
                              <span className="text-xs text-gray-600 uppercase tracking-wider">Lessons</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 bg-green-50 p-2 rounded-full hover:bg-green-100 transition-colors">
                            <i className="fa-light fa-user-group text-green-500 text-lg" />
                            <div className="flex flex-col">
                              <span className="text-2xl font-bold text-green-600">{item.dangky}</span>
                              <span className="text-xs text-gray-600 uppercase tracking-wider">Students</span>
                            </div>
                          </div>
                        </div>
                        <div className="course-card">
                          <a href={`/page/course-detail?id=${item.id}`} className="course-link">
                            <h5 className="course-title">{item.ten}</h5>
                          </a>
                          <p className="teacher-info">
                            <i className="fas fa-user-circle text-blue-500 mr-2"></i>
                            {item.giangvien}
                          </p>
                          <div className="rating-price-container">
                            <div className="rating-area">
                              <span className="rating-number">{averageRating.toFixed(1)}</span>
                              <div className="stars-display">{renderStars(averageRating)}</div>
                            </div>
                            <div className="price-display">
                              {item.gia === 0 ? (
                                <span className="free-label">Miễn Phí</span>
                              ) : (
                                <div className="price-info">
                                  <span className="original-price">${item.gia}</span>
                                  <span className="sale-price">${item.giamgia}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <style jsx>{`
    .course-card {
      background: white;
      padding: 1.25rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      transition: all 0.3s ease;
    }

    .course-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 20px rgba(0,0,0,0.1);
    }

    .course-link {
      display: block;
      margin-bottom: 0.75rem;
    }

    .course-title {
      font-size: 1rem;
      font-weight: 600;
      color: #2d3748;
      transition: color 0.2s ease;
    }

    .course-link:hover .course-title {
      color: #4299e1;
    }

    .teacher-info {
      display: flex;
      align-items: center;
      font-size: 0.9rem;
      color: #718096;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid #edf2f7;
    }

    .rating-price-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.75rem;
    }

    .rating-area {
      display: flex;
      align-items: center;
      background: #f7fafc;
      padding: 0.4rem 0.75rem;
      border-radius: 6px;
    }

    .rating-number {
      font-weight: 600;
      color: #2d3748;
      margin-right: 0.5rem;
    }

    .stars-display {
      display: flex;
      color: #ecc94b;
    }

    .free-label {
      background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
      color: white;
      padding: 0.4rem 0.75rem;
      border-radius: 16px;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .price-info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .original-price {
      text-decoration: line-through;
      color: #a0aec0;
      font-size: 0.85rem;
    }

    .sale-price {
      color: #e53e3e;
      font-weight: 600;
      font-size: 1rem;
      background: #fff5f5;
      padding: 0.3rem 0.6rem;
      border-radius: 4px;
      margin-top: 0.2rem;
    }
  `}</style>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Pagination Buttons */}
          <Box display="flex" justifyContent="center" mt="4">
            <ButtonGroup spacing="2">
              {[...Array(totalPages).keys()].map((page) => (
                <Button
                  key={page}
                  className={`btn ${page + 1 === currentPage ? "btn-primary" : "btn-secondary"} m-1`}
                  borderColor={page + 1 === currentPage ? "teal.500" : "gray.500"}
                  borderWidth="1px"
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



export { OutstandingCourse, CourseNew, Courseseal, Coursefree };

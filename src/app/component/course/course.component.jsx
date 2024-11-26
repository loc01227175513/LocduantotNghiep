"use client";

import React, { useState, useEffect } from "react";
import { Category } from "../category/category.component";
import { KhoaHocYeuThich } from "../../../service/YeuThich/YeuThich";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { FaStar, FaRegStar } from "react-icons/fa";
import Image from "next/image";

const OutstandingCourse = () => {
  const [KhoaHoc, setKhoaHoc] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetch("https://huuphuoc.id.vn/api/allkhoahoc", {
      referrerPolicy: "unsafe-url",
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

  const trungbinhDangKy =
    KhoaHoc.length > 0
      ? KhoaHoc.map((item) => item.dangky).reduce((a, b) => a + b, 0) /
      KhoaHoc.length
      : 0;

  const filteredCourses = selectedCategory
    ? KhoaHoc.filter(
      (item) =>
        item.theloai === selectedCategory && item.dangky > trungbinhDangKy
    )
    : KhoaHoc.filter((item) => item.dangky > trungbinhDangKy);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = filteredCourses.slice(
    startIndex,
    startIndex + itemsPerPage
  );
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

  return (
    <div>
      <ToastContainer />
      <div className="course-area-start rts-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-between-area bg-gradient-to-r from-gray-900 via-pink-700 to-gray-600 text-white p-8 rounded-xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                <div className="title-area-left-style">
                  <div className="pre-title flex items-center mb-4 space-x-2 animate-fade-in">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500">
                      <i className="bi bi-lightbulb text-white-500 text-xl animate-pulse"></i>
                    </div>
                    <span className="font-bold text-white-500 tracking-wide uppercase text-lg">
                      Khóa học
                    </span>
                  </div>
                  <h2 className="title text-4xl font-medium mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    <strong> Khám phá các khóa học nổi bật</strong>
                    <p className="post-title text-white-500 text-xl max-w-2xl leading-relaxed mt-2">
                      Bạn sẽ tìm thấy thứ gì đó khơi dậy sự tò mò của bạn và
                      nâng cao
                    </p>
                  </h2>
                </div>
                <div className="mt-6">
                  <Category onCategoryChange={handleCategoryChange} />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-orange-100 ms-portfolio-filter-area main-isotop">
            <div className="portfolio_wrap">
              <div className="filter mt--30 portfolio-feed personal chialaiflex">
                {paginatedCourses.map((item) => {
                  // Calculate averageRating per course
                  const averageRating =
                    item.danhgia && item.danhgia.length > 0
                      ? item.danhgia.reduce(
                        (acc, rating) => acc + parseInt(rating.danhgia, 10),
                        0
                      ) / item.danhgia.length
                      : 0;

                  return (
                    <div
                      className="transition flash element-item creative"
                      data-category="transition"
                      key={item.id} // Use a unique key, preferably item.id
                    >
                      <div className="rts-single-course">
                        <a
                          href={`/page/course-detail?id=${item.id}`}
                          className="thumbnail relative"
                        >
                          <Image
                            width={500}
                            height={300}
                            src={item.hinh}
                            alt="course"
                            style={{ height: "170px" }}
                          />
                          {/* Free course badge */}
                          {(item.gia === 0 || item.giamgia === 0) && (
                            <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-lg shadow-lg transform -rotate-12 z-10">
                              Miễn Phí
                            </div>
                          )}
                          {/* Discount badge - only show if course has discount but isn't free */}
                          {item.giamgia < item.gia && item.giamgia !== 0 && (
                            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-lg shadow-lg transform -rotate-12 z-10">
                              -{Math.round((1 - item.giamgia / item.gia) * 100)}
                              % OFF
                            </div>
                          )}
                        </a>
                        <div
                          className="save-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal-login"
                          onClick={() => handleYeuThich(item.id)}
                        >
                          <i className="fa-sharp fa-light fa-bookmark text-lg" />
                        </div>
                        <div className="course-card">
                          <a
                            href={`/page/course-detail?id=${item.id}`}
                            className="title-link"
                          >
                            <p className="title">
                              <span className="text-3xl font-bold">{item.ten}</span>
                            </p>
                          </a>
                          <div className="relative">
                            <div className="teacher">
                              <i class="bi bi-grid mr-2 text-gray-800 text-2xl"></i>
                              <span className="text-xl text-gray-800">
                                {item.chude}
                              </span>
                            </div>

                            <p className="teacher  absolute right-0 top-0">
                              <i className="fas fa-user-tie mr-2 text-gray-800 text-2xl"></i>
                              <span className="text-xl text-gray-800">
                                {item.giangvien}
                              </span>
                            </p>
                          </div>
                          <div className="flex space-x-4 bg-gradient-to-r from-gray-50 to-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="flex items-center space-x-2 pr-2 pt-2 pb-2 rounded-full">
                              <i className="fa-light fa-calendar-lines-pen font-bold text-xl" />
                              <div className="flex flex-col ">
                                <span className="text-2xl font-bold">
                                  {item.baihocs}
                                  <span className="text-sm text-gray-600 font-bold uppercase tracking-wider pl-2">
                                    Bài học
                                  </span>
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2 p-2 rounded-full">
                              <i className="fa-light fa-user-group font-bold text-xl" />
                              <div className="flex flex-col">
                                <span className="text-2xl font-bold">
                                  {item.dangky}
                                  <span className="text-sm text-gray-600 uppercase tracking-wider pl-2">
                                    Sinh viên
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="rating-and-price relative">
                            <div className="price-area">
                              {item.gia === 0 || item.giamgia === 0 ? (
                                 <div className="free-badge flex flex-wrap ">
                                 <p className="text-xl px-2  font-bold  bg-gradient-to-r from-[#1e3c72] to-[#ff6b6b] text-white rounded-md">Miễn Phí</p>
                               </div>
                              ) : (
                                <div className="price-wrapper flex flex-wrap ">
                                  <div className="sale-price ">
                                    <p className="text-2xl text-red-600 font-bold ">
                                      {item.giamgia}
                                      <span className="text-2xl">VNĐ</span>
                                    </p>
                                  </div>
                                  <div className="original-price px-4">
                                    <p className=" text-2xl text-black line-through font-bold">
                                      {item.gia}
                                      <span className="text-2xl">VNĐ</span>
                                    </p>
                                  </div>

                                </div>
                              )}
                            </div>
                            <div className="rating-area text-yellow-600 text-2xl absolute right-0 ">
                              <span className="rating-number ml-2  text-2xl">
                                {averageRating.toFixed(1)}
                              </span>
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 576 512"
                                class="text-yellow-600 w-5 h-5 "
                                aria-label="Filled Star"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
                              </svg>

                            </div>
                          </div>
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
                    className={`btn ${page + 1 === currentPage ? "btn-primary" : "btn-secondary"
                      } mt-5 m-1`}
                    borderColor={
                      page + 1 === currentPage ? "teal.500" : "gray.500"
                    }
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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetch("https://huuphuoc.id.vn/api/allkhoahoc", {
      referrerPolicy: "unsafe-url",
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
    ? KhoaHoc.filter(
      (item) =>
        item.theloai === selectedCategory &&
        new Date(item.created_at) >= tenDaysAgo &&
        new Date(item.created_at) < new Date()
    )
    : KhoaHoc.filter(
      (item) =>
        new Date(item.created_at) >= tenDaysAgo &&
        new Date(item.created_at) < new Date()
    );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = filteredCourses.slice(
    startIndex,
    startIndex + itemsPerPage
  );
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

  return (
    <div>
      <ToastContainer />
      <div className="course-area-start rts-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-between-area bg-gradient-to-r from-gray-900 via-pink-700 to-gray-600 text-white p-8 rounded-xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                <div className="title-area-left-style">
                  <div className="pre-title flex items-center mb-4 space-x-2 animate-fade-in">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500">
                      <i className="bi bi-lightbulb text-white-500 text-xl animate-pulse"></i>
                    </div>
                    <span className="font-bold text-white-500 tracking-wide uppercase text-lg">
                      Khóa học
                    </span>
                  </div>
                  <h2 className="title text-4xl font-medium mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    <strong> Khám phá các khóa học mới</strong>
                  </h2>
                  <p className="post-title text-white-500 text-xl max-w-2xl leading-relaxed mt-2">
                    Bạn sẽ tìm thấy thứ gì đó khơi dậy sự tò mò của bạn và nâng
                    cao
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
              <div className="filter mt--30 portfolio-feed personal chialaiflex">
                {paginatedCourses.map((item) => {
                  // Calculate averageRating per course
                  const averageRating =
                    item.danhgia && item.danhgia.length > 0
                      ? item.danhgia.reduce(
                        (acc, rating) => acc + parseInt(rating.danhgia, 10),
                        0
                      ) / item.danhgia.length
                      : 0;

                  return (
                    <div
                      className="transition flash element-item creative"
                      data-category="transition"
                      key={item.id} // Use a unique key, preferably item.id
                    >
                      <div className="rts-single-course">
                        <a
                          href={`/page/course-detail?id=${item.id}`}
                          className="thumbnail relative"
                        >
                          <Image
                            width={500}
                            height={300}
                            src={item.hinh}
                            alt="course"
                            style={{ height: "170px" }}
                          />
                          {/* Free course badge */}
                          {(item.gia === 0 || item.giamgia === 0) && (
                            <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-lg shadow-lg transform -rotate-12 z-10">
                              Miễn Phí
                            </div>
                          )}
                          {/* Discount badge - only show if course has discount but isn't free */}
                          {item.giamgia < item.gia && item.giamgia !== 0 && (
                            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-lg shadow-lg transform -rotate-12 z-10">
                              -{Math.round((1 - item.giamgia / item.gia) * 100)}
                              % OFF
                            </div>
                          )}
                        </a>
                        <div
                          className="save-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal-login"
                          onClick={() => handleYeuThich(item.id)}
                        >
                          <i className="fa-sharp fa-light fa-bookmark text-lg" />
                        </div>
                        <div className="course-card">
                          <a
                            href={`/page/course-detail?id=${item.id}`}
                            className="title-link"
                          >
                            <p className="title">
                              <span className="text-3xl font-bold">{item.ten}</span>
                            </p>
                          </a>
                          <div className="relative">
                            <div className="teacher">
                              <i className="bi bi-grid mr-2 text-gray-800 text-2xl"></i>
                              <span className="text-xl text-gray-800">
                                {item.chude}
                              </span>
                            </div>

                            <p className="teacher absolute right-0 top-0">
                              <i className="fas fa-user-tie mr-2 text-gray-800 text-2xl"></i>
                              <span className="text-xl text-gray-800">
                                {item.giangvien}
                              </span>
                            </p>
                          </div>
                          <div className="flex space-x-4 bg-gradient-to-r from-gray-50 to-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="flex items-center space-x-2 pr-2 pt-2 pb-2 rounded-full">
                              <i className="fa-light fa-calendar-lines-pen font-bold text-xl" />
                              <div className="flex flex-col ">
                                <span className="text-2xl font-bold">
                                  {item.baihocs}
                                  <span className="text-sm text-gray-600 font-bold uppercase tracking-wider pl-2">
                                    Bài học
                                  </span>
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2 p-2 rounded-full">
                              <i className="fa-light fa-user-group font-bold text-xl" />
                              <div className="flex flex-col">
                                <span className="text-2xl font-bold">
                                  {item.dangky}
                                  <span className="text-sm text-gray-600 uppercase tracking-wider pl-2">
                                    Sinh viên
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="rating-and-price relative">
                            <div className="price-area ">
                              {item.gia === 0 || item.giamgia === 0 ? (
                                <div className="free-badge flex flex-wrap ">
                                  <p className="text-xl px-2  font-bold  bg-gradient-to-r from-[#1e3c72] to-[#ff6b6b] text-white rounded-md">Miễn Phí</p>
                                </div>
                              ) : (
                                <div className="price-wrapper flex flex-wrap ">
                                  <div className="sale-price ">
                                    <p className="text-2xl text-red-600 font-bold ">
                                      {item.giamgia}
                                      <span className="text-2xl">VNĐ</span>
                                    </p>
                                  </div>
                                  <div className="original-price px-4">
                                    <p className=" text-2xl text-black line-through font-bold">
                                      {item.gia}
                                      <span className="text-2xl">VNĐ</span>
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="rating-area text-yellow-600 text-2xl absolute right-0 ">
                              <span className="rating-number ml-2 text-2xl">
                                {averageRating.toFixed(1)}
                              </span>
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 576 512"
                                className="text-yellow-600 w-5 h-5"
                                aria-label="Filled Star"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
                              </svg>
                            </div>
                          </div>
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
                    className={`btn ${page + 1 === currentPage ? "btn-primary" : "btn-secondary"
                      } m-1`}
                    borderColor={
                      page + 1 === currentPage ? "teal.500" : "gray.500"
                    }
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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    fetch("https://huuphuoc.id.vn/api/allkhoahoc", {
      referrerPolicy: "unsafe-url",
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
    ? KhoaHoc.filter(
      (item) => item.theloai === selectedCategory && item.giamgia < item.gia
    )
    : KhoaHoc.filter((item) => item.giamgia < item.gia);

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

  // Function to render stars based on averageRating
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

  return (
    <div>
      <ToastContainer />
      <div className="p-0 course-area-start rts-section-gap mt-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-between-area bg-gradient-to-r from-gray-900 via-pink-700 to-gray-600 text-white p-8 rounded-xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                <div className="title-area-left-style">
                  <div className="pre-title flex items-center mb-4 space-x-2 animate-fade-in">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500">
                      <i className="bi bi-lightbulb text-white-500 text-xl animate-pulse"></i>
                    </div>
                    <span className="font-bold text-white-500 tracking-wide uppercase text-lg">
                      Khóa học
                    </span>
                  </div>
                  <h2 className="title text-4xl font-medium mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    <strong> Khám phá các khóa học giảm giá</strong>
                  </h2>
                  <p className="post-title text-white-500 text-xl max-w-2xl leading-relaxed mt-2">
                    Bạn sẽ tìm thấy thứ gì đó khơi dậy sự tò mò của bạn và nâng
                    cao
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
              <div className="filter mt--30 portfolio-feed personal chialaiflex">
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
                    <div
                      className="transition flash element-item creative"
                      data-category="transition"
                      key={item.id} // Use a unique key, preferably item.id
                    >
                      <div className="rts-single-course">
                        <a
                          href={`/page/course-detail?id=${item.id}`}
                          className="thumbnail relative"
                        >
                          <Image
                            width={500}
                            height={300}
                            src={item.hinh}
                            alt="course"
                            style={{ height: "170px" }}
                          />
                          {/* Free course badge */}
                          {(item.gia === 0 || item.giamgia === 0) && (
                            <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-lg shadow-lg transform -rotate-12 z-10">
                              Miễn Phí
                            </div>
                          )}
                          {/* Discount badge - only show if course has discount but isn't free */}
                          {item.giamgia < item.gia && item.giamgia !== 0 && (
                            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-lg shadow-lg transform -rotate-12 z-10">
                              -{Math.round((1 - item.giamgia / item.gia) * 100)}
                              % OFF
                            </div>
                          )}
                        </a>
                        <div
                          className="save-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal-login"
                          onClick={() => handleYeuThich(item.id)}
                        >
                          <i className="fa-sharp fa-light fa-bookmark text-lg" />
                        </div>
                        <div className="course-card">
                          <a
                            href={`/page/course-detail?id=${item.id}`}
                            className="title-link"
                          >
                            <p className="title">
                              <span className="text-3xl font-bold">{item.ten}</span>
                            </p>
                          </a>
                          <div className="relative">
                            <div className="teacher">
                              <i className="bi bi-grid mr-2 text-gray-800 text-2xl"></i>
                              <span className="text-xl text-gray-800">
                                {item.chude}
                              </span>
                            </div>

                            <p className="teacher absolute right-0 top-0">
                              <i className="fas fa-user-tie mr-2 text-gray-800 text-2xl"></i>
                              <span className="text-xl text-gray-800">
                                {item.giangvien}
                              </span>
                            </p>
                          </div>
                          <div className="flex space-x-4 bg-gradient-to-r from-gray-50 to-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="flex items-center space-x-2 pr-2 pt-2 pb-2 rounded-full">
                              <i className="fa-light fa-calendar-lines-pen font-bold text-xl" />
                              <div className="flex flex-col">
                                <span className="text-2xl font-bold">
                                  {item.baihocs}
                                  <span className="text-sm text-gray-600 font-bold uppercase tracking-wider pl-2">
                                    Bài học
                                  </span>
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2 p-2 rounded-full">
                              <i className="fa-light fa-user-group font-bold text-xl" />
                              <div className="flex flex-col">
                                <span className="text-2xl font-bold">
                                  {item.dangky}
                                  <span className="text-sm text-gray-600 uppercase tracking-wider pl-2">
                                    Sinh viên
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="rating-and-price relative">
                            <div className="price-area">
                              {item.gia === 0 || item.giamgia === 0 ? (
                                <div className="free-badge flex flex-wrap ">
                                <p className="text-xl px-2  font-bold  bg-gradient-to-r from-[#1e3c72] to-[#ff6b6b] text-white rounded-md">Miễn Phí</p>
                              </div>
                              ) : (
                                <div className="price-wrapper flex flex-wrap">
                                  <div className="sale-price">
                                    <p className="text-2xl text-red-600 font-bold">
                                      {item.giamgia}
                                      <span className="text-2xl">VNĐ</span>
                                    </p>
                                  </div>
                                  <div className="original-price px-4">
                                    <p className="text-2xl text-black line-through font-bold">
                                      {item.gia}
                                      <span className="text-2xl">VNĐ</span>
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="rating-area text-yellow-600 text-2xl absolute right-0">
                              <span className="rating-number ml-2 text-2xl">
                                {averageRating.toFixed(1)}
                              </span>
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 576 512"
                                className="text-yellow-600 w-5 h-5"
                                aria-label="Filled Star"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
                              </svg>
                            </div>
                          </div>
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
                  className={`btn ${page + 1 === currentPage ? "btn-primary" : "btn-secondary"
                    } mt-5 m-1`}
                  borderColor={
                    page + 1 === currentPage ? "teal.500" : "gray.500"
                  }
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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    fetch("https://huuphuoc.id.vn/api/allkhoahoc", {
      referrerPolicy: "unsafe-url",
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
    ? KhoaHoc.filter(
      (item) => item.theloai === selectedCategory && item.gia === 0
    )
    : KhoaHoc.filter((item) => item.gia === 0);

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

  // Function to render stars based on averageRating
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

  return (
    <div>
      <ToastContainer />
      <div className="p-0 course-area-start rts-section-gap mt-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-between-area bg-gradient-to-r from-gray-900 via-pink-700 to-gray-600 p-8 rounded-xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                <div className="title-area-left-style">
                  <div className="pre-title flex items-center mb-4 space-x-2 animate-fade-in">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500">
                      <i className="bi bi-lightbulb text-white-500 text-xl animate-pulse"></i>
                    </div>
                    <span className="font-bold text-white-500 tracking-wide uppercase text-lg">
                      Khóa học
                    </span>
                  </div>
                  <h2 className="title text-4xl font-medium mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    <strong> Khám phá các khóa học miễn phí</strong>
                    <p className="post-title text-white-500 text-xl max-w-2xl leading-relaxed mt-2">
                      Bạn sẽ tìm thấy thứ gì đó khơi dậy sự tò mò của bạn và nâng
                      cao
                    </p>
                  </h2>
                </div>
                <div className="mt-6">
                  <Category onCategoryChange={handleCategoryChange} />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-orange-100 ms-portfolio-filter-area main-isotop">

            <div className="portfolio_wrap">
              <div className="filter mt--30 portfolio-feed personal chialaiflex">
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
                    <div
                      className="transition flash element-item creative"
                      data-category="transition"
                      key={item.id}
                    >
                      <div className="rts-single-course">
                        <a
                          href={`/page/course-detail?id=${item.id}`}
                          className="thumbnail relative"
                        >
                          <Image
                            width={500}
                            height={300}
                            src={item.hinh}
                            alt="course"
                            style={{ height: "170px" }}
                          />
                          {/* Free course badge */}
                          {(item.gia === 0 || item.giamgia === 0) && (
                            <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-lg shadow-lg transform -rotate-12 z-10">
                              Miễn Phí
                            </div>
                          )}
                          {/* Discount badge - only show if course has discount but isn't free */}
                          {item.giamgia < item.gia && item.giamgia !== 0 && (
                            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-lg shadow-lg transform -rotate-12 z-10">
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
                          <i className="fa-sharp fa-light fa-bookmark text-lg" />
                        </div>
                        <div className="course-card">
                          <a
                            href={`/page/course-detail?id=${item.id}`}
                            className="title-link"
                          >
                            <p className="title">
                              <span className="text-3xl font-bold">{item.ten}</span>
                            </p>
                          </a>
                          <div className="relative">
                            <div className="teacher">
                              <i className="bi bi-grid mr-2 text-gray-800 text-2xl"></i>
                              <span className="text-xl text-gray-800">{item.chude}</span>
                            </div>

                            <p className="teacher absolute right-0 top-0">
                              <i className="fas fa-user-tie mr-2 text-gray-800 text-2xl"></i>
                              <span className="text-xl text-gray-800">
                                {item.giangvien}
                              </span>
                            </p>
                          </div>
                          <div className="flex space-x-4 bg-gradient-to-r from-gray-50 to-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="flex items-center space-x-2 pr-2 pt-2 pb-2 rounded-full">
                              <i className="fa-light fa-calendar-lines-pen font-bold text-xl" />
                              <div className="flex flex-col">
                                <span className="text-2xl font-bold">
                                  {item.baihocs}
                                  <span className="text-sm text-gray-600 font-bold uppercase tracking-wider pl-2">
                                    Bài học
                                  </span>
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2 p-2 rounded-full">
                              <i className="fa-light fa-user-group font-bold text-xl" />
                              <div className="flex flex-col">
                                <span className="text-2xl font-bold">
                                  {item.dangky}
                                  <span className="text-sm text-gray-600 uppercase tracking-wider pl-2">
                                    Sinh viên
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="rating-and-price relative">
                            <div className="price-area">
                              {item.gia === 0 || item.giamgia === 0 ? (
                                 <div className="free-badge flex flex-wrap ">
                                 <p className="text-xl px-2  font-bold  bg-gradient-to-r from-[#1e3c72] to-[#ff6b6b] text-white rounded-md">Miễn Phí</p>
                               </div>
                              ) : (
                                <div className="price-wrapper flex flex-wrap">
                                  <div className="sale-price">
                                    <p className="text-2xl text-red-600 font-bold">
                                      {item.giamgia}
                                      <span className="text-2xl">VNĐ</span>
                                    </p>
                                  </div>
                                  <div className="original-price px-4">
                                    <p className="text-2xl text-black line-through font-bold">
                                      {item.gia}
                                      <span className="text-2xl">VNĐ</span>
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="rating-area text-yellow-600 text-2xl absolute right-0">
                              <span className="rating-number ml-2 text-2xl">
                                {averageRating.toFixed(1)}
                              </span>
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 576 512"
                                className="text-yellow-600 w-5 h-5"
                                aria-label="Filled Star"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
                              </svg>
                            </div>
                          </div>
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
                  className={`btn ${page + 1 === currentPage ? "btn-primary" : "btn-secondary"
                    } m-1`}
                  borderColor={
                    page + 1 === currentPage ? "teal.500" : "gray.500"
                  }
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

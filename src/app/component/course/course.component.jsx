"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Category } from "../category/category.component";
import { KhoaHocYeuThich } from "../../../service/YeuThich/YeuThich";
import { KhoaHocDangHoc } from "../../../service/dashbordStuden/Dashboard-service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { FaStar, FaRegStar } from "react-icons/fa";
import Image from "next/image";
import CardProduct from "../CardProductHome/CardProduct";
import ProductStudent from "../Card/ProductStudent";

const OutstandingCourse = () => {
  const [KhoaHoc, setKhoaHoc] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
      ? KhoaHoc.reduce((acc, item) => acc + item.dangky, 0) / KhoaHoc.length
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
      // console.log(response); 
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
              <div className="title-between-area bg-gradient-to-r from-blue-900 via-pink-700 to-pink-700 text-white p-8 rounded-xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                <div className="title-area-left-style">
                  <div className="pre-title flex items-center mb-4 space-x-2 animate-fade-in">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-300">
                      <i className="bi bi-lightbulb text-white text-xl animate-pulse"></i>
                    </div>
                    <span className="text-white uppercase text-lg">
                      Khóa học
                    </span>
                  </div>
                  <h2 className="title text-4xl font-medium mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    <strong>Khám phá các khóa học nổi bật</strong>
                    <p className="post-title text-white text-xl max-w-2xl leading-relaxed mt-2">
                      Bạn sẽ tìm thấy thứ gì đó khơi dậy sự tò mò của bạn và nâng cao
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
              <div className="filter mt--30 portfolio-feed personal chialaiflex">
                {paginatedCourses.map((item) => {
                  // Calculate averageRating per course
                  const averageRating =
                    item.danhgia && item.danhgia.length > 0
                      ? item.danhgia.reduce((acc, rating) => acc + parseInt(rating.danhgia, 10), 0) /
                      item.danhgia.length
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
            <Box display="flex" justifyContent="center">
              <ButtonGroup spacing="2">
                {[...Array(totalPages).keys()].map((page) => (
                  <Button
                    key={page}
                    className={`btn ${page + 1 === currentPage ? "btn-primary" : "btn-secondary"}`}
                    style={{
                      outline: "none",
                      border: "none",
                      backgroundColor: page + 1 === currentPage ? "#C71585" : "",
                      color: page + 1 === currentPage ? "#FFFFFF" : "",
                      borderColor: page + 1 === currentPage ? "teal.500" : "gray.500",
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
    </div>
  );
};

export default OutstandingCourse;

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
      // console.log(response); 
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
              <div className="title-between-area bg-gradient-to-r from-blue-900 via-pink-700 to-pink-700 text-white p-8 rounded-xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                <div className="title-area-left-style">
                  <div className="pre-title flex items-center mb-4 space-x-2 animate-fade-in">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-300">
                      <i className="bi bi-lightbulb text-white text-xl animate-pulse"></i>
                    </div>
                    <span className="text-white uppercase text-lg">
                      Khóa học
                    </span>
                  </div>
                  <h2 className="title text-4xl font-medium mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    <strong> Khám phá các khóa học mới</strong>
                  </h2>
                  <p className="post-title text-white text-xl max-w-2xl leading-relaxed mt-2">
                    Bạn sẽ tìm thấy thứ gì đó khơi dậy sự tò mò của bạn và nâng
                    cao
                  </p>
                </div>
                <div>
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
    </div>
  );
};

const Courseseal = () => {
  const [KhoaHoc, setKhoaHoc] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Updated from 4 to 5

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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedCourses = filteredCourses.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleYeuThich = async (id) => {
    try {
      const response = await KhoaHocYeuThich(id);
      // console.log(response);
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
              <div className="title-between-area bg-gradient-to-r from-blue-900 via-pink-700 to-pink-700 text-white p-8 rounded-xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                <div className="title-area-left-style">
                  <div className="pre-title flex items-center mb-4 space-x-2 animate-fade-in">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-300">
                      <i className="bi bi-lightbulb text-white text-xl animate-pulse"></i>
                    </div>
                    <span className="text-white uppercase text-lg">
                      Khóa học
                    </span>
                  </div>
                  <h2 className="title text-4xl font-medium mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    <strong> Khám phá các khóa học giảm giá</strong>
                  </h2>
                  <p className="post-title text-white text-xl max-w-2xl leading-relaxed mt-2">
                    Bạn sẽ tìm thấy thứ gì đó khơi dậy sự tò mò của bạn và nâng
                    cao
                  </p>
                </div>
                <div>
                  <Category onCategoryChange={handleCategoryChange} />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-orange-100 ms-portfolio-filter-area main-isotop">
            <div className="portfolio_wrap">
              {/* Updated Grid Layout */}
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
          <Box display="flex" justifyContent="center" className="mt-8">
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
                    borderColor: page + 1 === currentPage ? "teal.500" : "gray.500",
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

const Coursefree = () => {
  const [KhoaHoc, setKhoaHoc] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Updated from 4 to 5

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
      // console.log(response);  
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
              <div className="title-between-area bg-gradient-to-r from-blue-900 via-pink-700 to-pink-700 p-8 rounded-xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                <div className="title-area-left-style">
                  <div className="pre-title flex items-center mb-4 space-x-2 animate-fade-in">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-300">
                      <i className="bi bi-lightbulb text-white text-xl animate-pulse"></i>
                    </div>
                    <span className="text-white uppercase text-lg">
                      Khóa học
                    </span>
                  </div>
                  <h2 className="title text-4xl font-medium mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    <strong> Khám phá các khóa học miễn phí</strong>
                    <p className="post-title text-white text-xl max-w-2xl leading-relaxed mt-2">
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

const KhoaHocDangHocDay = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [khoahocdanghoc1, setKhoahocdanghoc] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const itemsPerPage = 5;

  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);

    KhoaHocDangHoc()
      .then((res) => {
        setKhoahocdanghoc(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
        setIsLoading(false);
      });
  }, []);
  // console.log(khoahocdanghoc1); 

  const tieptuchoc = (id) => {
    router.push(`/page/Study?id=${id}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };



  const filteredCourses = selectedCategory
    ? khoahocdanghoc1.filter((item) => item.id_chude === selectedCategory)
    : khoahocdanghoc1;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  return (
    <div>
      <ToastContainer />
      <div className="course-area-start rts-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-between-area bg-gradient-to-r from-blue-900 via-pink-700 to-pink-700 text-white p-8 rounded-xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                <div className="title-area-left-style">
                  <div className="pre-title flex items-center mb-4 space-x-2 animate-fade-in">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-300">
                      <i className="bi bi-lightbulb text-white text-xl animate-pulse"></i>
                    </div>
                    <span className="text-white uppercase text-lg">
                      Khóa học
                    </span>
                  </div>
                  <h2 className="title text-4xl font-medium mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    <strong>Các khóa học bạn đang học</strong>
                    <p className="post-title text-white text-xl max-w-2xl leading-relaxed mt-2">
                      Đừng bỏ lỡ cơ hội học tập tốt nhất
                    </p>
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-orange-100 ms-portfolio-filter-area main-isotop">
            <div className="portfolio_wrap">
              <div className="filter mt--30 portfolio-feed personal chialaiflex grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"> {/* Updated to display 5 items per row */}
                {paginatedCourses.map((item) => {
                  const averageRating =
                    item.danhgia && item.danhgia.length > 0
                      ? item.danhgia.reduce((acc, rating) => acc + parseInt(rating.danhgia, 10), 0) /
                      item.danhgia.length
                      : 0;

                  return (
                    <ProductStudent
                      key={item.id} // Sử dụng item.id làm key duy nhất
                      id={item.id}
                      gia={item.gia}
                      giamgia={item.giamgia}
                      ten={item.ten}
                      hinh={item.hinh}
                      chude={item.chude}
                      giangvien={item.giangvien}
                      baihocs={item.baihoc1?.length}
                      PhanTram={item.TongTongHoanthanhphantram}
                      tieptuchoc={tieptuchoc} // Truyền props tieptuchoc nếu cần
                    />
                  );
                })}
              </div>
            </div>
            <Box display="flex" justifyContent="center">
              <ButtonGroup spacing="2">
                {[...Array(totalPages).keys()].map((page) => (
                  <Button
                    key={page}
                    className={`btn ${page + 1 === currentPage ? "btn-primary" : "btn-secondary"}`}
                    style={{
                      outline: "none",
                      border: "none",
                      backgroundColor: page + 1 === currentPage ? "#C71585" : "",
                      color: page + 1 === currentPage ? "#FFFFFF" : "",
                      borderColor: page + 1 === currentPage ? "teal.500" : "gray.500",
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
    </div>
  );
};

export { OutstandingCourse, CourseNew, Courseseal, Coursefree, KhoaHocDangHocDay };

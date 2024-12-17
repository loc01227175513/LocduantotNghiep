"use client";
import React, { useState, useEffect, useMemo } from "react";
import Header from "../../component/header/page";
import Footercomponent from "../../component/footer/page";
import { CourseDetails } from "../../../service/course/course.service";
import { useRouter } from "next/navigation";
import { Addcart } from "../../../service/cart/cart";
import { Showcart } from "../../../service/cart/cart";
import { KhoaHocDaDanKy } from "../../../service/cart/cart";
import { ThanhToanKhoaHocFree } from "../../../service/ThanhToan/ThanhToan";
//Linl nextjs
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Allcoursesss } from "../../../service/course/course.service";
import Nav from "./Nav/Nav";
import { FaStar, FaRegStar } from "react-icons/fa"; // Import star icons
import Image from "next/image";
import { TatCaKhuyenMaiKhoaHoc } from '../../../service/khuyenmai/khuyenmai';

const Khac = ({ course }) => {
  return (
    <>
      <div className="course-single-information">
        <h5 className="font-semibold mb-4 text-3xl">Lợi ích cung cấp</h5>
        <div className="body">
          <div className="single-check">
            <i className="fa-light fa-circle-check pulse" />
            Thời hạn linh hoạt
          </div>
          <div className="single-check">
            <i className="fa-light fa-circle-check pulse" />
            Giờ sống- Demo
          </div>
          <div className="single-check">
            <i className="fa-light fa-circle-check pulse" />
            Hơn 200 tài nguyên có thể tải xuống
          </div>
        </div>
      </div>

      <div className="course-single-information">
        <h5 className="font-semibold mb-4 text-3xl">Yêu cầu</h5>
        <div className="body">
          <div className="single-check">
            <i className="fa-light fa-circle-check" />
            Truy cập vào Adobe Premiere Pro
          </div>
          <div className="single-check">
            <i className="fa-light fa-circle-check" />
            Làm quen với máy tính và các thiết bị khác
          </div>
        </div>
      </div>

      <div className="course-single-information">
        <h5 className="font-semibold mb-4 text-3xl">Tags</h5>
        <div className="body">
          <div className="tags-wrapper">
            <span>{course.chude}</span>
          </div>
        </div>
      </div>

      <div className="course-single-information">
        <h5 className="font-semibold mb-4 text-3xl">Chia sẻ</h5>
        <div className="body">
          <div className="social-share-course-side-bar">
            <ul>
              <li>
                <Link href="#" data-tooltip="Share on Facebook">
                  <i className="fa-brands fa-facebook-f" />
                </Link>
              </li>
              <li>
                <Link href="#" data-tooltip="Share on Instagram">
                  <i className="fa-brands fa-instagram" />
                </Link>
              </li>
              <li>
                <Link href="#" data-tooltip="Share on LinkedIn">
                  <i className="fa-brands fa-linkedin" />
                </Link>
              </li>
              <li>
                <Link href="#" data-tooltip="Share on Pinterest">
                  <i className="fa-brands fa-pinterest" />
                </Link>
              </li>
              <li>
                <Link href="#" data-tooltip="Share on YouTube">
                  <i className="fa-brands fa-youtube" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="course-single-information last">
        <h5 className="font-semibold mb-4 text-3xl">Khán giả</h5>
        <div className="body">
          <div className="single-check">
            <i className="fa-light fa-circle-check" />
            Thích hợp cho người mới bắt đầu và trung gian
          </div>
        </div>
      </div>
    </>
  );
};

const NavPhai = ({
  course,
  formattedTotalTime,
  firstVideo,
  handleAddCart,
  handleBuyNow,
  NguoiDung,
  isCourseRegistered,
  isCourseInCart,
  buttonStates,
  setIsCourseRegistered,
  setButtonStates
}) => {

  const [khuyenMai, setKhuyenMai] = useState([]);
  const LoadingSpinner = () => (
    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );

  const handleThanhToanKhoaHocFree = async () => {
    setButtonStates(prev => ({
      ...prev,
      freeCourse: { loading: true, disabled: true }
    }));

    try {
      await ThanhToanKhoaHocFree(course.id);
      toast.success("Bạn đã nhận khóa học miễn phí!");
      setIsCourseRegistered(true);
      router.push(`/page/Study?id=${course.id}`);
    } catch (error) {
      console.error("Error registering free course:", error);
      toast.error("Có lỗi xảy ra khi đăng ký khóa học");
    } finally {
      setButtonStates(prev => ({
        ...prev,
        freeCourse: { loading: false, disabled: false }
      }));
    }
  };

  const GiangVienCheck2 = localStorage.getItem("lecturerId") || null;
  const GiangVienCheck22 = GiangVienCheck2 ? JSON.parse(GiangVienCheck2) : null;
  const courseCheck = GiangVienCheck22?.giangvien ? course.id_giangvien === GiangVienCheck22.giangvien : false;
  // console.log(courseCheck);

  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const data = await TatCaKhuyenMaiKhoaHoc();
      setKhuyenMai(data);
    };
    fetchData();
  }, []);
  // console.log(khuyenMai , "khuyenMai");
  const khuyenMai1 = khuyenMai.find(item => item.id_khoahoc === course.id && item.magiamgia.trangthai === "Đã Duyệt" && item.khoahoc.giamgia > 0);
  // console.log(khuyenMai1, "khuyenMai")
  return (
    <>
      <div className="rts-course-area rts-section-gap">
        <div className="container">
          <div className="row g-5">
            <div className="order-2 col-lg-8 order-cl-1 order-lg-1 order-md-2 order-sm-2">
              <Nav course={course} formattedTotalTime={formattedTotalTime} />
            </div>

            <div className="order-1 col-lg-4 order-cl-2 order-lg-2 order-md-1 order-sm-1 rts-sticky-column-item">
              <div className="theiaStickySidebar">
                <div className="right-course-details">
                  <div className="course-side-bar">
                    <div className="thumbnail">
                      <div className="vedio-icone">
                        {firstVideo && (
                          <div className="relative w-full">
                            <iframe
                              id="player"
                              height="250px"
                              src={`https://www.youtube.com/embed/${firstVideo.url_link}?enablejsapi=1&rel=0&modestbranding=1&controls=1&showinfo=0&fs=0&iv_load_policy=3&autohide=1`}
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                            />



                            <div className="video-title-overlay" />
                            <div className="video-title-overlay1" />
                            <div className="video-title-overlay-text">
                              <h1 className="text-white text-2xl font-bold">
                                {course.tenkhoahoc}
                              </h1>
                            </div>
                          </div>
                        )}
                        <div className="video-overlay">
                          <Link href="#" className="video-overlay-close">×</Link>
                        </div>
                      </div>
                    </div>


                    <div className="price-area">
                      {course.gia === 0 && course.giamgia === 0 ? (
                        <p className="p-4 text-white font-bold text-2xl text-center w-full">
                          Miễn phí
                        </p>
                      ) : (
                        <>
                          <h3 className="title price-current bg-white text-2xl">
                            {course.giamgia.toLocaleString('vi-VN')}
                            <span className="text-xl">VNĐ</span>
                          </h3>
                          <span className="price-discount text-2xl text-red-500" style={{ marginTop: "-10px" }}>
                            -{((course.gia - course.giamgia) / course.gia * 100).toFixed(2)}%
                          </span>
                        </>
                      )}
                    </div>
                    {khuyenMai1 && (
                      <div className="text-center text-white bg-green-700 text-[14px] py-2 px-4 rounded-lg flex items-center justify-center">

                        <span className="text-white text-[14px]">
                          -{khuyenMai1.magiamgia.giamgia}%  với voucher
                        </span>
                      </div>
                    )}



                    {!NguoiDung ? (
                      <Link href="/page/login">
                        <button className="rts-btn btn-border mt-10 flex justify-center text-[14px] text-pink-700 !border-pink-700 !border-1">
                          Đi Đến Đăng nhập
                        </button>
                      </Link>
                    ) : isCourseRegistered || courseCheck ? (

                      <button onClick={() => router.push(`/page/Study?id=${course.id}`)} className="rts-btn btn-border mt-10 flex justify-center text-[14px] text-pink-700 !border-pink-700 !border-1">
                        Đi đến khóa học
                      </button>

                    ) : course.trangthai === "Notyet" || course.trangthai === "Pending" ? (
                      <button className="rts-btn text-[14px]">Bản Demo</button>
                    ) :
                      course.gia === 0 || course.giamgia === 0 ? (
                        <button
                          onClick={handleThanhToanKhoaHocFree}
                          disabled={buttonStates.freeCourse.disabled}
                          className={`rts-btn btn-border mt-10 flex justify-center text-[14px] text-pink-700 !border-pink-700 !border-1 
                          ${buttonStates.freeCourse.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {buttonStates.freeCourse.loading ? (
                            <span className="flex items-center text-[14px]">
                              <LoadingSpinner />
                              Đang xử lý...
                            </span>
                          ) : "Nhận khóa học miễn phí"}
                        </button>
                      ) : isCourseInCart ? (
                        <Link href="/page/cart">
                          <button className="mt-10 flex justify-center text-[14px] text-pink-700 !border-pink-700 !border-1">
                            <span className="rts-btn btn-border  text-pink-700">Đi Đến Giỏ Hàng</span>
                          </button>
                        </Link>
                      ) : (
                        <>
                          <button
                            onClick={handleBuyNow}
                            disabled={buttonStates.buyNow.disabled}
                            className={`rts-btn btn-border text-xl bg-gradient-to-r from-pink-700 via-pink-700 to-pink-700 text-white !border-pink-700 !border-1
                            ${buttonStates.buyNow.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            {buttonStates.buyNow.loading ? (
                              <span className="flex items-center">
                                <LoadingSpinner />
                                Đang xử lý...
                              </span>
                            ) : "Mua ngay"}
                          </button>
                          <button
                            onClick={handleAddCart}
                            disabled={buttonStates.addCart.disabled}
                            className={`  flex justify-center text-xl !border-pink-700 !border-1
                            ${buttonStates.addCart.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                            style={{ marginTop: "-20px" }}
                          >
                            <span className="rts-btn btn-border text-pink-700">
                              {buttonStates.addCart.loading ? (
                                <span className="flex items-center">
                                  <LoadingSpinner />
                                  Đang thêm...
                                </span>
                              ) : "Thêm vào giỏ hàng"}
                            </span>
                          </button>
                        </>
                      )}
                    <div className="p-1 font-bold text-black what-includes text-left">
                      <span className="m text-left block text-xl text-gray-500">Đảm bảo hoàn lại tiền 30 ngày</span>
                      <h5 className="text-3xl text-left font-bold">Khóa học này bao gồm:</h5>
                      <div className="single-include flex justify-start">
                        <div className="left">
                          <i className="fa-light fa-chart-bar text-2xl mr-3" />
                          <span className="text-left text-2xl font-normal">Cấp độ</span>
                        </div>
                        <div className="right">
                          <span className="text-left text-2xl font-normal">{course.trinhdo}</span>
                        </div>
                      </div>
                      <div className="single-include flex">
                        <div className="left">
                          <i className="fa-light fa-timer text-2xl mr-3" />
                          <span className="text-left text-2xl font-normal">Khoảng thời gian</span>
                        </div>
                        <div className="right">
                          <span className="text-left text-2xl font-normal">{formattedTotalTime}</span>
                        </div>
                      </div>
                      <div className="single-include flex">
                        <div className="left">
                          <i className="fa-regular fa-floppy-disk text-2xl mr-3" />
                          <span className="text-left text-2xl font-normal">Chủ thể</span>
                        </div>
                        <div className="right">
                          <span className="text-left text-2xl font-normal">{course.chude}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="right-course-details mt--30">
                  <div className="course-side-bar">
                    <div className="course-single-information">
                      <h5 className="font-semibold mb-4 text-3xl">Giảng viên:</h5>
                      <div className="body">
                        <div className="single-check">
                          <i className="fa-light fa-circle-check pulse" />
                          {course.giangvien}
                        </div>
                      </div>
                    </div>
                    <Khac course={course} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function Coursedetailcomponent() {
  const [id, setId] = useState(null);
  const [course, setCourse] = useState(null);
  const [isCourseInCart, setIsCourseInCart] = useState(false);
  const [isCourseRegistered, setIsCourseRegistered] = useState(false);
  const [Allcourse, setAllcourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoadingStates, setImageLoadingStates] = useState({});
  const [NguoiDung, setNguoiDung] = useState(null);
  const router = useRouter();
  const [buttonStates, setButtonStates] = useState({
    addCart: {
      loading: false,
      disabled: false
    },
    buyNow: {
      loading: false,
      disabled: false
    },
    freeCourse: {
      loading: false,
      disabled: false
    }
  });

  const khoahoclienquan = useMemo(() => {
    return Allcourse?.filter((item) => item.id_chude === course?.chude_id) || [];
  }, [Allcourse, course?.chude_id]);

  const averageRating = useMemo(() => {
    if (!course?.danhgia?.length) return 0;
    return (
      course.danhgia
        .map(review => parseInt(review.rating, 10))
        .reduce((acc, rating) => acc + rating, 0) / course.danhgia.length
    );
  }, [course?.danhgia]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const courseId = queryParams.get("id");
    setId(courseId);
  }, []);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = localStorage.getItem("data");
        if (userData) {
          const parsedData = JSON.parse(userData);
          setNguoiDung(parsedData);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        setNguoiDung(null);
      }
    };
    loadUserData();
  }, []);

  useEffect(() => {
    const loadCourseDetails = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const res = await CourseDetails(id);
        setCourse(res.khoahoc || null);
      } catch (error) {
        console.error("Error loading course details:", error);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };
    loadCourseDetails();
  }, [id]);

  useEffect(() => {
    const checkCartStatus = async () => {
      try {
        const res = await Showcart();
        const urlParams = new URLSearchParams(window.location.search);
        const id_khoahoc = urlParams.get("id");

        if (res?.data && Array.isArray(res.data)) {
          const isInCart = res.data.some((item) =>
            item.khoahocs.some((khoahoc) => khoahoc.id.toString() === id_khoahoc)
          );
          setIsCourseInCart(isInCart);
        }
      } catch (error) {
        console.error("Error checking cart status:", error);
      }
    };
    checkCartStatus();
  }, []);

  useEffect(() => {
    const checkRegistrationStatus = async () => {
      try {
        const res = await KhoaHocDaDanKy();
        const urlParams = new URLSearchParams(window.location.search);
        const id_khoahoc = urlParams.get("id");

        if (res?.data && Array.isArray(res.data)) {
          const isRegistered = res.data.some((item) =>
            item.khoahocs.some((khoahoc) => khoahoc.id.toString() === id_khoahoc)
          );
          setIsCourseRegistered(isRegistered);
        }
      } catch (error) {
        console.error("Error checking registration status:", error);
      }
    };
    checkRegistrationStatus();
  }, []);

  useEffect(() => {
    const loadAllCourses = async () => {
      try {
        const res = await Allcoursesss();
        setAllcourse(res.data || []);
      } catch (error) {
        console.error("Error loading all courses:", error);
        setAllcourse([]);
      }
    };
    loadAllCourses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!course) {
    return <div>Course data not available.</div>;
  }

  const gia = course.gia || 0;
  const giamgia = course.giamgia || 0;
  const percentageDiscount = gia ? ((gia - giamgia) / gia) * 100 : 0;

  // Time conversion functions
  const timeToSeconds = (timeStr) => {
    if (!timeStr) return 0;
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const secondsToTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const timeArray = [];
  let totalTime = 0;

  if (Array.isArray(course.baihocs)) {
    course.baihocs.forEach((lesson) => {
      if (Array.isArray(lesson.video)) {
        lesson.video.forEach((videoItem) => {
          if (videoItem.thoiluong) {
            totalTime += timeToSeconds(videoItem.thoiluong);
            timeArray.push(videoItem.thoiluong);
          }
        });
      }
    });
  }

  const formattedTotalTime = secondsToTime(totalTime);

  const firstVideo = course.baihocs?.[0]?.video?.[0] || null;

  const handleAddCart = async () => {
    setButtonStates(prev => ({
      ...prev,
      addCart: { loading: true, disabled: true },
      buyNow: { ...prev.buyNow, disabled: true }
    }));

    try {
      await Addcart();
      toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
      setIsCourseInCart(true);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Không thể thêm vào giỏ hàng");
    } finally {
      setButtonStates(prev => ({
        ...prev,
        addCart: { loading: false, disabled: false },
        buyNow: { ...prev.buyNow, disabled: false }
      }));
    }
  };

  const handleBuyNow = async () => {
    setButtonStates(prev => ({
      ...prev,
      buyNow: { loading: true, disabled: true },
      addCart: { ...prev.addCart, disabled: true }
    }));

    try {
      await handleAddCart();
      router.push('/page/checkout');
    } catch (error) {
      console.error("Error processing buy now:", error);
      toast.error("Có lỗi xảy ra khi xử lý mua ngay");
    } finally {
      setButtonStates(prev => ({
        ...prev,
        buyNow: { loading: false, disabled: false },
        addCart: { ...prev.addCart, disabled: false }
      }));
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

  const getImageUrl = (imageUrl) => {
    try {
      if (!imageUrl || imageUrl === "0" || imageUrl === "") {
        return '/placeholder.jpg';
      }

      const trimmedUrl = imageUrl.trim();

      if (trimmedUrl.match(/^https?:\/\//)) {
        return trimmedUrl;
      }

      if (trimmedUrl.startsWith('/')) {
        return trimmedUrl;
      }

      return `/${trimmedUrl}`;
    } catch (error) {
      console.error('Error processing image URL:', error);
      return '/placeholder.jpg';
    }
  };

  const handleImageLoad = (courseId) => {
    setImageLoadingStates(prev => ({
      ...prev,
      [courseId]: false
    }));
  };

  return (
    <div className="mt-32">
      <Header />

      <>
        <div
          className="course-details-breadcrumb-1 bg_image rts-section-gap bg-gradient-to-r from-gray-900 via-pink-700 to-gray-600"
          style={{
            padding: "40px 0",
            color: "#fff",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div
                  className="single-course-left-align-wrapper"
                  style={{
                    padding: "30px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "15px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="meta-area mt--15">
                    <Link
                      href="index.html"
                      style={{
                        color: "#fff",
                        transition: "0.3s",
                        fontSize: "14px",
                      }}
                    >
                      Trang chủ
                    </Link>
                    <i
                      className="fa-solid fa-chevron-right"
                      style={{ margin: "0 10px" }}
                    />
                    <Link
                      className="active"
                      href="#"
                      style={{
                        color: "white",
                        transition: "0.3s",
                        fontSize: "14px",
                      }}
                    >
                      Chi tiết khóa học
                    </Link>
                  </div>
                  <h1
                    className="title"
                    style={{
                      fontSize: "2.5rem",
                      marginTop: "20px",
                      fontWeight: "700",
                      paddingLeft: "15px",
                      color: "white",
                      overflow: "visible",
                      whiteSpace: "nowrap",
                      position: "sticky",
                      top: "0",
                    }}
                  >
                    {course.ten}

                  </h1>
                  <div
                    className="rating-area"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                      margin: "20px 0",
                    }}
                  >
                    <div
                      className="stars-area"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.2)",
                        padding: "8px 15px",
                        borderRadius: "20px",
                      }}
                    >
                      <span
                        style={{
                          marginRight: "-5px",
                          color: "white",
                          fontSize: "14px",
                          fontWeight: "normal",
                        }}
                      >
                        {averageRating.toFixed(1)}
                      </span>
                      {renderStars(averageRating)}
                    </div>
                    <div
                      className="students"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.2)",
                        padding: "8px 15px",
                        borderRadius: "20px",
                      }}
                    >
                      <i
                        className="fa-solid fa-users"
                        style={{ marginRight: "-5px", fontSize: "14px" }}
                      />
                      <span style={{ fontSize: "14px" }}>
                        {course.thanhToan.length} Sinh viên
                      </span>
                    </div>
                    <div
                      className="calender-area-stars"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.2)",
                        padding: "8px 15px",
                        borderRadius: "20px",
                      }}
                    >
                      <i
                        className="fa-light fa-calendar-lines-pen"
                        style={{ marginRight: "-5px", fontSize: "14px" }}
                      />
                      <span style={{ fontSize: "14px" }}>
                        Cập nhật lần cuối:{" "}
                        {course?.created_at &&
                          `${new Date(course.created_at).getDate()}/${new Date(course.created_at).getMonth() + 1
                          }/${new Date(course.created_at).getFullYear()}`}
                      </span>
                    </div>
                  </div>
                  <div
                    className="author-area"
                    style={{
                      marginTop: "20px",
                      padding: "15px",
                      backgroundColor: "rgba(255,255,255,0.1)",
                      borderRadius: "10px",
                    }}
                  >
                    <div className="author">
                      <p
                        style={{
                          margin: "0",
                          fontWeight: "normal",
                        }}
                      >
                        <span
                          className="text-white text-xl"
                          style={{ fontWeight: "normal" }}
                        >
                          Giảng Viên:
                        </span>
                        <span
                          style={{
                            marginLeft: "5px",
                          }}
                        >
                          <strong
                            className="text-2xl text-white"
                            style={{ fontWeight: "normal" }}
                          >
                            {course.giangvien}
                          </strong>
                          .
                        </span>
                      </p>
                      <p
                        style={{
                          animation: "popIn 0.5s ease-out 0.2s backwards",
                        }}
                      >
                        <Link href={`/page/Cours-Filter?chude=${course.chude_id}`}>
                          <span
                            className="text-white text-xl"
                            style={{ fontWeight: "normal" }}
                          >
                            Chủ đề:{" "}
                          </span>
                          <span
                            className="text-2xl text-white hover:bg-pink-700"
                            style={{
                              backgroundColor: "rgba(255,255,255,0.2)",
                              padding: "5px 12px",
                              borderRadius: "18px",
                              transition: "all 0.3s ease",
                              cursor: "pointer",
                              fontWeight: "normal",
                            }}
                          >
                            {/* {console.log(course , "course")} */}

                            {course.chude}
                          </span>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* course details breadcrumb end */}
        {/* course details area start */}
        <NavPhai
          course={course}
          formattedTotalTime={formattedTotalTime}
          firstVideo={firstVideo}
          handleAddCart={handleAddCart}
          handleBuyNow={handleBuyNow}
          NguoiDung={NguoiDung}
          isCourseRegistered={isCourseRegistered}
          isCourseInCart={isCourseInCart}
          buttonStates={buttonStates}
          setIsCourseRegistered={setIsCourseRegistered}
          setButtonStates={setButtonStates}
        />
        {/* course details area end */}
        <div className="rts-section-gapBottom rts-feature-course-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="title-between-area">
                  <div className="title-area-left-style">
                    <div className="pre-title">
                      <i
                        className="mr-1 bi bi-lightbulb text-2xl"
                        style={{ color: "#32ADE6" }}
                      ></i>
                      <span className="text-2xl">
                        Các khóa hc tương tự hơn
                      </span>
                    </div>
                    <h2 className="title text-2xl">Các khóa học liên quan</h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt--50">
              <div className="col-lg-12">
                <div className="overflow-x-scroll swiper swiper-float-right-course swiper-data swiper-initialized swiper-horizontal swiper-pointer-events">
                  <div className="swiper-wrapper chialaiflex">
                    {loading ? (
                      <div className="loading-skeleton">Loading...</div>
                    ) : khoahoclienquan?.length > 0 ? (
                      khoahoclienquan.map((course, index) => {
                        if (!course) return null;

                        const averageRating = course.danhgia && course.danhgia.length > 0
                          ? course.danhgia.reduce((acc, rating) =>
                            acc + parseInt(rating.danhgia, 10), 0
                          ) / course.danhgia.length
                          : 0;

                        return (
                          <div key={index} className="transition flash element-item creative">
                            {/* Single course style */}
                            <div className="rts-single-course">
                              <Link
                                href={`/page/course-detail?id=${course.id}`}
                                className="thumbnail relative"
                              >
                                <div className="relative w-full h-[170px]">
                                  {imageLoadingStates[course.id] !== false && (
                                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                                  )}
                                  <Image
                                    src={getImageUrl(course?.hinh)}
                                    alt={course?.ten || 'Course thumbnail'}
                                    width={500}
                                    height={300}
                                    className={`object-cover w-full h-full ${imageLoadingStates[course.id] === false ? 'block' : 'hidden'
                                      }`}
                                    onLoad={() => handleImageLoad(course.id)}
                                    onError={() => handleImageLoad(course.id)}
                                    priority={false}
                                    quality={75}
                                    unoptimized={true}
                                  />
                                </div>
                                <div className="course-tags">
                                  {course.gia === 0 ? (
                                    <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-lg shadow-lg transform -rotate-12 z-10">
                                      Miễn phí
                                    </span>
                                  ) : course.giamgia > 0 ? (
                                    <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-lg shadow-lg transform -rotate-12 z-10">
                                      -
                                      {Math.round(
                                        ((course.gia - course.giamgia) /
                                          course.gia) *
                                        100
                                      )}
                                      % OFF
                                    </span>
                                  ) : null}
                                </div>
                              </Link>
                              <div
                                className="save-icon"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal-login"
                                onClick={() => handleYeuThich(course.id)}
                              >
                                <i className="fa-sharp fa-light fa-bookmark text-lg" />
                              </div>
                              <div className="course-card p-4 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
                                <Link
                                  href={`/page/course-detail?id=${course.id}`}
                                  className="title-link"
                                >
                                  <h5
                                    className="title text-2xl font-medium hover:text-primary-600 transition-all duration-300 truncate whitespace-nowrap overflow-hidden"
                                    title={course.ten}
                                  >
                                    <strong>{course.ten}</strong>
                                  </h5>
                                </Link>

                                <div className="flex items-center justify-between mt-3">
                                  <div className="teacher flex items-center">
                                    <i
                                      className="fas fa-user-tie mr-2 text-gray-800 text-xl"
                                      style={{ fontWeight: "400" }}
                                    ></i>
                                    <span
                                      className="text-xl text-gray-800"
                                      style={{ fontWeight: "400" }}
                                    >
                                      {course.giangvien}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex flex-row space-x-4 bg-gradient-to-r from-gray-50 to-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                                  <div className="flex items-center space-x-2 pr-2 pt-2 pb-2 rounded-full">
                                    <i className="fa-light fa-calendar-lines-pen text-gray-600 text-lg" />
                                    <div className="flex flex-col">
                                      <span
                                        className="text-lg font-bold"
                                        style={{ fontWeight: "400" }}
                                      >
                                        {course.baihocs}
                                        <span
                                          className="text-lg text-gray-600 uppercase tracking-wider pl-1"
                                          style={{ fontWeight: "400" }}
                                        >
                                          Bài
                                        </span>
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-2 p-2 rounded-full">
                                    <i className="fa-light fa-user-group text-gray-600 text-xl" />
                                    <div className="flex flex-col">
                                      <span
                                        className="text-lg font-bold"
                                        style={{ fontWeight: "400" }}
                                      >
                                        {course.dangky}
                                        <span
                                          className="text-lg text-gray-600 uppercase tracking-wider pl-1"
                                          style={{ fontWeight: "400" }}
                                        >
                                          Học viên
                                        </span>
                                      </span>
                                    </div>
                                  </div>

                                  <div className="rating-area text-lg p-2 flex flex-row items-center">
                                    <FaStar
                                      className="text-yellow-400 w-5 h-5"
                                      aria-label="Rating Star"
                                    />
                                    <span
                                      className="rating-number ml-1 text-xl"
                                      style={{ fontWeight: "400" }}
                                    >
                                      {averageRating.toFixed(1)}
                                    </span>
                                  </div>
                                </div>
                                <div className="course-top relative mt-5">
                                  <div className="price">
                                    {course.gia === 0 ||
                                      course.giamgia === 0 ? (
                                      <span className="text-red-500 font-bold text-2xl">
                                        0VNĐ
                                      </span>
                                    ) : (
                                      <div className="flex items-center">
                                        <span className="text-red-500 font-bold text-2xl mr-3">
                                          {course.giamgia.toLocaleString('vi-VN')}
                                          <span className="text-xl">VNĐ</span>
                                        </span>
                                        <span className="line-through text-gray-500 text-2xl">
                                          {course.gia.toLocaleString('vi-VN')}
                                          <span className="text-xl">VNĐ</span>
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* Single course style end */}
                          </div>
                        );
                      })
                    ) : (
                      <p>No related courses found</p>
                    )}
                  </div>
                  <span
                    className="swiper-notification"
                    aria-live="assertive"
                    aria-atomic="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      <ToastContainer position="top-right" autoClose={3000} />
      <Footercomponent />
    </div>
  );
}

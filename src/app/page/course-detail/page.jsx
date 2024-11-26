"use client";
import React, { useState, useEffect } from "react";
import Header from "../../component/header/page";
import Footercomponent from "../../component/footer/page";
import { CourseDetails } from "../../../service/course/course.service";

import { Addcart } from "../../../service/cart/cart";
import { Showcart } from "../../../service/cart/cart";
import { KhoaHocDaDanKy } from "../../../service/cart/cart";
import { ThanhToanKhoaHocFree } from "../../../service/ThanhToan/ThanhToan";
//Linl nextjs
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Allcoursesss } from "../../../service/course/course.service";
import Nav from "./Nav/Nav";
import { FaStar, FaRegStar } from 'react-icons/fa'; // Import star icons

import Image from 'next/image';


const Khac = ({ course }) => {
  return (
    <>
      <div className="course-single-information">
        <h5 className="title">Tài liệu bao gồm</h5>
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
        <h5 className="title">Yêu cầu</h5>
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
        <h5 className="title">Tags</h5>
        <div className="body">
          <div className="tags-wrapper">
            <span>{course.chude}</span>
          </div>
        </div>
      </div>

      <div className="course-single-information">
        <h5 className="title">Chia sẻ</h5>
        <div className="body">
          <div className="social-share-course-side-bar">
            <ul>
              <li>
                <a href="#" data-tooltip="Share on Facebook">
                  <i className="fa-brands fa-facebook-f" />
                </a>
              </li>
              <li>
                <a href="#" data-tooltip="Share on Instagram">
                  <i className="fa-brands fa-instagram" />
                </a>
              </li>
              <li>
                <a href="#" data-tooltip="Share on LinkedIn">
                  <i className="fa-brands fa-linkedin" />
                </a>
              </li>
              <li>
                <a href="#" data-tooltip="Share on Pinterest">
                  <i className="fa-brands fa-pinterest" />
                </a>
              </li>
              <li>
                <a href="#" data-tooltip="Share on YouTube">
                  <i className="fa-brands fa-youtube" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="course-single-information last">
        <h5 className="title">Khán giả</h5>
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




const NavPhai = ({ course, formattedTotalTime, firstVideo, handleAddCart, NguoiDung, isCourseRegistered, isCourseInCart }) => {
  const handleThanhToanKhoaHocFree = async () => {
    await ThanhToanKhoaHocFree(course.id_giangvien);
    toast.success("Bạn đã Nhận Kháo Học Miễn phí!");
  }

  return (
    <>
      <div
        className="rts-course-area rts-section-gap"
        style={{ transform: "none" }}
      >
        <div className="container" style={{ transform: "none" }}>
          <div className="row g-5" style={{ transform: "none" }}>
            <div className="order-2 col-lg-8 order-cl-1 order-lg-1 order-md-2 order-sm-2">

              <Nav course={course} formattedTotalTime={formattedTotalTime} />

            </div>

            <div
              className="order-1 col-lg-4 order-cl-2 order-lg-2 order-md-1 order-sm-1 rts-sticky-column-item"
              style={{
                position: "relative",
                overflow: "visible",
                boxSizing: "border-box",
                minHeight: 1,
              }}
            >
              <div
                className="theiaStickySidebar"
                style={{
                  paddingTop: 1,
                  paddingBottom: 1,
                  position: "static",
                  transform: "none",
                  left: "1023.16px",
                  top: 0,
                }}
              >
                <div className="right-course-details">
                  {/* single course-sidebar */}
                  <div className="course-side-bar">
                    <div className="thumbnail">
                      {/* <Image width={500} height={300} src="/assets/images/course/20.jpg" alt="Course Image" /> */}
                      <div className="vedio-icone">
                        {firstVideo && (
                          <iframe
                            height="250px"
                            src={`https://www.youtube.com/embed/${firstVideo.url_link}?enablejsapi=1`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          />
                        )}

                        <div className="video-overlay">
                          <a className="video-overlay-close">×</a>
                        </div>
                      </div>
                    </div>
                    <div className="price-area ">
                      {course.gia === 0 && course.giamgia === 0 ? (
                        <p className=" p-4 text-white font-bold text-4xl text-center w-full" >Miễn phí</p>
                      ) : (
                        <>
                          <h3 className="title price-current bg-white">
                            ${course.giamgia}
                          </h3>
                          {/* <h4 className="price-original bg-white ">${course.gia}</h4> */}
                          <span className="price-discount">
                            -{((course.gia - course.giamgia) / course.gia * 100).toFixed(2)}%
                          </span>
                        </>
                      )}
                    </div>


                    <div className="clock-area">
                      <i className="fa-light fa-clock" />
                      <span>2 ngày còn lại ở mức giá này!</span>
                    </div>
                    {!NguoiDung ? (
                      <Link href={`/page/login`}>
                        <button className="rts-btn ">
                          Đi Đến Đăng nhập
                        </button>
                      </Link>
                    ) : isCourseRegistered || course.gia === 0 || course.giamgia == 0 ? (
                      <Link href={`/page/Study?id=${course.id}`}>
                        <button onClick={handleThanhToanKhoaHocFree} className="rts-btn  p-4 " style={{ fontSize: "13px" }}>
                          Đi đến khóa học
                        </button>
                      </Link>

                    ) : isCourseInCart ? (
                      <Link href="/page/cart">
                        <button className="rts-btn ">
                          Đi xe đẩy
                        </button>
                      </Link>
                    ) : course.trangthai === 'Notyet' || course.trangthai === 'Pending' ? (
                      <button className="rts-btn ">
                        Bản Demo
                      </button>
                    ) : (
                      <>
                        <button onClick={handleAddCart} className="rts-btn ">
                          Thêm vào giỏ hàng
                        </button>
                        <Link href="/page/checkout" className="rts-btn btn-border" onClick={handleAddCart}>
                          Mua ngay
                        </Link>

                      </>
                    )}
                    <div className="p-1 font-bold text-black what-includes text-left">
                      <span className="m text-left block">Đảm bảo hoàn lại tiền 30 ngày</span>
                      <h5 className="title text-left">Khóa học này bao gồm:</h5>
                      <div className="single-include flex">
                        <div className="left">
                          <i className="fa-light fa-chart-bar" />
                          <span className="text-left">Cấp độ</span>
                        </div>
                        <div className="right">
                          <span className="text-left">{course.trinhdo}</span>
                        </div>
                      </div>
                      <div className="single-include flex">
                        <div className="left">
                          <i className="fa-light fa-timer" />
                          <span className="text-left">Khoảng thời gian</span>
                        </div>
                        <div className="right">
                          <span className="text-left">{formattedTotalTime}</span>
                        </div>
                      </div>
                      <div className="single-include flex">
                        <div className="left">
                          <i className="fa-regular fa-floppy-disk" />
                          <span className="text-left">Chủ thể</span>
                        </div>
                        <div className="right">
                          <span className="text-left">{course.chude}</span>
                        </div>
                      </div>
                      {/* <div className="single-include flex">
                                          <div className="left">
                                            <i className="fa-regular fa-pen-to-square" />
                                            <span className="text-left">Cập nhật</span>
                                          </div>
                                          <div className="right">
                                            <span className="text-left">{course.created_at}</span>
                                          </div>
                                        </div>
                                        <div className="single-include flex">
                                          <div className="left">
                                            <i className="fa-sharp fa-light fa-file-certificate" />
                                            <span className="text-left">Giấy chứng nhận</span>
                                          </div>
                                          <div className="right">
                                            <span className="text-left">Giấy chứng nhận hoàn thành</span>
                                          </div>
                                        </div> */}
                    </div>
                  </div>
                  {/* single course-sidebar end */}
                </div>


                <div className="right-course-details mt--30">
                  {/* single course-sidebar */}
                  <div className="course-side-bar">
                    {/* course single sidebar */}
                    <div className="course-single-information">
                      <h5 className="title">Một khóa học của </h5>
                      <div className="body">
                        <div className="font-normal text-black">
                          {/* <Image width={500} height={300}    src="assets/images/course/13.png" alt="" /> */}
                          <span><h2><strong>{course.giangvien}</strong></h2></span>
                        </div>
                      </div>
                    </div>
                    <Khac course={course} />

                    {/* course single sidebar end*/}
                  </div>
                  {/* single course-sidebar end */}
                </div>
                <div
                  className="resize-sensor"
                  style={{
                    position: "absolute",
                    inset: 0,
                    overflow: "hidden",
                    zIndex: -1,
                    visibility: "hidden",
                  }}
                >
                  <div
                    className="resize-sensor-expand"
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 0,
                      overflow: "hidden",
                      zIndex: -1,
                      visibility: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        transition: "all 0s ease 0s",
                        width: 506,
                        height: 1805,
                      }}
                    />
                  </div>
                  <div
                    className="resize-sensor-shrink"
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 0,
                      overflow: "hidden",
                      zIndex: -1,
                      visibility: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        transition: "0s",
                        width: "200%",
                        height: "200%",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
     
    </>


  );
}








export default function Coursedetailcomponent() {




  const [id, setId] = useState(null);
  const [course, setCourse] = useState(null);
  const [isCourseInCart, setIsCourseInCart] = useState(false);
  const [isCourseRegistered, setIsCourseRegistered] = useState(false);
  const [Allcourse, setAllcourse] = useState(null);

  const [loading, setLoading] = useState(true);

  const NguoiDung = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("data")) : null;

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    setId(id);
  }, []);

  useEffect(() => {
    if (id) {
      setLoading(true);
      CourseDetails(id)
        .then((res) => {
          setCourse(res.khoahoc || null);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const res = await Showcart();
        const urlParams = new URLSearchParams(window.location.search);
        const id_khoahoc = urlParams.get('id');

        if (res?.data && Array.isArray(res.data)) {
          const isInCart = res.data.some(item =>
            item.khoahocs.some(khoahoc => khoahoc.id.toString() === id_khoahoc)
          );
          setIsCourseInCart(isInCart);
        }
      } catch {
        // Do nothing
      }
    };

    fetchCartData();
  }, []);

  useEffect(() => {
    const fetchRegisteredCourses = async () => {
      try {
        const res = await KhoaHocDaDanKy();
        const urlParams = new URLSearchParams(window.location.search);
        const id_khoahoc = urlParams.get('id');

        if (res?.data && Array.isArray(res.data)) {
          const isRegistered = res.data.some(item =>
            item.khoahocs.some(khoahoc => khoahoc.id.toString() === id_khoahoc)
          );
          setIsCourseRegistered(isRegistered);
        }
      } catch {
        // Do nothing
      }
    };
    fetchRegisteredCourses();
  }, []);

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const res = await Allcoursesss();
        setAllcourse(res.data || []);
      } catch {
        // Do nothing
      }
    };

    fetchAllCourses();
  }, []);

  const khoahoclienquan = Allcourse?.filter((item) => item.id_chude === course?.chude_id) || [];

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
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
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

  const handleAddCart = () => {


    Addcart()
      .then(() => {
        toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
        window.location.reload();
      })
      .catch(() => {
        // Do nothing
      });
  };










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
    <div className="mt-32">
      <Header />

      <>
        <div className="course-details-breadcrumb-1 bg_image rts-section-gap"
          style={{
            background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
            padding: "40px 0",
            color: "#fff"
          }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="single-course-left-align-wrapper"
                  style={{
                    padding: "30px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "15px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
                  }}>
                  <div className="meta-area">
                    <a href="index.html" style={{ color: "#fff", transition: "0.3s" }}>Trang chủ</a>
                    <i className="fa-solid fa-chevron-right" style={{ margin: "0 10px" }} />
                    <a className="active" href="#" style={{
                      color: "#ffd700",
                      fontWeight: "bold",
                      transition: "0.3s"
                    }}>
                      Chi tiết khóa học
                    </a>
                  </div>
                  <h1 className="title" style={{
                    fontSize: "2.5rem",
                    marginTop: "20px",
                    fontWeight: "700",
                    paddingLeft: "15px",
                    color: "white",
                    overflow: "visible",
                    whiteSpace: "nowrap",
                    position: "sticky",
                    top: "0"
                  }}>
                    {course.ten}
                  </h1>
                  <div className="rating-area" style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    margin: "20px 0"
                  }}>
                    <div className="stars-area" style={{
                      backgroundColor: "rgba(255,215,0,0.2)",
                      padding: "8px 15px",
                      borderRadius: "20px"
                    }}>
                      <span style={{ fontWeight: "bold", marginRight: "10px" }}>4.5</span>
                      {[1, 2, 3, 4].map(i => (
                        <i key={i} className="fa-solid fa-star" style={{ color: "#ffd700" }} />
                      ))}
                      <i className="fa-regular fa-star" style={{ color: "#ffd700" }} />
                    </div>
                    <div className="students" style={{
                      backgroundColor: "rgba(255,255,255,0.2)",
                      padding: "8px 15px",
                      borderRadius: "20px"
                    }}>
                      <i className="fa-solid fa-users" style={{ marginRight: "8px" }} />
                      <span>{course.thanhToan.length} Sinh viên</span>
                    </div>
                    <div className="calender-area-stars" style={{
                      backgroundColor: "rgba(255,255,255,0.2)",
                      padding: "8px 15px",
                      borderRadius: "20px"
                    }}>
                      <i className="fa-light fa-calendar-lines-pen" style={{ marginRight: "8px" }} />
                      <span>
                        Cập nhật lần cuối {
                          course?.created_at &&
                          `${new Date(course.created_at).getDate()}/${new Date(course.created_at).getMonth() + 1}/${new Date(course.created_at).getFullYear()}`
                        }
                      </span>
                    </div>
                  </div>
                  <div className="author-area" style={{
                    marginTop: "20px",
                    padding: "15px",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: "10px"
                  }}>
                    <div className="author">
                      <h6 className="name" style={{
                        margin: "0",
                        animation: "popIn 0.5s ease-out"
                      }}>
                        <span className="animated-text text-white text-xl" >Giảng Viên:</span>
                        <span className="text-2xl" style={{
                          marginLeft: "5px",
                          background: "linear-gradient(45deg, #fff, #ffd700)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent"
                        }}>
                          <strong>{course.giangvien}</strong>.</span>
                      </h6>
                    </div>
                    <p style={{
                      margin: "10px 0 0 0",
                      animation: "popIn 0.5s ease-out 0.2s backwards"
                    }}>
                      <span className="animated-text text-white text-xl">Thể loại: </span>
                      <span className="text-white" style={{
                        backgroundColor: "rgba(255,255,255,0.2)",
                        padding: "3px 15px",
                        borderRadius: "20px",
                        transition: "all 0.3s ease",
                        cursor: "pointer"

                      }} onMouseOver={(e) => {
                        e.target.style.backgroundColor = "rgba(255,215,0,0.3)";
                        e.target.style.transform = "translateX(5px)";
                      }} onMouseOut={(e) => {
                        e.target.style.backgroundColor = "rgba(255,255,255,0.2)";
                        e.target.style.transform = "translateX(0)";
                      }}>
                        {course.chude}
                      </span>
                    </p>
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
          NguoiDung={NguoiDung}
          isCourseRegistered={isCourseRegistered}
          isCourseInCart={isCourseInCart}
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
                        className="mr-1 bi bi-lightbulb"
                        style={{ color: "#32ADE6" }}
                      ></i>
                      <span>Các khóa học tương tự hơn</span>
                    </div>
                    <h2 className="title">Các khóa học liên quan</h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt--50">
              <div className="col-lg-12">
                <div className="overflow-x-scroll swiper swiper-float-right-course swiper-data swiper-initialized swiper-horizontal swiper-pointer-events">
                  <div className="swiper-wrapper">
                    {khoahoclienquan && Array.isArray(khoahoclienquan) ? (
                      khoahoclienquan.map((course, index) => {
                        const averageRating =
                          course.danhgia && course.danhgia.length > 0
                            ? course.danhgia.reduce((acc, rating) => acc + parseInt(rating.danhgia, 10), 0) /
                            course.danhgia.length
                            : 0;
                        return (
                          <div
                            key={index}
                            className="swiper-slide"
                            data-swiper-slide-index={index}
                            role="group"
                            aria-label={`${index + 1} / ${khoahoclienquan.length}`}
                            style={{ width: "342.25px", marginRight: 30 }}
                          >
                            {/* Single course style */}
                            <div className="single-course-style-three">
                              <a href={`/page/course-detail?id=${course.id}`} className="thumbnail">
                                <Image width={500} height={300} src={course.hinh} alt="course" style={{ height: "180px" }} />
                                <div className="course-tags">
                                  {course.gia === 0 ? (
                                    <span className="tag free">Miễn phí</span>
                                  ) : course.giamgia > 0 ? (
                                    <span className="tag discount">-{Math.round(((course.gia - course.giamgia) / course.gia) * 100)}%</span>
                                  ) : null}
                                </div>
                              </a>
                              <div className="body-area">
                                <div className="course-top relative">
                                  {/* <div className="tags">Người bán tốt nhất</div> */}
                                  <div className="price">
                                    {course.gia === 0 || course.giamgia === 0 ? (
                                      <span className="text-green-500 font-bold">Miễn Phí</span>
                                    ) : (
                                      <>
                                        <span className="line-through text-gray-500 mr-2">${course.gia}</span>
                                        <span className="text-red-500 font-semibold">${course.giamgia}</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                                <div className="course-card hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 p-4 rounded-lg">
                                  <a href={`/page/course-detail?id=${course.id}`} className="block">
                                    <h5 className="text-2xl font-medium hover:text-primary-600 transition-all duration-300 ease-in-out">
                                      <strong>{course.ten}</strong>
                                    </h5>
                                  </a>

                                  <div className="flex items-center justify-between mt-3">
                                    <div className="flex items-center  group">
                                      <i className="fa-light fa-user-teacher text-2xl text-primary-500 transition-all duration-300 ease-in-out transform group-hover:scale-110 group-hover:rotate-6" />
                                      <span className="text-xl text-gray-700 transition-colors duration-300 group-hover:text-primary-600">{course.giangvien}</span>
                                    </div>

                                    <div className="flex items-center gap-2 transition-transform duration-300 hover:scale-105">
                                      <span className="font-medium">{averageRating.toFixed(1)}</span>
                                      <div className="flex text-yellow-400">{renderStars(averageRating)}</div>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-6 mt-4 text-gray-600">
                                    <div className="flex items-center gap-3 group">
                                      <i className="fa-light fa-calendar-lines-pen text-2xl text-primary-500 transition-all duration-300 ease-in-out transform group-hover:scale-110 group-hover:rotate-6" />
                                      <div className="transition-colors duration-300 group-hover:text-primary-600">
                                        <span className="font-medium">{course.baihocs}</span>
                                        <span className="text-xl ml-1">Bài Học</span>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-3 group">
                                      <i className="fa-light fa-users text-2xl text-primary-500 transition-all duration-300 ease-in-out transform group-hover:scale-110 group-hover:rotate-6" />
                                      <div className="transition-colors duration-300 group-hover:text-primary-600">
                                        <span className="font-medium">{course.dangky}</span>
                                        <span className="text-xl ml-1">Sinh Viên</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* Single course style end */}
                          </div>
                        );
                      })
                    ) : (
                      <p>Không có khóa học có sẵn</p>
                    )}
                  </div>
                  <span className="swiper-notification" aria-live="assertive" aria-atomic="true" />
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

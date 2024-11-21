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
      <style jsx>{`
  /* Container Styling */
  .course-single-information {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
    border-radius: 24px;
    padding: 35px;
    margin-bottom: 30px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 
      0 10px 30px rgba(99, 102, 241, 0.1),
      inset 0 0 0 1px rgba(255, 255, 255, 0.5);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center;
  }

  .course-single-information:hover {
    transform: translateY(-8px) scale(1.02);
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 
      0 20px 40px rgba(99, 102, 241, 0.15),
      0 0 20px rgba(99, 102, 241, 0.1),
      inset 0 0 0 2px rgba(139, 92, 246, 0.2);
  }

  /* Title Styling */
  .title {
    font-size: 1.6rem;
    font-weight: 800;
    background: linear-gradient(135deg, #4f46e5, #0ea5e9, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 2rem;
    padding-bottom: 1.2rem;
    border-bottom: 2px solid rgba(99, 102, 241, 0.1);
    letter-spacing: -0.5px;
  }

  /* Checkmark Items */
  .single-check {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border-radius: 12px;
    transition: all 0.3s ease;
    color: #4b5563;
    font-weight: 500;
  }

  .single-check:hover {
    background: linear-gradient(90deg, rgba(99, 102, 241, 0.1), transparent);
    transform: translateX(10px);
    color: #4f46e5;
  }

  .fa-circle-check {
    color: #4f46e5;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    filter: drop-shadow(0 2px 5px rgba(79, 70, 229, 0.3));
  }

  .single-check:hover .fa-circle-check {
    transform: scale(1.2) rotate(10deg);
    color: #8b5cf6;
  }

  /* Tags Styling */
  .tags-wrapper span {
    display: inline-block;
    padding: 8px 16px;
    background: linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(14, 165, 233, 0.1));
    border-radius: 20px;
    color: #4f46e5;
    font-weight: 600;
    transition: all 0.4s ease;
    border: 1px solid rgba(99, 102, 241, 0.2);
  }

  .tags-wrapper span:hover {
    background: linear-gradient(135deg, #4f46e5, #0ea5e9);
    color: white;
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(79, 70, 229, 0.2);
  }

  /* Social Media Icons */
  .social-share-course-side-bar ul {
    display: flex;
    gap: 15px;
    justify-content: center;
  }

  .social-share-course-side-bar a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.95);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .social-share-course-side-bar a:hover {
    transform: translateY(-8px) rotate(8deg);
  }

  .fa-facebook-f:hover { color: #1877f2; }
  .fa-instagram:hover { 
    background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .fa-linkedin:hover { color: #0077b5; }
  .fa-pinterest:hover { color: #e60023; }
  .fa-youtube:hover { color: #ff0000; }

  /* Animations */
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }

  .pulse {
    animation: pulse 2s infinite;
  }

  .float {
    animation: float 3s ease-in-out infinite;
  }
`}</style>
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
                    <div className="price-area">
                      {course.gia === 0 && course.giamgia === 0 ? (
                        <h3 className="title price-free">Miễn phí</h3>
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
                        <button className="rts-btn btn-primary">
                          Đi Đến Đăng nhập
                        </button>
                      </Link>
                    ) : isCourseRegistered || course.gia === 0 || course.giamgia == 0 ? (
                      <Link href={`/page/Study?id=${course.id}`}>
                        <button onClick={handleThanhToanKhoaHocFree} className="rts-btn btn-primary">
                          Đi đến khóa học
                        </button>
                      </Link>

                    ) : isCourseInCart ? (
                      <Link href="/page/cart">
                        <button className="rts-btn btn-primary">
                          Đi xe đẩy
                        </button>
                      </Link>
                    ) : course.trangthai === 'Notyet' || course.trangthai === 'Pending' ? (
                      <button className="rts-btn btn-primary">
                        Bản Demo
                      </button>
                    ) : (
                      <>
                        <button onClick={handleAddCart} className="rts-btn btn-primary">
                          Thêm vào giỏ hàng
                        </button>
                        <Link href="/page/checkout" className="rts-btn btn-border" onClick={handleAddCart}>
                          Mua ngay
                        </Link>

                      </>
                    )}
                    <div className="p-1 font-bold text-black what-includes">
                      <span className="m">Đảm bảo hoàn lại tiền 30 ngày</span>
                      <h5 className="title">Khóa học này bao gồm:</h5>
                      <div className="single-include">
                        <div className="left">
                          <i className="fa-light fa-chart-bar" />
                          <span>Cấp độ</span>
                        </div>
                        <div className="right">
                          <span>{course.trinhdo}</span>
                        </div>
                      </div>
                      <div className="single-include">
                        <div className="left">
                          <i className="fa-light fa-timer" />
                          <span>Khoảng thời gian</span>
                        </div>
                        <div className="right">
                          <span>{formattedTotalTime}</span>
                        </div>
                      </div>
                      <div className="single-include">
                        <div className="left">
                          <i className="fa-regular fa-floppy-disk" />
                          <span>Chủ thể</span>
                        </div>
                        <div className="right">
                          <span> {course.chude}</span>
                        </div>
                      </div>
                      <div className="single-include">
                        <div className="left">
                          <i className="fa-regular fa-pen-to-square" />
                          <span>Cập nhật</span>
                        </div>
                        <div className="right">
                          <span>{course.created_at}</span>
                        </div>
                      </div>
                      <div className="single-include">
                        <div className="left">
                          <i className="fa-sharp fa-light fa-file-certificate" />
                          <span>Giấy chứng nhận</span>
                        </div>
                        <div className="right">
                          <span>Giấy chứng nhận hoàn thành </span>
                        </div>
                      </div>
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
      <style jsx>{`
    /* Text Color Variables */
  :root {
    --primary: #4f46e5;
    --secondary: #0ea5e9; 
    --accent: #8b5cf6;
    --text-gradient: linear-gradient(135deg, var(--primary), var(--secondary), var(--accent));
  }

  /* Text Gradient Animation */
  @keyframes textGradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* Enhanced Text Styling */
  .title, h2, h3, h4, h5 {
    background: var(--text-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% auto;
    animation: textGradient 4s ease infinite;
    font-weight: 800;
    letter-spacing: -0.03em;
  }

  .price-current {
    font-size: 2.8rem;
    font-weight: 900;
    text-shadow: 0 2px 15px rgba(79, 70, 229, 0.2);
  }

  .price-free {
    font-size: 2.5rem;
    background: linear-gradient(135deg, #10b981, #059669);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .what-includes span {
    color: #4b5563;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .single-include:hover span {
    background: var(--text-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transform: translateX(5px);
  }

  .clock-area span {
    font-weight: 600;
    background: linear-gradient(135deg, #fff, #e5e7eb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  .single-include .left span {
    background: var(--text-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 600;
  }

  .single-include .right span {
    color: #6366f1;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .single-include:hover .right span {
    background: var(--text-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transform: translateX(-5px);
  }

  /* Button Text */
  .rts-btn {
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    font-size: 0.9rem;
  }

  /* Text Animation */
  @keyframes textFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-2px); }
  }

  .title {
    animation: textFloat 3s ease-in-out infinite;
  }

  /* Text Hover Effects */
  .what-includes .title:hover,
  .course-single-information .title:hover {
    text-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
    letter-spacing: 0;
  }
   /* Advanced Animations */
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes glow {
    0%, 100% { filter: brightness(1); }
    50% { filter: brightness(1.2); }
  }

  /* Container Animation */
  .right-course-details {
    animation: float 6s ease-in-out infinite;
    background: linear-gradient(
      135deg, 
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.7)
    );
    background-size: 200% 200%;
    animation: gradient-shift 15s ease infinite;
  }

  /* Video Player Enhancements */
  .vedio-icone {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    transform: translateZ(0);
    transition: transform 0.3s ease;
  }

  .vedio-icone:hover {
    transform: scale(1.02) translateZ(0);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }

  /* Price Area Animations */
  .price-area {
    animation: glow 3s ease-in-out infinite;
    background: linear-gradient(
      135deg,
      #6366f1,
      #ec4899,
      #8b5cf6,
      #6366f1
    );
    background-size: 300% 300%;
    animation: gradient-shift 8s ease infinite;
  }

.price-discount {
    transform-origin: center;
    animation: 
      pulse 2s infinite,
      spin 12s linear infinite;
    color: white;
}
  /* Button Hover Effects */
  .rts-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transition: 0.5s;
  }

  .rts-btn:hover::before {
    left: 100%;
  }

  /* Feature List Animations */
  .single-include {
    position: relative;
    z-index: 1;
  }

  .single-include::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #6366f1, transparent);
    transition: width 0.3s ease;
  }

  .single-include:hover::after {
    width: 100%;
  }

  /* Icon Animations */
  .fa-light, .fa-regular {
    animation: float 3s ease-in-out infinite;
  }

  .single-include:hover .fa-light,
  .single-include:hover .fa-regular {
    animation: 
      spin 1s ease-out,
      glow 2s infinite;
  }

  /* Clock Area Enhancement */
  .clock-area {
    position: relative;
    overflow: hidden;
    padding: 15px;
    border-radius: 12px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    text-align: center;
    animation: pulse 2s infinite;
  }

  .clock-area i {
    animation: spin 10s linear infinite;
  }

  /* Course Information Hover */
  .course-single-information:hover {
    transform: perspective(1000px) rotateX(5deg);
    box-shadow: 
      0 20px 40px rgba(99, 102, 241, 0.2),
      0 0 0 2px rgba(99, 102, 241, 0.1);
  }

  /* Enhanced Transitions */
  * {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Shimmer Effect Enhancement */
  @keyframes enhanced-shimmer {
    0% {
      transform: translateX(-150%) skewX(-45deg);
    }
    50% {
      transform: translateX(-60%) skewX(-45deg);
    }
    100% {
      transform: translateX(150%) skewX(-45deg);
    }
  }

  .right-course-details::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transform: translateX(-150%) skewX(-45deg);
    animation: enhanced-shimmer 3s infinite;
  }
  /* Modern Glass Container */
  .right-course-details {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
    border-radius: 24px;
    padding: 30px;
    box-shadow: 
      0 10px 30px rgba(99, 102, 241, 0.1),
      inset 0 0 0 1px rgba(255, 255, 255, 0.5);
    transition: all 0.4s ease;
  }

  .right-course-details:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 20px 40px rgba(99, 102, 241, 0.15),
      inset 0 0 0 2px rgba(139, 92, 246, 0.2);
  }

  /* Price Area Styling */
  .price-area {
    text-align: center;
    padding: 20px;
    background: linear-gradient(135deg, #6366f1, #ec4899, #8b5cf6);
    border-radius: 16px;
    color: white;
    position: relative;
    overflow: hidden;
  }

  .price-area::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent);
    animation: shimmer 2s infinite;
  }

  .price-current {
    font-size: 2.5rem;
    font-weight: 800;
    text-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

.price-original {
    text-decoration: line-through;
    opacity: 0.7;

}
  .price-discount {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #10b981;
    padding: 5px 10px;
    border-radius: 20px;
    font-weight: 600;
    animation: pulse 2s infinite;
  }

  /* Button Styling */
  .rts-btn {
    padding: 12px 24px;
    border-radius: 12px;
    font-weight: 600;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .btn-primary {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
  }

  .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
  }

  .btn-border {
    background: transparent;
    border: 2px solid #6366f1;
    color: #6366f1;
  }

  .btn-border:hover {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    border-color: transparent;
  }

  /* What Includes Section */
  .what-includes {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 16px;
    padding: 25px;
    margin-top: 20px;
  }

  .single-include {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid rgba(99, 102, 241, 0.1);
    transition: all 0.3s ease;
  }

  .single-include:hover {
    transform: translateX(10px);
    background: linear-gradient(
      90deg,
      rgba(99, 102, 241, 0.1),
      transparent
    );
  }

  /* Icon Animations */
  .fa-light, .fa-regular {
    color: #6366f1;
    transition: all 0.3s ease;
  }

  .single-include:hover .fa-light,
  .single-include:hover .fa-regular {
    transform: scale(1.2) rotate(10deg);
    color: #8b5cf6;
  }

  /* Animations */
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`}</style>
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
                      <span>Cập nhật lần cuối {course?.created_at}</span>
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
                        <span className="animated-text" style={{
                          fontSize: "1.2em",
                          fontWeight: "700"
                        }}>Qua</span>
                        <span style={{
                          marginLeft: "5px",
                          background: "linear-gradient(45deg, #fff, #ffd700)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent"
                        }}>{course.giangvien}.</span>
                      </h6>
                    </div>
                    <p style={{
                      margin: "10px 0 0 0",
                      animation: "popIn 0.5s ease-out 0.2s backwards"
                    }}>
                      <span className="animated-text">Thể loại: </span>
                      <span style={{
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
                                <Image width={500} height={300} src={course.hinh} alt="course" />
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
                                  <div className="tags">Người bán tốt nhất</div>
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
                                    <h5 className="text-xl font-medium hover:text-primary-600 transition-all duration-300 ease-in-out">
                                      {course.ten}
                                    </h5>
                                  </a>

                                  <div className="flex items-center justify-between mt-3">
                                    <div className="flex items-center gap-3 group">
                                      <i className="fa-light fa-user-teacher text-2xl text-primary-500 transition-all duration-300 ease-in-out transform group-hover:scale-110 group-hover:rotate-6" />
                                      <span className="text-sm text-gray-700 transition-colors duration-300 group-hover:text-primary-600">{course.giangvien}</span>
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
                                        <span className="text-sm ml-1">Bài Học</span>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-3 group">
                                      <i className="fa-light fa-users text-2xl text-primary-500 transition-all duration-300 ease-in-out transform group-hover:scale-110 group-hover:rotate-6" />
                                      <div className="transition-colors duration-300 group-hover:text-primary-600">
                                        <span className="font-medium">{course.dangky}</span>
                                        <span className="text-sm ml-1">Sinh Viên</span>
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
      <style jsx>{`
      .thumbnail {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    transition: transform 0.3s ease;
}

.thumbnail:hover {
    transform: scale(1.02);
}

.course-tags {
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.tag {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    animation: slideIn 0.3s ease;
}

.tag.free {
    background: linear-gradient(135deg, #00b09b, #96c93d);
    color: white;
}

.tag.discount {
    background: linear-gradient(135deg, #ff416c, #ff4b2b);
    color: white;
}

@
      .thumbnail {
    position: relative;
}

.course-tags {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.tag {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
}

.tag.free {
    background-color: #28a745;
    color: white;
}

.tag.discount {
    background-color: #dc3545;
    color: white;
}
      @keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.single-course-style-three {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.single-course-style-three:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.2);
}

.thumbnail {
  position: relative;
  overflow: hidden;
}

.thumbnail img {
  transition: transform 0.5s ease;
}

.thumbnail:hover img {
  transform: scale(1.1);
}

.body-area {
  padding: 20px;
  background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
}

.tags {
  background: linear-gradient(45deg, #ffd700, #ff8c00);
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
  animation: shimmer 2s infinite linear;
  background-size: 200% 100%;
}

.price span {
  padding: 5px 10px;
  border-radius: 8px;
}

.stars {
  display: flex;
  gap: 5px;
  color: #ffd700;
}

.stars li {
  transition: transform 0.2s ease;
}

.stars li:hover {
  transform: scale(1.2);
}

.lesson-students {
  border-top: 1px solid rgba(255,255,255,0.1);
  margin-top: 15px;
  padding-top: 15px;
}

.lesson, .students {
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.lesson:hover, .students:hover {
  opacity: 1;
}

.title {
  font-size: 1.2em;
  font-weight: 600;
  margin: 15px 0;
  background: linear-gradient(45deg, #fff, #ffd700);
  -webkit-background-clip: text;
  color: transparent; /* Ensure text is visible */
  transition: all 0.3s ease;
}

.teacher {
  font-style: italic;
  color: #ffd700;
}
        @keyframes textShine {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}

@keyframes popIn {
  0% { transform: scale(0.95); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
}

.animated-text {
  background: linear-gradient(90deg, #ffd700, #fff, #ffd700);
  background-size: 200% auto;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  animation: textShine 3s linear infinite;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  transition: all 0.3s ease;
}

.animated-text:hover {
  transform: scale(1.05);
  letter-spacing: 1px;
}
        @keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

@keyframes shine {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.single-course-left-align-wrapper {
  animation: fadeIn 0.8s ease-out;
}

.stars-area, .students, .calender-area-stars {
  animation: float 3s ease-in-out infinite;
}

.title {
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  background-size: 200% auto;
  animation: shine 3s linear infinite;
}

.fa-star {
  animation: pulse 2s infinite;
}

.rating-area > div:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
}
`}</style>
    </div>
  );
}

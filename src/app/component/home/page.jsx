"use client";
import React, { useState, useEffect } from "react";
import Counter from "./Counter";

import { Commenthome } from "../comment/comment";
import {
  OutstandingCourse,
  CourseNew,
  Courseseal,
  Coursefree,
  KhoaHocDangHocDay
} from "../course/course.component";
import { KhoaHocDangHoc } from "../../../service/dashbordStuden/Dashboard-service";
import { Dashboard } from "@/service/dashbordStuden/Dashboard-service";
import
SaleComponent
  from "../course/SaleComponent";
import HorizontalScrollImages from "../course/Slider";
import { NextCategory } from "../category/category.component";
import Banner from "../banner/page";
import BannerUser from "../BannerUser/page";
import Image from "next/image";
import CourseDeXuat from "../../component/course/courseDeXuat";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

// Initialize AOS in useEffect

export default function Homecomponent() {
  const [khoaHocDangHoc1, setKhoaHocDangHoc] = useState([]);
  const NguoiDungString = typeof window !== 'undefined' ? localStorage.getItem('data') : null;
  const NguoiDung = NguoiDungString ? JSON.parse(NguoiDungString) : {};
  const [KhoaHocDaThanhToan, setKhoaHocDaThanhToan] = useState([]);
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false, // Animation will repeat on scroll
      mirror: true, // Elements will animate out while scrolling past them
      easing: "ease-in-out",
      anchorPlacement: "center-center",
      offset: 100,
    });
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await KhoaHocDangHoc();
        setKhoaHocDangHoc(data);
      } catch (error) {
        console.log("Failed to fetch courses", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    Dashboard()
      .then((res) => {
        setKhoaHocDaThanhToan(res.data);

      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);

  const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

  const isInactiveLongTime = NguoiDung && (
    new Date(NguoiDung.lastLogin).getTime() < Date.now() - ONE_DAY_IN_MS
  );

  return (
    <div data-aos="zoom-in" data-aos-offset="200" data-aos-duration="1500">
      <div className="mt-60 ">
        {isInactiveLongTime ? (
          <div data-aos="zoom-in">
            <BannerUser />
          </div>
        ) : (
          <div data-aos="zoom-in">
            <Banner />
          </div>
        )}
        <div data-aos="zoom-in ">
          <NextCategory />
        </div>
        <div data-aos="zoom-in ">
          <SaleComponent />
        </div>
        {khoaHocDangHoc1.length ? (
          <div data-aos="zoom-in">
            <KhoaHocDangHocDay />
          </div>
        ) : null}
        {KhoaHocDaThanhToan.length ? (
          <div data-aos="zoom-in">
            <CourseDeXuat />
          </div>
        ) : null}


        <div data-aos="zoom-in">
          <OutstandingCourse />
        </div>

        <div data-aos="zoom-in">
          <div
            className="why-choose-us bg-gradient-to-r from-gray-900 via-pink-700 to-gray-600 bg-choose-us-one bg_image rts-section-gap shape-move"
            data-aos="zoom-in"
          >
            <div className="container">
              <div className="row align-items-start">
                <div className="col-lg-6">
                  <div className="why-choose-us-area-image pb--50">
                    <Image
                      width={300} // Thay đổi width thành 300
                      height={200}
                      className="one"
                      src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1728218768/02_atsgze.jpg"
                      alt="why-choose"
                      style={{ height: "500px", width: "270px" }}
                    />
                    <div className="border-img">
                      <Image
                        width={400}
                        height={200}
                        className="two ml--20"
                        src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1728218908/03_grf0on.jpg"
                        alt="why-choose"
                        style={{ height: "400px", width: "400px" }}
                      />
                    </div>
                    <div className="circle-animation">
                      <Link
                        className="uni-circle-text uk-visible@m"
                        href="#view_in_opensea"
                      >
                        <svg
                          className="uni-circle-text-path uk-text-secondary uni-animation-spin"
                          viewBox="0 0 100 100"
                          width={150}
                          height={150}
                        >
                          <defs>
                            <path
                              id="circle"
                              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                            ></path>
                          </defs>
                          <text fontSize="10">
                            <textPath xlinkHref="#circle">
                              Nạp kiến thức - tương lai nghìn đô
                            </textPath>
                          </text>
                        </svg>
                        <i className="fa-regular fa-arrow-up-right" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 pl--45 pl_md--15 mt_md--50 pl_sm--15 pt_sm--50">
                  <div className="title-area-left-style mb-5">
                    <div className="pre-title d-flex align-items-center mb-3">
                      <i className="mr-2 bi bi-lightbulb text-white animate-pulse text-xl" style={{ marginRight: "-5px" }}></i>
                      <span className="text-white font-weight-bold text-xl">
                        Tại sao chọn chúng tôi
                      </span>
                    </div>
                    <h2 className="title text-white display-4 mb-4 text-5xl">
                      Techstudent - Con đường dẫn đến{" "}
                      <span className="text-white-500 font-medium text-5xl">
                        sự xuất sắc
                      </span>
                    </h2>
                    <p className="post-title text-white lead text-2xl">
                      Chúng tôi đam mê giáo dục và tận tâm cung cấp các nguồn
                      học tập chất lượng cao cho người học mọi lúc.
                    </p>
                  </div>

                  <div className="why-choose-grid">
                    {[
                      {
                        img: "01_s9m4hw.png",
                        title: "Chất lượng hàng đầu",
                        desc: "Đội ngũ giảng viên xuất sắc",
                      },
                      {
                        img: "02_vnmc5y.png",
                        title: "Học linh hoạt",
                        desc: "Học mọi lúc, mọi nơi",
                      },
                      {
                        img: "03_gqwcdw.png",
                        title: "Hỗ trợ 24/7",
                        desc: "Luôn sẵn sàng giúp đỡ",
                      },
                      {
                        img: "04_zdj1tq.png",
                        title: "Chứng chỉ giá trị",
                        desc: "Được công nhận toàn cầu",
                      },
                      {
                        img: "05_qkz8ke.png",
                        title: "Cộng đồng lớn",
                        desc: "Kết nối & học hỏi",
                      },
                      {
                        img: "05_qkz8ke.png",
                        title: "Giá cả hợp lý",
                        desc: "Phù hợp mọi đối tượng",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="reason-card"
                        data-aos="zoom-in"
                        data-aos-delay={index * 100}
                      >
                        <div className="flex items-center justify-center mx-auto w-24 h-24 rounded-md bg-gradient-to-r from-blue-900 via-pink-700 to-pink-700 hover:shadow-lg transition-all duration-300 border border-white">
                          <Image
                            width={500}
                            height={300}
                            src={`https://res.cloudinary.com/dnjakwi6l/image/upload/v1728219100/${item.img}`}
                            alt={item.title}
                            className="hover-scale p-3"
                            style={{ width: '65px', height: '65px', backgroundColor: 'transparent' }}
                          />
                        </div>
                        <h4 className="text-white mt-3 mb-2 text-2xl text-center">
                          <strong>{item.title}</strong>
                        </h4>
                        <p className="text-light text-xl text-center">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-row gap-10">
                    <Link
                      href="/page/Cours-Filter"
                      className="rts-btn hover-effect  bg-gradient-to-r from-blue-900 via-pink-700 to-pink-700 border border-white"
                    >
                      <span className="text-white text-xl" style={{ fontWeight: '400' }}>
                        Xem tất cả các khóa học
                      </span>
                      <i className="fas fa-arrow-right ml-2 text-xl text-white"></i>
                    </Link>
                    <Link
                      href="#khoahocmoi"
                      className="rts-btn hover-effect border-white  border border-white"
                    >
                      <span className="text-white text-xl" style={{ fontWeight: '400' }}>
                        Xem các khóa học mới
                      </span>
                      <i className="fas fa-arrow-right ml-2 text-xl text-white"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="shape-image">
                <div
                  className="shape one"
                  data-speed="0.04"
                  data-revert="true"
                ></div>
                <div className="shape two" data-speed="0.04"></div>
                <div className="shape three" data-speed="0.04"></div>
              </div>
            </div>
          </div>
        </div>
        <div data-aos="zoom-in" id="khoahocmoi">
          <CourseNew />
        </div>
        <div data-aos="zoom-in">
          <div className="fun-facts-area bg-gradient" data-aos="zoom-in">
            {/* Each fact item */}
            <div className="fact-item" data-aos="zoom-in" data-aos-delay="100">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="fun-facts-wrapper d-flex flex-wrap justify-content-around">
                      <div className="fact-item text-center wow fadeInUp" data-wow-delay="0.2s">
                        <div className="icon-wrapper mb-3">
                          <i className="fas fa-user-graduate fa-3x text-primary"></i>
                        </div>
                        <h2 className="counter-value mb-2">
                          <Counter target={872} />+
                        </h2>
                        <p className="text-xl">Tổng Học Viên Đăng Ký</p>
                      </div>

                      <div className="fact-item text-center wow fadeInUp" data-wow-delay="0.4s">
                        <div className="icon-wrapper mb-3">
                          <i className="fas fa-graduation-cap fa-2x text-success"></i>
                        </div>
                        <h2 className="counter-value mb-2">
                          <Counter target={221} />+
                        </h2>
                        <p className="text-xl">Học Viên Tốt Nghiệp</p>
                      </div>

                      <div className="fact-item text-center wow fadeInUp" data-wow-delay="0.6s">
                        <div className="icon-wrapper mb-3">
                          <i className="fas fa-users fa-2x text-info"></i>
                        </div>
                        <h2 className="counter-value mb-2">
                          <Counter target={639} />+
                        </h2>
                        <p className="text-xl">Học Viên Đang Học</p>
                      </div>

                      <div className="fact-item text-center wow fadeInUp" data-wow-delay="0.8s">
                        <div className="icon-wrapper mb-3">
                          <i className="fas fa-star fa-2x text-warning"></i>
                        </div>
                        <h2 className="counter-value mb-2">
                          <Counter target={792} />+
                        </h2>
                        <p className="text-xl">Đánh Giá Tích Cực</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div data-aos="zoom-in">
          <Courseseal />
        </div>

        <div data-aos="zoom-in">
          <Coursefree />
        </div>
        <br />
        <br />
        <br />
        <br />
        <div data-aos="zoom-in">
          {/* feedback area start */}
          <div className="rts-feedback-area">
            <div className="rts-feedback-area rts-section-gap bg-gradient-to-r from-gray-900 via-pink-700 to-gray-600 shape-move small:mb-16 ">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="title-area-center-style text-center animate__animated animate__fadeIn">
                      <div className="pre-title d-flex align-items-center justify-content-center mb-3">
                        <i
                          className="bi bi-lightbulb me-2 text-white text-3xl"
                          style={{
                            color: "#32ADE6",
                            fontSize: "1.5rem",
                            filter:
                              "drop-shadow(0 0 2px rgba(50, 173, 230, 0.3))",
                          }}
                        ></i>
                        <span
                          className="fw-bold text-white text-2xl"
                          style={{
                            letterSpacing: "0.5px",
                            color: "#32ADE6",
                          }}
                        >
                          Đánh giá của sinh viên
                        </span>
                      </div>
                      <h2
                        className="title mb-4 text-white"
                        style={{
                          fontSize: "2.5rem",
                          fontWeight: "700",
                        }}
                      >
                        Phản hồi từ học viên của chúng tôi
                      </h2>
                      <p
                        className="post-title mx-auto"
                        style={{
                          maxWidth: "600px",
                          lineHeight: "1.8",
                          color: "white",
                        }}
                      >
                        Khám phá những trải nghiệm học tập thú vị và đột phá mới
                        trong hành trình phát triển của bạn
                      </p>
                    </div>
                  </div>
                </div>
                <Commenthome />
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div data-aos="zoom-in" className="m-10">
          <div className="container">
            <HorizontalScrollImages />
          </div>

        </div>
        <br />
        <br />
        <br />
        <style jsx>{`
          [data-aos] {
            pointer-events: none;
          }
          [data-aos].aos-animate {
            pointer-events: auto;
          }

          /* Optional: Add custom transitions */
          [data-aos="custom-fade"] {
            opacity: 0;
            transition-property: opacity, transform;

            &.aos-animate {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Optional: Add scroll-based parallax effect */
          .parallax {
            transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }

          @media (prefers-reduced-motion: no-preference) {
            .parallax {
              transform: translateY(var(--parallax-y, 0));
            }
          }
          .fun-facts-area {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          }

          .fact-item {
            padding: 2rem;
            transition: all 0.3s ease;
          }

          .fact-item:hover {
            transform: translateY(-5px);
          }

          .icon-wrapper {
            height: 70px;
            width: 70px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.9);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          }

          .counter-value {
            font-size: 2.5rem;
            font-weight: 700;
            color: #2d3748;
          }

          .fact-label {
            font-size: 1.1rem;
            color: #4a5568;
            margin: 0;
          }
          .why-choose-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            margin: 3rem 0;
          }

          .reason-card {
            padding: 1.5rem;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.05);
            transition: all 0.3s ease;
          }

          .reason-card:hover {
            transform: translateY(-5px);
            background: rgba(255, 255, 255, 0.1);
          }

          .hover-scale {
            transition: transform 0.3s ease;
          }

          .hover-scale:hover {
            transform: scale(1.05);
          }

          .animate-pulse {
            animation: pulse 1s infinite;
          }

          .hover-effect {
            transition: all 0.3s ease;
          }

          .hover-effect:hover {
            transform: translateX(10px);
          }

          @keyframes pulse {
            0% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
            100% {
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

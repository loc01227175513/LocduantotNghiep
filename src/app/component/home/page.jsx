"use client";
import React, { useEffect } from 'react';

import { Commenthome } from "../comment/comment";
import { OutstandingCourse, CourseNew, Courseseal, Coursefree } from "../course/course.component";
import HorizontalScrollImages from "../course/Slider";
import { NextCategory } from "../category/category.component";
import Banner from "../banner/page";
import Image from 'next/image';

import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS in useEffect

export default function Homecomponent() {

  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: false, // Animation will repeat on scroll
      mirror: true, // Elements will animate out while scrolling past them
      easing: 'ease-in-out',
      anchorPlacement: 'center-center',
      offset: 100
    });
  }, []);

  return (
    <div data-aos="zoom-in" data-aos-offset="200" data-aos-duration="1500">
      <div className="mt-60 ">
        <div data-aos="zoom-in">
          <Banner />
        </div>

           <div data-aos="zoom-in" className="m-8 ">
          <HorizontalScrollImages />
        </div>

        <div data-aos="zoom-in ">
          <NextCategory />
        </div>

        <div data-aos="zoom-in">
          <OutstandingCourse />
        </div>
        <div data-aos="zoom-in">
        <div className="why-choose-us bg-blue bg-choose-us-one bg_image rts-section-gap shape-move"
          data-aos="zoom-in">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="why-choose-us-area-image pb--50">
                  <Image width={500} height={300} className="one" src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1728218768/02_atsgze.jpg" alt="why-choose" />
                  <div className="border-img">
                    <Image width={500} height={300} className="two ml--20" src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1728218908/03_grf0on.jpg" alt="why-choose" />
                  </div>
                  <div className="circle-animation">
                    <a className="uni-circle-text uk-background-white dark:uk-background-gray-80 uk-box-shadow-large uk-visible@m" href="#view_in_opensea">
                      <svg className="uni-circle-text-path uk-text-secondary uni-animation-spin" viewBox="0 0 100 100" width={200} height={200}>
                        <defs>
                          <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"></path>
                        </defs>
                        <text fontSize="11.2">
                          <textPath xlinkHref="#circle">
                        Về Univercity • Giới thiệu về ảnh ghép •
                          </textPath>
                        </text>
                      </svg>
                      <i className="fa-regular fa-arrow-up-right" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 pl--90 pl_md--15 mt_md--50 pl_sm--15 pt_sm--50">
                <div className="title-area-left-style mb-5">
                  <div className="pre-title d-flex align-items-center mb-3">
                    <i className="mr-2 bi bi-lightbulb text-warning animate-pulse"></i>
                    <span className="text-white font-weight-bold">Tại sao chọn chúng tôi</span>
                  </div>
                  <h2 className="title text-white display-4 mb-4">
                    Techstudent - Con đường dẫn đến <span className="text-warning">sự xuất sắc</span>
                  </h2>
                  <p className="post-title text-white lead">
                    Chúng tôi đam mê giáo dục và tận tâm cung cấp các nguồn học tập chất lượng cao cho người học ở mọi hoàn cảnh.
                  </p>
                </div>

                <div className="why-choose-grid">
                  {[
                    { img: "01_s9m4hw.png", title: "Chất lượng hàng đầu", desc: "Đội ngũ giảng viên xuất sắc" },
                    { img: "02_vnmc5y.png", title: "Học linh hoạt", desc: "Học mọi lúc, mọi nơi" },
                    { img: "03_gqwcdw.png", title: "Hỗ trợ 24/7", desc: "Luôn sẵn sàng giúp đỡ" },
                    { img: "04_zdj1tq.png", title: "Chứng chỉ giá trị", desc: "Được công nhận toàn cầu" },
                    { img: "05_qkz8ke.png", title: "Cộng đồng lớn", desc: "Kết nối & học hỏi" },
                    { img: "05_qkz8ke.png", title: "Giá cả hợp lý", desc: "Phù hợp mọi đối tượng" },
                  ].map((item, index) => (
                    <div key={index} className="reason-card" data-aos="zoom-in" data-aos-delay={index * 100}>
                      <div className="icon-wrapper">
                        <Image
                          width={500}
                          height={300}
                          src={`https://res.cloudinary.com/dnjakwi6l/image/upload/v1728219100/${item.img}`}
                          alt={item.title}
                          className="hover-scale"
                        />
                      </div>
                      <h4 className="text-white mt-3 mb-2 text-xl"><strong>{item.title}</strong></h4>
                      <p className="text-light  text-xl">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <a href="/page/Cours-Filter" className="rts-btn btn-primary mt-5 hover-effect border-white">
                  <span className="text-white">Xem tất cả các khóa học</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
            <div className="shape-image">
              <div className="shape one" data-speed="0.04" data-revert="true"></div>
              <div className="shape two" data-speed="0.04"></div>
              <div className="shape three" data-speed="0.04"></div>
            </div>
          </div>
        </div>
        </div>
        <div data-aos="zoom-in">
          <CourseNew />
        </div>
        <div data-aos="zoom-in">
        <div className="fun-facts-area bg-gradient py-5" data-aos="zoom-in">
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
                        <span className="counter">65,972</span>+
                      </h2>
                      <p className="text-xl">Tổng Học Viên Đăng Ký</p>
                    </div>

                    <div className="fact-item text-center wow fadeInUp" data-wow-delay="0.4s">
                      <div className="icon-wrapper mb-3">
                        <i className="fas fa-graduation-cap fa-3x text-success"></i>
                      </div>
                      <h2 className="counter-value mb-2">
                        <span className="counter">5,321</span>+
                      </h2>
                      <p className="text-xl">Học Viên Tốt Nghiệp</p>
                    </div>

                    <div className="fact-item text-center wow fadeInUp" data-wow-delay="0.6s">
                      <div className="icon-wrapper mb-3">
                        <i className="fas fa-users fa-3x text-info"></i>
                      </div>
                      <h2 className="counter-value mb-2">
                        <span className="counter">44,239</span>+
                      </h2>
                      <p className="text-xl">Học Viên Đang Học</p>
                    </div>

                    <div className="fact-item text-center wow fadeInUp" data-wow-delay="0.8s">
                      <div className="icon-wrapper mb-3">
                        <i className="fas fa-star fa-3x text-warning"></i>
                      </div>
                      <h2 className="counter-value mb-2">
                        <span className="counter">75,992</span>+
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
        <div data-aos="zoom-in">
        {/* feedback area start */}
        <div className="rts-feedback-area" >
          <div className="rts-feedback-area rts-section-gap bg-light-1 shape-move small:mb-16 ">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="title-area-center-style text-center animate__animated animate__fadeIn">
                    <div className="pre-title d-flex align-items-center justify-content-center mb-3">
                      <i className="bi bi-lightbulb me-2" style={{
                        color: '#32ADE6',
                        fontSize: '1.5rem',
                        filter: 'drop-shadow(0 0 2px rgba(50, 173, 230, 0.3))'
                      }}></i>
                      <span className="fw-bold" style={{
                        letterSpacing: '0.5px',
                        color: '#32ADE6'
                      }}>Đánh giá của sinh viên</span>
                    </div>
                    <h2 className="title mb-4" style={{
                      fontSize: '2.5rem',
                      fontWeight: '700',
                      background: 'linear-gradient(45deg, #32ADE6, #2196F3)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      Phản hồi từ học viên của chúng tôi
                    </h2>
                    <p className="post-title mx-auto" style={{
                      maxWidth: '600px',
                      lineHeight: '1.8',
                      color: '#666'
                    }}>
                      Khám phá những trải nghiệm học tập thú vị và đột phá mới trong hành trình phát triển của bạn
                    </p>
                  </div>
                </div>
              </div>
              <Commenthome />
            </div>
          </div>
        </div>
        </div>
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
          height: 80px;
          width: 80px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
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
          animation: pulse 2s infinite;
        }
      
        .hover-effect {
          transition: all 0.3s ease;
        }
      
        .hover-effect:hover {
          transform: translateX(10px);
        }
      
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
      </div>
    </div>
  )
}
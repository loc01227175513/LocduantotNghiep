"use client";
import React, { useEffect, useState } from "react";
import { Dashboard } from "../../../../service/dashbordStuden/Dashboard-service";
import { KhoaHocDaHoc } from "../../../../service/dashbordStuden/Dashboard-service";

export default function Homedashboardstudent() {
  const [data, setData] = useState([]);
  const [khoahocdahoc, setKhoahocdahoc] = useState([]);

  useEffect(() => {
    Dashboard()
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });

    KhoaHocDaHoc()
      .then((res) => {
        setKhoahocdahoc(res.data);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);

  console.log(data.length);
  console.log(khoahocdahoc.length);
  console.log(data);

  return (
    <div className="overflow-y-scroll col-lg-9 h-lvh">
      <div className="right-sidebar-dashboard">
        <div className="row g-5">
          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
            {/* single dashboard-card */}
            <div className="single-dashboard-card">
              <div className="icon">
                <i className="fa-light fa-book-open-cover" />
              </div>
              <h5 className="title">
                <span className="counter">{data.length}</span>
              </h5>
              <p>Các khóa học ghi danh</p>
            </div>
            {/* single dashboard-card end */}
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
            {/* single dashboard-card */}
            <div className="single-dashboard-card">
              <div className="icon">
                <i className="fa-regular fa-graduation-cap" />
              </div>
              <h5 className="title">
                <span className="counter">
                  {data.reduce(
                    (count, item) =>
                      count +
                      item.khoahocs.filter(
                        (khoahoc) => khoahoc.trangthai === "active"
                      ).length,
                    0
                  )}
                </span>
              </h5>
              <p>Các khóa học tích cực</p>
            </div>
            {/* single dashboard-card end */}
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
            {/* single dashboard-card */}
            <div className="single-dashboard-card">
              <div className="icon">
                <i className="fa-light fa-trophy" />
              </div>
              <h5 className="title">
                <span className="counter">{khoahocdahoc.length}</span>
              </h5>
              <p>Hoàn thành các khóa học</p>
            </div>
            {/* single dashboard-card end */}
          </div>
        </div>
        <div className="row mt--40">
          <div className="col-lg-12">
            {/* in progress course area */}
            <div className="in-progress-course-wrapper title-between-dashboard mb--10">
              <h5 className="title">Các khóa học của tôi</h5>
              <a href="#" className="more">
                Xem tất cả
              </a>
            </div>
            {/* in progress course area end */}
            {/* my course enroll wrapper */}
            <div className="my-course-enroll-wrapper-board">
              {/* single course inroll */}
              <div className="single-course-inroll-board head">
                <div className="name">
                  <p> Khóa học của tôi</p>
                </div>
                <div className="enroll">
                  <p> Giảng viên </p>
                </div>
                <div className="rating">
                  <p> Ngày đăn ký </p>
                </div>
              </div>
              {/* single course inroll end */}
              {/* single course inroll */}
              {data.map((item, itemIndex) =>
                item.khoahocs.map((khoahoc, khoahocIndex) => (
                  <div
                    key={`${itemIndex}-${khoahocIndex}`}
                    className="single-course-inroll-board"
                  >
                    <div className="name">
                      <p>{khoahoc.ten}</p>
                    </div>
                    <div className="enroll">
                      <p>{khoahoc.tenGiangVien} </p>
                    </div>
                    <div className="rating">
                      <p>{khoahoc.
                        updated_at
                      }</p>
                    </div>
                  </div>
                ))
              )}
              {/* single course inroll end */}
            </div>
            {/* my course enroll wrapper end */}
          </div>
        </div>
      </div>
      <style jsx>{`
      @keyframes rainbowGlow {
  0%, 100% {
    filter: hue-rotate(0deg) brightness(1);
    box-shadow: 
      0 0 15px rgba(255, 0, 0, 0.7),
      0 0 30px rgba(255, 165, 0, 0.5),
      0 0 45px rgba(255, 255, 0, 0.3);
  }
  33% {
    filter: hue-rotate(120deg) brightness(1.2);
    box-shadow: 
      0 0 15px rgba(0, 255, 0, 0.7),
      0 0 30px rgba(0, 255, 165, 0.5),
      0 0 45px rgba(0, 255, 255, 0.3);
  }
  66% {
    filter: hue-rotate(240deg) brightness(1.1);
    box-shadow: 
      0 0 15px rgba(0, 0, 255, 0.7),
      0 0 30px rgba(165, 0, 255, 0.5),
      0 0 45px rgba(255, 0, 255, 0.3);
  }
}

@keyframes prismaticShine {
  0%, 100% {
    background: linear-gradient(
      45deg,
      #ff6b6b,
      #4ecdc4,
      #ffbe0b,
      #ff006e
    );
    background-size: 200% 200%;
    background-position: 0% 0%;
  }
  50% {
    background: linear-gradient(
      45deg,
      #4ecdc4,
      #ffbe0b,
      #ff006e,
      #ff6b6b
    );
    background-size: 200% 200%;
    background-position: 100% 100%;
  }
}

.icon {
  animation: rainbowGlow 6s infinite;
}

.icon i {
  background: linear-gradient(
    90deg,
    #ff6b6b,
    #4ecdc4,
    #ffbe0b,
    #ff006e,
    #ff6b6b
  );
  background-size: 500% 100%;
  animation: prismaticShine 4s linear infinite;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.single-dashboard-card {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid transparent;
  background-clip: padding-box;
  backdrop-filter: blur(10px);
  animation: borderGlow 3s infinite;
}

@keyframes borderGlow {
  0%, 100% {
    border-color: rgba(255, 107, 107, 0.5);
    box-shadow: 
      0 0 20px rgba(255, 107, 107, 0.3),
      inset 0 0 20px rgba(255, 107, 107, 0.2);
  }
  33% {
    border-color: rgba(78, 205, 196, 0.5);
    box-shadow: 
      0 0 20px rgba(78, 205, 196, 0.3),
      inset 0 0 20px rgba(78, 205, 196, 0.2);
  }
  66% {
    border-color: rgba(255, 190, 11, 0.5);
    box-shadow: 
      0 0 20px rgba(255, 190, 11, 0.3),
      inset 0 0 20px rgba(255, 190, 11, 0.2);
  }
}

.counter {
  background: linear-gradient(
    to right,
    #ff6b6b,
    #4ecdc4,
    #ffbe0b,
    #ff006e,
    #ff6b6b
  );
  background-size: 500% auto;
  animation: shimmer 4s linear infinite;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 
    2px 2px 4px rgba(0,0,0,0.3),
    0 0 10px rgba(255,255,255,0.5);
}

@keyframes shimmer {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}
      @keyframes sparkle {
  0%, 100% { 
    opacity: 0;
    transform: scale(0) rotate(0deg);
  }
  50% { 
    opacity: 1;
    transform: scale(1.5) rotate(180deg);
  }
}

@keyframes magicRipple {
  0% {
    transform: scale(1);
    opacity: 0.5;
    border: 2px solid rgba(78, 205, 196, 0.5);
  }
  100% {
    transform: scale(2);
    opacity: 0;
    border: 2px solid rgba(78, 205, 196, 0);
  }
}

@keyframes floatWithGlow {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    filter: drop-shadow(0 0 15px rgba(255, 107, 107, 0.6));
  }
  33% {
    transform: translateY(-15px) rotate(5deg);
    filter: drop-shadow(0 15px 15px rgba(78, 205, 196, 0.6));
  }
  66% {
    transform: translateY(-7px) rotate(-5deg);
    filter: drop-shadow(0 7px 15px rgba(255, 142, 83, 0.6));
  }
}

.icon {
  position: relative;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.icon::before,
.icon::after {
  content: '';
  position: absolute;
  inset: -5px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    transparent,
    rgba(78, 205, 196, 0.8),
    rgba(255, 107, 107, 0.8),
    transparent
  );
  animation: magicRipple 2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}

.icon::after {
  animation-delay: -1s;
}

.icon i {
  position: relative;
  z-index: 2;
  animation: floatWithGlow 6s ease-in-out infinite;
}

.single-dashboard-card:hover .icon i {
  animation: sparkle 1.5s ease-in-out infinite;
}

.single-dashboard-card:hover::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, 
    rgba(78, 205, 196, 0.5), 
    rgba(255, 107, 107, 0.5)
  );
  filter: blur(15px);
  z-index: -1;
  transition: opacity 0.3s ease;
}

.single-dashboard-card {
  transform-style: preserve-3d;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.single-dashboard-card:hover {
  transform: 
    perspective(1000px)
    rotateX(10deg)
    rotateY(-10deg)
    translateZ(20px);
  box-shadow: 
    20px 20px 60px rgba(0,0,0,0.05),
    -20px -20px 60px rgba(255,255,255,0.8);
}

.counter {
  display: inline-block;
  animation: textGlow 2s ease-in-out infinite;
}

@keyframes textGlow {
  0%, 100% {
    text-shadow: 
      0 0 5px rgba(78, 205, 196, 0.5),
      0 0 10px rgba(78, 205, 196, 0.3),
      0 0 15px rgba(78, 205, 196, 0.1);
  }
  50% {
    text-shadow: 
      0 0 10px rgba(255, 107, 107, 0.5),
      0 0 20px rgba(255, 107, 107, 0.3),
      0 0 30px rgba(255, 107, 107, 0.1);
  }
}
      @keyframes iconFloat {
  0%, 100% {
    transform: translate3d(0, 0, 0) rotate(0deg);
    filter: drop-shadow(0 0 5px rgba(66, 220, 219, 0.5));
  }
  50% {
    transform: translate3d(0, -10px, 10px) rotate(10deg);
    filter: drop-shadow(0 10px 15px rgba(66, 220, 219, 0.8));
  }
}

@keyframes particleEffect {
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: scale(1.5) rotate(360deg);
    opacity: 0;
  }
}

.icon {
  position: relative;
  font-size: 2em;
  padding: 20px;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  border-radius: 50%;
  animation: iconFloat 3s ease-in-out infinite;
  transform-style: preserve-3d;
  perspective: 1000px;
}

.icon i {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 8px rgba(66, 220, 219, 0.5));
}

.icon::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border-radius: 50%;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.icon::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(5px);
  z-index: -1;
}

.single-dashboard-card:hover .icon::before {
  opacity: 1;
  animation: particleEffect 1s ease-out infinite;
}

.single-dashboard-card:hover .icon i {
  animation: iconSpin 1s ease-in-out;
  transform-origin: center;
}

@keyframes iconSpin {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

/* Add particle animations */
.icon span {
  position: absolute;
  width: 5px;
  height: 5px;
  background: #4ecdc4;
  border-radius: 50%;
  pointer-events: none;
  animation: particleFade 1s linear forwards;
}

@keyframes particleFade {
  0% {
    transform: translate(0, 0);
    opacity: 1;
  }
  100% {
    transform: translate(var(--tx), var(--ty));
    opacity: 0;
  }
}
      /* Add to style jsx block */
@keyframes neonGlow {
  0%, 100% {
    box-shadow: 0 0 10px rgba(66, 220, 219, 0.5),
                0 0 20px rgba(66, 220, 219, 0.3),
                0 0 30px rgba(66, 220, 219, 0.1);
  }
  50% {
    box-shadow: 0 0 20px rgba(66, 220, 219, 0.8),
                0 0 40px rgba(66, 220, 219, 0.6),
                0 0 60px rgba(66, 220, 219, 0.4);
  }
}

@keyframes textShimmer {
  0% {
    background-position: -100%;
  }
  100% {
    background-position: 200%;
  }
}

.single-dashboard-card {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  transform-style: preserve-3d;
  perspective: 1000px;
  animation: neonGlow 3s infinite;
}

.single-dashboard-card:hover {
  transform: translateY(-15px) rotateX(10deg);
  background: rgba(255, 255, 255, 0.2);
}

.single-dashboard-card .title {
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #ff6b6b);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: textShimmer 3s linear infinite;
}

.icon {
  position: relative;
}

.icon::after {
  content: '';
  position: absolute;
  inset: -5px;
  background: conic-gradient(from 0deg, transparent 0%, rgba(66, 220, 219, 0.3) 50%, transparent 100%);
  animation: rotate 3s linear infinite;
  border-radius: 50%;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.counter {
  font-size: 2.5em;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.single-course-inroll-board {
  border-left: 3px solid transparent;
  transition: all 0.3s ease;
}

.single-course-inroll-board:hover {
  border-left: 3px solid #4ecdc4;
  background: linear-gradient(90deg, rgba(78, 205, 196, 0.1), transparent);
  transform: scale(1.02);
}
      @keyframes dashboardCardFloat {
  0% {
    transform: translateY(0) rotate(0deg);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
  50% {
    transform: translateY(-10px) rotate(1deg);
    box-shadow: 0 25px 25px rgba(0,0,0,0.2);
  }
  100% {
    transform: translateY(0) rotate(0deg);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
}

@keyframes iconPulse {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}

@keyframes numberRise {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.single-dashboard-card {
  animation: dashboardCardFloat 6s ease-in-out infinite;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
}

.single-dashboard-card:hover {
  transform: scale(1.05);
  background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
}

.single-dashboard-card .icon {
  animation: iconPulse 2s ease-in-out infinite;
}

.single-dashboard-card .counter {
  display: inline-block;
  animation: numberRise 1s ease-out;
}

@keyframes tableRowHover {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0);
  }
}

.single-course-inroll-board:hover {
  animation: tableRowHover 0.5s ease-in-out;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
}
      `}</style>
    </div>
  );
}
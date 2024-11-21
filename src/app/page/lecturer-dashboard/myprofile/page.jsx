"use client";
import React, { useEffect, useState } from "react";
import { GiangVienHienTai } from "../../../../service/Lecture/Lecture";

export default function Myprofilelecturer() {
  const [lecturer, setLecturer] = useState(null);

  useEffect(() => {
    GiangVienHienTai().then((res) => {
      setLecturer(res.data);
    });
  }, []);

  if (!lecturer) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="col-lg-9 rts-sticky-column-item overflow-y-scroll h-lvh">
      <div className="right-sidebar-my-profile-dash theiaStickySidebar pt--30">
        <h5 className="title">Hồ sơ của tôi</h5>
        {/* single My portfolio start*/}
        <div className="my-single-portfolio-dashed highlight-border">
          <div className="name">Ngày đăng ký</div>
          <div className="value">{lecturer.created_at}</div>
        </div>
        {/* single My portfolio end*/}
        {/* single My portfolio start*/}
        <div className="my-single-portfolio-dashed highlight-border">
          <div className="name">Tên người dùng:</div>
          <div className="value">{lecturer.ten}</div>
        </div>
        {/* single My portfolio end*/}
        {/* single My portfolio start*/}
        <div className="my-single-portfolio-dashed highlight-border">
          <div className="name">E-mail:</div>
          <div className="value">{lecturer.email}</div>
        </div>
        {/* single My portfolio end*/}
        {/* single My portfolio start*/}
        <div className="my-single-portfolio-dashed highlight-border">
          <div className="name">Số điện thoại:</div>
          <div className="value">{lecturer.dienthoai ? lecturer.dienthoai : "chưa có"}</div>
        </div>
        {/* single My portfolio end*/}
        {/* single My portfolio start*/}
        <div className="my-single-portfolio-dashed highlight-border">
          <div className="name">Kỹ năng/nghề nghiệp</div>
          <div className="value">
            {lecturer.trinhdo?.ten}
          </div>
        </div>
        {/* single My portfolio end*/}
        {/* single My portfolio start*/}
        <div className="my-single-portfolio-dashed highlight-border">
          <div className="name">Tiểu sử</div>
          <div className="value">
            {lecturer.tieusu ? lecturer.tieusu : "chưa có"}
          </div>
        </div>
        {/* single My portfolio end*/}
      </div>
      <style>
        {`
        
        
        /* Enhanced animations and styling */
.right-sidebar-my-profile-dash {
  animation: popIn 0.6s ease-out;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
  border-radius: 15px;
  padding: 25px;
}

.my-single-portfolio-dashed {
  animation: slideInFade 0.5s ease-out forwards;
  background: white;
  border-radius: 10px;
  margin: 15px 0;
  padding: 15px 20px;
  position: relative;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

/* Glint animation */
@keyframes glint {
  0% { transform: translateX(-100%) rotate(45deg); }
  100% { transform: translateX(200%) rotate(45deg); }
}

.my-single-portfolio-dashed::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0.8) 50%,
    rgba(255,255,255,0) 100%
  );
  transform: translateX(-100%) rotate(45deg);
}

.my-single-portfolio-dashed:hover::before {
  animation: glint 1.5s ease-in-out;
}

/* Enhanced hover effect */
.my-single-portfolio-dashed:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(72, 149, 239, 0.2);
}

.name {
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.value {
  color: #34495e;
  margin-top: 5px;
  font-size: 1.1rem;
}

.title {
  background: linear-gradient(45deg, #2c3e50, #3498db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.8rem;
  margin-bottom: 25px;
  font-weight: 700;
}
        
        
        /* Add these animations to your CSS */
@keyframes slideInFade {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Add this to your existing CSS or styled-components */
.right-sidebar-my-profile-dash {
  animation: popIn 0.6s ease-out;
}

.my-single-portfolio-dashed {
  animation: slideInFade 0.5s ease-out forwards;
  opacity: 0;
}

/* Staggered animation delays for each section */
.my-single-portfolio-dashed:nth-child(1) { animation-delay: 0.1s; }
.my-single-portfolio-dashed:nth-child(2) { animation-delay: 0.2s; }
.my-single-portfolio-dashed:nth-child(3) { animation-delay: 0.3s; }
.my-single-portfolio-dashed:nth-child(4) { animation-delay: 0.4s; }
.my-single-portfolio-dashed:nth-child(5) { animation-delay: 0.5s; }
.my-single-portfolio-dashed:nth-child(6) { animation-delay: 0.6s; }

/* Hover effect */
.my-single-portfolio-dashed:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

/* Color animations and effects */
@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes colorChange {
  0% { border-color: #4facfe; }
  25% { border-color: #00f2fe; }
  50% { border-color: #7367f0; }
  75% { border-color: #f093fb; }
  100% { border-color: #4facfe; }
}

.right-sidebar-my-profile-dash {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}

.my-single-portfolio-dashed {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 2px solid transparent;
  animation: colorChange 6s linear infinite;
}

.my-single-portfolio-dashed:hover {
  background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85));
  transform: translateY(-3px) scale(1.02);
  border-color: #4facfe;
  box-shadow: 
    0 10px 20px rgba(0,0,0,0.1),
    0 0 20px rgba(79,172,254,0.3);
}

.title {
  background: linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1);
  background-size: 200% auto;
  animation: gradientBG 3s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.name {
  color: #2c3e50;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.1);
  transition: color 0.3s ease;
}

.value {
  background: linear-gradient(120deg, #2c3e50, #3498db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.9;
  transition: opacity 0.3s ease;
}

.my-single-portfolio-dashed:hover .value {
  opacity: 1;
}
/* Base keyframe animations */
@keyframes slideInFade {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Container styles */
.right-sidebar-my-profile-dash {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite, popIn 0.6s ease-out;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}

/* Portfolio item styles */
.my-single-portfolio-dashed {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  margin: 15px 0;
  padding: 15px 20px;
  position: relative;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  animation: slideInFade 0.5s ease-out forwards;
  border: 2px solid #4facfe;
  transition: all 0.3s ease;
}

/* Text styles */
.title {
  color: #2c3e50; /* Fallback */
  background: linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 25px;
}

.name {
  color: #2c3e50;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.value {
  color: #34495e; /* Fallback */
  background: linear-gradient(120deg, #2c3e50, #3498db);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: 5px;
  font-size: 1.1rem;
}

/* Hover effects */
.my-single-portfolio-dashed:hover {
  transform: translateY(-3px) scale(1.02);
  background: white;
  border-color: #4facfe;
  box-shadow: 
    0 10px 20px rgba(0,0,0,0.1),
    0 0 20px rgba(79,172,254,0.3);
}

/* Animation delays */
.my-single-portfolio-dashed:nth-child(1) { animation-delay: 0.1s; }
.my-single-portfolio-dashed:nth-child(2) { animation-delay: 0.2s; }
.my-single-portfolio-dashed:nth-child(3) { animation-delay: 0.3s; }
.my-single-portfolio-dashed:nth-child(4) { animation-delay: 0.4s; }
.my-single-portfolio-dashed:nth-child(5) { animation-delay: 0.5s; }
.my-single-portfolio-dashed:nth-child(6) { animation-delay: 0.6s; }
`}
      </style>
    </div>
  );
}
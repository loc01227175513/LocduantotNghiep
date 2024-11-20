"use client"
import React, { useState } from "react";
import Link from 'next/link';

import Image from 'next/image';
import { useRouter } from 'next/navigation';


const Headerdashboardstudent1 = () => {
  return (
    <div className="col-lg-12">
      <div className="dashboard-banner-area-start bg_image">
        <div className="rating-area-banner-dashboard">
          <div className="stars">
            <span>4.5</span>
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-regular fa-star" />
          </div>
          <p>Giảng viên tiếp thị kỹ thuật số</p>
          <a href="create-course.html" className="create-btn">
            <i className="fa-regular fa-circle-plus" /> Tạo một khóa học mới
          </a>
        </div>
        <div className="author-profile-image-and-name">
          <div className="profile-pic">
            <Image width={500} height={300} src="assets/images/dashboard/01.png" alt="dashboard" />
          </div>
          <div className="name-desig">
            <h1 className="title">Jondam</h1>
            <div className="course-vedio">
              <div className="single">
                <i className="fa-light fa-users" />
                <span>1350 sinh viên</span>
              </div>
              <div className="single">
                <i className="fa-regular fa-video" />
                <span>26 khóa học</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Headerdashboardstudent2 = ({ page }) => {
  const [pagess, setPagess] = useState(page)

  const click = (pages) => {
    setPagess(pages)
  }

  return (
    <>
      <div className="col-lg-3 rts-sticky-column-item h-lvh overflow-y-scroll">
        <div className="left-sindebar-dashboard theiaStickySidebar">
          <div className="dashboard-left-single-wrapper">
            <Link
              href={"/page/lecturer-dashboard"}
              className={`single-item ${pagess === 'home' ? 'active' : ''}`}
              onClick={() => click("home")}
            >
              <i className="fa-light fa-house" />
              <p>Bảng điều khiển</p>
            </Link>

            <Link
              href={"/page/lecturer-dashboard/myprofile"}
              className={`single-item ${pagess === 'hoso' ? 'active' : ''}`}
              onClick={() => click("hoso")}
            >
              <i className="fa-regular fa-user" />
              <p>Hồ sơ của tôi</p>
            </Link>

            <Link
              href={"/page/lecturer-dashboard/khoahocdanghoc"}
              className={`single-item ${pagess === 'khoahoc' ? 'active' : ''}`}
              onClick={() => click("khoahoc")}
            >
              <i className="fa-light fa-graduation-cap" />
              <p>Khóa học đang học</p>
            </Link>

            <Link
              href={"/page/lecturer-dashboard/lichsudonhang"}
              className={`single-item ${pagess === 'lichsudonhang' ? 'active' : ''}`}
              onClick={() => click("lichsudonhang")}
            >
              <i className="fa-sharp fa-light fa-bag-shopping" />
              <p>Lịch sử đơn hàng</p>
            </Link>
          </div>
          <div className="dashboard-left-single-wrapper mt--40">
            <Link href={"/page/lecturer-dashboard/quanlykhoahoc"} className="single-item">
              <i className="fa-light fa-book" />
              <p>Quản lý khóa học</p>
            </Link>

    

            <Link href="announcement.html" className="single-item">
              <i className="fa-solid fa-megaphone" />
              <p>Thông báo</p>
            </Link>

            {/* <Link href="withdrowals.html" className="single-item">
              <i className="fa-regular fa-box" />
              <p>Rút tiền</p>
            </Link> */}
            <Link href="/page/lecturer-dashboard/NhanTinGiangVien" className="single-item">
              <i className="fa-regular fa-box" />
              <p>Nhắn Tin Giảng Viên</p>
            </Link>
          </div>
          <div className="dashboard-left-single-wrapper bbnone mt--40">
            <h4 className="title mb--5">User</h4>
            <Link href="/page/lecturer-dashboard/setting" className="single-item">
              <i className="fa-sharp fa-regular fa-gear" />
              <p>Cài đặt</p>
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .menu-item {
          text-decoration: none;
          color: #4b5563;
        }
        .menu-item:hover {
          transform: translateX(4px);
        }
        .section-title {
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 0.5rem;
        }
        .menu-item {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          margin: 4px 0;
          border-radius: 8px;
          transition: all 0.3s ease;
          color: #4b5563;
          text-decoration: none;
        }

        .menu-item:hover {
          background-color: #f3f4f6;
          transform: translateX(4px);
        }

        .menu-item.active {
          background-color: #2563eb;
          color: white;
        }

        .menu-item i {
          font-size: 18px;
          margin-right: 12px;
          width: 24px;
          text-align: center;
        }

        .menu-item p {
          margin: 0;
          font-weight: 500;
        }

        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 2px solid #e5e7eb;
        }

        .dashboard-left-single-wrapper {
          padding: 16px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .dashboard-left-single-wrapper:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        .single-item {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          margin: 8px 0;
          border-radius: 10px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          color: #4b5563;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          background: white;
        }

        .single-item:hover {
          transform: translateX(8px) scale(1.02);
          background: linear-gradient(145deg, #f3f4f6, #ffffff);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .single-item:hover i {
          transform: rotate(10deg) scale(1.2);
          color: #2563eb;
        }

        .single-item.active {
          background: linear-gradient(145deg, #2563eb, #1d4ed8);
          color: white;
          animation: pulse 1.5s infinite;
        }

        .single-item i {
          font-size: 20px;
          margin-right: 15px;
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: #f8fafc;
          color: #64748b;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .single-item:hover i {
          transform: perspective(400px) rotateY(180deg) scale(1.2);
          background: #2563eb;
          color: white;
          box-shadow: 0 0 15px rgba(37, 99, 235, 0.5);
          animation: floating 2s ease-in-out infinite, iconEffect 1s ease infinite;
        }

        .single-item.active i {
          background: white;
          color: #2563eb;
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
          animation: neonPulse 1.5s ease-in-out infinite alternate;
        }

        .single-item i::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 8px;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3));
          transition: 0.5s;
          opacity: 0;
        }

        .single-item:hover i::after {
          opacity: 1;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(37, 99, 235, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
          }
        }

        @keyframes floating {
          0%,
          100% {
            transform: translateY(0) scale(1.1);
          }
          50% {
            transform: translateY(-5px) scale(1.15);
          }
        }

        @keyframes iconEffect {
          0% {
            filter: hue-rotate(0deg) brightness(1);
          }
          50% {
            filter: hue-rotate(180deg) brightness(1.2);
          }
          100% {
            filter: hue-rotate(360deg) brightness(1);
          }
        }

        @keyframes rainbowGradient {
          0% {
            background: linear-gradient(45deg, #ff0000, #ff7300);
            box-shadow: 0 0 15px #ff0000;
          }
          25% {
            background: linear-gradient(45deg, #ff7300, #00ff00);
            box-shadow: 0 0 15px #ff7300;
          }
          50% {
            background: linear-gradient(45deg, #00ff00, #0066ff);
            box-shadow: 0 0 15px #00ff00;
          }
          75% {
            background: linear-gradient(45deg, #0066ff, #ff00ff);
            box-shadow: 0 0 15px #0066ff;
          }
          100% {
            background: linear-gradient(45deg, #ff00ff, #ff0000);
            box-shadow: 0 0 15px #ff00ff;
          }
        }

        @keyframes neonPulse {
          0% {
            text-shadow: 0 0 7px #fff,
                         0 0 10px #fff,
                         0 0 21px #fff,
                         0 0 42px #2563eb,
                         0 0 82px #2563eb,
                         0 0 92px #2563eb;
          }
          100% {
            text-shadow: 0 0 7px #fff,
                         0 0 10px #fff,
                         0 0 21px #fff,
                         0 0 42px #0ff,
                         0 0 82px #0ff,
                         0 0 102px #0ff;
          }
        }

        .single-item:hover {
          animation: rainbowGradient 4s linear infinite;
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
          transform: scale(1.2);
        }

        .single-item.active {
          animation: neonPulse 1.5s ease-in-out infinite alternate, gradientShift 3s ease infinite;
          color: #fff;
        }

        .single-item:hover::before {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.8),
            transparent
          );
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% {
            left: -100%;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
          // Update the keyframe animations in the style block
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.6);
  }
  50% {
    box-shadow: 0 0 30px 8px rgba(124, 58, 237, 0.3),
                0 0 50px 12px rgba(139, 92, 246, 0.2);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.6);
  }
}

@keyframes rainbowGradient {
  0% {
    background: linear-gradient(45deg, #FF0080, #FF8C00);
    box-shadow: 0 0 25px #FF0080;
  }
  25% {
    background: linear-gradient(45deg, #FF8C00, #00FF00);
    box-shadow: 0 0 25px #FF8C00;
  }
  50% {
    background: linear-gradient(45deg, #00FF00, #00FFFF);
    box-shadow: 0 0 25px #00FF00;
  }
  75% {
    background: linear-gradient(45deg, #00FFFF, #FF00FF);
    box-shadow: 0 0 25px #00FFFF;
  }
  100% {
    background: linear-gradient(45deg, #FF00FF, #FF0080);
    box-shadow: 0 0 25px #FF00FF;
  }
}

@keyframes neonPulse {
  0% {
    text-shadow: 0 0 7px #fff,
                 0 0 10px #fff,
                 0 0 21px #fff,
                 0 0 42px #0ff,
                 0 0 82px #0ff,
                 0 0 92px #f0f;
  }
  50% {
    text-shadow: 0 0 7px #fff,
                 0 0 10px #fff,
                 0 0 21px #fff,
                 0 0 42px #f0f,
                 0 0 82px #f0f,
                 0 0 102px #0ff;
  }
  100% {
    text-shadow: 0 0 7px #fff,
                 0 0 10px #fff,
                 0 0 21px #fff,
                 0 0 42px #0ff,
                 0 0 82px #0ff,
                 0 0 102px #f0f;
  }
}

@keyframes shimmer {
  0% {
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.9) 50%,
      transparent 100%
    );
    left: -100%;
    opacity: 0.8;
  }
  100% {
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.9) 50%,
      transparent 100%
    );
    left: 100%;
    opacity: 0.8;
  }
}

@keyframes gradientShift {
  0% {
    background: linear-gradient(45deg, #FF0080, #FF8C00, #00FF00);
    background-size: 300% 300%;
    background-position: 0% 50%;
  }
  50% {
    background: linear-gradient(45deg, #00FF00, #00FFFF, #FF00FF);
    background-size: 300% 300%;
    background-position: 100% 50%;
  }
  100% {
    background: linear-gradient(45deg, #FF00FF, #FF0080, #FF8C00);
    background-size: 300% 300%;
    background-position: 0% 50%;
  }
}
  .single-item:hover {
  animation: rainbowGradient 4s linear infinite;
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(124, 58, 237, 0.4);
}

.single-item.active {
  animation: neonPulse 1.5s ease-in-out infinite alternate,
             gradientShift 3s ease infinite;
  color: #fff;
  box-shadow: 0 0 40px rgba(139, 92, 246, 0.6);
}

// Add these styles to your existing CSS
.left-sindebar-dashboard {
  position: relative;
  background: linear-gradient(45deg, #1a1a1a, #2d2d2d);
  border-radius: 15px;
  padding: 20px;
  animation: borderGlow 8s linear infinite,
             breathe 4s ease-in-out infinite;
  box-shadow: 0 0 30px rgba(123, 31, 162, 0.5);
}

@keyframes borderGlow {
  0% {
    border: 2px solid #FF0080;
    box-shadow: 0 0 20px #FF0080,
                inset 0 0 20px #FF0080;
  }
  25% {
    border: 2px solid #FF00FF;
    box-shadow: 0 0 20px #FF00FF,
                inset 0 0 20px #FF00FF;
  }
  50% {
    border: 2px solid #00FFFF;
    box-shadow: 0 0 20px #00FFFF,
                inset 0 0 20px #00FFFF;
  }
  75% {
    border: 2px solid #00FF00;
    box-shadow: 0 0 20px #00FF00,
                inset 0 0 20px #00FF00;
  }
  100% {
    border: 2px solid #FF0080;
    box-shadow: 0 0 20px #FF0080,
                inset 0 0 20px #FF0080;
  }
}

@keyframes breathe {
  0%, 100% {
    background: linear-gradient(
      45deg,
      rgba(123, 31, 162, 0.15),
      rgba(103, 58, 183, 0.15)
    );
    transform: scale(1);
  }
  50% {
    background: linear-gradient(
      45deg,
      rgba(103, 58, 183, 0.25),
      rgba(123, 31, 162, 0.25)
    );
    transform: scale(1.02);
  }
}

.theiaStickySidebar::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% {
    left: -100%;
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    left: 100%;
    opacity: 0;
  }
}
.theiaStickySidebar {
  position: relative;
  perspective: 1000px;
  animation: float 6s ease-in-out infinite;
}

.theiaStickySidebar::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(
    45deg,
    #FF0080,
    #FF00FF,
    #00FFFF,
    #00FF00,
    #FFFF00
  );
  background-size: 400% 400%;
  border-radius: 15px;
  animation: borderRotate 8s linear infinite,
             shimmerRainbow 3s linear infinite;
  z-index: -1;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotateX(0deg);
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
  }
  50% {
    transform: translateY(-20px) rotateX(10deg);
    box-shadow: 0 35px 45px rgba(0, 0, 0, 0.1);
  }
}

@keyframes borderRotate {
  0% {
    background-position: 0% 50%;
    filter: hue-rotate(0deg);
  }
  50% {
    background-position: 100% 50%;
    filter: hue-rotate(180deg);
  }
  100% {
    background-position: 0% 50%;
    filter: hue-rotate(360deg);
  }
}

@keyframes shimmerRainbow {
  0% {
    opacity: 0.5;
    background: linear-gradient(
      90deg,
      transparent,
      #FF0080,
      transparent
    );
    transform: translateX(-100%);
  }
  25% {
    opacity: 0.75;
    background: linear-gradient(
      90deg,
      transparent,
      #00FFFF,
      transparent
    );
  }
  50% {
    opacity: 1;
    background: linear-gradient(
      90deg,
      transparent,
      #00FF00,
      transparent
    );
  }
  75% {
    opacity: 0.75;
    background: linear-gradient(
      90deg,
      transparent,
      #FF00FF,
      transparent
    );
  }
  100% {
    opacity: 0.5;
    background: linear-gradient(
      90deg,
      transparent,
      #FF0080,
      transparent
    );
    transform: translateX(100%);
  }
}

@keyframes glowPulse {
  0%, 100% {
    box-shadow: 
      0 0 30px rgba(255, 0, 128, 0.6),
      0 0 60px rgba(255, 0, 255, 0.4),
      0 0 90px rgba(0, 255, 255, 0.2);
  }
  50% {
    box-shadow: 
      0 0 40px rgba(255, 0, 128, 0.8),
      0 0 80px rgba(255, 0, 255, 0.6),
      0 0 120px rgba(0, 255, 255, 0.4);
  }
}
.single-item i {
  font-size: 22px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  position: relative;
  background: linear-gradient(145deg, #f6f7f9, #ffffff);
  box-shadow: 5px 5px 10px #d1d1d1,
              -5px -5px 10px #ffffff;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: iconFloat 3s ease-in-out infinite;
}

.single-item:hover i {
  transform: rotate3d(1, 1, 1, 360deg) scale(1.2);
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  box-shadow: 0 0 25px #6366f1;
  animation: iconGlow 1.5s ease-in-out infinite alternate;
}

@keyframes iconFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-6px) rotate(8deg);
  }
}

@keyframes iconGlow {
  0% {
    filter: brightness(1) drop-shadow(0 0 8px #6366f1);
    transform: scale(1) rotate(0deg);
  }
  50% {
    filter: brightness(1.3) drop-shadow(0 0 12px #8b5cf6);
    transform: scale(1.1) rotate(180deg);
  }
  100% {
    filter: brightness(1) drop-shadow(0 0 8px #6366f1);
    transform: scale(1) rotate(360deg);
  }
}

.single-item.active i {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  animation: activeIconPulse 2s infinite;
}

@keyframes activeIconPulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 20px #3b82f6,
                0 0 40px #2563eb,
                0 0 60px #1d4ed8;
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 0 30px #3b82f6,
                0 0 60px #2563eb,
                0 0 90px #1d4ed8;
  }
}

.single-item i::after {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, #ff0080, #7928ca, #3b82f6);
  border-radius: 12px;
  z-index: -1;
  animation: borderRotate 3s linear infinite;
  opacity: 0;
  transition: opacity 0.3s;
}

.single-item:hover i::after {
  opacity: 1;
}




      `}</style>
    </>
  )
}

export { Headerdashboardstudent1, Headerdashboardstudent2 }
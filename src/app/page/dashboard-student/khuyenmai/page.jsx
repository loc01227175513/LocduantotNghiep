"use client";
import React, { useState, useEffect } from 'react';
import { showAllNguoiDungMaGiamGia } from '../../../../service/khuyenmai/khuyenmai';

const voucherStyles = `
  @keyframes float {
    0% { transform: translateY(0) rotate(0deg); }
    25% { transform: translateY(-15px) rotate(1deg); }
    75% { transform: translateY(15px) rotate(-1deg); }
    100% { transform: translateY(0) rotate(0deg); }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  
  @keyframes borderRotate {
    0% { border-image: linear-gradient(0deg, #ff6b6b, #4ecdc4) 1; }
    100% { border-image: linear-gradient(360deg, #ff6b6b, #4ecdc4) 1; }
  }
  
  @keyframes ripple {
    0% { box-shadow: 0 0 0 0 rgba(78, 205, 196, 0.4); }
    100% { box-shadow: 0 0 0 20px rgba(78, 205, 196, 0); }
  }
  
  @keyframes fadeInUp {
    from { 
      opacity: 0;
      transform: translateY(30px) scale(0.9);
    }
    to { 
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  .voucher-card {
    background: linear-gradient(90deg, #fff, #f0f0f0, #fff);
    background-size: 200% 100%;
    animation: 
      float 8s ease-in-out infinite,
      shimmer 3s linear infinite,
      fadeInUp 0.6s ease-out backwards;
    border: 3px solid;
    border-image: linear-gradient(45deg, #ff6b6b, #4ecdc4) 1;
    transition: all 0.3s ease;
    border-radius: 10px;
    backdrop-filter: blur(5px);
    background: rgba(255, 255, 255, 0.95);
  }
  
  .voucher-card:hover {
    transform: scale(1.05) translateY(-5px);
    animation: 
      float 8s ease-in-out infinite,
      shimmer 3s linear infinite,
      ripple 1.5s infinite,
      borderRotate 2s linear infinite;
    cursor: pointer;
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
    @keyframes float {
    0% { transform: perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0); }
    25% { transform: perspective(1000px) rotateX(2deg) rotateY(-2deg) translateZ(10px); }
    75% { transform: perspective(1000px) rotateX(-2deg) rotateY(2deg) translateZ(20px); }
    100% { transform: perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0); }
  }

  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(255, 107, 107, 0.5), 0 0 30px rgba(78, 205, 196, 0.3); }
    50% { box-shadow: 0 0 40px rgba(255, 107, 107, 0.7), 0 0 50px rgba(78, 205, 196, 0.5); }
  }

  .voucher-card {
    background: linear-gradient(-45deg, #f7f7f7, #ffffff, #eef7f6, #fff5f5);
    background-size: 400% 400%;
    animation: 
      float 6s ease-in-out infinite,
      gradient 15s ease infinite,
      glow 3s ease-in-out infinite;
    border: none;
    border-radius: 15px;
    padding: 25px !important;
    position: relative;
    backdrop-filter: blur(10px);
    transform-style: preserve-3d;
    box-shadow: 
      0 15px 35px rgba(0,0,0,0.1),
      0 3px 10px rgba(0,0,0,0.05);
  }

  .voucher-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, #ff6b6b22, #4ecdc422);
    border-radius: 15px;
    z-index: -1;
    transform: translateZ(-1px);
  }

  .voucher-card h2 {
    color: #2d3436;
    font-weight: 700;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    transform: translateZ(20px);
  }

  .voucher-card p {
    color: #636e72;
    font-size: 0.95rem;
    margin: 0.5rem 0;
    transform: translateZ(15px);
  }

  .voucher-card:hover {
    transform: perspective(1000px) scale(1.02) translateY(-5px) rotateX(5deg);
    box-shadow: 
      0 20px 40px rgba(0,0,0,0.12),
      0 5px 15px rgba(0,0,0,0.08);
  }
        @keyframes rainbow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes neonPulse {
    0%, 100% { 
      box-shadow: 
        0 0 15px rgba(255,0,0,0.5),
        0 0 25px rgba(0,255,0,0.5),
        0 0 35px rgba(0,0,255,0.5);
    }
    50% { 
      box-shadow: 
        0 0 25px rgba(255,0,0,0.8),
        0 0 45px rgba(0,255,0,0.8),
        0 0 65px rgba(0,0,255,0.8);
    }
  }

  @keyframes rotate3D {
    0% { transform: rotate3d(1, 1, 1, 0deg); }
    100% { transform: rotate3d(1, 1, 1, 360deg); }
  }

  .voucher-card {
    background: linear-gradient(
      45deg, 
      #ff6b6b, #4ecdc4, #45b7d1, #a8e6cf, #ff6b6b
    );
    background-size: 500% 500%;
    animation: 
      rainbow 15s ease infinite,
      neonPulse 3s infinite;
    border: none;
    border-radius: 15px;
    padding: 25px !important;
    position: relative;
    backdrop-filter: blur(10px);
    transform-style: preserve-3d;
    transition: all 0.5s ease;
  }

  .voucher-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    z-index: -1;
  }

  .voucher-card::after {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(45deg, 
      rgba(255,107,107,0.5), 
      rgba(78,205,196,0.5)
    );
    border-radius: 17px;
    z-index: -2;
    filter: blur(15px);
  }

  .voucher-card:hover {
    transform: 
      perspective(1000px) 
      rotateX(10deg) 
      rotateY(10deg) 
      translateZ(20px);
    animation: 
      rainbow 8s ease infinite,
      neonPulse 2s infinite;
  }

  .voucher-card h2 {
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 800;
    text-shadow: 3px 3px 6px rgba(0,0,0,0.2);
  }

  .voucher-card p {
    color: white;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
    font-weight: 500;
  }
    .voucher-card h2 {
    background: linear-gradient(45deg, #FF416C, #FF4B2B);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    animation: textShine 3s ease-in-out infinite;
  }

  .voucher-card p {
    background: linear-gradient(120deg, #2193b0, #6dd5ed);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 1.1rem;
    font-weight: 600;
    line-height: 1.6;
    margin: 0.7rem 0;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
    transform: translateZ(5px);
    transition: all 0.3s ease;
  }

  .voucher-card p:hover {
    transform: translateZ(10px) scale(1.05);
    text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
  }

  @keyframes textShine {
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

  .voucher-card p:nth-child(2) {
    background: linear-gradient(45deg, #FF416C, #FF4B2B);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 1.2rem;
    font-weight: 700;
  }

  .voucher-card p:nth-child(3) {
    background: linear-gradient(45deg, #11998e, #38ef7d);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .voucher-card p:nth-child(4) {
    background: linear-gradient(45deg, #4e54c8, #8f94fb);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .voucher-card p:nth-child(5) {
    background: linear-gradient(45deg, #fc4a1a, #f7b733);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .voucher-card p:nth-child(6), 
  .voucher-card p:nth-child(7) {
    background: linear-gradient(45deg, #00b09b, #96c93d);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
      .icon-wrapper {
    position: absolute;
    font-size: 1.5rem;
    animation: iconFloat 3s ease-in-out infinite;
  }

  @keyframes iconFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .icon-discount {
    top: 20px;
    right: 20px;
    color: #FF416C;
    text-shadow: 0 0 10px rgba(255, 65, 108, 0.5);
  }

  .icon-calendar {
    bottom: 20px;
    left: 20px;
    color: #4ecdc4;
    text-shadow: 0 0 10px rgba(78, 205, 196, 0.5);
  }

  .icon-status {
    top: 50%;
    right: 20px;
    color: #f7b733;
    text-shadow: 0 0 10px rgba(247, 183, 51, 0.5);
  }

  .voucher-card:hover .icon-wrapper {
    animation: iconPulse 1s ease-in-out infinite;
  }

  @keyframes iconPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
    @keyframes holographic {
  0% { filter: hue-rotate(0deg) brightness(1); }
  50% { filter: hue-rotate(180deg) brightness(1.2); }
  100% { filter: hue-rotate(360deg) brightness(1); }
}

@keyframes floatIcon {
  0% { transform: translate3d(0, 0, 0) rotate(0deg); }
  25% { transform: translate3d(5px, -5px, 20px) rotate(5deg); }
  75% { transform: translate3d(-5px, 5px, -10px) rotate(-5deg); }
  100% { transform: translate3d(0, 0, 0) rotate(0deg); }
}

.voucher-card {
  background: linear-gradient(135deg, 
    rgba(255,255,255,0.4), 
    rgba(255,255,255,0.2), 
    rgba(255,255,255,0.1)
  );
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.2);
  box-shadow: 
    0 8px 32px rgba(31,38,135,0.15),
    inset 0 0 32px rgba(255,255,255,0.1);
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.voucher-card:hover {
  transform: 
    translateY(-10px) 
    rotateX(10deg) 
    rotateY(10deg) 
    scale(1.02);
  animation: holographic 3s infinite;
  box-shadow: 
    0 15px 35px rgba(31,38,135,0.25),
    inset 0 0 50px rgba(255,255,255,0.2);
}

.voucher-card h2 {
  font-size: 2rem;
  background: linear-gradient(to right, #ff6b6b, #4ecdc4, #45b7d1, #ff6b6b);
  background-size: 300% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient 3s linear infinite;
  transform: translateZ(30px);
}

.icon-wrapper {
  transform-style: preserve-3d;
  animation: floatIcon 3s ease-in-out infinite;
}

.icon-wrapper i {
  font-size: 1.8rem;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 10px rgba(255,255,255,0.5));
}

.voucher-card p {
  transform: translateZ(20px);
  transition: all 0.3s ease;
  background: linear-gradient(45deg, #2193b0, #6dd5ed);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.voucher-card p:hover {
  transform: translateZ(40px) scale(1.1);
  filter: brightness(1.2);
}

@keyframes particleAnimation {
  0% { transform: translate(0, 0); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translate(100px, -100px); opacity: 0; }
}

.voucher-card::after {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, 
    rgba(255,107,107,0.5), 
    rgba(78,205,196,0.5)
  );
  filter: blur(15px);
  z-index: -1;
  animation: holographic 3s infinite;
}

@media (prefers-reduced-motion: no-preference) {
  .voucher-card {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .voucher-card:hover {
    transform: translateY(-10px) scale(1.02);
  }
}
`;
const headerStyles = `
  .page-title {
    font-size: 3rem;
    font-weight: 800;
    text-align: center;
    margin: 2rem 0;
    position: relative;
    background: linear-gradient(45deg, #FF416C, #FF4B2B, #4ecdc4, #45b7d1);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    animation: gradient 8s ease infinite;
    transform-style: preserve-3d;
    perspective: 1000px;
  }

  .page-title::before,
  .page-title::after {
    content: '★';
    position: absolute;
    font-size: 2rem;
    top: 50%;
    transform: translateY(-50%);
    animation: starPulse 2s ease-in-out infinite;
    background: linear-gradient(45deg, #FF416C, #4ecdc4);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .page-title::before {
    left: -3rem;
  }

  .page-title::after {
    right: -3rem;
  }

  @keyframes starPulse {
    0%, 100% { transform: translateY(-50%) scale(1); }
    50% { transform: translateY(-50%) scale(1.2); }
  }

  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .page-title:hover {
    animation: headShake 1s ease-in-out;
    text-shadow: 0 0 20px rgba(255, 65, 108, 0.5);
  }

  @keyframes headShake {
    0% { transform: translateX(0); }
    6.5% { transform: translateX(-6px) rotateY(-9deg); }
    18.5% { transform: translateX(5px) rotateY(7deg); }
    31.5% { transform: translateX(-3px) rotateY(-5deg); }
    43.5% { transform: translateX(2px) rotateY(3deg); }
    50% { transform: translateX(0); }
  }
    .page-title {
  font-size: 4rem;
  background: linear-gradient(45deg, 
    #ff6b6b, #4ecdc4, #45b7d1, #ff6b6b
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient 5s ease infinite;
  text-shadow: 
    0 0 20px rgba(255,107,107,0.5),
    0 0 40px rgba(78,205,196,0.3);
  letter-spacing: 4px;
  transform-style: preserve-3d;
}
`;

export default function VoucherPage() {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const fetchVouchers = async () => {
      showAllNguoiDungMaGiamGia()
        .then((response) => {
          setVouchers(response);
        })
        .catch((error) => {
          console.error('Fetch error:', error);
          alert("Failed to fetch vouchers.");
        });
    };

    fetchVouchers();
  }, []);

  return (
    <div className="overflow-y-scroll col-lg-9 h-lvh" style={{ backgroundColor: '#f5f5f5' }}>
      <style>{voucherStyles}</style>
      <div className="exrolled-course-wrapper-dashed">
        <div className="voucher-page container">
        <style>{headerStyles}</style>
        <h1 className="page-title">Kho Voucher</h1>
          <div className="voucher-list row justify-content-end">
            {vouchers.map((voucher, index) => (
             <div 
             key={voucher.id} 
             className="voucher-card col-md-4" 
             style={{ 
               position: 'relative',
               border: '3px solid',
               padding: '20px', 
               margin: '10px', 
               animationDelay: `${index * 0.15}s`,
             }}
           >
             <i className="fas fa-ticket-alt icon-wrapper icon-discount"></i>
             <h2>{voucher.magiamgia.maso}</h2>
             <p><i className="fas fa-percentage"></i> Giảm giá: {voucher.magiamgia.giamgia}%</p>
             <p><i className="fas fa-users"></i> Giới hạn sử dụng: {voucher.dasudunghientai}</p>
             <p><i className="fas fa-history"></i> Cách sử dụng hiện tại: {voucher.magiamgia.sudunghientai}</p>
             <p><i className="fas fa-check-circle"></i> Trạng thái: {voucher.magiamgia.trangthai}</p>
             <p><i className="fas fa-calendar-plus"></i> Ngày bắt đầu: {voucher.magiamgia.ngaybatdau}</p>
             <p><i className="fas fa-calendar-times"></i> Ngày hết hạn: {voucher.magiamgia.ngayketthuc}</p>
             <i className="fas fa-star icon-wrapper icon-status"></i>
             <i className="fas fa-calendar icon-wrapper icon-calendar"></i>
           </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
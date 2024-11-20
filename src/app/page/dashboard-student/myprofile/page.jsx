"use client";
"use strict";
import React, { useState, useEffect } from "react";
import { user } from "../../../../service/User/user";
const styles = `@keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(30px) scale(0.9);
    }
    50% {
      opacity: 0.5;
      transform: translateY(15px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .card-hover:hover {
    animation: float 2s ease-in-out infinite, borderGlow 2s ease-in-out infinite;
    background: linear-gradient(135deg, #f0f7ff 0%, #e6f0ff 100%);
    box-shadow: 0 10px 20px rgba(0,118,255,0.15), 0 0 20px rgba(0,118,255,0.1) inset;
    transform: translateY(-2px);
  }

  .shimmer {
    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0) 100%);
    background-size: 200% 100%;
    animation: shimmer 3s infinite linear;
  }

  .icon-animate {
    animation: iconFloat 2s ease-in-out infinite, iconGlow 2s ease-in-out infinite;
    background: linear-gradient(120deg, #4da6ff 0%, #0066ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.3s ease;
  }

  .icon-animate:hover {
    animation: iconPop 0.5s ease-in-out;
    filter: hue-rotate(45deg);
  }

  .text-gradient {
    background: linear-gradient(90deg, #0066ff 0%, #4da6ff 25%, #0066ff 50%, #4da6ff 75%, #0066ff 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: textGradient 8s linear infinite;
  }

  .label-text {
    transition: all 0.3s ease;
    position: relative;
  }

  .label-text:hover {
    animation: textPop 0.5s ease-out;
    color: #0066ff;
  }

  .label-text::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background: linear-gradient(90deg, #0066ff, #4da6ff);
    transition: width 0.3s ease;
  }

  .label-text:hover::after {
    width: 100%;
  }

  .value-text {
    transition: all 0.3s ease;
    background: linear-gradient(120deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 4px;
    padding: 0.5rem;
  }

  .value-text:hover {
    background: linear-gradient(120deg, #e9ecef 0%, #dee2e6 100%);
    transform: translateX(5px);
  }

  /* Removed redundant keyframes: iconFloat and others were duplicates */
  
`;
export default function Myprofilestudent() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    user().then((data) => {
      setUserData(data.data);
    });
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }
  console.log(userData);

  return (
    <>
      <style>{styles}</style>
      <div className="overflow-y-scroll col-lg-9 rts-sticky-column-item h-lvh bg-gradient">
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-8">
            <h5 className="text-3xl font-bold mb-8 text-center text-gradient animate-fade-in">
              Hồ sơ của tôi
            </h5>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                { label: "NHẬN DẠNG", value: userData.id, icon: "🆔" },
                { label: "Tên", value: userData.ten, icon: "👤" },
                { label: "E-mail", value: userData.email, icon: "📧" },
                { label: "Số điện thoại", value: userData.dienthoai, icon: "📱" },
                { label: "Profile Picture", value: userData.hinh, icon: "🖼️" },
                { label: "Vai trò", value: userData.vaitro, icon: "👑" },
                { label: "Được tạo ra tại", value: userData.created_at, icon: "🕒" },
                { label: "Cập nhật tại", value: userData.updated_at, icon: "🔄" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="card-hover bg-white rounded-lg shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-slide-up"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0,
                    animation: `slideUp 0.5s ease-out ${index * 0.1}s forwards`,
                  }}
                >
                  <div className="p-4 border-b border-gray-100 flex items-center group">
                    <span className={`text-2xl mr-3 transition-all duration-300 
                      ${index % 3 === 0 ? 'icon-float' : 
                        index % 3 === 1 ? 'icon-pulse' : 'icon-spin'}`}
                      style={{
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden'
                      }}
                    >
                      {item.icon}
                    </span>
                    <span className="font-semibold text-gray-700 label-text group-hover:text-indigo-600 transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-b-lg hover:bg-indigo-50 transition-colors duration-300">
                    <p className="text-gray-800 break-words value-text">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
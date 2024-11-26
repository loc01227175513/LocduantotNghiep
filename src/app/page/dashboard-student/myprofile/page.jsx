"use client";
"use strict";
import React, { useState, useEffect } from "react";
import { user } from "../../../../service/User/user";
// const styles = `@keyframes fadeInUp {
//     0% {
//       opacity: 0;
//       transform: translateY(30px) scale(0.9);
//     }
//     50% {
//       opacity: 0.5;
//       transform: translateY(15px) scale(0.95);
//     }
//     100% {
//       opacity: 1;
//       transform: translateY(0) scale(1);
//     }
//   }

//   @keyframes shimmer {
//     0% {
//       background-position: -1000px 0;
//     }
//     100% {
//       background-position: 1000px 0;
//     }
//   }

//   @keyframes float {
//     0%, 100% { transform: translateY(0); }
//     50% { transform: translateY(-5px); }
//   }

//   @keyframes pulse {
//     0%, 100% { transform: scale(1); }
//     50% { transform: scale(1.1); }
//   }

//   @keyframes spin {
//     from { transform: rotate(0deg); }
//     to { transform: rotate(360deg); }
//   }

//   @keyframes slideUp {
//     from {
//       opacity: 0;
//       transform: translateY(20px);
//     }
//     to {
//       opacity: 1;
//       transform: translateY(0);
//     }
//   }

//   @keyframes fadeIn {
//     from {
//       opacity: 0;
//     }
//     to {
//       opacity: 1;
//     }
//   }

//   .card-hover:hover {
//     animation: float 2s ease-in-out infinite, borderGlow 2s ease-in-out infinite;
//     background: linear-gradient(135deg, #f0f7ff 0%, #e6f0ff 100%);
//     box-shadow: 0 10px 20px rgba(0,118,255,0.15), 0 0 20px rgba(0,118,255,0.1) inset;
//     transform: translateY(-2px);
//   }

//   .shimmer {
//     background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0) 100%);
//     background-size: 200% 100%;
//     animation: shimmer 3s infinite linear;
//   }

//   .icon-animate {
//     animation: iconFloat 2s ease-in-out infinite, iconGlow 2s ease-in-out infinite;
//     background: linear-gradient(120deg, #4da6ff 0%, #0066ff 100%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     transition: all 0.3s ease;
//   }

//   .icon-animate:hover {
//     animation: iconPop 0.5s ease-in-out;
//     filter: hue-rotate(45deg);
//   }

//   .text-gradient {
//     background: linear-gradient(90deg, #0066ff 0%, #4da6ff 25%, #0066ff 50%, #4da6ff 75%, #0066ff 100%);
//     background-size: 200% auto;
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     animation: textGradient 8s linear infinite;
//   }

//   .label-text {
//     transition: all 0.3s ease;
//     position: relative;
//   }

//   .label-text:hover {
//     animation: textPop 0.5s ease-out;
//     color: #0066ff;
//   }

//   .label-text::after {
//     content: '';
//     position: absolute;
//     width: 0;
//     height: 2px;
//     bottom: -2px;
//     left: 0;
//     background: linear-gradient(90deg, #0066ff, #4da6ff);
//     transition: width 0.3s ease;
//   }

//   .label-text:hover::after {
//     width: 100%;
//   }

//   .value-text {
//     transition: all 0.3s ease;
//     background: linear-gradient(120deg, #f8f9fa 0%, #e9ecef 100%);
//     border-radius: 4px;
//     padding: 0.5rem;
//   }

//   .value-text:hover {
//     background: linear-gradient(120deg, #e9ecef 0%, #dee2e6 100%);
//     transform: translateX(5px);
//   }

//   /* Removed redundant keyframes: iconFloat and others were duplicates */
  
// `;
export default function Myprofilestudent() {
  const [userData, setUserData] = useState(null);
  const calculateMinutesDifference =(date) => { 
    const now = new Date(); 
    const pastDate = new Date(date); 
  
    const diffInMs = now.getTime() - pastDate.getTime();
    
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  
    if (diffInMinutes > 10080) {
      return date.split("T")[0]; 
    } else if (diffInMinutes > 1440) { 
      return `${Math.floor(diffInMinutes / 1440)} ngày trước`; 
    } else if (diffInMinutes >= 60) {
      return `${Math.floor(diffInMinutes / 60)} giờ trước`; 
    } else if (diffInMinutes < 60) { 
      return `${diffInMinutes} phút trước`;
    }
  
    return `${diffInMinutes} phút trước`;
  }
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
    <div className="col-lg-9 rts-sticky-column-item overflow-y-scroll ịadkljas">
      <div className="right-sidebar-my-profile-dash theiaStickySidebar pt--30">
        <p className="text-black font-bold text-3xl">Hồ sơ của tôi</p>
       <div className="p-4">
       <div className="my-single-portfolio-dashed  mt-6">
          <div className="name">Ngày đăng ký</div>
          <div className="value "><p className="p-0 m-0 ">{calculateMinutesDifference(userData.created_at)}</p></div>
        </div>

        <div className="my-single-portfolio-dashed ">
          <div className="name">Tên người dùng:</div>
          <div className="value"><p>{userData.ten}</p></div>
        </div>

        <div className="my-single-portfolio-dashed ">
          <div className="name">E-mail:</div>
          <div className="value"><p>{userData.email}</p></div>
        </div>

        <div className="my-single-portfolio-dashed ">
          <div className="name">Số điện thoại:</div>
          <div className="value"><p>{userData.dienthoai ? userData.dienthoai : "chưa có"}</p></div>
        </div>



       </div>
      </div>

    </div>
  );
}
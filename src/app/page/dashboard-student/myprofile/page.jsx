"use client";
"use strict";
import React, { useState, useEffect } from "react";
import { user } from "../../../../service/User/user";

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
    <div className="col-lg-9 rts-sticky-column-item overflow-y-scroll ịadkljas" style={{fontFamily: 'Helvetica Neue, sans-serif'}}>
      <div className="right-sidebar-my-profile-dash theiaStickySidebar pt--30">
        <p className="text-[#222222] font-semibold text-left text-[1.375rem] leading-7 mb-4">Hồ sơ của tôi</p>
       <div className="p-4">
       <div className="my-single-portfolio-dashed mt-6">
          <div className="name text-[#555555] text-xl">Ngày đăng ký</div>
          <div className="value"><p className="p-0 m-0 text-[#222222] text-xl">{calculateMinutesDifference(userData.created_at)}</p></div>
        </div>

        <div className="my-single-portfolio-dashed">
          <div className="name text-[#555555] text-xl">Tên người dùng:</div>
          <div className="value"><p className="text-[#222222] text-xl">{userData.ten}</p></div>
        </div>

        <div className="my-single-portfolio-dashed">
          <div className="name text-[#555555] text-xl">E-mail:</div>
          <div className="value"><p className="text-[#222222] text-xl">{userData.email}</p></div>
        </div>

        <div className="my-single-portfolio-dashed">
          <div className="name text-[#555555] text-xl">Số điện thoại:</div>
          <div className="value"><p className="text-[#222222] text-xl">{userData.dienthoai ? userData.dienthoai : "chưa có"}</p></div>
        </div>
       </div>
      </div>
    </div>
  );
}
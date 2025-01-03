"use client";
import React, { useEffect, useState } from "react";
import { GiangVienHienTai } from "../../../../service/Lecture/Lecture";
import { ImSpinner9 } from "react-icons/im";

export default function Myprofilelecturer() {
  const [lecturer, setLecturer] = useState(null);

  useEffect(() => {
    GiangVienHienTai().then((res) => {
      setLecturer(res.data);
    });
  }, []);
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

  if (!lecturer) {
    return (
      <div className="col-lg-9 rts-sticky-column-item overflow-y-scroll ịadkljas">
      <div className="right-sidebar-my-profile-dash theiaStickySidebar pt--30">
      <div className="flex items-center justify-center ">
        <ImSpinner9 className="animate-spin text-4xl text-blue-500" />
        <span className="ml-2 text-gray-600">Đang tải...</span>
        </div>
      </div>
      </div>
    );
  }

  return (

    <div className="col-lg-9 rts-sticky-column-item overflow-y-scroll ịadkljas">
      <div className="right-sidebar-my-profile-dash theiaStickySidebar pt--30">
        <p className="text-black font-bold text-[20px] ">Hồ sơ của tôi</p>
       <div className="p-4">
       <div className="my-single-portfolio-dashed  mt-6">
          <div className="name text-[14px]">Ngày đăng ký</div>
          <div className="value "><p className="p-0 m-0 text-[14px]">{calculateMinutesDifference(lecturer.created_at)}</p></div>
        </div>

        <div className="my-single-portfolio-dashed ">
          <div className="name text-[14px]">Tên người dùng:</div>
          <div className="value"><p className="p-0 m-0 text-[14px]">{lecturer.ten}</p></div>
        </div>

        <div className="my-single-portfolio-dashed ">
          <div className="name text-[14px]">E-mail:</div>
          <div className="value"><p className="p-0 m-0 text-[14px]">{lecturer.email}</p></div>
        </div>

        <div className="my-single-portfolio-dashed ">
          <div className="name text-[14px]">Số điện thoại:</div>
          <div className="value"><p className="p-0 m-0 text-[14px]">{lecturer.dienthoai ? lecturer.dienthoai : "chưa có"}</p></div>
        </div>

        <div className="my-single-portfolio-dashed ">
          <div className="name text-[14px]">Kỹ năng/nghề nghiệp</div>
          <div className="value">
              <p className="p-0 m-0 text-[14px]">
              {lecturer.trinhdo?.ten}

              </p>
          </div>
        </div>

        <div className="my-single-portfolio-dashed highlight-border">
          <div className="name text-[14px]">Tiểu sử</div>
          <div className="value">
            <p className="p-0 m-0 text-[14px]">
            {lecturer.tieusu ? lecturer.tieusu : "chưa có"}
            </p>
          </div>
        </div>
       </div>
      </div>

    </div>
  );
}
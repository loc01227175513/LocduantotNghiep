"use client";
import React, { useEffect, useState } from "react";
import { Dashboard } from "../../../../service/dashbordStuden/Dashboard-service";
import { KhoaHocDaHoc } from "../../../../service/dashbordStuden/Dashboard-service";

export default function Homedashboardstudent() {
  const [data, setData] = useState([]);
  const [khoahocdahoc, setKhoahocdahoc] = useState([]);
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
              <div className="icon w-10" >
              <i className="fal fa-book-open"  style={{fontSize: "20px"}}/>
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
                <i className="fa-regular fa-graduation-cap "  style={{fontSize: "20px"}}/>
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
                <i className="fa-light fa-trophy" style={{fontSize: "20px"}}/>
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
              <h5 className="title text-xl" >Các khóa học của tôi</h5>
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
                  <p> Ngày đăng ký </p>
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
                      <p>{calculateMinutesDifference(khoahoc.
                        updated_at)
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

    </div>
  );
}
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
      <div className="col-lg-3 rts-sticky-column-item ịadkljas overflow-y-scroll">
        <div className="left-sindebar-dashboard theiaStickySidebar">
          <div className="dashboard-left-single-wrapper">
            <Link
              href={"/page/lecturer-dashboard"}
              className={`single-item ${pagess === 'home' ? 'active' : ''}`}
              onClick={() => click("home")}
            >
              <i className="fa-light fa-house text-2xl" />
              <p>Bảng điều khiển</p>
            </Link>

            <Link
              href={"/page/lecturer-dashboard/myprofile"}
              className={`single-item ${pagess === 'hoso' ? 'active' : ''}`}
              onClick={() => click("hoso")}
            >
              <i className="fa-regular fa-user text-2xl" />
              <p>Hồ sơ của tôi</p>
            </Link>

            <Link
              href={"/page/lecturer-dashboard/khoahocdanghoc"}
              className={`single-item ${pagess === 'khoahoc' ? 'active' : ''}`}
              onClick={() => click("khoahoc")}
            >
              <i className="fa-light fa-graduation-cap text-2xl" />
              <p>Khóa học đang dạy</p>
            </Link>

            <Link
              href={"/page/lecturer-dashboard/lichsudonhang"}
              className={`single-item ${pagess === 'lichsudonhang' ? 'active' : ''}`}
              onClick={() => click("lichsudonhang")}
            >
              <i className="fa-sharp fa-light fa-bag-shopping text-2xl" />
              <p>Lịch sử đơn hàng</p>
            </Link>
            <Link 
              href={"/page/lecturer-dashboard/quanlykhoahoc"} 
              className={`single-item ${pagess === 'quanlykhoahoc' ? 'active' : ''}`}
              onClick={() => click("quanlykhoahoc")}
            >
              <i className="fa-light fa-cogs text-2xl" />
              <p>Quản lý khóa học</p>
            </Link>
            <Link 
              href={"/page/lecturer-dashboard/NhanTinGiangVien"} 
              className={`single-item ${pagess === 'NhanTinGiangVien' ? 'active' : ''}`}
              onClick={() => click("NhanTinGiangVien")}
            >
              <i className="fa-light fa-comments text-2xl" />
              <p>Nhắn tin</p>
            </Link>
            <Link 
              href={"/page/lecturer-dashboard/DanhGiaKhoaHoc"} 
              className={`single-item ${pagess === 'DanhGiaKhoaHoc' ? 'active' : ''}`}
              onClick={() => click("DanhGiaKhoaHoc")}
            >
              <i className="fa-light fa-star text-2xl" />
              <p>Đánh giá khóa học</p>
            </Link>

            {/* <Link href="announcement.html"
            className={`single-item ${pagess === 'thongbao' ? 'active' : ''}`}
            onClick={() => click("thongbao")}
            >
              <i className="fa-solid fa-megaphone" />
              <p>Thông báo</p>
            </Link> */}
          </div>

          <div className="dashboard-left-single-wrapper bbnone mt--40">
            <Link href="/page/lecturer-dashboard/setting" className="single-item">
              <i className="fa-sharp fa-regular fa-gear text-2xl" />
              <p>Cài đặt</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export { Headerdashboardstudent1, Headerdashboardstudent2 }
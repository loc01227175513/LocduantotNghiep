"use client"
import { useRouter } from "next/navigation";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { GiangvienKhoaHoc, GiangvienKhoaHocDaMua, KhoaHocDuocMua, TatCaKhoaHocDaHoc } from "../../../../service/Dashboard-lecture/Dashboard-lecture";
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Product from "../../../component/Card/Product";
import { RiEmotionSadLine } from "react-icons/ri";




export default function Khoahoccuatoi() {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const switchTab = (newPage) => {
    setIsLoading(true);
    setPage(newPage);
    // Simulate loading
    setTimeout(() => setIsLoading(false), 300);
  };

  const tabVariants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="overflow-y-scroll col-lg-9 ịadkljas">
      <div className="exrolled-course-wrapper-dashed">
        <p className="text-black text-[20px]  font-bold">Khóa học của tôi</p>

        <ul className="nav nav-tabs custom-tabs" id="myTab" role="tablist">
          {[
            { id: 1, label: 'Khóa học đang học', target: 'home' },
            { id: 2, label: 'Khóa học thanh toán mua', target: 'profile' },
            { id: 3, label: 'Khóa học đã hoàn thành', target: 'contact' }
          ].map(tab => (
            <li key={tab.id} className="nav-item" role="presentation">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`nav-link ${page === tab.id ? 'active' : ''}`}
                onClick={() => switchTab(tab.id)}
                data-bs-toggle="tab"
                data-bs-target={`#${tab.target}`}
                role="tab"
              >
                {tab.label}
              </motion.button>
            </li>
          ))}
        </ul>

        <div className="tab-content" id="myTabContent">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial="enter"
              animate="center"
              exit="exit"
              variants={tabVariants}
              transition={{ duration: 0.3 }}
            >
              <Suspense fallback={<div className="loader">Loading...</div>}>
                {isLoading ? (
                  <div className="loading-spinner" />
                ) : (
                  <>
                    {page === 1 && <Khoahocdanghoc />}
                    {page === 2 && <Khoahocdathanhtoan />}
                    {page === 3 && <Khoahocdahoanthanh />}
                  </>
                )}
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>


    </div>
  );
}

const Khoahocdanghoc = () => {
  const [khoahocdanghoc1, setKhoahocdanghoc] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    GiangvienKhoaHoc()
      .then((res) => {
        setKhoahocdanghoc(res.data || []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
        setIsLoading(false);
        setKhoahocdanghoc([]);
      });
  }, []);



  const DanhGiaTrungBinh = khoahocdanghoc1.map((item) => {
    if (!item || !item.danhgia) return 0;

    if (item.danhgia.length > 0) {
      const total = item.danhgia.reduce((acc, curr) => acc + Number(curr.danhgia || 0), 0);
      return (total / item.danhgia.length);
    }
    return 0;
  });

  return (
    <div className="courses-masonry my-20">
      {isLoading ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-14708">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-[400px] bg-[#f0f0f0] rounded-[12px] animate-pulse" />
          ))}
        </div>
      ) : khoahocdanghoc1.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full py-10">
          <RiEmotionSadLine className="text-6xl text-gray-400 mb-4" />
          <p className="text-xl text-gray-500">Bạn chưa có khóa học nào đang học</p>
        </div>
      ) : (
        <div className="flex gap-10 w-full overflow-x-scroll ">
          {khoahocdanghoc1.map((item, index) => (
            // console.log(item,"item"), 
            <Product
              key={index}
              id={item?.id}
              gia={item?.gia}
              giamgia={item?.giamgia}
              ten={item?.ten}
              hinh={item?.hinh}
              chude={item?.chuDe?.ten}
              giangvien={item?.giangVien?.ten}
              baihocs={item?.baihoc?.length || 0}
              dangky={item?.ThanhToan?.length || 0}
              danhgia={DanhGiaTrungBinh[index]}

            />
          ))}
        </div>
      )}
    </div>
  );
};


// Khoahocdathanhtoan.jsx

const Khoahocdathanhtoan = () => {
  const [coursesInProgress, setCoursesInProgress] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const userData = localStorage.getItem('lecturerId');
  const parsedLecturer = JSON.parse(userData);
  useEffect(() => {
    setIsLoading(true);
    KhoaHocDuocMua()
      .then((res) => {
        const data = res.data.filter(item => item.khoahocs.id_giangvien === parsedLecturer.giangvien);
        setCoursesInProgress(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
        setIsLoading(false);
      });
  }, [parsedLecturer.giangvien]);
  // console.log(coursesInProgress, "coursesInProgress");
  const averageRatings = coursesInProgress.map((item) => {
    if (item.danhgia?.length > 0) {
      const total = item.danhgia.reduce((acc, curr) => acc + Number(curr.danhgia), 0);
      return (total / item.danhgia.length);
    }
    return 0;
  });

  const TongLuotMua = coursesInProgress.reduce((acc, curr) => {
    // Get unique id_khoahoc values from thanhtoan array
    const uniqueKhoaHocIds = new Set(curr.thanhtoan.map(t => t.id_khoahoc));
    // Only add 1 per unique course ID
    return acc + uniqueKhoaHocIds.size;
  }, 0);

  // console.log(TongLuotMua,"TongLuotMua");



  return (
    <div className="courses-masonry my-20">
      {isLoading ? (
        <div className="loading-skeleton grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="skeleton-card animate-pulse h-96 bg-gray-200 rounded-lg" />
          ))}
        </div>
      ) : coursesInProgress.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full py-10">
          <RiEmotionSadLine className="text-6xl text-gray-400 mb-4" />
          <p className="text-xl text-gray-500">Bạn chưa có khóa học nào đã thanh toán</p>
        </div>
      ) : (
        <div className="flex gap-10 w-full overflow-x-scroll">
          {coursesInProgress
            .filter((item, index, self) =>
              index === self.findIndex(t => t.khoahocs.id === item.khoahocs.id)
            )
            .map((item, index) => (
              <Product
                key={index}
                id={item.khoahocs.id}
                TongLuotMua={TongLuotMua}
                gia={item.khoahocs.gia}
                giamgia={item.khoahocs.giamgia}
                ten={item.khoahocs.ten}
                hinh={item.khoahocs.hinh}
                chude={item.chude?.ten}
                giangvien={item.khoahocs.giangVien?.ten}
                baihocs={item.baihoc?.length}
                dangky={item.thanhtoan?.length}
                danhgia={averageRatings[index]}
                PhanTram={`${(item.khoahocdahoc.length / item.baihoc.length) * 100}%`}
              />
            ))}
        </div>
      )}
    </div>
  );
};




const Khoahocdahoanthanh = () => {
  const [khoahocdahoanthanh, setKhoahocdahoanthanh] = useState([]);
  const [thanhtoanData, setThanhtoanData] = useState([]);
  const [baihocData, setBaihocData] = useState([]);
  const [danhgiaData, setDanhgiaData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const userData = localStorage.getItem('lecturerId');
  const parsedLecturer = JSON.parse(userData);

  useEffect(() => {
    setIsLoading(true);
    TatCaKhoaHocDaHoc()
      .then((res) => {
        // Lọc khóa học theo giảng viên hiện tại
        const filteredData = res.data.khoahocdahoc.filter(item => 
          item.khoahoc.id_giangvien === parsedLecturer.giangvien
        );
        setKhoahocdahoanthanh(filteredData);
        setThanhtoanData(res.data.thanhtoan);
        setBaihocData(res.data.baihoc);
        setDanhgiaData(res.data.danhgia);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
        setKhoahocdahoanthanh([]);
        setThanhtoanData([]);
        setBaihocData([]);
        setDanhgiaData([]);
        setIsLoading(false);
      });
  }, [parsedLecturer.giangvien]);

  const getUniqueCompletedCourses = () => {
    // Lọc các khóa học unique và đã hoàn thành
    const uniqueCourses = khoahocdahoanthanh.reduce((acc, current) => {
      const x = acc.find(item => item.id_khoahoc === current.id_khoahoc);
      if (!x) {
        return acc.concat([current]);
      }
      return acc;
    }, []);

    return uniqueCourses;
  };

  return (
    <div className="courses-masonry my-20">
      {isLoading ? (
        <div className="loading-skeleton grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="skeleton-card animate-pulse h-96 bg-gray-200 rounded-lg" />
          ))}
        </div>
      ) : khoahocdahoanthanh.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full py-10">
          <RiEmotionSadLine className="text-6xl text-gray-400 mb-4" />
          <p className="text-xl text-gray-500">Bạn chưa có khóa học nào đã hoàn thành</p>
        </div>
      ) : (
        <div className="flex gap-10 w-full overflow-x-scroll">
          {getUniqueCompletedCourses().map((item, index) => {
            // Đếm số người hoàn thành cho khóa học này
            const completedCount = khoahocdahoanthanh.filter(
              course => course.id_khoahoc === item.id_khoahoc && 
              course.trangthai === "Đã Hoàn Thành"
            ).length;

            // Tính các thông số khác
            const paymentCount = thanhtoanData.filter(
              payment => payment.id_khoahoc === item.khoahoc.id
            ).length;

            const lessonCount = baihocData.filter(
              lesson => lesson.id_khoahoc === item.khoahoc.id
            ).length;

            const courseRatings = danhgiaData.filter(
              rating => rating.id_khoahoc === item.khoahoc.id
            );
            const averageRating = courseRatings.length > 0 
              ? courseRatings.reduce((acc, curr) => acc + Number(curr.danhgia), 0) / courseRatings.length
              : 0;

            return (
              <Product
                key={index}
                id={item.khoahoc.id}
                TongLuotMua={completedCount}
                gia={item.khoahoc.gia}
                giamgia={item.khoahoc.giamgia}
                ten={item.khoahoc.ten}
                hinh={item.khoahoc.hinh}
                chude={item.chude?.ten}
                giangvien={item.khoahoc.giangVien?.ten}
                baihocs={lessonCount}
                dangky={paymentCount}
                danhgia={averageRating}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
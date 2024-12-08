"use client"
import { useRouter } from "next/navigation";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { GiangvienKhoaHoc, GiangvienKhoaHocDaMua } from "../../../../service/Dashboard-lecture/Dashboard-lecture";
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
        <p className="text-black text-3xl font-bold">Khóa học của tôi</p>

        <ul className="nav nav-tabs custom-tabs" id="myTab" role="tablist">
          {[
            { id: 1, label: 'Khóa học đang học', target: 'home' },
            { id: 2, label: 'Khóa học đã thanh toán', target: 'profile' },
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
            console.log(item,"item"),
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

  useEffect(() => {
    setIsLoading(true);
    GiangvienKhoaHocDaMua()
      .then((res) => {
        setCoursesInProgress(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
        setIsLoading(false);
      });
  }, []);

  const averageRatings = coursesInProgress.map((item) => {
    if (item.danhgia?.length > 0) {
      const total = item.danhgia.reduce((acc, curr) => acc + Number(curr.danhgia), 0);
      return (total / item.danhgia.length);
    }
    return 0;
  });
  console.log(coursesInProgress, "coursesInProgress");


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
          {coursesInProgress.map((item, index) => (
            <Product
              key={index}
              id={item.khoahocs.id}
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
  const [coursesInProgress, setCoursesInProgress] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    GiangvienKhoaHocDaMua()
      .then((res) => {
        setCoursesInProgress(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
        setIsLoading(false);
      });
  }, []);

  const averageRatings = coursesInProgress.map((item) => {
    if (item.danhgia?.length > 0) {
      const total = item.danhgia.reduce((acc, curr) => acc + Number(curr.danhgia), 0);
      return (total / item.danhgia.length);
    }
    return 0;
  });

  const filteredCourses = coursesInProgress?.filter((item) => item.khoahocdahoc.length > 0);

  return (
    <div className="courses-masonry my-20">
      {isLoading ? (
        <div className="loading-skeleton grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="skeleton-card animate-pulse h-96 bg-gray-200 rounded-lg" />
          ))}
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full py-10">
          <RiEmotionSadLine className="text-6xl text-gray-400 mb-4" />
          <p className="text-xl text-gray-500">Bạn chưa có khóa học nào đã hoàn thành</p>
        </div>
      ) : (
        <div className="flex gap-10 w-full overflow-x-scroll">
          {filteredCourses.map((item, index) => (
            <Product
              key={index}
              id={item.khoahocs.id}
              gia={item.khoahocs.gia}
              giamgia={item.khoahocs.giamgia}
              ten={item.khoahocs.ten}
              hinh={item.khoahocs.hinh}
              chude={item.chude?.ten}
              giangvien={item.giangVien?.ten}
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
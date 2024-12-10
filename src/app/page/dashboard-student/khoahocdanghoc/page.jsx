"use client"
import { useRouter } from "next/navigation";
import React, { useState, useEffect, Suspense } from "react";
import { KhoaHocDangHoc } from "../../../../service/dashbordStuden/Dashboard-service";
import { Dashboard } from "../../../../service/dashbordStuden/Dashboard-service";
import { KhoaHocDaHoc } from "../../../../service/dashbordStuden/Dashboard-service";
import Link from "next/link";
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ProductStudent from '../../../component/Card/ProductStudent';

export default function Khoahoccuatoi() {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);


  const tabVariants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };
  const switchTab = (newPage) => {
    setIsLoading(true);
    setPage(newPage);
    // Simulate loading
    setTimeout(() => setIsLoading(false), 300);
  };
 


  return (
    <div className="overflow-y-scroll col-lg-9 ">
      <div className="exrolled-course-wrapper-dashed">
        <p className="text-black text-[20px] font-bold">Khóa học của tôi</p>

        <ul className="nav nav-tabs custom-tabs " id="myTab" role="tablist">
          {[
            { id: 1, label: 'Khóa học đang học', target: 'home' },
            { id: 2, label: 'Khóa học đã thanh toán', target: 'profile' },
            { id: 3, label: 'Khóa học đã hoàn thành', target: 'contact' }
          ].map(tab => (
            <li key={tab.id} className="nav-item" role="presentation">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`nav-link text-xl ${page === tab.id ? 'active' : ''} ` }
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

        <div className="tab-content mt--30 " id="myTabContent">
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

      <style jsx>{`
        .custom-tabs .nav-link {
          transition: all 0.3s ease;
          border-radius: 8px;
          margin: 0 5px;
        }
        .loading-spinner {
          border: 3px solid #f3f3f3;
          border-top: 3px solid #3498db;border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: 20px auto;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
          .exrolled-course-wrapper-dashed {
    background: linear-gradient(135deg, #ffffff, #f5f7fa);
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 5px 30px rgba(0,0,0,0.05);
  }

  .title {
    background: linear-gradient(45deg, #2c3e50, #3498db);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 16px;
    margin-bottom: 25px;
    font-weight: 700;
  }

  .custom-tabs {
    border-bottom: none;
    gap: 10px;
    padding: 10px;
  }

  .custom-tabs .nav-link {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 12px;
    padding: 12px 24px;
    border: none;
    background: rgba(255, 255, 255, 0.8);
    color: #666;
    font-weight: 500;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    position: relative;
    overflow: hidden;
  }

  .custom-tabs .nav-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #4facfe, #00f2fe);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  .custom-tabs .nav-link:hover::before {
    opacity: 0.1;
  }

  .custom-tabs .nav-link.active {
    background: linear-gradient(45deg, #4facfe, #00f2fe);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(79,172,254,0.4);
  }

  .loading-spinner {
    border: 3px solid #f0f0f0;
    border-top: 3px solid #4facfe;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 0.8s cubic-bezier(0.27, 0.16, 0.12, 1) infinite;
    margin: 30px auto;
    filter: drop-shadow(0 2px 4px rgba(79,172,254,0.2));
  }

  @keyframes spin {
    0% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(180deg) scale(1.1); }
    100% { transform: rotate(360deg) scale(1); }
  }

  .tab-content {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 15px;
    padding: 20px;
    box-shadow: inset 0 2px 10px rgba(0,0,0,0.03);
    backdrop-filter: blur(10px);
  }

  @keyframes fadeSlideUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .loader {
    animation: fadeSlideUp 0.5s ease forwards;
    text-align: center;
    color: #4facfe;
    font-weight: 500;
  }
      `}</style>
    </div>
  );
}



const Khoahocdanghoc = () => {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const [khoahocdanghoc1, setKhoahocdanghoc] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    KhoaHocDangHoc()
      .then((res) => {
        setKhoahocdanghoc(res);
        setIsLoading(false);

      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
        setIsLoading(false);

      });
  }, []);
  console.log(khoahocdanghoc1);


  const tieptuchoc = (id) => {
    router.push(`/page/Study?id=${id}`)
  }
  return (
    <div className="courses-masonry">
      {isLoading ? (
        <div className="loading-skeleton">
          {[1, 2, 3].map((n) => (
            <div key={n} className="skeleton-card animate-pulse" />
          ))}
        </div>
      ) : khoahocdanghoc1.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full py-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p className="mt-4 text-lg text-gray-600">Bạn chưa có khóa học nào đang học</p>
        </div>
      ) : (
        <div className="flex gap-4 w-full overflow-x-scroll">
          {khoahocdanghoc1.map((item, index) => (
            <>

              <ProductStudent
                key={index}
                id={item.id}
                gia={item.gia}
                giamgia={item.giamgia}
                ten={item.ten}
                hinh={item.hinh}
                chude={item.chude}
                giangvien={item.giangVien?.ten}
                baihocs={item.baihoc1?.length}
                PhanTram={item.TongTongHoanthanhphantram}
                tieptuchoc={tieptuchoc}
              />
            </>
          ))}
        </div>
      )}

    </div>


  )
}


const Khoahocdathanhtoan = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    setIsLoading(true);

    Dashboard()
      .then((res) => {
        setData(res.data);
        setIsLoading(false);

      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
        setIsLoading(false);

      });

  }, []);
  console.log(data , "data");


  const tieptuchoc = (id) => {
    router.push(`/page/Study?id=${id}`)
  }
  return (
    <div className="courses-masonry">
      {isLoading ? (
        <div className="loading-skeleton">
          {[1, 2, 3].map((n) => (
            <div key={n} className="skeleton-card animate-pulse" />
          ))}
        </div>
      ) : !data.length ? (
        <div className="flex flex-col items-center justify-center w-full py-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <p className="mt-4 text-lg text-gray-600">Chưa có khóa học nào đã thanh toán</p>
        </div>
      ) : (
        <div className="flex gap-4 w-full overflow-x-scroll">
          {data
            .map((item, index) => (
              item.khoahocs.map((khoahoc, khoahocindex) => (
                <>

                  <ProductStudent
                    key={khoahocindex}
                    id={khoahoc.id}
                    gia={khoahoc.gia}
                    giamgia={khoahoc.giamgia}
                    ten={khoahoc.ten}
                    hinh={khoahoc.hinh}
                    chude={khoahoc.chuDe}
                    giangvien={khoahoc.giangVien?.ten}
                    baihocs={khoahoc.baihoc1?.length}
                    tieptuchoc={tieptuchoc}
                  />
                </>
              ))
            ))}
        </div>
      )}
    </div>
  )
}



const Khoahocdahoanthanh = () => {
  const [khoahocdahoc, setKhoahocdahoc] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    KhoaHocDaHoc()
      .then((res) => {
        setKhoahocdahoc(res.data || []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching completed courses:", error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const tieptuchoc = (id) => {
    router.push(`/page/Study?id=${id}`);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center w-full py-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="mt-4 text-lg text-gray-600">Đã xảy ra lỗi khi tải khóa học</p>
        <p className="mt-2 text-sm text-gray-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="courses-masonry">
      {isLoading ? (
        <div className="loading-skeleton">
          {[1, 2, 3].map((n) => (
            <div key={n} className="skeleton-card animate-pulse" />
          ))}
        </div>
      ) : !khoahocdahoc.length ? (
        <div className="flex flex-col items-center justify-center w-full py-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-4 text-lg text-gray-600">Chưa có khóa học nào hoàn thành</p>
        </div>
      ) : (
        <div className="flex gap-4 w-full overflow-x-scroll">
          {khoahocdahoc
            .map((item, index) => (
              item.khoahoc && (

                <>

                  <ProductStudent
                    key={index}
                    id={item.khoahoc.id}
                    gia={item.khoahoc.gia}
                    giamgia={item.khoahoc.giamgia}
                    ten={item.khoahoc.ten}
                    hinh={item.khoahoc.hinh}
                    chude={item.khoahoc.chude}
                    giangvien={item.khoahoc.giangVien?.ten || "Không rõ"}
                    baihocs={item.khoahoc.baihoc?.length || 0}
                    tieptuchoc={tieptuchoc}
                   
                  />
                </>
              )
            ))}
        </div>
      )}
    </div>
  );
};
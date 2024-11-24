"use client"
import { useRouter } from "next/navigation";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { GiangvienKhoaHoc, GiangvienKhoaHocDaMua } from "../../../../service/Dashboard-lecture/Dashboard-lecture";
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';





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
    <div className="overflow-y-scroll col-lg-9 h-[550px]">
      <div className="exrolled-course-wrapper-dashed">
        <p className="text-black text-3xl font-bold">khóa học của tôi</p>

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

        <div className="tab-content mt--30" id="myTabContent">
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
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  }

  .title {
    background: linear-gradient(45deg, #2c3e50, #3498db);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 1.8rem;
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
  const [khoahocdanghoc1, setKhoahocdanghoc] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    GiangvienKhoaHoc()
      .then((res) => {
        setKhoahocdanghoc(res.data);
        // console.log(res.data);

        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
        setIsLoading(false);
      });
  }, []);

  const DanhGiaTrungBinh = khoahocdanghoc1.map((item) => {
    if (item.danhgia?.length > 0) {
      const total = item.danhgia.reduce((acc, curr) => acc + Number(curr.danhgia), 0);
      return (total / item.danhgia.length).toFixed(1);
    }
    return 0;
  });

  return (
    <div className="courses-masonry">
      {isLoading ? (
        <div className="loading-skeleton">
          {[1, 2, 3].map((n) => (
            <div key={n} className="skeleton-card animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {khoahocdanghoc1.map((item, index) => (
            <div key={index} className="w-full">
              <Link href={`/page/course-detail?id=${item.id}`}>
                <div className="course-card bg-white rounded-lg shadow hover:shadow-md transition-all h-full">
                  <div className="relative p-3">
                    <div className="absolute top-9 left-10 z-10 text-base font-medium py-1 px-2 text-black bg-blue-100 rounded">
                      {item.chuDe.ten}
                    </div>

                    <div className="aspect-[16/9] w-full overflow-hidden rounded-lg">
                      <Image
                        width={300}
                        height={169}
                        src={item.hinh}
                        alt={item.ten}
                        className="object-cover w-full h-full hover:scale-105 transition-transform"
                      />
                    </div>

                    <div className="p-3 space-y-3">
                      <div className="flex text-lg text-gray-600 space-x-4">
                        <span className="flex items-center">
                          <i className="fas fa-book-open text-gray-400 mr-2" />
                          {item.baihoc.length} Bài học
                        </span>
                        <span className="flex items-center">
                          <i className="fas fa-users text-gray-400 mr-2" />
                          {item.ThanhToan.length} Học sinh
                        </span>
                      </div>

                      <div className="flex items-start justify-between gap-2">
                        <h5 className="text-2xl font-bold leading-tight">{item.ten}</h5>
                        <div className="flex items-center whitespace-nowrap">
                          <span className="text-xl font-medium mr-1">{DanhGiaTrungBinh[index]}</span>
                          <i className="fas fa-star text-yellow-400 text-xl" />
                        </div>
                      </div>

                      <p className="text-xl text-gray-600 border-b pb-2">{item.giangVien.ten}</p>

                                                                <div className="flex items-center gap-4 my-2">
                                            {item.gia === 0 ? (
                                              <p className="text-2xl font-medium text-green-500">
                                                Miễn phí
                                              </p>
                                            ) : (
                                              <>
                                                <div className="flex items-center gap-3">
                                                  <p className={`text-2xl font-medium ${
                                                    item.giamgia > 0 ? 'line-through text-gray-400' : ''
                                                  }`}>
                                                    ${item.gia}
                                                  </p>
                                                  {item.giamgia > 0 && (
                                                    <span className="text-2xl font-medium text-green-500">
                                                      ${item.giamgia}
                                                    </span>
                                                  )}
                                                </div>
                                                {item.giamgia > 0 && (
                                                  <span className="text-lg bg-red-100 text-red-600 px-3 py-1.5 rounded ml-auto">
                                                    {Math.round(((item.gia - item.giamgia) / item.gia) * 100)}% giảm
                                                  </span>
                                                )}
                                              </>
                                            )}
                                          </div>
                      <button className="w-full bg-blue-50 text-blue-600 py-2 px-4 rounded text-xl hover:bg-blue-100 transition-colors">
                        <i className="fas fa-certificate mr-2" />
                        Tải xuống chứng chỉ
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
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
      return (total / item.danhgia.length).toFixed(1);
    }
    return 0;
  });

  return (
    <div className="courses-masonry">
      {isLoading ? (
        <div className="loading-skeleton">
          {[1, 2, 3].map((n) => (
            <div key={n} className="skeleton-card animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {coursesInProgress.map((item, index) => (
            <div key={index} className="w-full">
              <Link href={`/page/course-detail?id=${item.khoahocs.id}`}>
                <div className="course-card bg-white rounded-lg shadow hover:shadow-md transition-all h-full">
                  <div className="relative p-3">
                    <div className="absolute top-9 left-10 z-10 text-base font-medium py-1 px-2 text-black bg-blue-100 rounded">
                      {item.chude.ten}
                    </div>

                    <div className="aspect-[16/9] w-full overflow-hidden rounded-lg">
                      <Image
                        width={300}
                        height={169}
                        src={item.khoahocs.hinh}
                        alt={item.khoahocs.ten}
                        className="object-cover w-full h-full hover:scale-105 transition-transform"
                      />
                    </div>

                    <div className="p-3 space-y-3">
                      <div className="flex text-lg text-gray-600 space-x-4">
                        <span className="flex items-center">
                          <i className="fas fa-book-open text-gray-400 mr-2" />
                          {item.baihoc.length} Bài học
                        </span>
                        <span className="flex items-center">
                          <i className="fas fa-users text-gray-400 mr-2" />
                          {item.thanhtoan.length} Học sinh
                        </span>
                      </div>

                      <div className="flex items-start justify-between gap-2">
                        <h5 className="text-2xl font-bold leading-tight">{item.khoahocs.ten}</h5>
                        <div className="flex items-center whitespace-nowrap">
                          <span className="text-xl font-medium mr-1">{averageRatings[index]}</span>
                          <i className="fas fa-star text-yellow-400 text-xl" />
                        </div>
                      </div>

                      <div className="price-wrapper mt-4">
                        {item.gia === 0 ? (
                          <span className="free-price text-2xl font-medium text-green-500">Miễn phí</span>
                        ) : (
                          <div className="flex items-center gap-3">
                            <span className={`text-2xl font-medium ${item.giamgia > 0 ? 'line-through text-gray-400' : ''}`}>
                              ${item.gia}
                            </span>
                            {item.giamgia > 0 && (
                              <>
                                <span className="text-2xl font-medium text-green-500">${item.giamgia}</span>
                                <span className="text-lg bg-red-100 text-red-600 px-3 py-1.5 rounded ml-auto">
                                  {Math.round(((item.gia - item.giamgia) / item.gia) * 100)}% giảm
                                </span>
                              </>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="progress-wrapper">
                        <div
                          className="progress-bar bg-blue-500 h-2 rounded"
                          style={{ width: `${(item.khoahocdahoc.length / item.baihoc.length) * 100}%` }}
                        />
                      </div>

                      <button className="w-full bg-blue-50 text-blue-600 py-2 px-4 rounded text-xl hover:bg-blue-100 transition-colors mt-4">
                        <i className="fas fa-certificate mr-2" />
                        Tải xuống chứng chỉ
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
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
      return (total / item.danhgia.length).toFixed(1);
    }
    return 0;
  });

  return (
    <div className="courses-masonry">
      {isLoading ? (
        <div className="loading-skeleton">
          {[1, 2, 3].map((n) => (
            <div key={n} className="skeleton-card animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {coursesInProgress
            ?.filter((item) => item.khoahocdahoc.length > 0)
            .map((item, index) => (
              <div key={index} className="w-full">
                <Link href={`/page/course-detail?id=${item.khoahocs.id}`}>
                  <div className="course-card bg-white rounded-lg shadow hover:shadow-md transition-all h-full">
                    <div className="relative p-3">
                      <div className="absolute top-9 left-10 z-10 text-base font-medium py-1 px-2 text-black bg-blue-100 rounded">
                        {item.chude.ten}
                      </div>

                      <div className="aspect-[16/9] w-full overflow-hidden rounded-lg">
                        <Image
                          width={300}
                          height={169}
                          src={item.khoahocs.hinh}
                          alt={item.khoahocs.ten}
                          className="object-cover w-full h-full hover:scale-105 transition-transform"
                        />
                      </div>

                      <div className="p-3 space-y-3">
                        <div className="flex text-lg text-gray-600 space-x-4">
                          <span className="flex items-center">
                            <i className="fas fa-book-open text-gray-400 mr-2" />
                            {item.baihoc.length} Bài học
                          </span>
                          <span className="flex items-center">
                            <i className="fas fa-users text-gray-400 mr-2" />
                            {item.thanhtoan.length} Học sinh
                          </span>
                        </div>

                        <div className="flex items-start justify-between gap-2">
                          <h5 className="text-2xl font-bold leading-tight">{item.khoahocs.ten}</h5>
                          <div className="flex items-center whitespace-nowrap">
                            <span className="text-xl font-medium mr-1">{averageRatings[index]}</span>
                            <i className="fas fa-star text-yellow-400 text-xl" />
                          </div>
                        </div>

                        <div className="price-wrapper mt-4">
                          {item.gia === 0 ? (
                            <span className="free-price text-2xl font-medium text-green-500">Miễn phí</span>
                          ) : (
                            <div className="flex items-center gap-3">
                              <span className={`text-2xl font-medium ${item.giamgia > 0 ? 'line-through text-gray-400' : ''}`}>
                                ${item.gia}
                              </span>
                              {item.giamgia > 0 && (
                                <>
                                  <span className="text-2xl font-medium text-green-500">${item.giamgia}</span>
                                  <span className="text-lg bg-red-100 text-red-600 px-3 py-1.5 rounded ml-auto">
                                    {Math.round(((item.gia - item.giamgia) / item.gia) * 100)}% giảm
                                  </span>
                                </>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="progress-wrapper">
                          <div
                            className="progress-bar bg-blue-500 h-2 rounded"
                            style={{ width: `${(item.khoahocdahoc.length / item.baihoc.length) * 100}%` }}
                          />
                        </div>

                        <button className="w-full bg-blue-50 text-blue-600 py-2 px-4 rounded text-xl hover:bg-blue-100 transition-colors mt-4">
                          <i className="fas fa-certificate mr-2" />
                          Tải xuống chứng chỉ
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      )}
     
    </div>
  );
};
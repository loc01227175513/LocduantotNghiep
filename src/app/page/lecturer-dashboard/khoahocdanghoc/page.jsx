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
    <div className="overflow-y-scroll col-lg-9 h-lvh">
      <div className="exrolled-course-wrapper-dashed">
        <motion.h5 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="title"
        >
          Khóa học của tôi
        </motion.h5>

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
          border-top: 3px solid #3498db;
          border-radius: 50%;
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
        <div className="row g-5 courses-grid">
          {khoahocdanghoc1.map((item, index) => (
            <div
              className="col-lg-4 col-md-6 col-sm-12 col-12"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <Link href={`/page/course-detail?id=${item.id}`}>
                <div className="course-card">
                  <div className="course-image">
                    <Image
                      width={500}
                      height={300}
                      src={item.hinh}
                      alt={item.ten}
                      className="hover-scale"
                    />
                    <div className="category-badge">
                      {item.chuDe.ten}
                    </div>
                  </div>

                  <div className="course-content">
                    <div className="course-meta">
                      <span className={`seller-badge ${item.ThanhToan?.length > 10 ? 'best' : 'new'}`}>
                        {item.ThanhToan?.length > 10 ? 'Người bán tốt nhất' : 'Người bán mới'}
                      </span>
                      <div className="price-wrapper">
                        {item.gia === 0 ? (
                          <span className="free-price">Miễn phí</span>
                        ) : (
                          <>
                            <span className="original-price">${item.gia}</span>
                            {item.giamgia > 0 && (
                              <>
                                <span className="discounted-price">${item.giamgia}</span>
                                <span className="discount-badge">
                                  {Math.round(((item.gia - item.giamgia) / item.gia) * 100)}% giảm
                                </span>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    <h5 className="course-title">{item.ten}</h5>

                    <div className="instructor-rating">
                      <span className="instructor-name">{item.giangvien}</span>
                      <div className="rating-wrapper">
                        <span className="rating-score">{DanhGiaTrungBinh[index]}</span>
                        <div className="stars-wrapper">
                          {[...Array(5)].map((_, starIndex) => (
                            <i 
                              key={starIndex}
                              className={`fa-star ${starIndex < DanhGiaTrungBinh[index] ? 'fas' : 'far'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="course-stats">
                      <span className="lessons">
                        <i className="fas fa-book-open" />
                        {item.baihoc.length} Bài học
                      </span>
                      <span className="students">
                        <i className="fas fa-users" />
                        {item.ThanhToan.length} Học sinh
                      </span>
                    </div>

                    <button className="download-cert-btn">
                      <i className="fas fa-certificate" />
                      Tải xuống chứng chỉ
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
      <style jsx>{`
        .price-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .free-price {
          color: #22c55e;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .original-price {
          color: #6b7280;
          text-decoration: line-through;
        }

        .discounted-price {
          color: #ef4444;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .discount-badge {
          background: #fee2e2;
          color: #ef4444;
          padding: 0.2rem 0.5rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .courses-masonry {
          padding: 2rem 0;
        }

        .loading-skeleton {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .skeleton-card {
          height: 400px;
          background: #f0f0f0;
          border-radius: 12px;
        }

        .course-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .course-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .course-image {
          position: relative;
          overflow: hidden;
        }

        .hover-scale {
          transition: transform 0.5s ease;
        }

        .course-card:hover .hover-scale {
          transform: scale(1.05);
        }

        .category-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(255,255,255,0.9);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 500;
        }

        .course-content {
          padding: 1.5rem;
        }

        .seller-badge {
          padding: 0.3rem 0.8rem;
          border-radius: 15px;
          font-size: 0.8rem;
        }

        .seller-badge.best {
          background: #ffedd5;
          color: #f97316;
        }

        .seller-badge.new {
          background: #dcfce7;
          color: #22c55e;
        }

        .rating-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .rating-score {
          font-weight: 600;
        }

        .stars-wrapper {
          display: flex;
        }

        .fa-star {
          color: #f59e0b;
          margin-right: 2px;
        }

        .course-stats {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
        }

        .lessons, .students {
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .progress-wrapper {
          height: 4px;
          background: #f0f0f0;
          border-radius: 2px;
          margin: 1rem 0;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .download-cert-btn {
          width: 100%;
          padding: 0.8rem;
          border: none;
          background: #3b82f6;
          color: white;
          border-radius: 8px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .download-cert-btn:hover {
          background: #2563eb;
        }

        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }

        .animate-pulse {
          animation: pulse 1.5s infinite;
        }
      `}</style>
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
        <div className="row g-5 courses-grid">
          {coursesInProgress
            ?.filter((item) => item.khoahocdahoc.length > 0)
            .map((item, index) => (
              <div
                className="col-lg-4 col-md-6 col-sm-12 col-12"
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <Link href={`/page/course-detail?id=${item.khoahocs.id}`}>
                  <div className="course-card">
                    <div className="course-image">
                      <Image
                        width={500}
                        height={300}
                        src={item.khoahocs.hinh}
                        alt={item.khoahocs.ten}
                        className="hover-scale"
                      />
                      <div className="category-badge">
                        {item.chude.ten}
                      </div>
                    </div>

                    <div className="course-content">
                      <div className="course-meta">
                        <span className={`seller-badge ${item.thanhtoan?.length > 10 ? 'best' : 'new'}`}>
                          {item.thanhtoan?.length > 10 ? 'Người bán tốt nhất' : 'Người bán mới'}
                        </span>
                        <div className="price-wrapper">
                          {item.gia === 0 ? (
                            <span className="free-price">Miễn phí</span>
                          ) : (
                            <>
                              <span className="original-price">${item.gia}</span>
                              {item.giamgia > 0 && (
                                <>
                                  <span className="discounted-price">${item.giamgia}</span>
                                  <span className="discount-badge">
                                    {Math.round(((item.gia - item.giamgia) / item.gia) * 100)}% giảm
                                  </span>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>

                      <h5 className="course-title">{item.khoahocs.ten}</h5>

                      <div className="instructor-rating">
                        <span className="instructor-name">{item.giangvien}</span>
                        <div className="rating-wrapper">
                          <span className="rating-score">{averageRatings[index]}</span>
                          <div className="stars-wrapper">
                            {[...Array(5)].map((_, starIndex) => (
                              <i
                                key={starIndex}
                                className={`fa-star ${starIndex < averageRatings[index] ? 'fas' : 'far'}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="course-stats">
                        <span className="lessons">
                          <i className="fas fa-book-open" />
                          {item.baihoc.length} Bài học
                        </span>
                        <span className="students">
                          <i className="fas fa-users" />
                          {item.thanhtoan.length} Học sinh
                        </span>
                      </div>

                      <div className="progress-wrapper">
                        <div
                          className="progress-bar"
                          style={{ width: `${(item.khoahocdahoc.length / item.baihoc.length) * 100}%` }}
                        />
                      </div>

                      <button className="download-cert-btn">
                        <i className="fas fa-certificate" />
                        Tải xuống chứng chỉ
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      )}
      <style jsx>{`
        .price-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .free-price {
          color: #22c55e;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .original-price {
          color: #6b7280;
          text-decoration: line-through;
        }

        .discounted-price {
          color: #ef4444;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .discount-badge {
          background: #fee2e2;
          color: #ef4444;
          padding: 0.2rem 0.5rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .courses-masonry {
          padding: 2rem 0;
        }

        .loading-skeleton {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .skeleton-card {
          height: 400px;
          background: #f0f0f0;
          border-radius: 12px;
        }

        .course-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .course-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .course-image {
          position: relative;
          overflow: hidden;
        }

        .hover-scale {
          transition: transform 0.5s ease;
        }

        .course-card:hover .hover-scale {
          transform: scale(1.05);
        }

        .category-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(255,255,255,0.9);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 500;
        }

        .course-content {
          padding: 1.5rem;
        }

        .seller-badge {
          padding: 0.3rem 0.8rem;
          border-radius: 15px;
          font-size: 0.8rem;
        }

        .seller-badge.best {
          background: #ffedd5;
          color: #f97316;
        }

        .seller-badge.new {
          background: #dcfce7;
          color: #22c55e;
        }

        .rating-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .rating-score {
          font-weight: 600;
        }

        .stars-wrapper {
          display: flex;
        }

        .fa-star {
          color: #f59e0b;
          margin-right: 2px;
        }

        .course-stats {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
        }

        .lessons, .students {
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .progress-wrapper {
          height: 4px;
          background: #f0f0f0;
          border-radius: 2px;
          margin: 1rem 0;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .download-cert-btn {
          width: 100%;
          padding: 0.8rem;
          border: none;
          background: #3b82f6;
          color: white;
          border-radius: 8px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .download-cert-btn:hover {
          background: #2563eb;
        }

        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }

        .animate-pulse {
          animation: pulse 1.5s infinite;
        }
      `}</style>
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
        <div className="row g-5 courses-grid">
          {coursesInProgress
            ?.filter((item) => item.khoahocdahoc.length > 0)
            .map((item, index) => (
              <div
                className="col-lg-4 col-md-6 col-sm-12 col-12"
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <Link href={`/page/course-detail?id=${item.khoahocs.id}`}>
                  <div className="course-card">
                    <div className="course-image">
                      <Image
                        width={500}
                        height={300}
                        src={item.khoahocs.hinh}
                        alt={item.khoahocs.ten}
                        className="hover-scale"
                      />
                      <div className="category-badge">
                        {item.chude.ten}
                      </div>
                    </div>

                    <div className="course-content">
                      <div className="course-meta">
                        <span className={`seller-badge ${item.thanhtoan?.length > 10 ? 'best' : 'new'}`}>
                          {item.thanhtoan?.length > 10 ? 'Người bán tốt nhất' : 'Người bán mới'}
                        </span>
                        <div className="price-wrapper">
                          {item.gia === 0 ? (
                            <span className="free-price">Miễn phí</span>
                          ) : (
                            <>
                              <span className="original-price">${item.gia}</span>
                              {item.giamgia > 0 && (
                                <>
                                  <span className="discounted-price">${item.giamgia}</span>
                                  <span className="discount-badge">
                                    {Math.round(((item.gia - item.giamgia) / item.gia) * 100)}% giảm
                                  </span>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>

                      <h5 className="course-title">{item.khoahocs.ten}</h5>

                      <div className="instructor-rating">
                        <span className="instructor-name">{item.giangvien}</span>
                        <div className="rating-wrapper">
                          <span className="rating-score">{averageRatings[index]}</span>
                          <div className="stars-wrapper">
                            {[...Array(5)].map((_, starIndex) => (
                              <i 
                                key={starIndex}
                                className={`fa-star ${starIndex < averageRatings[index] ? 'fas' : 'far'}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="course-stats">
                        <span className="lessons">
                          <i className="fas fa-book-open" />
                          {item.baihoc.length} Bài học
                        </span>
                        <span className="students">
                          <i className="fas fa-users" />
                          {item.thanhtoan.length} Học sinh
                        </span>
                      </div>

                      <div className="progress-wrapper">
                        <div
                          className="progress-bar"
                          style={{ width: `${(item.khoahocdahoc.length / item.baihoc.length) * 100}%` }}
                        />
                      </div>

                      <button className="download-cert-btn">
                        <i className="fas fa-certificate" />
                        Tải xuống chứng chỉ
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      )}
       <style jsx>{`
        .price-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .free-price {
          color: #22c55e;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .original-price {
          color: #6b7280;
          text-decoration: line-through;
        }

        .discounted-price {
          color: #ef4444;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .discount-badge {
          background: #fee2e2;
          color: #ef4444;
          padding: 0.2rem 0.5rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .courses-masonry {
          padding: 2rem 0;
        }

        .loading-skeleton {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .skeleton-card {
          height: 400px;
          background: #f0f0f0;
          border-radius: 12px;
        }

        .course-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .course-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .course-image {
          position: relative;
          overflow: hidden;
        }

        .hover-scale {
          transition: transform 0.5s ease;
        }

        .course-card:hover .hover-scale {
          transform: scale(1.05);
        }

        .category-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(255,255,255,0.9);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 500;
        }

        .course-content {
          padding: 1.5rem;
        }

        .seller-badge {
          padding: 0.3rem 0.8rem;
          border-radius: 15px;
          font-size: 0.8rem;
        }

        .seller-badge.best {
          background: #ffedd5;
          color: #f97316;
        }

        .seller-badge.new {
          background: #dcfce7;
          color: #22c55e;
        }

        .rating-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .rating-score {
          font-weight: 600;
        }

        .stars-wrapper {
          display: flex;
        }

        .fa-star {
          color: #f59e0b;
          margin-right: 2px;
        }

        .course-stats {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
        }

        .lessons, .students {
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .progress-wrapper {
          height: 4px;
          background: #f0f0f0;
          border-radius: 2px;
          margin: 1rem 0;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .download-cert-btn {
          width: 100%;
          padding: 0.8rem;
          border: none;
          background: #3b82f6;
          color: white;
          border-radius: 8px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .download-cert-btn:hover {
          background: #2563eb;
        }

        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }

        .animate-pulse {
          animation: pulse 1.5s infinite;
        }
      `}</style>
    </div>
  );
};
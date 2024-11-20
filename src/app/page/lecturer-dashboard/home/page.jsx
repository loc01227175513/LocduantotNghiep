"use client"

import React, { useState, useEffect } from 'react';
import {
  Box,
  Stack,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Skeleton,
  Select,
  MenuItem,
  Button,
  Typography
} from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import Link from 'next/link';
import Image from 'next/image';
import {
  Dashboard,
  GiangvienKhoaHoc,
  GiangvienKhoaHocDaMua
} from "../../../../service/Dashboard-lecture/Dashboard-lecture.jsx";
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import {
  BookOpenIcon,
  AcademicCapIcon,
  TrophyIcon,
  BookmarkIcon,
  UserIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ClockIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';


const KhoaHocDangKyCss = `
.single-dashboard-card {
  background: linear-gradient(145deg, #ffffff, #f5f7fa);
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.single-dashboard-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}

.single-dashboard-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(225deg, 
    rgba(255,255,255,0.4) 0%, 
    rgba(255,255,255,0.1) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.single-dashboard-card:hover::before {
  opacity: 1;
}

.single-dashboard-card .icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #4361ee, #3bc9db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.3s ease;
}

.single-dashboard-card:hover .icon {
  transform: scale(1.1);
}

.single-dashboard-card .title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #2b2d42;
}

.counter {
  background: linear-gradient(45deg, #2b2d42, #4361ee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  font-size: 1.8rem;
}

.single-dashboard-card p {
  color: #64748b;
  font-size: 14px;
  margin: 0;
}

/* Card color variants */
.single-dashboard-card:nth-child(3n+1) .icon {
  background: linear-gradient(45deg, #4361ee, #3bc9db);
}

.single-dashboard-card:nth-child(3n+2) .icon {
  background: linear-gradient(45deg, #ffd43b, #ff6b6b);
}

.single-dashboard-card:nth-child(3n+3) .icon {
  background: linear-gradient(45deg, #51cf66, #94d82d);
}

/* Shimmer effect */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.single-dashboard-card:hover {
  background: linear-gradient(90deg,
    rgba(255,255,255, 0.1) 25%,
    rgba(255,255,255, 0.2) 50%,
    rgba(255,255,255, 0.1) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 3s infinite;
}

/* Pattern overlay */
.single-dashboard-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0);
  background-size: 20px 20px;
  opacity: 0.5;
  pointer-events: none;
}
  @keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.single-dashboard-card .icon {
  /* Keep existing styles */
  animation: float 3s ease-in-out infinite;
}

.single-dashboard-card:hover .icon {
  animation: 
    float 3s ease-in-out infinite,
    pulse 2s ease-in-out infinite,
    rotate 1s ease-in-out;
}

/* Update hover state to work with new animations */
.single-dashboard-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
  background: linear-gradient(90deg,
    rgba(255,255,255, 0.1) 25%,
    rgba(255,255,255, 0.2) 50%,
    rgba(255,255,255, 0.1) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 3s infinite;
}
  .single-dashboard-card .icon svg {
  width: 2.5rem;
  height: 2.5rem;
  stroke-width: 1.5;
  color: currentColor; /* Will inherit gradient colors */
}
`;
const CourseProgressStyles = `
  .single-progress-course {
    background: white;
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    transition: all 0.3s ease;
    display: flex;
    gap: 20px;
    cursor: pointer;
  }

  .single-progress-course:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }

  .progress {
    height: 8px;
    background: #f1f5f9;
    border-radius: 999px;
    overflow: hidden;
  }

  .progress-bar {
    background: linear-gradient(90deg, #4361ee, #3bc9db);
    border-radius: 999px;
    transition: width 1s ease-in-out;
  }

  .rating-area {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 8px;
  }

  .rating-area svg {
    width: 16px;
    height: 16px;
    color: #ffd700;
  }

  .title {
    font-weight: 600;
    color: #2b2d42;
    margin: 10px 0;
    transition: color 0.3s ease;
  }

  .single-progress-course:hover .title {
    color: #4361ee;
  }

  .end span {
    color: #4361ee;
    font-weight: 500;
  }
`;

export default function Homedashboardlecturer() {
  const [data, setData] = useState([]);
  const [khoahoc, setKhoahoc] = useState([]);
  const [doanhthu, setDoanhthu] = useState([]);
  const [khoahocdamua, setKhoahocdamua] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardRes = await Dashboard();
        localStorage.setItem('lecturerId', JSON.stringify(dashboardRes.data));
        setData(dashboardRes.data);

        const khoahocRes = await GiangvienKhoaHoc();
        setKhoahoc(khoahocRes.data);

        const khoahocdamuaRes = await GiangvienKhoaHocDaMua();
        setKhoahocdamua(khoahocdamuaRes.data);

        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('lecturerId'));

    fetch('https://huuphuoc.id.vn/api/DoanhThuGiangVien', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_giangvien: data.giangvien }),
      referrerPolicy: 'unsafe-url',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDoanhthu(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    if (isDataLoaded) {
      console.log(data.giangvien);
      console.log("khoahoc", khoahoc);
      console.log(khoahocdamua);
      console.log(doanhthu, "doanhthu");
    }
  }, [isDataLoaded, data, khoahoc, khoahocdamua, doanhthu]);
  console.log(doanhthu, "doanhthu");

  const khoahocdadangky = khoahoc.length;
  const khoahocdahoanthanh = khoahoc.filter((item) => item.trangthai === "Progress").length;
  const khoahoctamdung = khoahoc.filter((item) => item.trangthai === "Notyet").length;
  const khoahocdanghoc = khoahocdamua.length;
  const tongdoanhthu = doanhthu.tongdoanhthu;
  const sodukhadung = doanhthu.sodukhadung;
  const activeCoursesCount = khoahoc.filter(course => course.trangthai === "active").length;
  const TongSoHS = khoahoc.reduce((total, course) => {
    return total + course.ThanhToan.length;
  }, 0);
  const cardData = [
    { icon: BookOpenIcon, value: khoahocdadangky, label: "Khóa học đã đăng ký" },
    { icon: AcademicCapIcon, value: khoahocdanghoc, label: "Khóa học đang học" },
    { icon: TrophyIcon, value: khoahocdahoanthanh, label: "Khóa học đã hoàn thành" },
    { icon: BookmarkIcon, value: khoahocdadangky, label: "Tổng khóa học của tôi" },
    { icon: UserIcon, value: TongSoHS, label: "Tổng số học sinh" },
    { icon: CurrencyDollarIcon, value: sodukhadung ?? 0, label: "Số dư khả dụng" },
    { icon: UserGroupIcon, value: activeCoursesCount, label: "Tổng khóa học đang phát hành" },
    { icon: ClockIcon, value: khoahoctamdung, label: "Tổng khóa học tạm dừng" },
    { icon: BanknotesIcon, value: tongdoanhthu ?? 0, label: "Tổng thu nhập" },
  ];
  console.log(khoahoc, "khoahoc");

  return (
    <div className="overflow-y-scroll col-lg-9 h-lvh">
      <div className="right-sidebar-dashboard">

        <style jsx>{KhoaHocDangKyCss}</style>


        <div className="row g-5">
          {cardData.map((card, index) => (
            <motion.div
              key={index}
              className="col-lg-4 col-md-6 col-sm-6 col-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="single-dashboard-card">
                <motion.div
                  className="icon"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  {React.createElement(card.icon, {
                    className: "h-8 w-8",
                    "aria-hidden": "true"
                  })}
                </motion.div>
                <h5 className="title">
                  <CountUp
                    end={card.value}
                    duration={2}
                    separator=","
                    className="counter"
                  />
                </h5>
                <p>{card.label}</p>
              </div>
            </motion.div>
          ))}
          <CustomChart />
        </div>
        <div className="container mt-5">
          <DoanhThuChart />
        </div>
        <style jsx>{CourseProgressStyles}</style>

        {khoahoc.map((item, index) => {
          const widthPercentage = item.completed;
          const discountPercent = item.gia > 0 ? Math.round((item.giamgia / item.gia) * 100) : 0;

          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              key={item.id}
              className="mb-4"
            >
              <Link href={`/page/course-create?id=${item.id}`}>
                <div className="single-progress-course p-4 bg-white rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100">
                  <div className="flex items-center gap-6">
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Image
                        width={120}
                        height={120}
                        className="rounded-lg border-2 hover:border-blue-500 shadow-sm"
                        src={item.hinh}
                        alt={item.ten}
                      />
                    </motion.div>

                    <div className="information-progress-course flex-1">
                      <motion.h5
                        className="text-xl font-semibold mb-2 text-gray-800"
                        whileHover={{ x: 5, color: "#2563EB" }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        {item.ten}
                      </motion.h5>
                      <div className={`
                text-sm font-medium rounded-full px-3 py-1 inline-flex items-center gap-2
                animate-pulse
                ${item.giamgia === 0
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {item.giamgia === 0 ? (
                          <>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Miễn phí</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16a1 1 0 11-2 0V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 013 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.616a1 1 0 01.894-1.79l1.599.8L7 4.323V3a1 1 0 011-1h2z" />
                            </svg>
                            <span>Giảm {discountPercent}%</span>
                          </>
                        )}
                      </div>
                      {/* Instructor Information */}
                      {item.giangvien && (
                        <div className="mt-2 flex items-center">
                          <Image
                            width={40}
                            height={40}
                            className="rounded-full border-2 border-gray-200"
                            src={item.giangvien.avatar || '/default-avatar.jpg'}
                            alt={item.giangvien.name || 'Giảng viên'}
                          />
                          <span className="ml-2 text-sm text-gray-600">
                            {item.giangvien.name || 'Tên giảng viên'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}

        <div className="container mt-5">
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0 font-bold text-2xl">Các khóa học của tôi</h5>
                <a href="#" className="btn btn-primary btn-sm hover:scale-105 transition-transform">
                  Xem tất cả
                </a>
              </div>
              <div className="row">
                {khoahoc.map((item) => (
                  <div
                    className="col-md-6 col-lg-4 mb-4"
                    key={item.id}
                  >
                    <div className="card h-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                     <Image  width={300} height={200}  
                        src={item.hinh || '/default-course.jpg'}
                        className="card-img-top h-48 object-cover"
                        alt={item.ten}
                      />
                      <div className="card-body p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h6 className="card-title font-semibold text-lg">{item.ten}</h6>
                          <span className={`badge ${item.trangthai === 'Hoàn thành' ? 'bg-green-500' : 'bg-blue-500'
                            } text-white rounded-full px-3 py-1`}>
                            {item.trangthai}
                          </span>
                        </div>

                        <div className="progress mb-3 bg-gray-200 rounded-full h-2">
                          <div
                            className="progress-bar bg-blue-500 rounded-full h-2"
                            style={{ width: `${item.tiendo || 0}%` }}
                          />
                        </div>

                        <div className="rating flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-5 h-5 ${star <= (item.rating || 0)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                                }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        {/* Instructor Information */}
                        {item.giangvien && (
                          <div className="mt-2 flex items-center">
                            <Image
                              width={40}
                              height={40}
                              className="rounded-full border-2 border-gray-200"
                              src={item.giangvien.avatar || '/default-avatar.jpg'}
                              alt={item.giangvien.name || 'Giảng viên'}
                            />
                            <span className="ml-2 text-sm text-gray-600">
                              {item.giangvien.name || 'Tên giảng viên'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', padding: '10px', borderRadius: '8px' }}>
        <Typography variant="subtitle2">{label}</Typography>
        {payload.map((entry, index) => (
          <Typography key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value.toLocaleString()} VND`}
          </Typography>
        ))}
      </Box>
    );
  }

  return null;
};


const DoanhThuChart = () => {
  const [doanhthu, setDoanhthu] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [metric, setMetric] = useState('tongdoanhthu');

  useEffect(() => {
    const fetchDoanhThu = async () => {
      const storedData = localStorage.getItem('lecturerId');

      if (!storedData) {
        setError('No lecturer data found.');
        setLoading(false);
        return;
      }

      const data = JSON.parse(storedData);

      try {
        const response = await fetch('https://huuphuoc.id.vn/api/DoanhThuGiangVien', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id_giangvien: data.giangvien }),
          referrerPolicy: 'unsafe-url',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (Array.isArray(result.data)) {
          setDoanhthu(result.data);
        } else if (typeof result.data === 'object' && result.data !== null) {
          setDoanhthu([result.data]); // Wrap single object in array
        } else {
          throw new Error('Unexpected data format received from API.');
        }

      } catch (error) {
        console.error('Error fetching doanh thu:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoanhThu();
  }, []);

  // Prepare data for the chart
  const chartData = doanhthu.map(item => ({
    date: new Date(item.created_at).toLocaleDateString(),
    tongdoanhthu: parseFloat(item.tongdoanhthu),
    sodukhadung: parseFloat(item.sodukhadung),
  }));

  // Calculate summary statistics
  const totalRevenue = chartData.reduce((acc, item) => acc + item.tongdoanhthu, 0);
  const averageRevenue = chartData.length ? (totalRevenue / chartData.length).toFixed(2) : 0;
  const maxRevenue = chartData.length ? Math.max(...chartData.map(i => i.tongdoanhthu)) : 0;
  const minRevenue = chartData.length ? Math.min(...chartData.map(i => i.tongdoanhthu)) : 0;

  if (loading) {
    return (
      <Box sx={{ width: '100%', padding: '20px', backgroundColor: '#1a202c', borderRadius: '8px' }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
          Thống Kê Doanh Thu theo Thời Gian
        </Typography>
        <Typography sx={{ color: '#ffffff' }}>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ width: '100%', padding: '20px', backgroundColor: '#1a202c', borderRadius: '8px' }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
          Thống Kê Doanh Thu theo Thời Gian
        </Typography>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (chartData.length === 0) {
    return (
      <Box sx={{ width: '100%', padding: '20px', backgroundColor: '#1a202c', borderRadius: '8px' }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
          Thống Kê Doanh Thu theo Thời Gian
        </Typography>
        <Typography sx={{ color: '#ffffff' }}>No data available.</Typography>
      </Box>
    );
  }

  const LoadingSkeleton = () => (
    <Box sx={{ width: '100%', padding: '20px', backgroundColor: '#1a202c', borderRadius: '8px' }}>
      <Skeleton variant="text" width="40%" height={40} />
      <Skeleton variant="rectangular" width="100%" height={400} />
    </Box>
  );

  const handleMetricChange = (event) => {
    setMetric(event.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          width: '100%',
          padding: '20px',
          backgroundColor: '#1a202c',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.7)',
          }
        }}
      >
        <motion.div
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}
          >
            Thống Kê Doanh Thu theo Thời Gian
          </Typography>
        </motion.div>

        {/* Summary Statistics */}
        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
          <Box>
            <Typography variant="subtitle1" sx={{ color: '#ffffff' }}>Tổng Doanh Thu</Typography>
            <Typography variant="h6" sx={{ color: '#ffffff' }}>{totalRevenue.toLocaleString()} VND</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ color: '#ffffff' }}>Doanh Thu Trung Bình</Typography>
            <Typography variant="h6" sx={{ color: '#ffffff' }}>{averageRevenue} VND</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ color: '#ffffff' }}>Doanh Thu Tối Đa</Typography>
            <Typography variant="h6" sx={{ color: '#ffffff' }}>{maxRevenue.toLocaleString()} VND</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ color: '#ffffff' }}>Doanh Thu Tối Thiểu</Typography>
            <Typography variant="h6" sx={{ color: '#ffffff' }}>{minRevenue.toLocaleString()} VND</Typography>
          </Box>
        </Box>

        {/* Metric Selector */}
        <Box sx={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <Select
            value={metric}
            onChange={handleMetricChange}
            displayEmpty
            sx={{
              width: '200px',
              backgroundColor: '#2d3748',
              color: '#ffffff',
              '& .MuiSelect-icon': { color: '#ffffff' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#4a5568' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#4a5568' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4a5568' },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: '#2d3748',
                  color: '#ffffff',
                },
              },
            }}
          >
            <MenuItem value="tongdoanhthu">Tổng Doanh Thu</MenuItem>
            <MenuItem value="sodukhadung">Số Dư Khả Dụng</MenuItem>
          </Select>
        </Box>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="colorTongDoanhThu" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorSoDuKhaDung" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#ffffff33" // Semi-transparent white
              className="animate-pulse"
            />

            <XAxis
              dataKey="date"
              stroke="#ffffff"
              tick={{ fill: '#ffffff' }}
              tickLine={{ stroke: '#ffffff' }}
            />

            <YAxis
              stroke="#ffffff"
              tick={{ fill: '#ffffff' }}
              tickLine={{ stroke: '#ffffff' }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(26, 32, 44, 0.9)', // Dark tooltip background
                borderRadius: '8px',
                padding: '10px',
                border: 'none',
                boxShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }}
              labelStyle={{ color: '#ffffff' }}
              itemStyle={{ color: '#ffffff' }}
              formatter={(value) => `${value.toLocaleString()} VND`}
            />

            <Legend
              wrapperStyle={{
                color: '#ffffff',
                animation: 'barPulse 2s infinite',
              }}
            />

            <Line
              type="monotone"
              dataKey={metric}
              stroke={metric === 'tongdoanhthu' ? 'url(#colorTongDoanhThu)' : 'url(#colorSoDuKhaDung)'}
              strokeWidth={3}
              dot={{ strokeWidth: 2 }}
              activeDot={{ r: 8, strokeWidth: 0 }}
              name={metric === 'tongdoanhthu' ? 'Tổng Doanh Thu' : 'Số Dư Khả Dụng'}
              animationDuration={2000}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </motion.div>
  );
};

const CustomChart = () => {
  const [khoahoc, setKhoahoc] = useState([]);
  const [showLatest, setShowLatest] = useState(false);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const khoahocRes = await GiangvienKhoaHoc();
        setKhoahoc(khoahocRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const latestTimestamp = khoahoc.length
    ? Math.max(...khoahoc.map(item => new Date(item.created_at).getTime()))
    : null;

  const filteredData = showLatest
    ? khoahoc.filter(item => new Date(item.created_at).getTime() === latestTimestamp)
    : khoahoc;

  const applyFilter = (data) => {
    switch (filter) {
      case 'discount':
        return data.filter(item => item.giamgia > 0);
      case 'priceAbove100':
        return data.filter(item => Number(item.gia) > 100);
      default:
        return data;
    }
  };

  const chartData = applyFilter(filteredData).map((item) => ({
    id: item.id,
    ten: item.ten,
    gia: Number(item.gia || 0),
    giamgia: Number(item.giamgia || 0),
    giaGoc: Number(item.gia || 0) * (1 + Number(item.giamgia || 0) / 100),
    date: new Date(item.created_at).toLocaleDateString(),
    latest: new Date(item.created_at).getTime() === latestTimestamp,
  }));

  // Summary Statistics
  const totalCourses = chartData.length;
  const averagePrice = chartData.length ? (chartData.reduce((acc, item) => acc + item.gia, 0) / chartData.length).toFixed(2) : 0;
  const totalDiscount = chartData.reduce((acc, item) => acc + item.giamgia, 0);
  if (isLoading) {
    return (
      <Box sx={{ width: '100%' }} className="p-4 bg-gray-800 rounded-lg animate-pulse">
        <div className="h-[400px] bg-gray-700 rounded-lg" />
      </Box>
    );
  }
  return (
    <Box
      sx={{ width: '100%' }}
      className="p-4 bg-gray-800 rounded-lg transform transition-all hover:scale-[1.01] duration-300"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h6" gutterBottom sx={{ color: '#FFFFFF' }}>
          Thống Kê Khóa Học
        </Typography>
      </motion.div>

      {/* Summary Statistics */}
      <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 3 }}>
        <Typography variant="subtitle1" sx={{ color: '#FFFFFF' }}>Tổng Khóa Học: {totalCourses}</Typography>
        <Typography variant="subtitle1" sx={{ color: '#FFFFFF' }}>Giá Trung Bình: {averagePrice} VND</Typography>
        <Typography variant="subtitle1" sx={{ color: '#FFFFFF' }}>Tổng Giảm Giá: {totalDiscount}%</Typography>
      </Box>

      {/* Filters */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={showLatest}
              onChange={() => setShowLatest(!showLatest)}
              sx={{
                color: '#ffffff',
                '&.Mui-checked': { color: '#4ade80' },
              }}
            />
          }
          label={showLatest ? 'Hiện tất cả' : 'Xem khóa học mới nhất'}
          sx={{ color: '#ffffff' }}
        />
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          displayEmpty
          sx={{ width: '200px' }}
        >
          <MenuItem value="all">Tất cả</MenuItem>
          <MenuItem value="discount">Có Giảm Giá</MenuItem>
          <MenuItem value="priceAbove100">Giá Trên 100 VND</MenuItem>
        </Select>
      </Stack>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            {/* Enhanced gradients with more vibrant colors */}
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.9}>
                <animate
                  attributeName="stop-color"
                  values="#4f46e5;#818cf8;#4f46e5"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.2} />
            </linearGradient>

            {/* ... other gradients ... */}
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#374151"
            className="animate-pulse opacity-50"
          />

          <XAxis
            dataKey="ten"
            tick={{ fill: '#FFFFFF' }}
            angle={-45}
            textAnchor="end"
            height={60}
            className="transition-transform duration-500 ease-in-out"
          />

          <Line
            type="monotone"
            dataKey="gia"
            stroke="url(#priceGradient)"
            strokeWidth={3}
            dot={{
              r: 4,
              strokeWidth: 2,
              fill: '#fff',
              className: 'animate-pulse'
            }}
            activeDot={{
              r: 8,
              className: 'animate-ping'
            }}
            className="filter drop-shadow-lg"
          />

          {/* Similar enhancements for other Line components */}

          <Tooltip
            content={<CustomTooltip />}
            wrapperStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: 'none',
              borderRadius: '8px',
              padding: '10px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              animation: 'fadeIn 0.3s ease-in-out'
            }}
          />
        </LineChart>
      </ResponsiveContainer>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </Box>
  );
};
"use client";
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
  FaBook,
  FaGraduationCap,
  FaTrophy,
  FaBookmark,
  FaUser,
  FaDollarSign,
  FaUsers,
  FaClock,
  FaMoneyBill,
  FaExclamationTriangle,
  FaChartLine,
  FaChartBar,
  FaChartPie
} from 'react-icons/fa';
import { StarIcon } from '@heroicons/react/24/solid';
import { Area } from 'recharts';

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
    background:  black;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
    font-size: 1.8rem;
    color: black;
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

export default function Homedashboardlecturer() {
  const [data, setData] = useState([]);
  const [khoahoc, setKhoahoc] = useState([]);
  const [doanhthu, setDoanhthu] = useState({});
  const [khoahocdamua, setKhoahocdamua] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const dashboardRes = await Dashboard();
        localStorage.setItem('lecturerId', JSON.stringify(dashboardRes.data));
        setData(dashboardRes.data);

        const khoahocRes = await GiangvienKhoaHoc();
        setKhoahoc(khoahocRes.data);
        console.log(khoahocRes.data);

        const khoahocdamuaRes = await GiangvienKhoaHocDaMua();
        setKhoahocdamua(khoahocdamuaRes.data);

        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem('lecturerId');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      fetch('https://huuphuoc.id.vn/api/DoanhThuGiangVien', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_giangvien: parsedData.giangvien }),
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
    }
  }, []);

  useEffect(() => {
    if (isDataLoaded) {
      // console.log(data.giangvien);
      // console.log("khoahoc", khoahoc);
      // console.log(khoahocdamua);
      // console.log(doanhthu, "doanhthu");
    }
  }, [isDataLoaded, data, khoahoc, khoahocdamua, doanhthu]);

  // console.log(doanhthu, "doanhthu");
  const khoahocbanchay = khoahoc.reduce((max, current) => {
    return (current.ThanhToan.length > max.ThanhToan.length) ? current : max;
  }, { khoahoc: '', ThanhToan: [] });

  console.log(khoahocbanchay);
  const khoahocMaxSotien = khoahoc.reduce((max, current) => {
    // Tính tổng số tiền cho khóa học hiện tại
    const totalSotienCurrent = current.ThanhToan.reduce((sum, item) => sum + item.tong, 0);

    // Tính tổng số tiền cho khóa học có nhiều tiền nhất cho đến hiện tại
    const totalSotienMax = max.ThanhToan.reduce((sum, item) => sum + item.tong, 0);

    // So sánh tổng số tiền, chọn khóa học có tổng số tiền cao hơn
    return totalSotienCurrent > totalSotienMax ? current : max;
  }, { khoahoc: '', ThanhToan: [] });

  const khoahocdadangky = khoahoc.length;
  const khoahocdahoanthanh = khoahoc.filter((item) => item.trangthai === "Progress").length;
  console.log(khoahoc);
  const khoahoctamdung = khoahoc.filter((item) => item.trangthai === "Notyet").length;
  const khoahocdanghoc = khoahocdamua.length;
  const tongdoanhthu = doanhthu.tongdoanhthu || 0;
  const sodukhadung = doanhthu.sodukhadung || 0;
  const activeCoursesCount = khoahoc.filter(course => course.trangthai === "active").length;
  const TongSoHS = khoahoc.reduce((total, course) => {
    return total + (course.ThanhToan ? course.ThanhToan.length : 0);
  }, 0);
  const cardData = [
    { icon: FaBook, value: khoahocdadangky, label: "Khóa học đã đăng ký" },
    { icon: FaGraduationCap, value: khoahocdanghoc, label: "Khóa học đang học" },
    { icon: FaTrophy, value: khoahocdahoanthanh, label: "Khóa học đã hoàn thành" },
    { icon: FaBookmark, value: khoahocdadangky, label: "Tổng khóa học của tôi" },
    { icon: FaUser, value: TongSoHS, label: "Tổng số học sinh" },
    { icon: FaDollarSign, value: sodukhadung, label: "Số dư khả dụng" },
    { icon: FaUsers, value: activeCoursesCount, label: "Tổng khóa học đang phát hành" },
    { icon: FaClock, value: khoahoctamdung, label: "Tổng khóa học tạm dừng" },
    { icon: FaMoneyBill, value: tongdoanhthu, label: "Tổng thu nhập" },
  ];
  console.log(khoahoc, "khoahoc");

  const validImageSrc = (src) => {
    if (typeof src === 'string' && (src.startsWith('/') || src.startsWith('http://') || src.startsWith('https://'))) {
      return src;
    }
    return '/default-course.jpg';
  };

  return (
    <div className="overflow-y-scroll col-lg-9">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className="right-sidebar-dashboard">
          <style jsx>{KhoaHocDangKyCss}</style>

          <div className="row g-5">
            {cardData.map((card, index) => (
              <div
                key={index}
                className="col-lg-4 col-md-6 col-sm-6 col-12"
              >
                <div className="flex flex-col items-center justify-center text-center p-4 border border-gray-200/50 rounded-lg hover:shadow-lg transition-all duration-300">
                  <div className="icon flex justify-center">
                    {React.createElement(card.icon, {
                      className: "h-10 w-10 mb-2 text-pink-600",
                      size: "2.5em"
                    })}
                  </div>
                  <h5 className="title text-xl">
                    <CountUp
                      end={card.value}
                      duration={2}
                      separator=","
                      className="counter"
                    />
                  </h5>
                  <p className="text-xl">{card.label}</p>
                </div>
              </div>
            ))}
            <div className='flex justify-center'>
              <p className='font-bold text-black text-3xl mt-8 p-0'>Thống kê khóa học</p>
            </div>
            <div className='flex'>
              <CustomChart />
              <div className='flex-grow rounded-lg'>
                <div className="ml-4 h-full flex flex-col gap-4">
                  <div className="flex-1 text-center bg-gray-100 rounded-lg transform transition-transform duration-300 hover:scale-105 w-[309.875px] h-[192.5px] flex flex-col justify-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <FaTrophy className="text-[#ff6b6b] w-6 h-6" />
                      <p className='text-xl font-semibold'>Khóa học bán chạy nhất</p>
                    </div>
                    <p className='text-[#1e3c72] text-2xl font-bold my-2'>{khoahocbanchay.ten}</p>
                    <p className='text-5xl my-2 text-[#ff6b6b]'>{khoahocbanchay.ThanhToan.length}</p>
                    <p className='text-black text-lg my-2 font-medium'>Học sinh</p>
                  </div>

                  <div className="flex-1 text-center bg-gray-100 rounded-lg transform transition-transform duration-300 hover:scale-105 w-[309.875px] h-[192.5px] flex flex-col justify-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <FaMoneyBill className="text-[#ff6b6b] w-6 h-6" />
                      <p className='text-xl font-semibold'>Khóa học có doanh thu cao nhất</p>
                    </div>
                    <p className='text-[#1e3c72] text-2xl font-bold my-2'>{khoahocMaxSotien.ten}</p>
                    <p className='text-5xl my-2 text-[#ff6b6b]'>{khoahocMaxSotien.ThanhToan.reduce((sum, item) => sum + item.tong, 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                    <p className='text-black text-lg my-2 font-medium'>Học sinh</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <div className='flex justify-center items-center gap-2'>
                <FaChartPie className="text-pink-600 w-8 h-8" />
                <p className='font-bold text-black text-3xl mt-8 p-0'>Thống kê Doanh Thu</p>
              </div>
              <div className='mt-10'>
                {data?.giangvien && (
                  <DoanhThuChart />
                )}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="mb-0 font-bold text-3xl text-gray-800">Các khóa học của tôi</h5>
                  <Link href={'/page/lecturer-dashboard/quanlykhoahoc'} className="btn bg-gradient-to-r from-blue-900 via-pink-700 to-pink-700 text-white rounded-lg btn-sm hover:scale-105 transition-transform text-2xl shadow-md">
                    Xem tất cả
                  </Link>
                </div>
                {khoahoc.length > 0 ? (
                  <div className="overflow-x-auto" style={{ maxWidth: '100%' }}>
                    <div className="flex flex-nowrap px-4" style={{ minWidth: 'min-content' }}>
                      {khoahoc.map((item) => (
                        <div className="flex-none px-2 mb-4" style={{ width: '331.797px' }} key={item.id}>
                          <Link href={`/page/course-detail?id=${item.id}`}>
                            <div className="card h-[244.344px] hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col overflow-hidden border rounded-xl bg-white">
                              <Image
                                width={332}
                                height={146}
                                src={validImageSrc(item.hinh)}
                                className="w-full h-[146px] object-cover rounded-t-xl"
                                alt={item.ten || 'Course Image'}
                              />
                              <div className="flex-1 p-6 flex flex-col justify-between gap-4">
                                <div className="space-y-4">
                                  <div className="flex justify-between items-start gap-3">
                                    <h6 className="card-title font-medium text-xl line-clamp-2 leading-tight max-w-[70%] text-gray-800 h-12 overflow-hidden">
                                      {item.ten}
                                    </h6>
                                    <span
                                      className={`badge ${item.trangthai === 'Hoàn thành' ? 'bg-green-500 text-white' : item.trangthai === 'notyet' ? 'bg-red-500 text-white' : ' text-pink-700'
                                        } text-lg px-4 py-1.5 rounded-full whitespace-nowrap`}
                                    >
                                      {item.trangthai}
                                    </span>
                                  </div>
                                </div>

                               
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
                    <FaExclamationTriangle className="text-yellow-500 w-16 h-16 mb-4" />
                    <p className="text-xl text-gray-600 font-medium mb-2">Chưa có khóa học nào</p>
                    <p className="text-gray-500 mb-4">Hãy bắt đầu tạo khóa học đầu tiên của bạn</p>
                    <Link 
                      href="/page/lecturer-dashboard/quanlykhoahoc" 
                      className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-300"
                    >
                      Tạo khóa học
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>


        </div>
      )}
    </div>
  );
}

const DoanhThuChart = () => {
  const [doanhthu, setDoanhthu] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [metric, setMetric] = useState('tongdoanhthu');

  const fetchDoanhThu = async (giangvienId) => {
    if (!giangvienId) return;
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://huuphuoc.id.vn/api/DoanhThuGiangVien', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_giangvien: giangvienId }),
        referrerPolicy: 'unsafe-url',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      
      let transformedData;
      if (Array.isArray(result.data)) {
        transformedData = result.data;
      } else if (typeof result.data === 'object' && result.data !== null) {
        transformedData = [result.data];
      } else {
        transformedData = [];
      }

      setDoanhthu(transformedData);

    } catch (error) {
      console.error('Error fetching doanh thu:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initData = async () => {
      try {
        const dashboardRes = await Dashboard();
        if (dashboardRes?.data?.giangvien) {
          await fetchDoanhThu(dashboardRes.data.giangvien);
        }
      } catch (error) {
        console.error("Error initializing data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    initData();
  }, []);

  const handleReload = () => {
    fetchDoanhThu();
  };

  const chartData = doanhthu.map(item => ({
    date: new Date(item.created_at).toLocaleDateString(),
    tongdoanhthu: parseFloat(item.tongdoanhthu),
    sodukhadung: parseFloat(item.sodukhadung),
  }));

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
      <Box sx={{ width: '100%', padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#000000' }}>
        Thống Kê Doanh Thu theo Thời Gian
      </Typography>
      <Typography color="error">{error}</Typography>
      <button onClick={handleReload} className="mt-4 px-4 py-2 bg-[#000000] text-white rounded">
        Reload Data
      </button>
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
        <button onClick={handleReload} className="mt-4 px-4 py-2  bg-[#ff6b6b] text-white rounded">
          Reload Data
        </button>
      </Box>
    );
  }

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
          backgroundColor: '#f3f4f6',
          borderRadius: '12px', // Increased border radius for a softer look
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Added shadow for depth
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)', // Enhanced shadow on hover
          }
        }}
      >
        <button onClick={handleReload} className="mb-4 w-60 px-4 py-2 bg-gradient-to-r from-[#ff6b6b] to-[#ff9a9a] text-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          Reload Data
        </button>
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
              fontWeight: 'bold',
              fontSize: '1.5rem', // Increased font size for emphasis
            }}
          >
            Thống Kê Doanh Thu theo Thời Gian
          </Typography>
        </motion.div>

        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
          {[
            { label: 'Tổng Doanh Thu', value: totalRevenue.toLocaleString() },
            { label: 'Doanh Thu Trung Bình', value: averageRevenue },
            { label: 'Doanh Thu Tối Đa', value: maxRevenue.toLocaleString() },
            { label: 'Doanh Thu Tối Thiểu', value: minRevenue.toLocaleString() },
          ].map((item, index) => (
            <Box key={index} sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle1" sx={{ color: '#000000', fontWeight: '600' }}>{item.label}</Typography>
              <Typography variant="h6" sx={{ color: '#000000', fontWeight: '700' }}>{item.value} VND</Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <Select
            value={metric}
            onChange={handleMetricChange}
            displayEmpty
            sx={{
              width: '200px',
              backgroundColor: '#ff6b6b',
              color: '#ffffff',
              '& .MuiSelect-icon': { color: '#ffffff' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#ff6b6b' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ff6b6b' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ff6b6b' },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: '#ff6b6b',
                  color: '#ffffff',
                },
              },
            }}
          >
            <MenuItem value="tongdoanhthu">Tổng Doanh Thu</MenuItem>
            <MenuItem value="sodukhadung">Số Dư Khả Dụng</MenuItem>
          </Select>
        </Box>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorTongDoanhThu" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff6b6b" stopOpacity={1} />
                <stop offset="95%" stopColor="#ff6b6b" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorSoDuKhaDung" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={1} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <CartesianGrid
              strokeDasharray="5 5"
              stroke="#ffffff22"
              className="animate-pulse"
            />

            <XAxis
              dataKey="date"
              stroke="#000000"
              tick={{ fill: '#000000', fontSize: 12 }}
              tickLine={{ stroke: '#000000' }}
            />

            <YAxis
              stroke="#000000"
              tick={{ fill: '#000000', fontSize: 12 }}
              tickLine={{ stroke: '#000000' }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '12px',
                padding: '12px',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(8px)'
              }}
              labelStyle={{ color: '#000000', fontWeight: 'bold', marginBottom: '8px' }}
              itemStyle={{ color: '#000000', padding: '4px 0' }}
              formatter={(value) => `${value.toLocaleString()} VND`}
              animationDuration={200}
            />

            <Legend
              wrapperStyle={{
                color: '#000000',
                padding: '20px',
                fontWeight: 'bold'
              }}
            />

            <Line
              type="monotone"
              dataKey={metric}
              stroke={metric === 'tongdoanhthu' ? 'url(#colorTongDoanhThu)' : 'url(#colorSoDuKhaDung)'}
              strokeWidth={4}
              dot={{
                stroke: '#000000',
                strokeWidth: 2,
                r: 4,
                fill: '#000000'
              }}
              activeDot={{
                r: 8,
                strokeWidth: 0,
                fill: '#000000',
                filter: 'url(#glow)'
              }}
              name={metric === 'tongdoanhthu' ? 'Tổng Doanh Thu' : 'Số Dư Khả Dụng'}
              animationDuration={2000}
              animationEasing="ease-out"
              filter="url(#glow)"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
        
        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </motion.div>
  );
};

const CustomChart = () => {
  const [khoahoc, setKhoahoc] = useState([]);
  const [showLatest, setShowLatest] = useState(false);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    fetchData();
  }, []);

  const handleReload = () => {
    fetchData();
  };

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
      <Box sx={{ width: '70%' }} className="p-4 bg-gray-800 rounded-lg animate-pulse">
        <div className="h-[400px] bg-gray-700 rounded-lg" />
      </Box>
    );
  }

  return (
    <Box
      sx={{ width: '70%' }}
      className="p-4 bg-gradient-to-r from-[#f3f4f6] to-[#e2e8f0] backdrop-blur rounded-lg h-[400px] transform transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(79,70,229,0.3)] duration-500"
    >
      <button onClick={handleReload} className="mb-4 w-60 px-4 py-2 bg-gradient-to-r from-[#ff6b6b] to-[#ff9a9a] text-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        Reload Data
      </button>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="relative"
      >
        <Typography
          variant="h6"
          gutterBottom
          className="stock-ticker-text relative z-10"
          sx={{ color: 'black' }}
        >
          Thống Kê Khóa Học
          <span className="absolute -z-10 blur-[40px] inset-0 bg-indigo-500/30 animate-pulse-slow" />
        </Typography>
      </motion.div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.3}>
                <animate
                  attributeName="stop-color"
                  values="#4f46e5;#22c55e;#4f46e5"
                  dur="5s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.05} />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#374151"
            className="animate-fade-in-out"
          />

          <XAxis
            dataKey="date"
            stroke="#000000"
            className="animate-slide"
          />

          <YAxis
            stroke="#000000"
            className="animate-number-scroll"
          />

          <Area
            type="monotone"
            dataKey="gia"
            stroke="none"
            fill="url(#areaGradient)"
            className="animate-enhanced-wave"
          />

          <Line
            type="monotone"
            dataKey="gia"
            stroke="#4f46e5"
            strokeWidth={3}
            filter="url(#neon-glow)"
            dot={(props) => {
              if (!props || typeof props.value === 'undefined') return null;
              const isUp = props.value > (chartData[props.index - 1]?.gia ?? props.value);
              return (
                <svg
                  x={props.cx - 8}
                  y={props.cy - 8}
                  width="16"
                  height="16"
                  className={`trend-icon ${isUp ? 'trend-up' : 'trend-down'} `}
                >
                  <circle
                    cx="8"
                    cy="8"
                    r="6"
                    fill={isUp ? '#22c55e' : '#ef4444'}
                    className="animate-pulse-slow"
                  />
                  <path
                    d={isUp ? "M0 10L6 4L12 10" : "M0 4L6 10L12 4"}
                    stroke="#000000"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              );
            }}
            activeDot={{
              r: 10,
              fill: '#4f46e5',
              className: "active-dot"
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
              border: '1px solid #4f46e5',
              borderRadius: '8px',
              color: '#000000',
              padding: '10px'
            }}
            formatter={(value, name, props) => {
              if (!props || !props.payload) return [value];
              const course = props.payload;
              return [
                <div key="tooltip" className="tooltip-content">
                  <div className="font-bold mb-2">{course.ten}</div>
                  <div>Giá: {value.toLocaleString()} VND</div>
                  {course.giamgia > 0 && (
                    <div className="text-red-500">Giảm giá: {course.giamgia}%</div>
                  )}
                </div>
              ];
            }}
            labelFormatter={(label) => `Ngày: ${label}`}
            className="animate-tooltip"
          />
        </LineChart>
      </ResponsiveContainer>

      <style jsx>{`
        .stock-ticker-text {
          text-shadow: 0 0 15px rgba(79, 70, 229, 0.8);
          animation: tickerGlow 3s ease-in-out infinite;
        }
    
        .animate-enhanced-wave {
          animation: enhancedWave 4s ease-in-out infinite;
        }
    
        @keyframes enhancedWave {
          0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
          50% { transform: translateY(-10px) scale(1.05); opacity: 0.9; }
        }
    
        .active-dot {
          filter: url(#neon-glow);
          animation: activeDotPulse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
    
        @keyframes activeDotPulse {
          0% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.5); filter: brightness(1.5); }
          100% { transform: scale(1); filter: brightness(1); }
        }
    
        .animate-tooltip {
          animation: fadeInTooltip 1.5s ease-in-out infinite;
        }
    
        @keyframes fadeInTooltip {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }

        .tooltip-content {
          min-width: 200px;
        }
      `}</style>
    </Box>
  );
};
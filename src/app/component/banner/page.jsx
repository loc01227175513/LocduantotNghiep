"use client";
import React, { useEffect, useState } from "react";
import { fetchBanner } from "../../../service/Banner/Banner";

import Image from "next/image";

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBanner();
        setBannerData(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData = bannerData.filter((banner) => banner.trangthai !== 1);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="relative  bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container relative mx-auto px-4 py-12">
      <div className="flex flex-wrap">
  {filteredData.map((banner) => (
    <div
      key={banner.id}
      className="lg:w-1/2 animate-fade-in flex" // Added flex here
    >
      <div className="flex flex-col justify-center w-full"> {/* Adjusted to take full height */}
        <div className="flex items-center space-x-3 animate-bounce-slow">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-pink-200 backdrop-blur-sm">
            <i className="bi bi-lightbulb text-gray-600 text-2xl"></i>
          </div>
          <span className="text-gray-600 font-medium text-xl">
            Cổng vào Học tập suốt đời
          </span>
        </div>

        <p className="text-6xl font-extrabold leading-tight bg-gradient-to-r from-blue-900 via-pink-700 to-pink-700 bg-clip-text text-transparent animate-gradient">
          {banner.tieude}
        </p>
        <span className="block text-blue-800 font-bold text-5xl">
          Nền tảng học trực tuyến
        </span>

        <p className="text-gray-800 text-2xl max-w-2xl leading-relaxed backdrop-blur-sm mt-3 mb-3">
          {banner.mota}
        </p>

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-pink-200">
                <i className="bi bi-mortarboard text-gray-600 text-2xl"></i>
              </div>
            </div>
            <div className="space-y-1">
              <h6 className="font-bold text-gray-900 text-xl">2000+ sinh viên</h6>
              <span className="text-xl text-gray-500">Tham gia lớp học trực tuyến</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-pink-200">
                <i className="bi bi-backpack4 text-gray-600 text-2xl"></i>
              </div>
            </div>
            <div className="space-y-1">
              <h6 className="font-bold text-gray-900 text-xl">4.5</h6>
              <span className="text-xl text-gray-500">Đánh giá 2.4K</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-pink-200">
                <i className="bi bi-buildings-fill text-gray-600 text-2xl"></i>
              </div>
            </div>
            <div className="space-y-1">
              <h6 className="font-bold text-gray-900 text-xl">100+</h6>
              <span className="text-xl text-gray-500">Khóa học trực tuyến</span>
            </div>
          </div>
        </div>
        <div className="flex justify-start mt-5">
          <a
            href="/page/Cours-Filter"
            className="w-[220px] flex justify-center mr-5 group px-4 py-4 bg-gradient-to-r from-blue-900 via-pink-700 to-pink-700 text-white rounded-full font-semibold hover:from-pink-700 hover:to-pink-700 transition-all duration-300 flex items-center space-x-2" // Ensures a 20px margin on the right
          >
            <span className="text-2xl" style={{fontWeight:"normal"}}>Xem tất cả khóa học</span>
            <i className="fa-regular fa-arrow-right group-hover:translate-x-1 transition-transform mt-1"></i>
          </a>
        </div>
      </div>
    </div>
  ))}

  <div className="w-full lg:w-1/2 mt-12 lg:mt-0 pb-10">
    {filteredData.length > 0 && (
      <div className="relative animate-float">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl transform -rotate-6"></div>
        <Image
          width={800}
          height={800}
          src={filteredData[0].hinh}
          alt="banner"
          className="relative rounded-2xl shadow-2xl hover:shadow-pink-500 transition-all duration-300"
        />
      </div>
    )}
  </div>
</div>
      </div>
    </div>
  );
};

export default Banner;

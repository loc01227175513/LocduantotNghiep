"use client";
import React, { useEffect, useState } from 'react';
import { fetchBanner } from '../../../service/Banner/Banner';

import Image from 'next/image';

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

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
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
        <div className="flex flex-wrap items-center">
          {filteredData.map((banner) => (
            <div key={banner.id} className="w-full lg:w-1/2 space-y-8 animate-fade-in">
              <div className="space-y-6">
                <div className="flex items-center space-x-3 animate-bounce-slow">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 backdrop-blur-sm">
                    <i className="bi bi-lightbulb text-blue-500 text-xl"></i>
                  </div>
                  <span className="text-gray-600 font-medium">Cổng vào Học tập suốt đời</span>
                </div>
                
                <h1 className="text-5xl font-extrabold leading-tight bg-gradient-to-r from-gray-900 via-blue-600 to-gray-600 bg-clip-text text-transparent animate-gradient">
                  {banner.tieude}
                  <span className="block text-blue-500">việc học trực tuyến</span>
                </h1>
                
                <p className="text-gray-600 text-lg max-w-2xl leading-relaxed backdrop-blur-sm">
                  {banner.mota}
                </p>

                <div className="flex flex-wrap items-center gap-6">
                  <a href="/page/Cours-Filter" 
                     className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2">
                    <span>Xem tất cả khóa học</span>
                    <i className="fa-regular fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                  </a>

                  <div className="flex items-center space-x-4">
                    <div className="flex -space-x-4">
                      <Image
                        src={banner.hinh}
                        alt="student"
                        className="w-12 h-12 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform"
                        width={100} height={100}
                      />
                    </div>
                    <div className="space-y-1">
                      <h6 className="font-bold text-gray-900">2000+ sinh viên</h6>
                      <span className="text-sm text-gray-500">Tham gia lớp học trực tuyến của chúng tôi</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
            {filteredData.length > 0 && (
              <div className="relative animate-float">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl transform -rotate-6"></div>
                <Image 
                  width={1000} height={1000} 
                  src={filteredData[0].hinh} 
                  alt="banner"
                  className="relative rounded-2xl shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-white">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10">
              <i className="bi bi-backpack4 text-blue-500 text-2xl"></i>
            </div>
            <div>
              <h6 className="text-2xl font-bold text-gray-900">4.5</h6>
              <span className="text-gray-500">Đánh giá 2.4K</span>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-white">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10">
              <i className="bi bi-buildings-fill text-blue-500 text-2xl"></i>
            </div>
            <div>
              <h6 className="text-2xl font-bold text-gray-900">100+</h6>
              <span className="text-gray-500">Khóa học trực tuyến</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
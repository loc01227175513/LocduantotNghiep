"use client";
import React, { useEffect, useState } from "react";
import { Dashboard } from "../../../../service/dashbordStuden/Dashboard-service";
import { KhoaHocDaHoc } from "../../../../service/dashbordStuden/Dashboard-service";

export default function Homedashboardstudent() {
  const [data, setData] = useState([]);
  const [khoahocdahoc, setKhoahocdahoc] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  const calculateMinutesDifference =(date) => { 
    const now = new Date(); 
    const pastDate = new Date(date); 
  
    const diffInMs = now.getTime() - pastDate.getTime();
    
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  
    if (diffInMinutes > 10080) {
      return date.split("T")[0]; 
    } else if (diffInMinutes > 1440) { 
      return `${Math.floor(diffInMinutes / 1440)} ngày trước`; 
    } else if (diffInMinutes >= 60) {
      return `${Math.floor(diffInMinutes / 60)} giờ trước`; 
    } else if (diffInMinutes < 60) { 
      return `${diffInMinutes} phút trước`;
    }
  
    return `${diffInMinutes} phút trước`;
  }
  useEffect(() => {
    setLoading(true);
    Promise.all([
      Dashboard().catch(() => ({ data: [] })),
      KhoaHocDaHoc().catch(() => ({ data: [] }))
    ])
      .then(([dashboardRes, khoahocRes]) => {
        setData(dashboardRes.data || []);
        setKhoahocdahoc(khoahocRes.data || []);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
        setData([]);
        setKhoahocdahoc([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  console.log(data);
  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(data.length);
  console.log(khoahocdahoc.length);
  console.log(data);

  return (
    <div className="p-8 col-lg-9">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {/* Enrolled Courses Card */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <i className="fal fa-book-open text-blue-500 text-4xl"/>
            <h3 className="font-bold text-[24px] tracking-tight">{data.length}</h3>
          </div>
          <p className="text-gray-600 text-[15px] ">Khóa học ghi danh</p>
        </div>

        {/* Active Courses Card */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <i className="fa-regular fa-graduation-cap text-green-500 text-4xl"/>
            <h3 className="font-bold text-4xl">
              {data.reduce(
                (count, item) =>
                  count +
                  item.khoahocs.filter(
                    (khoahoc) => khoahoc.trangthai === "active"
                  ).length,
                0
              )}
            </h3>
          </div>
          <p className="text-gray-600 text-[15px] ">Khóa học tích cực</p>
        </div>

        {/* Completed Courses Card */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <i className="fa-light fa-trophy text-yellow-500 text-4xl"/>
            <h3 className="font-bold text-4xl">{khoahocdahoc.length}</h3>
          </div>
          <p className="text-gray-600 text-[15px] ">Khóa học hoàn thành</p>
        </div>
      </div>

      {/* Course List */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[20px] font-medium tracking-tight">Các khóa học của tôi</h2>
          {data.length > 0 && (
            <button 
              onClick={() => setShowAll(!showAll)}
              className="px-4 py-2 text-pink-700 w-60 hover:text-pink-700 font-medium text-[15px] hover:bg-pink-100  rounded-lg transition-colors"
            >
              {showAll ? 'Ẩn bớt' : 'Xem tất cả'}
            </button>
          )}
        </div>

        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <i className="fal fa-books text-gray-400 text-6xl mb-4"></i>
            <p className="text-gray-500 text-lg">Bạn chưa đăng ký khóa học nào</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead>
                <tr className="border-b-2">
                  <th className="text-left py-5 px-6 w-2/5 text-[16px] font-medium">Khóa học</th>
                  <th className="text-left py-5 px-6 w-2/5 text-[16px] font-medium">Giảng viên</th>
                  <th className="text-left py-5 px-6 w-1/5 text-[16px] font-medium">Ngày đăng ký</th>
                </tr>
              </thead>
              <tbody>
                {data.slice(0, showAll ? data.length : 4).map((item, itemIndex) => (
                  item.khoahocs.map((khoahoc, khoahocIndex) => (
                    <tr 
                      key={`${itemIndex}-${khoahocIndex}`} 
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-5 px-6 text-[15px]">{khoahoc.ten}</td>
                      <td className="py-5 px-6 text-[15px]">{khoahoc.tenGiangVien}</td>
                      <td className="py-5 px-6 text-[15px]">{calculateMinutesDifference(khoahoc.updated_at)}</td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
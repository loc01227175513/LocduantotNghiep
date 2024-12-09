"use client";
import React, { useState, useEffect } from "react";
import { Oder , OderDetail} from "../../../../service/Oder/Oder";
import {Allcoursesss} from "../../../../service/course/course.service";
// Add font import
import { Roboto } from 'next/font/google';
import Image from "next/image";
export default function Khoahocdanghoc() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("");
  const [tab, setTab] = useState("today");
  const [date, setDate] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [courseDetails, setCourseDetails] = useState([]);
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
    Oder().then((response) => {
      setData(response.data);
      setFilteredData(response.data);
      // console.log(response.data);
      
    });
  }, []);


  useEffect(() => {
    let newData = data.filter((item) =>
      item.trangthai.toLowerCase().includes(filter.toLowerCase())
    );

    const today = new Date();
    if (tab === "today") {
      newData = newData.filter(item => new Date(item.created_at).toDateString() === today.toDateString());
    } else if (tab === "monthly") {
      newData = newData.filter(item => {
        const date = new Date(item.created_at);
        return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
      });
    } else if (tab === "yearly") {
      newData = newData.filter(item => new Date(item.created_at).getFullYear() === today.getFullYear());
    }

    if (date) {
      const selectedDate = new Date(date);
      newData = newData.filter(item => new Date(item.created_at).toDateString() === selectedDate.toDateString());
    }

    setFilteredData(newData);
  }, [filter, data, tab, date]);

  const handleTabChange = (newTab) => {
    setTab(newTab);
  };

  const handleViewDetails = async (orderId) => {
    try {
      setIsLoading(true);
      setSelectedOrder(orderId);
      const response = await OderDetail(orderId);
      setOrderDetails(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    Allcoursesss().then((response) => {
      setCourseDetails(response.data);
    });
  }, []);

  const closeModal = () => {
    setSelectedOrder(null);
    setOrderDetails(null);
  };
console.log(orderDetails);
  return (
    <div className="overflow-y-scroll col-lg-9 h-lvh p-4">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          {/* Tabs */}
          <ul className="flex flex-wrap gap-2" role="tablist">
            {['today', 'monthly', 'yearly'].map(tabType => (
              <li key={tabType}>
                <button
                  className={`px-6 py-2 rounded-full text-[14px] transition-all ${
                    tab === tabType
                      ? 'bg-pink-700 text-white shadow-md'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => handleTabChange(tabType)}
                >
                  {tabType === 'today' && 'Hôm nay'}
                  {tabType === 'monthly' && 'Hàng tháng'}
                  {tabType === 'yearly' && 'Hàng năm'}
                </button>
              </li>
            ))}
          </ul>

          {/* Date Picker */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-2 border rounded-lg text-[14px] focus:ring-2 focus:bg-pink-400 w-[200px]"
          />
        </div>

        {/* Filter */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Lọc theo trạng thái..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full md:w-96 px-4 py-2 border rounded-lg text-[14px] focus:ring-2 focus:bg-pink-400 placeholder:text-[14px]"
          />
        </div>

        {/* New card-based layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[16px] ">#{item.id}</span>
                  <span className={`px-3 py-1 rounded-full text-[12px] font-medium
                    ${item.trangthai === 'completed' ? 'bg-green-100 text-green-600' : 
                      item.trangthai === 'pending' ? 'bg-yellow-100 text-pink-700' : 
                      ' text-pink-700'}`}>
                    {item.trangthai}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-[14px] text-gray-600">
                    <i className="far fa-clock mr-2"></i>
                    <span>{calculateMinutesDifference(item.created_at)}</span>
                  </div>
                  <div className="flex items-center text-gray-800">
                    
                    <span className="text-[18px] ">{item.tong}VNĐ</span>
                   
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => handleViewDetails(item.id)}
                    className="w-full py-2 bg-pink-700 text-white text-[14px]  rounded-lg hover:bg-pink-300 transition-colors duration-300"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold" style={{fontFamily: '-apple-system, HelveticaNeue, Helvetica, Roboto, Droid Sans, Arial, sans-serif'}}>Chi tiết đơn hàng #{selectedOrder}</h3>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 w-10 h-10">
                  <i className="fas fa-times"></i>
                </button>
              </div>

              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto"></div>
                  <p className="mt-2 text-gray-600" style={{fontFamily: '-apple-system, HelveticaNeue, Helvetica, Roboto, Droid Sans, Arial, sans-serif'}}>Đang tải...</p>
                </div>
              ) : orderDetails ? (
                <div className="space-y-4 p-4">
                  {orderDetails.map((detail, index) => (
                    <div key={index} className="border-b pb-4 px-4">
                      <div className="flex items-center gap-4">
                        {courseDetails.find(course => course.id === detail.id_khoahoc) && (
                          <div className="relative p-2">
                            <Image 
                              width={500}
                              height={300}
                              src={courseDetails.find(course => course.id === detail.id_khoahoc).hinh || '/placeholder.png'} 
                              alt={detail.ten} 
                              className="w-20 h-20 object-cover rounded"
                            />
                            {detail.gia !== detail.giamgia && detail.giamgia !== 0 && (
                              <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded" style={{fontFamily: '-apple-system, HelveticaNeue, Helvetica, Roboto, Droid Sans, Arial, sans-serif'}}>
                                -{Math.round((1 - detail.giamgia / detail.gia) * 100)}%
                              </div>
                            )}
                          </div>
                        )}
                        <div className="p-2">
                        {courseDetails.find(course => course.id === detail.id_khoahoc) && (
                          <h4 className="font-medium text-[14px]" style={{fontFamily: '-apple-system, HelveticaNeue, Helvetica, Roboto, Droid Sans, Arial, sans-serif'}}>{courseDetails.find(course => course.id === detail.id_khoahoc).ten}</h4>
                        )}
                          <div className="flex justify-between items-center mt-2">
                            {detail.gia === 0 || detail.giamgia === 100 ? (
                              <p className="text-gray-600 text-[12px]" style={{fontFamily: '-apple-system, HelveticaNeue, Helvetica, Roboto, Droid Sans, Arial, sans-serif'}}>Miễn phí</p>
                            ) : (
                              <>
                                <p className="text-gray-600 text-[12px] px-2 line-through" style={{fontFamily: '-apple-system, HelveticaNeue, Helvetica, Roboto, Droid Sans, Arial, sans-serif'}}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(detail.gia).replace('₫', 'VNĐ')}</p>
                                <p className="text-red-500 text-[12px] px-2 font-medium" style={{fontFamily: '-apple-system, HelveticaNeue, Helvetica, Roboto, Droid Sans, Arial, sans-serif'}}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(detail.giamgia).replace('₫', 'VNĐ')}</p>
                              </>
                            )}
                          </div>

                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500" style={{fontFamily: '-apple-system, HelveticaNeue, Helvetica, Roboto, Droid Sans, Arial, sans-serif'}}>Không tìm thấy chi tiết đơn hàng</p>
              )}
            </div>
          </div>
        )}

        {/* Add empty state */}
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <i className="fas fa-box-open text-4xl text-gray-300 mb-3"></i>
            <p className="text-[14px] text-gray-500">Không có đơn hàng nào</p>
          </div>
        )}
      </div>
    </div>
  );
}
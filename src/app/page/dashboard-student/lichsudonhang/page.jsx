"use client";
import React, { useState, useEffect } from "react";
import { Oder } from "../../../../service/Oder/Oder";

// Add font import
import { Roboto } from 'next/font/google';

export default function Khoahocdanghoc() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("");
  const [tab, setTab] = useState("today");
  const [date, setDate] = useState("");
  
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
 

  return (
    <div className="overflow-y-scroll col-lg-9 h-lvh p-4 font-[Roboto]">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          {/* Tabs */}
          <ul className="flex flex-wrap gap-2" role="tablist">
            {['today', 'monthly', 'yearly'].map(tabType => (
              <li key={tabType}>
                <button
                  className={`px-6 py-2 rounded-full text-[14px] font-medium transition-all ${
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
                  <span className="text-[16px] font-medium">#{item.id}</span>
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
                    <i className="fas fa-dollar-sign mr-2"></i>
                    <span className="text-[18px] font-bold">{item.tong}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button className="w-full py-2 bg-pink-400 text-white text-[14px] font-medium rounded-lg hover:bg-pink-300 transition-colors duration-300">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

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
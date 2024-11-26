"use client";
import React, { useState, useEffect } from "react";
import { Oder } from "../../../../service/Oder/Oder";

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
    <div className="overflow-y-scroll col-lg-9 h-lvh p-4">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6 ">
          {/* Tabs */}
          <ul className="flex gap-2" role="tablist">
            {['today', 'monthly', 'yearly'].map(tabType => (
              <li key={tabType}>
                <button
                  className={`px-6 py-2 rounded-full transition-all ${tab === tabType
                    ? 'bg-[#32ADE6] text-white shadow-md'
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
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300  w-[100px]"
          />
        </div>

        {/* Filter */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Lọc theo trạng thái..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Table */}
        <div className="rounded-lg overflow-hidden border">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xl font-medium text-black">ID</th>
                <th className="px-6 py-4 text-left text-xl font-medium text-black">Khóa học</th>
                <th className="px-6 py-4 text-left text-xl font-medium text-black">Ngày</th>
                <th className="px-6 py-4 text-left text-xl font-medium text-black">Giá</th>
                <th className="px-6 py-4 text-left text-xl font-medium text-black">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">#{item.id}</td>
                  <td className="px-6 py-4 font-medium">{item.ten}</td>
                  <td className="px-6 py-4 text-gray-500">{calculateMinutesDifference(item.created_at)}</td>
                  <td className="px-6 py-4">${item.tong}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xl font-medium 
                      ${item.trangthai === 'completed'
                        ? 'status-completed'
                        : item.trangthai === 'pending'
                          ? 'status-pending'
                          : 'status-cancelled'}`}
                    >
                      {item.trangthai === 'completed' && (
                        <i className="fas fa-check-circle text-lg status-icon-completed" />
                      )}
                      {item.trangthai === 'pending' && (
                        <i className="fas fa-clock text-lg status-icon-pending" />
                      )}
                      {item.trangthai === 'cancelled' && (
                        <i className="fas fa-times-circle text-lg status-icon-cancelled" />
                      )}
                      <span>{item.trangthai}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
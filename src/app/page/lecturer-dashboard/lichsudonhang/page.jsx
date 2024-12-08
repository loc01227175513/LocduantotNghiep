"use client";
import React, { useEffect, useState } from "react";
import { GiangvienKhoaHocDaMua } from "../../../../service/Dashboard-lecture/Dashboard-lecture.jsx";
import { RiFileList3Line } from "react-icons/ri";

export default function Khoahocdanghoc() {
  const [lecturer, setLecturer] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTab, setSelectedTab] = useState("all"); // Default to "all" for no tab filter

  useEffect(() => {
    GiangvienKhoaHocDaMua().then((res) => {
      setLecturer(res.data);
    });
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  // Lọc dựa trên selectedDate
  const dateFilteredLecturer = lecturer?.filter((item) => {
    if (!selectedDate) return true;
    const itemDate = new Date(item.updated_at);
    return (
      itemDate.toLocaleDateString("en-US") ===
      new Date(selectedDate).toLocaleDateString("en-US")
    );
  });

  // Lọc dựa trên selectedTab
  const tabFilteredLecturer = dateFilteredLecturer?.filter((item) => {
    const itemDate = new Date(item.updated_at);

    switch (selectedTab) {
      case "day":
        return itemDate.toLocaleDateString("en-US") === new Date().toLocaleDateString("en-US");
      case "month":
        return (
          itemDate.getMonth() === new Date().getMonth() &&
          itemDate.getFullYear() === new Date().getFullYear()
        );
      case "year":
        return itemDate.getFullYear() === new Date().getFullYear();
      default:
        return true; // 'all' case or no tab selected
    }
  });

  return (
    <div className="col-lg-9 p-4">
      <div className="card rounded-3 shadow-sm">
        <div className="card-body">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex items-center gap-4">
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                  <button
                    className={`px-4 py-1.5 rounded-full text-xl font-medium transition-all duration-200 min-w-[88px] ${
                      selectedTab === "day"
                        ? "bg-pink-700 text-white"
                        : "hover:bg-pink-400 hover:text-white text-[#161823]"
                    }`}
                    onClick={() => handleTabChange("day")}
                  >
                    Hôm nay
                  </button>
                  <button
                    className={`px-4 py-1.5 rounded-full text-xl font-medium transition-all duration-200 min-w-[88px] ${
                      selectedTab === "month"
                        ? "bg-pink-700 text-white"
                        : "hover:bg-pink-400 hover:text-white text-[#161823]"
                    }`}
                    onClick={() => handleTabChange("month")}
                  >
                    Tháng này
                  </button>
                  <button
                    className={`px-4 py-1.5 rounded-full text-xl font-medium transition-all duration-200 min-w-[88px] ${
                      selectedTab === "year"
                        ? "bg-pink-700 text-white"
                        : "hover:bg-pink-400 hover:text-white text-[#161823]"
                    }`}
                    onClick={() => handleTabChange("year")}
                  >
                    Năm nay
                  </button>
                  <button
                    className={`px-4 py-1.5 rounded-full text-xl font-medium transition-all duration-200 min-w-[88px] ${
                      selectedTab === "all"
                        ? "bg-pink-700 text-white"
                        : "hover:bg-pink-400 hover:text-white text-[#161823]"
                    }`}
                    onClick={() => handleTabChange("all")}
                  >
                    Tất cả
                  </button>
                </div>

                <input
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="px-3 py-1.5 w-32 h-10 rounded-lg border border-[#1618231f] text-xl focus:outline-none focus:border-[#16182333] transition-colors min-w-[140px]"
                />
              </div>
            </div>
          </div>

          <h4 className="mb-4 text-xl">Lịch sử đơn hàng</h4>
           
         <div className="table-responsive">
            {tabFilteredLecturer && tabFilteredLecturer.length > 0 ? (
              <table className="table table-hover">
                <thead>
                  <tr className="table-light">
                    <th className="p-3 text-left text-xl">ID đơn hàng</th>
                    <th className="p-3 text-left text-xl">Tên khóa học</th>
                    <th className="p-3 text-left text-xl">Ngày</th>
                    <th className="p-3 text-left text-xl">Giá</th>
                    <th className="p-3 text-left text-xl">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {tabFilteredLecturer.map((item) => (
                    <tr key={item.id}>
                      <td className="p-3 align-middle text-left text-xl"># {item.id}</td>
                      <td className="p-3 align-middle text-break text-left text-xl">{item.khoahocs.ten}</td>
                      <td className="p-3 align-middle text-left text-xl">{new Date(item.updated_at).toLocaleDateString("vi-VN")}</td>
                      <td className="p-3 align-middle text-left text-xl">{item.gia === 0 ? 'Miễn phí' : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.gia)}</td>
                      <td className="p-3 align-middle text-left text-xl">
                        <span className={`badge rounded-pill ${
                          item.trangthai === 'Đã Thanh Toán' ? 'bg-danger' : 
                          item.trangthai === 'Đang xử lý' ? 'bg-warning' : 'bg-secondary'
                        }`}>
                          {item.trangthai === 'Hoàn thành' ? 'Đã hoàn thành' : item.trangthai}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <RiFileList3Line className="text-gray-400 text-7xl mb-4" />
                <p className="text-xl text-gray-500">Không có đơn hàng nào</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

        .table td, 
        .table th,
        .badge,
        .btn,
        input,
        h4,
        button {
          font-family: 'Roboto', sans-serif;
        }

        .table td {
          font-weight: 400;
        }

        h4 {
          font-weight: 500;
        }

        button {
          font-weight: 400;
        }

        .table td {
          padding: 1rem;
          white-space: normal;
          word-wrap: break-word;
        }

        .badge {
          font-weight: 500;
          padding: 0.5em 1.2em;
        }

        .btn {
          white-space: nowrap;
          border: 1px solid #dee2e6;
        }

        .btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .form-control {
          border: 1px solid #dee2e6;
        }

        .table-responsive {
          border-radius: 8px;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

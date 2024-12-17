"use client";
import React, { useMemo, useState } from "react";
import { RiFileList3Line } from "react-icons/ri";
import { KhoaHocDuocMua } from "../../../../service/Dashboard-lecture/Dashboard-lecture.jsx";

// Separate constants
const TAB_OPTIONS = [
  { key: "day", label: "Hôm nay" },
  { key: "month", label: "Tháng này" },
  { key: "year", label: "Năm nay" },
  { key: "all", label: "Tất cả" }
];

// Utility function to filter courses
const filterCourses = (courses, selectedTab, selectedDate) => {
  if (!courses) return [];

  const today = new Date();

  return courses.filter((item) => {
    const itemDate = new Date(item.updated_at);

    // Date filter
    const dateMatch = !selectedDate ||
      itemDate.toDateString() === new Date(selectedDate).toDateString();

    // Tab filter
    const tabMatch = selectedTab === "all" || (() => {
      switch (selectedTab) {
        case "day":
          return itemDate.toDateString() === today.toDateString();
        case "month":
          return (
            itemDate.getMonth() === today.getMonth() &&
            itemDate.getFullYear() === today.getFullYear()
          );
        case "year":
          return itemDate.getFullYear() === today.getFullYear();
        default:
          return true;
      }
    })();

    return dateMatch && tabMatch;
  });
};

export default function Khoahocdanghoc() {
  const [lecturer, setLecturer] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Memoized localStorage parsing with safer approach
  const parsedLecturer = useMemo(() => {
    try {
      const userData = typeof window !== 'undefined' ? localStorage.getItem('lecturerId') : null;
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing lecturer data:", error);
      return null;
    }
  }, []);

  // Consolidated data fetching effect
  React.useEffect(() => {
    const fetchCourses = async () => {
      if (!parsedLecturer?.giangvien) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const res = await KhoaHocDuocMua();
        const data = res.data.filter(item => item.khoahocs.id_giangvien === parsedLecturer.giangvien);
        setLecturer(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [parsedLecturer?.giangvien]);

  
  // Memoized filtered courses
  const filteredLecturer = useMemo(() =>
    filterCourses(lecturer, selectedTab, selectedDate),
    [lecturer, selectedTab, selectedDate]
  );

  // Deduplicated unique courses
  const uniqueCourses = useMemo(() =>
    filteredLecturer.filter((item, index, self) =>
      index === self.findIndex(t => t.khoahocs.id === item.khoahocs.id)
    ),
    [filteredLecturer]
  );

  // Render methods
  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <RiFileList3Line className="text-gray-400 text-7xl mb-4" />
      <p className="text-xl text-gray-500">Không có đơn hàng nào</p>
    </div>
  );

  const renderTableHeader = () => (
    <thead>
      <tr className="table-light">
        {[
          "ID đơn hàng",
          "Tên khóa học",
          "Ngày",
          "Giá",
          "Lượt mua",
          "Trạng thái",
          "Sau chiết khấu 10%"
        ].map(header => (
          <th key={header} className="p-3 text-left text-[14px] font-normal">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );

  const renderTableRows = () => {
    // Group orders by course ID and total amount
    const groupedOrders = filteredLecturer.reduce((acc, item) => {
      const key = `${item.khoahocs.id}_${item.tong}`; // Unique key combining course ID and total
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});

    return (
      <tbody>
        {Object.values(groupedOrders).map((orders) => (
          <tr key={`${orders[0].khoahocs.id}_${orders[0].tong}`}>
            <td className="p-3 align-middle text-left text-[14px]"># {orders[0].id}</td>
            <td className="p-3 align-middle text-break text-left text-[14px]">
              {orders[0].khoahocs.ten}
            </td>
            <td className="p-3 align-middle text-left text-[14px]">
              {new Date(orders[0].updated_at).toLocaleDateString("vi-VN")}
            </td>
            <td className="p-3 align-middle text-left text-[14px]">
              {orders[0].tong === 0
                ? 'Miễn phí'
                : new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(orders[0].tong)
              }
            </td>
            <td className="p-3 align-middle text-left text-[14px]">
              {orders.reduce((total, order) => total + order.thanhtoan.length, 0)}
            </td>
            <td className="p-3 align-middle text-left text-[14px]">
              <span className={`badge rounded-pill p-2 ${orders[0].trangthai === 'Đã Thanh Toán' ? 'bg-danger' :
                orders[0].trangthai === 'Đang xử lý' ? 'bg-warning' : 'bg-secondary'
                }`}>
                {orders[0].trangthai === 'Hoàn thành' ? 'Đã hoàn thành' : orders[0].trangthai}
              </span>
            </td>
            <td className="p-3 align-middle text-left text-[14px]">
              {orders[0].tong === 0
                ? 'Miễn phí'
                : new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(orders[0].tong * 0.9)
              }
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div className="col-lg-9 p-4">
      <div className="card rounded-3 shadow-sm">
        <div className="card-body">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex items-center gap-4">
                <div className="flex justify-center gap-2 overflow-x-auto no-scrollbar">
                  {TAB_OPTIONS.map(({ key, label }) => (
                    <button
                      key={key}
                      className={`rounded-md text-[14px] transition-all duration-200 h-[25px] w-[100px] ${selectedTab === key
                        ? "bg-pink-700 text-white"
                        : "hover:bg-pink-700 hover:text-white text-[#161823]"
                        }`}
                      onClick={() => setSelectedTab(key)}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 w-32 h-10 rounded-lg border border-[#1618231f] text-[14px] focus:outline-none focus:border-[#16182333] transition-colors min-w-[140px]"
                />
              </div>
            </div>
          </div>
          <div className="ml-4">
            <h4 className="mb-4 text-[20px] font-bold">Lịch sử đơn hàng</h4>
          </div>


          <div className="table-responsive">
            {uniqueCourses.length > 0 ? (
              <table className="table table-hover">
                {renderTableHeader()}
                {renderTableRows()}
              </table>
            ) : (
              renderEmptyState()
            )}
          </div>
        </div>
      </div>

      {/* Styles remain the same as in the original component */}
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
"use client";
import React, { useState, useEffect } from "react";
import { Oder } from "../../../../service/Oder/Oder";

export default function Khoahocdanghoc() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("");
  const [tab, setTab] = useState("today");
  const [date, setDate] = useState("");

  useEffect(() => {
    Oder().then((response) => {
      setData(response.data);
      setFilteredData(response.data);
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
                    ? 'bg-blue-600 text-white shadow-md'
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
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500  w-[100px]"
          />
        </div>

        {/* Filter */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Lọc theo trạng thái..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Table */}
        <div className="rounded-lg overflow-hidden border">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">ID</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Khóa học</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Ngày</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Giá</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">#{item.id}</td>
                  <td className="px-6 py-4 font-medium">Tên khóa học trình giữ chỗ</td>
                  <td className="px-6 py-4 text-gray-500">{item.created_at}</td>
                  <td className="px-6 py-4">${item.tong}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium 
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
      <style jsx>{`
      /* Status animations with advanced effects */
@keyframes glow-green {
  0% { 
    box-shadow: 0 0 10px rgba(34, 197, 94, 0.3);
    background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
    transform: scale(1) translateY(0);
  }
  50% { 
    box-shadow: 0 0 30px rgba(34, 197, 94, 0.6), inset 0 0 15px rgba(34, 197, 94, 0.4);
    background: linear-gradient(135deg, #bbf7d0 0%, #86efac 100%);
    transform: scale(1.03) translateY(-1px);
  }
  100% {
    box-shadow: 0 0 10px rgba(34, 197, 94, 0.3);
    background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
    transform: scale(1) translateY(0);
  }
}

@keyframes float-yellow {
  0% {
    box-shadow: 0 0 10px rgba(234, 179, 8, 0.3);
    background: linear-gradient(135deg, #fef9c3 0%, #fde047 100%);
    transform: translateY(0);
  }
  50% {
    box-shadow: 0 0 30px rgba(234, 179, 8, 0.6), inset 0 0 15px rgba(234, 179, 8, 0.4);
    background: linear-gradient(135deg, #fde047 0%, #facc15 100%);
    transform: translateY(-3px);
  }
  100% {
    box-shadow: 0 0 10px rgba(234, 179, 8, 0.3);
    background: linear-gradient(135deg, #fef9c3 0%, #fde047 100%);
    transform: translateY(0);
  }
}

@keyframes cancelled-shake {
  0%, 100% { 
    transform: translateX(0) rotate(0deg);
    box-shadow: 0 0 10px rgba(220, 38, 38, 0.3);
  }
  25% { 
    transform: translateX(-4px) rotate(-2deg);
    box-shadow: -5px 0 15px rgba(220, 38, 38, 0.5);
  }
  75% { 
    transform: translateX(4px) rotate(2deg);
    box-shadow: 5px 0 15px rgba(220, 38, 38, 0.5);
  }
}

.status-completed {
  animation: glow-green 3s ease-in-out infinite;
  color: #15803d;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(21, 128, 61, 0.2);
  backdrop-filter: blur(4px);
}

.status-pending {
  animation: float-yellow 3s ease-in-out infinite;
  color: #854d0e;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(133, 77, 14, 0.2);
  backdrop-filter: blur(4px);
}

.status-cancelled {
  animation: cancelled-shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: #991b1b;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(153, 27, 27, 0.2);
  box-shadow: 0 0 15px rgba(220, 38, 38, 0.3);
  backdrop-filter: blur(4px);
}

.status-icon-completed {
  animation: pulse 2s ease-in-out infinite;
  filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.4));
}

.status-icon-pending {
  animation: spin-glow 4s linear infinite;
  filter: drop-shadow(0 0 8px rgba(234, 179, 8, 0.4));
}

.status-icon-cancelled {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
  filter: drop-shadow(0 0 8px rgba(220, 38, 38, 0.4));
}
      /* Enhanced status animations */
@keyframes glow-green {
  0% { 
    box-shadow: 0 0 5px rgba(34, 197, 94, 0.2);
    background: #dcfce7;
    transform: scale(1);
  }
  50% { 
    box-shadow: 0 0 25px rgba(34, 197, 94, 0.6), inset 0 0 10px rgba(34, 197, 94, 0.4);
    background: #bbf7d0;
    transform: scale(1.02);
  }
  100% {
    box-shadow: 0 0 5px rgba(34, 197, 94, 0.2);
    background: #dcfce7;
    transform: scale(1);
  }
}

@keyframes glow-yellow {
  0% {
    box-shadow: 0 0 5px rgba(234, 179, 8, 0.2);
    background: #fef9c3;
    transform: translateY(0);
  }
  50% {
    box-shadow: 0 0 25px rgba(234, 179, 8, 0.6), inset 0 0 10px rgba(234, 179, 8, 0.4);
    background: #fef08a;
    transform: translateY(-2px);
  }
  100% {
    box-shadow: 0 0 5px rgba(234, 179, 8, 0.2);
    background: #fef9c3;
    transform: translateY(0);
  }
}

@keyframes spin-glow {
  0% {
    transform: rotate(0deg) scale(1);
    text-shadow: 0 0 5px currentColor;
    opacity: 0.8;
  }
  50% {
    transform: rotate(180deg) scale(1.2);
    text-shadow: 0 0 20px currentColor;
    opacity: 1;
  }
  100% {
    transform: rotate(360deg) scale(1);
    text-shadow: 0 0 5px currentColor;
    opacity: 0.8;
  }
}

@keyframes shake {
  0%, 100% { 
    transform: translateX(0) rotate(0deg); 
  }
  25% { 
    transform: translateX(-4px) rotate(-2deg); 
  }
  75% { 
    transform: translateX(4px) rotate(2deg); 
  }
}

@keyframes pulse {
  0% { 
    transform: scale(1);
    opacity: 1;
    text-shadow: 0 0 5px currentColor;
  }
  50% { 
    transform: scale(1.2);
    opacity: 0.8;
    text-shadow: 0 0 20px currentColor;
  }
  100% { 
    transform: scale(1);
    opacity: 1;
    text-shadow: 0 0 5px currentColor;
  }
}

/* Update animation durations */
.status-completed {
  animation: glow-green 3s ease-in-out infinite;
}

.status-pending {
  animation: glow-yellow 3s ease-in-out infinite;
}

.status-icon-completed {
  animation: pulse 2s ease-in-out infinite;
}

.status-icon-pending {
  animation: spin-glow 4s linear infinite;
}

.status-icon-cancelled {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}
      @keyframes glow-green {
  0%, 100% { 
    box-shadow: 0 0 5px rgba(34, 197, 94, 0.2);
    background: #dcfce7;
  }
  50% { 
    box-shadow: 0 0 20px rgba(34, 197, 94, 0.4);
    background: #bbf7d0;
  }
}

@keyframes glow-yellow {
  0%, 100% { 
    box-shadow: 0 0 5px rgba(234, 179, 8, 0.2);
    background: #fef9c3;
  }
  50% { 
    box-shadow: 0 0 20px rgba(234, 179, 8, 0.4);
    background: #fef08a;
  }
}

@keyframes spin-glow {
  0% {
    transform: rotate(0deg);
    text-shadow: 0 0 5px currentColor;
  }
  50% {
    text-shadow: 0 0 15px currentColor;
  }
  100% {
    transform: rotate(360deg);
    text-shadow: 0 0 5px currentColor;
  }
}

.status-completed {
  animation: glow-green 2s infinite;
  background: #dcfce7;
  color: #15803d;
  transition: all 0.3s ease;
}

.status-pending {
  animation: glow-yellow 2s infinite;
  background: #fef9c3;
  color: #854d0e;
  transition: all 0.3s ease;
}

.status-cancelled {
  background: #fee2e2;
  color: #991b1b;
  transition: all 0.3s ease;
}

.status-icon-completed {
  animation: pulse 2s infinite;
}

.status-icon-pending {
  animation: spin-glow 3s linear infinite;
}

.status-icon-cancelled {
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  75% { transform: translateX(2px); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
}
      @keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}`}</style>
    </div>
  );
}
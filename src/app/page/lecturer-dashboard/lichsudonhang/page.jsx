"use client";
import React, { useEffect, useState } from "react";
import { GiangvienKhoaHocDaMua } from "../../../../service/Dashboard-lecture/Dashboard-lecture.jsx";

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
    <div className="col-lg-9 overflow-y-scroll h-lvh">
      <div
        className="rts-reviewd-area-dashed table-responsive"
        style={{ whiteSpace: "nowrap" }}
      >
        <div className="calender-and-tab-btn-between">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${selectedTab === "day" ? "active" : ""}`}
                id="home-tab"
                type="button"
                role="tab"
                onClick={() => handleTabChange("day")}
              >
                Hôm nay
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${selectedTab === "month" ? "active" : ""}`}
                id="profile-tab"
                type="button"
                role="tab"
                onClick={() => handleTabChange("month")}
              >
                Hàng tháng
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${selectedTab === "year" ? "active" : ""}`}
                id="contact-tab"
                type="button"
                role="tab"
                onClick={() => handleTabChange("year")}
              >
                Hàng năm
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${selectedTab === "all" ? "active" : ""}`}
                type="button"
                onClick={() => handleTabChange("all")}
              >
                Tất cả
              </button>
            </li>
          </ul>
          <div className="date-picker-area">
            <input
              placeholder="Select your date"
              type="date"
              name="checkIn"
              id="datepicker"
              value={selectedDate}
              onChange={handleDateChange}
              className="calendar"
            />
          </div>
        </div>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home"
            role="tabpanel"
          >
            <h5 className="title">Lịch sử đặt hàng</h5>
            <table className="table-reviews quiz mb--0">
              <thead>
                <tr>
                  <th style={{ width: "10%" }}>ID đặt hàng</th>
                  <th style={{ width: "35%" }}>Tên khóa học</th>
                  <th style={{ width: "20%" }}>Ngày</th>
                  <th style={{ width: "10%" }}>Giá</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {tabFilteredLecturer && tabFilteredLecturer.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="information-quiz">
                        <p className="quiz">#4601</p>
                      </div>
                    </td>
                    <td>
                      <span className="questions">{item.khoahocs.ten}</span>
                    </td>
                    <td>
                      <span className="marks">{new Date(item.updated_at).toLocaleDateString("en-US")}</span>
                    </td>
                    <td>
                      <span>${item.gia}</span>
                    </td>
                    <td>
                      <div className="hold-area">
                        <span>{item.trangthai}</span>
                        <span className="hold-i icon-wrapper">
                          <i className="fa-regular fa-clipboard-list icon-pulse" />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {tabFilteredLecturer && tabFilteredLecturer.map((item) => (
        <tr key={item.id} className="table-row animate-fade-in">

        </tr>
      ))}


      <style jsx>{`
  /* Modern fade in animation for table rows */
  .animate-fade-in {
    animation: fadeIn 0.6s ease-out forwards;
    opacity: 0;
    transform: translateY(10px);
  }

  /* Smooth hover effects for table rows */
  tr:hover {
    transition: all 0.3s ease;
    background-color: rgba(0, 123, 255, 0.05);
    transform: translateX(5px);
  }

  /* Tab button animations */
  .nav-link {
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .nav-link:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #0d6efd;
    transition: width 0.3s ease;
  }

  .nav-link:hover:after {
    width: 100%;
  }

  .nav-link.active {
    animation: activeTab 0.3s ease-out forwards;
  }

  /* Date picker styling */
  .calendar {
    transition: all 0.3s ease;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 8px;
  }

  .calendar:focus {
    border-color: #0d6efd;
    box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
    transform: scale(1.02);
  }

  /* Status indicator animations */
  .hold-area {
    transition: all 0.3s ease;
  }

  .hold-area:hover {
    transform: translateY(-2px);
  }

  /* Keyframe animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes activeTab {
    from {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    to {
      transform: scale(1);
    }
  }

  /* Table header styling */
  th {
    position: relative;
    transition: all 0.3s ease;
  }

  th:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #0d6efd, transparent);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  th:hover:after {
    transform: scaleX(1);
  } 
   /* Icon styling and animations */
  .icon-wrapper {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(145deg, #f0f0f0, #ffffff);
    box-shadow: 3px 3px 6px #d9d9d9, -3px -3px 6px #ffffff;
    transition: all 0.3s ease;
  }

  .icon-wrapper:hover {
    transform: translateY(-3px);
    box-shadow: 5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff;
  }

  .icon-pulse {
    color: #0d6efd;
    font-size: 1.1em;
    animation: iconPulse 2s infinite;
  }

  @keyframes iconPulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
      color: #0091ff;
    }
    100% {
      transform: scale(1);
    }
  }

  .hold-area:hover .icon-wrapper {
    background: linear-gradient(145deg, #0d6efd, #0091ff);
  }

  .hold-area:hover .icon-pulse {
    color: white;
    animation: iconSpin 0.5s ease-out;
  }

  @keyframes iconSpin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
    /* Text styling enhancements */
  .questions {
    background: linear-gradient(45deg, #2962ff, #2979ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .questions:hover {
    transform: scale(1.02);
    background: linear-gradient(45deg, #1e88e5, #2962ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .marks {
    color: #757575;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  .marks:hover {
    color: #424242;
  }

  .quiz {
    color: #ff3d00;
    font-weight: 600;
    text-shadow: 1px 1px 1px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
  }

  .quiz:hover {
    color: #dd2c00;
    transform: scale(1.05);
  }

  .hold {
    background: linear-gradient(45deg, #00c853, #00e676);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.3s ease;
  }

  .hold:hover {
    transform: translateY(-2px);
    background: linear-gradient(45deg, #00e676, #69f0ae);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  td span {
    font-size: 1.1em;
    letter-spacing: 0.3px;
  }

  td span[class$="price"] {
    color: #f50057;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  td span[class$="price"]:hover {
    color: #c51162;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  }

  .title {
    background: linear-gradient(45deg, #3d5afe, #304ffe);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
    font-size: 1.5em;
    letter-spacing: 0.5px;
    margin-bottom: 1.5rem;
    transition: all 0.3s ease;
  }

  .title:hover {
    transform: scale(1.02);
    background: linear-gradient(45deg, #304ffe, #1a237e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`}</style>
    </div>
  );
}

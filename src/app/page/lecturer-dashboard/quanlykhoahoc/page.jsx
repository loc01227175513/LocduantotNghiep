"use client";
import React, { useState, useEffect } from "react";
import "./quanlykhoahoc.css";
import { GiangvienTaoKhoaHoc } from "../../../../service/Dashboard-lecture/Add-course.jsx";
import { GiangvienKhoaHoc } from "../../../../service/Dashboard-lecture/Dashboard-lecture.jsx";
import { ref } from "yup";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Quanlykhoahoc() {

  const [formaddkhoahoc, setFormaddkhoahoc] = useState(false);
  const [chude, setChude] = useState([]);
  const [taokhoahoc, setTaokhoahoc] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [khoahoc, setKhoahoc] = useState([]);
  const [filteredChude, setFilteredChude] = useState([]);
  const [tieude, setTieude] = useState("");
  const [selectedChude, setSelectedChude] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(""); // New state for selected status
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taoKhoaHoc = await GiangvienTaoKhoaHoc("tieude", "chude");
        setTaokhoahoc(taoKhoaHoc);
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const khoahocRes = await GiangvienKhoaHoc();
        setKhoahoc(khoahocRes.data);
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(khoahoc);

  useEffect(() => {
    fetch("https://huuphuoc.id.vn/api/theloai", {
      referrerPolicy: 'unsafe-url',
    })
      .then((response) => response.json())
      .then((data) => {
        setChude(data.data);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = chude.filter((chudeItem) =>
        chudeItem.theloaicons.some(
          (theloaiItem) => theloaiItem.id === parseInt(selectedCategory)
        )
      );
      setFilteredChude(filtered);
    } else {
      setFilteredChude(chude);
    }
  }, [selectedCategory, chude]);

  const openformaddlesson = () => {
    setFormaddkhoahoc(true);
  };
  const closeformaddlesson = () => {
    setFormaddkhoahoc(false);
  };
  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const taoKhoaHoc = await GiangvienTaoKhoaHoc(tieude, selectedChude);
      setTaokhoahoc(taoKhoaHoc);
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const filteredKhoahoc = khoahoc.filter((item) => {
    if (selectedStatus && item.trangthai !== selectedStatus) return false;
    if (searchTerm && !item.ten.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  // Helper function to validate image source
  const validImageSrc = (src) => {
    if (typeof src === 'string' && (src.startsWith('/') || src.startsWith('http://') || src.startsWith('https://'))) {
      return src;
    }
    return '/default-course.jpg'; // Ensure this default image exists in your public directory
  };

  return (
    <div className="overflow-y-scroll col-lg-9 h-lvh">
      <div className="right-sidebar-dashboard">
        <div className="row ">
          <div className="col-lg-12">
            {!formaddkhoahoc && (
              <div className="hover:cursor-pointer">
                <div className="addkhoahoc" onClick={() => openformaddlesson()}>
                  <i className="bi bi-plus-square"></i>
                  Thêm khóa học
                </div>
              </div>
            )}
            {formaddkhoahoc && (
              <div className="hover:cursor-pointer">
                <div
                  className="addkhoahoc"
                  onClick={() => closeformaddlesson()}
                >
                  hủy
                </div>
              </div>
            )}

            {formaddkhoahoc && (
              <div className="div-add-khoahoc">
                <div className="">
                  <div className="p-4 border">
                    <p>Thêm khóa học</p>
                  </div>
                  <form onSubmit={handleAddCourse}>
                    <div className="p-4 border">
                      <p>Tên khóa học</p>
                      <input
                        type="text"
                        value={tieude}
                        onChange={(e) => setTieude(e.target.value)}
                        placeholder="Nhập tên khóa học"
                        className="w-full p-2 border"
                      />
                    </div>

                    <div className="p-4 border">
                      <p>Chọn thể loại</p>
                      <div className="flex justify-between">
                        <section>
                          <label>thể loại</label>
                          <select
                            id="category-select"
                            onChange={(e) =>
                              setSelectedCategory(e.target.value)
                            }
                          >
                            <option value="">Chọn thể loại</option>
                            {chude &&
                              chude.map((chudeItem) =>
                                chudeItem.theloaicons.map((theloaiItem) => (
                                  <option
                                    key={theloaiItem.id}
                                    value={theloaiItem.id}
                                  >
                                    {theloaiItem.ten}
                                  </option>
                                ))
                              )}
                          </select>
                        </section>
                        <section>
                          <label>chủ đề</label>
                          <select
                            id="course-select"
                            onChange={(e) => setSelectedChude(e.target.value)}
                          >
                            <option value="">chọn chủ đề</option>
                            {filteredChude &&
                              filteredChude.map((chudeItem) =>
                                chudeItem.theloaicons.map((theloaiItem) =>
                                  theloaiItem.chudes.map((item) => (
                                    <option key={item.id} value={item.id}>
                                      {item.ten}
                                    </option>
                                  ))
                                )
                              )}
                          </select>
                        </section>
                      </div>
                    </div>
                    <div className="flex m-2">
                      <button type="submit">Xác Nhận</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center mt-4 search-filter-container">
              <section>
                <select
                  id="course-select"
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="custom-select"
                >
                  <option value="">Tất cả khóa học</option>
                  <option value="active">Đang phát hành</option>
                  <option value="Notyet">Bản Nháp</option>
                  <option value="Pending">Đã hoàn thành</option>
                </select>
              </section>
              <form className="search-form">
                <div className="search-wrapper">
                  <i className="bi bi-search search-icon"></i>
                  <input
                    type="text"
                    placeholder="Tìm kiếm khóa học..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </form>
            </div>
            {filteredKhoahoc &&
              filteredKhoahoc.map((item) => {
                const gia = Number(item.gia || 0);
                const giamgia = Number(item.giamgia || 0);
                const hinh = item.hinh; // Assuming hinh should be a string URL

                let nonZeroCount = 3; // Initially assume all three values are non-zero
                let totalPercentage = 0;

                if (gia === 0) {
                  nonZeroCount -= 1;
                }
                if (giamgia === 0) {
                  nonZeroCount -= 1;
                }
                if (!hinh || hinh === '0') { // Adjusted condition for hinh
                  nonZeroCount -= 1;
                }
                const total = (100 / 3) * nonZeroCount;

                let widthPercentage = 0;
                if (nonZeroCount > 0) {
                  widthPercentage = total;
                }
                return (
                  <Link href={`/page/course-create?id=${item.id}`} key={item.id}>
                    <div className="single-progress-course">
                      <a href="single-course.html">
                        <Image
                          width={100}
                          height={100}
                          className="rounded-lg hover:border-red-600 border-2 hover:opacity-75 transition-opacity duration-300"
                          src={validImageSrc(hinh)}
                          alt="img"
                        />
                      </a>

                      <div className="information-progress-course">
                        <a href="single-course.html">
                          <h5 className="title">{item.ten}</h5>
                        </a>
                        <div className="progress-wrapper-lesson-compleate">
                          <div className="progress">
                            <div
                              className="progress-bar wow fadeInLeft bg--primary"
                              role="progressbar"
                              style={{ width: `${widthPercentage}%` }}
                              aria-valuenow={widthPercentage}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            ></div>
                          </div>
                          <div className="end">
                            <span>{widthPercentage}% Complete</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </Link>

                );
              })}
          </div>
        </div>
      </div>
      <style jsx>{`
      // Add these styles to quanlykhoahoc.css

.right-sidebar-dashboard {
  padding: 2rem;
  background: #f8f9fa;
}

.addkhoahoc {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.addkhoahoc:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

.addkhoahoc i {
  margin-right: 8px;
}

.single-progress-course {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  gap: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
}

.single-progress-course:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}

.information-progress-course {
  flex: 1;
}

.information-progress-course .title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.progress {
  height: 8px;
  background: #e5e7eb;
  border-radius: 999px;
  overflow: hidden;
}

.progress-bar {
  background: linear-gradient(90deg, #60a5fa 0%, #3b82f6 100%);
  transition: width 1s ease-in-out;
}

select, input[type="text"] {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: white;
  min-width: 200px;
  font-size: 0.875rem;
}

.div-add-khoahoc {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  margin-top: 2rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

button[type="submit"] {
  background: #3b82f6;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s;
}

button[type="submit"]:hover {
  background: #2563eb;
}

/* Existing styles... */

.edit-icon, .delete-icon {
  font-size: 1.5rem;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.edit-icon {
  color: #3b82f6;
}

.edit-icon:hover {
  background: #dbeafe;
  transform: scale(1.1) rotate(-5deg);
  color: #2563eb;
}

.delete-icon {
  color: #ef4444;
}

.delete-icon:hover {
  background: #fee2e2;
  transform: scale(1.1) rotate(5deg);
  color: #dc2626;
}

/* Add animation for icon click feedback */
.edit-icon:active, .delete-icon:active {
  transform: scale(0.95);
}
/* Update existing styles with new color treatments */

.title {
  background: linear-gradient(to right, #3b82f6, #2563eb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.5rem;
  font-weight: 700;
  transition: all 0.3s ease;
}

.title:hover {
  background: linear-gradient(to right, #7c3aed, #4f46e5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transform: scale(1.02);
}

.addkhoahoc {
  background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

select option {
  color: #4b5563;
  font-weight: 500;
}

select option:hover {
  background: linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
}

form label {
  color: #4b5563;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
}

form p {
  color: #1f2937;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.end span {
  background: linear-gradient(90deg, #059669 0%, #10b981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
}

input::placeholder {
  color: #9ca3af;
  font-style: italic;
}

.div-add-khoahoc p {
  color: #1f2937;
  font-weight: 600;
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

button[type="submit"] {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

button[type="submit"]:hover {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  transform: translateY(-1px);
}
.div-add-khoahoc {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  transition: transform 0.3s;
}

.div-add-khoahoc:hover {
  transform: translateY(-5px);
}

.div-add-khoahoc p {
  background: linear-gradient(to right, #3b82f6, #2563eb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

input[type="text"] {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s;
  background: rgba(255,255,255,0.9);
}

input[type="text"]:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59,130,246,0.1);
  outline: none;
}

select {
  appearance: none;
  background: rgba(255,255,255,0.9);
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-position: right 1rem center;
  background-repeat: no-repeat;
  background-size: 1em;
}

select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  outline: none;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #4b5563;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

button[type="submit"] {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: all 0.3s;
  border: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

button[type="submit"]:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
}

button[type="submit"]:active {
  transform: translateY(0);
}

.border {
  border-color: rgba(255,255,255,0.2);
  border-radius: 16px;
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(5px);
}

.flex.justify-between {
  gap: 2rem;
}
 .search-filter-container {
    background: rgba(255, 255, 255, 0.95);
    padding: 1.5rem;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
  }

  .custom-select {
    appearance: none;
    background: linear-gradient(to right, #f9fafb, #f3f4f6);
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    padding: 0.75rem 3rem 0.75rem 1.5rem;
    font-weight: 500;
    color: #374151;
    cursor: pointer;
    min-width: 200px;
    transition: all 0.3s ease;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
    background-position: right 1rem center;
    background-repeat: no-repeat;
    background-size: 1.5em;
  }

  .custom-select:hover {
    border-color: #3b82f6;
    transform: translateY(-1px);
  }

  .custom-select:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  }

  .search-wrapper {
    position: relative;
    width: 400px;
  }

  .search-icon {
    position: absolute;
    left: 1.25rem;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    font-size: 1.25rem;
    pointer-events: none;
    transition: color 0.3s ease;
  }

  .search-input {
    width: 100%;
    padding: 1rem 1rem 1rem 3.5rem;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    background: linear-gradient(to right, #f9fafb, #f3f4f6);
    font-size: 1rem;
    color: #374151;
    transition: all 0.3s ease;
  }

  .search-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
    background: white;
  }

  .search-input:focus + .search-icon {
    color: #3b82f6;
  }

  .search-input::placeholder {
    color: #9ca3af;
    font-style: italic;
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  .search-wrapper:hover .search-input {
    transform: translateY(-1px);
  }
/* Add these new animation keyframes */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

@keyframes shine {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

@keyframes pulse {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
}

@keyframes slideIn {
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

/* Update existing components with new animations */
.addkhoahoc {
  animation: float 3s ease-in-out infinite;
  background: linear-gradient(270deg, #6366f1, #4f46e5, #7c3aed);
  background-size: 200% 200%;
  animation: shine 3s linear infinite;
}

.single-progress-course {
  animation: slideIn 0.5s ease-out;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.single-progress-course:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.title {
  position: relative;
  overflow: hidden;
}

.title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #2563eb);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.title:hover::after {
  transform: scaleX(1);
}

.progress-bar {
  animation: progressAnimation 1.5s ease-out;
  background: linear-gradient(90deg, #60a5fa, #3b82f6);
  background-size: 200% 200%;
  animation: shine 3s linear infinite;
}

@keyframes progressAnimation {
  from { width: 0%; }
}

.search-wrapper:focus-within {
  animation: pulse 2s infinite;
}

.search-input {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-input:focus {
  transform: scale(1.02);
}

.custom-select {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.custom-select:hover {
  transform: translateY(-4px) scale(1.02);
}

button[type="submit"] {
  position: relative;
  overflow: hidden;
}

button[type="submit"]::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300%;
  height: 300%;
  background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 40%);
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s;
}

button[type="submit"]:hover::before {
  opacity: 1;
}

.div-add-khoahoc {
  animation: slideIn 0.5s ease-out;
}

/* Add loading animation for async operations */
@keyframes loading {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: loading 1s linear infinite;
}

/* Add ripple effect for clickable elements */
.ripple {
  position: relative;
  overflow: hidden;
}

.ripple::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  transform: scale(0);
  transition: transform 0.3s;
  border-radius: 50%;
}

.ripple:active::after {
  transform: scale(2);
  opacity: 0;
}

      `}</style>
    </div>
  );
}
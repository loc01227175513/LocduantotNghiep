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
    <div className="overflow-y-scroll col-lg-9 ">
      <div className="right-sidebar-dashboard">
        <div className="row ">
          <div className="col-lg-12">
            {!formaddkhoahoc && (
              <div className="hover:cursor-pointer">
                <div className="addkhoahoc" onClick={() => openformaddlesson()}>
                  <i className="bi bi-plus-square text-2xl"></i>
                  <span className="mx-2 text-[16px]">Thêm khóa học</span> 
                </div>
              </div>
            )}
            {formaddkhoahoc && (
              <div className="hover:cursor-pointer">
                <div
                  className="addkhoahoc text-2xl"
                  onClick={() => closeformaddlesson()}
                >
                  hủy
                </div>
              </div>
            )}

            {formaddkhoahoc && (
              <div className="div-add-khoahoc">
                <div className="">
                  <div className="p-4 ">
                    <p className="text-[20px] font-bold ">Thêm khóa học</p>
                  </div>
                  <form onSubmit={handleAddCourse}>
                    <div className="p-4 ">
                      <p className="my-2 font-semibold text-[16px]">Tên khóa học</p>
                      <span className="rounded-xl">
                        <input
                          type="text"
                          value={tieude}
                          onChange={(e) => setTieude(e.target.value)}
                          placeholder="Nhập tên khóa học"
                          className="w-full p-2 border placeholder:text-[14px] text-[14px] rounded-xl"
                        />
                      </span>
                    </div>

                    <div className="p-4 ">
                      <div className="flex justify-between">
                        <section>
                          <label className="text-[16px] my-2 font-semibold">Thể loại</label>
                          <select
                            className="text-[14px]"
                            id="category-select"
                            onChange={(e) => setSelectedCategory(e.target.value)}
                          >
                            <option value="" className="text-[14px] font-semibold">Chọn thể loại</option>
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
                          <label className="text-[16px] my-2 font-semibold">Chủ đề</label>
                          <select
                            className="text-[14px]"
                            id="course-select"
                            onChange={(e) => setSelectedChude(e.target.value)}
                          >
                            <option value="" className="text-xl">Chọn chủ đề</option>
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
                    <div className="flex justify-center m-4 ">
                      <button className="px-8  text-[14px] font-medium p-2  border border-white text-white rounded-lg bg-gradient-to-r from-blue-900 via-pink-700 to-pink-700 hover:from-pink-700 hover:to-pink-500  transition-all duration-300 transform hover:scale-105 shadow-lg">
                        Xác Nhận
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center mt-4 search-filter-container">
              <section className="text-2xl">
                <select
                  id="course-select"
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="custom-select text-[14px] p-3"
                >
                    <option value="" className=" text-[14px] ">Tất cả khóa học</option>
                    <option value="active" className="text-[14px]">Đang phát hành</option>
                    <option value="Notyet" className="text-[14px]">Bản Nháp</option>
                    <option value="Pending" className="text-[14px]">Đã hoàn thành</option>
                </select>
              </section>
              <form className="search-form my-4">
                <div className="search-wrapper relative">
                  <i className="bi bi-search search-icon absolute text-xl"></i>
                  <input
                    type="pk"
                    placeholder="Tìm kiếm khóa học..."
                    className="search-input h-14 border text-[14px] placeholder:text-[14px]"
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
                    <div className="single-progress-course mt-2 flex items-start gap-4">
                      <Link href={`/page/course-create?id=${item.id}`}>
                        <Image
                          width={150}
                          height={150}
                          className="rounded-lg h-40 w-40 hover:border-red-600 border-2 hover:opacity-75 transition-opacity duration-300 object-cover"
                          src={validImageSrc(hinh)}
                          alt="img"
                        />
                      </Link>

                      <div className="information-progress-course pt-2">
                        <h5 className="text-[16px]">{item.ten}</h5>
                        <div className="progress-wrapper-lesson-compleate mt-4">
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
                          <div className="end text-[14px]">
                            <span>{Number(widthPercentage).toFixed(0)}% Hoàn thành</span>
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

    </div>
  );
}
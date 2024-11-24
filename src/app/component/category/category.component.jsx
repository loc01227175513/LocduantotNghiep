"use client";

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { Categorydata } from "../../../../src/service/category/category.service";
import Image from 'next/image';

const NextCategory = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [buttonNext, setButtonNext] = useState(true);
  const [buttonPrev, setButtonPrev] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Categorydata();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const handleResize = () => {
    if (window.innerWidth >= 1280) {
      setItemsPerPage(6);
    } else if (window.innerWidth >= 900) {
      setItemsPerPage(4);
    } else if (window.innerWidth >= 600) {
      setItemsPerPage(3);
    } else if (window.innerWidth >= 380) {
      setItemsPerPage(2);
    } else {
      setItemsPerPage(1);
    }
    setPage(1); // Reset to first page on resize
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Check size on mount

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const img = categories.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const nexts = () => {
    if (page < totalPages) {
      setPage(page + 1);
      setButtonPrev(true);
    }

    if (page + 1 >= totalPages) {
      setButtonNext(false);
    }
  };

  const prevs = () => {
    if (page > 1) {
      setPage(page - 1);
      setButtonNext(true);
    }

    if (page - 1 === 1) {
      setButtonPrev(false);
    }
  };

  const renderPagination = () => {
    const displayPages = 5;
    let startPage = Math.max(1, page - Math.floor(displayPages / 2));
    let endPage = startPage + displayPages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - displayPages + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex justify-center gap-2 mt-8">
        <button
          className={`w-10 h-10 rounded-full border ${buttonPrev
            ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          onClick={prevs}
          disabled={!buttonPrev}
        >
          <i className="bi bi-arrow-left"></i>
        </button>

        {startPage > 1 && (
          <>
            <button
              className="w-10 h-10 border rounded-full flex items-center justify-center"
              onClick={() => setPage(1)}
            >
              1
            </button>
            {startPage > 2 && <span className="flex items-center">...</span>}
          </>
        )}

        {pages.map((p) => (
          <button
            key={p}
            className={`w-10 h-10 border rounded-full flex items-center justify-center text-sm ${p === page
              ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white'
              : 'bg-gray-100 text-gray-800'
              }`}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="flex items-center">...</span>}
            <button
              className="w-10 h-10 border rounded-full flex items-center justify-center"
              onClick={() => setPage(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          className={`w-10 h-10 rounded-full border ${buttonNext
            ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          onClick={nexts}
          disabled={!buttonNext}
        >
          <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    );
  };

  return (
    <div className=" bg-gradient-to-br from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 mb-4 mx-auto">
              <i className="bi bi-grid-3x3-gap text-blue-500 text-2xl animate-pulse"></i>
            </div>
          </div>
          <h2 className="text-4xl font-medium mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
           <strong>Khám phá hơn 2000 khóa học trực tuyến miễn phí</strong> 
          </h2>
          <p className="text-gray-600 text-2xl max-w-2xl mx-auto">
            Bạn sẽ tìm thấy thứ gì đó khơi dậy sự tò mò của bạn 
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {img.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Link href={`/page/Cours-Filter?id=${item.id}`}>
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                    <Image
                      width={500} height={300}
                      src={item.image}
                      alt=""
                      className="w-full h-40 object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h6 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </h6>
                    <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                      <i className="bi bi-collection text-blue-500"></i>
                      <span className="text-xl">130+ khóa học</span>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12">
          {renderPagination()}
        </div>
      </div>
    </div>
  );
};




const Category = ({ onCategoryChange }) => {
  const cate = Categorydata();
  const [KhoaHoc, setKhoaHoc] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetch("https://huuphuoc.id.vn/api/allkhoahoc", {
      referrerPolicy: 'unsafe-url',
    })
      .then((response) => response.json())
      .then((data) => {
        setKhoaHoc(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const uniqueCategories = Array.from(
    new Set(KhoaHoc.map((item) => item.theloai))
  );

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    onCategoryChange(category);
    setShowDropdown(false);
  };

  return (
      <div className="flex flex-wrap gap-3 p-4 relative">
      {/* Enhanced Dropdown Button */}
      <div className="relative">
        <button
          className={`px-6 py-3 rounded-xl text-xl font-semibold transition-all duration-300 
            flex items-center gap-2 border-2
            ${activeCategory === ''
              ? 'bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 text-white border-transparent shadow-xl shadow-blue-500/30 hover:shadow-blue-500/40'
              : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:text-blue-600'}`}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span>Tất cả thể loại</span>
          <svg 
            className={`w-5 h-5 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
    
        {/* Enhanced Dropdown Menu */}
        {showDropdown && (
          <div className="absolute mt-3 w-56 bg-white rounded-xl border border-gray-100 shadow-xl 
              backdrop-blur-sm backdrop-filter z-50 transform transition-all duration-300 animate-fadeIn">
            <ul className="py-2">
              <li>
                <button
                  className={`w-full text-left px-6 py-3 text-xl transition-all duration-200
                    ${activeCategory === '' 
                      ? 'bg-gradient-to-r from-blue-50 to-transparent text-blue-700 font-semibold'
                      : 'text-gray-700 hover:bg-blue-50'}`}
                  onClick={() => handleCategoryChange('')}
                >
                  Tất cả
                </button>
              </li>
              {uniqueCategories.map((theloai, index) => (
                <li key={index}>
                  <button
                    className={`w-full text-left px-6 py-3 text-xl transition-all duration-200
                      ${activeCategory === theloai 
                        ? 'bg-gradient-to-r from-blue-50 to-transparent text-blue-700 font-semibold'
                        : 'text-gray-700 hover:bg-blue-50'}`}
                    onClick={() => handleCategoryChange(theloai)}
                  >
                    {theloai}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const Categoryheader = () => {
  const [DanhMuc, setDanhMuc] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://huuphuoc.id.vn/api/theloai", {
          referrerPolicy: 'unsafe-url',
        });
        const data = await response.json();
        setDanhMuc(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const midIndex = Math.ceil(DanhMuc.length / 2);
  const firstHalf = DanhMuc.slice(0, midIndex);
  const secondHalf = DanhMuc.slice(midIndex);

  return (
    <ul className="category-sub-menu">
      <li>
        <ul className="">
          {firstHalf.map((item, index) => (
            <li key={index} className="category-item">
              <Link href={`/page/Cours-Filter?id=${item.id}`} className="menu-item cv">
                <div className="text ">
                  <div className="image-wrapper flex justify-center items-center">
                    <Image width={500} height={300} src={item.hinh} alt="" className="" />
                  </div>
                  <p className="font-medium text-md text-black text-center"><strong>{item.ten}</strong></p>
                  <p className="course-count">130+ Khóa học</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="">
          {secondHalf.map((item, index) => (
            <li key={index} className="category-item">
              <Link href={`/page/Cours-Filter?id=${item.id}`} className="menu-item cv">
                <div className="text ">
                  <div className="image-wrapper flex justify-center items-center">
                    <Image width={500} height={300} src={item.hinh} alt="" className="" />
                  </div>
                  <p className="font-medium text-md text-black text-center"><strong>{item.ten}</strong></p>
                  <p className="course-count">130+ Khóa học</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </li>
      <style jsx>{`
  .category-sub-menu {
    padding: 1rem; /* Reduced from 2rem */
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 12px;
  }

  .category-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Reduced from 300px */
    gap: 1rem; /* Reduced from 2rem */
    padding: 0.5rem; /* Reduced from 1rem */
  }

  .category-item {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .menu-item.cv {
    background: w
    overflow: hidden;
    border-radius: 8px;
    margin-bottom: 0.75rem; /* Reduced from 1rem */
  }

  .menu-item.cv img {
    width: 100%;
    height: auto;
    transition: transform 0.6s ease;
  }
hite;
    padding: 1rem; /* Reduced from 1.5rem */
    border-radius: 12px;
    transition: all 0.4s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  .menu-item.cv:hover {
    transform: translateY(-6px) scale(1.01); /* Slightly reduced transformation */
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.08); /* Adjusted shadow */
  }

  .image-wrapper {
  .menu-item.cv:hover img {
    transform: scale(1.05); /* Reduced scale for smaller zoom effect */
  }

  .menu-item.cv h4 {
    font-size: 1.1rem; /* Reduced from 1.25rem */
    font-weight: 700;
    color: #2d3748;
    margin: 0.75rem 0; /* Reduced from 1rem */
    transition: color 0.3s ease;
  }

  .course-count {
    color: #718096;
    font-size: 0.85rem; /* Reduced from 0.9rem */
    font-weight: 500;
    background: #edf2f7;
    padding: 0.4rem 0.8rem; /* Reduced padding */
    border-radius: 15px; /* Slightly reduced border-radius */
    display: inline-block;
  }

  .menu-item.cv:hover h4 {
    color: #4299e1;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(15px); } /* Reduced translateY */
    to { opacity: 1; transform: translateY(0); }
  }

  .category-item {
    animation: fadeIn 0.5s ease-out forwards; /* Slightly faster animation */
  }
`}</style>
    </ul>
  );
};



export { NextCategory, Category, Categoryheader };
"use client"

import React, { useEffect, useState, useRef } from 'react';
import './cart1.css';
import Image from 'next/image';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Cart } from './cart/cartheader';
import { Categoryheader } from '../category/category.component';
import { LayThongBao } from '@/service/ThongBao/ThongBao';
import Link from 'next/link';
import { use } from '@/assets/js/plugins/swiper';
const DropdownMenu = () => {
  const [langOpen, setLangOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  return (
    <div className="right-information d-flex">
      <div className="custom-dropdown-wrapper me-4">
        <button 
          className="btn dropdown-toggle custom-dropdown" 
          onClick={() => setLangOpen(!langOpen)}
        >
          <span>English</span>
          <i className="bi bi-chevron-down ms-2"></i>
        </button>
        {langOpen && (
          <ul className="dropdown-menu show">
            <li><button className="dropdown-item">Deutsch</button></li>
            <li><button className="dropdown-item">Portuguese</button></li>
            <li><button className="dropdown-item">Russian</button></li>
          </ul>
        )}
      </div>
      
      {/* Currency dropdown remains the same */}
      
      <style jsx>{`
        .custom-dropdown-wrapper {
          position: relative;
        }
        
        .custom-dropdown {
          background: linear-gradient(135deg, #ff6b6b 0%, #1e3c72 100%);
          color: white;
          padding: 0.7rem 1.2rem;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(30, 60, 114, 0.3);
          animation: pulse 2s infinite;
        }

        .custom-dropdown:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
          background: linear-gradient(135deg, #1e3c72 0%, #ff6b6b 100%);
        }

        .custom-dropdown i {
          transition: transform 0.3s ease;
          animation: bounce 2s infinite;
        }

        .custom-dropdown:hover i {
          transform: rotate(180deg);
        }
        
        .dropdown-menu {
          position: absolute;
          top: 120%;
          left: 0;
          z-index: 1000;
          min-width: 12rem;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.12);
          animation: slideDown 0.3s ease;
          border: 1px solid rgba(255,255,255,0.18);
          padding: 0.5rem;
        }

        .dropdown-item {
          padding: 0.8rem 1.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: 8px;
          font-weight: 500;
          color: #333;
          margin: 2px 0;
        }

        .dropdown-item:hover {
          background: linear-gradient(135deg, #ff6b6b 0%, #1e3c72 100%);
          color: white;
          transform: translateX(5px);
          text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        @keyframes slideDown {
          from { 
            opacity: 0;
            transform: translateY(-15px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 5px rgba(255, 107, 107, 0.2); }
          50% { box-shadow: 0 0 20px rgba(30, 60, 114, 0.4); }
          100% { box-shadow: 0 0 5px rgba(255, 107, 107, 0.2); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
      `}</style>
    </div>
  );
};


const Contact = () => {
  return (
    <div className="header-top-one-wrapper gradient-bg text-white py-3">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="header-top-one d-flex justify-content-between align-items-center">
            <div className="left-information">
              <Link href="mailto:techstudent@gmail.com" className="contact-link me-4">
                <i className="fa-light fa-envelope me-2 bounce" />
                techstudent@gmail.com
              </Link>
              <Link href="tel:+123456789" className="contact-link">
                <i className="fa-light fa-phone me-2 bounce" />
                +123 456 789
              </Link>
            </div>
            <div className="right-information d-flex">
         
              <DropdownMenu />
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <style jsx>{`
      .gradient-bg {
        background: linear-gradient(135deg, #1e3c72 0%, #ff6b6b 100%);
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        animation: gradientShift 8s infinite;
      }

      .contact-link {
        color: white;
        text-decoration: none;
        font-weight: 500;
        transition: all 0.3s ease;
        padding: 5px 10px;
        border-radius: 4px;
        text-shadow: 0 0 10px rgba(255,255,255,0.5);
      }

      .contact-link:hover {
        background: rgba(255,255,255,0.2);
        transform: translateY(-2px);
        color: #ffd700;
        box-shadow: 0 0 15px rgba(255,215,0,0.3);
      }

      .bounce {
        animation: bounceColor 2s infinite;
      }

      @keyframes bounceColor {
        0% { 
          transform: translateY(0);
          color: white;
        }
        50% { 
          transform: translateY(-3px);
          color: #ffd700;
        }
        100% { 
          transform: translateY(0);
          color: white;
        }
      }

      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      /* Rest of the styles remain the same */
    `}</style>
  </div>
  );
};


export default function Header() {
  const [hasData, setHasData] = useState(false);
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [header2, setHeader2] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [thongBao, setThongBao] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCoursesMenuOpen, setIsCoursesMenuOpen] = useState(false);
  const [isDashboardMenuOpen, setIsDashboardMenuOpen] = useState(false);








  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('data')) {
      setHasData(true);
    }
  }, []);

  const data = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('data')) : null;
  console.log(data);

  useEffect(() => {
    LayThongBao()
      .then((res) => {
        setThongBao(res);
      })
      .catch((error) => {
        console.error('Failed to fetch notifications:', error);
      });
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('lecturerId');
      localStorage.removeItem('data');
      localStorage.removeItem('rememberedUser');
    }
    window.location.reload();
  };

  useEffect(() => {
    let timeoutId;
    const currentDropdown = dropdownRef.current;
  
    const handleClickOutside = (event) => {
      if (currentDropdown && !currentDropdown.contains(event.target)) {
        timeoutId = setTimeout(() => {
          setIsOpen(false);
        }, 4000); // 4 second delay
      }
    };
  
    const handleMouseEnter = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  
    if (currentDropdown) {
      currentDropdown.addEventListener('mouseenter', handleMouseEnter);
    }
  
    document.addEventListener('mousedown', handleClickOutside);
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (currentDropdown) {
        currentDropdown.removeEventListener('mouseenter', handleMouseEnter);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [dropdownRef, setIsOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setVisible(scrollTop > 70);
  };

  const openSearch = () => {
    setIsOpenSearch(true);
  };

  const closeSearch = () => {
    setIsOpenSearch(false);
  };

  const closeHeader2 = () => {
    setHeader2(false);
  };

  const openHeader2 = () => {
    setHeader2(true);
  };

  const openCartHandler = () => {
    setOpenCart(true);
  };

  const closeCartHandler = () => {
    setOpenCart(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formSearch = (e) => {
    e.preventDefault();
    const encodedSearchTerm = encodeURIComponent(searchTerm).replace(/%20/g, '+');
    window.location.href = `/page/Cours-Filter?search=${encodedSearchTerm}`;
  };

  return (
    <>






      <header className="fixed top-0 w-full header-one header--sticky">
        {visible && (
          <div className="scroll" onClick={scrollToTop}>
            <i className="bi bi-chevron-up"></i>
          </div>
        )}

        {openCart && <Cart onAction={closeCartHandler} />}




        <Contact />


        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="header-one-wrapper">
                <div className="left-side-header">
                  <Link href="/" className="logo-area">
                    <div className="logo-wrapper">
                      <Image
                        width={500}
                        height={300}
                        src="https://res.cloudinary.com/dnjakwi6l/image/upload/v1727967044/z5893902778330_3f5bed4df0f1d220b06d64708c4d87fc_rfjfty.jpg"
                        className="w-72 logo-image"
                        alt="logo"
                      />
                    </div>

                  </Link>
                  <div className="category-area">
                    <div className="category-btn hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer border border-gray-200 hover:border-primary">
                      <i className="bi bi-grid text-xl text-primary"></i>
                      <span className="font-medium">Thể loại</span>
                      <i className="fas fa-chevron-down text-sm ml-auto transition-transform group-hover:rotate-180"></i>
                      <Categoryheader />
                    </div>
                  </div>
                  <div className="lg:hidden">
                    <button
                      onClick={toggleMobileMenu}
                      className="text-gray-700 focus:outline-none hover:text-blue-600"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {isMobileMenuOpen ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        )}
                      </svg>
                    </button>
                  </div>
                </div>





                {isMobileMenuOpen && (
                  <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-md z-50 animate-slide-down transition-transform duration-300 ease-in-out">
                    <nav className="space-y-4 p-4">
                      {/* ... other links */}
                      <div>
                        <button
                          onClick={openSearch}
                          className="w-full text-left text-gray-700 hover:text-blue-600 transition-colors"
                        >
                          Tìm kiếm
                        </button>
                      </div>

                      <ul className="md:flex flex-wrap items-center justify-start space-x-8">
                        {/* Home */}
                        <li className="group relative py-6">
                          <Link
                            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                            href="/"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <i className="fas fa-home text-lg" />
                            <span className="font-medium">Trang chủ</span>
                          </Link>
                        </li>

                        {/* About */}
                        <li className="group relative py-6">
                          <Link
                            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                            href="#"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <i className="fas fa-info-circle text-lg" />
                            <span className="font-medium">Về chúng tôi</span>
                          </Link>
                        </li>

                        <li className="group relative py-6">
                          <button
                            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors w-full"
                            onClick={() => setIsCoursesMenuOpen(!isCoursesMenuOpen)}
                            aria-haspopup="true"
                            aria-expanded={isCoursesMenuOpen}
                          >
                            <i className="fas fa-graduation-cap text-lg" />
                            <span className="font-medium">Khóa học</span>
                          </button>

                          {isCoursesMenuOpen && (
                            <div className="fixed top-0 right-0 h-full w-80 bg-white w-screen shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
                              <button
                                onClick={() => setIsCoursesMenuOpen(false)}
                                className="absolute top-4 left-4 text-gray-600 hover:text-red-600"
                              >
                                &times;
                              </button>
                              <div className="max-w-7xl mx-auto px-4 mt-12 bg-white">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                                  {/* Courses Section */}
                                  <div className="space-y-3 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                                    <h3 className="font-bold text-base text-gray-800 border-b-2 border-blue-500 pb-1">
                                      Khóa học
                                    </h3>
                                    <ul className="space-y-3">
                                      <li>
                                        <Link
                                          href="/page/Cours-Filter"
                                          className="text-sm text-gray-600 hover:text-blue-600 flex items-center group"
                                          onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                          <i className="fas fa-list mr-2 text-blue-500 group-hover:scale-110 transition-transform" />
                                          <span className="group-hover:translate-x-1 transition-transform">
                                            Khóa học thể loại
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          href="/page/courseLoTrinh"
                                          className="text-sm text-gray-600 hover:text-blue-600 flex items-center group"
                                          onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                          <i className="fas fa-road mr-2 text-blue-500 group-hover:scale-110 transition-transform" />
                                          <span className="group-hover:translate-x-1 transition-transform">
                                            Lộ trình khóa học
                                          </span>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>

                                  {/* Other Section */}
                                  <div className="space-y-3 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                                    <h3 className="font-bold text-base text-gray-800 border-b-2 border-green-500 pb-1">
                                      Khác
                                    </h3>
                                    <ul className="space-y-3">
                                      <li>
                                        <Link
                                          href="/page/AllGiangVien"
                                          className="text-sm text-gray-600 hover:text-blue-600 flex items-center group"
                                          onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                          <i className="fas fa-chalkboard-teacher mr-2 text-green-500 group-hover:scale-110 transition-transform" />
                                          <span className="group-hover:translate-x-1 transition-transform">
                                            Giảng Viên Nổi Bật
                                          </span>
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          href="/page/NhanTin"
                                          className="text-sm text-gray-600 hover:text-blue-600 flex items-center group"
                                          onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                          <i className="fas fa-comments mr-2 text-green-500 group-hover:scale-110 transition-transform" />
                                          <span className="group-hover:translate-x-1 transition-transform">
                                            Nhắn tin Với Giảng Viên
                                          </span>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>

                                  {/* Promo Section */}
                                  <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                    <Link href="/page/KhuyenMai" className="block text-center space-y-3" onClick={() => setIsMobileMenuOpen(false)}>
                                      <div className="w-12 h-12 mx-auto bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center transform hover:rotate-12 transition-transform">
                                        <i className="fas fa-gift text-lg text-white" />
                                      </div>
                                      <p className="font-bold text-base bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                        Nhận Khuyến Mãi
                                      </p>
                                      <span className="text-sm text-gray-600">Khám phá ưu đãi đặc biệt</span>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </li>

                        {/* Dashboard */}
                        <li className="group relative py-6">
                          <button
                            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors w-full"
                            onClick={() => setIsDashboardMenuOpen(!isDashboardMenuOpen)}
                            aria-haspopup="true"
                            aria-expanded={isDashboardMenuOpen}
                          >
                            <i className="fas fa-columns text-lg" />
                            <span className="font-medium">Trang tính</span>
                          </button>

                          {isDashboardMenuOpen && (
                            <>
                              {/* Overlay */}
                              <div
                                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                                onClick={() => setIsDashboardMenuOpen(false)}
                              ></div>

                              {/* Sidebar */}
                              <div className={`fixed top-0 right-0 h-full w-screen bg-white shadow-xl z-50 transform ${isDashboardMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
                                <button
                                  onClick={() => setIsDashboardMenuOpen(false)}
                                  className="absolute top-4 left-4 text-gray-600 hover:text-red-600 text-2xl"
                                >
                                  &times;
                                </button>
                                <div className="max-w-7xl mx-auto px-4 mt-16">
                                  <ul className="space-y-4">
                                    <li>
                                      <Link
                                        href="/page/dashboard-student"
                                        className="block px-6 py-2 hover:bg-blue-50 transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                      >
                                        <div className="flex items-center space-x-3">
                                          <i className="fas fa-user-graduate text-blue-500" />
                                          <span>Học Viên</span>
                                        </div>
                                      </Link>
                                    </li>
                                    <li>
                                      {data && data.vaitro !== 0 ? (
                                        <Link
                                          href="/page/lecturer-dashboard"
                                          className="block px-6 py-2 hover:bg-blue-50 transition-colors"
                                          onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                          <div className="flex items-center space-x-3">
                                            <i className="fas fa-chalkboard-teacher text-blue-500" />
                                            <span>Giảng Viên</span>
                                          </div>
                                        </Link>
                                      ) : (
                                        <Link
                                          href="/page/become-instructor"
                                          className="block px-6 py-2 hover:bg-blue-50 transition-colors"
                                          onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                          <div className="flex items-center space-x-3">
                                            <i className="fas fa-user-plus text-blue-500" />
                                            <span>Đăng ký giảng viên</span>
                                          </div>
                                        </Link>
                                      )}
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </>
                          )}
                        </li>



                      </ul>

                      <div className="relative group">
                        <Link href="/page/dashboard-student/YeuThich" className="block transition-transform hover:scale-110">
                          <i className="fas fa-heart text-2xl text-pink-500"></i>
                          <div className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            0
                          </div>
                        </Link>
                        <div className="absolute hidden group-hover:block w-48 p-3 bg-white rounded-lg shadow-lg mt-2 transform transition-all duration-200 ease-out">
                          <p className="text-sm font-medium text-gray-700">Danh sách yêu thích</p>
                        </div>
                      </div>

                      {/* Notifications */}
                      <div className="relative group">
                        <div className="cursor-pointer transition-transform hover:scale-110" onClick={toggleModal}>
                          <i className="fas fa-bell text-2xl text-yellow-500"></i>
                          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {thongBao.length}
                          </div>
                        </div>

                        {/* Notification Dropdown */}
                        {isMobileMenuOpen && (
                          <div className="absolute hidden group-hover:block w-80 p-4 bg-white rounded-lg shadow-lg mt-2 right-0 z-50">
                            <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b">Thông Báo Mới</h3>
                            <div className="max-h-64 overflow-y-auto">
                              {thongBao.slice(0, 3).map((notification, index) => (
                                <div key={index} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                     <Image width={40} height={40}      src={notification.noidung.hinh} alt="Notification" className="w-10 h-10 rounded-lg object-cover" />
                                  <div>
                                    <p className="font-medium text-gray-800">{notification.noidung.ten}</p>
                                    <p className="text-sm text-gray-500">Từ: {notification.giangvien.ten}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Shopping Cart */}
                      <div className="relative group">
                        <div className="cursor-pointer transition-transform hover:scale-110" onClick={openCartHandler}>
                          <i className="fas fa-shopping-cart text-2xl text-green-500"></i>
                          <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            0
                          </div>
                        </div>
                      </div>

                      <div className="buttons-area flex items-center gap-4">
                        {!hasData ? (
                          <>
                            <Link href="/page/login" className="px-6 py-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors">
                              Đăng nhập
                            </Link>
                            <Link href="/page/register" className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full hover:shadow-lg transition-all">
                              Đăng ký
                            </Link>
                          </>
                        ) : (
                          <div className="flex items-center gap-4">
                            <button onClick={handleLogout} className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-full transition-colors">
                              Đăng xuất
                            </button>
                            <div className="relative" ref={dropdownRef}>
                              <Image
                                width={48}
                                height={48}
                                src={data?.hinh || '/default-avatar.png'}
                                alt="Profile"
                                className="rounded-full cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                                onClick={toggleDropdown}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </nav>
                  </div>
                )}






                <div className="bg-white shadow-lg relative z-50">
                  <nav className="max-w-7xl mx-auto px-4">
                    <ul className="hidden md:flex flex-wrap items-center justify-start space-x-8">
                      {/* Home */}
                      <li className="group relative py-6">
                        <Link
                          className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                          href="/"
                        >
                          <i className="fas fa-home text-lg" />
                          <span className="font-medium">Trang chủ</span>
                        </Link>
                      </li>

                      {/* About */}
                      <li className="group relative py-6">
                        <Link
                          className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                          href="#"
                        >
                          <i className="fas fa-info-circle text-lg" />
                          <span className="font-medium">Về chúng tôi</span>
                        </Link>
                      </li>

                      {/* Courses Mega Menu */}
                      <li className="group relative py-6">
                        <Link
                          className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                          href="#"
                        >
                          <i className="fas fa-graduation-cap text-lg" />
                          <span className="font-medium">Khóa học</span>
                        </Link>

                        <div className="hidden group-hover:block absolute left-1/2 transform -translate-x-1/2 top-full w-screen bg-white shadow-xl z-50">
                          <div className="max-w-7xl mx-auto px-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
                              {/* Courses Section */}
                              <div className="space-y-4 p-6 hover:bg-gray-50 rounded-xl transition-colors">
                                <h3 className="font-bold text-lg text-gray-800 border-b-2 border-blue-500 pb-2">
                                  Khóa học
                                </h3>
                                <ul className="space-y-4">
                                  <li>
                                    <Link
                                      href="/page/Cours-Filter"
                                      className="text-gray-600 hover:text-blue-600 flex items-center group"
                                    >
                                      <i className="fas fa-list mr-3 text-blue-500 group-hover:scale-110 transition-transform" />
                                      <span className="group-hover:translate-x-1 transition-transform">
                                        Khóa học thể loại
                                      </span>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/page/courseLoTrinh"
                                      className="text-gray-600 hover:text-blue-600 flex items-center group"
                                    >
                                      <i className="fas fa-road mr-3 text-blue-500 group-hover:scale-110 transition-transform" />
                                      <span className="group-hover:translate-x-1 transition-transform">
                                        Lộ trình khóa học
                                      </span>
                                    </Link>
                                  </li>
                                </ul>
                              </div>

                              {/* Other Section */}
                              <div className="space-y-4 p-6 hover:bg-gray-50 rounded-xl transition-colors">
                                <h3 className="font-bold text-lg text-gray-800 border-b-2 border-green-500 pb-2">
                                  Khác
                                </h3>
                                <ul className="space-y-4">
                                  <li>
                                    <Link
                                      href="/page/AllGiangVien"
                                      className="text-gray-600 hover:text-blue-600 flex items-center group"
                                    >
                                      <i className="fas fa-chalkboard-teacher mr-3 text-green-500 group-hover:scale-110 transition-transform" />
                                      <span className="group-hover:translate-x-1 transition-transform">
                                        Giảng Viên Nổi Bật
                                      </span>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/page/NhanTin"
                                      className="text-gray-600 hover:text-blue-600 flex items-center group"
                                    >
                                      <i className="fas fa-comments mr-3 text-green-500 group-hover:scale-110 transition-transform" />
                                      <span className="group-hover:translate-x-1 transition-transform">
                                        Nhắn tin Với Giảng Viên
                                      </span>
                                    </Link>
                                  </li>
                                </ul>
                              </div>

                              {/* Promo Section */}
                              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                <Link href="/page/KhuyenMai" className="block text-center space-y-4">
                                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center transform hover:rotate-12 transition-transform">
                                    <i className="fas fa-gift text-2xl text-white" />
                                  </div>
                                  <p className="font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Nhận Khuyến Mãi
                                  </p>
                                  <span className="text-gray-600">Khám phá ưu đãi đặc biệt</span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      {/* Dashboard */}
                      <li className="group relative py-6">
                        <Link
                          className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                          href="#"
                        >
                          <i className="fas fa-columns text-lg" />
                          <span className="font-medium">Trang tính</span>
                        </Link>
                        <ul className="hidden group-hover:block absolute right-0 top-full bg-white shadow-lg rounded-lg py-3 min-w-[200px] z-50">
                          <li>
                            <Link
                              href="/page/dashboard-student"
                              className="block px-6 py-2 hover:bg-blue-50 transition-colors"
                            >
                              <div className="flex items-center space-x-3">
                                <i className="fas fa-user-graduate text-blue-500" />
                                <span>Học Viên</span>
                              </div>
                            </Link>
                          </li>
                          <li>
                            {data && data.vaitro !== 0 ? (
                              <Link
                                href="/page/lecturer-dashboard"
                                className="block px-6 py-2 hover:bg-blue-50 transition-colors"
                              >
                                <div className="flex items-center space-x-3">
                                  <i className="fas fa-chalkboard-teacher text-blue-500" />
                                  <span>Giảng Viên</span>
                                </div>
                              </Link>
                            ) : (
                              <Link
                                href="/page/become-instructor"
                                className="block px-6 py-2 hover:bg-blue-50 transition-colors"
                              >
                                <div className="flex items-center space-x-3">
                                  <i className="fas fa-user-plus text-blue-500" />
                                  <span>Đăng ký giảng viên</span>
                                </div>
                              </Link>
                            )}
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>

                {data ? (
  data.vaitro !== 0 ? (
    <Link href="/page/lecturer-dashboard" className="group ml-4">
      <div className="m-4 transform transition-all duration-300 hover:scale-105">
        <p className="p-3 m-0 font-bold text-center rounded-lg bg-gradient-to-r from-[#ff6b6b] to-[#1e3c72] text-white shadow-lg hover:shadow-xl flex items-center justify-center gap-2 hover:from-[#1e3c72] hover:to-[#ff6b6b] transition-all duration-300 animate-gradient">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Giảng viên
        </p>
      </div>
    </Link>
  ) : (
    <Link href="/page/become-instructor" className="group ml-4">
      <div className="m-4 transform transition-all duration-300 hover:scale-105">
        <p className="p-3 m-0 font-bold text-center rounded-lg bg-gradient-to-r from-[#ff6b6b] to-[#1e3c72] text-white shadow-lg hover:shadow-xl flex items-center justify-center gap-2 hover:from-[#1e3c72] hover:to-[#ff6b6b] transition-all duration-300 animate-gradient">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
          Đăng ký giảng viên
        </p>
      </div>
    </Link>
  )
) : null}




                <div className="header-right-area-one bg-white shadow-sm">
                  <div className="actions-area flex items-center gap-6">
                    {/* Search Button */}
                    <div className="search-btn transition-transform hover:scale-110 lg:block hidden" onClick={openSearch}>
                      <i className="bi bi-search search text-2xl text-blue-500 hover:text-blue-600"></i>
                    </div>



                    {/* Favorites */}
                    <div className="relative group lg:block hidden">
                      <Link href="/page/dashboard-student/YeuThich" className="block transition-transform hover:scale-110">
                        <i className="fas fa-heart text-2xl text-pink-500"></i>
                        <div className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          0
                        </div>
                      </Link>
                      <div className="absolute hidden group-hover:block w-48 p-3 bg-white rounded-lg shadow-lg mt-2 transform transition-all duration-200 ease-out">
                        <p className="text-sm font-medium text-gray-700">Danh sách yêu thích</p>
                      </div>
                    </div>

                    {/* Notifications */}
                    <div className="relative group lg:block hidden">
                      <div className="relative cursor-pointer group" onClick={toggleModal}>
                        <div className="transition-transform hover:scale-110 duration-[2000ms] z-10 relative">
                          <i className="fas fa-bell text-2xl text-yellow-500 animate-[wiggle_1s_ease-in-out_infinite]"></i>
                          {thongBao.length > 0 && (
                            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center transform scale-100 transition-transform duration-200 group-hover:scale-110">
                              {thongBao.length}
                            </div>
                          )}
                        </div>
                        <div className="absolute inset-0 rounded-full bg-yellow-500/10 animate-ping" />
                      </div>

                      {/* Notification Dropdown */}
                      <div className="absolute hidden group-hover:block w-80 p-4 bg-white rounded-lg 
                            shadow-xl hover:shadow-2xl mt-2 right-0 z-[100]
                            transform transition-all duration-300 ease-in-out origin-top
                            border border-gray-100 hover:border-blue-200
                            hover:scale-[1.02] opacity-0 group-hover:opacity-100
                            transition-[opacity,transform,visibility] delay-[0ms,0ms,2000ms]
                            group-hover:delay-[0ms,0ms,0ms]" ref={dropdownRef}>
                        <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b">Thông Báo Mới</h3>
                        <div className="max-h-64 overflow-y-auto">
                          {thongBao.slice(0, 3).map((notification, index) => (
                            <div key={index} className="flex items-start gap-3 p-2 hover:bg-blue-50 
                              rounded-lg transition-colors duration-200 cursor-pointer">
                             <Image
                              width={40} height={40}
                              src={notification.noidung.hinh}
                                alt="Notification"
                                className="w-10 h-10 rounded-lg object-cover" />
                              <div>
                                <p className="font-medium text-gray-800 hover:text-blue-600 transition-colors">
                                  {notification.noidung.ten}
                                </p>
                                <p className="text-sm text-gray-500">Từ: {notification.giangvien.ten}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Shopping Cart */}
                    <div className="relative group lg:block hidden">
                      <div className="cursor-pointer transition-transform hover:scale-110" onClick={openCartHandler}>
                        <i className="fas fa-shopping-cart text-2xl text-green-500"></i>
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          0
                        </div>
                      </div>
                    </div>


                  </div>


                  {/* Auth Buttons */}
                  <div className="buttons-area flex items-center gap-4">
                    {!hasData ? (
                      <>
                        <Link href="/page/login" className="px-6 py-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors">
                          Đăng nhập
                        </Link>
                        <Link href="/page/register" className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full hover:shadow-lg transition-all">
                          Đăng ký
                        </Link>
                      </>
                    ) : (
                      <div className="flex items-center gap-4">
                        <button onClick={handleLogout} className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-full transition-colors">
                          Đăng xuất
                        </button>
                        <div className="relative" ref={dropdownRef}>
                          <Image
                            width={48}
                            height={48}
                            src={data?.hinh || '/default-avatar.png'}
                            alt="Profile"
                            className="rounded-full cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                            onClick={toggleDropdown}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>


              </div>
            </div>
          </div>

          <div className={`fixed inset-0 h-screen z-[1000] backdrop-blur-sm bg-black/30 transition-all ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`absolute top-0 right-0 w-full sm:w-96 h-full bg-white shadow-2xl transform transition-transform duration-200 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
              {/* Header */}
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-cyan-500 ">
                <h2 className="text-xl font-bold text-white">
                  <i className="bi bi-list"></i>
                </h2>
                <button onClick={closeHeader2} className="rounded-full p-2 hover:bg-white/20 transition-colors w-10">
                  <i className="bi bi-x-lg text-2xl text-white"></i>
                </button>
              </div>

              {/* Content */}
              <div className="px-4 py-2 max-h-[calc(100vh-80px)] overflow-y-auto bg-gray-50">
                {/* User Profile Section */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl mb-4">
                  <Image
                    width={60}
                    height={60}
                    src={data?.hinh || '/default-avatar.png'}
                    alt="User Avatar"
                    className="rounded-full border-4 border-white shadow-md"
                  />
                  <div>
                    <p className="font-bold text-gray-800">{data?.ten}</p>
                    <p className="text-sm text-gray-500">Tài khoản sinh viên</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    className="flex items-center gap-2 p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right text-red-600"></i>
                    <span className="text-red-600 font-medium">Đăng Xuất</span>
                  </button>
                  <Link href="/page/dashboard-student/setting" className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <i className="bi bi-gear-fill text-blue-600"></i>
                    <span className="text-blue-600 font-medium">Cài Đặt</span>
                  </Link>
                </div>

                {/* Menu Items */}
                <div className="space-y-2 bg-white">
                  <Link href="/page/cart" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <i className="bi bi-cart text-gray-600"></i>
                    <span className="font-medium">Giỏ Hàng</span>
                  </Link>
                  <Link href="/page/dashboard-student/lichsudonhang" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                    <i className="bi bi-clock-history text-gray-600"></i>
                    <span className="font-medium">Lịch Sử Mua</span>
                  </Link>
                  <Link href="/page/dashboard-student/myprofile" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                    <i className="bi bi-person text-gray-600"></i>
                    <span className="font-medium">Hồ Sơ</span>
                  </Link>
                  <Link href="#" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                    <i className="bi bi-share text-gray-600"></i>
                    <span className="font-medium">Mạng Xã Hội</span>
                  </Link>
                  <Link href="#" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                    <i className="bi bi-gift text-gray-600"></i>
                    <span className="font-medium">Ưu Đãi</span>
                  </Link>
                  <Link href="#" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                    <i className="bi bi-bell text-gray-600"></i>
                    <span className="font-medium">Thông Báo</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>

      </header>




      {isOpenSearch && (
  <div className="fixed inset-0 flex items-center justify-center z-50
    animate-[fadeIn_0.3s_ease-out]">
    <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50 backdrop-blur-md
      animate-[fadeIn_0.3s_ease-out]" 
      onClick={closeSearch}>
    </div>
    <div className="relative flex flex-col items-center p-8 rounded-2xl
      bg-gradient-to-b from-white/95 to-white/90
      backdrop-filter backdrop-blur-xl
      shadow-[0_20px_70px_-15px_rgba(0,0,0,0.3),inset_0_0_20px_rgba(255,255,255,0.7)]
      border border-white/20
      animate-[scaleIn_0.3s_ease-out]
      transform transition-all duration-300 hover:scale-[1.02]">
      <form onSubmit={formSearch} className="flex w-full min-w-[450px]">
        <div className="flex border-2 border-gray-200/80 rounded-xl w-full 
          shadow-inner bg-white/90
          focus-within:border-blue-400 focus-within:ring-4 
          focus-within:ring-blue-100/50 transition duration-200">
          <div className="flex items-center pl-4">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-4 pl-3 focus:outline-none rounded-l-xl text-lg
              bg-transparent placeholder-gray-400
              animate-[slideIn_0.4s_ease-out]"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-blue-600 m-1
              px-6 py-2 text-white rounded-lg font-medium
              shadow-md hover:shadow-lg
              hover:from-blue-600 hover:to-blue-700
              active:from-blue-700 active:to-blue-800
              transition duration-200 
              hover:scale-[1.02] transform
              flex items-center gap-2"
          >
            <span>Search</span>
            <svg className="w-5 h-5 animate-[bounce_1s_infinite]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>
      <button
        className="mt-6 px-8 py-2.5 rounded-lg font-medium
          bg-gradient-to-r from-red-500 to-red-600
          text-white shadow-md hover:shadow-lg
          hover:from-red-600 hover:to-red-700
          active:from-red-700 active:to-red-800
          transition-all duration-200
          hover:scale-105 transform
          flex items-center gap-2"
        onClick={closeSearch}
      >
        <span>Hủy</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
)}

      <div>

        
      <style jsx>{`
        @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 8s ease infinite;
  }
  /* Animations */
  @keyframes colorChange {
    0% { background-color: #4e54c8; }
    25% { background-color: #8f94fb; }
    50% { background-color: #4776E6; }
    75% { background-color: #8E54E9; }
    100% { background-color: #4e54c8; }
  }

  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(66, 153, 225, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(66, 153, 225, 0); }
    100% { box-shadow: 0 0 0 0 rgba(66, 153, 225, 0); }
  }

  @keyframes wiggle {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(10deg); }
    50% { transform: rotate(0deg); }
    75% { transform: rotate(-10deg); }
    100% { transform: rotate(0deg); }
  }

  @keyframes slide-left {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }

  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-10%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Header styles */
  .header-top-one-wrapper {
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  .animated-bg {
    animation: colorChange 15s infinite;
    transition: background-color 0.5s ease;
  }

  /* Link effects */
  .hover-effect {
    color: white !important;
    text-decoration: none;
    transition: opacity 0.3s;
  }

  .hover-effect:hover {
    opacity: 0.8;
  }

  /* Dropdown styles */
  .dropdown-toggle, .dropdown-item {
    transition: all 0.3s ease;
  }

  .dropdown-menu {
    margin-top: 0.5rem;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  .dropdown-item {
    padding: 0.5rem 1.5rem;
    transition: background-color 0.2s;
  }

  .dropdown-item:hover {
    background-color: #f8f9fa;
  }

  /* Logo styles */
  .logo-area {
    display: inline-block;
    padding: 8px;
    transition: transform 0.3s ease;
  }

  .logo-wrapper {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
  }

  .logo-image {
    transition: all 0.4s ease;
  }

  .logo-area:hover {
    transform: translateY(-2px);
  }

  .logo-area:hover .logo-image {
    transform: scale(1.05);
    filter: brightness(1.1);
  }

  .logo-area:hover .logo-wrapper {
    animation: pulse 1.5s infinite;
  }

  /* Category styles */
  .category-btn {
    background: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  .category-btn:hover {
    transform: translateY(-1px);
  }

  /* Utility classes */
  .text-primary {
    color: #0066cc;
  }

  .animate-slide-left {
    animation: slide-left 0.3s ease-out;
  }

  .animate-slide-down {
    animation: slide-down 0.3s ease-out;
  }
`}</style>
      </div>
    </>
  );
}
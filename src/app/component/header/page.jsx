"use client";

import React, { useEffect, useState, useRef } from "react";
import "./cart1.css";
import Image from "next/image";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Cart } from "./cart/cartheader";
import { Categoryheader } from "../category/category.component";
import { LayThongBao } from "@/service/ThongBao/ThongBao";
import Link from "next/link";
import { use } from "@/assets/js/plugins/swiper";

const DropdownMenu = () => {
  const [langOpen, setLangOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  return (
    <div className="right-information d-flex">
      <div className="custom-dropdown-wrapper">
        <button
          className="btn dropdown-toggle custom-dropdown "
          onClick={() => setLangOpen(!langOpen)}
        >
          <span className="text-xl">English</span>
        </button>
        {langOpen && (
          <ul className="dropdown-menu show ">
            <li>
              <button className="dropdown-item text-xl" style={{ fontWeight: '400' }}>Deutsch</button>
            </li>
            <li>
              <button className="dropdown-item text-xl" style={{ fontWeight: '400' }}>Portuguese</button>
            </li>
            <li>
              <button className="dropdown-item text-xl" style={{ fontWeight: '400' }}>Russian</button>
            </li>
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
          border: 1px solid white;
          border-radius: 8px;
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
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          animation: slideDown 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.18);
          padding: 0.5rem;
        }

        .dropdown-item {
          padding: 4px 8px;
          cursor: pointer;
          color: #333;
          margin: 2px 0;
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
          0% {
            box-shadow: 0 0 5px rgba(255, 107, 107, 0.2);
          }
          50% {
            box-shadow: 0 0 20px rgba(30, 60, 114, 0.4);
          }
          100% {
            box-shadow: 0 0 5px rgba(255, 107, 107, 0.2);
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }
      `}</style>
    </div>
  );
};

const Contact = () => {
  return (
    <div className="header-top-one-wrapper gradient-bg text-white py-3">
      <div className="container">
        <div className="header-top-one d-flex justify-content-between align-items-center">
          <div className="left-information">
            <Link
              href="mailto:techstudent@gmail.com"
              className="contact-link text-xl"
            >
              <i className="fa-light fa-envelope  bounce" />
              techstudent@gmail.com
            </Link>
            <Link href="tel:+123456789" className="contact-link text-xl">
              <i className="fa-light fa-phone bounce" />
              +123 456 789
            </Link>
          </div>
          <div className="right-information d-flex">
            <DropdownMenu />
          </div>
        </div>
      </div>

      <style jsx>{`
        .gradient-bg {
          background: linear-gradient(135deg, #1e3c72 0%, #ff6b6b 100%);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          animation: gradientShift 8s infinite;
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
  const [searchTerm, setSearchTerm] = useState("");
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
    if (typeof window !== "undefined" && localStorage.getItem("data")) {
      setHasData(true);
    }
  }, []);

  const data =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("data"))
      : null;
  console.log(data);

  useEffect(() => {
    LayThongBao()
      .then((res) => {
        setThongBao(res);
      })
      .catch((error) => {
        console.error("Failed to fetch notifications:", error);
      });
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("lecturerId");
      localStorage.removeItem("data");
      localStorage.removeItem("rememberedUser");
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
      currentDropdown.addEventListener("mouseenter", handleMouseEnter);
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (currentDropdown) {
        currentDropdown.removeEventListener("mouseenter", handleMouseEnter);
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formSearch = (e) => {
    e.preventDefault();
    const encodedSearchTerm = encodeURIComponent(searchTerm).replace(
      /%20/g,
      "+"
    );
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

                <div className="left-side-header flex justify-between items-center w-full">
                  <Link href="/" className="logo-area">
                    <div className="logo-wrapper">
                      <Image
                        width={500}
                        height={300}
                        src="https://res.cloudinary.com/dn7s1su66/image/upload/v1732710859/yz6rhca3inwl1nregayf.jpg"
                        className="w-72 logo-image"
                        alt="logo"
                      />
                    </div>
                  </Link>
                </div>
                <div className="">
                  <div className="lg:hidden flex">
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
                  <div className="lg:hidden">
                    <nav className="space-y-4 mt-3 ">
                      <div>
                        <button
                          onClick={openSearch}
                          className="w-full text-left ml-7 text-white  bg-orange-500 hover:bg-gray-300 hover:text-blue-600 transition-colors rounded px-4 py-2"
                        >
                          Tìm kiếm
                        </button>
                      </div>

                      <ul>
                        <li className="group relative py-6">
                          <Link
                            className="flex items-center space-x-2 text-gray-700 hover:text-pink-700 transition-colors"
                            href="/"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <i className="fas fa-home text-xl" />
                            <span className="font-medium">Trang chủ</span>
                          </Link>
                        </li>

                        <li className="group relative py-6">
                          <Link
                            className="flex items-center space-x-2 text-gray-700 hover:text-pink-700 transition-colors"
                            href="#"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <i className="fas fa-info-circle text-xl" />
                            <span className="font-medium">Về chúng tôi</span>
                          </Link>
                        </li>

                        <li className="group relative py-6">
                          <button
                            className="flex items-center space-x-2 text-gray-700 hover:text-pink-700 transition-colors w-full"
                            onClick={() => setIsCoursesMenuOpen(!isCoursesMenuOpen)}
                            aria-haspopup="true"
                            aria-expanded={isCoursesMenuOpen}
                          >
                            <i className="fas fa-graduation-cap text-xl" />
                            <span className="font-medium">Khóa học</span>
                          </button>

                          {isCoursesMenuOpen && (
                            <div className="fixed top-0 right-0 h-full  bg-white w-screen shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
                              <button
                                onClick={() => setIsCoursesMenuOpen(false)}
                                className="absolute top-4 left-4 text-gray-600 hover:text-red-600"
                              >
                                &times;
                              </button>
                              <div className="max-w-7xl mx-auto px-4 mt-12 bg-white ">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                                  <div className="space-y-3 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                                    <h3 className="text-base text-gray-800 border-b-2 pb-1">
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

                                  <div className="space-y-3 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                                    <h3 className="text-base text-gray-800 border-b-2 pb-1">
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

                                  <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                    <Link
                                      href="/page/KhuyenMai"
                                      className="block text-center space-y-3"
                                      onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                      <div className="w-12 h-12 mx-auto bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center transform hover:rotate-12 transition-transform">
                                        <i className="fas fa-gift text-lg text-white" />
                                      </div>
                                      <p className="font-bold text-base bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                        Nhận Khuyến Mãi
                                      </p>
                                      <span className="text-sm text-gray-600">
                                        Khám phá ưu đãi đặc biệt
                                      </span>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </li>

                        <li className="group relative py-6">
                          <button
                            className="flex items-center space-x-2 text-gray-700 hover:text-pink-700 transition-colors w-full"
                            onClick={() => setIsDashboardMenuOpen(!isDashboardMenuOpen)}
                            aria-haspopup="true"
                            aria-expanded={isDashboardMenuOpen}
                          >
                            <i className="fas fa-columns text-2xl" />
                            <span className="font-medium">Trang tính</span>
                          </button>

                          {isDashboardMenuOpen && (
                            <>
                              <div
                                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                                onClick={() => setIsDashboardMenuOpen(false)}
                              ></div>

                              <div
                                className={`fixed top-0 right-0 h-full w-screen bg-white shadow-xl z-50 transform ${isDashboardMenuOpen
                                  ? "translate-x-0"
                                  : "translate-x-full"
                                  } transition-transform duration-300 ease-in-out`}
                              >
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
                                          <div className="flex items-center">
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
                                            <span>Giảng viên</span>
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
                      <div className="flex items-center ml-7 space-x-4">
                        <div className="relative group">
                          <Link
                            href="/page/dashboard-student/YeuThich"
                            className="block transition-transform hover:scale-110"
                          >
                            <i className="fas fa-heart text-2xl"></i>
                            <div className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              0
                            </div>
                          </Link>
                          <div className="absolute hidden group-hover:block w-48 p-3 bg-white rounded-lg shadow-lg mt-2">
                            <p className="text-sm font-medium text-gray-700 hover:text-pink-700">
                              Danh sách yêu thích
                            </p>
                          </div>
                        </div>

                        <div className="relative group">
                          <div
                            className="cursor-pointer transition-transform hover:scale-110"
                            onClick={toggleModal}
                          >
                            <i className="fas fa-bell text-2xl text-yellow-500"></i>
                            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {thongBao.length}
                            </div>
                          </div>

                          {isMobileMenuOpen && (
                            <div className="absolute hidden group-hover:block w-80 p-4 bg-white rounded-lg shadow-lg mt-2 right-0 z-50">
                              <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b">
                                Thông Báo Mới
                              </h3>
                              <div className="max-h-64 overflow-y-auto">
                                {thongBao.slice(0, 3).map((notification, index) => (
                                  <div
                                    key={index}
                                    className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                                  >
                                    <Image
                                      width={40}
                                      height={40}
                                      src={notification.noidung.hinh}
                                      alt="Notification"
                                      className="w-10 h-10 rounded-lg object-cover"
                                    />
                                    <div>
                                      <p className="font-medium text-gray-800">
                                        {notification.noidung.ten}
                                      </p>
                                      <p className="text-sm text-gray-500">
                                        Từ: {notification.giangvien.ten}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="relative group">
                          <div
                            className="cursor-pointer transition-transform hover:scale-110"
                            onClick={openCartHandler}
                          >
                            <i className="fas fa-shopping-cart text-3xl hover:text-green-500 text-gray-600"></i>
                          </div>
                        </div>
                      </div>

                      <div className="buttons-area flex items-center gap-4">
                        {!hasData ? (
                          <>
                            <Link
                              href="/page/register"
                              class="border border-gray-300 rounded-full px-4 py-2 text-black hover:border-pink-700 hover:text-pink-700 transition-all"
                            >
                              Đăng ký
                            </Link>
                            <Link
                              href="/page/login"
                              class="border border-gray-300 rounded-full px-4 py-2 bg-gray-200 text-black hover:border-pink-700 hover:text-pink-700 transition-all"
                            >
                              Đăng nhập
                            </Link>
                          </>
                        ) : (
                          <div className="flex items-center gap-4">
                            <button
                              onClick={handleLogout}
                              className="px-4 py-2 text-red-600 hover:bg-pink-700 rounded-full transition-colors"
                            >
                              Đăng xuất
                            </button>
                            <div className="relative" ref={dropdownRef}>
                              <Image
                                width={48}
                                height={48}
                                src={data?.hinh || "/default-avatar.png"}
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

                <div className="hidden lg:block">
                  <nav>
                    <ul
                      className="flex flex-wrap items-center justify-between gap-8"
                      style={{ zoom: "80%" }}
                    >
                      <li className="group relative">
                        <Link
                          className="flex items-center text-gray-700 hover:text-pink-700 transition-colors"
                          href="/"
                        >
                          <i className="fas fa-home text-2xl mr-2" />
                          <span className="font-medium text-3xl">Trang chủ</span>
                        </Link>
                      </li>

                      <li className="group relative">
                        <Link
                          className="flex items-center text-gray-700 hover:text-pink-700 transition-colors"
                          href="#"
                        >
                          <i className="fas fa-info-circle text-2xl mr-2" />
                          <span className="font-medium text-3xl">Giới thiệu</span>
                        </Link>
                      </li>
                      <li className="group relative">
                        <div className="flex items-center text-gray-700 hover:text-pink-700 transition-colors cursor-pointer">
                          <i class="fa-solid fa-list text-2xl mr-2"></i>
                          <span className="text-3xl font-medium mr-2">Thể loại</span>
                          <i className="fas fa-chevron-down text-xl transition-transform group-hover:rotate-180"></i>
                        </div>
                        <div className="dropdown-menu hidden group-hover:block absolute left-0 mt-2 w-350 shadow-lg rounded-lg z-10">
                          <Categoryheader />
                        </div>
                      </li>
                      <li className="group relative">
                        <Link
                          className="flex items-center text-gray-700 hover:text-pink-700 transition-colors"
                          href="#"
                        >
                          <i className="fas fa-graduation-cap text-2xl mr-2" />
                          <span className="font-medium text-3xl">Khóa học</span>
                        </Link>

                        <div className="hidden group-hover:block absolute left-1/2 transform -translate-x-1/2 top-full w-[1030px] bg-white shadow-xl z-50 border border-black rounded-2xl">
                          <div className="mx-auto px-4">
                            <div className="grid grid-cols-1 md:grid-cols-[300px_300px_300px] gap-8 p-8">
                              <div className="space-y-4 p-6 hover:bg-gray-50 rounded-xl transition-colors">
                                <h3 className="font-medium text-3xl text-gray-800 border-b-2 pb-2">
                                  Khóa học
                                </h3>
                                <ul className="flex flex-col space-y-4">
                                  <li>
                                    <Link
                                      href="/page/Cours-Filter"
                                      className="hover:text-pink-700 flex items-center"
                                    >
                                      <i
                                        className="fas fa-list mr-3 group-hover:scale-110 text-3xl"
                                        style={{ fontWeight: '400' }}
                                      />
                                      <span
                                        className="group-hover:translate-x-1 text-3xl"
                                        style={{ fontWeight: '400' }}
                                      >
                                        Khóa học thể loại
                                      </span>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/page/courseLoTrinh"
                                      className="hover:text-pink-700 flex items-center"
                                    >
                                      <i
                                        className="fas fa-road mr-3 group-hover:scale-110 transition-transform text-3xl"
                                        style={{ fontWeight: '400' }}
                                      />
                                      <span
                                        className="group-hover:translate-x-1 transition-transform text-3xl"
                                        style={{ fontWeight: '400' }}
                                      >
                                        Lộ trình khóa học
                                      </span>
                                    </Link>
                                  </li>
                                </ul>
                              </div>

                              <div className="space-y-4 p-6 hover:bg-gray-50 rounded-xl transition-colors">
                                <h3 className="font-medium text-3xl text-gray-800 border-b-2 pb-2">
                                  Mục khác
                                </h3>
                                <ul className="flex flex-col space-y-4">
                                  <li>
                                    <Link
                                      href="/page/AllGiangVien"
                                      className="hover:text-pink-700 flex items-center"
                                    >
                                      <i
                                        className="fas fa-chalkboard-teacher mr-3 group-hover:scale-110 text-3xl"
                                        style={{ fontWeight: '400' }}
                                      />
                                      <span
                                        className="group-hover:translate-x-1 text-3xl"
                                        style={{ fontWeight: '400' }}
                                      >
                                        Giảng Viên Nổi Bật
                                      </span>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/page/NhanTin"
                                      className="hover:text-pink-700 flex items-center"
                                    >
                                      <i
                                        className="fas fa-comments mr-3 group-hover:scale-110 text-3xl"
                                        style={{ fontWeight: '400' }}
                                      />
                                      <span
                                        className="group-hover:translate-x-1 text-3xl"
                                        style={{ fontWeight: '400' }}
                                      >
                                        Nhắn tin Giảng Viên
                                      </span>
                                    </Link>
                                  </li>
                                </ul>
                              </div>

                              <div className="p-6 w-[300px] bg-gradient-to-r from-blue-900 via-pink-700 to-pink-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                <Link
                                  href="/page/KhuyenMai"
                                  className="block text-center space-y-4"
                                >
                                  <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center transform hover:rotate-12 transition-transform">
                                    <i
                                      className="fas fa-gift text-2xl text-pink-700"
                                      style={{ color: "rgb(244, 114, 182)" }}
                                    />
                                  </div>
                                  <p
                                    style={{ fontWeight: '400' }}
                                    className="text-3xl text-white text-transparent pb-3 pt-2"
                                  >
                                    Nhận Khuyến Mãi
                                  </p>
                                  <span
                                    style={{ fontWeight: '400' }}
                                    className="text-gray-600 text-3xl text-white"
                                  >
                                    Khám phá ưu đãi đặc biệt
                                  </span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li className="group relative">
                        <Link
                          className="flex items-center text-gray-700 hover:text-pink-700 transition-colors"
                          href="#"
                        >
                          <i className="fas fa-columns text-2xl mr-2" />
                          <span className="font-medium text-3xl">Trang tính</span>
                        </Link>
                        <ul className="hidden group-hover:block absolute right-0 top-full bg-white shadow-lg rounded-lg py-3 min-w-[200px] z-50 border border-black">
                          <li>
                            <Link
                              href="/page/dashboard-student"
                              className="block px-6 py-2 hover:bg-blue-50 transition-colors pt-4 pb-4"
                            >
                              <div className="flex items-center space-x-3">
                                <i
                                  className="fas fa-user-graduate text-3xl"
                                  style={{ fontWeight: '400' }}
                                />
                                <span
                                  className="text-3xl"
                                  style={{ fontWeight: '400' }}
                                >
                                  Học Viên
                                </span>
                              </div>
                            </Link>
                          </li>
                          <li>
                            {data && data.vaitro !== 0 ? (
                              <Link
                                href="/page/lecturer-dashboard"
                                className="block px-6 py-2 hover:bg-blue-50 transition-colors pt-4 pb-4"
                              >
                                <div className="flex items-center space-x-3">
                                  <i
                                    className="fa-regular fa-address-book text-3xl mr-2"
                                    style={{ fontWeight: '400' }}
                                  />
                                  <span
                                    className="font-medium text-3xl"
                                    style={{ fontWeight: '400' }}
                                  >
                                    Làm giảng Viên
                                  </span>
                                </div>
                              </Link>
                            ) : (
                              <Link
                                href="/page/become-instructor"
                                className="block px-6 py-2 hover:bg-blue-50 transition-colors pt-4 pb-4"
                              >
                                <div className="flex items-center space-x-3">
                                  <i
                                    className="fa-regular fa-address-book text-3xl mr-2"
                                    style={{ fontWeight: '400' }}
                                  />
                                  <span
                                    className="font-medium text-3xl"
                                    style={{ fontWeight: '400' }}
                                  >
                                    Làm giảng Viên
                                  </span>
                                </div>
                              </Link>
                            )}
                          </li>
                        </ul>
                      </li>

                      <li className="group relative">
                        {data ? (
                          data.vaitro !== 0 ? (
                            <Link
                              href="/page/lecturer-dashboard"
                              className="flex items-center text-gray-700 hover:text-pink-700 transition-colors"
                            >
                              <i className="fa-solid fa-chalkboard-user text-2xl mr-2"></i>
                              <span className="text-3xl font-medium">
                                Làm giảng viên
                              </span>
                            </Link>
                          ) : (
                            <Link
                              href="/page/become-instructor"
                              className="flex items-center text-gray-700 hover:text-pink-700 transition-colors"
                            >
                              <i className="fa-solid fa-chalkboard-user text-2xl mr-2"></i>
                              <span className="text-3xl font-medium">
                                Làm giảng viên
                              </span>
                            </Link>
                          )
                        ) : null}
                      </li>
                    </ul>
                  </nav>
                </div>

                <div className="header-right-area-one">
                  <div className="actions-area flex items-center gap-3">
                    <div
                      className="search-btn transition-transform hover:scale-110 lg:block hidden"
                      onClick={openSearch}
                    >
                      <i className="bi bi-search search text-3xl text-blue-500 hover:text-blue-600 pl-5"></i>
                    </div>

                    <div className="relative group lg:block hidden">
                      <Link
                        href="/page/dashboard-student/YeuThich"
                        className="block transition-transform hover:scale-110"
                      >
                        <i className="fas fa-heart text-3xl text-gray-600 hover:text-pink-700 transition-colors"></i>
                      </Link>
                      <div
                        className="absolute hidden group-hover:block"
                        style={{ width: "200px" }}
                      >
                        <div className="p-3 bg-white rounded-lg shadow-lg mt-2 transform transition-all duration-200 ease-out">
                          <p className="text-xl font-medium text-gray-700 hover:text-pink-700 transition-colors pt-3 pb-3">
                            Danh sách yêu thích
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="relative group lg:block hidden">
                      <div
                        className="relative cursor-pointer group"
                        onClick={toggleModal}
                      >
                        <div className="transition-transform hover:scale-110 duration-[2000ms] z-10 relative">
                          <i className="fas fa-bell text-3xl text-gray-600 hover:text-pink-700 transition-colors"></i>
                          {thongBao.length > 0 && (
                            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center transform scale-100 transition-transform duration-200 group-hover:scale-110">
                              {thongBao.length}
                            </div>
                          )}
                        </div>
                        <div className="absolute inset-0 rounded-full bg-yellow-500/10 animate-ping" />
                      </div>

                      <div
                        className="absolute hidden group-hover:block w-80 p-4 bg-white rounded-lg 
                shadow-xl hover:shadow-2xl mt-2 right-0 z-[100]
                transform transition-all duration-300 ease-in-out origin-top
                border border-gray-100 hover:border-blue-200
                hover:scale-[1.02] opacity-0 group-hover:opacity-100
                transition-[opacity,transform,visibility] delay-[0ms,0ms,2000ms]
                group-hover:delay-[0ms,0ms,0ms]"
                        ref={dropdownRef}
                      >
                        <h3 className="text-xl font-medium text-gray-700 hover:text-pink-700 transition-colors">
                          Thông Báo Mới
                        </h3>
                        <div className="max-h-64 overflow-y-auto">
                          {thongBao.slice(0, 3).map((notification, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 p-2 hover:bg-blue-50 
                      rounded-lg transition-colors duration-200 cursor-pointer"
                            >
                              <Image
                                width={40}
                                height={40}
                                src={notification.noidung.hinh}
                                alt="Notification"
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                              <div>
                                <p className="font-medium text-gray-800 hover:text-blue-600 transition-colors">
                                  {notification.noidung.ten}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Từ: {notification.giangvien.ten}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="relative group lg:block hidden">
                      <div
                        className="cursor-pointer transition-transform hover:scale-110"
                        onClick={openCartHandler}
                      >
                        <i className="fas fa-shopping-cart text-3xl hover:text-pink-700 transition-colors"></i>
                      </div>
                    </div>
                  </div>

                  <div className="buttons-area flex items-center gap-2">
                    {!hasData ? (
                      <>
                        <a
                          href="/page/register"
                          class="border border-gray-300 rounded-full px-4 py-2 text-black hover:border-pink-700 hover:text-pink-700 transition-all"
                        >
                          Đăng ký
                        </a>
                        <a
                          href="/page/login"
                          class="border border-gray-300 rounded-full px-4 py-2 bg-gray-200 text-black hover:border-pink-700 hover:text-pink-700 transition-all"
                        >
                          Đăng nhập
                        </a>
                      </>
                    ) : (
                      <div className="flex items-center gap-0">
                        <div className="relative" ref={dropdownRef}>
                          <Image
                            width={38}
                            height={38}
                            src={data?.hinh || "/default-avatar.png"}
                            alt="Profile"
                            className="rounded-full cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                            onClick={toggleDropdown}
                          />
                        </div>
                        <button
                          onClick={handleLogout}
                          className="text-gray-600 hover:text-pink-700 rounded-full transition-colors text-xl font-medium"
                        >
                          Đăng xuất
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </header>

      {isOpenSearch && (
        <div className="fixed inset-0 flex items-center justify-center z-50 animate-[fadeIn_0.3s_ease-out]">
          <div
            className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]"
            onClick={closeSearch}
          ></div>
          <div className="relative flex flex-col items-center p-8 rounded-2xl bg-gradient-to-b from-white/95 to-white/90 backdrop-filter backdrop-blur-xl shadow-[0_20px_70px_-15px_rgba(0,0,0,0.3),inset_0_0_20px_rgba(255,255,255,0.7)] border border-white/20 animate-[scaleIn_0.3s_ease-out] transform transition-all duration-300">
            <div className="absolute top-4 right-4">
              <button
                className="bg-transparent border-none cursor-pointer"
                onClick={closeSearch}
              >
                <svg
                  className="w-8 h-8 text-gray-600 hover:text-gray-800 transition duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={formSearch} className="flex w-full min-w-[450px]">
              <div className="flex border-2 border-gray-200/80 rounded-xl w-full shadow-inner bg-white/90 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100/50 transition duration-200 mt-4">
                <div className="flex items-center pl-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Tìm kiếm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow focus:outline-none rounded-l-xl text-2xl pt-15 pb-15 bg-transparent placeholder-gray-400 animate-[slideIn_0.4s_ease-out]"
                  style={{ fontSize: "15px" }}
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-900 via-pink-700 to-pink-700 m-1 w-[120px] px-2 py-3 text-white rounded-lg shadow-md hover:shadow-lg hover:from-pink-700 hover:to-pink-700 active:from-pink-700 active:to-pink-700 transition duration-200 hover:scale-[1.02] transform flex items-center justify-center gap-1"
                >
                  <span className="text-2xl">Search</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div>
        <style jsx>{`
          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 8s ease infinite;
          }
          /* Animations */
          @keyframes colorChange {
            0% {
              background-color: #4e54c8;
            }
            25% {
              background-color: #8f94fb;
            }
            50% {
              background-color: #4776e6;
            }
            75% {
              background-color: #8e54e9;
            }
            100% {
              background-color: #4e54c8;
            }
          }

          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(66, 153, 225, 0.4);
            }
            70% {
              box-shadow: 0 0 0 10px rgba(66, 153, 225, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(66, 153, 225, 0);
            }
          }

          @keyframes wiggle {
            0% {
              transform: rotate(0deg);
            }
            25% {
              transform: rotate(10deg);
            }
            50% {
              transform: rotate(0deg);
            }
            75% {
              transform: rotate(-10deg);
            }
            100% {
              transform: rotate(0deg);
            }
          }

          @keyframes slide-left {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
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
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
          .dropdown-toggle,
          .dropdown-item {
            transition: all 0.3s ease;
          }

          .dropdown-menu {
            margin-top: 0.5rem;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
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

          @media (max-width: 768px) {
            .header-one-wrapper {
              flex-direction: column;
              align-items: flex-start;
            }

            .left-side-header {
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .header-right-area-one {
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .actions-area {
              display: none;
            }

            .buttons-area {
              display: none;
            }

            .mobile-menu-button {
              display: block;
            }

            .mobile-menu {
              display: block;
            }

            .mobile-menu ul {
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 100%;
            }

            .mobile-menu ul li {
              width: 100%;
              text-align: center;
            }

            .mobile-menu ul li a {
              display: block;
              padding: 1rem;
              border-bottom: 1px solid #ccc;
            }

            .mobile-menu ul li:last-child a {
              border-bottom: none;
            }

            .mobile-menu ul li a:hover {
              background-color: #f8f9fa;
            }

            .mobile-menu ul li a.active {
              background-color: #0066cc;
              color: white;
            }

            .mobile-menu ul li a.active:hover {
              background-color: #0066cc;
              color: white;
            }

            .mobile-menu ul li a.active:focus {
              background-color: #0066cc;
              color: white;
            }

            .mobile-menu ul li a.active:active {
              background-color: #0066cc;
              color: white;
            }

            .mobile-menu ul li a.active:visited {
              background-color: #0066cc;
              color: white;
            }

            .mobile-menu ul li a.active:link {
              background-color: #0066cc;
              color: white;
            }

            .mobile-menu ul li a.active:hover:active {
              background-color: #0066cc;
              color: white;
            }

            .mobile-menu ul li a.active:hover:focus {
              background-color: #0066cc;
              color: white;
            }

            .mobile-menu ul li a.active:hover:visited {
              background-color: #0066cc;
              color: white;
            }

            .mobile-menu ul li a.active:hover:link {
              background-color: #0066cc;
              color: white;
            }

            .mobile-menu ul li a.active:focus:active {
              background-color: #0066cc;
              color: white;
            }

            .mobile-menu ul li a.active:focus:visited {
              background-color: #0066cc;
              color: white;
            }

            .mobile-menu ul li a.active:focus:link {
              background-color: #0066cc;
              color: white;
            }

            .mobile-menu ul li a.active:active:visited {
              background-color: #0066cc;
              color: white;
            }

            .mobile-menu ul li a.active:active:link {
              background-color: #0066cc;
              color: white;
            }

            .mobile-menu ul li a.active:visited:link {
              background-color: #0066cc;
              color: white;
            }

            .mobile-menu ul li a.active:hover:active:focus {
              background-color: #0066cc;
              color: white;
            }

            .mobile-menu ul li a.active:hover:active:visited {
              background-color: #0066cc;
              color: white;
            }

            .mobile-menu ul li a.active:hover:active:link {
              background-color: #0066cc;
              color: white;
            }

            .mobile-menu ul li a.active:hover:focus:visited {
              background-color: #0066cc;
              color: white;
            }

            .mobile-menu ul li a.active:hover:focus:link {
              background-color: #0066cc;
              color: white;
            }

            .mobile-menu ul li a.active:hover:visited:link {
              background-color: #0066cc;
              color: white;
            }

            .mobile-menu ul li a.active:focus:active:visited {
              background-color: #0066cc;
              color: white;
            }

            .mobile-menu ul li a.active:focus:active:link {
              background-color: #0066cc;
              color: white;
            }

            .mobile-menu ul li a.active:focus:visited:link {
              background-color: #0066cc;
              color: white;
            }

            .mobile-menu ul li a.active:active:visited:link {
              background-color: #0066cc;
              color: white;
            }

            .mobile-menu ul li a.active:hover:active:focus:visited {
              background-color: #0066cc;
              color: white;
            }

            .mobile-menu ul li a.active:hover:active:focus:link {
              background-color: #0066cc;
              color: white;
            }

            .mobile-menu ul li a.active:hover:active:visited:link {
              background-color: #0066cc;
              color: white;
            }

            .mobile-menu ul li a.active:hover:focus:visited:link {
              background-color: #0066cc;
              color: white;
            }

            .mobile-menu ul li a.active:focus:active:visited:link {
              background-color: #0066cc;
              color: white;
            }

            .mobile-menu ul li a.active:hover:active:focus:visited:link {
              background-color: #0066cc;
              color: white;
            }
          }
        `}</style>
      </div>
    </>
  );
}
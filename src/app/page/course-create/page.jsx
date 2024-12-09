"use client";
import React, { useState, useEffect, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, Users, Video, Tag, Award, Gift, 
  MessageCircle, ChevronRight, Menu, X 
} from 'react-feather';
import Mota from "./Mota/Mota.jsx";
import Page from "./course/Page.jsx";
import BaiHoc from "./BaiHoc/BaiHoc.jsx";
import TrangDich from "./trangdich/trangdich.jsx";
import TrangGiaKhoaHoc from "./giaca/TrangGiaKhoaHoc.jsx";
import ChungChi from "./ChungChi/Page.jsx";
import KhuyeMai from "./khuyenmai/page.jsx";

const CourseCreatePage = () => {
  const [view, setView] = useState("Mota");
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href;
      const url = new URL(currentUrl);
      const idFromUrl = url.searchParams.get("id");
      setId(idFromUrl);
    }
  }, []);

  const handleSubmit = async () => {
    if (!id) {
      alert("ID khóa học không hợp lệ.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("https://huuphuoc.id.vn/api/guixemxet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_khoahoc: id }),
        referrerPolicy: 'unsafe-url',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSuccessMessage(data.message);
      console.log("Response:", data);
    } catch (error) {
      setError("Lỗi khi gửi yêu cầu xem xét: " + error.message);
      console.error("Error submitting for review:", error);
    } finally {
      setLoading(false);
    }
  };

   const MenuItem = ({ icon: Icon, text, onClick, isActive }) => (
    <motion.button
      whileHover={{ x: 5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        flex items-center w-full p-3 mb-2 rounded-lg
        transition-all duration-200 ease-in-out group
        ${isActive 
          ? 'bg-gradient-to-r from-[#32ADE6] to-[#4299e1] text-white shadow-lg'
          : 'hover:bg-gray-50 text-gray-700 hover:shadow-md'
        }
      `}
    >
      <motion.div
        className={`
          flex items-center justify-center w-8 h-8 rounded-lg mr-3
          ${isActive 
            ? 'bg-white bg-opacity-20' 
            : 'bg-blue-50 group-hover:bg-blue-100'
          }
        `}
        whileHover={{ rotate: [0, -10, 10, -5, 0] }}
        transition={{ duration: 0.5 }}
      >
        <Icon 
          className={`
            w-5 h-5
            ${isActive 
              ? 'text-white' 
              : 'text-blue-500 group-hover:text-blue-600'
            }
          `}
        />
      </motion.div>
      <span className={`
        text-xl font-medium
        ${isActive ? 'text-white' : 'group-hover:text-blue-600'}
      `}>
        {text}
      </span>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="ml-auto"
        >
          <ChevronRight className="w-4 h-4" />
        </motion.div>
      )}
    </motion.button>
  );

  const renderContent = () => {
    switch (view) {
      case "Mota":
        return <Mota />;
      case "BaiHoc":
        return <BaiHoc />;
      case "TrangDich":
        return <TrangDich />;
      case "GiaCa":
        return <TrangGiaKhoaHoc />;
      case "ChungChi":
        return <ChungChi />;
      case "KhuyenMai":
        return <KhuyeMai />;
      default:
        return <p>Dashboard Content</p>;
    }
  };

  return (
    <Fragment>
      <Page id={id}>
        <div className="flex flex-col md:flex-row w-full min-h-[90vh] overflow-hidden border-2 border-gray-200 rounded-2xl shadow-2xl bg-white relative">
          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-full shadow-lg"
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </motion.button>

          {/* Sidebar */}
          <AnimatePresence>
            {(isMobileMenuOpen || (typeof window !== 'undefined' && !window.matchMedia('(max-width: 768px)').matches)) && (
              <motion.aside
                initial={{ x: -320, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -320, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed md:relative w-[85vw] md:w-96 h-screen p-6 bg-gradient-to-b from-white to-gray-50 border-r-2 border-gray-100 z-40 overflow-y-auto"
              >
                <div className="space-y-6">
                  <h5 className="p-3 mb-4 text-[16px] font-bold text-gray-800 bg-gray-100 rounded-xl shadow-sm">
                    1. Lên kế hoạch cho khóa học của bạn
                  </h5>
                  <div className="mb-6 ">
                    <MenuItem 
                      icon={Users}
                      text="Người học dự định"
                      onClick={() => setView("Mota")}
                      isActive={view === "Mota"}
                    />
                  </div>

                  <h5 className="p-3 mb-4 text-[16px] font-bold text-gray-800 bg-gray-100 rounded-xl shadow-sm">
                    2. Tạo nội dung của bạn
                  </h5>
                  <div className="mb-6">
                    <MenuItem 
                      icon={BookOpen}
                      text="Chương trình giảng dạy"
                      onClick={() => setView("BaiHoc")}
                      isActive={view === "BaiHoc"}
                    />
                  </div>

                  <h5 className="p-3 mb-4 text-[16px] font-bold text-gray-800 bg-gray-100 rounded-xl shadow-sm">
                    3. Xuất bản khóa học của bạn
                  </h5>
                  <div className="space-y-3">
                    <MenuItem 
                      icon={Video}
                      text="Trang đích của khóa học"
                      onClick={() => setView("TrangDich")}
                      isActive={view === "TrangDich"}
                    />
                    <MenuItem 
                      icon={Tag}
                      text="Giá cả"
                      onClick={() => setView("GiaCa")}
                      isActive={view === "GiaCa"}
                    />
                    <MenuItem 
                      icon={Award}
                      text="Chứng Chỉ"
                      onClick={() => setView("ChungChi")}
                      isActive={view === "ChungChi"}
                    />
                    <MenuItem 
                      icon={Gift}
                      text="Khuyến mãi"
                      onClick={() => setView("KhuyenMai")}
                      isActive={view === "KhuyenMai"}
                    />
                    <MenuItem 
                      icon={MessageCircle}
                      text="Tin nhắn khóa học"
                      onClick={() => {}}
                      isActive={false}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-8 w-full py-4 text-lg font-bold text-white rounded-xl bg-gradient-to-r from-[#32ADE6] to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={handleSubmit}
                  >
                    Submit for Review
                  </motion.button>

                  <div className="mt-4 text-center mb-20 md:mb-0">
                    {loading && (
                      <p className="text-sm text-primary animate-pulse">Đang gửi yêu cầu...</p>
                    )}
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    {successMessage && (
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-green-600"
                      >
                        {successMessage}
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-grow min-h-screen bg-gradient-to-br from-gray-50 to-white pt-16 md:pt-0">
            <main className="p-4 md:p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-4 md:p-8 rounded-2xl shadow-lg"
              >
                {renderContent()}
              </motion.div>
            </main>
          </div>

          {/* Overlay for mobile menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-30 md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </Page>

      <style jsx>{`
        body {
          overflow: hidden;
        }
      `}</style>
    </Fragment>
  );
};

export default CourseCreatePage;
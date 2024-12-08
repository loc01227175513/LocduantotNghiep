"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
export default function FooterComponent() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: false, // Animation will repeat on scroll
      mirror: true, // Elements will animate out while scrolling past them
      easing: "ease-in-out",
      anchorPlacement: "center-center",
      offset: 100,
    });
  }, []);
  return (
    <div data-aos="zoom-in">
      <footer className="bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="footer-callto-action-area py-16">
          <div className="container mx-auto px-4">
            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-900 via-pink-700 to-pink-700 rounded-2xl p-12 relative overflow-hidden">
              <div className="max-w-2xl relative z-10">
                <h2 className="text-2xl text-white mb-1">
                  Mở khóa tiềm năng của bạn với
                  <br />
                </h2>
                <p
                  className="text-white text-4xl mb-4"
                  style={{ fontWeight: "500" }}
                >
                  TechStudent Chứng nhận
                </p>
                <Link
                  href="/page/Cours-Filter"
                  className="inline-flex items-center px-6 py-3 bg-white text-pink-700 rounded-lg hover:bg-blue-50 transition duration-300 text-xl"
                >
                  Khám phá tất cả các khóa học
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Main Footer */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
              {/* Brand Section */}
              <div>
                <p className="text-gray-600 mb-6">
                  Trao quyền cho người học trên toàn thế giới với các tài nguyên
                  giáo dục chất lượng cao và công nghệ tiên tiến.
                </p>
                <div className="space-y-3">
                  <Link
                    href="#"
                    className="flex items-center text-gray-600 hover:text-blue-600 text-xl"
                  >
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Melbourne, Úc
                  </Link>
                  <Link
                    href="tel:+61485826710"
                    className="flex items-center text-gray-600 hover:text-blue-600 text-xl"
                  >
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    +61 485 826 710
                  </Link>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h6 className="font-semibold mb-6 text-2xl">Quick Links</h6>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/courses"
                      className="text-gray-600 hover:text-blue-600 text-xl"
                    >
                      Các khóa học mới nhất
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-gray-600 hover:text-blue-600 text-xl"
                    >
                      Về chúng tôi
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/careers"
                      className="text-gray-600 hover:text-blue-600 text-xl"
                    >
                      Sự nghiệp
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing"
                      className="text-gray-600 hover:text-blue-600 text-xl"
                    >
                      Kế hoạch định giá
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Newsletter */}
              <div className="lg:col-span-2">
                <h6 className="font-semibold mb-6 text-2xl">Stay Updated</h6>
                <form className="space-y-4">
                  <div className="flex max-w-md">
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-l-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl"
                      placeholder="Nhập email của bạn"
                      style={{fontSize:"11px"}}
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-pink-600 text-white rounded-r-lg hover:bg-blue-700 transition duration-300 text-xl"
                    >
                      Gửi
                    </button>
                  </div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-xl text-gray-600 text-xl">
                      Tôi đồng ý với các điều khoản của chính sách dịch vụ và
                      quyền riêng tư
                    </span>
                  </label>
                </form>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t py-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-600 text-lg">
                  © 2024 TechStudent.Tất cả quyền được bảo lưu. lưu.
                </p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <Link href="#" className="text-gray-400 hover:text-blue-600">
                    <i className="fab fa-facebook-f"></i>
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-pink-600">
                    <i className="fab fa-instagram"></i>
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-blue-500">
                    <i className="fab fa-linkedin-in"></i>
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-red-600">
                    <i className="fab fa-youtube"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

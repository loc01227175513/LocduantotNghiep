"use client";
import React, { Fragment } from "react";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";

export default function Page({ children, id }) {
  return (
    <Fragment>
      <header className="sticky top-0 z-10 bg-gradient-to-r from-white to-blue-50 backdrop-blur-sm shadow-lg animate-float">
        <div className="container flex items-center justify-between px-6 py-4 mx-auto">
          <div className="flex items-center space-x-2">
            <Link 
              href="/page/lecturer-dashboard/quanlykhoahoc" 
              className="flex items-center text-gray-700 transition-all hover:text-[#32ADE6] group"
            >
              <i className="bi bi-arrow-left group-hover:-translate-x-3 group-hover:scale-110 transition-all duration-500 ease-bounce"></i>
              <span className="ml-2 text-base font-medium group-hover:translate-x-1 transition-all duration-500">Khóa học</span>
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Biên tập</span>
          </div>

          <h1 className="text-xl font-bold bg-gradient-to-r from-[#32ADE6] to-blue-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-default animate-gradient">
            Trang biên tập khóa học
          </h1>

          <div className="flex items-center space-x-5">
            <Link href={`/page/course-detail?id=${id}`} className="btn btn-link">
              <button className="px-4 py-2 rounded-lg border-2 border-[#32ADE6] text-[#32ADE6] bg-white hover:bg-[#32ADE6] hover:text-white transition-all duration-500 flex items-center space-x-2 shadow-sm hover:shadow-xl hover:-translate-y-1 group">
                <i className="bi bi-eye group-hover:scale-125 group-hover:rotate-12 transition-all duration-500"></i>
                <span>Xem trước</span>
              </button>
            </Link>

            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#32ADE6] to-blue-600 text-white transition-all duration-500 flex items-center space-x-2 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:bg-gradient-to-l group relative overflow-hidden">
              <i className="bi bi-save animate-bounce-subtle group-hover:animate-none group-hover:scale-125 group-hover:rotate-12 transition-all duration-500"></i>
              <span>Lưu</span>
              <div className="absolute inset-0 bg-white/20 group-hover:animate-ripple"></div>
            </button>

            <Menu as="div" className="relative">
              <Menu.Button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-all duration-500 group hover:shadow-lg hover:-translate-y-1">
                <i className="bi bi-gear text-xl group-hover:rotate-180 transition-all duration-700 ease-out hover:text-[#32ADE6] animate-spin-slow group-hover:animate-none"></i>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-300"
                enterFrom="transform opacity-0 scale-95 -translate-y-2"
                enterTo="transform opacity-100 scale-100 translate-y-0"
                leave="transition ease-in duration-200"
                leaveFrom="transform opacity-100 scale-100 translate-y-0"
                leaveTo="transform opacity-0 scale-95 -translate-y-2"
              >
                <Menu.Items className="absolute right-0 z-20 w-48 mt-2 bg-white border rounded-lg shadow-lg">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="#"
                        className={`block px-4 py-3 text-sm font-medium ${
                          active ? "bg-gray-50 text-[#32ADE6]" : "text-gray-700"
                        } transition-all duration-300 group hover:-translate-x-1`}
                      >
                        <i className="bi bi-sliders2 mr-2 group-hover:rotate-12 transition-all duration-300"></i>
                        Cài đặt
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {children}
      </main>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes ripple {
          to { transform: scale(4); opacity: 0; }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-ripple { animation: ripple 1s linear; }
        .animate-gradient { animation: gradient 3s ease infinite; }
        .animate-spin-slow { animation: spin 3s linear infinite; }
        .animate-bounce-subtle {
          animation: bounce 2s ease-in-out infinite;
        }
        .ease-bounce { transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55); }
      `}</style>
    </Fragment>
  );
}
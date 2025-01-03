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
              className="flex items-center text-gray-700 transition-all hover:text-pink-500 group"
            >
              <i className="bi bi-arrow-left group-hover:-translate-x-3 transition-all duration-500 ease-bounce"></i>
              <span className="ml-2 text-[14px] font-medium group-hover:translate-x-1 transition-all duration-500 ">Khóa học</span>
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 text-[14px]">Biên tập</span>
          </div>

          <h1 className="text-[16px] text-center font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-default animate-gradient">
            Trang biên tập khóa học
          </h1>

          <div className="flex items-center space-x-5">
            <Link href={`/page/course-detail?id=${id}`}>
              <button className="px-4 py-2 rounded-lg border-2 text-[14px] border-pink-500 text-pink-500 bg-white hover:bg-pink-500 hover:text-white transition-all duration-500 flex items-center space-x-2 shadow-sm hover:shadow-xl group">
                <i className="bi bi-eye group-hover:rotate-12 transition-all duration-500"></i>
                <span>Xem trước</span>
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="px-2 py-5  ">
        {children}
      </main>
    </Fragment>
  );
}
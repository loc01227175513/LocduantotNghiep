"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function CardProduct({
    id,
    hinh,
    ten,
    chude,
    giangvien,
    baihocs,
    dangky,
    gia,
    giamgia,
    averageRating,
    handleYeuThich,
    renderStars
}) {


  
    return (
        
        <div
            className="transition flash element-item creative"
            data-category="transition"
            key={id} // Use a unique key, preferably id
        >
            <div className="rts-single-course">
                <a
                    href={`/page/course-detail?id=${id}`}
                    className="thumbnail relative"
                >
                    <Image
                        width={500}
                        height={300}
                        src={hinh}
                        alt="course"
                        style={{ height: "170px" }}
                    />
                    {/* Free course badge */}
                    {(gia === 0 || giamgia === 0) && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-lg shadow-lg transform -rotate-12 z-10">
                            Miễn Phí
                        </div>
                    )}
                    {/* Discount badge - only show if course has discount but isn't free */}
                    {giamgia < gia && giamgia !== 0 && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-lg shadow-lg transform -rotate-12 z-10">
                            -{Math.round((1 - giamgia / gia) * 100)}% OFF
                        </div>
                    )}
                </a>
                <div
                    className="save-icon"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal-login"
                    onClick={() => handleYeuThich(id)}
                >
                    <i className="fa-sharp fa-light fa-bookmark text-lg" />
                </div>
                <div className="course-card">
                    <a
                        href={`/page/course-detail?id=${id}`}
                        className="title-link"
                    >
                        <p className="title" style={{ fontWeight: "600" }}>
                            {ten}
                        </p>
                    </a>
                    <div className="teacher">
                        <i className="bi bi-grid mr-2 text-gray-800 text-2xl"></i>
                        <span
                            className="text-xl text-gray-800"
                            style={{ fontWeight: "400" }}
                        >
                            {chude}
                        </span>
                    </div>

                    <p className="teacher">
                        <i
                            className="fas fa-user-tie mr-2 text-gray-800 text-xl"
                            style={{ fontWeight: "400" }}
                        ></i>
                        <span
                            className="text-xl text-gray-800"
                            style={{ fontWeight: "400" }}
                        >
                            {giangvien}
                        </span>
                    </p>
                    <div className="flex space-x-4 bg-gradient-to-r from-gray-50 to-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex items-center space-x-2 pr-2 pt-2 pb-2 rounded-full">
                            <i className="fa-light fa-calendar-lines-pen text-gray-600 text-lg" />
                            <div className="flex flex-col">
                                <span
                                    className="text-lg font-bold"
                                    style={{ fontWeight: "400" }}
                                >
                                    {baihocs}
                                    <span
                                        className="text-lg text-gray-600 uppercase tracking-wider pl-1"
                                        style={{ fontWeight: "400" }}
                                    >
                                        Bài
                                    </span>
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 p-2 rounded-full">
                            <i className="fa-light fa-user-group text-gray-600 text-xl" />
                            <div className="flex flex-col">
                                <span
                                    className="text-lg font-bold"
                                    style={{ fontWeight: "400" }}
                                >
                                    {dangky}
                                    <span
                                        className="text-lg text-gray-600 uppercase tracking-wider pl-1"
                                        style={{ fontWeight: "400" }}
                                    >
                                        Students
                                    </span>
                                </span>
                            </div>
                        </div>

                        <div className="rating-area text-yellow-500 text-lg flex items-center">
                            {renderStars(parseFloat(averageRating))}
                            <span
                                className="rating-number ml-1 text-xl"
                                style={{ fontWeight: "400" }}
                            >
                                {averageRating}
                            </span>
                        </div>
                    </div>
                    <div className="rating-and-price">
                        <div className="price-area">
                            {gia === 0 || giamgia === 0 ? (
                                <div></div>
                            ) : (
                                <div className="price-wrapper">
                                    <div className="sale-price">
                                        <p className="text-2xl font-bold">
                                            {giamgia}
                                            <span className="text-2xl">VNĐ</span>
                                        </p>
                                    </div>
                                    <div className="original-price">
                                        <p className=" text-2xl">
                                            {gia}
                                            <span className="text-2xl">VNĐ</span>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <style jsx>{`
            .course-card {
              padding: 1.5rem;
              transition: all 0.3s ease;
              border-radius: 12px;
              background: white;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            }

            .course-card:hover {
              transform: translateY(-4px);
              box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
            }

            .title-link {
              display: block;
            }

            .title {
              font-size: 1.1rem;
              font-weight: 600;
              color: #2d3748;
              transition: color 0.2s ease;
            }

            .title:hover {
              color: #4299e1;
            }

.rating-area {
  display: flex;
  align-items: center;
  background: #f7fafc;
  padding: 0.2rem 0.4rem;
  border-radius: 8px;
  max-width: 70px;
}
            .rating-number {
              font-weight: 600;
              color: #2d3748;
              margin-right: 0.5rem;
            }

            .stars {
              display: flex;
              color: #ecc94b;
            }

            .free-badge {
              background: -webkit-linear-gradient(
                315deg,
                #1e3c72 0%,
                #ff6b6b 100%
              );
              color: white;
              padding: 5px 20px;
              border-radius: 20px;
              font-weight: 500;
              animation: pulse 2s infinite;
            }

            .price-wrapper {
              display: flex;
              align-items: center;
              gap: 0.75rem;
            }

            .original-price {
              color: #a0aec0;
              text-decoration: line-through;
              font-size: 0.9rem;
            }

            .sale-price {
              color: #e53e3e;
              font-weight: 600;
              font-size: 1.1rem;
            }

            @keyframes pulse {
              0% {
                box-shadow: 0 0 0 0 rgba(11, 197, 234, 0.4);
              }
              70% {
                box-shadow: 0 0 0 10px rgba(11, 197, 234, 0);
              }
              100% {
                box-shadow: 0 0 0 0 rgba(11, 197, 234, 0);
              }
            }
          `}</style>
                </div>
            </div>
        </div>
    );
}
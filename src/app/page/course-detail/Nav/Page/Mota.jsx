"use client";
import React, { useEffect, useState } from "react";
import { CourseDetails } from "../../../../../service/course/course.service";
import Link from "next/link";
import { FaStar, FaRegStar, FaCheck, FaBookmark, FaCalendar, FaUsers } from 'react-icons/fa';
import Image from 'next/image';
import { KhoaHocYeuThich } from "../../../../../service/YeuThich/YeuThich";
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideIn {
    from { transform: translateX(-20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  .course-card {
    transition: all 0.3s ease;
  }

  .course-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }

  .animate-fade-in {
    animation: fadeIn 0.6s ease-out forwards;
  }

  .animate-slide-in {
    animation: slideIn 0.4s ease-out forwards;
  }

  .objective-item {
    animation: slideIn 0.4s ease-out forwards;
    animation-delay: calc(var(--item-index) * 100ms);
    opacity: 0;
  }

  .course-image {
    transition: transform 0.3s ease;
  }

  .course-card:hover .course-image {
    transform: scale(1.05);
  }

  .bookmark-icon {
    transition: all 0.2s ease;
  }

  .bookmark-icon:hover {
    transform: scale(1.2);
  }

  @keyframes iconColorChange {
    0% { color: #3B82F6; }
    33% { color: #10B981; }
    66% { color: #F59E0B; }
    100% { color: #3B82F6; }
  }

  @keyframes iconPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }

  .animated-icon {
    animation: iconColorChange 6s infinite;
    transition: transform 0.3s ease;
  }

  .animated-icon:hover {
    animation: iconPulse 0.5s ease;
  }

  .star-icon {
    transition: color 0.3s ease, transform 0.2s ease;
  }
  
  .star-icon:hover {
    transform: scale(1.2);
    color: #FBBF24;
  }
`;

export default function Mota({ course }) {
  console.log(course);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const handleYeuThich = async (id) => {
    try {
      const response = await KhoaHocYeuThich(id);
      console.log(response);
      toast.success("Added to favorites!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error adding to favorites!");
    }
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const splitDescription = (description) => {
    if (!description) return [];
    const sections = description
      .split(".")
      .map((section) => section.trim())
      .filter((section) => section.length > 0);
    return sections.map((section) => capitalizeFirstLetter(section));
  };

  let descriptionSections;

  try {
    const rawDescription = course?.mota;
    descriptionSections = splitDescription(rawDescription);

    if (typeof descriptionSections === 'string') {
      descriptionSections = JSON.parse(descriptionSections);
    }
  } catch (error) {
    console.error("Error processing description:", error);
    descriptionSections = [];
  }

  let muctieu;
  try {
    muctieu = JSON.parse(course?.muctieu);
  } catch (error) {
    console.error("Error parsing muctieu:", error);
    muctieu = [];
  }

  if (!Array.isArray(muctieu)) {
    muctieu = [];
  }

  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= filledStars ? (
          <FaStar key={i} className="text-yellow-400 w-5 h-5 star-icon" aria-label="Filled Star" />
        ) : (
          <FaRegStar key={i} className="text-gray-300 w-5 h-5 star-icon" aria-label="Empty Star" />
        )
      );
    }
    return stars;
  };

  console.log(course, "course");

  return (
    <>
      <style>{styles}</style>
      <div className={`course-description ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="tab-content mt-12" id="myTabContent">
          <div className="tab-pane fade show active p-6 bg-white rounded-lg shadow-sm">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">Về khóa học</h4>

            <div className="description-section space-y-4">
              {descriptionSections.map((section, index) => (
                <p key={index} className="text-gray-700 leading-relaxed animate-slide-in"
                  style={{ animationDelay: `${index * 100}ms` }}>
                  {section}.
                </p>
              ))}
            </div>

            <div className="objectives-section mt-8">
              <h5 className="text-2xl text-gray-800 mb-4">
                Bạn sẽ học được gì?
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {muctieu.filter(item => item !== "").map((item, index) => (
                  <div key={index}
                    className="objective-item flex items-center p-3 bg-green-50 rounded-lg"
                    style={{ '--item-index': index }}>
                    <FaCheck className="text-green-500 mr-3 animated-icon" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="related-courses mt-12">
          <div className="flex justify-between items-center mb-6 px-4 sm:px-0">
            <h4 className="text-2xl font-bold text-gray-800">
              Khóa học khác từ: {course.thongtingiangvien.ten}
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-0">
            {course.Tongkhoahoc.map((item, index) => {
              const averageRating = item.danhgia?.length > 0
                ? item.danhgia.reduce((acc, rating) => acc + parseInt(rating.danhgia, 10), 0) / item.danhgia.length
                : 0;

              return (
                <div key={item.id}
                  className="course-card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl"
                  style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="relative overflow-hidden">
                    <Image
                      width={500}
                      height={500}
                      src={item.hinh}
                      alt={item.ten}
                      className="course-image w-full  object-cover"
                      style={{height: '180px'}}
                    />

                    <div className="absolute top-4 right-4 flex items-center space-x-2">
                      {item.gia === 0 ? (
                        <span className="px-3 py-1 bg-red-500 text-white text-xl font-medium rounded-full">
                          Miễn phí
                        </span>
                      ) : item.giamgia > 0 ? (
                        <span className="px-3 py-1 bg-red-500 text-white text-xl font-medium rounded-full">
                          -{Math.round(((item.gia - item.giamgia) / item.gia) * 100)}%
                        </span>
                      ) : null}

                      <button
                        className="bookmark-icon flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        aria-label="Bookmark"
                        onClick={() => handleYeuThich(item.id)}
                      >
                        <FaBookmark className="text-blue-500 w-5 h-5 animated-icon" />
                      </button>
                    </div>
                  </div>

                  <div className="p-5 course-card">
                  <a
                            href={`/page/course-detail?id=${item.id}`}
                            className="title-link"
                          >
                            <p className="title text-3xl font-bold">{item.ten}</p>
                          </a>
                    <div className="teacher">
                    <i class="bi bi-grid mr-2 text-gray-800 text-2xl"></i>
                      <span className="text-xl text-gray-800">
                       <strong> {item.chude.ten}</strong>
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xl text-gray-600 mb-3 mt-3">
                      <span className="flex items-center text-xl">
                        <FaCalendar className="mr-2" />
                        {item.baihocs.length} Bài học
                      </span>
                      <span className="flex items-center text-xl">
                        <FaUsers className="mr-2 " />
                        {course.thanhToan.length} Học viên
                      </span>
                      <div className="rating-area text-yellow-500 text-2xl flex flex-row align-items-center">
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 576 512"
                                class="text-yellow-400 w-5 h-5"
                                aria-label="Filled Star"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
                              </svg>
                              <span className="rating-number ml-2">
                                {averageRating.toFixed(1)}
                              </span>
                            </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="text-2xl font-bold text-red-600">
                        {item.gia === 0 || item.giamgia === 0 ? 'Miễn phí' : `$${item.giamgia}`}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
"use client";
import React, { useEffect, useState } from "react";
import { CourseDetails } from "../../../../../service/course/course.service";
import Link from "next/link";
import {
  FaStar,
  FaRegStar,
  FaCheck,
  FaBookmark,
  FaCalendar,
  FaUsers,
} from "react-icons/fa";
import Image from "next/image";
import { KhoaHocYeuThich } from "../../../../../service/YeuThich/YeuThich";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      if (response) {
        toast.success('Đã thêm vào danh sách yêu thích!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error('Có lỗi xảy ra khi thêm vào yêu thích!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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

    if (typeof descriptionSections === "string") {
      descriptionSections = JSON.parse(descriptionSections);
    }
  } catch (error) {
    console.error("Error processing description:", error);
    descriptionSections = [];
  }
  let muctieu = [];
  try {
    if (course?.muctieu) {
      const parsedMuctieu = JSON.parse(course.muctieu);
      muctieu = Array.isArray(parsedMuctieu) ? parsedMuctieu : [];
    }
  } catch (error) {
    console.error("Error parsing muctieu:", error.message);
  }

  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= filledStars ? (
          <FaStar
            key={i}
            className="text-yellow-400 w-5 h-5 star-icon"
            aria-label="Filled Star"
          />
        ) : (
          <FaRegStar
            key={i}
            className="text-gray-300 w-5 h-5 star-icon"
            aria-label="Empty Star"
          />
        )
      );
    }
    return stars;
  };

  console.log(course, "course");

  return (
    <>
      <style>{styles}</style>
      <div
        className={`course-description ${isLoaded ? "animate-fade-in" : "opacity-0"
          }`}
      >
        <div className="tab-content mt-12" id="myTabContent">
          <div className="tab-pane fade show active p-6 bg-white rounded-lg shadow-sm">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">
              Về khóa học
            </h4>

            <div className="description-section space-y-4">
              {descriptionSections.map((section, index) => (
                <p
                  key={index}
                  className="text-gray-700 leading-relaxed animate-slide-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {section}.
                </p>
              ))}
            </div>

            <div className="objectives-section mt-8">
              <h5 className="text-2xl text-gray-800 mb-4">
                Bạn sẽ học được gì?
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {muctieu
                  .filter((item) => item !== "")
                  .map((item, index) => (
                    <div
                      key={index}
                      className="objective-item flex items-center p-3 bg-green-50 rounded-lg"
                      style={{ "--item-index": index }}
                    >
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
              const averageRating =
                item.danhgia?.length > 0
                  ? item.danhgia.reduce(
                    (acc, rating) => acc + parseInt(rating.danhgia, 10),
                    0
                  ) / item.danhgia.length
                  : 0;

              return (
                <div
                  className="transition flash element-item creative"
                  data-category="transition"
                  key={item.id} // Use a unique key, preferably item.id
                >
                  <div className="rts-single-course">
                    <Link href={`/page/course-detail?id=${item.id}`} className="thumbnail relative">
                      <Image
                        width={500}
                        height={300}
                        src={item.hinh || '/images/placeholder-course.jpg'}
                        alt={`Course: ${item.ten}`}
                        style={{ height: "170px", objectFit: "cover" }}
                        priority={index < 3}
                      />
                      {/* Free course badge */}
                      {(item.gia === 0 || item.giamgia === 0) && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-lg shadow-lg transform -rotate-12 z-10">
                          Miễn Phí
                        </div>
                      )}
                      {/* Discount badge - only show if course has discount but isn't free */}
                      {item.giamgia < item.gia && item.giamgia !== 0 && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-lg shadow-lg transform -rotate-12 z-10">
                          -{Math.round((1 - item.giamgia / item.gia) * 100)}% OFF
                        </div>
                      )}
                    </Link>

                    <div
                      className="save-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal-login"
                      onClick={() => handleYeuThich(item.id)}
                    >
                      <i className="fa-sharp fa-light fa-bookmark text-lg" />
                    </div>
                    <div className="course-card p-4 bg-white rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg">
                      <Link href={`/page/course-detail?id=${item.id}`} className="title-link">
                        <p
                          className="title text-2xl font-semibold text-gray-800 hover:text-blue-600 truncate whitespace-nowrap overflow-hidden"
                          title={item.ten} // This adds native browser tooltip on hover
                        >
                          {item.ten}
                        </p>
                      </Link>
                      <div className="teacher flex items-center mt-2">
                        <span className="text-lg text-gray-700" style={{ fontWeight: 'normal' }}>
                          <strong>{item.chude.ten}</strong>
                        </span>
                      </div>
                      <div className="flex space-x-4 bg-gradient-to-r from-gray-50 to-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex items-center space-x-2 pr-2 pt-2 pb-2 rounded-full">
                          <i className="fa-light fa-calendar-lines-pen text-gray-600 text-lg" />
                          <div className="flex flex-col">
                            <span
                              className="text-lg font-bold"
                              style={{ fontWeight: "400" }}
                            >
                              {item.baihocs.length}
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
                              {course.thanhToan.length}
                              <span
                                className="text-lg text-gray-600 uppercase tracking-wider pl-1"
                                style={{ fontWeight: "400" }}
                              >
                                Học viên
                              </span>
                            </span>
                          </div>
                        </div>

                        <div className="rating-area  text-lg flex p-2 flex-row">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 576 512"
                            className="text-yellow-400 w-5 h-5"
                            aria-label="Filled Star"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path className="text-yellow-500" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
                          </svg>
                          <span
                            className="rating-number ml-1 text-xl"
                            style={{ fontWeight: "400" }}
                          >
                            {averageRating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div className="price-area">
                          {item.gia === 0 || item.giamgia === 0 ? (
                            <div className="price-wrapper">

                              <div className="original-price">
                                <p className=" text-2xl text-red-500 font-bold">
                                  0
                                  <span className="text-2xl">VNĐ</span>
                                </p>
                              </div>
                            </div>
                          ) : (
                            <><div className="price-wrapper">
                              <div className="sale-price">
                                <p className="text-2xl font-bold">
                                  {item.giamgia.toLocaleString('vi-VN')}
                                  <span className="text-2xl">VNĐ</span>
                                </p>
                              </div>
                              <div className="original-price">
                                <p className=" text-2xl">
                                  {item.gia.toLocaleString('vi-VN')}
                                  <span className="text-2xl">VNĐ</span>
                                </p>
                              </div>
                            </div><style jsx>{`
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
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                          }
            
                          .course-card:hover .title {
                            white-space: normal;
                          }
            
                          .title:hover {
                            color: #4299e1;
                          }
            
                          .rating-area {
                            display: flex;
                            align-items: center;
                            background: #f7fafc;
                            padding: 0.5rem;
                            border-radius: 8px;
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
                          `}</style></>
                          )}
                        </div>
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

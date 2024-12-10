"use client";

import Link from "next/link";
import { KhoaHocYeuThich } from "../../../../service/YeuThich/YeuThich";
import CardProduct from "@/app/component/CardProductHome/CardProduct";
import Image from 'next/image';
import { FaStar, FaRegStar } from "react-icons/fa";
import { calc } from "@chakra-ui/react";


const Grid = ({ courses }) => {

  const DanhGiaTrungBinh = (danhgia) => {
    let sum = 0;
    for (let i = 0; i < danhgia.length; i++) {
      sum += parseFloat(danhgia[i].danhgia);
    }
    return sum / danhgia.length;
  }

  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= filledStars ? (
          <FaStar
            key={i}
            className="text-yellow-400 w-5 h-5"
            aria-label="Filled Star"
          />
        ) : (
          <FaRegStar
            key={i}
            className="text-gray-300 w-5 h-5"
            aria-label="Empty Star"
          />
        )
      );
    }
    return stars;
  };

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

  return (
    <div className="flex flex-wrap flex-row justify-start items-start gap-5">
      {courses.map((course) => {
        const averageRating =
          course.danhgia && course.danhgia.length > 0
            ? DanhGiaTrungBinh(course.danhgia)
            : 0;
        return (

          <div key={course.id} style={{width: "210px", marginBottom:"-105px"}}>
            <CardProduct
              id={course.id}
              hinh={course.hinh}
              ten={course.ten}
              chude={course.chude}
              giangvien={course.giangvien}
              baihocs={course.baihocs}
              dangky={course.dangky}
              gia={course.gia}
              giamgia={course.giamgia}
              averageRating={averageRating}
              handleYeuThich={handleYeuThich}
              renderStars={renderStars}
            />
          </div>
        );
      })}
    </div>
  );
}

const List = ({ courses }) => {
  const DanhGiaTrungBinh = (danhgia) => {
    if (danhgia.length === 0) return 0;
    let sum = 0;
    for (let i = 0; i < danhgia.length; i++) {
      sum += parseFloat(danhgia[i].danhgia);
    }
    return sum / danhgia.length;
  }

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

  return (
    <div className="mx-auto px-4">
      <div className="space-y-8">
        {courses.map((course) => (
          <div className="relative" key={course.id}>
            <Link href={`/page/course-detail?id=${course.id}`}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="relative w-full md:w-1/3">
                    <Image
                      fill
                      className="object-cover rounded-lg"
                      src={course.hinh}
                      alt={course.ten}
                    />
                    {course.gia === 0 ? (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white rounded-full text-[12px] font-bold transform -rotate-12 translate-x-1 translate-y-1">
                        Miễn Phí
                      </div>
                    ) : course.giamgia > 0 ? (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-[12px] font-bold transform -rotate-12 translate-x-1 translate-y-1">
                        -{Math.round(((course.gia - course.giamgia) / course.gia) * 100)}%
                      </div>
                    ) : null}
                  </div>

                  {/* Content Section */}
                  <div className="p-4 flex-1">
                    <div className="flex justify-between items-start">
                      <h2 className="text-2xl md:text-3xl text-gray-900 font-semibold">
                        {course.ten}
                      </h2>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleYeuThich(course.id);
                        }}
                        className="p-2 w-14 h-14 border-1 border-white bg-gray-200 hover:bg-pink-500 rounded-full transition-colors"
                      >
                        <i className="fa-regular fa-bookmark text-xl text-white" />
                      </button>
                    </div>

                    <p className="text-gray-600 text-[14px] font-thin mt-2">
                      <i className="far fa-user-tie mr-2 text-black text-[14px]" style={{ fontWeight: "400" }}></i>
                      {course.giangvien}
                    </p>

                    <div className="flex items-center text-black text-[14px]  my-2">
                      <i className="fa-light fa-calendar-lines-pen mr-2 text-[12px]" />
                      <span>{course.baihocs} Bài</span>
                    </div>
                    <div className="flex items-center text-black text-[14px]  my-2">
                      <i className="fa-light fa-user-group mr-2 text-[12px]" />
                      <span>{course.dangky} Học viên</span>
                    </div>

                    <div className="flex items-center text-black text-[14px] font-extralight my-2">
                      <i className="bi bi-grid mr-2 text-gray-800 text-[12px] "></i>
                      <span>{course.chude}</span>
                    </div>

                    <div className="flex justify-between items-center mt-4 text-14px">
                      <div className="flex items-center gap-2 text-lg">
                        <span className="font-bold text-gray-900">
                          {DanhGiaTrungBinh(course.danhgia)}
                        </span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`fa-solid fa-star ${i < DanhGiaTrungBinh(course.danhgia)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                                }`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="text-right">
                        {course.gia === 0 ? (
                          <div></div>
                        ) : course.giamgia > 0 ? (
                          <div className="flex items-center gap-2">
                            <span className="text-[14px] font-bold text-red-600">
                              {course.giamgia.toLocaleString()} VNĐ
                            </span>
                            <span className="text-gray-500 text-[14px]  line-through">
                              {course.gia.toLocaleString()} VNĐ
                            </span>

                          </div>
                        ) : (
                          <span className="font-bold text-black text-[14px]">
                            {course.gia.toLocaleString()} VNĐ
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export { Grid, List };
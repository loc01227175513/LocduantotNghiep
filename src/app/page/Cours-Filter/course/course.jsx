"use client";

import Link from "next/link";
import { KhoaHocYeuThich } from "../../../../service/YeuThich/YeuThich";

import Image from 'next/image';
const Grid = ({ courses }) => {

  const DanhGiaTrungBinh = (danhgia) => {
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
    <div className="row my-10">
      {courses.map((course) => (

        <div className="col-lg-4 col-md-6 col-sm-12 col-12" key={course.id}>
          <Link href={`/page/course-detail?id=${course.id}`} key={course.id}>
            <div className="rts-single-course">
              <div className="relative">
                <a href="single-course.html ">
                  <Image width={500} height={300} src={course.hinh} className="w-full h-[150px] rounded-md" alt="course" />
                  <div className="absolute top-0 m-3">
                    {course.gia === 0 ? (
                      <div className="free-badge bg-red-700 text-white p-1 text-xl rounded-md">Miễn Phí</div>
                    ) : course.giamgia > 0 ? (
                      <div className="discount-badge bg-red-700 text-white p-1 text-xl rounded-md">
                        -{Math.round(((course.gia - course.giamgia) / course.gia) * 100)}%
                      </div>
                    ) : null}
                  </div>

                </a>
                <div className=" " data-bs-toggle="modal" data-bs-target="#exampleModal-login">
                  <div
                    className="save-icon "
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal-login"
                    onClick={(event) => {
                      event.preventDefault();
                      handleYeuThich(course.id);
                    }}
                  >
                    <i className="fa-sharp fa-light fa-bookmark absolute top-0 right-0 my-3 " />
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute right-0 ">
                  <div className="single-tag bg-gradient-to-r p-2 texl-xl rounded-md text-white from-[#1e3c72] to-[#ff6b6b]">
                    <span >{course.chude}</span>
                  </div>
                </div>
                <div className="lesson-studente text-xl p-2">
                  <div className="">

                    <span className="font-bold text-xl ">
                      <i className="fa-light fa-calendar-lines-pen pe-2 font-bold" />
                      {course.baihocs} Bài học
                    </span>
                  </div>
                  <div className="">
                    <i className="fa-light fa-user-group font-bold pe-2" />
                    <span className="font-bold text-xl ">{course.dangky} Sinh viên</span>
                  </div>
                </div>
              </div>

              <a href="single-course.html">
                <h5 className="title">
                  <span className=" text-2xl">{course.ten}</span>
                </h5>
              </a>
              <p className="teacher ">{course.giangvien}</p>
              <div className="rating-and-price">
                <div className="rating-area">
                  <span>{DanhGiaTrungBinh(course.danhgia).toFixed(1)}</span>
                  <div className="stars">
                    <ul>
                      <ul>
                        {[...Array(5)].map((_, i) => (
                          <li key={i}>
                            <i className={`fa-sharp fa-solid fa-star${i < (isNaN(DanhGiaTrungBinh(course.danhgia)) || DanhGiaTrungBinh(course.danhgia) === "NaN" ? 0 : DanhGiaTrungBinh(course.danhgia)) ? ' text-warning' : '-o'}`} />
                          </li>
                        ))}
                      </ul>
                    </ul>
                  </div>
                </div>
                <div className="price-area">
                  {(course.gia === 0 && course.giamgia === 0) ? (
                    <div className="price ">
                      <span className="text-[#ff6b6b] font-bold">Miễn phí
                      </span> </div>
                  ) : (
                    <>
                      <div className="not price texl-2xl">
                        <span className="font-bold">${course.gia}</span>
                      </div>
                      <div className="price texl-2xl">
                        <span className="text-[#ff6b6b] font-bold">${course.giamgia}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Link>
        </div>

      ))}
    </div>
  );
}

const List = ({ courses }) => {

  const DanhGiaTrungBinh = (danhgia) => {
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
    <div className="container mx-auto py-12 px-4">
      <div className="space-y-6">
        {courses.map((course) => (
          <div className="w-full" key={course.id}>
            <Link href={`/page/course-detail?id=${course.id}`}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="relative w-full md:w-[300px] h-[200px]">
                    <Image
                      fill
                      className="object-cover rounded-lg "
                      src={course.hinh}
                      alt={course.ten}
                    />
                    {course.gia === 0 ? (
                      <div className="absolute top-4 left-4 py-2 bg-red-500 text-white px-3  rounded-md text-sm font-medium">
                        Miễn Phí
                      </div>
                    ) : course.giamgia > 0 ? (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-medium">
                        -{Math.round(((course.gia - course.giamgia) / course.gia) * 100)}%
                      </div>
                    ) : null}
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 ms-5 relative">
                    <div className="flex justify-between items-start">
                      <h2 className="text-2xl font-bold text-gray-900 ">
                        {course.ten}
                      </h2>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleYeuThich(course.id);
                        }}
                        className="p-2 w-12 bg-zinc-400 hover:bg-[#eeaaaa] rounded-full transition-colors"
                      >
                        <i className="fa-regular fa-bookmark text-xl text-white  " />
                      </button>
                    </div>

                    <p className="text-gray-600 mb-4 text-xl font-semibold">
                      Giảng viên: {course.giangvien}
                    </p>


                    <div className="flex items-center text-gray-600 text-xl font-bold my-3">
                      <i className="fa-light fa-calendar-lines-pen mr-2 font-bold" />
                      <span>{course.baihocs} Bài học</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-xl font-bold my-3">
                      <i className="fa-light fa-user-group mr-2 font-bold" />
                      <span>{course.dangky} Học viên</span>
                    </div>
                    <span className="bg-gradient-to-r from-[#1e3c72] to-[#ff6b6b] text-white absolute top-44 my-3 p-2 rounded-lg  text-sm ">
                      {course.chude}
                    </span>


                    <div className="flex justify-between items-center my-32">
                      <div className="flex items-center gap-2 text-2xl">
                        <span className=" font-bold ">
                          {DanhGiaTrungBinh(course.danhgia).toFixed(1)}
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
                        {course.gia === 0 && course.giamgia === 0 ? (
                          <span className="text-2xl font-bold text-red-600">
                            Miễn phí
                          </span>
                        ) : (
                          <div className="flex items-center gap-2 ">
                            <span className="text-gray-500 text-2xl font-bold line-through">
                              ${course.gia}
                            </span>
                            <span className="text-2xl font-bold text-red-600">
                              ${course.giamgia}
                            </span>
                          </div>
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
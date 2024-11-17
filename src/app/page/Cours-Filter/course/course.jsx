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
        <div className="row">
            {courses.map((course) => (

                <div className="col-lg-4 col-md-6 col-sm-12 col-12" key={course.id}>
                    <Link href={`/page/course-detail?id=${course.id}`} key={course.id}>
                        <div className="rts-single-course">
                            <a href="single-course.html" className="thumbnail">
                                <Image width={500} height={300}    src={course.hinh} alt="course" />
                            </a>
                            <div className="save-icon" data-bs-toggle="modal" data-bs-target="#exampleModal-login">
                            <div
                                className="save-icon"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal-login"
                                onClick={(event) => {
                                    event.preventDefault();
                                    handleYeuThich(course.id);
                                }}
                            >
                                <i className="fa-sharp fa-light fa-bookmark" />
                            </div>
                            </div>
                            <div className="tags-area-wrapper">
                                <div className="single-tag">
                                    <span>{course.chude}</span>
                                </div>
                            </div>
                            <div className="lesson-studente">
                                <div className="lesson">
                                    <i className="fa-light fa-calendar-lines-pen" />
                                    <span>{course.baihocs} Lessons</span>
                                </div>
                                <div className="lesson">
                                    <i className="fa-light fa-user-group" />
                                    <span>{course.dangky} Students</span>
                                </div>
                            </div>
                            <a href="single-course.html">
                                <h5 className="title">{course.ten}</h5>
                            </a>
                            <p className="teacher">{course.giangvien}</p>
                            <div className="rating-and-price">
                                <div className="rating-area">
                                    <span>{DanhGiaTrungBinh(course.danhgia).toFixed(1)}</span>
                                    <div className="stars">
                                        <ul>
                                            {[...Array(5)].map((_, i) => (
                                                <li key={i}>
                                                    <i className={`fa-sharp fa-solid fa-star${i < DanhGiaTrungBinh(course.danhgia) ? ' text-warning' : '-o'}`} />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="price-area">
                                    {(course.gia === 0 && course.giamgia === 0) ? (
                                        <div className="price">Miễn phí</div>
                                    ) : (
                                        <>
                                            <div className="not price">
                                                ${course.gia}
                                            </div>
                                            <div className="price">
                                                ${course.giamgia}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

            ))}
            {/* Repeat the above block for more courses */}
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

    return (
        <div className="row">
            {courses.map((course) => (

                <div className="col-12" key={course.id}>
                    <Link href={`/page/course-detail?id=${course.id}`} key={course.id}>
                        <div className="rts-single-course">
                            <a href="single-course.html" >
                                <Image width={500} height={300}    src={course.hinh} className="w-80" alt="course" />
                            </a>
                            <div className="save-icon" data-bs-toggle="modal" data-bs-target="#exampleModal-login">
                            <div
                                className="save-icon"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal-login"
                                onClick={(event) => {
                                    event.preventDefault();
                                    handleYeuThich(course.id);
                                }}
                            >
                                <i className="fa-sharp fa-light fa-bookmark" />
                            </div>
                            </div>
                            <div className="tags-area-wrapper">
                                <div className="single-tag">
                                    <span>{course.chude}</span>
                                </div>
                            </div>
                            <div className="lesson-studente">
                                <div className="lesson">
                                    <i className="fa-light fa-calendar-lines-pen" />
                                    <span>{course.baihocs} Lessons</span>
                                </div>
                                <div className="lesson">
                                    <i className="fa-light fa-user-group" />
                                    <span>{course.dangky} Students</span>
                                </div>
                            </div>
                            <a href="single-course.html">
                                <h5 className="title">{course.ten}</h5>
                            </a>
                            <p className="teacher">{course.giangvien}</p>
                            <div className="rating-and-price">
                                <div className="rating-area">
                                    <span>{DanhGiaTrungBinh(course.danhgia).toFixed(1)}</span>
                                    <div className="stars">
                                        <ul>
                                            {[...Array(5)].map((_, i) => (
                                                <li key={i}>
                                                    <i className={`fa-sharp fa-solid fa-star${i < DanhGiaTrungBinh(course.danhgia) ? ' text-warning' : '-o'}`} />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="price-area">
                                    {(course.gia === 0 && course.giamgia === 0) ? (
                                        <div className="price">Miễn phí</div>
                                    ) : (
                                        <>
                                            <div className="not price">
                                                ${course.gia}
                                            </div>
                                            <div className="price">
                                                ${course.giamgia}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

            ))}
            {/* Repeat the above block for more courses */}
        </div>
    );
}

export { Grid, List };
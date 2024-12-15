"use client"
import React, { useState, useEffect } from 'react'
import { GiangvienKhoaHoc } from "../../../../service/Dashboard-lecture/Dashboard-lecture";
import Image from 'next/image';
export default function Danhgia() {
    const [khoahocdanghoc1, setKhoahocdanghoc] = useState([]);
    useEffect(() => {
        GiangvienKhoaHoc()
            .then((res) => {
                setKhoahocdanghoc(res.data || []);
            })
            .catch((error) => {
                console.error("Error fetching dashboard data:", error);
            });
    }, []);
    // console.log(khoahocdanghoc1, "khoahocdanghoc1");
    return (
        <>


            <div className="card rounded-3 shadow-sm">

                <div
                    className="rts-reviewd-area-dashed table-responsive"
                    style={{ whiteSpace: "nowrap" }}
                >
                    <h5 className="title text-[20px] mb-[20px]">Reviews</h5>
                    <table className="table-reviews">
                        <thead>
                            <tr>
                                <th style={{ width: "30%" }} className='text-[14px]'>Học viên</th>
                                <th style={{ width: "30%" }} className='text-[14px]'>Ngày đánh giá</th>
                                <th className='text-[14px]'>Nội dung đánh giá</th>
                                <th className='text-[14px]'>Khoá học</th>

                            </tr>
                        </thead>
                        <tbody className="">
                            {khoahocdanghoc1.map((course) => (
                                course.danhgia.map((review) => (
                                    <tr key={review.id}>
                                        <td>
                                            <div className="author-area flex items-center gap-[10px] text-[14px]">
                                                <div className="profile-picture">
                                                    <Image src={review.avatar} alt="reviews" width={50} height={50} />
                                                </div>
                                                <p>{review.ten_nguoidung}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="date text-[14px]">{new Date(review.created_at).toLocaleDateString("vi-VN")}</span>
                                        </td>
                                        <td>
                                            <span className="name text-[14px]">
                                                {review.binhluan}
                                            </span>
                                            <div className="stars">
                                                {Array.from({ length: parseInt(review.danhgia) }).map((_, index) => (
                                                    <i key={index} className="fa-solid fa-star-sharp" />
                                                ))}
                                                {review.danhgia % 1 !== 0 && <i className="fa-solid fa-star-sharp-half" />}
                                                <span>({review.danhgia} Review)</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="name text-[14px]">
                                                {course.ten}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ))}

                        </tbody>
                    </table>
                </div>

            </div>

        </>
    )
}

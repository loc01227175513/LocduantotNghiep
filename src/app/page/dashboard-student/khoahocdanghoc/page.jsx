"use client"
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { KhoaHocDangHoc } from "../../../../service/dashbordStuden/Dashboard-service";
import { Dashboard } from "../../../../service/dashbordStuden/Dashboard-service";
import { KhoaHocDaHoc } from "../../../../service/dashbordStuden/Dashboard-service";
import Link from "next/link";
import Image from 'next/image';

export default function Khoahoccuatoi() {
  const [page, setPage] = useState(1);
  const [khoahocdanghoc1, setKhoahocdanghoc] = useState([]);
  const [data, setData] = useState([]);
  const [khoahocdahoc, setKhoahocdahoc] = useState([]);

  useEffect(() => {
    KhoaHocDangHoc()
      .then((res) => {
        setKhoahocdanghoc(res.data);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
    Dashboard()
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });

    KhoaHocDaHoc()
      .then((res) => {
        setKhoahocdahoc(res.data);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);



  const khoahocdanghoc = () => {
    setPage(1);
  }
  const khoahocdathanhtoan = () => {
    setPage(2)
  }
  const khoahocdahoanthanh = () => {
    setPage(3)
  }
  return (
    <>
       <div className="overflow-y-scroll col-lg-9 h-lvh">
      <div className="exrolled-course-wrapper-dashed">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
  
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Khóa học của tôi
          </h3>
          
          <div className="flex space-x-2 border-b border-gray-200">
            <button
              className={`px-6 py-3 transition-all duration-300 ${
                page === 1
                  ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => khoahocdanghoc()}
            >
              <i className="fas fa-book-reader mr-2"></i>
              Khóa học đang học
            </button>
            
            <button
              className={`px-6 py-3 transition-all duration-300 ${
                page === 2
                  ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => khoahocdathanhtoan()}
            >
              <i className="fas fa-credit-card mr-2"></i>
              Khóa học đã thanh toán
            </button>
            
            <button
              className={`px-6 py-3 transition-all duration-300 ${
                page === 3
                  ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => khoahocdahoanthanh()}
            >
              <i className="fas fa-check-circle mr-2"></i>
              Khóa học đã hoàn thành
            </button>
          </div>
          
        </ul>




        
        <div className="tab-content mt--30" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            {page == 1 && (
              <Khoahocdanghoc />
            )}
            {page == 2 && (
              <Khoahocdathanhtoan />
            )}
            {page == 3 && (
              <Khoahocdahoanthanh />
            )}
          </div>
        </div>
      </div>
    </div>
    <style jsx>{`@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}`}</style>
    </>
 

  )
}



const Khoahocdanghoc = () => {
  const router = useRouter();
  const [khoahocdanghoc1, setKhoahocdanghoc] = useState([]);

  useEffect(() => {
    KhoaHocDangHoc()
      .then((res) => {
        setKhoahocdanghoc(res);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);
  console.log(khoahocdanghoc1);


  const tieptuchoc = () => {
    router.push("/page/lesson")
  }
  return (
    <div className="row g-5">
      {khoahocdanghoc1
        .map((item) => (
          <div key={item.id} className="col-lg-4 col-md-6 col-sm-12 col-12">
            <Link href={`/page/Study?id=${item.id}`}>

              <div className="single-course-style-three enroll-course">
                <a href="single-course.html" className="thumbnail">
                  <Image width={500} height={300} src={item.hinh} alt="course" />
                  <div className="tag-thumb">
                    <span>{item.chude}</span>
                  </div>
                </a>
                <div className="body-area">
                  <div className="course-top">
                    <div className="tags">Người bán tốt nhất</div>
                    <div className="flex items-center">
                      <div className="text-lg font-bold text-blue-600">
                        {item.gia === 0 && item.giamgia === 0 ? 'Miễn phí' : `$${item.gia}`}
                      </div>
                      {item.gia !== 0 || item.giamgia !== 0 ? (
                        <div className="text-sm text-gray-500 line-through ml-2">
                          ${item.giamgia}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <a href="single-course.html">
                    <h5 className="title">
                      {item.ten}
                    </h5>
                  </a>
                  <div className="teacher-stars">
                    <div className="teacher">
                      <span>{item.giangvien}</span>
                    </div>
                    <ul className="stars">
                      {[1, 2, 3, 4, 5].map((_, index) => (
                        <li key={index} style={{ "--star-index": index }}>
                          <i className={`fa-sharp fa-${index < 4 ? 'solid' : 'regular'} fa-star`} />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="leasson-students">
                    <div className="lesson">
                      <i className="fa-light fa-calendar-lines-pen" />
                      <span> {item.baihoc1.length} Bài học</span>
                    </div>
                    <div className="students">
                      <i className="fa-light fa-users" />
                      <span>25 bài học</span>
                    </div>
                  </div>
                  <div className="progress-wrapper-lesson-compleate">
                    <div className="compleate">
                      <div className="compl">Hoàn thành</div>
                      <div className="end">
                        <span>{item.TongTongHoanthanhphantram}%</span>
                      </div>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar wow fadeInLeft bg--primary"
                        role="progressbar"
                        style={{ width: `${item.TongTongHoanthanhphantram}%` }}
                        aria-valuenow={item.TongTongHoanthanhphantram}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                  </div>
                  {item.TongTongHoanthanhphantram == 100 ? (
                    <button className="rts-btn btn-border">Tải xuống chứng chỉ</button>
                  ) : (

                    <button className="rts-btn btn-border" onClick={() => tieptuchoc()}>
                      Tiếp tục học
                    </button>

                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      <style jsx>{`
      @keyframes thumbnailHover {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(0,0,0,0.2);
  }
  100% {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }
}

.thumbnail {
  position: relative;
  display: block;
  overflow: hidden;
  transition: all 0.3s ease;
}

.thumbnail:hover {
  animation: thumbnailHover 0.3s forwards;
}

.thumbnail img {
  transition: all 0.3s ease;
}

.thumbnail:hover img {
  transform: scale(1.1);
}

.tag-thumb {
  position: absolute;
  bottom: 15px;
  left: 15px;
  transition: all 0.3s ease;
}

.thumbnail:hover .tag-thumb {
  transform: translateY(-5px);
}
      @keyframes cardFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes priceShake {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes starTwinkle {
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
}

@keyframes progressFill {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes buttonGlow {
  0% { box-shadow: 0 0 5px rgba(0,123,255,0.5); }
  50% { box-shadow: 0 0 20px rgba(0,123,255,0.8); }
  100% { box-shadow: 0 0 5px rgba(0,123,255,0.5); }
}

.body-area {
  transition: all 0.3s ease;
  
  &:hover {
    animation: cardFloat 2s ease-in-out infinite;
  }

  .text-lg {
    &:hover {
      animation: priceShake 0.5s ease-in-out;
    }
  }

  .stars li i {
    animation: starTwinkle 1.5s infinite;
    animation-delay: calc(0.3s * var(--star-index));
  }

  .progress-bar {
    animation: progressFill 1.5s ease-out forwards;
  }

  .rts-btn {
    transition: all 0.3s ease;
    
    &:hover {
      animation: buttonGlow 2s infinite;
      transform: scale(1.05);
    }
  }
}
      // First add these keyframes and styles to your CSS/SCSS file
@keyframes cardHover {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  }
}

@keyframes shimmer {
  0% {
    background-position: -500px 0;
  }
  100% {
    background-position: 500px 0;
  }
}

@keyframes progressPulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}

@keyframes starPop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

// Add these classes to your existing styles
.single-course-style-three {
  transition: all 0.3s ease;
  
  &:hover {
    animation: cardHover 0.3s forwards;
  }
  
  .thumbnail {
    position: relative;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      animation: shimmer 2s infinite;
    }
  }
  
  .progress-bar {
    animation: progressPulse 2s infinite;
  }
  
  .stars li i {
    transition: all 0.2s ease;
    
    &:hover {
      animation: starPop 0.3s forwards;
      color: gold;
    }
  }
}
  
      ` }</style>
    </div>
  )
}


const Khoahocdathanhtoan = () => {
  const router = useRouter();
  const [data, setData] = useState([]);


  useEffect(() => {

    Dashboard()
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });

  }, []);
  console.log(data);


  const tieptuchoc = () => {
    router.push("/page/lesson")
  }
  return (
    <div className="row g-5">
      {data.map((item, itemIndex) => (
        item.khoahocs.map((khoahoc, khoahocIndex) => (
          <div key={`${itemIndex}-${khoahocIndex}`} className="col-lg-4 col-md-6 col-sm-12 col-12">
            <Link href={`/page/Study?id=${item.id}`}>
              <div className="single-course-style-three enroll-course">
                <a href="single-course.html" className="thumbnail">
                  <Image width={500} height={300} src={khoahoc.hinh} alt="course" />
                  <div className="tag-thumb">
                    <span>{khoahoc.chuDe}</span>
                  </div>
                </a>
                <div className="body-area">
                  <div className="course-top">
                    <div className="tags">Bán tốt nhất</div>
                    <div className="price">
                      {khoahoc.gia === 0 && khoahoc.giamgia === 0 ? 'Miễn phí' : `$ ${khoahoc.gia}`}
                    </div>
                    <div className={khoahoc.gia === 0 && khoahoc.giamgia === 0 ? 'price' : 'line-through price'}>
                      {khoahoc.gia === 0 && khoahoc.giamgia === 0 ? '' : `$ ${khoahoc.giamgia}`}
                    </div>
                  </div>
                  <a href="single-course.html">
                    <h5 className="title">
                      {khoahoc.ten}
                    </h5>
                  </a>
                  <div className="teacher-stars">
                    <div className="teacher">
                      <span>{khoahoc.tenGiangVien}</span>
                    </div>
                    <ul className="stars">
                      <li className="span">4.5</li>
                      <li>
                        <i className="fa-sharp fa-solid fa-star" />
                      </li>
                      <li>
                        <i className="fa-sharp fa-solid fa-star" />
                      </li>
                      <li>
                        <i className="fa-sharp fa-solid fa-star" />
                      </li>
                      <li>
                        <i className="fa-sharp fa-solid fa-star" />
                      </li>
                      <li>
                        <i className="fa-sharp fa-regular fa-star" />
                      </li>
                    </ul>
                  </div>
                  <div className="leasson-students">
                    <div className="lesson">
                      <i className="fa-light fa-calendar-lines-pen" />
                      <span>25 Lessons</span>
                    </div>
                    <div className="students">
                      <i className="fa-light fa-users" />
                      <span>25 Lessons</span>
                    </div>
                  </div>

                  <button className="rts-btn btn-border" onClick={() => tieptuchoc()}>
                    Bắt đầu học
                  </button>

                </div>
              </div>
            </Link>
          </div>
        ))
      ))}
         <style jsx>{`
      @keyframes thumbnailHover {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(0,0,0,0.2);
  }
  100% {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }
}

.thumbnail {
  position: relative;
  display: block;
  overflow: hidden;
  transition: all 0.3s ease;
}

.thumbnail:hover {
  animation: thumbnailHover 0.3s forwards;
}

.thumbnail img {
  transition: all 0.3s ease;
}

.thumbnail:hover img {
  transform: scale(1.1);
}

.tag-thumb {
  position: absolute;
  bottom: 15px;
  left: 15px;
  transition: all 0.3s ease;
}

.thumbnail:hover .tag-thumb {
  transform: translateY(-5px);
}
      @keyframes cardFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes priceShake {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes starTwinkle {
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
}

@keyframes progressFill {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes buttonGlow {
  0% { box-shadow: 0 0 5px rgba(0,123,255,0.5); }
  50% { box-shadow: 0 0 20px rgba(0,123,255,0.8); }
  100% { box-shadow: 0 0 5px rgba(0,123,255,0.5); }
}

.body-area {
  transition: all 0.3s ease;
  
  &:hover {
    animation: cardFloat 2s ease-in-out infinite;
  }

  .text-lg {
    &:hover {
      animation: priceShake 0.5s ease-in-out;
    }
  }

  .stars li i {
    animation: starTwinkle 1.5s infinite;
    animation-delay: calc(0.3s * var(--star-index));
  }

  .progress-bar {
    animation: progressFill 1.5s ease-out forwards;
  }

  .rts-btn {
    transition: all 0.3s ease;
    
    &:hover {
      animation: buttonGlow 2s infinite;
      transform: scale(1.05);
    }
  }
}
      // First add these keyframes and styles to your CSS/SCSS file
@keyframes cardHover {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  }
}

@keyframes shimmer {
  0% {
    background-position: -500px 0;
  }
  100% {
    background-position: 500px 0;
  }
}

@keyframes progressPulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}

@keyframes starPop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

// Add these classes to your existing styles
.single-course-style-three {
  transition: all 0.3s ease;
  
  &:hover {
    animation: cardHover 0.3s forwards;
  }
  
  .thumbnail {
    position: relative;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      animation: shimmer 2s infinite;
    }
  }
  
  .progress-bar {
    animation: progressPulse 2s infinite;
  }
  
  .stars li i {
    transition: all 0.2s ease;
    
    &:hover {
      animation: starPop 0.3s forwards;
      color: gold;
    }
  }
}
  
      ` }</style> 
    </div>
  )
}



const Khoahocdahoanthanh = () => {
  const [khoahocdahoc, setKhoahocdahoc] = useState([]);

  useEffect(() => {
    KhoaHocDaHoc()
      .then((res) => {
        setKhoahocdahoc(res.data);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);

  console.log(khoahocdahoc);

  return (
    <div className="row g-5">
      {khoahocdahoc.map((item, itemIndex) => (
        item.khoahoc && (
          <div key={item.id} className="col-lg-4 col-md-6 col-sm-12 col-12">

            <Link href={`/page/Study?id=${item.id}`}>
              <div className="single-course-style-three enroll-course">
                <a href="single-course.html" className="thumbnail">
                  <Image width={500} height={300} src={item.khoahoc.hinh} alt="course" />
                  <div className="tag-thumb">
                    <span>{item.khoahoc.chude}</span>
                  </div>
                </a>
                <div className="body-area">
                  <div className="course-top">
                    <div className="tags">Best Seller</div>

                    <div className="price">
                      {item.khoahoc.gia === 0 && item.khoahoc.giamgia === 0 ? 'Miễn phí' : `$ ${item.khoahoc.gia}`}
                    </div>
                    <div className={item.khoahoc.gia === 0 && item.khoahoc.giamgia === 0 ? 'price' : 'line-through price'}>
                      {item.khoahoc.gia === 0 && item.khoahoc.giamgia === 0 ? '' : `$ ${item.khoahoc.giamgia}`}
                    </div>
                  </div>
                  <a href="single-course.html">
                    <h5 className="title">
                      {item.khoahoc.ten}
                    </h5>
                  </a>
                  <div className="teacher-stars">
                    <div className="teacher">
                      <span>{item.khoahoc.tenGiangVien}</span>
                    </div>
                    <ul className="stars">
                      <li className="span">4.5</li>
                      <li>
                        <i className="fa-sharp fa-solid fa-star" />
                      </li>
                      <li>
                        <i className="fa-sharp fa-solid fa-star" />
                      </li>
                      <li>
                        <i className="fa-sharp fa-solid fa-star" />
                      </li>
                      <li>
                        <i className="fa-sharp fa-solid fa-star" />
                      </li>
                      <li>
                        <i className="fa-sharp fa-regular fa-star" />
                      </li>
                    </ul>
                  </div>
                  <div className="leasson-students">
                    <div className="lesson">
                      <i className="fa-light fa-calendar-lines-pen" />
                      <span> {item.baihoc.length}Bài học</span>
                    </div>
                    <div className="students">
                      <i className="fa-light fa-users" />
                      <span> {item.soluongmua.length}Bài học</span>
                    </div>
                  </div>
                  <button className="rts-btn btn-border" onClick={() => tieptuchoc()}>
                    Bắt đầu học
                  </button>
                </div>
              </div>
            </Link>
          </div>
        )
      ))}
         <style jsx>{`
      @keyframes thumbnailHover {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(0,0,0,0.2);
  }
  100% {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }
}

.thumbnail {
  position: relative;
  display: block;
  overflow: hidden;
  transition: all 0.3s ease;
}

.thumbnail:hover {
  animation: thumbnailHover 0.3s forwards;
}

.thumbnail img {
  transition: all 0.3s ease;
}

.thumbnail:hover img {
  transform: scale(1.1);
}

.tag-thumb {
  position: absolute;
  bottom: 15px;
  left: 15px;
  transition: all 0.3s ease;
}

.thumbnail:hover .tag-thumb {
  transform: translateY(-5px);
}
      @keyframes cardFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes priceShake {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes starTwinkle {
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
}

@keyframes progressFill {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes buttonGlow {
  0% { box-shadow: 0 0 5px rgba(0,123,255,0.5); }
  50% { box-shadow: 0 0 20px rgba(0,123,255,0.8); }
  100% { box-shadow: 0 0 5px rgba(0,123,255,0.5); }
}

.body-area {
  transition: all 0.3s ease;
  
  &:hover {
    animation: cardFloat 2s ease-in-out infinite;
  }

  .text-lg {
    &:hover {
      animation: priceShake 0.5s ease-in-out;
    }
  }

  .stars li i {
    animation: starTwinkle 1.5s infinite;
    animation-delay: calc(0.3s * var(--star-index));
  }

  .progress-bar {
    animation: progressFill 1.5s ease-out forwards;
  }

  .rts-btn {
    transition: all 0.3s ease;
    
    &:hover {
      animation: buttonGlow 2s infinite;
      transform: scale(1.05);
    }
  }
}
      // First add these keyframes and styles to your CSS/SCSS file
@keyframes cardHover {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  }
}

@keyframes shimmer {
  0% {
    background-position: -500px 0;
  }
  100% {
    background-position: 500px 0;
  }
}

@keyframes progressPulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}

@keyframes starPop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

// Add these classes to your existing styles
.single-course-style-three {
  transition: all 0.3s ease;
  
  &:hover {
    animation: cardHover 0.3s forwards;
  }
  
  .thumbnail {
    position: relative;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      animation: shimmer 2s infinite;
    }
  }
  
  .progress-bar {
    animation: progressPulse 2s infinite;
  }
  
  .stars li i {
    transition: all 0.2s ease;
    
    &:hover {
      animation: starPop 0.3s forwards;
      color: gold;
    }
  }
}
  
      ` }</style>
    </div>
  );
};
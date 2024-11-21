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
              <a href="single-course.html">
                <Image width={500} height={300} src={course.hinh} className="w-full" alt="course" />
                {course.gia === 0 ? (
                  <div className="free-badge">Miễn Phí</div>
                ) : course.giamgia > 0 ? (
                  <div className="discount-badge">
                    -{Math.round(((course.gia - course.giamgia) / course.gia) * 100)}%
                  </div>
                ) : null}
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

      <style jsx>{`
 .course-image-wrapper {
      position: relative;
      overflow: hidden;
      border-radius: 8px;
    }

    .free-badge, .discount-badge {
      position: absolute;
      top: 12px;
      left: 12px;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 600;
      color: white;
      animation: badgePulse 2s infinite;
    }

    .free-badge {
      background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
    }

    .discount-badge {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    }

    @keyframes badgePulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  .rts-single-course {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
  }

  .rts-single-course:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 30px rgba(0,0,0,0.1);
  }

  .thumbnail {
    display: block;
    overflow: hidden;
    border-radius: 8px;
    margin-bottom: 1.5rem;
  }

  .thumbnail img {
    transition: transform 0.6s ease;
  }

  .rts-single-course:hover .thumbnail img {
    transform: scale(1.08);
  }

  .save-icon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(255,255,255,0.9);
    padding: 0.5rem;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .save-icon:hover {
    transform: scale(1.1);
    background: white;
  }

  .single-tag span {
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    color: white;
    padding: 0.4rem 1rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .lesson-studente {
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
  }

  .lesson {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #6b7280;
    font-size: 0.9rem;
  }

  .title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
    margin: 1rem 0;
    transition: color 0.3s ease;
  }

  .rts-single-course:hover .title {
    color: #4f46e5;
  }

  .teacher {
    color: #4b5563;
    font-size: 0.95rem;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .rating-area {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #f8fafc;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
  }

  .rating-area span {
    font-weight: 600;
    color: #1f2937;
  }

  .stars ul {
    display: flex;
    gap: 0.25rem;
    color: #fbbf24;
  }

  .price-area {
    text-align: right;
  }

  .not.price {
    text-decoration: line-through;
    color: #9ca3af;
    font-size: 0.9rem;
  }

  .price {
    color: #ef4444;
    font-weight: 600;
    font-size: 1.1rem;
    background: #fef2f2;
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    margin-top: 0.25rem;
  }

  .price:empty::before {
    content: "Miễn phí";
    color: #059669;
    background: #f0fdf4;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .col-lg-4, .col-12 {
    animation: fadeIn 0.6s ease-out forwards;
  }
`}</style>
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
    <div className="row">
      {courses.map((course) => (

        <div className="col-12" key={course.id}>
          <Link href={`/page/course-detail?id=${course.id}`} key={course.id}>
            <div className="rts-single-course list-view">
              <div className="course-image">
                <a href="single-course.html">
                  <Image width={500} height={300} src={course.hinh} alt="course" />
                  {course.gia === 0 ? (
                    <div className="free-badge">Miễn Phí</div>
                  ) : course.giamgia > 0 ? (
                    <div className="discount-badge">
                      -{Math.round(((course.gia - course.giamgia) / course.gia) * 100)}%
                    </div>
                  ) : null}
                </a>
              </div>

              <div className="course-content">
                <div className="content-wrapper">
                  <div className="top-content">
                    <div className="tags-area-wrapper">
                      <div className="single-tag">
                        <span>{course.chude}</span>
                      </div>
                    </div>

                    <h5 className="title">{course.ten}</h5>
                    <p className="teacher">{course.giangvien}</p>

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
                  </div>

                  <div className="bottom-content">
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
                          <div className="not price">${course.gia}</div>
                          <div className="price">${course.giamgia}</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

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
              </div>
            </div>
          </Link>
        </div>

      ))}
      <style jsx>{`
            // Modify the save-icon styles in your JSX styles block

.save-icon {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255,255,255,0.95);
  padding: 0.75rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 10;
}

.save-icon:hover {
  transform: scale(1.15);
  background: #4f46e5;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.save-icon:hover i {
  color: white;
}

.save-icon:active {
  transform: scale(0.95);
}

.save-icon i {
  font-size: 1.25rem;
  color: #4f46e5;
  transition: all 0.3s ease;
}

.save-icon.saved {
  background: #4f46e5;
  animation: savePop 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.save-icon.saved i {
  color: white;
}

@keyframes savePop {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

// Add this to handle the saved state
.save-icon::after {
  content: "Saved!";
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: #4f46e5;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  opacity: 0;
  transition: all 0.3s ease;
}

.save-icon.saved::after {
  opacity: 1;
  bottom: -25px;
}
            .list-view {
    display: flex;
    gap: 2rem;
    padding: 1.5rem;
  }

  .course-image {
    flex: 0 0 300px;
    position: relative;
  }

  .course-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  .course-content {
    flex: 1;
    display: flex;
    justify-content: space-between;
  }

  .content-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .top-content {
    margin-bottom: 1rem;
  }

  .bottom-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /* Keep existing styles and add/modify: */
  .rts-single-course.list-view:hover {
    transform: translateY(-4px);
  }

  .title {
    font-size: 1.5rem;
    margin: 1rem 0;
  }

  .lesson-studente {
    margin: 1rem 0;
  }

  .save-icon {
    align-self: flex-start;
  }
    .course-image-wrapper {
      position: relative;
      overflow: hidden;
      border-radius: 8px;
    }

    .free-badge, .discount-badge {
      position: absolute;
      top: 12px;
      left: 12px;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 600;
      color: white;
      animation: badgePulse 2s infinite;
    }

    .free-badge {
      background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
    }

    .discount-badge {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    }

    @keyframes badgePulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  .rts-single-course {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
  }

  .rts-single-course:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 30px rgba(0,0,0,0.1);
  }

  .thumbnail {
    display: block;
    overflow: hidden;
    border-radius: 8px;
    margin-bottom: 1.5rem;
  }

  .thumbnail img {
    transition: transform 0.6s ease;
  }

  .rts-single-course:hover .thumbnail img {
    transform: scale(1.08);
  }

  .save-icon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(255,255,255,0.9);
    padding: 0.5rem;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .save-icon:hover {
    transform: scale(1.1);
    background: white;
  }

  .single-tag span {
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    color: white;
    padding: 0.4rem 1rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .lesson-studente {
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
  }

  .lesson {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #6b7280;
    font-size: 0.9rem;
  }

  .title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
    margin: 1rem 0;
    transition: color 0.3s ease;
  }

  .rts-single-course:hover .title {
    color: #4f46e5;
  }

  .teacher {
    color: #4b5563;
    font-size: 0.95rem;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .rating-area {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #f8fafc;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
  }

  .rating-area span {
    font-weight: 600;
    color: #1f2937;
  }

  .stars ul {
    display: flex;
    gap: 0.25rem;
    color: #fbbf24;
  }

  .price-area {
    text-align: right;
  }

  .not.price {
    text-decoration: line-through;
    color: #9ca3af;
    font-size: 0.9rem;
  }

  .price {
    color: #ef4444;
    font-weight: 600;
    font-size: 1.1rem;
    background: #fef2f2;
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    margin-top: 0.25rem;
  }

  .price:empty::before {
    content: "Miễn phí";
    color: #059669;
    background: #f0fdf4;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .col-lg-4, .col-12 {
    animation: fadeIn 0.6s ease-out forwards;
  }
`}</style>
    </div>
  );
}

export { Grid, List };
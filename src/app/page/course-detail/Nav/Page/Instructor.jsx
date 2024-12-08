import React, { useState, useEffect } from "react";
import { FaStar, FaFacebook, FaInstagram, FaLinkedin, FaPinterest, FaYoutube, FaUsers, FaVideo } from "react-icons/fa";
import Link from "next/link";
import Image from 'next/image';

const styles = `
  @keyframes softPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  @keyframes starShine {
    0% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.2); }
    100% { opacity: 1; transform: scale(1); }
  }

  @keyframes floatIcon {
    0% { transform: translateY(0) rotate(0); }
    50% { transform: translateY(-5px) rotate(5deg); }
    100% { transform: translateY(0) rotate(0); }
  }

  .instructor-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .instructor-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  }

  .instructor-image {
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .instructor-image:hover {
    transform: scale(1.08) rotate(2deg);
  }

  .social-icon {
    transition: all 0.3s ease;
  }

  .social-icon:hover {
    animation: floatIcon 0.8s ease infinite;
    filter: brightness(1.2);
  }

  .star-icon {
    animation: starShine 3s ease infinite;
  }

  .student-count {
    animation: softPulse 2.5s ease-in-out infinite;
  }

  .stat-item {
    transition: all 0.3s ease;
  }

  .stat-item:hover {
    transform: scale(1.1);
  }
`;

export default function Instructor({ course }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const highestRating = course.danhgia.reduce((max, review) => Math.max(max, parseFloat(review.rating)), 0);
  const StartFilter = (rating) => {
    let star = 0;
    if (rating >= 4.5) {
      star = 5;
    } else if (rating >= 4.0) {
      star = 4;
    } else if (rating >= 3.5) {
      star = 3;
    } else if (rating >= 3.0) {
      star = 2;
    } else if (rating >= 2.5) {
      star = 1;
    } else {
      star = 0;
    }
    return star;
  }

  const starCount = StartFilter(highestRating);

  const HocSinh = course.thanhToan.filter((item) => item.id_nguoidung).length;
  console.log(course.thongtingiangvien);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className={`instructor-card single-instructor-area-details flex p-6 border rounded-xl shadow-md bg-white 
        ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-700`}>
        <Link href={`/page/Profile-insructor?id=${course.thongtingiangvien.id}`} 
          className="w-1/4 overflow-hidden rounded-xl">
          <div className="relative group">
            <Image
              width={500}
              height={300}
              src={course.thongtingiangvien.hinh}
              alt={`Instructor ${course.thongtingiangvien.ten}`}
              className=" instructor-image h-96 w-96 rounded-xl"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
          </div>
        </Link>

        <div className="inner-instructor-area ml-6 flex-1">
          <h5 className="title text-3xl pb-2 hover:text-blue-600 transition-colors duration-300">
            {course.thongtingiangvien.ten}
          </h5>
          <span className="deg text-gray-600 font-medium text-2xl" style={{ fontWeight: 'normal' }}>{course.trinhdo}</span>

          <div className="stats-grid grid grid-cols-3 gap-4 mt-4">
            <div className="stat-item p-3 rounded-lg bg-gray-50 hover:bg-gray-100">
              <div className="stars-area flex items-center">
                <span className="text-yellow-500  mr-2 text-xl" style={{ fontWeight: 'normal' }}>{highestRating}</span>
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} 
                    className={`${index < starCount ? "text-yellow-500 text-xl" : "text-gray-300 text-xl"} star-icon`}
                    style={{paddingRight:"2px"}}
                  />
                ))}
              </div>
            </div>
            
            <div className="stat-item p-3 rounded-lg bg-gray-50 hover:bg-gray-100">
              <div className="users-area flex items-center">
                <FaUsers className="text-blue-500 mr-2 text-xl" />
                <span className="text-gray-700 student-count text-xl" style={{ fontWeight: 'normal' }}>
                  {HocSinh} Sinh viên
                </span>
              </div>
            </div>

            <div className="stat-item p-3 rounded-lg bg-gray-50 hover:bg-gray-100">
              <div className="courses-area flex items-center">
                <FaVideo className="text-green-500 mr-2 text-xl" />
                <span className="text-gray-700 text-xl" style={{ fontWeight: 'normal' }}> 
                  {course.Tongkhoahoc.length} Khóa học
                </span>
              </div>
            </div>
          </div>

          <p className="disc mt-4 text-gray-700 leading-relaxed text-2xl">
            {course.thongtingiangvien.tieusu}
          </p>

          <div className="follow-us mt-6">
            <span className="text-2xl font-semibold">Follow Me</span>
            <ul className="social-links flex space-x-4">
              {[
                { icon: FaFacebook, color: "blue", label: "Facebook" },
                { icon: FaInstagram, color: "pink", label: "Instagram" },
                { icon: FaLinkedin, color: "blue", label: "LinkedIn" },
                { icon: FaPinterest, color: "red", label: "Pinterest" },
                { icon: FaYoutube, color: "red", label: "YouTube" }
              ].map((social, index) => (
                <li key={index}>
                  <Link href="#" 
                    aria-label={social.label}
                    className={`text-${social.color}-600 hover:text-${social.color}-800 social-icon p-2 inline-block`}>
                    <social.icon size={24} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
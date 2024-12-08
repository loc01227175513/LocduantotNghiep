import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
export default function Product({ gia, giamgia, ten, hinh, chude, giangvien, baihocs, dangky, danhgia, id}) {
  return (
    <div className="transition flash element-item creative" data-category="transition">
      <div className="rts-single-course">
        <Link href={`/page/course-detail?id=${id}`} className="thumbnail relative">
          <div className="thumbnail relative" style={{ aspectRatio: '16 / 9' }}>
            <Image src={hinh} alt="course" layout="fill" objectFit="cover" />
            {/* Free course badge */}
            {(gia === 0 || giamgia === 0) && (
              <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full font-bold text-xl shadow-lg transform -rotate-12 z-10">
                Miễn Phí
              </div>
            )}
            {/* Discount badge */}
            {giamgia < gia && giamgia !== 0 && (
              <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full font-bold text-xl shadow-lg transform -rotate-12 z-10">
                -{Math.round((1 - giamgia / gia) * 100)}% OFF
              </div>
            )}
          </div>
        </Link>
        <div className="course-card">
          <Link href={`/page/course-detail?id=${id}`} className="title-link block h-[60px]">
            <p className="line-clamp-2 font-bold text-2xl overflow-hidden hover:text-gray-600 transition-colors">
              {ten}
            </p>
          </Link>

          <div className="teacher">
            <i className="bi bi-grid mr-2 text-gray-800 text-xl"></i>
            <span className="text-xl text-gray-800">{chude}</span>
          </div>
          <div className="flex space-x-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center space-x-2 pr-2 pt-2 pb-2 rounded-full">
              <i className="fa-light fa-calendar-lines-pen text-gray-600 text-xl" />
              <div className="flex flex-col">
                <span className="text-xl font-medium">
                  {baihocs}
                  <span className="text-sm text-gray-600 uppercase tracking-wider pl-2">Lessons</span>
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-2 rounded-full">
              <i className="fa-light fa-user-group text-gray-600 text-xl" />
              <div className="flex flex-col">
                <span className="text-xl font-medium">
                  {dangky}
                  <span className="text-sm text-gray-600 uppercase tracking-wider pl-2">Students</span>
                </span>
              </div>
            </div>
            <div className="rating-area text-gray-600 text-xl">
              <svg
                stroke="currentColor" 
                fill="#FFD700"
                strokeWidth="0"
                viewBox="0 0 576 512"
                className="text-yellow-400 w-5 h-5"
                aria-label="Filled Star"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
              </svg>
              <span className="rating-number ml-2">{danhgia}</span>
            </div>
          </div>

          


          <button className="download-cert-btn mt-4 w-full py-2 bg-[#ff6b6b] text-white rounded-lg transition-colors duration-300 ease-in-out hover:bg-[#1e3c72]">
            <i className="fas fa-certificate px-2" />
            Nhận chứng chỉ ngay
          </button>

          <div className="rating-and-price">
            <div className="price-area">
              <div className="price-wrapper">
                {gia === 0 || giamgia === 0 ? null : (
                  <>
                    <div className="sale-price">
                      <p className="text-2xl font-bold text-red-600">
                        {giamgia.toLocaleString()}
                        <span className="text-xl">VNĐ</span>
                      </p>
                    </div>
                    <div className="original-price">
                      <p className="text-2xl">
                        {gia.toLocaleString()}
                        <span className="text-xl">VNĐ</span>
                      </p>
                    </div>
                  </>
                )}
              </div>
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
              color: #4a5568;
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
              color: #4a5568;
            }
            .free-badge {
              background: #2d3748;
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
              color: #2d3748;
              font-weight: 600;
              font-size: 1.1rem;
            }
            @keyframes pulse {
              0% {
                box-shadow: 0 0 0 0 rgba(45, 55, 72, 0.4);
              }
              70% {
                box-shadow: 0 0 0 10px rgba(45, 55, 72, 0);
              }
              100% {
                box-shadow: 0 0 0 0 rgba(45, 55, 72, 0);
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
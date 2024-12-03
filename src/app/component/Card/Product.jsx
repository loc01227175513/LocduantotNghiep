import React from 'react';
import Image from 'next/image';

export default function Product({ gia, giamgia, ten, hinh, chude, giangvien, baihocs, dangky, danhgia, id, PhanTram }) {
  return (

    <div
      className="transition flash element-item creative "
      data-category="transition"
    >
      <div className="rts-single-course ">
        <a href={`/page/course-detail?id=${id}`} className="thumbnail relative">
          <div className="thumbnail relative" style={{ aspectRatio: '16 / 9' }}>
            <Image
              src={hinh}
              alt="course"
              layout="fill"
              objectFit="cover"
            />
            {/* Free course badge */}
            {(gia === 0 || giamgia === 0) && (
              <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-lg shadow-lg transform -rotate-12 z-10">
                Miễn Phí
              </div>
            )}
            {/* Discount badge */}
            {giamgia < gia && giamgia !== 0 && (
              <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-lg shadow-lg transform -rotate-12 z-10">
                -{Math.round((1 - giamgia / gia) * 100)}% OFF
              </div>
            )}
          </div>
        </a>
        <div className="course-card">
          <a href={`/page/course-detail?id=${id}`} className="title-link">
            <p className="title">{ten}</p>
          </a>
          <div className="teacher">
            <i className="bi bi-grid mr-2 text-gray-800 text-2xl"></i>
            <span className="text-xl text-gray-800">{chude}</span>
          </div>
          <div className="flex space-x-4 bg-gradient-to-r from-gray-50 to-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center space-x-2 pr-2 pt-2 pb-2 rounded-full">
              <i className="fa-light fa-calendar-lines-pen text-blue-500 text-xl" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold">
                  {baihocs}
                  <span className="text-sm text-gray-600 uppercase tracking-wider pl-2">Lessons</span>
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-2 rounded-full">
              <i className="fa-light fa-user-group text-green-500 text-xl" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold">
                  {dangky}
                  <span className="text-sm text-gray-600 uppercase tracking-wider pl-2">Students</span>
                </span>
              </div>
            </div>
            <div className="rating-area text-yellow-500 text-2xl">
              <svg
                stroke="currentColor"
                fill="currentColor"
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
          
          <div className="progress-wrapper h-1 bg-gray-200 rounded mt-4">
            <div
              className="progress-bar h-full bg-gradient-to-r from-[#1e3c72] to-[#ff6b6b] rounded transition-width duration-300 ease-in-out"
              style={{ width: `${PhanTram}%` }}
            />
          </div>

          <button className="download-cert-btn mt-4 w-full py-2 bg-[#ff6b6b] text-white rounded-lg transition-colors duration-300 ease-in-out hover:bg-[#1e3c72]">
            <i className="fas fa-certificate" />
            Tải xuống chứng chỉ
          </button>
          <div className="rating-and-price">
            <div className="price-area">
              <div className="price-wrapper">
                {gia === 0 || giamgia === 0 ? null : (
                  <>
                    <div className="sale-price">
                      <p className="text-3xl font-bold">
                        {giamgia}
                        <span className="text-2xl">VNĐ</span>
                      </p>
                    </div>
                    <div className="original-price">
                      <p className="text-3xl">
                        {gia}
                        <span className="text-2xl">VNĐ</span>
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
          background: -webkit-linear-gradient(315deg, #1e3c72 0%, #ff6b6b 100%);
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
      `}</style>
        </div>
      </div>
    </div>

  );
}
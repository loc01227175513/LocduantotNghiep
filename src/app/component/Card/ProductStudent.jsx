import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
export default function ProductStudent({ gia, giamgia, ten, hinh, chude, giangvien, baihocs, dangky, danhgia, id, PhanTram, tieptuchoc }) {
    const [isExpanded, setIsExpanded] = useState(false);
    return (

        <div
            className="transition flash element-item creative "
            data-category="transition"
        >
            <div className="rts-single-course ">
                <Link href={`/page/course-detail?id=${id}`} className="thumbnail relative">
                    <div className="thumbnail relative" style={{ aspectRatio: '16 / 9' }}>
                        <Image
                            src={hinh}
                            alt="course"
                            layout="fill"
                            objectFit="cover"
                        />
                        {/* Free course badge */}
                        {(gia === 0 || giamgia === 0) && (
                            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-lg shadow-lg transform -rotate-12 z-10">
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
                </Link>
                <div className="course-card">
                    <Link
                        href={`/page/course-detail?id=${id}`}
                        className="title-link min-h-[60px] flex items-center"
                    >
                        <p className="title line-clamp-2 overflow-hidden">
                            {ten}
                        </p>
                    </Link>
                    <div className="teacher">
                        <i className="bi bi-grid mr-2 text-gray-800 text-2xl"></i>
                        <span className="text-xl text-gray-800">{chude}</span>
                    </div>
                    {/* <div className="flex space-x-4 bg-gradient-to-r from-gray-50 to-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex items-center space-x-2 pr-2 pt-2 pb-2 rounded-full">
                            <i className="fa-light fa-calendar-lines-pen text-blue-500 text-xl" />
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold">
                                    {baihocs}
                                    <span className="text-sm text-gray-600 uppercase tracking-wider pl-2">Lessons</span>
                                </span>
                            </div>
                        </div>
                    </div> */}
                    <div className="rating-and-price">
                        <div className="price-area">
                            <div className={`price-wrapper ${isExpanded ? 'expanded' : ''}`}
                                onClick={() => setIsExpanded(!isExpanded)}>
                                {gia !== 0 && giamgia !== 0 && gia !== giamgia ? (
                                    <>
                                        <div className="sale-price animate">
                                            <p className="text-3xl font-bold">
                                                {giamgia.toLocaleString()}
                                                <span className="text-2xl">VNĐ</span>
                                            </p>
                                        </div>
                                        <div className="original-price animate">
                                            <p className="text-3xl">
                                                {gia.toLocaleString()}
                                                <span className="text-2xl">VNĐ</span>
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="regular-price animate">
                                        <div className='h-10'>

                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="progress-wrapper h-1 bg-gray-200 rounded mt-4">
                        <div
                            className="progress-bar h-full bg-gradient-to-r from-[#1e3c72] to-[#ff6b6b] rounded transition-width duration-300 ease-in-out"
                            style={{ width: `${PhanTram}%` }}
                        />
                    </div>
                    {PhanTram == 100 ? (
                        <button className="download-cert-btn mt-4 w-full py-2 bg-[#ff6b6b] text-white rounded-lg transition-colors duration-300 ease-in-out hover:bg-[#1e3c72]">
                            <i className="fas fa-certificate" />
                            Tải xuống chứng chỉ
                        </button>
                    ) : (

                        <button className="download-cert-btn mt-4 w-full py-2 bg-[#ff6b6b] text-white rounded-lg transition-colors duration-300 ease-in-out hover:bg-[#1e3c72]" onClick={() => tieptuchoc(id)}>
                            <i className="fas fa-certificate" />
                            Tiếp tục học
                        </button>
                    )}

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
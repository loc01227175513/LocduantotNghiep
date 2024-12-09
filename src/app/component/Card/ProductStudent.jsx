'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChungChi, LayChungChi } from "@/service/ChungChi/ChungChi";

export default function ProductStudent({ gia, giamgia, ten, hinh, chude, giangvien, baihocs, dangky, danhgia, id, PhanTram, tieptuchoc }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleCertificateDownload = async (id) => {
    try {
      setIsLoading(true);
      setError(null);

      // Lấy thông tin chứng chỉ của khóa học
      const chungChiKhoaHoc = await LayChungChi({
        id_khoahoc: id
      });
      console.log("ChungChiKhoaHoc", chungChiKhoaHoc);
      if (!chungChiKhoaHoc?.id_chungchi) {
        setError('Không tìm thấy chứng chỉ cho khóa học này');
        return;
      }

      // Lấy danh sách tất cả chứng chỉ
      const danhSachChungChi = await ChungChi();
      console.log("DanhSachChungChi", danhSachChungChi);
      // Tìm chứng chỉ khớp với id_chungchi
      const chungChiTimThay = danhSachChungChi.data.find(
        item => item.id === chungChiKhoaHoc.id_chungchi
      );
      console.log("chungChiTimThay", chungChiTimThay);

      if (chungChiTimThay?.giaychungnhan) {
        try {
          setIsLoading(true);
          
          // Tạo thẻ a và thiết lập thuộc tính để tải xuống
          const link = document.createElement('a');
          link.href = chungChiTimThay.giaychungnhan;
          link.download = `chung-chi-${ten.replace(/\s+/g, '-')}.jpg`; // Tên file khi tải về
          
          // Thực hiện click để tải
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
        } catch (downloadError) {
          setError('Không thể tải xuống chứng chỉ. Vui lòng thử lại sau.');
          console.error('Lỗi khi tải xuống:', downloadError);
        } finally {
          setIsLoading(false);
        }
      } else {
        setError('Không tìm thấy mẫu chứng chỉ phù hợp');
      }

    } catch (error) {
      setError('Có lỗi xảy ra khi tải chứng chỉ');
      console.error('Lỗi khi tải chứng chỉ:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const renderActionButton = (id) => {
    if (PhanTram === 100) {
      return (
        <div>
          <button 
            onClick={() => handleCertificateDownload(id)}
            className="download-cert-btn w-full py-3 sm:py-4 bg-gradient-to-r from-blue-900 via-pink-700 to-pink-700 text-white rounded-lg transition-all duration-300 ease-in-out hover:from-pink-700 hover:to-pink-700 hover:shadow-lg flex items-center justify-center gap-2 sm:gap-3"
            disabled={isLoading}
          >
            <i className="fas fa-certificate text-lg sm:text-xl" />
            <span className="text-base sm:text-lg font-medium">
              {isLoading ? 'Đang tải...' : 'Tải xuống chứng chỉ'}
            </span>
          </button>
          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}
        </div>
      );
    }

    return (
      <button
        className="download-cert-btn w-full py-3 sm:py-4 bg-gradient-to-r from-blue-900 via-pink-700 to-pink-700 text-white rounded-lg transition-all duration-300 ease-in-out hover:from-pink-700 hover:to-pink-700 hover:shadow-lg flex items-center justify-center gap-2 sm:gap-3"
        onClick={() => tieptuchoc(id)}
      >
        <i className="fas fa-certificate text-lg sm:text-xl" />
        <span className="text-base sm:text-lg font-medium">Tiếp tục học</span>
      </button>
    );
  };

  return (
    <div
      className="transition flash element-item creative p-2 sm:p-3"
      data-category="transition"
    >
      <div className="rts-single-course rounded-xl overflow-hidden bg-white">
        <Link href={`/page/course-detail?id=${id}`} className="thumbnail relative block">
          <div className="thumbnail relative" style={{ aspectRatio: '16 / 9' }}>
            <Image
              src={hinh}
              alt={ten}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
            {(gia === 0 || giamgia === 0) && (
              <div className="absolute top-3 right-3 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg transform -rotate-12 z-10 backdrop-blur-sm bg-opacity-90">
                Miễn Phí
              </div>
            )}
            {giamgia < gia && giamgia !== 0 && (
              <div className="absolute top-3 right-3 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg transform -rotate-12 z-10 backdrop-blur-sm bg-opacity-90">
                -{Math.round((1 - giamgia / gia) * 100)}% OFF
              </div>
            )}
          </div>
        </Link>
        <div className="course-card">
          <Link
            href={`/page/course-detail?id=${id}`}
            className="title-link min-h-12 sm:min-h-15 flex items-center mb-2 sm:mb-4 group"
          >
            <p className="title text-[14px] sm:text-lg truncate group-hover:whitespace-normal group-hover:text-clip">{ten}</p>
          </Link>
          <div className="teacher mb-3 sm:mb-6 flex items-center">
            <i className="bi bi-grid mr-2 sm:mr-3 text-gray-800 text-xl sm:text-2xl"></i>
            <span className="text-lg sm:text-xl truncate hover:whitespace-normal hover:text-clip text-gray-800">{chude}</span>
          </div>
          <div className="rating-and-price ">
            <div className="price-area">
              <div className={`price-wrapper ${isExpanded ? 'expanded' : ''}`}
                onClick={() => setIsExpanded(!isExpanded)}>
                {gia !== 0 && giamgia !== 0 && gia !== giamgia ? (
                  <>
                    <div className="sale-price animate mb-2">
                      <p className="text-3xl font-bold">
                        {giamgia.toLocaleString()}
                        <span className="text-2xl ml-2">VNĐ</span>
                      </p>
                    </div>
                    <div className="original-price animate">
                      <p className="text-2xl">
                        {gia.toLocaleString()}
                        <span className="text-2xl ml-2">VNĐ</span>
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="sale-price animate mb-2">
                      <p className="text-3xl font-bold">
                        0<span className="text-2xl ">VNĐ</span>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="progress-wrapper h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
            <div
              className="progress-bar h-full bg-gradient-to-r from-[#1e3c72] to-[#ff6b6b] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${PhanTram}%` }}
            />
          </div>
          {renderActionButton(id)}

          <style jsx>{`
        .course-card {
          padding: 1.25rem;
          transition: all 0.3s ease;
          border-radius: 12px;
          background: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          @media (min-width: 640px) {
            padding: 1.75rem;
          }
        }
        .course-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
        }
        .title-link {
          display: block;
        }
        .title {
          font-size: 1rem;
          font-weight: 400;
          color: #2d3748;
          transition: color 0.2s ease;
          @media (min-width: 640px) {
            font-size: 1.1rem;
          }
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
          font-size: 1rem;
          @media (min-width: 640px) {
            font-size: 1.1rem;
          }
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
"use client";
import React, { useState, useEffect } from 'react';
import { showAllNguoiDungMaGiamGia } from '../../../../service/khuyenmai/khuyenmai';



export default function VoucherPage() {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const fetchVouchers = async () => {
      showAllNguoiDungMaGiamGia()
        .then((response) => {
          setVouchers(response);
        })
        .catch((error) => {
          console.error('Fetch error:', error);
          alert("Failed to fetch vouchers.");
        });
    };

    fetchVouchers();
  }, []);

  return (
    <div className="overflow-y-scroll col-lg-9 h-lvh" >
      <div className="exrolled-course-wrapper-dashed">
        <div className="voucher-page container">
        <h1 className="page-title text-3xl font-bold text-black">Kho Voucher</h1>
          <div className="voucher-list row justify-content-end">
            {/* {vouchers.map((voucher, index) => (
             <div 
             key={voucher.id} 
             className="voucher-card col-md-4" 
             style={{ 
               position: 'relative',
               border: '3px solid',
               padding: '20px', 
               margin: '10px', 
               animationDelay: `${index * 0.15}s`,
             }}
           >
             <i className="fas fa-ticket-alt icon-wrapper icon-discount"></i>
             <h2>{voucher.magiamgia.maso}</h2>
             <p><i className="fas fa-percentage"></i> Giảm giá: {voucher.magiamgia.giamgia}%</p>
             <p><i className="fas fa-users"></i> Giới hạn sử dụng: {voucher.dasudunghientai}</p>
             <p><i className="fas fa-history"></i> Cách sử dụng hiện tại: {voucher.magiamgia.sudunghientai}</p>
             <p><i className="fas fa-check-circle"></i> Trạng thái: {voucher.magiamgia.trangthai}</p>
             <p><i className="fas fa-calendar-plus"></i> Ngày bắt đầu: {voucher.magiamgia.ngaybatdau}</p>
             <p><i className="fas fa-calendar-times"></i> Ngày hết hạn: {voucher.magiamgia.ngayketthuc}</p>
             <i className="fas fa-star icon-wrapper icon-status"></i>
             <i className="fas fa-calendar icon-wrapper icon-calendar"></i>
           </div>
            ))} */}

              {vouchers.map((item) =>(
                <div className="border-2 border-gray-300 w-[350px] bg-[#32ADE6] rounded-lg p-4 shadow-lg">
                <div className="text-white text-lg font-semibold text-center mb-3 uppercase">
                  Giảm ngay
                </div>
                
                <div className="flex">
                  <div className="w-[200px] h-[200px] flex flex-col items-center justify-center bg-[#1C86B0] rounded-lg">
                    <p className="text-9xl font-extrabold text-white leading-none">{item.magiamgia.giamgia}%</p>
                    <p className="text-white text-xl mt-2">Mã code: <span className="font-semibold">{item.magiamgia.maso}</span></p>
                  </div>
                  
                  <div className="flex flex-col justify-center ml-4">
                    <p className="text-red-400 text-xl font-medium">Từ: {item.magiamgia.ngaybatdau}</p>
                    <p className="text-green-400 text-xl font-medium">Đến: {item.magiamgia.ngayketthuc}</p>
                    <p className="text-white text-xl font-medium mt-2">Số lượng: {item.magiamgia.sudunghientai}</p>
                  </div>
                </div>
              </div>
              ))}

          </div>
        </div>
      </div>
    </div>
  );
}
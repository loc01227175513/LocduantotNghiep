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
    <div className="overflow-y-scroll col-lg-9 h-lvh font-['Roboto',sans-serif]" >
      <div className="exrolled-course-wrapper-dashed">
        <div className="voucher-page container">
          <h1 className="page-title text-2xl font-medium text-[#222222] mb-4">Kho Voucher</h1>
          <div className="voucher-list flex flex-wrap gap-4 justify-start">
            {vouchers.map((item) =>(
              <div key={item.magiamgia.maso} className="border-[1px] border-pink-700 bg-[#fff4f4] rounded-sm p-3 shadow-sm">
                <div className="text-pink-700 text-sm font-medium text-center mb-2 uppercase">
                  Giảm ngay
                </div>
                
                <div className="flex">
                  <div className="w-[150px] h-[150px] flex flex-col items-center justify-center bg-pink-700 rounded-sm">
                    <p className="text-6xl font-bold text-white leading-none">{item.magiamgia.giamgia}%</p>
                    <p className="text-white text-xs mt-2">Mã: <span className="font-medium">{item.magiamgia.maso}</span></p>
                  </div>
                  
                  <div className="flex flex-col justify-center ml-3">
                    <p className="text-pink-700 text-xs font-medium">Từ: {item.magiamgia.ngaybatdau}</p>
                    <p className="text-[#000000] text-xs font-medium">Đến: {item.magiamgia.ngayketthuc}</p>
                    <p className="text-[#757575] text-xs font-medium mt-1">Số lượng: {item.magiamgia.sudunghientai}</p>
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
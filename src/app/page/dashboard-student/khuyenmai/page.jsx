"use client";
import React, { useState, useEffect } from 'react';
import { showAllNguoiDungMaGiamGia } from '../../../../service/khuyenmai/khuyenmai';
import { RiCoupon3Line } from "react-icons/ri";
import toast, { Toaster } from 'react-hot-toast';

export default function VoucherPage() {
  const [vouchers, setVouchers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVouchers = async () => {
    setIsLoading(true);
    try {
      const response = await showAllNguoiDungMaGiamGia();
      setVouchers(response);
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error("Không thể tải danh sách voucher.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const handleRefresh = () => {
    toast.promise(
      fetchVouchers(),
      {
        loading: 'Đang tải lại...',
        success: 'Đã tải lại thành công!',
        error: 'Không thể tải lại dữ liệu'
      }
    );
  };

  if (isLoading) {
    return (
      <div className="overflow-y-scroll col-lg-9 h-lvh font-['Roboto',sans-serif]">
        <Toaster position="top-right" />
        <div className="flex items-center justify-center h-full">
          <div className="text-xl text-gray-500">Đang tải...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-y-scroll col-lg-9 h-lvh font-['Roboto',sans-serif]">
      <Toaster position="top-right" />
      <div className="exrolled-course-wrapper-dashed">
        <div className="voucher-page container">
         
          <div className="voucher-list flex flex-wrap gap-4 justify-start">
            {vouchers.length > 0 ? (
              vouchers.map((item) =>(
                <div key={item.magiamgia.maso} className="border-[1px] border-pink-700 bg-[#fff4f4] rounded-sm p-3 shadow-sm">
                  <div className="text-black text-2xl font-medium text-center mb-2 uppercase">
                    Giảm ngay
                  </div>
                  
                  <div className="flex">
                    <div className="w-[150px] h-[150px] flex flex-col items-center justify-center bg-pink-700 rounded-sm">
                      <p className="text-6xl font-bold text-white leading-none">{item.magiamgia.giamgia}%</p>
                      <p className="text-white text-xl mt-2">Mã: <span className="font-medium">{item.magiamgia.maso}</span></p>
                    </div>
                    
                    <div className="flex flex-col justify-center ml-3">
                      <p className="text-[#000000] text-xl font-medium">Từ: {item.magiamgia.ngaybatdau}</p>
                      <p className="text-[#000000] text-xl font-medium">Đến: {item.magiamgia.ngayketthuc}</p>
                      <p className="text-[#757575] text-xl font-medium mt-1">Số lượng: {item.magiamgia.sudunghientai}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-[950px]">
                <div className="flex flex-col items-center justify-center py-10">
                  <RiCoupon3Line className="text-8xl text-gray-300 mb-4" />
                  <p className="text-gray-500 text-xl">Bạn chưa có voucher nào</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
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
    <div className="overflow-y-scroll col-lg-9 h-lvh" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="exrolled-course-wrapper-dashed">
        <div className="voucher-page container">
          <div className="voucher-list row justify-content-end">
            {vouchers.map((voucher, index) => (
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
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <i className="fas fa-percentage" style={{ marginRight: '8px' }}></i>
                  <p><strong>Giảm giá:</strong> {voucher.magiamgia.giamgia}%</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <i className="fas fa-users" style={{ marginRight: '8px' }}></i>
                  <p><strong>Giới hạn sử dụng:</strong> {voucher.dasudunghientai}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <i className="fas fa-history" style={{ marginRight: '8px' }}></i>
                  <p><strong>Cách sử dụng hiện tại:</strong> {voucher.magiamgia.sudunghientai}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <i className="fas fa-check-circle" style={{ marginRight: '8px' }}></i>
                  <p><strong>Trạng thái:</strong> {voucher.magiamgia.trangthai}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <i className="fas fa-calendar-plus" style={{ marginRight: '8px' }}></i>
                  <p><strong>Ngày bắt đầu:</strong> {voucher.magiamgia.ngaybatdau}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <i className="fas fa-calendar-times" style={{ marginRight: '8px' }}></i>
                  <p><strong>Ngày hết hạn:</strong> {voucher.magiamgia.ngayketthuc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
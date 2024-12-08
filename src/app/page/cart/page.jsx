"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../component/header/page';
import { TatCaKhuyenMaiKhoaHoc, showAllNguoiDungMaGiamGia } from '../../../service/khuyenmai/khuyenmai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import { FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalBeforeDiscount, setTotalBeforeDiscount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [KhuyenMai, setKhuyenMai] = useState([]);
  const [appliedCoupons, setAppliedCoupons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    TatCaKhuyenMaiKhoaHoc()
      .then((response) => {
        setKhuyenMai(response);
      })
      .catch((error) => {
        console.error('Failed to fetch MaGiamGia data:', error);
      });
  }, []);

  useEffect(() => {
    const userData = typeof window !== 'undefined' ? localStorage.getItem('data') : null;

    if (userData) {
      try {
        const parsedData = JSON.parse(userData);

        axios.post('https://huuphuoc.id.vn/api/showgiohang', { id_nguoidung: parsedData.id }, {
          referrerPolicy: 'unsafe-url'
        })
          .then(response => {
            setCartItems(response.data.data);
          })
          .catch(() => {
            // Do nothing
          });
      } catch {
        // Do nothing
      }
    }
  }, []);

  useEffect(() => {
    let beforeDiscount = 0;
    let discount = 0;

    cartItems.forEach(item => {
      item.khoahocs.forEach(khoahoc => {
        beforeDiscount += khoahoc.giamgia;
        const coupon = appliedCoupons.find(c => c.id_khoahoc === khoahoc.id);
        if (coupon) {
          discount += coupon.giamgia;
        }
      });
    });

    setTotalBeforeDiscount(beforeDiscount);
    setTotalDiscount(discount);
  }, [cartItems, appliedCoupons]);


  const xoagiohang = async (id) => {
    try {
      const userData = typeof window !== 'undefined' ? localStorage.getItem('data') : null;
      const parsedData = JSON.parse(userData);
      if (!parsedData) {
        return null;
      }

      const payload = {
        id_khoahoc: id,
        id_nguoidung: parsedData.id,
      };

      await axios.post('https://huuphuoc.id.vn/api/xoasanphamadd', payload, {
        referrerPolicy: 'unsafe-url'
      });
      toast.success("Sản phẩm đã được xóa!");

      window.location.href = '/page/cart';
    } catch {
      toast.error("Failed to remove course from cart.");
    }
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const couponCode = e.target.coupon_code.value.trim();
    const promo = KhuyenMai.find(
      (promo) =>
        promo.magiamgia.maso === couponCode && promo.magiamgia.trangthai === "Đã Duyệt"
    );

    if (promo) {
      const courseId = promo.id_khoahoc;
      const courseInCart = cartItems.some((item) =>
        item.khoahocs.some((khoahoc) => khoahoc.id === courseId)
      );

      if (courseInCart) {
        const existingCoupon = appliedCoupons.find((c) => c.id_khoahoc === courseId);
        if (existingCoupon) {
          toast.error("Một mã giảm giá đã được áp dụng cho khóa học này.");
          return;
        }

        const newCoupon = {
          id_magiamgia: promo.magiamgia.id,
          id_khoahoc: courseId,
          giamgia: promo.magiamgia.giamgia,
        };

        const updatedCoupons = [...appliedCoupons, newCoupon];
        setAppliedCoupons(updatedCoupons);
        if (typeof window !== 'undefined') {
          localStorage.setItem("appliedCoupons", JSON.stringify(updatedCoupons));
        }
        toast.success("Mã giảm giá áp dụng thành công!");
      } else {
        toast.error("Mã giảm giá không áp dụng cho bất kỳ khóa học nào trong giỏ hàng.");
      }
    } else {
      toast.error("Mã giảm giá không hợp lệ.");
    }
  };

  const NguoiDung = typeof window !== 'undefined' ? localStorage.getItem('data') : null;
  const parsedData = NguoiDung ? JSON.parse(NguoiDung) : null;
  let sum = 0;
  return (
    <div className='container mt-80'>
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />
      <main className="">
        <h1 className="display-4 text-center my-20 font-bold text-black">
          🛒 Giỏ Hàng Của Tôi
        </h1>

        {cartItems.length === 0 ? (
          // Empty cart message
          <div className="text-center py-20">
            <FaShoppingCart className="mx-auto text-gray-400 text-9xl mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Giỏ hàng của bạn đang trống</h2>
            <p className="text-gray-500 mb-8">Hãy thêm khóa học vào giỏ hàng để tiến hành thanh toán</p>
            <Link
              href="/"
              className="bg-gradient-to-r from-blue-900 via-pink-700 to-pink-700 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
            >
              Khám phá khóa học
            </Link>
          </div>
        ) : (
          // Existing cart content
          <div className="container flex flex-col md:flex-row justify-between items-start">
            {/* Giỏ Hàng Của Tôi */}
            <div className="w-full md:w-2/2 ">
              <div
                className="table-responsive shadow-lg p-4 mb-5 bg-white rounded-xl hover:shadow-2xl transition-all duration-500 animate-slideIn"
                style={{ maxWidth: '100%' }}
              >
                <table className="table table-hover align-middle">
                  <thead>
                    <tr className="text-black">
                      <th className="py-4 text-xl"></th>
                      <th className="py-4 text-xl">Hình ảnh</th>
                      <th className="py-4 text-xl">Sản phẩm</th>
                      <th className="py-4 text-xl">Giá</th>
                      <th className="py-4 text-xl">Giảm Giá</th>
                      <th className="py-4 text-xl">Tổng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) =>
                      item.khoahocs.map((khoahoc, subIndex) => {
                        const coupon = appliedCoupons.find(c => c.id_khoahoc === khoahoc.id);
                        const discountAmount = coupon ? (khoahoc.giamgia * coupon.giamgia) / 100 : 0;
                        const finalPrice = khoahoc.giamgia - discountAmount;

                        return (
                          <tr
                            key={`${index}-${subIndex}`}
                            className="hover:bg-gray-50 transition-all duration-300 animate-fadeIn"
                            style={{
                              fontSize: '1.1em',
                              height: '80px',
                              animation: `fadeIn 0.5s ease-out ${(index + subIndex) * 0.1}s`,
                            }}
                          >
                            <td className="text-center">
                              <button className="btn w-14 btn-outline-danger btn-sm rounded-circle p-2 hover:scale-125 hover:rotate-12 transition-all duration-300">
                                <i
                                  onClick={() => xoagiohang(khoahoc.id)}
                                  className="bi bi-trash text-2xl"
                                ></i>
                              </button>
                            </td>
                            <td className="flex items-center justify-center w-[120px] h-[120px]">
                              <Image
                                width={120}
                                height={120}
                                src={khoahoc.hinh}
                                className="rounded-lg shadow-sm hover:scale-110 hover:rotate-2 transition-all duration-300 w-full h-full object-cover"
                                alt={khoahoc.ten}
                              />
                            </td>
                            <td className="font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-300">
                              <h3 className="text-2xl">{khoahoc.ten}</h3>
                            </td>
                            <td className="text-gray-600 text-2xl">đ{khoahoc.gia.toLocaleString()}</td>
                            <td className="text-gray-600 text-2xl">{khoahoc.giamgia.toLocaleString()}</td>
                            <td className="font-bold text-black animate-numberChange text-2xl">
                              đ{finalPrice.toLocaleString()}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tổng Giỏ Hàng */}
            <div className="w-full md:w-1/3 pl-10 md:ml-4">
              <div className="card shadow-lg rounded-xl border-0 hover:shadow-2xl transition-all duration-500">
                <div className="card-header font-medium text-black rounded-t-xl">
                  <h3 className="mb-0 py-3 px-4 text-black text-2xl">
                    💰 Tổng Giỏ Hàng
                  </h3>
                </div>
                <div className="card-body p-4">
                  <table className="table mb-3">
                    <tbody>
                      <tr>
                        <th className="text-gray-600 text-2xl">Thành tiền</th>
                        <td className="text-right text-2xl">{totalBeforeDiscount.toLocaleString()} VNĐ</td>
                      </tr>
                      <tr>
                        <th className="text-gray-600 text-2xl">Giảm giá</th>
                        <td className="text-right text-2xl">-{totalDiscount}%</td>
                      </tr>
                      <tr>
                        <td colSpan="2" className="text-center py-4">
                          <button
                            className="bg-[#1e3c72] text-white font-bold py-3 px-6 rounded-md"
                            onClick={() => setIsModalOpen(true)}
                          >
                            🎫 Chọn Ưu Đãi
                          </button>
                        </td>
                      </tr>

                      {cartItems.map((item, index) =>
                        item.khoahocs.map((khoahoc, subIndex) => {
                          const coupon = appliedCoupons.find(c => c.id_khoahoc === khoahoc.id);
                          const discountAmount = coupon ? (khoahoc.giamgia * coupon.giamgia) / 100 : 0;
                          const finalPrice = khoahoc.giamgia - discountAmount;
                          sum += finalPrice;
                          return null; // Return null since we are not rendering anything here
                        })
                      )}
                      <tr>
                        <th className="text-2xl font-bold">Tổng Tiền</th>
                        <td className="text-right">
                          <strong className="text-2xl">
                            {sum.toLocaleString()} VNĐ
                          </strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {parsedData ? (
                    <div className="flex">
                      <Link
                        href="/page/checkout"
                        className="bg-gradient-to-r text-2xl from-blue-900 via-pink-700 to-pink-700 text-white font-bold py-4 px-6 rounded-xl text-center w-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
                      >
                        Tiến hành thanh toán →
                      </Link>
                    </div>
                  ) : (
                    <p className="text-center text-red-500 mt-3 font-semibold">
                      ⚠️ Vui Lòng Đăng Nhập
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Enhanced Modal Animation */}
      {isModalOpen && (
        <div
          className="modal fade show d-block animate-modalFadeIn"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
        >
          <div className="modal-dialog modal-dialog-centered animate-modalSlideIn">
            <div className="modal-content border-0 shadow-2xl rounded-xl">
              <div className="modal-header bg-gradient-to-r from-[#1e3c72] to-[#ff6b6b] text-white rounded-t-xl">
                <h5 className="modal-title font-bold ">Mã Giảm Giá</h5>
                <button
                  type="button"
                  className="btn-close hover:rotate-90 transition-all duration-300"
                  onClick={() => setIsModalOpen(false)}
                />
              </div>
              <div className="modal-body p-4">
                <Voucher handleApplyCoupon={handleApplyCoupon} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


const Voucher = ({ handleApplyCoupon }) => {
  const [vouchers, setVouchers] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [selectedVoucherId, setSelectedVoucherId] = useState(null);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await showAllNguoiDungMaGiamGia();
        setVouchers(response);
      } catch (error) {
        console.error('Fetch error:', error);
        toast.error("Voucher không hợp lệ.");
      }
    };

    fetchVouchers();
  }, []);

  const isVoucherValid = (voucher) => {
    const today = new Date();
    const startDate = new Date(voucher.magiamgia.ngaybatdau);
    const endDate = new Date(voucher.magiamgia.ngayketthuc);
    const withinDateRange = today >= startDate && today <= endDate;
    const notUsedUp = voucher.magiamgia.sudunghientai < voucher.magiamgia.luotsudung;
    const notUsed = voucher.trangthai !== 'Đã sử dụng';
    return withinDateRange && notUsedUp && notUsed;
  };

  const handleSelectVoucher = (voucher) => {
    if (isVoucherValid(voucher)) {
      setCouponCode(voucher.magiamgia.maso);
      setSelectedVoucherId(voucher.id);
    } else {
      toast.error("Mã phiếu giảm giá không hợp lệ, hết hạn, hoặc đã đạt tối đa lượt sử dụng.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const matchedVoucher = vouchers.find(
      (voucher) =>
        voucher.magiamgia.maso === couponCode && isVoucherValid(voucher)
    );
    if (matchedVoucher) {
      setSelectedVoucherId(matchedVoucher.id);
      handleApplyCoupon(e);
    } else {
      toast.error("Mã phiếu giảm giá không hợp lệ, hết hạn, hoặc đã đạt tối đa lượt sử dụng.");
    }
  };

  return (
    <>
      <div className="my-4">
        {/* Coupon input form */}
        <form className="mb-4 p-3 bg-light rounded shadow-sm" onSubmit={handleSubmit}>
          <div className="row g-2 align-items-center">
            <div className="col-md-8">
              <input
                type="text"
                name="coupon_code"
                className="form-control form-control-lg placeholder:text-xl pt-1"
                style={{ border: '1px solid gray', borderRadius: '0.5rem' }}
                placeholder="Nhập mã giảm giá"
                required
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value);
                  setSelectedVoucherId(null);
                }}
              />
            </div>
            <div className="col-md-4">
              <button type="submit" className="btn rounded-lg font-bold bg-pink-700 text-white btn-lg w-100 fw-bold hover-scale">
                <i className="fas fa-tag me-2"></i>Áp dụng
              </button>
            </div>
          </div>
          <small className="form-text text-muted mt- text-lg">
            <i className="fas fa-info-circle me-1"></i>
            Mỗi khóa học chỉ áp dụng được một mã giảm giá.
          </small>
        </form>

        {/* Voucher list */}
        <div className="voucher-list overflow-auto custom-scrollbar" style={{ maxHeight: '600px' }}>
          {vouchers.map(voucher => {
            const isSelected = selectedVoucherId === voucher.id;
            const isValid = isVoucherValid(voucher);
            const buttonClass = isSelected
              ? 'btn-warning disabled'
              : !isValid
                ? 'btn-secondary'
                : 'btn-outline-warning';

            return (
              <div
                key={voucher.id}
                className={`card mb-3 voucher-card hover-lift ${isSelected ? 'border-warning border-2' : 'border-secondary'} shadow-sm rounded`}
              >
                <div className="card-body position-relative p-4 mx-auto" style={{ width: '423.182px' }}>
                  {/* Status */}
                  <div className="bg-white text-xl text-sky-950 font-bold">
                    {voucher.trangthai === 'Đã sử dụng' ? 'Đã dùng' : 'Có sẵn'}
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="card-title fw-bold text-black mb-0 text-2xl py-1">
                      Mã: {voucher.magiamgia.maso}
                    </h4>
                    <span className={`badge ${voucher.magiamgia.trangthai === 'Đã Duyệt' ? 'bg-success' : 'bg-secondary'} px-3 py-2 text-lg`}>
                      {voucher.magiamgia.trangthai}
                    </span>
                  </div>

                  <div className="row g-3">
                    <div className="col-6">
                      <p className="card-text">
                        <i className="fas fa-percent font-bold me-2"></i>
                        <strong>Giảm giá:</strong> {voucher.magiamgia.giamgia}%
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="card-text">
                        <i className="fas fa-users font-bold me-2"></i>
                        <strong>Đã dùng:</strong> {voucher.magiamgia.sudunghientai}/{voucher.magiamgia.luotsudung}
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="card-text">
                        <i className="fas fa-calendar-alt font-bold me-2"></i>
                        <strong>Bắt đầu:</strong> {new Date(voucher.magiamgia.ngaybatdau).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="card-text">
                        <i className="fas fa-clock font-bold me-2"></i>
                        <strong>Hết hạn:</strong> {new Date(voucher.magiamgia.ngayketthuc).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <button
                    className={`btn ${buttonClass} btn-lg bg-gradient-to-r from-[#1e3c72] to-[#ff6b6b] w-100 mt-3 position-relative overflow-hidden text-white rounded-lg border-1 border-gray-200`}
                    onClick={() => handleSelectVoucher(voucher)}
                    disabled={!isValid || isSelected}
                  >
                    <i className={`fas ${isSelected ? 'fa-check' : 'fa-ticket-alt'} me-2`}></i>
                    {isSelected ? 'Đã chọn' : 'Chọn voucher'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Cart;
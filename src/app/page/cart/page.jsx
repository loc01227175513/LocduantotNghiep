"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../component/header/page';
import { TatCaKhuyenMaiKhoaHoc, showAllNguoiDungMaGiamGia } from '../../../service/khuyenmai/khuyenmai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
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
          discount += (khoahoc.giamgia * coupon.giamgia) / 100;
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

  return (<>
    <div className="p-4 bg-gradient-to-b from-gray-50 to-white min-h-screen animate-fadeIn">
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />
      <main className="mt-60 ">
        <div className="container">
          <h1 className="display-4 text-center mb-4 font-bold text-pink-700 ">
            🛒 Giỏ Hàng Của Tôi
          </h1>

          <div className="table-responsive shadow-lg p-4 mb-5 bg-white rounded-xl hover:shadow-2xl transition-all duration-500 animate-slideIn">
            <table className="table table-hover align-middle">
              <thead className="">
                <tr className="text-black">
                  <th className="py-4 text-xl"></th>
                  <th className="py-4 text-xl">Hình ảnh</th>
                  <th className="py-4 text-xl">Sản phẩm</th>
                  <th className="py-4 text-xl">Giá</th>
                  <th className="py-4 text-xl" >Giảm Giá</th>
                  <th className="py-4 text-xl">Tổng phụ</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  item.khoahocs.map((khoahoc, subIndex) => (
                    <tr key={`${index}-${subIndex}`}
                      className="hover:bg-gray-50 transition-all duration-300 animate-fadeIn"
                      style={{
                        fontSize: '1.1em',
                        height: '80px',
                        animation: `fadeIn 0.5s ease-out ${(index + subIndex) * 0.1}s`
                      }}>
                      <td className='text-center'>
                        <button className="btn w-14 btn-outline-danger btn-sm rounded-circle p-2 hover:scale-125 hover:rotate-12 transition-all duration-300">
                          <i onClick={() => xoagiohang(khoahoc.id)} className="bi bi-trash text-2xl"></i>
                        </button>
                      </td>
                      <td>
                        <Image
                          width={500}
                          height={300}
                          src={khoahoc.hinh}
                          className="img-fluid rounded-lg shadow-sm hover:scale-110 hover:rotate-2 transition-all duration-300"
                          alt={khoahoc.ten}
                          style={{ maxWidth: '120px' }}
                        />
                      </td>
                      <td className="font-semibold  text-gray-800 hover:text-indigo-600 transition-colors duration-300">
                        <h3 className='text-2xl'>{khoahoc.ten}</h3>
                      </td>
                      <td className="text-gray-600  text-2xl ">đ{khoahoc.gia}</td>
                      <td className="text-gray-600  text-2xl">{khoahoc.giamgia} </td>
                      <td className="font-bold text-black animate-numberChange text-2xl">đ{khoahoc.giamgia}</td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>

          <div className="row justify-content-end mt-4">
            <div className="col-md-6 animate-slideInRight">
              <div className="card shadow-lg rounded-xl border-0 hover:shadow-2xl transition-all duration-500">
                <div className="card-header font-medium   text-black rounded-t-xl">
                  <h3 className="mb-0 py-3 px-4 text-black text-2xl">💰 Tổng Giỏ Hàng</h3>
                </div>
                <div className="card-body p-4">
                  <table className="table mb-3">
                    <tbody>
                      <tr>
                        <th className="text-gray-600 text-2xl">Thành tiền</th>
                        <td className="text-right text-2xl">{totalBeforeDiscount} VNĐ</td>
                      </tr>
                      <tr>
                        <th className="text-gray-600 text-2xl">Giảm giá</th>
                        <td className="text-right text-2xl ">-{totalDiscount} VNĐ</td>
                      </tr>
                      <div className='relative w-full'>


                        <tr className=' '>
                          <td colSpan="6" className="text-center py-4  ">
                            <button
                              className=" bg-[#1e3c72] text-white font-bold py-3 px-6 text-right rounded-md  "
                              onClick={() => setIsModalOpen(true)}
                            >
                              🎫 Chọn Ưu Đãi
                            </button>
                          </td>
                        </tr>

                      </div>

                      <tr className="">
                        <th className=" text-2xl font-bold">Tổng Tiền</th>
                        <td className="text-right"><strong className="text-2xl  ">{totalBeforeDiscount - totalDiscount} VNĐ</strong></td>
                      </tr>
                    </tbody>
                  </table>
                  {parsedData ? (
                    <div className="flex">
                      <a href="/page/checkout"
                        className="bg-gradient-to-r text-3xl from-[#1e3c72] to-[#ff6b6b] text-white font-bold py-4 px-6 rounded-xl text-center w-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
                        Tiến hành thanh toán →
                      </a>
                    </div>
                  ) : (
                    <p className="text-center text-red-500 mt-3 font-semibold">⚠️ Vui Lòng Đăng Nhập</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
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

    <style>{`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideIn {
      from { transform: translateX(-100px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideInRight {
      from { transform: translateX(100px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes bounce-soft {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }
    
    @keyframes numberChange {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
    
    @keyframes modalFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes modalSlideIn {
      from { transform: translateY(-50px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
    .animate-slideIn { animation: slideIn 0.5s ease-out; }
    .animate-slideInRight { animation: slideInRight 0.5s ease-out; }
    .animate-bounce-soft { animation: bounce-soft 2s infinite; }
    .animate-numberChange { animation: numberChange 0.3s ease-out; }
    .animate-modalFadeIn { animation: modalFadeIn 0.3s ease-out; }
    .animate-modalSlideIn { animation: modalSlideIn 0.3s ease-out; }
    /* Import fonts */
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Playfair+Display:wght@700;900&display=swap');

  /* Apply base fonts */
  body {
    font-family: 'Poppins', sans-serif;
  }

  /* Enhanced heading */
  h1.display-4 {
    font-family: 'Playfair Display', serif;
    font-weight: 900;
    font-size: 3.5rem;
    letter-spacing: -0.02em;
    text-shadow: 2px 2px 4px rgba(79, 70, 229, 0.2);
  }

  /* Table headers */
  thead tr th {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    font-size: 0.9rem;
  }

  /* Product names */
  td.font-semibold {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    letter-spacing: 0.3px;
    font-size: 1.1rem;
  }

  /* Prices */
  .text-2xl.text-indigo-700 {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    letter-spacing: -0.5px;
  }

  /* Cart total heading */
  .card-header h3 {
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  /* Checkout button */
  .bg-gradient-to-r {f
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    font-size: 1.1rem;
  }

  /* Modal title */
  .modal-title {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 1.5rem;
    letter-spacing: -0.02em;
  }
    /* Enhanced Animations */
  @keyframes fadeIn {
    from { 
      opacity: 0;
      transform: translateY(30px) scale(0.95);
      filter: blur(5px);
    }
    to { 
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }

  @keyframes slideIn {
    0% {
      transform: translateX(-100px) skewX(15deg);
      opacity: 0;
    }
    100% {
      transform: translateX(0) skewX(0);
      opacity: 1;
    }
  }

  @keyframes slideInRight {
    0% {
      transform: translateX(100px) rotate(-5deg);
      opacity: 0;
    }
    100% {
      transform: translateX(0) rotate(0);
      opacity: 1;
    }
  }

  @keyframes bounce-soft {
    0%, 100% { 
      transform: translateY(0) scale(1);
    }
    50% { 
      transform: translateY(-8px) scale(1.02);
    }
  }

  @keyframes numberChange {
    0% { 
      transform: scale(1);
      color: #4F46E5;
    }
    50% { 
      transform: scale(1.2);
      color: #7C3AED;
    }
    100% { 
      transform: scale(1);
      color: #4F46E5;
    }
  }

  @keyframes modalFadeIn {
    from { 
      opacity: 0;
      backdrop-filter: blur(0);
    }
    to { 
      opacity: 1;
      backdrop-filter: blur(8px);
    }
  }

  @keyframes modalSlideIn {
    0% {
      transform: translateY(-100px) scale(0.8);
      opacity: 0;
    }
    100% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  /* Apply animations */
  .animate-fadeIn {
    animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .animate-slideIn {
    animation: slideIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .animate-slideInRight {
    animation: slideInRight 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .animate-bounce-soft {
    animation: bounce-soft 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  .animate-numberChange {
    animation: numberChange 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .animate-modalFadeIn {
    animation: modalFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .animate-modalSlideIn {
    animation: modalSlideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* Shimmer effect for loading states */
  .animate-shimmer {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 1000px 100%;
    animation: shimmer 2s infinite linear;
  }

  /* Hover effects */
  .table tr:hover {
    transform: scale(1.01) translateX(5px);
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .card:hover {
    transform: translateY(-5px) scale(1.02);
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* Button animations */
  button:active {
    transform: scale(0.95);
    transition: transform 0.1s;
  }

  .btn-checkout:hover {
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
    100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
  }
  `}</style>
  </>

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
        alert("Failed to fetch vouchers.");
      }
    };

    fetchVouchers();
  }, []);

  const handleSelectVoucher = (voucher) => {
    setCouponCode(voucher.magiamgia.maso);
    setSelectedVoucherId(voucher.id);
  };
  console.log(vouchers);

  return (
    <>
      <div className="container my-4">
        {/* Coupon input form with enhanced styling */}
        <form className="mb-4 p-3 bg-light rounded shadow-sm" onSubmit={handleApplyCoupon}>
          <div className="row g-2 align-items-center">
            <div className="col-md-8 ">
              <input
                type="text"
                name="coupon_code"
                className="form-control form-control-lg  placeholder:text-xl pt-1"
                style={{ border: '1px solid gray' , borderRadius: '0.5rem'  }}
                placeholder="Nhập mã giảm giá"
                required
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <button type="submit" className="btn rounded-lg font-bold bg-pink-700 text-white btn-lg w-100 fw-bold hover-scale ">
                <i className="fas fa-tag me-2"></i>Áp dụng
              </button>
            </div>
          </div>
          <small className="form-text text-muted mt- text-lg">
            <i className="fas fa-info-circle me-1 "></i>
            Mỗi khóa học chỉ áp dụng được một mã giảm giá.
          </small>
        </form>

        {/* Voucher list with animations and enhanced styling */}
        <div className="voucher-list overflow-auto custom-scrollbar" style={{ maxHeight: '600px' }}>
          {vouchers.map(voucher => {
            const isSelected = selectedVoucherId === voucher.id;
            const isUsed = voucher.trangthai === 'Đã sử dụng';
            const buttonClass = isSelected
              ? 'btn-warning disabled'
              : isUsed
                ? 'btn-secondary'
                : 'btn-outline-warning';

            return (
              <div
                key={voucher.id}
                className={`card mb-3 voucher-card hover-lift ${isSelected ? 'border-warning border-2' : 'border-secondary'
                  } shadow-sm rounded`}
              >
                <div className="card-body position-relative p-4">
                  {/* Diagonal ribbon for status */}
                  <div className={` ${isUsed ? 'bg-white' :"bg-white"} text-xl text-sky-950 font-bold`}>
                    {isUsed ? 'Đã dùng' : 'Có sẵn'}
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="card-title fw-bold text-black mb-0 text-2xl py-1">
                     Mã: {voucher.magiamgia.maso}
                    </h4>
                    <span className={`badge ${voucher.magiamgia.trangthai === 'Đã Duyệt' ? 'bg-success' : 'bg-secondary'
                      } px-3 py-2 text-lg`}>
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
                        <strong>Đã dùng:</strong> {voucher.magiamgia.sudunghientai}
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
                    className={`btn ${buttonClass} btn-lg bg-gradient-to-r from-[#1e3c72] to-[#ff6b6b]  w-100 mt-3 position-relative overflow-hidden text-white rounded-lg border-1 border-gray-200`}
                    onClick={() => handleSelectVoucher(voucher)}
                    disabled={isSelected || isUsed}
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
    </>

  );
}

export default Cart;
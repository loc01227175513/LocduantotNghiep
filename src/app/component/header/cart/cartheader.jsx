import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image';
const Cart = ({ onAction }) => {








    const router = useRouter();
    const openCart = () => {
        router.push('/page/cart');
    };
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const userData = localStorage.getItem('data');

        if (userData) {
            try {
                const parsedData = JSON.parse(userData);

                axios.post('https://huuphuoc.id.vn/api/showgiohang', { id_nguoidung: parsedData.id })
                    .then(response => {
                        setCartItems(response.data.data);

                        // Calculate total discounted price
                        const totalDiscountedPrice = response.data.data.reduce((sum, item) => {
                            return sum + item.khoahocs.reduce((itemSum, khoahoc) => itemSum + khoahoc.giamgia, 0);
                        }, 0);
                        setTotalPrice(totalDiscountedPrice);
                    })
                    .catch(() => {
                        // Do nothing
                    });
            } catch {
                // Do nothing
            }
        } else {
            // Do nothing
        }
    }, []);

    const xoagiohang = async (id) => {
        try {
            const userData = localStorage.getItem('data');
            const parsedData = JSON.parse(userData);
            if (!parsedData) {
                return null;
            }

            const payload = {
                id_khoahoc: id,
                id_nguoidung: parsedData.id,
            };
            toast.error('Xóa khóa học thành công');
            await axios.post('https://huuphuoc.id.vn/api/xoasanphamadd', payload);
            window.location.href = '/';
        } catch {
            // Do nothing
        }
    };
    const userData = localStorage.getItem('data');

    console.log('cartItems', cartItems);































    return (
              <div className='fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm transition-all duration-300 h-screen'>
          <div className='trong cursor-pointer' onClick={onAction}></div>
          <div className='fixed right-0 top-0 h-full w-full max-w-[480px] bg-white/95 backdrop-blur shadow-2xl transform transition-all duration-500 ease-out translate-x-0 animate-[slideIn_0.5s_ease-out]'>
            {/* Header */}
            <div className='sticky top-0 z-10 flex items-center justify-between pl-5 pt-4 pb-4 border-b border-orange-200 bg-gradient-to-r from-blue-900 via-pink-700 to-pink-700'>
              <h6 className='text-2xl text-white flex items-center gap-3 ' style={{ fontWeight: '500' }}>
                <i className='bi bi-cart3 text-2xl text-white'></i>
                Giỏ hàng của tôi
              </h6>
              <button onClick={onAction}
                className='p-2 rounded-full  w-10 hover:bg-red-50 text-gray-500 hover:text-red-500 transition-all duration-300 hover:rotate-90'>
                <i className='bi bi-x-lg text-2xl text-white'></i>
              </button>
            </div>
        
            {/* Cart Items */}
            <div className='overflow-y-auto h-[calc(100vh-180px)] scrollbar-thin scrollbar-thumb-orange-200'>
              <ul className='divide-y divide-gray-100/80'>
                {cartItems.map((item, index) => (
                  item.khoahocs.map((khoahoc, subIndex) => (
                    <li key={`${index}-${subIndex}`}
                      className='p-5 hover:bg-orange-50/50 transition-all duration-300 animate-[fadeInUp_0.5s_ease-out]'>
                      <div className='flex space-x-4'>
                        <div className='flex-shrink-0 group'>
                          <Image
                            width={160}
                            height={90}
                            src={khoahoc.hinh}
                            alt={khoahoc.ten}
                            className='rounded-xl object-cover shadow-md group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105'
                          />
                        </div>
                        <div className='flex-1'>
                          <h6 className='text-gray-900 hover:text-pink-700 transition-colors line-clamp-2 text-2xl'>
                            {khoahoc.ten}
                          </h6>
                          <div className='inline-flex items-center px-3 py-1 mt-2 text-xl bg-gray-300 rounded-full'>
                            <i className='bi bi-person-video3 mr-2 text-xl'></i>
                            {khoahoc.tenGiangVien}
                          </div>
                          <div className='mt-3 flex items-center gap-3'>
                            <span className='text-2xl font-bold relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-[shine_2s_infinite]'>
                              {khoahoc.giamgia}VNĐ
                            </span>
                            <span className='text-gray-400 line-through text-xl'>{khoahoc.gia}VNĐ</span>
                          </div>
                        </div>
                        <div className='flex items-start space-x-2'>
                          <a href={`/page/course-detail?id=${khoahoc.id}`}
                            className='p-2.5 hover:text-blue-500 rounded-full transition-all duration-300 hover:scale-110'>
                            <i className='bi bi-pencil-square text-2xl'></i>
                          </a>
                          <button onClick={() => xoagiohang(khoahoc.id)}
                            className='p-2.5 hover:text-red-500 rounded-full transition-all duration-300 hover:scale-110'>
                            <i className='bi bi-trash3 text-2xl'></i>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))
                ))}
              </ul>
            </div>
        
            {/* Footer */}
            <div className='absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-orange-100 p-5 shadow-lg'>
              <div className='flex justify-between items-center mb-4'>
                <span className='text-2xl text-gray-800'>Tổng cộng</span>
                <span className='text-3xl animate-pulse'>{totalPrice}VNĐ</span>
              </div>
              <div className='space-y-3'>
                {userData ? (
                  <>
                    <a href="/page/checkout" className='block transform hover:scale-[1.02] transition-all duration-300'>
                      <button className='w-full py-3.5 bg-gradient-to-r from-blue-900 via-pink-700 to-pink-700 hover:from-pink-700 hover:to-pink-700 text-white rounded-xl transition-all duration-300 shadow-lg animate-[pulse_2s_infinite] text-2xl'>
                        Tiến hành thanh toán
                      </button>
                    </a>
                    <button onClick={() => openCart()}
                      className='w-full py-3.5 border-2 border-orange-500 text-gray-700 hover:bg-pink-50 rounded-xl transition-all duration-300 text-2xl'>
                      Xem giỏ hàng
                    </button>
                  </>
                ) : (
                  <a href="/page/login" className='block transform hover:scale-[1.02] transition-all duration-300'>
                    <button className='w-full py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-200'>
                      Đăng nhập
                    </button>
                  </a>
                )}
              </div>
            </div>
          </div>
          <ToastContainer />
          <style jsx>{`@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes shine {
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`}</style>
        </div>
    );
};

export { Cart };
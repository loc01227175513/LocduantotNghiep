"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TinhMaGiamGia } from "../../../../service/khuyenmai/khuyenmai";
import Image from "next/image";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";

const Page = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const MaGiamGia =
    typeof window !== "undefined"
      ? localStorage.getItem("appliedCoupons")
      : null;
  const MaArray = MaGiamGia ? JSON.parse(MaGiamGia) : [];
  // console.log(MaArray[0]?.id_magiamgia, "id_magiamgia");

  const [newItem, setNewItem] = useState({
    ten: "",
    gia: "",
    soluong: "",
    hinh: "",
    tenGiangVien: "",
    trangthai: "",
    danhgia: [],
  });
  const [paymentDetails, setPaymentDetails] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const userData =
      typeof window !== "undefined" ? localStorage.getItem("data") : null;
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        const fetchData = () => {
          axios
            .post(
              "https://huuphuoc.id.vn/api/showgiohang",
              { id_nguoidung: parsedData.id },
              { referrerPolicy: "unsafe-url" }
            )
            .then((response) => {
              setCartItems(response.data.data);
              const total = response.data.data.reduce((sum, item) => {
                return (
                  sum +
                  item.khoahocs.reduce(
                    (itemSum, khoahoc) => itemSum + khoahoc.giamgia,
                    0
                  )
                );
              }, 0);
              setTotalPrice(total);
              const totalDiscount = KiemTraKhoaHocGiamGia();
              setDiscount(totalDiscount);
            })
            .catch(() => {
              // Do nothing
            });
        };
        fetchData();
        const interval = setInterval(fetchData, 5000); // Fetch every 5 seconds
        return () => clearInterval(interval);
      } catch {
        // Do nothing
      }
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("appliedCoupons");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleCheckOutStriper = async () => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    // Calculate total with proper discount application
    const calculatedTotalPrice = cartItems.reduce((acc, item) => {
      return acc + item.khoahocs.reduce((sum, khoahoc) => {
        // Get base price without rounding first
        const basePrice = Number(khoahoc.giamgia);

        // Find the coupon for this course
        const coupon = MaArray.find(c => c.id_khoahoc === khoahoc.id);
        const discountPercentage = coupon ? Number(coupon.giamgia) : 0;

        // Calculate discount amount
        const discountAmount = basePrice * (discountPercentage / 100);

        // Calculate final price after discount
        const finalPrice = basePrice - discountAmount;

        return sum + finalPrice;
      }, 0);
    }, 0);

    // Round to ensure whole numbers
    const totalPrice = calculatedTotalPrice;

    const response = await axios.post("https://huuphuoc.id.vn/api/ThanhToanStripe", {
      total: totalPrice,
      id_nguoidung: JSON.parse(localStorage.getItem("data")).id,
      id_khoahoc: cartItems.flatMap(item => item.khoahocs.map(khoahoc => khoahoc.id)),
      id_giangvien: cartItems.flatMap(item => item.khoahocs.map(khoahoc => khoahoc.id_giangvien)),
      gia: cartItems.flatMap(item => item.khoahocs.map(khoahoc => khoahoc.gia)),
      giamgia: cartItems.flatMap(item => item.khoahocs.map(khoahoc => khoahoc.giamgia)),
      id_giohang: cartItems.map(item => item.id),
    }, {
      referrerPolicy: "unsafe-url",
    });

    const sessionId = response.data.session_id;
    const result = await stripe.redirectToCheckout({ sessionId });

    if (result.error) {
      setErrorMessage(result.error.message);
    }
  };

  // Helper function to calculate discounted price and return integer
  const calculateDiscountedPrice = (price, discountPercentage) => {
    return Math.round(price * (1 - discountPercentage / 100));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const KiemTraKhoaHocGiamGia = () => {
    const giamgia =
      typeof window !== "undefined"
        ? localStorage.getItem("appliedCoupons")
        : null;
    if (giamgia) {
      const coupons = JSON.parse(giamgia);
      let totalDiscountPercentage = 0;
      coupons.forEach((coupon) => {
        totalDiscountPercentage += coupon.giamgia;
      });
      return totalDiscountPercentage;
    }
    return 0;
  };

  const validateCardDetails = () => {
    const [month, year] = paymentDetails.expiryDate.split("/");
    axios
      .post(
        "https://huuphuoc.id.vn/api/thenganhang",
        {
          tenthe: paymentDetails.nameOnCard,
          sothe: paymentDetails.cardNumber,
          thang: month,
          nam: year,
          mabaomat: paymentDetails.cvc,
        },
        {
          referrerPolicy: "unsafe-url",
        }
      )
      .then((response) => {
        if (response.data.success) {
          setValidationMessage("Card details are valid.");
          setErrorMessage("");
        } else {
          setValidationMessage("");
          setErrorMessage(
            "Thẻ ngân hàng không hợp lệ. Vui lòng kiểm tra lại thông tin thẻ."
          );
        }
      })
      .catch(() => {
        setValidationMessage("");
        setErrorMessage(
          "Thẻ ngân hàng không hợp lệ. Vui lòng kiểm tra lại thông tin thẻ."
        );
      });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      !paymentDetails.nameOnCard ||
      !paymentDetails.cardNumber ||
      !paymentDetails.expiryDate ||
      !paymentDetails.cvc
    ) {
      setErrorMessage("Vui lòng nhập đầy đủ thông tin thẻ ngân hàng.");
      return;
    }
    const [month, year] = paymentDetails.expiryDate.split("/");
    try {
      const cardResponse = await axios.post(
        "https://huuphuoc.id.vn/api/thenganhang",
        {
          tenthe: paymentDetails.nameOnCard,
          sothe: paymentDetails.cardNumber,
          thang: month,
          nam: year,
          mabaomat: paymentDetails.cvc,
          total: totalPrice,
        },
        {
          referrerPolicy: "unsafe-url",
        }
      );

      if (cardResponse.data.success) {
        const paymentResponse = await axios.post(
          "https://huuphuoc.id.vn/api/thanhtoan",
          {
            total: totalPrice - (totalPrice * discount) / 100,
            id_nguoidung:
              typeof window !== "undefined"
                ? JSON.parse(localStorage.getItem("data")).id
                : null,
            id_khoahoc: cartItems.map((item) =>
              item.khoahocs.map((khoahoc) => khoahoc.id)
            ),
            id_giangvien: cartItems.map((item) =>
              item.khoahocs.map((khoahoc) => khoahoc.id_giangvien)
            ),
            gia: cartItems.map((item) =>
              item.khoahocs.map((khoahoc) => khoahoc.gia)
            ),
            giamgia: cartItems.map((item) =>
              item.khoahocs.map((khoahoc) => khoahoc.giamgia)
            ),
            id_giohang: cartItems.map((item) => item.id),
          },
          {
            referrerPolicy: "unsafe-url",
          }
        );

        if (paymentResponse.data.success) {
          await axios.post(
            "https://huuphuoc.id.vn/api/xoagiohang",
            {
              total: totalPrice.toFixed(2),
              id_nguoidung:
                typeof window !== "undefined"
                  ? JSON.parse(localStorage.getItem("data")).id
                  : null,
              id_khoahoc: cartItems.map((item) =>
                item.khoahocs.map((khoahoc) => khoahoc.id)
              ),
            },
            {
              referrerPolicy: "unsafe-url",
            }
          );

          await TinhMaGiamGia();
          if (typeof window !== "undefined") {
            window.location.href = "/";
          }
          setValidationMessage("Thanh toán thành công.");
          setErrorMessage("");
        } else {
          setValidationMessage("");
          setErrorMessage(
            "Thanh toán thất bại. Vui lòng kiểm tra lại thông tin thẻ."
          );
        }
      } else {
        setValidationMessage("");
        setErrorMessage(
          "Thanh toán thất bại. Vui lòng kiểm tra lại thông tin thẻ."
        );
      }
    } catch {
      window.location.reload();
    }
  };
  let sum = 0;
  return (
    <div className="container mx-auto mt-60 px-4">
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-8">
        <div className="mx-auto">
          {/* Animated Header */}
          <h1 className="text-5xl mb-20 font-semibold  text-center animate-fade-in relative">
            <span className="absolute -inset-1 blur-2xl  opacity-30"></span>
            <span className="relative text-black">Thanh Toán</span>
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-16 animate-fade-in-up">
              <div className="mb-4">
                <span className="material-icons text-5xl text-gray-400">
                  Mua sắm_Cart
                </span>
              </div>
              <p className="text-2xl text-gray-600 mb-4">
                Giỏ hàng của bạn đang trống
              </p>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-700 to-pink-700 text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <span className="material-icons mr-2 text-2xl">
                  Khám phá khóa học
                </span>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-10 justify-center">
              {/* Cart Items Section */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
                  <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-black to-black">
                    Các khóa học trong giỏ hàng
                  </h2>
                  <div className="space-y-6">
                    {cartItems.map((item) =>
                      item.khoahocs.map((khoahoc) => {
                        const coupon = MaArray.find(c => c.id_khoahoc === khoahoc.id);
                        const discountPercentage = coupon ? coupon.giamgia : 0;
                        const discountedPrice = calculateDiscountedPrice(khoahoc.giamgia, discountPercentage);

                        return (
                          <div
                            key={khoahoc.id}
                            className="flex items-center p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-gray-100 hover:border-purple-200 hover:shadow-lg transform hover:scale-[1.02]"
                          >
                            <div className="relative group">
                              <Image
                                width={250}
                                height={150}
                                src={khoahoc.hinh}
                                alt={khoahoc.ten}
                                className="w-52 h-32 object-cover rounded-xl shadow-md group-hover:shadow-xl transition-all duration-300"
                              />
                              <div className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold shadow-lg">
                                -{discountPercentage}%
                              </div>
                            </div>
                            <div className="flex-grow ml-6">
                              <h3 className="text-[16px] font-bold text-gray-800 mb-2 hover:text-purple-600 transition-colors">
                                {khoahoc.ten}
                              </h3>
                              <p className="text-gray-600 flex items-center mb-2 text-[14px]">
                                <span className="material-icons mr-1 text-[14px]">
                                  Giảng viên:
                                </span>
                                {khoahoc.tenGiangVien}
                              </p>
                              <div className="flex items-center">
                                <p className="text-2xl font-bold text-pink-700">
                                  {discountedPrice.toLocaleString()}
                                  VNĐ
                                </p>
                                <p className="text-gray-500 line-through ml-2 text-2xl">
                                  {khoahoc.gia.toLocaleString()}
                                 VNĐ
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
                {/* Order Summary */}
                <div className="bg-gradient-to-br from-white to-white rounded-xl shadow-lg p-6 border border-purple-200">
                  <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-black to-black">
                    Tóm Tắt Đơn Hàng
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4">
                      <span className="text-gray-600 text-2xl font-medium">Tổng cộng:</span>
                      <span className="text-2xl font-bold text-gray-800">
                        {totalPrice.toLocaleString()}VNĐ
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-4">
                      <span className="text-gray-600 text-2xl font-medium">Giảm giá:</span>
                      <span className="text-2xl font-bold text-red-500">
                        -{discount}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-purple-200">
                      <span className="text-gray-800 font-medium text-2xl">
                        Thành tiền:
                      </span>
                      {cartItems.map((item) =>
                        item.khoahocs.map((khoahoc) => {
                          const coupon = MaArray.find(c => c.id_khoahoc === khoahoc.id);
                          const discountPercentage = coupon ? coupon.giamgia : 0;
                          const discountedPrice = calculateDiscountedPrice(khoahoc.giamgia, discountPercentage);
                          sum += discountedPrice; // Add discountedPrice to sum
                          return null; // Return null since we are not rendering anything here
                        })
                      )}
                      <span className="text-3xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-pink-700">
                        {sum.toLocaleString()}
                        VNĐ
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phương thức Section */}
              <div className="w-full lg:w-1/4 space-y-6">
                {/* Payment Form */}
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 border border-purple-100">
                  <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-black to-black  ">
                    Phương thức - thông tin
                  </h2>
                  {errorMessage && (
                    <div className="mb-6 p-4 text-[14px] bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                      {errorMessage}
                    </div>
                  )}
                  {validationMessage && (
                    <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded">
                      {validationMessage}
                    </div>
                  )}
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="mb-6">
                      <label className="font-medium text-gray-700 text-2xl pb-2">
                        Chọn phương thức
                      </label>
                                         <div className="flex items-center mb-4 p-3">
                        <button
                          className="text-blue-600 hover:text-blue-700 font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center border border-blue-600"
                          onClick={handleCheckOutStriper}
                        >
                          <svg className="w-10 h-10 mr-3" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                            <path
                              fill="#6772e5"
                              d="M18 0C8.06 0 0 8.06 0 18s8.06 18 18 18 18-8.06 18-18S27.94 0 18 0zm-.86 27.1c-3.7 0-6-1.92-6-5.5 0-4.42 3.94-5.47 7.62-5.62V14.2h-1.32c-3.47 0-5.88 1.26-5.88 3.52v.32h2.06v-.2c0-1.5 1.24-2.22 3.04-2.22h2.66v2.6h-2.36c-2.5 0-2.86 1.14-2.86 2.04v.74c0 .9.34 2.04 2.86 2.04h1.1c2.7 0 3.9-1.4 3.9-3.02 0-3.02-3.04-3.34-6.16-3.34-.9 0-1.66.02-2.32.18v-5.66h8.32v2.6h-6.24v1.94c.64-.2 1.36-.26 2.04-.26 2.88 0 4.86 1.12 4.86 3.32 0 2.72-2.42 3.68-4.46 3.68h-2.2zm0-7.02h.02v.02h-.02v-.02z"
                            />
                          </svg>
                          <span className="text-2xl">Thanh toán Stripe</span>
                        </button>
                      </div>

                      <div className="flex items-center mb-4 p-3">
                        <input
                          type="radio"
                          id="check"
                          name="check"
                          value="ATM"
                          checked
                          className="mr-3 text-2xl"
                        />
                        <label htmlFor="vehicle3">
                          <span className="text-2xl">Thanh toán ATM</span>
                        </label>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="font-medium text-gray-700 text-2xl pb-2">
                        Tên trên thẻ
                      </label>
                      <input
                        type="text"
                        name="nameOnCard"
                        value={paymentDetails.nameOnCard}
                        onChange={handlePaymentInputChange}
                        onBlur={validateCardDetails}
                        className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-2xl"
                        required
                        placeholder="Tên trên thẻ"
                        style={{ fontSize: '14px' }}
                      />
                    </div>
                    <div className="mb-6">
                      <label className="font-medium text-gray-700 text-2xl pb-2">
                        Mã số thẻ
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentDetails.cardNumber}
                        onChange={handlePaymentInputChange}
                        onBlur={validateCardDetails}
                        className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-2xl"
                        required
                        placeholder="Mã số thẻ"
                        style={{ fontSize: '14px' }}  
                      />
                    </div>
                    <div className="flex mb-6">
                      <div className="w-1/2 pr-3">
                        <label className="font-medium text-gray-700 text-2xl pb-2">
                          Ngày cấp
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={paymentDetails.expiryDate}
                          onChange={handlePaymentInputChange}
                          onBlur={validateCardDetails}
                          className="w-full p-4 mt-2 border placeholder:text-[14px] border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-2xl"
                          placeholder="MM/YY"
                          required
                          style={{ fontSize: '14px' }}
                        />
                      </div>
                      <div className="w-1/2 pl-3">
                        <label className="font-medium text-gray-700 text-2xl pb-2">
                          CVC/CVV
                        </label>
                        <input
                          type="text"
                          name="cvc"
                          value={paymentDetails.cvc}
                          onChange={handlePaymentInputChange}
                          onBlur={validateCardDetails}
                          className="w-full p-4 mt-2 border placeholder:text-[14px] text-[14px] border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-2xl"
                          placeholder="CVC/CVV"
                          required
                          style={{ fontSize: '14px' }}
                        />
                      </div>
                    </div>
                       <button
                      type="submit"
                      className="w-full text-2xl font-bold  mb-6 bg-gradient-to-r from-blue-900 via-pink-700 to-pink-700 text-white py-4 rounded-lg  hover:from-pink-700 hover:to-pink-800 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                    >
                      Thanh Toán  
                        <span className="pl-1"> { (totalPrice - (totalPrice * discount) / 100).toLocaleString()}</span>VNĐ
                    </button>
                    <Link href={`/`}>
                      <p className="text-center mt-3 text-gray-500 text-2xl">Quay lại</p>
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
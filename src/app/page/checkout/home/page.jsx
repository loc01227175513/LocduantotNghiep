"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TinhMaGiamGia } from "../../../../service/khuyenmai/khuyenmai";
import Image from "next/image";
import Link from "next/link";
const Page = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const MaGiamGia =
    typeof window !== "undefined"
      ? localStorage.getItem("appliedCoupons")
      : null;
  const MaArray = MaGiamGia ? JSON.parse(MaGiamGia) : [];
  console.log(MaArray[0]?.id_magiamgia, "id_magiamgia");

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

    const handleBeforeUnload = () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("appliedCoupons");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

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
            "Card details are invalid. Please check your card details and try again."
          );
        }
      })
      .catch(() => {
        setValidationMessage("");
        setErrorMessage(
          "There was an error validating the card details. Please try again later."
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

  return (
    <div className="container mx-auto mt-60 px-4">
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-8">
      <div className="mx-auto">
        {/* Animated Header */}
        <h1 className="text-4xl font-semibold mb-8 text-center animate-fade-in relative">
          <span className="absolute -inset-1 blur-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 opacity-30"></span>
          <span className="relative text-pink-700">Thanh Toán</span>
        </h1>
  
        {cartItems.length === 0 ? (
          <div className="text-center py-16 animate-fade-in-up">
            <div className="mb-4">
              <span className="material-icons text-4xl text-gray-400">
                shopping_cart
              </span>
            </div>
            <p className="text-xl text-gray-600 mb-4">
              Giỏ hàng của bạn đang trống
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <span className="material-icons mr-2">explore</span>
              Khám phá khóa học
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10 justify-center">
            {/* Cart Items Section */}
            <div className="w-full lg:w-1/4 space-y-4">
              <div className="bg-white rounded-xl shadow-lg p-4 hover:shadow-2xl transition-shadow duration-300">
                <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-pink-700 to-gray-600">
                  Các khóa học trong giỏ hàng
                </h2>
                <div className="space-y-4">
                  {cartItems.map((item) =>
                    item.khoahocs.map((khoahoc) => (
                      <div
                        key={khoahoc.id}
                        className="flex items-center p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-gray-100 hover:border-purple-200 hover:shadow-lg transform hover:scale-[1.02]"
                      >
                        <div className="relative group">
                          <Image
                            width={250}
                            height={150}
                            src={khoahoc.hinh}
                            alt={khoahoc.ten}
                            className="w-24 h-18 object-cover rounded-xl shadow-md group-hover:shadow-xl transition-all duration-300"
                          />
                          <div className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                            -{discount}%
                          </div>
                        </div>
                        <div className="flex-grow ml-4">
                          <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-purple-600 transition-colors">
                            {khoahoc.ten}
                          </h3>
                          <p className="text-gray-600 flex items-center mb-2 text-sm">
                            <span className="material-icons mr-1 text-base">
                              Giảng viên:
                            </span>
                            {khoahoc.tenGiangVien}
                          </p>
                          <div className="flex items-center">
                            <p className="text-xl font-bold text-pink-700">
                              {khoahoc.giamgia}
                              <span className="text-lg">VNĐ</span>
                            </p>
                            <p className="text-gray-500 line-through ml-2 text-xl">
                              {khoahoc.gia}
                              <span className="text-lg">VNĐ</span>{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              {/* Order Summary */}
              <div className="bg-gradient-to-br from-purple-100 to-blue-50 rounded-xl shadow-lg p-4 border border-purple-200">
                <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-pink-700 to-gray-600">
                  Tóm Tắt Đơn Hàng
                </h2>
                <div className="space-y-2">
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-gray-600 text-xl">Tổng cộng:</span>
                    <span className="text-xl font-bold text-gray-800">
                      {totalPrice.toFixed(2)}<span className="text-lg">VNĐ</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-gray-600 text-xl">Giảm giá:</span>
                    <span className="text-xl font-bold text-red-500">
                      -{discount}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-purple-200">
                    <span className="text-gray-800 font-medium text-xl">
                      Thành tiền:
                    </span>
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                      {(totalPrice - (totalPrice * discount) / 100).toFixed(
                        2
                      )}<span className="text-lg">VNĐ</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Phương thức Section */}
            <div className="w-full lg:w-1/4 space-y-4">
              {/* Payment Form */}
              <div className="bg-white rounded-xl shadow-lg p-4 hover:shadow-2xl transition-shadow duration-300 border border-purple-100">
                <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-pink-700 to-gray-600">
                  Phương thức - thông tin
                </h2>
                {errorMessage && (
                  <div className="mb-4 p-2 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                    {errorMessage}
                  </div>
                )}
                {validationMessage && (
                  <div className="mb-4 p-2 bg-green-50 border-l-4 border-green-500 text-green-700 rounded">
                    {validationMessage}
                  </div>
                )}
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="mb-4">
                    <label className="font-medium text-gray-700 text-xl pb-2">
                      Chọn phương thức
                    </label>
  
                    <div className="flex items-center mb-2 p-2">
                      <input
                        type="radio"
                        id="check"
                        name="check"
                        value="Momo"
                        className="mr-2 text-xl"
                        style={{ fontSize: "12px" }}
                      />
                      <label htmlFor="vehicle1">
                        <span className="text-xl" style={{ fontSize: "12px" }}>Thanh toán Momo</span>
                      </label>
                    </div>
  
                    <div className="flex items-center mb-2 p-2">
                      <input
                        type="radio"
                        id="check"
                        name="check"
                        value="VNPAY"
                        className="mr-2 text-xl"
                        style={{ fontSize: "12px" }}
                      />
                      <label htmlFor="vehicle2">
                        <span className="text-xl" style={{ fontSize: "12px" }}>Thanh toán VNPAY</span>
                      </label>
                    </div>
  
                    <div className="flex items-center mb-2 p-2">
                      <input
                        type="radio"
                        id="check"
                        name="check"
                        value="ATM"
                        checked
                        className="mr-2 text-xl" style={{ fontSize: "12px" }}
                      />
                      <label htmlFor="vehicle3">
                        <span className="text-xl" style={{ fontSize: "12px" }}>Thanh toán ATM</span>
                      </label>
                    </div>
                  </div>
  
                  <div className="mb-4">
                    <label className="font-medium text-gray-700 text-xl pb-2">
                      Tên trên thẻ
                    </label>
                    <input
                      type="text"
                      name="nameOnCard"
                      value={paymentDetails.nameOnCard}
                      onChange={handlePaymentInputChange}
                      onBlur={validateCardDetails}
                      className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      style={{ fontSize: "12px" }}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="font-medium text-gray-700 text-xl pb-2">
                      Mã số thẻ
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={paymentDetails.cardNumber}
                      onChange={handlePaymentInputChange}
                      onBlur={validateCardDetails}
                      className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      style={{ fontSize: "12px" }}
                      required
                    />
                  </div>
                  <div className="flex mb-4">
                    <div className="w-1/2 pr-2">
                      <label className="font-medium text-gray-700 text-xl pb-2">
                        Ngày cấp
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={paymentDetails.expiryDate}
                        onChange={handlePaymentInputChange}
                        onBlur={validateCardDetails}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="MM/YY"
                        style={{ fontSize: "12px" }}
                        required
                      />
                    </div>
                    <div className="w-1/2 pl-2">
                      <label className="font-medium text-gray-700 text-xl pb-2">
                        CVC/CVV
                      </label>
                      <input
                        type="text"
                        name="cvc"
                        value={paymentDetails.cvc}
                        onChange={handlePaymentInputChange}
                        onBlur={validateCardDetails}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        style={{ fontSize: "12px" }}
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-pink-700 to-gray-600 text-white py-2 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                    style={{ fontSize: "12px" }}
                  >
                    Thanh Toán
                    {(totalPrice - (totalPrice * discount) / 100).toFixed(
                      2
                    )}<span className="text-lg">VNĐ</span>
                  </button>
                  <Link href={`/`}>
                    <p className="text-center mt-3 text-gray-500">Quay lại</p>
                  </Link>
                </form>
              </div>
            </div>
            {/* Payment Section */}
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

export default Page;

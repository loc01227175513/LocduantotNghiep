"use client";
import React, { useState } from "react";
import Header from "../../component/header/page";
import { Register } from "../../../service/Register/register";
import Image from 'next/image';
export default function Page() {
  const [formData, setFormData] = useState({
    ten: '',
    email: '',
    dienthoai: '',
    matkhau: '',
    hinh: 'https://png.pngtree.com/png-clipart/20221230/original/pngtree-blank-face-man-cartoon-character-png-image_8831926.png',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.ten) newErrors.ten = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.dienthoai) newErrors.dienthoai = "Phone number is required";
    if (!formData.matkhau) newErrors.matkhau = "Password is required";
    if (formData.matkhau !== formData.repassword) newErrors.repassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await Register(formData);
      console.log(response);
      if (response) {
        window.location = '/page/login';
      }
    } catch (error) {
      console.error("Failed to fetch courses: ", error);
    }
  };

  return (
    <>
      <Header />
      <div className="login-registration-wrapper">
        <div className="container">
          <div className="row g-0">
            <div className="col-lg-6" style={{ marginTop: 150 }}>
              <div className="login-page-form-area">
                <h4 className="title">Đăng ký vào tài khoản của bạn👋</h4>
                <form onSubmit={handleSubmit}>
                  <div className="single-input-wrapper">
                    <label htmlFor="name">Tên của bạn*</label>
                    <input
                      id="name"
                      name="ten"
                      type="text"
                      placeholder="Enter Your Name"
                      value={formData.ten}
                      onChange={handleChange}
                      required
                    />
                    {errors.ten && <p className="error">{errors.ten}</p>}
                  </div>
                  <div className="half-input-wrapper">
                    <div className="single-input-wrapper">
                      <label htmlFor="email">E-mail*</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="single-input-wrapper">
                    <label htmlFor="phone">Điện thoại*</label>
                    <input
                      id="phone"
                      name="dienthoai"
                      type="text"
                      placeholder="Enter Your Phone Number"
                      value={formData.dienthoai}
                      onChange={handleChange}
                      required
                    />
                    {errors.dienthoai && <p className="error">{errors.dienthoai}</p>}
                  </div>
                  <div className="half-input-wrapper">
                    <div className="single-input-wrapper">
                      <label htmlFor="password">Mật khẩu của bạn</label>
                      <input
                        id="password"
                        name="matkhau"
                        type="password"
                        placeholder="Password"
                        value={formData.matkhau}
                        onChange={handleChange}
                        required
                      />
                      {errors.matkhau && <p className="error">{errors.matkhau}</p>}
                    </div>
                    <div className="single-input-wrapper">
                      <label htmlFor="passwords">Nhập Lại Mật khẩu</label>
                      <input
                        id="passwords"
                        name="repassword"
                        type="password"
                        placeholder="Re Password"
                        onChange={handleChange}
                        required
                      />
                      {errors.repassword && <p className="error">{errors.repassword}</p>}
                    </div>
                  </div>
                  <div className="single-checkbox-filter">
                    <div className="check-box">
                      <input type="checkbox" id="type-1" />
                      <label htmlFor="type-1">
                       Chấp nhận các điều khoản và chính sách quyền riêng tư
                      </label>
                      <br />
                    </div>
                  </div>
                  <button className="rts-btn btn-primary" type="submit">Đăng ký</button>
                  <p>
                    Không có tài khoản? <a href="#">Sự đăng ký</a>
                  </p>
                </form>
              </div>
            </div>
            <div className="col-lg-6 " style={{ marginTop: 100 }}>
              <div className="contact-thumbnail-login-p  flex justify-center items-center">
                <Image 
                  src="https://frontends.udemycdn.com/components/auth/desktop-illustration-x1.webp"
                  width={500} height={300}   
                  className="img-fluid bg-transparent"
                  alt="Student Home"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
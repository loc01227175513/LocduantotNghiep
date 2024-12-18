"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "../../component/header/page";
import Image from "next/image";
import { CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { Register } from "../../../service/Register/register";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const initialValues = {
    ten: '',
    email: '',
    dienthoai: '',
    matkhau: '',
    repassword: '',
    hinh: 'https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg',
  };

  const validationSchema = Yup.object({
    ten: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    dienthoai: Yup.string().required("Phone number is required"),
    matkhau: Yup.string().required("Password is required"),
    repassword: Yup.string().oneOf([Yup.ref('matkhau'), null], "Passwords must match").required("Confirm password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    try {
      const response = await Register(values);
      // console.log(response); 
      if (response) {
        window.location = '/page/login';
      }
    } catch (error) {
      console.error("Failed to register: ", error);
      setErrorMessage("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, when: "beforeChildren", staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <Header />
      <motion.div 
        className="login-registration-wrapper"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{
          background: "-webkit-linear-gradient(315deg, #1e3c72 0%, #ff6b6b 100%)",
          minHeight: "100vh",
          padding: "2rem 0",
          overflowY: "scroll"
        }}
      >
        <div className="container">
          <div className="row g-0">
            <div className="col-lg-6" style={{ marginTop: 150 }}>
              <motion.div 
                className="login-page-form-area"
                variants={itemVariants}
                style={{
                  background: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "15px",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
                  padding: "2rem",
                  border: "1px solid rgba(255, 255, 255, 0.18)"
                }}
              >
                <motion.h4 
                  className="title"
                  variants={itemVariants}
                >
                  Đăng ký vào tài khoản 👋
                </motion.h4>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <motion.div className="single-input-wrapper" variants={itemVariants}>
                        <label htmlFor="ten">Tên của bạn*</label>
                        <Field
                          id="ten"
                          name="ten"
                          type="text"
                          placeholder=" Nhập Tên của bạn"
                          aria-label="Name"
                          style={{ fontSize: "15px" }}
                        />
                        <ErrorMessage
                          name="ten"
                          component="div"
                          className="error text-danger my-2 text-xl bg-inherit border-none"
                        />
                      </motion.div>

                      <motion.div className="single-input-wrapper" variants={itemVariants}>
                        <label htmlFor="email">E-mail*</label>
                        <Field
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Nhập Email của bạn"
                          aria-label="Email"
                          style={{ fontSize: "15px" }}
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="error text-danger my-2 text-xl bg-inherit border-none"
                        />
                      </motion.div>

                      <motion.div className="single-input-wrapper" variants={itemVariants}>
                        <label htmlFor="dienthoai">Điện thoại*</label>
                        <Field
                          id="dienthoai"
                          name="dienthoai"
                          type="text"
                          placeholder="Nhập Số Điện Thoại của bạn"
                          aria-label="Phone"
                          style={{ fontSize: "15px" }}
                        />
                        <ErrorMessage
                          name="dienthoai"
                          component="div"
                          className="error text-danger my-2 text-xl bg-inherit border-none"
                        />
                      </motion.div>

                      <motion.div className="single-input-wrapper" variants={itemVariants}>
                        <label htmlFor="matkhau">Mật khẩu của bạn</label>
                        <Field
                          id="matkhau"
                          name="matkhau"
                          type="password"
                          placeholder="Mật khẩu"
                          aria-label="Password"
                          style={{ fontSize: "15px" }}
                        />
                        <ErrorMessage
                          name="matkhau"
                          component="div"
                          className="error text-danger my-2 text-xl bg-inherit border-none"
                        />
                      </motion.div>

                      <motion.div className="single-input-wrapper" variants={itemVariants}>
                        <label htmlFor="repassword">Nhập Lại Mật khẩu</label>
                        <Field
                          id="repassword"
                          name="repassword"
                          type="password"
                          placeholder="Nhập Lại Mật khẩu"
                          aria-label="Confirm Password"
                          style={{ fontSize: "15px" }}
                        />
                        <ErrorMessage
                          name="repassword"
                          component="div"
                       className="error text-danger my-2 text-xl bg-inherit border-none"
                          
                        />
                      </motion.div>

                      {errorMessage && (
                        <motion.div className="alert alert-danger" role="alert" variants={itemVariants}>
                          {errorMessage}
                        </motion.div>
                      )}

                      <motion.div className="single-checkbox-filter" variants={itemVariants}>
                        <div className="check-box">
                          <Field type="checkbox" id="type-1" name="terms" />
                          <label htmlFor="type-1">
                            Chấp nhận các điều khoản và chính sách quyền riêng tư
                          </label>
                        </div>
                      </motion.div>

                      <motion.button
                        type="submit"
                        className="rts-btn btn-primary w-100 text-2xl"
                        disabled={isSubmitting || isLoading}
                        variants={itemVariants}
                      >
                        {isLoading ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          'Đăng ký'
                        )}
                      </motion.button>

                      <motion.p className="mt-3 text-center " variants={itemVariants}>
                        Không có tài khoản?{" "}
                        <a href="/page/login" className="text-primary ">
                          Đăng nhập
                        </a>
                      </motion.p>
                    </Form>
                  )}
                </Formik>
              </motion.div>
            </div>

            <div className="col-lg-6" style={{ marginTop: 100 }}>
              <motion.div 
                className="contact-thumbnail-login-p flex justify-center items-center"
                variants={itemVariants}
              >
                <Image 
                  src="https://frontends.udemycdn.com/components/auth/desktop-illustration-x1.webp"
                  width={500} 
                  height={300}   
                  className="img-fluid bg-transparent"
                  alt="Student Home"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
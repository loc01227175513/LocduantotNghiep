"use client";

import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "../../component/header/page";
import Image from "next/image";
import { CircularProgress } from "@mui/material";
import { Google, Facebook, LinkedIn } from "@mui/icons-material";
import { motion } from "framer-motion";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const userData = localStorage.getItem("data");
    if (userData) {
      const user = JSON.parse(userData);
      // Redirect based on role
      const redirectPath = user.role === 'admin' ? '/admin' : '/';
      window.location = redirectPath;
    }
  }, []);

  const initialValues = {
    email: "",
    password: "",
    rememberMe: false
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Vui lòng nhập đúng địa chỉ email")
      .required("Email không được để trống"),
    password: Yup.string()
      .min(8, "Mật khẩu phải từ 8 ký tự trở lên")
      .required("Mật khẩu không được để trống"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    const data = {
      email: values.email,
      password: values.password,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        referrerPolicy: 'unsafe-url',
      });

      if (response.ok) {
        const result = await response.json();
        // console.log("Login successful:", result); 

        // Handle remember me
        if (values.rememberMe) {
          localStorage.setItem("rememberedUser", values.email);
        }

        // Store user data and role
        localStorage.setItem("data", JSON.stringify({
          ...result.data,
          lastLogin: new Date().toISOString()
        }));

        // Redirect based on role
        const userRole = result.data.role;
        const redirectPath = userRole === 'admin' ? '/admin' : '/';
        window.location = redirectPath;
      } else {
        const error = await response.json();
        // console.error("Login failed:", error);
        setErrorMessage("Thông tin đăng nhập không chính xác");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Đã xảy ra lỗi kết nối. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // Implement social login logic here
    console.log(`Logging in with ${provider}`);
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

  const socialButtonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  };

  const imageVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const glowVariants = {
    hover: {
      boxShadow: "0 0 15px rgba(66, 133, 244, 0.6)",
      transition: { duration: 0.3 }
    }
  };

  const gradientVariants = {
    animate: {
      background: [
        "linear-gradient(45deg, #4285f4, #34a853)",
        "linear-gradient(45deg, #34a853, #fbbc05)",
        "linear-gradient(45deg, #fbbc05, #ea4335)",
        "linear-gradient(45deg, #ea4335, #4285f4)"
      ],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <>
      {!isAuthenticated ? (
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
                      background: "rgba(255, 255, 255, 0.95)", // Slightly more opaque background
                      borderRadius: "20px", // Increased border radius for a softer look
                      backdropFilter: "blur(15px)", // Increased blur for better contrast
                      boxShadow: "0 12px 40px rgba(31, 38, 135, 0.2)", // Enhanced shadow for depth
                      padding: "2.5rem", // Increased padding for more space
                      border: "1px solid rgba(255, 255, 255, 0.25)" // More visible border
                    }}
                    whileHover="hover"
                  >
                    <motion.h4
                      className="title"
                      variants={itemVariants}
                    >
                      Đăng nhập vào tài khoản 👋
                    </motion.h4>

                    {/* <div className="social-login mb-4">
                      <motion.button 
                        onClick={() => handleSocialLogin('google')}
                        className="btn btn-outline-secondary me-2"
                        variants={socialButtonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Google /> Google
                      </motion.button>
                      <motion.button 
                        onClick={() => handleSocialLogin('facebook')}
                        className="btn btn-outline-secondary me-2"
                        variants={socialButtonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Facebook /> Facebook
                      </motion.button>
                    </div> */}
                    {/* <div className="divider mb-4 text-xl">
                      <span>Hoặc đăng nhập bằng email</span>
                    </div> */}

                    {isLoading && (
                      <motion.div className="loading-message" variants={itemVariants}>
                        Đang xử lý, vui lòng chờ...
                      </motion.div>
                    )}

                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <motion.div className="single-input-wrapper" variants={itemVariants}>
                            <label htmlFor="email">Email của bạn</label>
                            <Field
                              id="email"
                              name="email"
                              type="email"
                              placeholder="Nhập email của bạn"
                              aria-label="Email address"
                              style={{ fontSize: "15px" }}
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="error text-danger my-2 text-xl bg-inherit border-none"
                            />
                          </motion.div>

                          <motion.div className="single-input-wrapper " variants={itemVariants}>
                            <label htmlFor="password">Mật khẩu của bạn</label>
                            <Field
                              id="password"
                              name="password"
                              type="password"
                              placeholder="Nhập mật khẩu"
                              aria-label="Password"
                              style={{ fontSize: "15px" }}
                            />
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="error text-danger my-2 text-xl bg-inherit border-none"
                            />
                          </motion.div>

                          {errorMessage && (
                            <motion.div className="alert alert-danger " role="alert" variants={itemVariants}>
                              {errorMessage}
                            </motion.div>
                          )}

                          <motion.div className="d-flex justify-content-between align-items-center mb-3" variants={itemVariants}>
                            <div className="single-checkbox-filter">
                              <div className="check-box">
                                <Field
                                  type="checkbox"
                                  id="rememberMe"
                                  name="rememberMe"
                                />
                                <label htmlFor="rememberMe">Nhớ tài khoản</label>
                              </div>
                            </div>
                            <a href="/page/ForgotPassword" className="forgot-password text-[14px]">
                              Quên mật khẩu?
                            </a>
                          </motion.div>

                          <motion.button
                            type="submit"
                            className="rts-btn btn-primary w-100 text-2xl"
                            disabled={isSubmitting || isLoading}
                            variants={itemVariants}
                            style={{
                              backgroundColor: "#4285f4", // Primary color for the button
                              color: "#fff", // White text for contrast
                              borderRadius: "5px", // Rounded button
                              padding: "10px 0", // Padding for button
                              transition: "background-color 0.3s ease" // Smooth transition
                            }}
                            whileHover={{ backgroundColor: "#34a853" }} // Change color on hover
                          >
                            {isLoading ? (
                              <CircularProgress size={32} color="inherit" />
                            ) : (
                              'Đăng nhập'
                            )}
                          </motion.button>

                          <motion.p className="mt-3 text-center" variants={itemVariants}>
                            Chưa có tài khoản?{" "}
                            <a href="/page/register" className="text-primary">
                              Đăng ký ngay
                            </a>
                          </motion.p>
                        </Form>
                      )}
                    </Formik>
                  </motion.div>
                </div>

                <div className="col-lg-6">
                  <motion.div
                    className="contact-thumbnail-login-p flex justify-center items-center"
                    variants={imageVariants}
                  >
                    <Image
                      src="https://frontends.udemycdn.com/components/auth/desktop-illustration-x1.webp"
                      width={500}
                      height={300}
                      className="img-fluid bg-transparent py-36"
                      alt="Student Home"
                      priority
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </>
  );
}
"use client";

import React, { useState } from "react";
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
      const response = await fetch("https://huuphuoc.id.vn/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        referrerPolicy: 'unsafe-url',
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Login successful:", result);
        
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
        console.error("Login failed:", error);
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
      <Header />
      <motion.div 
        className="login-registration-wrapper"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{
          background: "linear-gradient(45deg, #4285f4, #34a853)",
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
                whileHover="hover"
              >
                <motion.h4 
                  className="title"
                  variants={itemVariants}
                >
                  Đăng nhập vào tài khoản của bạn 👋
                </motion.h4>
                
                <div className="social-login mb-4">
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
                </div>
                <div className="divider mb-4">
                  <span>Hoặc đăng nhập bằng email</span>
                </div>

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
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="error text-danger"
                        />
                      </motion.div>

                      <motion.div className="single-input-wrapper" variants={itemVariants}>
                        <label htmlFor="password">Mật khẩu của bạn</label>
                        <Field
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Nhập mật khẩu"
                          aria-label="Password"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="error text-danger"
                        />
                      </motion.div>

                      {errorMessage && (
                        <motion.div className="alert alert-danger" role="alert" variants={itemVariants}>
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
                        <a href="/page/ForgotPassword" className="forgot-password">
                          Quên mật khẩu?
                        </a>
                      </motion.div>

                      <motion.button
                        type="submit"
                        className="rts-btn btn-primary w-100"
                        disabled={isSubmitting || isLoading}
                        variants={itemVariants}
                      >
                        {isLoading ? (
                          <CircularProgress size={24} color="inherit" />
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
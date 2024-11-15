"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "../../component/header/page";
import Image from "next/image";
import { Margin } from "@mui/icons-material";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const initialValues = { email: "", password: "", rememberMe: false };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("vui lòng nhập đúng địa chỉ email")
      .required("email k đc để trống"),
    password: Yup.string()
      .min(8, "mật khẩu phải từ 8 kí từ trở lên")
      .required("mật khẩu k đc để trống"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const data = {
      email: values.email,
      password: values.password,
    };

    try {
      const response = await fetch("http://huuphuoc.id.vn/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Login successful:", result);
        localStorage.setItem("data", JSON.stringify(result.data));
        window.location = "/";
      } else {
        const error = await response.json();
        console.error("Login failed:", error);
        setErrorMessage("Sai mật khẩu. Quên mật khẩu?");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
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
                <h4 className="title">Đăng nhập vào tài khoản của bạn👋</h4>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="single-input-wrapper">
                        <label htmlFor="email">Email của bạn</label>
                        <Field
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter Your Email"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="error"
                        />
                      </div>
                      <div className="single-input-wrapper">
                        <label htmlFor="password">Mật khẩu của bạn</label>
                        <Field
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Password"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="error"
                        />
                      </div>
                      {errorMessage && (
                        <div className="error" style={{ color: "white" }}>
                          {errorMessage} <a className="text-red-700" href="/page/ForgotPassword">Quên mật khẩu?</a>
                        </div>
                      )}
                      <div className="single-checkbox-filter">
                        <div className="check-box">
                          <Field
                            type="checkbox"
                            id="type-1"
                            name="rememberMe"
                          />
                          <label htmlFor="type-1">Nhớ tôi</label>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="rts-btn btn-primary"
                        disabled={isSubmitting}
                      >
                        Đăng nhập
                      </button>
                      <p>
                        Không Có một tài khoản?{" "}
                        <a href="/page/register">Sự đăng ký</a>
                      </p>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact-thumbnail-login-p flex justify-center items-center">
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
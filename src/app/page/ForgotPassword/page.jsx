"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "../../component/header/page";
import Image from "next/image";
import { Margin } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const initialValues = { email: "", password: "", rememberMe: false };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("vui lòng nhập đúng địa chỉ email")
      .required("Email không được để trống "),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const data = {
      email: values.email
    };

    try {
           const response = await fetch("https://huuphuoc.id.vn/api/sendMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        referrerPolicy: 'unsafe-url',
      });

      if (response.ok) {
        toast.success("Email sent successfully!");
      } else {
        const error = await response.json();
        console.error("Login failed:", error);
        setErrorMessage("Sai Email.");
        toast.error("Sai Email.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Đã xảy ra lỗi. Vui lòng thử lại.");
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
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
                <h4 className="title">Nhập Email Đổi Mật Khẩu👋</h4>
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

                      <button
                        type="submit"
                        className="rts-btn btn-primary"
                        disabled={isSubmitting}
                      >
                        Gữi Email
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact-thumbnail-login-p flex justify-center items-center">
                <Image  
                  src="https://frontends.udemycdn.com/components/auth/desktop-illustration-x1.webp"
                  width="100%"
                  className="img-fluid bg-transparent"
                  alt="Student Home"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
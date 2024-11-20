'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
export default function Main2() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        ten: '',
        email: '',
        id_nguoidung: '',
        password: '',
        passwordConfirm: '',
        acceptTerms: false,
    });

    const data = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('data')) || {} : {};
    const id_nguoidung = data.id || '';

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (formData.password !== formData.passwordConfirm) {
            alert('Passwords do not match');
            return;
        }
        if (!formData.acceptTerms) {
            alert('You must accept the terms and privacy policy');
            return;
        }
        try {
            const response = await fetch('https://huuphuoc.id.vn/api/dangkygiangvien', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ten: formData.ten,
                    email: formData.email,
                    id_nguoidung: id_nguoidung,
                    password: formData.password,
                }),
                referrerPolicy: 'unsafe-url',
            });
            const result = await response.json();
            if (response.ok) {
                const datanguoidung = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('data')) || {} : {};
                datanguoidung.vaitro = 1;
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('data', JSON.stringify(datanguoidung));
                }
                alert(result.message);
                window.location.href = '/';
            } else {
                alert(result.message || 'An error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
        setLoading(false);
    };

    return (
        <>
            <div className="min-h-screen py-12 bg-gradient-to-br from-blue-50 via-white to-blue-50">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="relative px-10 py-10 bg-white rounded-2xl shadow-xl">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100 rounded-full -mr-20 -mt-20 opacity-20" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-100 rounded-full -ml-16 -mb-16 opacity-20" />

                        <div className="relative z-10">
                            <div className="mb-12 text-center">
                                <motion.h2
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mb-4 text-4xl font-bold text-gray-800"
                                >
                                    Trở thành một người hướng dẫn ngày hôm nay
                                </motion.h2>
                                <p className="text-lg text-gray-600">
                                    Tham gia thị trường học tập trực tuyến lớn nhất thế giới
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6">
                                    {[
                                        { name: 'ten', type: 'text', icon: '👤', placeholder: 'Họ và tên' },
                                        { name: 'email', type: 'email', icon: '📧', placeholder: 'Email' },
                                        { name: 'password', type: 'password', icon: '🔒', placeholder: 'Mật khẩu' },
                                        { name: 'passwordConfirm', type: 'password', icon: '🔐', placeholder: 'Xác nhận mật khẩu' }
                                    ].map((field) => (
                                        <div key={field.name} className="relative group">
                                            <span className="absolute left-3 top-3.5 text-gray-400">{field.icon}</span>
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                placeholder={field.placeholder}
                                                value={formData[field.name]}
                                                onChange={handleChange}
                                                className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                                    <input
                                        type="checkbox"
                                        id="acceptTerms"
                                        name="acceptTerms"
                                        checked={formData.acceptTerms}
                                        onChange={handleChange}
                                        className="w-4 h-4 border-2 border-blue-500 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor="acceptTerms" className="ml-3 text-gray-700">
                                        Tôi đồng ý với các điều khoản và điều kiện
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="relative w-full p-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-70"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="w-5 h-5 mr-3 animate-spin" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Đang xử lý...
                                        </span>
                                    ) : 'Đăng ký làm người hướng dẫn'}
                                </button>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
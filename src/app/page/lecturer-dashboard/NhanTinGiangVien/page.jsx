"use client";
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DanhSachTinNhanGiangVien, GiangVienHientai, ShowAllNguoiDung } from '../../../../service/NhanTin/NhanTin';
import { motion } from 'framer-motion';

const NhanTin = () => {
    const [csrfToken, setCsrfToken] = useState('');
    const [giangVien, setGiangVien] = useState([]);
    const [nguoiDung, setNguoiDung] = useState([]);
    const [nhantin, setNhanTin] = useState([]);
    const [isAddVisible, setAddVisible] = useState(false);

    const fetchMessages = () => {
        DanhSachTinNhanGiangVien().then((data) => {
            setNhanTin(data);
        }).catch((error) => {
            console.error('Error:', error);
            toast.error('Lỗi khi lấy dữ liệu!');
        });
    };

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) setCsrfToken(token);
    }, []);

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 10000); // Fetch every 10 seconds
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        GiangVienHientai().then((data) => {
            setGiangVien(data);
        }).catch((error) => {
            console.error('Error:', error);
            toast.error('Lỗi khi lấy dữ liệu!');
        });
    }, []);

    useEffect(() => {
        ShowAllNguoiDung().then((data) => {
            setNguoiDung(data || []);
        }).catch((error) => {
            console.error('Error:', error);
            toast.error('Lỗi khi lấy dữ liệu!');
        });
    }, []);

    return (
        <>
            <div className="overflow-y-scroll col-lg-9 h-lvh">
                <div className="right-sidebar-dashboard p-6">
                    {/* Header Section */}
                    <section className="p-6 max-w-6xl mx-auto flex justify-between items-center 
                          bg-white
                          rounded-2xl
                          shadow-lg
                          border border-gray-200
                          mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                Quản lý Tin Nhắn
                            </h1>
                            <p className="text-gray-600 mt-1 text-lg">Danh sách tin nhắn</p>
                        </div>
                        <button
                            className="relative inline-flex items-center w-44 px-6 py-3 font-semibold text-white transition-transform duration-300 
                                       bg-emerald-500 rounded-xl hover:bg-emerald-600
                                       focus:ring-2 focus:ring-emerald-400
                                       transform hover:scale-105"
                            onClick={() => setAddVisible(true)}
                        >
                            <span className="mr-2">+</span> Thêm Tin Nhắn
                        </button>
                    </section>

                    {/* Messages Section */}
                    <section className="p-4 max-w-6xl mx-auto space-y-8">
                        {nhantin.map((item, index) => {
                            let messages = [];
                            try {
                                messages = JSON.parse(item.noidung);
                            } catch (e) {
                                console.error('Error parsing messages:', e);
                            }

                            return (
                                <motion.div
                                    key={item.id}
                                    className="bg-white p-8 rounded-2xl 
                                               shadow-lg
                                               border border-gray-200
                                               transition-all duration-500 ease-out"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: index * 0.15,
                                        ease: [0.4, 0, 0.2, 1]
                                    }}
                                    whileHover={{
                                        scale: 1.02,
                                        y: -5
                                    }}
                                >
                                    {/* Header with enhanced styling */}
                                    <div className="flex justify-between items-center mb-6">
                                        <p className="text-xl font-bold text-gray-800">
                                            Mã Tin Nhắn: <span>#{item.id}</span>
                                        </p>
                                    </div>

                                    {/* Messages with enhanced animation and effects */}
                                    <div className="flex flex-col space-y-6">
                                        {messages.map((msg, index) => {
                                            const isUserSender = msg.sender_type === 'nguoidung';
                                            const isLecturerSender = msg.sender_type === 'giangvien';
                                            let msgSenderName = 'Không xác định';

                                            if (isUserSender) {
                                                msgSenderName = nguoiDung.find(nd => nd.id === msg.sender_id)?.ten || 'Người dùng không xác định';
                                            } else if (isLecturerSender) {
                                                msgSenderName = giangVien.find(gv => gv.id === msg.sender_id)?.ten || 'Giảng viên không xác định';
                                            }

                                            return (
                                                <motion.div
                                                    key={index}
                                                    className={`p-5 rounded-2xl max-w-md
                                                    ${isUserSender
                                                            ? 'bg-blue-500 text-white self-start ml-2'
                                                            : isLecturerSender
                                                                ? 'bg-emerald-500 text-white self-end mr-2'
                                                                : 'bg-gray-500 text-white'
                                                        } 
                                                    shadow-md`}
                                                    whileHover={{
                                                        scale: 1.03,
                                                        rotateX: 5
                                                    }}
                                                    transition={{ duration: 0.4 }}
                                                >
                                                    <p className="font-bold mb-2">{msgSenderName}</p>
                                                    <p className="leading-relaxed">{msg.content}</p>
                                                    <p className="text-sm mt-3 italic opacity-80">{msg.timestamp}</p>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </section>

                    {isAddVisible && (
                        <AddTinNhan
                            onClose={() => setAddVisible(false)}
                            csrfToken={csrfToken}
                            giangVien={giangVien}
                            nguoiDung={nguoiDung}
                            refreshData={fetchMessages}
                        />
                    )}

                    <ToastContainer />
                </div>
            </div>
        </>
    );
};

const AddTinNhan = ({ onClose, csrfToken, giangVien, nguoiDung, refreshData }) => {
    const [activeTab, setActiveTab] = useState('giangvien');

    const [lecturerFormData, setLecturerFormData] = useState({
        noidung: '',
        id_nguoidung: '',
    });

    const handleLecturerChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value); // Debugging line
        setLecturerFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateLecturerForm = () => {
        if (!lecturerFormData.noidung || !lecturerFormData.id_nguoidung) {
            toast.error('Vui lòng điền đầy đủ thông tin.');
            return false;
        }
        return true;
    };

    const handleLecturerSubmit = async (e) => {
        e.preventDefault();

        if (!validateLecturerForm()) return;

        const giangvienId = giangVien[0]?.id || '';
        const nguoidungId = parseInt(lecturerFormData.id_nguoidung, 10);

        const newFormData = {
            noidung: [
                {
                    sender_id: giangvienId,
                    receiver_id: nguoidungId,
                    content: lecturerFormData.noidung,
                    timestamp: new Date().toISOString(),
                    sender_type: 'giangvien',
                },
            ],
            id_nguoidung: nguoidungId,
            id_giangvien: giangvienId,
        };

        try {
            const response = await fetch(`https://huuphuoc.id.vn/api/addNhanTin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify(newFormData),
                referrerPolicy: 'unsafe-url',
            });
            if (response.ok) {
                toast.success('Thêm tin nhắn thành công từ Giảng viên!');
                onClose();
                refreshData();
            } else {
                toast.error('Thêm tin nhắn thất bại!');
            }
        } catch (error) {
            console.error('Lỗi khi thêm dữ liệu:', error);
            toast.error('Thêm tin nhắn thất bại!');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
            {/* Animated background with particles */}
            <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 animate-gradient">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)] animate-pulse"></div>
            </div>

            {/* Enhanced backdrop blur */}
            <div className="absolute inset-0 backdrop-blur-xl bg-white/40"></div>

            {/* Modal Container with enhanced floating */}
            <div className="relative z-50 w-full max-w-2xl max-h-full mx-4 animate-float-slow">
                {/* Modal Content with advanced glassmorphism */}
                <div className="relative overflow-hidden rounded-3xl
                              bg-gradient-to-br from-white/80 via-white/70 to-gray-100/80
                              backdrop-blur-2xl backdrop-saturate-150
                              shadow-[0_0_100px_rgba(16,185,129,0.2)]
                              border border-emerald-500/30
                              animate-glow-pulse">

                    {/* Animated gradient border */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 animate-shimmer-slow"></div>

                    {/* Header with dynamic gradient */}
                    <div className="relative p-8 border-b border-gray-200/30 
                                  bg-gradient-to-r from-white/90 via-white/80 to-gray-100/90">
                        <h2 className="text-4xl font-bold text-transparent bg-clip-text 
                                     bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600
                                     animate-shimmer tracking-tight">
                            Thêm Tin Nhắn
                        </h2>

                        <div className="flex space-x-4 mt-6">
                            <button
                                className={`group px-8 py-3.5 rounded-2xl font-medium transition-all duration-300
                                          ${activeTab === 'giangvien'
                                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-2xl shadow-emerald-500/30 text-white'
                                        : 'bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700'} 
                                          transform hover:scale-105 hover:shadow-2xl relative overflow-hidden`}
                                onClick={() => setActiveTab('giangvien')}
                            >
                                <span className="relative z-10">Giảng viên</span>
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 
                                              bg-gradient-to-r from-emerald-600 to-teal-600 transition-transform duration-500"></div>
                            </button>
                        </div>
                    </div>

                    {/* Enhanced Form Section */}
                    {activeTab === 'giangvien' && (
                        <form onSubmit={handleLecturerSubmit} className="p-8 space-y-8">
                            <div className="space-y-4 relative">
                                <label className="block text-gray-700 font-medium text-lg tracking-wide">
                                    Người dùng:
                                </label>
                                <select
                                    name="id_nguoidung"
                                    value={lecturerFormData.id_nguoidung}
                                    onChange={handleLecturerChange}
                                    className="w-full bg-white border border-gray-200 rounded-2xl p-4
                                             text-gray-700 focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent
                                             transition-all duration-300 hover:bg-gray-50
                                             shadow-inner shadow-black/5
                                             appearance-none cursor-pointer"
                                    required
                                >
                                    <option value="" className="bg-white">Chọn người dùng</option>
                                    {nguoiDung.map((nd) => (
                                        <option key={nd.id} value={nd.id} className="bg-white">
                                            {nd.ten}
                                        </option>
                                    ))}
                                </select>
                                {/* Custom dropdown arrow */}
                                <div className="absolute right-4 top-[60%] pointer-events-none">
                                    <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-gray-700 font-medium text-lg tracking-wide">
                                    Nội dung:
                                </label>
                                <div className="relative z-20">
                                    <textarea
                                        name="noidung"
                                        value={lecturerFormData.noidung || ''}
                                        onChange={(e) => handleLecturerChange(e)}
                                        className="w-full bg-white border border-gray-200 rounded-2xl p-4
                   text-gray-700 focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent
                   transition-all duration-300 min-h-[150px] hover:bg-gray-50
                   shadow-inner shadow-black/5 resize-none relative"
                                        style={{ pointerEvents: 'auto', zIndex: 10 }}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Enhanced Action Buttons */}
                            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200/30">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="group px-8 py-3.5 rounded-2xl font-medium text-gray-600
                                             hover:bg-gray-100 transition-all duration-300
                                             border border-gray-200 hover:border-gray-300
                                             transform hover:scale-105 hover:shadow-lg"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="group px-8 py-3.5 rounded-2xl font-medium text-white
                                             bg-gradient-to-r from-emerald-500 to-teal-500
                                             transform hover:scale-105 transition-all duration-300
                                             shadow-xl shadow-emerald-500/30 hover:shadow-2xl
                                             relative overflow-hidden"
                                >
                                    <span className="relative z-10">Thêm từ Giảng viên</span>
                                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 
                                                  bg-gradient-to-r from-emerald-600 to-teal-600 transition-transform duration-500"></div>
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NhanTin;
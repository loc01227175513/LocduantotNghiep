// FILE: NhanTin.jsx
"use client";
import { useRouter } from "next/navigation";

import React, { useState, useEffect ,useRef} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DanhSachTinNhan, showGiangVien, NguoiDungTinNhan } from '../../../service/NhanTin/NhanTin';
import { motion } from 'framer-motion';

const NhanTin = () => {
    const [csrfToken, setCsrfToken] = useState('');
    const [giangVien, setGiangVien] = useState([]);
    const [nguoiDung, setNguoiDung] = useState(null);
    const [nhantin, setNhanTin] = useState([]);
    const [isAddVisible, setAddVisible] = useState(false);
    const [selectedConversation, setSelectedConversation] = useState(null); // Added state
    const [message, setMessage] = useState(''); 
    const router = useRouter();
    useEffect(() =>{
        const user = localStorage.getItem('data');
        if(!user){
            router.push('/page/login')
        }
    })
    const fetchMessages = () => {
        DanhSachTinNhan()
            .then((data) => {
                setNhanTin(data);
            })
            .catch((error) => {
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
        const interval = setInterval(fetchMessages, 2000); // Fetch every 10 seconds
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        showGiangVien()
            .then((data) => {
                setGiangVien(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error('Lỗi khi lấy dữ liệu!');
            });
    }, []);

    useEffect(() => {
        NguoiDungTinNhan()
            .then((data) => {
                setNguoiDung(data.data);
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error('Lỗi khi lấy dữ liệu!');
            });
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const messageVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };
    console.log(nhantin);
   const handleUserSubmit = async (e) => {
        e.preventDefault();

        if (!message.trim()) {
            toast.error('Vui lòng nhập nội dung tin nhắn!');
            return;
        }

        if (!selectedConversation) {
            toast.error('Vui lòng chọn một cuộc trò chuyện!');
            return;
        }

        const giangvienId = selectedConversation.id_giangvien;
        const nguoidungId = nguoiDung?.id;

        const newFormData = {
            noidung: [
                {
                    sender_id: nguoidungId,
                    receiver_id: giangvienId,
                    content: message,
                    timestamp: new Date().toISOString(),
                    sender_type: 'nguoidung',
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
                toast.success('Thêm tin nhắn thành công từ Người dùng!');
                setMessage(''); 
                window.location.reload();
            } else {
                toast.error('Thêm tin nhắn thất bại!');
            }
        } catch (error) {
            console.error('Lỗi khi thêm dữ liệu:', error);
            toast.error('Thêm tin nhắn thất bại!');
        }
    };


    return (
        <>
            <div className="flex  bg-gray-900" style={{ height: 'calc(100vh - 200px)' }}>
                {/* Sidebar */}
                <div className="w-80 border-r border-gray-800 overflow-y-auto">
                    <div className="p-4">
                        <h1 className="text-2xl font-semibold text-white mb-4">Tin nhắn</h1>
                        <button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-2.5 px-4 flex items-center justify-center space-x-2"
                            onClick={() => setAddVisible(true)}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span className='text-xl'>Tin nhắn mới</span>
                        </button>
                    </div>

                    {/* Conversation List */}
                    <div className="space-y-1 p-2">
                        {nhantin.map((item) => (
                            <div
                                key={item.id}
                                className={`p-3 hover:bg-gray-800 rounded-lg cursor-pointer transition-colors ${selectedConversation && selectedConversation.id === item.id ? 'bg-gray-700' : ''
                                    }`}
                                onClick={() => setSelectedConversation(item)} // Handle selection
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="relative">
                                        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-xl">
                                            👥
                                        </div>
                                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-medium truncate text-xl">{item.giangvien.ten}</p>
                                        <p className="text-gray-400 text-sm truncate">Nhấp để xem chi tiết</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                    <div className="flex-1 overflow-y-auto p-4">
                        {selectedConversation ? (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                className="space-y-6"
                            >
                                {JSON.parse(selectedConversation.noidung).map((msg, index) => {
                                    const isUserSender = msg.sender_type === 'nguoidung';
                                    return (
                                        <motion.div
                                            key={`${selectedConversation.id}-${index}`}
                                            variants={messageVariants}
                                            className={`flex items-end space-x-2 ${isUserSender ? 'justify-end' : 'justify-start'}`}
                                        >
                                            {!isUserSender && (
                                                <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center">
                                                    👨‍🏫
                                                </div>
                                            )}
                                            <div
                                                className={`
                                                    max-w-md px-4 py-2 rounded-2xl
                                                    ${isUserSender
                                                        ? 'bg-blue-600 rounded-br-none'
                                                        : 'bg-gray-700 rounded-bl-none'
                                                    }
                                                    shadow-lg hover:shadow-xl transition-all duration-300
                                                `}
                                            >
                                                <p className="text-white">{msg.content}</p>
                                                <div className="mt-1 text-xs text-gray-400 flex items-center space-x-2">
                                                    <span>{new Date(msg.timestamp).toLocaleString()}</span>
                                                    {isUserSender && <span>✓✓</span>}
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        ) : (
                            <div className="text-center text-gray-500 mt-10">
                                Chọn một cuộc trò chuyện để bắt đầu
                            </div>
                        )}
                    </div>

                    {selectedConversation && (
    <form onSubmit={handleUserSubmit} className="border-t border-gray-800 p-4">
        <div className="flex items-center space-x-2">
            {/* Attachment Button */}
            <button type="button" className="p-2 w-10 text-yellow-500 hover:text-yellow-600 rounded-full hover:bg-gray-700 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </button>

            {/* Message Input */}
            <input
                type="text"
                placeholder="Nhập tin nhắn..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-gray-700 text-white rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors placeholder:text-xl"
            />

            {/* Send Button */}
            <button type="submit" className="p-2 w-10 text-green-500 hover:text-green-600 rounded-full hover:bg-gray-700 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
            </button>
        </div>
    </form>
)}
                </div>

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

            <style jsx>{`
                @keyframes typing {
                    0% { opacity: 0.3; }
                    50% { opacity: 1; }
                    100% { opacity: 0.3; }
                }

                .typing-indicator span {
                    animation: typing 1s infinite;
                }

                .typing-indicator span:nth-child(2) {
                    animation-delay: 0.2s;
                }

                .typing-indicator span:nth-child(3) {
                    animation-delay: 0.4s;
                }

                .message-container {
                    position: relative;
                    overflow: hidden;
                }

                .message-container::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
                    opacity: 0;
                    transition: opacity 0.3s;
                }

                .message-container:hover::before {
                    opacity: 1;
                }

                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }

                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }

                @keyframes glow {
                    0% { box-shadow: 0 0 5px rgba(66, 153, 225, 0.5); }
                    50% { box-shadow: 0 0 20px rgba(66, 153, 225, 0.8); }
                    100% { box-shadow: 0 0 5px rgba(66, 153, 225, 0.5); }
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .float-animation {
                    animation: float 3s ease-in-out infinite;
                }

                .message-animation {
                    animation: fadeIn 0.5s ease-out;
                }

                .message-container:hover {
                    animation: pulse 2s infinite;
                }

                .glow-effect {
                    animation: glow 2s infinite;
                }

                .hover-transform {
                    transition: all 0.3s ease;
                }

                .hover-transform:hover {
                    transform: translateY(-5px) scale(1.02);
                }

                @keyframes float {
                    0% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                    100% {
                        transform: translateY(0px);
                    }
                }

                .float-animation {
                    animation: float 3s ease-in-out infinite;
                }
            `}</style>
        </>
    );
};

const AddTinNhan = ({ onClose, csrfToken, giangVien, nguoiDung, refreshData }) => {
    const [activeTab, setActiveTab] = useState('nguoidung');
    const messagesEndRef = useRef(null);

    const [userFormData, setUserFormData] = useState({
        noidung: '',
        id_giangvien: '',
    });

    const [lecturerFormData, setLecturerFormData] = useState({
        noidung: '',
        id_nguoidung: '',
    });

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUserFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLecturerChange = (e) => {
        const { name, value } = e.target;
        setLecturerFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateUserForm = () => {
        if (!userFormData.noidung || !userFormData.id_giangvien) {
            toast.error('Vui lòng điền đầy đủ thông tin.');
            return false;
        }
        return true;
    };

    const validateLecturerForm = () => {
        if (!lecturerFormData.noidung || !lecturerFormData.id_nguoidung) {
            toast.error('Vui lòng điền đầy đủ thông tin.');
            return false;
        }
        return true;
    };

    const handleUserSubmit = async (e) => {
        e.preventDefault();

        if (!validateUserForm()) return;

        const giangvienId = parseInt(userFormData.id_giangvien, 10);
        const nguoidungId = nguoiDung?.id;

        const newFormData = {
            noidung: [
                {
                    sender_id: nguoidungId,
                    receiver_id: giangvienId,
                    content: userFormData.noidung,
                    timestamp: new Date().toISOString(),
                    sender_type: 'nguoidung',
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
                toast.success('Thêm tin nhắn thành công từ Người dùng!');
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
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [userFormData.noidung]); // Scroll when a new message is added


    return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 mt-14">
    <div className="relative w-[80vw]  bg-gray-900 rounded-lg shadow-2xl  mt-20" style={{ height: 'calc(100vh - 200px)' }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-4 flex items-center justify-between fixed w-[80vw] z-50">
            <h2 className="text-white text-xl font-semibold">Tin nhắn mới</h2>
            <button onClick={onClose} className="text-white w-10 hover:bg-blue-700 rounded-full p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        {/* Message Area */}
        <div className="flex bg-gray-800 mt-20 ">
            {/* Left Sidebar */}
            <div className="w-1/4 border-r border-gray-700 bg-gray-900">
                <div className="p-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm giảng viên..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-full bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                        />
                        <svg className="w-5 h-5 mt-2 text-gray-500 absolute left-2 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <div className="overflow-y-auto  bg-gray-900"  style={{ height: 'calc(100vh - 300px)' }}>
                    {giangVien.map((gv) => (
                        <div
                            key={gv.id}
                            className="flex items-center p-3 hover:bg-gray-800 cursor-pointer transition-colors"
                            onClick={() => handleUserChange({ target: { name: 'id_giangvien', value: gv.id } })}
                        >
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                {gv.ten.charAt(0)}
                            </div>
                            <div className="ml-3">
                                <div className="font-semibold text-gray-200">{gv.ten}</div>
                                <div className="text-sm text-gray-400">Giảng viên</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Message Area */}
            <div className="flex-1 flex flex-col bg-gray-900 relative">
                <div className="flex-1 p-4 overflow-y-scroll ">
                    <div className="flex flex-col space-y-2">
                        {userFormData.noidung && (
                            <div className="flex justify-end">
                                <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[70%]">
                                    {userFormData.noidung}
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Area */}
                <form onSubmit={handleUserSubmit} className="p-4 bg-gray-900 border-t border-gray-700 absolute bottom-0 w-full">
                    <div className="flex items-end space-x-2">
                        <div className="flex-1">
                            <textarea
                                name="noidung"
                                value={userFormData.noidung}
                                onChange={handleUserChange}
                                placeholder="Nhập tin nhắn của bạn..."
                                className="w-full p-3 rounded-2xl bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none border border-gray-700 placeholder-gray-500"
                                rows="3"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 w-12 h-12 hover:bg-blue-700 text-white rounded-full p-3 transition-colors"
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
    );
};

export default NhanTin;
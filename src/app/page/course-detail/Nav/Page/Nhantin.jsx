// FILE: NhanTin.jsx
"use client";
import React, { useState, useEffect, useMemo,useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DanhSachTinNhan, showGiangVien, NguoiDungTinNhan } from '../../../../../service/NhanTin/NhanTin';

const NhanTin = ({ course }) => {
    const [csrfToken, setCsrfToken] = useState('');
    const [giangVien, setGiangVien] = useState([]);
    const [nguoiDung, setNguoiDung] = useState(null);
    const [nhantin, setNhanTin] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [userPresence, setUserPresence] = useState({});
    const [messageReactions, setMessageReactions] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [typingUsers, setTypingUsers] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const IDGiangvien = course.id_giangvien;

    const fetchMessages = useCallback(() => {
        DanhSachTinNhan().then((data) => {
            const filteredMessages = data.filter(
                (item) => item.id_giangvien === IDGiangvien
            );
            setNhanTin(filteredMessages);
            if (filteredMessages.length > 0) {
                if (!selectedConversation || !filteredMessages.find(msg => msg.id === selectedConversation.id)) {
                    setSelectedConversation(filteredMessages[0]);
                }
            } else {
                setSelectedConversation(null);
            }
        }).catch((error) => {
            console.error('Error:', error);
            toast.error('Lỗi khi lấy dữ liệu!');
        });
    }, [IDGiangvien, selectedConversation]);

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (token) setCsrfToken(token);
    }, [IDGiangvien]);

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 10000); // Fetch every 10 seconds
        return () => clearInterval(interval);
    }, [fetchMessages]);

    useEffect(() => {
        showGiangVien().then((data) => {
            const giangVienData = data.find(gv => gv.id === IDGiangvien);
            if (giangVienData) {
                setGiangVien([giangVienData]);
            }
        }).catch((error) => {
            console.error('Error:', error);
            toast.error('Lỗi khi lấy dữ liệu!');
        });
    }, [IDGiangvien]);

    useEffect(() => {
        NguoiDungTinNhan().then((data) => {
            setNguoiDung(data.data);
        }).catch((error) => {
            console.error('Error:', error);
            toast.error('Lỗi khi lấy dữ liệu!');
        });
    }, []);

    const handleSelectConversation = (conversation) => {
        setSelectedConversation(conversation);
    };

    useEffect(() => {
        const trackPresence = () => {
            setUserPresence(prev => ({
                ...prev,
                [nguoiDung?.id]: {
                    status: 'online',
                    lastSeen: new Date().toISOString()
                }
            }));
        };
        
        trackPresence();
        const interval = setInterval(trackPresence, 10000);
        return () => clearInterval(interval);
    }, [nguoiDung]);

    const filteredMessages = useMemo(() => {
        if (!searchQuery) return nhantin;
        return nhantin.filter(item => 
            JSON.parse(item.noidung).some(msg => 
                msg.content.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [nhantin, searchQuery]);

    // Add reaction handler
    const handleReaction = (messageId, reaction) => {
        setMessageReactions(prev => ({
            ...prev,
            [messageId]: [...(prev[messageId] || []), reaction]
        }));
    };

    // Handle message submission
  // Inside handleMessageSubmit function
const handleMessageSubmit = async (e, senderType) => {
    e.preventDefault();
    
    const isFirstMessage = nhantin.length === 0; // Check if it's the first message

    const formData = senderType === 'nguoidung' ? userFormData : lecturerFormData;
    const validate = senderType === 'nguoidung' ? validateUserForm : validateLecturerForm;
    if (!validate()) return;

    const giangvienId = giangVien[0]?.id;
    const nguoidungId = senderType === 'nguoidung' 
        ? nguoiDung?.id 
        : parseInt(formData.id_nguoidung, 10);

    const newFormData = {
        noidung: [
            {
                sender_id: senderType === 'nguoidung' ? nguoiDung?.id : giangvienId,
                receiver_id: senderType === 'nguoidung' ? giangvienId : nguoidungId,
                content: formData.noidung,
                timestamp: new Date().toISOString(),
                sender_type: senderType,
            },
        ],
        id_nguoidung: nguoidungId,
        id_giangvien: giangvienId,
    };

    const url = senderType === 'nguoidung' 
        ? 'https://huuphuoc.id.vn/api/addNhanTin' 
        : '/admin-api/addNhanTin';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
            body: JSON.stringify(newFormData),
            referrerPolicy: senderType === 'nguoidung' ? 'unsafe-url' : undefined,
        });
        if (response.ok) {
            toast.success(`Thêm tin nhắn thành công từ ${senderType === 'nguoidung' ? 'Người dùng' : 'Giảng viên'}!`);
            if (senderType === 'nguoidung') {
                setUserFormData({ noidung: '' });
            } else {
                setLecturerFormData({ noidung: '', id_nguoidung: '' });
            }
            fetchMessages();

            if (isFirstMessage) {
                // Reset the page
                window.location.reload();
            } else {
                // If there was no selected conversation, set the new message as the selected conversation
                if (!selectedConversation) {
                    const returnedData = await response.json();
                    setSelectedConversation(returnedData); // Adjust based on API response
                }
            }
        } else {
            toast.error('Thêm tin nhắn thất bại!');
        }
    } catch (error) {
        console.error('Lỗi khi thêm dữ liệu:', error);
        toast.error('Thêm tin nhắn thất bại!');
    }
};

    // Form states
    const [userFormData, setUserFormData] = useState({
        noidung: '',
    });

    const [lecturerFormData, setLecturerFormData] = useState({
        noidung: '',
        id_nguoidung: '',
    });

    const validateUserForm = () => {
        if (!userFormData.noidung) {
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

    return (
        <>
          <div className=" flex h- w-[880px]">
                {/* Enhanced Sidebar */}
                <aside className="w-1/4 bg-white p-4 flex flex-col">
                    {/* Search and Messages List */}
                    <div className="mb-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm tin nhắn..."
                                className="w-full bg-white text-gray-800 px-4 py-2 rounded-lg text-xl border  border-gray-300"
                                style={{fontSize:"14px", borderRadius:"8px"}}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {isSearching && (
                                <div className="absolute right-3 top-2.5">
                                    <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"/>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex-grow overflow-y-auto">
                        <ul className="space-y-2">
                            {filteredMessages.map((item) => (
                                <li
                                    key={item.id}
                                    onClick={() => handleSelectConversation(item)}
                                    className={`p-3 rounded-lg transition-all duration-200 hover:scale-102 
                                              ${selectedConversation?.id === item.id 
                                                ? 'bg-blue-100 shadow-lg' 
                                                : 'bg-gray-100 hover:bg-gray-200'}`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="relative">
                                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                                                <span className="text-white text-xl font-semibold">
                                                    {nguoiDung?.ten?.[0]}
                                                </span>
                                            </div>
                                            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full 
                                                          ${userPresence[item.id_nguoidung]?.status === 'online' 
                                                            ? 'bg-green-500' 
                                                            : 'bg-gray-400'}`}
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <p className="text-gray-800 font-medium">{item.id}</p>
                                            <p className="text-gray-600 text-sm truncate">
                                                {JSON.parse(item.noidung).slice(-1)[0]?.content || ''}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Enhanced Chat Window */}
                <main className="flex-grow bg-white flex flex-col">
                    {/* Chat Header */}
                    <div className="p-4 bg-gray-100 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                                    <span className="text-white text-xl font-semibold">
                                        {giangVien[0]?.ten?.[0]}
                                    </span>
                                </div>
                                <div>
                                    <h2 className="text-gray-800 font-semibold text-xl">{giangVien[0]?.ten}</h2>
                                    {typingUsers.length > 0 && (
                                        <p className="text-gray-500 text-sm animate-pulse">
                                            Đang nhập...
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-grow overflow-y-auto p-4 space-y-3 h-[500px]">
                        {selectedConversation ? (
                            JSON.parse(selectedConversation.noidung).map((msg, index, array) => {
                                const isUserSender = msg.sender_type === 'nguoidung';
                                const isConsecutive = index > 0 && 
                                                    array[index - 1].sender_type === msg.sender_type;

                                return (
                                    <div
                                        key={index}
                                        className={`flex ${isUserSender ? 'justify-end' : 'justify-start'} 
                                                  ${!isConsecutive ? 'mt-4' : 'mt-1'}`}
                                    >
                                        <div className={`flex items-end space-x-2 max-w-[70%] 
                                                                                               ${isUserSender ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                                        {!isConsecutive && (
                                                            <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0 
                                                                          flex items-center justify-center">
                                                                <span style={{ color: 'white', fontSize: '15px' }}>
                                                                    {isUserSender ? nguoiDung?.ten?.[0] : giangVien[0]?.ten?.[0]}
                                                                </span>
                                                            </div>
                                                        )}
                                            
                                            <div className={`group relative p-3 rounded-lg  
                                                              ${isUserSender 
                                                                ? 'bg-blue-500 text-white' 
                                                                : 'bg-gray-200 text-gray-800'}`}
                                            >
                                                <p style={{ fontSize: '15px' }}>{msg.content}</p>
                                                <div className="absolute bottom-0 right-0 transform translate-y-full 
                                                              opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <div className="flex space-x-1 mt-1">
                                                        {['👍', '❤️', '😊'].map(reaction => (
                                                            <button
                                                                key={reaction}
                                                                onClick={() => handleReaction(msg.id, reaction)}
                                                                className="hover:scale-125 transition-transform"
                                                            >
                                                                {reaction}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                
                                                {messageReactions[msg.id]?.length > 0 && (
                                                    <div className="absolute -bottom-2 right-2 bg-white 
                                                                  rounded-full px-2 py-0.5 text-xl shadow-sm" style={{ fontSize: '15px' }}>
                                                        {messageReactions[msg.id].join(' ')}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-gray-500 text-xl">
                                    Chưa có cuộc trò chuyện. Hãy bắt đầu bằng cách gửi tin nhắn mới!
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Message Input Form */}
                    <form onSubmit={(e) => handleMessageSubmit(e, 'nguoidung')} className="p-4 bg-gray-100 border-t border-gray-200">
                        <div className="flex items-center space-x-4">
                            <textarea
                                name="noidung"
                                value={userFormData.noidung}
                                onChange={(e) => setUserFormData(prev => ({ ...prev, noidung: e.target.value }))}
                                className="flex-grow text-2xl bg-white text-gray-800 rounded-lg px-4 py-2 
                                         focus:ring-2 focus:ring-blue-500 border border-gray-300"
                                placeholder="Nhập tin nhắn..."
                                rows="1"
                            />
                            
                            <button
                                type="submit"
                                className="bg-blue-500 w-20 text-white px-4 py-2 rounded-lg 
                                         hover:bg-blue-600 transform transition-all duration-200 
                                         focus:ring-2 focus:ring-blue-400 text-2xl"
                            >
                                Gửi
                            </button>
                        </div>
                    </form>
                </main>
            </div>

            {/* Toast Container */}
            <ToastContainer />
        </>
    );

};
export default NhanTin;
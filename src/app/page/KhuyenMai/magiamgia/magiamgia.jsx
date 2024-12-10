import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TatCaKhuyenMaiKhoaHoc, NguoiDungMaGiamGia } from '../../../../service/khuyenmai/khuyenmai';
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';
import { Ticket, Clock, Tag } from 'lucide-react';

function VoucherCard({ 
    maso, 
    giamgia, 
    gia, 
    hinh, 
    hansudung, 
    onSave, 
    isSaved, 
    isSaving,
    tenKhoaHoc 
}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div 
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            {/* Voucher Image */}
            <div className="relative">
                <Image
                    width={400}
                    height={200}
                    src={hinh}
                    alt="Voucher Image"
                    className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-105"
                />
                
                {/* Discount Badge */}
                <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xl font-bold flex items-center">
                    <Tag size={20} className="mr-2" />
                    Giảm {giamgia}%
                </div>
            </div>

            {/* Voucher Details */}
            <div className="p-4 space-y-3">
                {/* Discount and Expiry */}
                <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-red-600">
                        Giảm {giamgia}%
                    </div>
                    <div className="text-xl text-gray-500 flex items-center">
                        <Clock size={20} className="mr-2 text-gray-400" />
                        HSD: {new Date(hansudung).toLocaleDateString()}
                    </div>
                </div>

                {/* Course Name and Minimum Order */}
                <div>
                    <h3 className="text-xl text-gray-800 font-semibold mb-1 truncate">
                        {tenKhoaHoc}
                    </h3>
                    <div className="text-xl text-gray-600 flex items-center">
                        <Ticket size={20} className="mr-2 text-gray-400" />
                        Đơn tối thiểu {gia.toLocaleString()}₫
                    </div>
                </div>

                {/* Voucher Code */}
                <div className="bg-gray-100 py-2 px-3 rounded-lg text-center">
                    <code className="text-xl text-gray-700 font-mono tracking-wider">
                        {maso}
                    </code>
                </div>

                {/* Save Button */}
                <motion.button
                    onClick={() => onSave(maso)}
                    disabled={isSaved || isSaving}
                    whileTap={{ scale: 0.95 }}
                    className={`
                        w-full py-3 rounded-lg text-xl font-bold uppercase tracking-wider
                        transition-all duration-300 ease-in-out flex items-center justify-center
                        ${isSaved ? 'bg-green-500 text-white' : 
                          isSaving ? 'bg-gray-300 text-gray-500' : 
                          'bg-red-50 text-red-500 border border-red-500 hover:bg-red-100'}
                        ${isSaved || isSaving ? 'cursor-not-allowed' : 'cursor-pointer'}
                    `}
                >
                    {isSaving ? "Đang Lưu..." : 
                     isSaved ? "Đã Lưu" : 
                     "Lưu Voucher"}
                </motion.button>
            </div>

            {/* Hover Effect */}
            {isHovered && (
                <motion.div 
                    className="absolute inset-0 bg-black bg-opacity-10 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                />
            )}
        </motion.div>
    );
}

export default function VoucherShop() {
    const [savedVouchers, setSavedVouchers] = useState([]);
    const [KhuyenMai, setKhuyenMai] = useState([]);
    const [loading, setLoading] = useState(true);
    const [savingVouchers, setSavingVouchers] = useState([]);

    const [discount, setDiscount] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const vouchersPerPage = 8;

    const [isLayoutReady, setIsLayoutReady] = useState(false);

    useEffect(() => {
        setIsLayoutReady(true);
        
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await TatCaKhuyenMaiKhoaHoc();
                setKhuyenMai(response);
            } catch (error) {
                console.error('Fetch error:', error);
                toast.error("Không thể tải voucher. Vui lòng thử lại!");
            } finally {
                setLoading(false);
            }
        };
        fetchData();

        return () => {
            setIsLayoutReady(false);
        };
    }, []);

    if (!isLayoutReady) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-red-500"></div>
            </div>
        );
    }

    const handleSave = async (maso) => {
        try {
            setSavingVouchers(prev => [...prev, maso]);
            const selectedCoupon = KhuyenMai.find(item => item.magiamgia.maso === maso);
            if (selectedCoupon) {
                await NguoiDungMaGiamGia({ id_magiamgia: selectedCoupon.magiamgia.id });
                setSavedVouchers(prev => [...prev, maso]);
                toast.success("🎉 Voucher đã được lưu thành công!");
            }
        } catch (error) {
            console.error('Save error:', error);
            toast.error("Không thể lưu voucher. Vui lòng thử lại!");
        } finally {
            setSavingVouchers(prev => prev.filter(id => id !== maso));
        }
    };

    const filteredVouchers = KhuyenMai.filter(item => {
        const meetsDiscount = discount ? item.magiamgia.giamgia >= parseInt(discount) : true;
        const meetsMinPrice = minPrice ? item.khoahoc.gia >= parseInt(minPrice) : true;
        const meetsMaxPrice = maxPrice ? item.khoahoc.gia <= parseInt(maxPrice) : true;
        return meetsDiscount && meetsMinPrice && meetsMaxPrice;
    });

    const indexOfLastVoucher = currentPage * vouchersPerPage;
    const indexOfFirstVoucher = indexOfLastVoucher - vouchersPerPage;
    const currentVouchers = filteredVouchers.slice(indexOfFirstVoucher, indexOfLastVoucher);

    const totalPages = Math.ceil(filteredVouchers.length / vouchersPerPage);

    const resetFilters = () => {
        setDiscount('');
        setMinPrice('');
        setMaxPrice('');
        setCurrentPage(1);
    };

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <ToastContainer position="top-right" autoClose={3000} />
            
            <div className="container mx-auto flex space-x-6">
                {/* Filter Sidebar */}
                <div className="w-1/4 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Bộ Lọc Ưu Đãi
                    </h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xl font-medium text-gray-700 mb-2">
                                Giảm Giá Tối Thiểu (%)
                            </label>
                            <input
                                type="number"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Nhập % giảm giá"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-xl font-medium text-gray-700 mb-2">
                                Giá Tối Thiểu (₫)
                            </label>
                            <input
                                type="number"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Giá tối thiểu"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-xl font-medium text-gray-700 mb-2">
                                Giá Tối Đa (₫)
                            </label>
                            <input
                                type="number"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Giá tối đa"
                            />
                        </div>
                        
                        <button
                            onClick={resetFilters}
                            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
                        >
                            Đặt Lại Bộ Lọc
                        </button>
                    </div>
                </div>

                {/* Voucher Grid */}
                <div className="w-3/4">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-red-500"></div>
                        </div>
                    ) : (
                        <div>
                            <div className="grid grid-cols-4 gap-4">
                                {currentVouchers.length > 0 ? (
                                    currentVouchers.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <VoucherCard
                                                maso={item.magiamgia.maso}
                                                giamgia={item.magiamgia.giamgia}
                                                gia={item.khoahoc.gia}
                                                hinh={item.khoahoc.hinh}
                                                hansudung={item.magiamgia.ngayketthuc}
                                                onSave={handleSave}
                                                isSaved={savedVouchers.includes(item.magiamgia.maso)}
                                                isSaving={savingVouchers.includes(item.magiamgia.maso)}
                                            />
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="col-span-4 text-center text-xl text-gray-500">
                                        Không tìm thấy voucher phù hợp.
                                    </div>
                                )}
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-center mt-8 space-x-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-white border rounded-md disabled:opacity-50 hover:bg-gray-100 text-xl"
                                >
                                    Trước
                                </button>

                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`
                                            px-4 py-2 rounded-md text-xl
                                            ${currentPage === index + 1 
                                                ? 'bg-red-500 text-white' 
                                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                            }
                                        `}
                                    >
                                        {index + 1}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-white border rounded-md disabled:opacity-50 hover:bg-gray-100 text-xl"
                                >
                                    Tiếp
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
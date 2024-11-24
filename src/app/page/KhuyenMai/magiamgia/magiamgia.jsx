import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TatCaKhuyenMaiKhoaHoc, NguoiDungMaGiamGia } from '../../../../service/khuyenmai/khuyenmai';
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';

function VoucherCard({ maso, giamgia, gia, hinh, hansudung, onSave, isSaved, isSaving }) {
    return (
        <div className="flex bg-white rounded-lg overflow-hidden w-full max-w-sm h-auto relative border-1">
            <div className="w-1/3 relative overflow-hidden">
                <Image
                    width={150}
                    height={180}
                    src={hinh}
                    alt="Voucher Image"
                    className="h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20"></div>
            </div>
            <div className="absolute h-full flex flex-col justify-between items-center" style={{ left: '33.333%' }}>
                <div className="w-6 h-6 rounded-full bg-gray-100 -mt-3"></div>
                <div className="h-full border-dashed border-l-2 border-gray-200"></div>
                <div className="w-6 h-6 rounded-full bg-gray-100 -mb-3"></div>
            </div>
            <div className="w-2/3 p-4 flex flex-col justify-between relative">
                <div className="space-y-2">
                    <div className="text-2xl sm:text-3xl font-bold text-red-600 tracking-wide truncate">-{giamgia}%</div>
                    <div className="text-md sm:text-lg text-gray-700 tracking-wide leading-relaxed break-words">
                        Đơn tối thiểu {gia.toLocaleString()}₫
                    </div>
                    <div className="bg-gray-100 px-3 sm:px-4 py-1 sm:py-2 rounded text-sm sm:text-md font-mono tracking-wider truncate">
                        {maso}
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="text-xs sm:text-sm text-gray-600 tracking-wide">
                        HSD: {new Date(hansudung).toLocaleDateString()}
                    </div>
                    <button
                        className={`
                            w-full py-2.5 rounded-lg text-white text-sm font-medium
                            transform transition-all duration-300 ease-in-out
                            hover:scale-[1.02] active:scale-[0.98]
                            ${isSaved ? 'bg-emerald-500 hover:bg-emerald-600' : isSaving ? 'bg-amber-500 animate-pulse' : 'bg-rose-500 hover:bg-rose-600'}
                            ${isSaved || isSaving ? 'cursor-not-allowed' : 'cursor-pointer'}
                            focus:outline-none focus:ring-2 focus:ring-offset-2
                            ${isSaved ? 'focus:ring-emerald-500' : isSaving ? 'focus:ring-amber-500' : 'focus:ring-rose-500'}
                        `}
                        onClick={() => onSave(maso)}
                        disabled={isSaved || isSaving}
                    >
                        <span className="inline-flex items-center">
                            {isSaving && (
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                            )}
                            {isSaved ? "✓ Đã Lưu Thành Công" : isSaving ? "Đang Xử Lý..." : "Lưu Voucher Ngay"}
                        </span>
                    </button>
                </div>
            </div>
        </div>
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
    const vouchersPerPage = 9;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await TatCaKhuyenMaiKhoaHoc();
                setKhuyenMai(response);
            } catch (error) {
                console.error('Fetch error:', error);
                toast.error("Failed to fetch vouchers.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

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

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="container flex ">
                <div className="w-1/4 p-6 me-1 bg-white rounded-xl  border-1">
                    <h1 className="text-3xl font-bold text-center mb-6  text-black  ">
                        Ưu Đãi Đặc Biệt 🎉
                    </h1>
                    <div className="space-y-5">
                        <div className="filter-group">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                    </svg>
                                    Giảm Giá Tối Thiểu (%)
                                </span>
                            </label>
                            <input
                                type="number"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                        </div>
                        <div className="filter-group">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Giá Tối Thiểu (₫)
                                </span>
                            </label>
                            <input
                                type="number"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                        </div>
                        <div className="filter-group">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Giá Tối Đa (₫)
                                </span>
                            </label>
                            <input
                                type="number"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                        </div>
                        <button
                            onClick={() => {
                                setDiscount('');
                                setMinPrice('');
                                setMaxPrice('');
                            }}
                            className="w-full mt-6 px-4 py-2 bg-gradient-to-r bg-[#ff6b6b] text-white rounded-lg hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Đặt Lại
                        </button>
                    </div>
                </div>
                <div className="w-3/4 ">
                    {loading ? (
                        <div className="flex justify-center items-center min-h-[200px]">
                            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-red-600"></div>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 px-4 max-w-7xl mx-auto">
                                {currentVouchers.length > 0 ? (
                                    currentVouchers.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex justify-center w-full"
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
                                                className="w-full"
                                            />
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="col-span-full text-center text-gray-500">
                                        Không tìm thấy voucher phù hợp.
                                    </div>
                                )}
                            </div>
                            <div className="flex  ml-60  items-center justify-center mt-6 gap-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center disabled:opacity-50 hover:bg-purple-300"
                                >
                                    ←
                                </button>

                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center
                ${currentPage === index + 1
                                                ? 'bg-purple-600 text-white'
                                                : 'bg-purple-200 hover:bg-purple-300'}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center disabled:opacity-50 hover:bg-purple-300"
                                >
                                    →
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </>
    );
}
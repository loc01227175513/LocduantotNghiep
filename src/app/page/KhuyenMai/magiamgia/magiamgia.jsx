import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TatCaKhuyenMaiKhoaHoc, NguoiDungMaGiamGia } from '../../../../service/khuyenmai/khuyenmai';
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';
import { calc } from "@chakra-ui/react";

function VoucherCard({ maso, giamgia, gia, hinh, hansudung, onSave, isSaved, isSaving }) {
    return (
        <div className='mt-2 rounded-lg  '>
            <div className='w-[400px] h-[150px] bg-gray-100 flex relative rounded-lg border-2'>
                <div className='w-[150px] h-[150px] bg-red-400 flex-shrink-0 rounded-lg '>
                    <Image
                        width={150}
                        height={150}
                        src={hinh}
                        alt="Voucher Image"
                        className="min-h-[150px] min-w-[150px] rounded-lg object-cover hover:scale-110 transition-transform duration-300"
                    />
                </div>
                <div className=' rounded-lg flex-1 w-[250px] p-3 border-l-2 border-dashed border-black '>
                    <div>
                        <div className="flex flex-row justify-start gap-2 items-center">
                            <p className="text-black font-normal">
                                Giảm ngay
                            </p>
                            <p className="text-red-600 font-bold text-6xl">
                                {giamgia}%
                            </p>
                        </div>
                        <p className="font-normal">Cho đơn tối thiểu {gia.toLocaleString()} đ</p>
                        <div className="flex gap-2">
                            <p className="font-normal"> Mã:</p>
                            <p className="font-bold" s>
                                {maso}
                            </p>
                        </div>
                        <p className="font-normal">HSD: {new Date(hansudung).toLocaleDateString()}</p>
                        <button
                            className={` float-end
                        w-[40px] py-2.5 rounded-lg text-xl font-medium
                        transform transition-all duration-300 ease-in-out
                        hover:scale-[1.02] active:scale-[0.98]
                        hover:bg-pink-700
                        border-1 
                        border-black
                        ${isSaved ? 'white hover:bg-pink-700 text-pink-700 hover:text-white rounded-full' :
                                    isSaving ? 'text-pink-700 bg-transparent' :
                                        'text-pink-700 border-2 border-pink-700 hover:bg-pink-700 hover:text-white'}
                        ${isSaved || isSaving ? 'cursor-not-allowed' : 'cursor-pointer'}
                        focus:outline-none focus:ring-2 focus:ring-offset-2
                        ${isSaved ? 'focus:ring-emerald-500 ' : isSaving ? 'focus:ring-amber-500' : 'focus:ring-rose-500'}
                    `}
                            onClick={() => onSave(maso)}
                            disabled={isSaved || isSaving}
                        >
                            <span className="inline-flex items-center text-2xl text-center">
                                {isSaving && (
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                )}
                                {isSaved ? <div className="flex  items-start  justify-center ">
                                    <p className="py-0 mt-0">✓</p>

                                </div> : isSaving ? ""
                                    :

                                    <div className="flex gap-2 items-center">
                                        {/* <p>lưu</p> */}
                                        <i class="fa-regular fa-bookmark"></i>
                                    </div>}
                            </span>
                        </button>
                    </div>
                </div>
                <div className='absolute left-[140px] top-[-10px]'>
                    <div className='w-[20px] h-[20px] rounded-full bg-white'>

                    </div>
                    <div className='w-[20px] h-[20px] rounded-full bg-white mt-[130px]'>

                    </div>
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
    const vouchersPerPage = 4;

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
    console.log(currentVouchers);


    const totalPages = Math.ceil(filteredVouchers.length / vouchersPerPage);

    return (
        <>
            <div className="h-auto flex justify-center min-h-[700px]">
                <ToastContainer position="top-right" autoClose={3000} />
                <div className="container  flex flex-row justify-start items-start">
                    <div className=" flex-shrink-0 bg-white rounded-xl border border-gray-300 w-[calc(100%-1000px)] p-10 shadow-lg">
                        <h1 className="text-3xl font-bold text-center mb-6 text-black">
                            Ưu Đãi Đặc Biệt 🎉
                        </h1>
                        <div className="space-y-5">
                            <div className="filter-group">
                                <label className="block text-xl font-medium text-gray-700 mb-2">
                                    <span className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                        </svg>
                                        Giảm Giá Tối Thiểu (%)
                                    </span>
                                </label>
                                <div className="border border-gray-300 rounded-lg">
                                    <input
                                        type="number"
                                        value={discount}
                                        onChange={(e) => setDiscount(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>
                            <div className="filter-group">
                                <label className="block text-xl font-medium text-gray-700 mb-2">
                                    <span className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Giá Tối Thiểu (₫)
                                    </span>
                                </label>
                                <div className="border border-gray-300 rounded-lg">
                                    <input
                                        type="number"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>
                            <div className="filter-group">
                                <label className="block text-xl font-medium text-gray-700 mb-2">
                                    <span className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Giá Tối Đa (₫)
                                    </span>
                                </label>
                                <div className="border border-gray-300 rounded-lg">
                                    <input
                                        type="number"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setDiscount('');
                                    setMinPrice('');
                                    setMaxPrice('');
                                }}
                                className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Đặt Lại
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 relative ">
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
                                <div className="">
                                    <div
                                        className="flex flex-wrap justify-center gap-5 h-[400px]"

                                    >
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
                                            <div className="col-span-full text-center text-gray-500">
                                                Không tìm thấy voucher phù hợp.
                                            </div>
                                        )}

                                    </div>

                                    <div className="flex   flex-row  justify-center mt-6 gap-2 right-52 left-52 absolute -bottom-20   mx-auto   ">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center disabled:opacity-50 hover:bg-purple-300 shadow-md"
                                        >
                                            ←
                                        </button>

                                        {[...Array(totalPages)].map((_, index) => (
                                            <button
                                                key={index + 1}
                                                onClick={() => setCurrentPage(index + 1)}
                                                className={`w-10 h-10 rounded-full flex items-center justify-center
                                    ${currentPage === index + 1 ? 'bg-purple-600 text-white' : 'bg-purple-200 hover:bg-purple-300'}`}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}

                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center disabled:opacity-50 hover:bg-purple-300 shadow-md"
                                        >
                                            →
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
}
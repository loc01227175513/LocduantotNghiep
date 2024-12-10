import React, { useState, useEffect } from 'react';

function TrangGiaKhoaHoc() {
    const [currency, setCurrency] = useState('usd');
    const [priceTier, setPriceTier] = useState('');
    const [premiumAppWarning] = useState(true);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [discount, setDiscount] = useState('');
    const [message, setMessage] = useState('');
    const [id, setId] = useState(null);
    useEffect(() => {
        if (typeof window !== "undefined") {
            const currentUrl = window.location.href;
            const url = new URL(currentUrl);
            const idFromUrl = url.searchParams.get("id");
            setId(idFromUrl);
        }
    }, []);
    useEffect(() => {
        const fetchCoursePrice = async () => {
            try {
                const response = await fetch('https://huuphuoc.id.vn/api/showgiaKhoaHoc', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id_khoahoc: id }),
                    referrerPolicy: 'unsafe-url',
                });
                if (response.ok) {
                    await response.json();
                    setPriceTier(data.gia);
                    setDiscount(data.giamgia);
                } else {
                    setMessage('Lỗi lấy giá khóa học.');
                }
            } catch (error) {
                setMessage('Lỗi lấy giá khóa học.');
            }
        };

        fetchCoursePrice();
    }, [id]);

    const currencies = [
        'USD', 'VND'
    ];

    const priceTiers = {
        usd: [
            { value: '0', label: 'Free', vndLabel: 'Free' },
            { value: '19.99', label: '$19.99 (tier 1)', vndLabel: '₫399,000 (tier 1)' },
            { value: '22.99', label: '$22.99 (tier 2)', vndLabel: '₫449,000 (tier 2)' },
            { value: '24.99', label: '$24.99 (tier 3)', vndLabel: '₫499,000 (tier 3)' },
            { value: '27.99', label: '$27.99 (tier 4)', vndLabel: '₫549,000 (tier 4)' },
            { value: '29.99', label: '$29.99 (tier 5)', vndLabel: '₫599,000 (tier 5)' },
            { value: '34.99', label: '$34.99 (tier 6)', vndLabel: '₫649,000 (tier 6)' },
            { value: '39.99', label: '$39.99 (tier 7)', vndLabel: '₫699,000 (tier 7)' },
            { value: '44.99', label: '$44.99 (tier 8)', vndLabel: '₫749,000 (tier 8)' },
            { value: '49.99', label: '$49.99 (tier 9)', vndLabel: '₫799,000 (tier 9)' },
            { value: '54.99', label: '$54.99 (tier 10)', vndLabel: '₫849,000 (tier 10)' },
            { value: '59.99', label: '$59.99 (tier 11)', vndLabel: '₫899,000 (tier 11)' },
            { value: '64.99', label: '$64.99 (tier 12)', vndLabel: '₫949,000 (tier 12)' },
            { value: '69.99', label: '$69.99 (tier 13)', vndLabel: '₫999,000 (tier 13)' },
            { value: '74.99', label: '$74.99 (tier 14)', vndLabel: '₫1,049,000 (tier 14)' },
            { value: '79.99', label: '$79.99 (tier 15)', vndLabel: '₫1,099,000 (tier 15)' },
            { value: '84.99', label: '$84.99 (tier 16)', vndLabel: '₫1,149,000 (tier 16)' },
            { value: '89.99', label: '$89.99 (tier 17)', vndLabel: '₫1,199,000 (tier 17)' },
            { value: '94.99', label: '$94.99 (tier 18)', vndLabel: '₫1,249,000 (tier 18)' },
            { value: '99.99', label: '$99.99 (tier 19)', vndLabel: '₫1,299,000 (tier 19)' },
            { value: '109.99', label: '$109.99 (tier 20)', vndLabel: '₫1,349,000 (tier 20)' },
            { value: '119.99', label: '$119.99 (tier 21)', vndLabel: '₫1,399,000 (tier 21)' },
            { value: '124.99', label: '$124.99 (tier 22)', vndLabel: '₫1,499,000 (tier 22)' },
            { value: '129.99', label: '$129.99 (tier 23)', vndLabel: '₫1,599,000 (tier 23)' },
            { value: '139.99', label: '$139.99 (tier 24)', vndLabel: '₫1,699,000 (tier 24)' },
            { value: '149.99', label: '$149.99 (tier 25)', vndLabel: '₫1,799,000 (tier 25)' },
            { value: '159.99', label: '$159.99 (tier 26)', vndLabel: '₫1,899,000 (tier 26)' },
            { value: '174.99', label: '$174.99 (tier 27)', vndLabel: '₫2,199,000 (tier 27)' },
            { value: '189.99', label: '$189.99 (tier 28)', vndLabel: '₫2,399,000 (tier 28)' },
            { value: '199.99', label: '$199.99 (tier 29)', vndLabel: '₫2,499,000 (tier 29)' },
        ],
        vnd: [
            { value: '0', label: 'Free', usdLabel: 'Free' },
            { value: '399000', label: '₫399,000 (tier 1)', usdLabel: '$19.99 (tier 1)' },
            { value: '449000', label: '₫449,000 (tier 2)', usdLabel: '$22.99 (tier 2)' },
            { value: '499000', label: '₫499,000 (tier 3)', usdLabel: '$24.99 (tier 3)' },
            { value: '549000', label: '₫549,000 (tier 4)', usdLabel: '$27.99 (tier 4)' },
            { value: '599000', label: '₫599,000 (tier 5)', usdLabel: '$29.99 (tier 5)' },
            { value: '649000', label: '₫649,000 (tier 6)', usdLabel: '$34.99 (tier 6)' },
            { value: '699000', label: '₫699,000 (tier 7)', usdLabel: '$39.99 (tier 7)' },
            { value: '749000', label: '₫749,000 (tier 8)', usdLabel: '$44.99 (tier 8)' },
            { value: '799000', label: '₫799,000 (tier 9)', usdLabel: '$49.99 (tier 9)' },
            { value: '849000', label: '₫849,000 (tier 10)', usdLabel: '$54.99 (tier 10)' },
            { value: '899000', label: '₫899,000 (tier 11)', usdLabel: '$59.99 (tier 11)' },
            { value: '949000', label: '₫949,000 (tier 12)', usdLabel: '$64.99 (tier 12)' },
            { value: '999000', label: '₫999,000 (tier 13)', usdLabel: '$69.99 (tier 13)' },
            { value: '1049000', label: '₫1,049,000 (tier 14)', usdLabel: '$74.99 (tier 14)' },
            { value: '1099000', label: '₫1,099,000 (tier 15)', usdLabel: '$79.99 (tier 15)' },
            { value: '1149000', label: '₫1,149,000 (tier 16)', usdLabel: '$84.99 (tier 16)' },
            { value: '1199000', label: '₫1,199,000 (tier 17)', usdLabel: '$89.99 (tier 17)' },
            { value: '1249000', label: '₫1,249,000 (tier 18)', usdLabel: '$94.99 (tier 18)' },
            { value: '1299000', label: '₫1,299,000 (tier 19)', usdLabel: '$99.99 (tier 19)' },
            { value: '1349000', label: '₫1,349,000 (tier 20)', usdLabel: '$109.99 (tier 20)' },
            { value: '1399000', label: '₫1,399,000 (tier 21)', usdLabel: '$119.99 (tier 21)' },
            { value: '1499000', label: '₫1,499,000 (tier 22)', usdLabel: '$124.99 (tier 22)' },
            { value: '1599000', label: '₫1,599,000 (tier 23)', usdLabel: '$129.99 (tier 23)' },
            { value: '1699000', label: '₫1,699,000 (tier 24)', usdLabel: '$139.99 (tier 24)' },
            { value: '1799000', label: '₫1,799,000 (tier 25)', usdLabel: '$149.99 (tier 25)' },
            { value: '1899000', label: '₫1,899,000 (tier 26)', usdLabel: '$159.99 (tier 26)' },
            { value: '2199000', label: '₫2,199,000 (tier 27)', usdLabel: '$174.99 (tier 27)' },
            { value: '2399000', label: '₫2,399,000 (tier 28)', usdLabel: '$189.99 (tier 28)' },
            { value: '2499000', label: '₫2,499,000 (tier 29)', usdLabel: '$199.99 (tier 29)' },
        ]
    };

    const generateDiscountTiers = (selectedPriceTier) => {
        const selectedTier = priceTiers[currency].find(tier => tier.value === selectedPriceTier);
        if (!selectedTier) return [];

        const selectedPrice = parseFloat(selectedTier.value);
        return priceTiers[currency]
            .filter(tier => parseFloat(tier.value) < selectedPrice)
            .map(tier => ({ value: tier.value, label: `${tier.label} (discount)` }));
    };

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value);
        setPriceTier('');
        setDiscount('');
        setIsSaveDisabled(true);
    };

    const handlePriceTierChange = (e) => {
        const selectedPriceTier = e.target.value;
        setPriceTier(selectedPriceTier);
        setIsSaveDisabled(selectedPriceTier === '');

        if (selectedPriceTier === '0') {
            setDiscount('0');
        } else {
            setDiscount('');
        }
    };

    const handleDiscountChange = (e) => {
        setDiscount(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://huuphuoc.id.vn/api/capnhatgiaKhoaHoc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_khoahoc: id,
                    gia: priceTier,
                    giamgia: discount,
                }),
                referrerPolicy: 'unsafe-url',
            });

            if (response.ok) {
                const data = await response.json();
                setMessage('Cập nhật giá khóa học thành công.');
            } else {
                setMessage('Cập nhật giá khóa học thất bại.');
            }
        } catch (error) {
            setMessage('Cập nhật giá khóa học thất bại.');
        }
    };

    return (
        <div className="max-w-4xl p-8 mx-auto bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-xl">
            <h2 className="mb-6 text-3xl font-bold text-center flex items-center justify-center gap-3">
                <svg className="w-8 h-8 text-pink-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="bg-clip-text text-[20px] text-transparent bg-gradient-to-r from-pink-500 to-pink-400">
                    Giá cả khóa học
                </span>
            </h2>

            {premiumAppWarning && (
                <div className="flex items-center p-5 mb-6 bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                    <svg className="w-8 h-8 mr-3 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            className="animate-pulse" />
                    </svg>
                    <div>
                        <h3 className="font-bold text-yellow-800 text-[14px] mb-2">Hoàn thành ứng dụng cao cấp của bạn</h3>
                        <p className="text-yellow-700 text-[14px]">Đặt giá của bạn sau khi phê duyệt phương thức xuất chi</p>
                        <a href="/instructor/user/edit-instructor-info/"
                            className="inline-flex items-center mt-2 text-[14px] hover:text-pink-800 font-semibold transition-colors group">
                            Hoàn thành ứng dụng
                            <svg className="w-5 h-5 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </a>
                    </div>
                </div>
            )}


            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-3">
                    <svg className="w-6 h-6 mr-2 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-[14px] font-bold text-gray-800">Đặt giá khóa học của bạn</h3>
                </div>
                <p className="mb-6 text-gray-600 text-[14px] leading-relaxed">
                    Chọn tiền tệ ưu tiên và cấp giá của bạn.Các khóa học miễn phí phải dưới 2 giờ trong tổng chiều dài.
                    Các khóa học kiểm tra thực hành không thể được cung cấp miễn phí.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="group">
                        <label htmlFor="currency" className="block mb-2 text-[14px] font-thin text-gray-700 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Tiền tệ
                        </label>
                        <select
                            id="currency"
                            value={currency}
                            onChange={handleCurrencyChange}
                            className="w-full p-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg 
                                 focus:ring-2 text-[14px] focus:ring-pink-500 focus:border-transparent
                                 transition-all duration-200 hover:bg-gray-100">
                            {currencies.map((cur) => (
                                <option key={cur} value={cur.toLowerCase()}>{cur}</option>
                            ))}
                        </select>
                    </div>

                    <div className="group">
                        <label htmlFor="price-tier" className="block text-[14px] mb-2 font-semibold text-gray-700 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            Cấp giá
                        </label>
                        <select
                            id="price-tier"
                            value={priceTier}
                            onChange={handlePriceTierChange}
                            className="w-full p-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg
                                 focus:ring-2 text-[14px] focus:ring-pink-500 focus:border-transparent
                                 transition-all duration-200 hover:bg-gray-100">
                            <option value="">Select a tier</option>
                            {priceTiers[currency].map((tier) => (
                                <option key={tier.value} value={tier.value}>
                                    {tier.label} / {tier.vndLabel}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="group">
                        <label htmlFor="discount" className="block text-[14px] mb-2 font-semibold text-gray-700 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            Giảm giá
                        </label>
                        <select
                            id="discount"
                            value={discount}
                            onChange={handleDiscountChange}
                            disabled={priceTier === '0'}
                            className="w-full p-3 text-[14px] text-gray-700 bg-gray-50 border border-gray-200 rounded-lg
                                 focus:ring-2 focus:ring-pink-500 focus:border-transparent
                                 transition-all duration-200 hover:bg-gray-100
                                 disabled:opacity-50 disabled:cursor-not-allowed">
                            <option value="">Select discount</option>
                            {generateDiscountTiers(priceTier).map((tier) => (
                                <option key={tier.value} value={tier.value}>{tier.label}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={isSaveDisabled}
                        className={`w-full p-3 mt-6 text-white font-semibold rounded-lg
                          bg-gradient-to-r from-pink-700 to-pink-700 text-[14px]

                          transition-all duration-200 flex items-center justify-center
                          ${isSaveDisabled ? 'opacity-50 cursor-not-allowed' : 'transform hover:-translate-y-0.5'}`}>
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                        Lưu các thay đổi
                    </button>
                </form>

                {message && (
                    <div className=" p-3 text-[13px] text-red-600  rounded-lg text-center">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TrangGiaKhoaHoc;
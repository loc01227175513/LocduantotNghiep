import React from 'react'
import Link from 'next/link'
export default function Success() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h1 className="text-[20px] font-bold text-gray-800">Thanh toán thành công</h1>
                <p className="text-gray-600 mt-2 text-[16px]">Cảm ơn bạn đã mua khóa học!</p>
                <Link href="/" className="text-blue-500 mt-4 inline-block font-medium text-[16px]">Quay lại trang chủ</Link>
            </div>
        </div>
    )
}

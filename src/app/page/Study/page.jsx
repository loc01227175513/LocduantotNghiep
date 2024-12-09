"use client";
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Page from './home/page.jsx';
import Header from '@/app/component/header/page.jsx';
import Footercomponent from '@/app/component/footer/page.jsx';

export default function StudyPage() {
    const router = useRouter();

    useEffect(() => {
        // Kiểm tra dữ liệu trong localStorage
        const userData = localStorage.getItem('data'); // hoặc tên key bạn đang sử dụng
        
        if (!userData) {
            // Nếu không có data, chuyển hướng về trang login
            router.push('/page/login');
        }
    }, [router]);

    return (
        <>
            <Header />
            <Page />
            <Footercomponent />
        </>
    )
}

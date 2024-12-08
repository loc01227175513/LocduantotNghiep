"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../component/header/page";
import { Headerdashboardstudent1, Headerdashboardstudent2 } from './headerdashboardlecturer';

export default function Layoutdashboardlecturer({ children }) {
    const router = useRouter();

    useEffect(() => {
        // Check if user data exists in localStorage
        const userData = localStorage.getItem('data');
        if (!userData) {
            router.push('/page/login');
        }
    }, [router]);

    return (
        <>
            <Header />
            <div className="mt-[50px] dashboard-banner-area-wrapper">
                <div className="container">
                    <div className="row">
                        {/* <Headerdashboardstudent1/> */}
                    </div>
                </div>
            </div>
            {/* dashboard banner area end */}
            {/* rts dahboard-area-main-wrapper */}
            <div className="dashboard--area-main pt--100">
                <div className="container">
                    <div className="row g-5">
                        <Headerdashboardstudent2 page={"home"} />
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import Banner from "./Banner/page";
import Main1 from "./main/main1";
import Main2 from "./main/main2";
import Header from "../../component/header/page";
import Footercomponent from "../../component/footer/page";

export default function Becomeinstructor() {
    const router = useRouter();

    useEffect(() => {
        // Kiểm tra xem có data trong localStorage không
        const userData = localStorage.getItem('data');
        if (!userData) {
            // Nếu không có data, chuyển hướng về trang login
            router.push('/page/login');
        }
    }, [router]);

    return (
        <>
            <Header />
            <div className="rts-bread-crumbarea-1 rts-section-gap bg-gradient-to-r from-blue-900 to-pink-700 via-pink-700 mt-44">
                <div className="container">
                    <Banner />
                </div>
            </div>
            <div className="rts-section-gap">
                <div className="container-2">
                    <div className="row">
                        <div className="col-lg-12">
                            <Main1 />
                            <Main2 />
                        </div>
                    </div>
                </div>
            </div>
            <Footercomponent />
        </>
    )
}
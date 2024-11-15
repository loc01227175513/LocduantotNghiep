import React from 'react';
import { AllGiangVien } from './AllGiangVien';
import Header from '../../component/header/page';
import Footercomponent from '../../component/footer/page';

export default function page() {
    return (
        <>
            <Header />
            <div className="flex flex-col min-h-screen pt-20 "> {/* Adjusted styling here */}
                <div className="flex-grow"> {/* Ensures the Profileinsructor takes available space */}
                    <AllGiangVien />
                </div>
                <div className="mt-20">
                    <Footercomponent />
                </div>
            </div>
        </>
    );
}
"use client";
import React, { useState } from 'react';
import { AllGiangVien } from './AllGiangVien';
import Header from '../../component/header/page';
import Footercomponent from '../../component/footer/page';

export default function Page() {


    return (
        <> <div className='relative'>
            <Header />
            <div className="flex flex-col min-h-screen">
                <div className="min-h-screen text-white">

                    <div className="flex-grow pt-40">
                        <AllGiangVien />
                    </div>
                    <div className="mt-20">
                        <Footercomponent />
                    </div>
                </div>
            </div>
        </div>

        </>
    );
}
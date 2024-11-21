"use client";
import React from 'react';
import Roadmap from './courseLoTrinh';
import Header from '../../component/header/page';
import Footercomponent from '../../component/footer/page';

export default function Page() {
    return (
        <>
            <Header />
            <div className='container  mb-60 px-4 mt-60 w-screen'>
              
                        <Roadmap />
                
            </div>
            <Footercomponent />
        </>
    );
}
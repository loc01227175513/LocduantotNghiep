"use client";
import React from 'react'
import Page from './home/page.jsx';
import Header from '@/app/component/header/page.jsx';
import Footercomponent from '@/app/component/footer/page.jsx';
export default function page() {
    return (
        <>
            <Header />
            <Page />
            <Footercomponent />
        </>
    )
}

-+
"use client";
import React from 'react';
import Page from './home/page'; // Ensure this matches the default export
import Header from "../../component/header/page";
import Footercomponent from "../../component/footer/page";

export default function page() {
    return (
        <>
            <Header />
            <Page />
            <Footercomponent />
        </>
    );
}
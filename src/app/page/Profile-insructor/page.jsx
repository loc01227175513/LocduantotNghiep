import React from 'react';
import { Profileinsructor } from './Profile-insructor';
import Header from '../../component/header/page';
import Footercomponent from '../../component/footer/page';

export default function Page() {
    return (
        <>
            <Header />
            <div className="flex flex-col min-h-screen pt-20"> {/* Adjusted styling here */}
                <div className="container mx-auto flex-grow"> {/* Ensures the Profileinsructor takes available space */}
                    <Profileinsructor />
                </div>
                <Footercomponent />
            </div>
        </>
    );
}
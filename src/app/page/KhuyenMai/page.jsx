"use client";
import React from 'react';
import VoucherShop from './magiamgia/magiamgia';
import Header from '../../component/header/page';
import Footercomponent from '../../component/footer/page';

export default function Page() {
  return (
    <>
      <Header />

      <div className=" w-screen h-screen ">
        <VoucherShop />
      </div>
      <Footercomponent />


    </>
  );
}
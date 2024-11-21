import React from 'react'
import Header from '../../component/header/page';
import Footercomponent from '../../component/footer/page';
import NhanTin from './NhanTin';

export default function page() {
  return (
    <>
      <Header/>
      <div className=' p-4 rounded-lg shadow m-60 border border-gray-300'>
        <NhanTin/>
      </div>
      <Footercomponent/>
    </>
  )
}
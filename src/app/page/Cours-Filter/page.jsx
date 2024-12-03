import React from 'react'
import Header from '../../component/header/page'
import Footercomponent from '../../component/footer/page'
import Page from './course/page'
export default function page() {
    return (
        <>
            <Header />
            <div className='mt-60'>
                <Page />
            </div>

            <Footercomponent />
        </>
    )
}

import { Head, usePage } from '@inertiajs/inertia-react'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Navbar from '../Components/Cashier/Navbar'
import SidebarRight from '../Components/Cashier/SidebarRight'
import SidebarLeft from '../Components/Cashier/SidebarLeft'
import Footer from '../Components/Cashier/Footer'

export default function BasePOS({children, title}) {
    const { flash } = usePage().props;

    flash.type && toast[flash.type](flash.message)

    return (
        <div className="g-sidenav-show bg-gray-100">
            <div className="min-height-2000 bg-gray-400 position-absolute w-100"></div>
                <Head title={ title } />
                <SidebarLeft />
                <SidebarRight />
                <main className="main-content position-relative border-radius-lg d-flex flex-column min-vh-100 ">
                    <Navbar pageName={ title } />
                    <Toaster position='top-center' duration='4000'/>
                    {children}
                    <Footer/>
                </main>            
        </div>
    )
}

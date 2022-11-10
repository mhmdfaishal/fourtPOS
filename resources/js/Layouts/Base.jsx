import { Head, usePage } from '@inertiajs/inertia-react'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Navbar from '../Components/Dashboard/Navbar'
import Sidebar from '../Components/Dashboard/Sidebar'
import Footer from '../Components/Dashboard/Footer'

export default function Base({children, title}) {
    const { flash } = usePage().props;
    
    flash.type && toast[flash.type](flash.message)

    return (
        <div className="g-sidenav-show bg-gray-400">
            <div className="min-height-vh-100 position-absolute w-100"></div>
                <Head>
                    <title>{ title }</title>
                    <meta head-key="description" name="description" content="This is the default description" />
                    <link rel="icon" type="image/png" href="/img/markLogo.png" />
                </Head>
                <Sidebar />
                <main className="main-content position-relative border-radius-lg d-flex flex-column min-vh-100 ">
                    <Navbar pageName={ title } />
                    <Toaster position='top-center' duration='4000'/>
                    {children}
                    <Footer/>
                </main>            
        </div>
    )
}

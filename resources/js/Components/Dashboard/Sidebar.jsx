import { Link, usePage } from '@inertiajs/inertia-react'
import React from 'react'
import Logo from "../Logo";

export default function Sidebar() {
    const { auth } = usePage().props;

    return (        
        <aside className="sidenav bg-default navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 " id="sidenav-main">
            {auth.can.show_dashboard ? (
            <div className="sidenav-header">
                <i className="fas fa-times p-3 cursor-pointer opacity-5 position-absolute end-0 top-0 d-none d-xl-none opacity-8 text-white" aria-hidden="true" id="iconSidenav" />
                <Link className="navbar-brand text-center" href={route('dashboard')} target="_blank">
                    <Logo className="w-lg-100 h-150" />
                </Link>
            </div>
            ) : ''}
            <hr className="horizontal dark mt-0" />
            <div className="collapse navbar-collapse w-auto " id="sidenav-collapse-main">
                <ul className="navbar-nav">
                {auth.can.show_dashboard ? (
                    <li className="nav-item">
                        <Link className={`${route().current('dashboard') && 'active'} nav-link`} href={route('dashboard')}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="ni ni-tv-2 text-brand text-sm opacity-10" />
                            </div>
                            <span className="nav-link-text ms-1 text-dark">Dashboard</span>
                        </Link>
                    </li>
                    ) : ''}                    
                    <li className="nav-item mt-3">
                        <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6 text-primary">Features</h6>
                    </li>
                    {auth.can.access_products ? (
                    <li className="nav-item">
                        <Link className={`${route().current('product.*') && 'active'} nav-link`} href={route('product.index')}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="ni ni-box-2 text-brand text-sm opacity-10" />
                            </div>
                            <span className="nav-link-text ms-1 text-dark">Products</span>
                        </Link>
                    </li>
                    ) : ''}  
                    {auth.can.access_product_categories ? (
                    <li className="nav-item">
                        <Link className={`${route().current('category.*') && 'active'} nav-link`} href={route('category.index')}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="ni ni-tag text-brand text-sm opacity-10" />
                            </div>
                            <span className="nav-link-text ms-1 text-dark">Categories</span>
                        </Link>
                    </li>
                    ) : ''}
                    {auth.can.access_purchases ? (
                    <li className="nav-item">
                        <Link className={`${route().current('purchase.*') && 'active'} nav-link`} href={route('purchase.index')}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="ni ni-money-coins text-brand text-sm opacity-10" />
                            </div>
                            <span className="nav-link-text ms-1 text-dark">Purchases</span>
                        </Link>
                    </li>
                    ) : ''}
                    {auth.can.access_sales ? (
                    <li className="nav-item">
                        <Link className={`${route().current('sales.*') && 'active'} nav-link`} href={route('sales.index')}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="ni ni-cart text-brand text-sm opacity-10" />
                            </div>
                            <span className="nav-link-text ms-1 text-dark">Sales</span>
                        </Link>
                    </li>
                    ) : ''}
                    {auth.can.access_reports ? (
                    <li className="nav-item">
                        <Link className={`${route().current('reports.*') && 'active'} nav-link`} href={route('reports.index')}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="ni ni-cart text-brand text-sm opacity-10" />
                            </div>
                            <span className="nav-link-text ms-1 text-dark">Reports</span>
                        </Link>
                    </li>
                    ) : ''}
                    {auth.can.access_settings ? (
                    <li className="nav-item mt-3">
                        <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6 text-primary">Settings</h6>
                    </li>
                    ) : ''}
                    {auth.can.edit_own_profile ? (
                    <li className="nav-item">
                        <Link className={`${route().current('profile') && 'active'} nav-link`} href={route('profile')}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="ni ni-single-02 text-brand text-sm opacity-10" />
                            </div>
                            <span className="nav-link-text ms-1 text-dark">Profile</span>
                        </Link>
                    </li>
                    ) : ''}
                    {auth.can.access_settings ? (
                    <li className="nav-item">
                    <Link className={`${route().current('tax') && 'active'} nav-link`} href={route('tax')}>
                        <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                            <i className="ni ni-collection text-brand text-sm opacity-10" />
                        </div>
                        <span className="nav-link-text ms-1 text-dark">Tax</span>
                    </Link>
                </li>
                    ) : ''}
                    {auth.can.access_user_management ? (
                    <>
                    <li className="nav-item mt-3">
                        <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6 text-primary">Manage</h6>
                    </li>                    
                    <li className="nav-item">
                        <Link className={`${route().current('users.*') && 'active'} nav-link`} href={route('users.index')}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fas fa-user-lock text-brand text-sm opacity-10" />
                            </div>
                            <span className="nav-link-text ms-1 text-dark">Users</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`${route().current('roles.*') && 'active'} nav-link`} href={route('roles.index')}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fas fa-user-lock text-brand text-sm opacity-10" />
                            </div>
                            <span className="nav-link-text ms-1 text-dark">Roles</span>
                        </Link>
                    </li>
                    </>
                    ) : ''}
                    <li className="nav-item">
                        <Link className="nav-link " as='a' method='post' href={route('logout')}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                            <i className="fas fa-sign-out-alt text-brand text-sm opacity-10"></i>
                            </div>
                            <span className="nav-link-text ms-1 text-dark">Log out</span>
                        </Link>
                    </li>
                </ul>
            </div>                
        </aside>
    )
}

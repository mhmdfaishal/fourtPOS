import { Link, usePage } from '@inertiajs/inertia-react'
import React from 'react'

export default function Navbar({props, pageName}) {
    const { auth } = usePage().props;
    console.log(auth);
    return (
        <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur" data-scroll="false">
            <div className="container-fluid py-1 px-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                        <li className="breadcrumb-item text-sm"><a className="opacity-8 text-dark" href={route('dashboard')}>{auth.user.merchant_name ? auth.user.merchant_name : auth.user.name}</a></li>
                        <li className="breadcrumb-item text-sm text-dark active" aria-current="page">{pageName}</li>
                    </ol>
                <h6 className="font-weight-bolder text-dark mb-0">{pageName}</h6>
                </nav>
                <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                    <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                        
                    </div>
                    <ul className="navbar-nav justify-content-end">
                        {auth.can.access_pos_cashier ? 
                            <Link href={route('list.merchant')} className="btn btn-rounded btn-sm btn-outline-primary mt-2 align-items-center">Cashier</Link> : ''
                        }

                        { auth.user == null 
                            ? 
                            <li className="nav-item d-flex align-items-center">
                                <Link href={route('login')} className="nav-link text-white font-weight-bold px-0">
                                    <i className="fa fa-user me-sm-1" />
                                    <span className="d-sm-inline d-none">Sign In</span>
                                </Link>
                            </li>
                            : 
                            <li className="nav-item pe-3 d-flex align-items-center">
                                <ul className="nav-link text-dark" href="#" role="button" aria-expanded="false">
                                    <img src="/img/team-2.jpg" className="avatar avatar-sm  me-3 " />
                                    {auth.user.name}
                                </ul>
                            </li>
                            
                        }
                            
                    </ul>
                </div>
            </div>
        </nav>
    )
}

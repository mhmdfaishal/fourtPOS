import { Link, usePage } from '@inertiajs/inertia-react'
import React from 'react'
import { Inertia } from '@inertiajs/inertia';

export default function Navbar({props, pageName}) {
    const { auth } = usePage().props;
    const [isShown, setIsShown] = React.useState(false);
    const showProfile = () => {
        Inertia.get(route('profile'))
    }

    return (
        <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur" data-scroll="false">
            <div className="container-fluid py-1 px-3">
                <nav aria-label="breadcrumb" className='d-flex align-items-center'>

                    <form onSubmit="event.preventDefault();" role="search" className='search-form'>
                        <label for="search" className='search-label'>Search for stuff</label>
                        <input id="search" type="search" className='search-input' placeholder="Search Merchant" autoFocus required />
                        <button type="submit" className='btn-search'>Search</button>    
                    </form>
                </nav>
                <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                    <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                        
                    </div>
                    <ul className="navbar-nav justify-content-end">                        
                        { auth.user != null 
                            ?
                            <li className="nav-item pe-3 d-flex align-items-center">
                                <ul className="nav-link text-dark profile-account" role="button" onClick={() => showProfile()} aria-expanded="false" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
                                    <img src="/img/team-2.jpg" className="avatar avatar-sm  me-3 " />
                                    {auth.user.name}
                                </ul>
                                {isShown && (
                                    <span className='tooltip-profile'>My Profile</span>
                                )}
                            </li>
                            : 
                            <li className="nav-item d-flex align-items-center">
                                <Link href={route('login')} className="nav-link text-white font-weight-bold px-0">
                                    <i className="fa fa-user me-sm-1" />
                                    <span className="d-sm-inline d-none">Sign In</span>
                                </Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

import { Link } from '@inertiajs/inertia-react'
import React from 'react'
import MarkLogo from "../MarkLogo";

export default function SidebarLeft() {
    return (        
        <aside className="sidenav bg-default navbar navbar-vertical navbar-expand-xs navbar-pos-sm border-0 border-radius-md fixed-start" id="sidenav-main">
            <div className="sidenav-header">
                <div className='d-flex justify-content-center text-center align-items-center mt-3'>
                    <MarkLogo className="w-lg-60" />
                </div>
            </div>
            <hr className="horizontal dark mt-0" />
            <div className="collapse navbar-collapse w-auto " id="sidenav-collapse-main">
                <ul className="navbar-nav">
                    <li className="nav-item bottom-0 position-absolute">
                        <Link className="nav-link mb-4" as='a' method='post' href={route('logout')}>
                            <div className="icon icon-shape  border-radius-md text-center d-flex align-items-center justify-content-center">
                                <i className="fas fa-sign-out-alt text-dark text-lg opacity-10"></i>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>                
        </aside>
    )
}

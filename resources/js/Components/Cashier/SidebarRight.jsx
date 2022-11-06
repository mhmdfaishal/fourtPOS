import { Link } from '@inertiajs/inertia-react'
import React from 'react'
import Logo from "../Logo";
import { convertToIDR } from "../../Utils/helper";

export default function SidebarRight() {
    const [isOpen, setIsOpen] = React.useState(true);
    const [itemQuantity_1, setItemQuantity_1] = React.useState(1);
    const [itemQuantity_2, setItemQuantity_2] = React.useState(1);
    const [price_1, setPrice_1] = React.useState(10000);
    const [price_2, setPrice_2] = React.useState(20000);
    const [subTotal, setSubTotal] = React.useState(30000);
    const [tax, setTax] = React.useState(0);
    const [discount, setDiscount] = React.useState(0);
    const [totalBill, setTotalBill] = React.useState(30000);

    const hideSidebarRight = () => {
        document.querySelector('.sidenav-pos').style.transform = "translateX(85%)";
        document.querySelector('.sidenav-pos').style.transition = 'transform 0.3s ease-in-out';
        document.querySelector('.main-content').style.marginRight = "5.900rem";
        setIsOpen(false);
    }

    const showSidebarRight = () => {
        document.querySelector('.sidenav-pos').style.transform = "translateX(0)";
        document.querySelector('.sidenav-pos').style.transition = 'transform 0.3s ease-in-out';
        document.querySelector('.main-content').style.marginRight = "25.900rem";
        setIsOpen(true);
    }

    
    const addQuantity = (e,idx) => {
        e.preventDefault();
        if(idx === 1){
            setItemQuantity_1(itemQuantity_1 + 1);
            setSubTotal(subTotal + price_1);
            setTotalBill(subTotal + price_1);
        }
        if(idx === 2){
            setItemQuantity_2(itemQuantity_2 + 1);
            setSubTotal(subTotal + price_2);
            setTotalBill(subTotal + price_2);
        }
    }

    const substractQuantity = (e,idx) => {
        e.preventDefault();
        if(idx === 1){
            if (itemQuantity_1 > 1) {
                setItemQuantity_1(itemQuantity_1 - 1);
                setSubTotal(subTotal - price_1);
                setTotalBill(subTotal - price_1);
            }
        }
        if(idx === 2){
            if (itemQuantity_2 > 1) {
                setItemQuantity_2(itemQuantity_2 - 1);
                setSubTotal(subTotal - price_2);
                setTotalBill(subTotal - price_2);
            }
        }
    }

    return (        
        <aside className="sidenav sidenav-pos bg-default navbar navbar-vertical navbar-expand-xs navbar-expand-xs-pos border-0 border-radius-md fixed-end ms-4 " id="sidenav-main">
            <div className="sidenav-header mt-2">
                {
                    isOpen ? (
                
                <div className="sidenav-show d-flex align-items-center">
                    <button className='btn btn-arrow' type='button' onClick={hideSidebarRight}>
                        <i className='fas fa-arrow-right text-dark text-lg'></i>
                    </button>
                    <h4 className='fw-bolder'>Current Order</h4>
                </div>
                    ) : (
                <div className='sidenav-hide'>
                    <button className='btn btn-arrow' type='button' onClick={showSidebarRight}>
                        <i className='fas fa-arrow-left text-dark text-lg'></i>
                    </button>
                </div>
                    )
                }
            </div>
            <hr className="horizontal dark mt-0" />
            <div className="collapse navbar-collapse w-auto px-3" id="sidenav-collapse-main">
                {
                    isOpen ? (      
                    <>
                        <ul className="navbar-nav list-item-cart">
                            <li className="nav-item d-flex">
                                <img src="/img/cheesecake.jpg" alt="item-cart" className='img-item-cart' />
                                <div className='d-flex flex-column ps-3 w-100'>
                                    <h6 className="text-dark mb-0">
                                        Cheesecake
                                    </h6>
                                    <h6 className="text-dark mb-0">
                                        {convertToIDR(price_1)}
                                    </h6>
                                    <div className="btn-set-quantity d-flex align-items-center mt-2 mb-3 ms-5">
                                        <button className="btn btn-icon btn-primary mx-0 py-2 m-0" type="button" onClick={
                                                                                                            (e) => {substractQuantity(e,1)}
                                                                                                            }>
                                            <span className="btn-inner-icon"><i className="fas fa-minus"></i></span>
                                        </button>
                                        <h3 className="quantity fs-6 pt-1" id='quantity_1'>{itemQuantity_1}</h3>
                                        <button className="btn btn-icon btn-primary py-2 m-0" type="button" onClick={
                                                                                                            (e) => {addQuantity(e,1)}
                                                                                                            }>
                                            <span className="btn-inner-icon"><i className="fas fa-plus"></i></span>
                                        </button>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item d-flex">
                                <img src="/img/cheesecake.jpg" alt="item-cart" className='img-item-cart' />
                                <div className='d-flex flex-column ps-3 w-100'>
                                <h6 className="text-dark mb-0">
                                        Cheesecake
                                    </h6>
                                    <h6 className="text-dark mb-0">
                                        {convertToIDR(price_2)}
                                    </h6>
                                    <div className="btn-set-quantity d-flex align-items-center mt-2 mb-3 ms-5">
                                        <button className="btn btn-icon btn-primary py-2 m-0" type="button" onClick={
                                                                                                            (e) => {substractQuantity(e,2)}
                                                                                                            }>
                                            <span className="btn-inner--icon"><i className="fas fa-minus"></i></span>
                                        </button>
                                        <h3 className="quantity fs-6 pt-1" id='quantity_2'>{itemQuantity_2}</h3>
                                        <button className="btn btn-icon btn-primary py-2 m-0" type="button" onClick={
                                                                                                            (e) => {addQuantity(e,2)}
                                                                                                            }>
                                            <span className="btn-inner--icon"><i className="fas fa-plus"></i></span>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div className="bottom-0 position-sticky">
                            <div className="detail-price d-flex flex-column">
                                <div className="sub-total d-flex justify-content-between">
                                    <h2>Sub Total</h2>
                                    <h2>{convertToIDR(subTotal)}</h2>
                                </div>
                                <div className="tax d-flex justify-content-between">
                                    <h2>Tax</h2>
                                    <h2>{convertToIDR(tax)}</h2>
                                </div>
                                <div className="discount d-flex justify-content-between">
                                    <h2>Discount</h2>
                                    <h2>{convertToIDR(discount)}</h2>
                                </div>
                                <hr />
                                <div className="total d-flex justify-content-between">
                                    <h2>Total</h2>
                                    <h2>{convertToIDR(totalBill)}</h2>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button className='btn btn-payment fs-6'>
                                    Continue to Payment
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <ul className="navbar-nav"></ul>
                )}
            </div>                
        </aside>
    )
}

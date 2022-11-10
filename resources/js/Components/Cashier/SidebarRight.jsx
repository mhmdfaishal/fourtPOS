import React, { useEffect,useCallback } from 'react'
import { convertToIDR } from "../../Utils/helper";
import { usePage } from '@inertiajs/inertia-react'
import SummaryPurchases from '../../Components/Cashier/SummaryPurchases';
import Dialog from '../../Components/Dashboard/Dialog';
import useDialog from '../../Hooks/useDialog';

export default function SidebarRight() {
    const { TAX_PERCENTAGE } = usePage().props;
    
    const [isOpen, setIsOpen] = React.useState(true);
    const [subTotal, setSubTotal] = React.useState(0);
    const [tax, setTax] = React.useState(0);
    const [totalBill, setTotalBill] = React.useState(0);
    const [cart, setCart] = React.useState(() => {
        const localData = localStorage.getItem('cart');
        return localData ? JSON.parse(localData) : [];
    });
    const [addDialogHandler, addCloseTrigger,addTrigger] = useDialog()

    const hideSidebarRight = () => {
        document.querySelector('.sidenav-pos').style.transform = "translateX(85%)";
        document.querySelector('.sidenav-pos').style.transition = 'transform 0.3s ease-in-out';
        document.querySelector('.main-content').style.marginRight = "5.900rem";
        // if document.querySelector('#grid-system') exists
        if (document.querySelector('#grid-system')) {
            document.querySelector('#grid-system').classList.remove("row-cols-3");
            document.querySelector('#grid-system').classList.add("row-cols-4");
        }
        setIsOpen(false);
    }

    const showSidebarRight = () => {
        document.querySelector('.sidenav-pos').style.transform = "translateX(0)";
        document.querySelector('.sidenav-pos').style.transition = 'transform 0.3s ease-in-out';
        document.querySelector('.main-content').style.marginRight = "25.900rem";
        if (document.querySelector('#grid-system')) {
            document.querySelector('#grid-system').classList.remove("row-cols-4");
            document.querySelector('#grid-system').classList.add("row-cols-3");
        }
        setIsOpen(true);
    }

    // using useEffect to update subtotal, tax, and total bill
    useEffect(() => {
        let subTotals = 0;
        let taxes = 0;
        let totalBills = 0;
        cart.forEach((item) => {
            subTotals += item.product_price * item.quantity;
        });
        taxes = (subTotals * TAX_PERCENTAGE)/100;
        totalBills = subTotals + tax;
        setSubTotal(subTotals)
        setTax(taxes);
        setTotalBill(totalBills);
    }, [cart, tax, subTotal, totalBill]);

    
    const addQuantity = (e,item) => {
        e.preventDefault();
        const cart = JSON.parse(localStorage.getItem('cart'));
        const index = cart.findIndex((cartItem) => cartItem.id === item.id);
        if(cart[index].quantity+1 <= cart[index].product_quantity){
            cart[index].quantity += 1;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        setCart(cart);
    }

    const substractQuantity = (e,item) => {
        e.preventDefault();
        const cart = JSON.parse(localStorage.getItem('cart'));
        const index = cart.findIndex((cartItem) => cartItem.id === item.id);
        cart[index].quantity -= 1;

        if (cart[index].quantity == 0) {
            cart.splice(index, 1);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        setCart(cart);
    }

    const continuePayment = () => {
        hideSidebarRight();
        addDialogHandler();
    }

    return (        
        <>
            <Dialog trigger={addTrigger} title="Order Summary"> 
                <SummaryPurchases close={addCloseTrigger} cart={cart} subTotal={subTotal} totalBill={totalBill} tax={tax} />
            </Dialog>        
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
                                {cart ? cart.map((item, idx) => (
                                <li className="nav-item d-flex">
                                    <img src={item.image} alt="item-cart" className='img-item-cart' />
                                    <div className='d-flex flex-column ps-3 w-100'>
                                        <h6 className="text-dark mb-0">
                                            {item.product_name}
                                        </h6>
                                        <h6 className="text-dark mb-0">
                                            {convertToIDR(item.product_price)}
                                        </h6>
                                        <div className="btn-set-quantity d-flex align-items-center mt-2 mb-3 ms-5">
                                            <button className="btn btn-icon btn-primary mx-0 py-2 m-0" type="button" onClick={
                                                                                                                (e) => {substractQuantity(e,item)}
                                                                                                                }>
                                                <span className="btn-inner-icon"><i className="fas fa-minus"></i></span>
                                            </button>
                                            <h3 className="quantity fs-6 pt-1" id='quantity'>{item.quantity}</h3>
                                            {item.quantity == item.product_quantity ? (
                                            <button className="btn btn-icon btn-disabled py-2 m-0 disabled" type="button" onClick={
                                                                                                                (e) => {addQuantity(e,item)}
                                                                                                                }>
                                                <span className="btn-inner-icon"><i className="fas fa-plus"></i></span>
                                            </button>
                                            ) : (
                                            <button className="btn btn-icon btn-primary py-2 m-0 " type="button" onClick={
                                                                                                                (e) => {addQuantity(e,item)}
                                                                                                                }>
                                                <span className="btn-inner-icon"><i className="fas fa-plus"></i></span>
                                            </button>
                                            )}
                                        </div>
                                    </div>
                                </li>
                                )) : ''}
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
                                    <hr />
                                    <div className="total d-flex justify-content-between">
                                        <h2>Total</h2>
                                        <h2>{convertToIDR(totalBill)}</h2>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button className='btn btn-payment fs-6' type="button" onClick={continuePayment} data-bs-toggle="modal" data-bs-target="#exampleModalMessage">
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
        </>
    )
}

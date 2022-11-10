import React from 'react'
import { convertToIDR } from '../../Utils/helper';
import { Inertia } from '@inertiajs/inertia';

export default function CreateProduct({close, cart, subTotal, totalBill, tax}) {

    const [noTable, setNoTable] = React.useState("");

    const onChange = (e) => {
        setNoTable(e.target.value);
    }
    const storePayment = (e) => {
        e.preventDefault();
        const data = {
            'cart': cart,
            'sub_total': subTotal,
            'total_bill': totalBill,
            'no_table': noTable,
            'tax_amount': tax,
        }
        Inertia.post(route('store.payment'), data);
        localStorage.setItem('cart', JSON.stringify([]));
        window.location.href = route('open.invoice');
    }

    return (
        <>
                <div className="modal-body">
                        <div className="text-center">
                            <h5>Pesanan</h5>
                            <hr/>
                        </div>
                        {cart.map((item) => (
                        <li className="nav-item d-flex">
                            <img src={item.image} alt="item-cart" className='img-item-cart' />
                            <div className='d-flex flex-column ps-3 w-100'>
                                <h6 className="text-dark mb-1">
                                    {item.product_name} x {item.quantity}
                                </h6>
                                <div className="text-end me-2">
                                    <h6 className='card-price'>{convertToIDR(item.quantity*item.product_price)}</h6>
                                </div>
                            </div>
                        </li>
                        ))}
                        <div className="bottom-0 w-60 ms-auto">
                            <div className="detail-price-summary d-flex flex-column">
                                <div className="d-flex justify-content-between">
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
                                <hr />
                                <div className="total d-flex align-items-center justify-content-between">
                                    <h2>Meja</h2>
                                    <input type="text" className='form-control w-25' name='no_table' onChange={onChange} />
                                </div>
                            </div>
                        </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn bg-gradient-secondary me-auto" data-bs-dismiss="modal">Batal</button>
                    <button type="button" className="btn btn-teal-orange" onClick={storePayment}>Konfirmasi</button>
                </div>
        </>

    )
}

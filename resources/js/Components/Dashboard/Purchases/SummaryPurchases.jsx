import React from 'react'

export default function CreateProduct({close}) {
    const onSubmit = (e) => {
        e.preventDefault();
    }
    const storePayment = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="modal-body">
                        <div className="text-center">
                            <h5>Pesanan</h5>
                            <hr/>
                        </div>
                        <li className="nav-item d-flex">
                            <img src='/img/cheesecake.jpg' alt="item-cart" className='img-item-cart' />
                            <div className='d-flex flex-column ps-3 w-100'>
                                <h6 className="text-dark mb-1">
                                    Cheesecake x 1
                                </h6>
                                <p className="text-dark mb-0 fs-catatan">
                                    Catatan:
                                </p>
                                <p className="text-dark mb-0 fs-catatan">
                                    Tidak pedas
                                </p>
                                <div className="text-end me-2">
                                    <h6 className='card-price'>Rp15.000</h6>
                                </div>
                            </div>
                        </li>
                        <div className="bottom-0 w-60 ms-auto">
                            <div className="detail-price-summary d-flex flex-column">
                                <div className="d-flex justify-content-between">
                                    <h2>Sub Total</h2>
                                    <h2>Rp</h2>
                                </div>
                                <div className="tax d-flex justify-content-between">
                                    <h2>Tax</h2>
                                    <h2>Rp</h2>
                                </div>
                                <div className="tax d-flex justify-content-between">
                                    <h2>Discount</h2>
                                    <h2>Rp</h2>
                                </div>
                                <hr />
                                <div className="total d-flex justify-content-between">
                                    <h2>Total</h2>
                                    <h2>Rp</h2>
                                </div>
                                <hr />
                                <div className="total d-flex align-items-center justify-content-between">
                                    <h2>Meja</h2>
                                    <input type="text" className='form-control w-25' />
                                </div>
                            </div>
                        </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn bg-gradient-secondary me-auto" data-bs-dismiss="modal">Batal</button>
                    <button type="submit" className="btn btn-teal-orange" onClick={storePayment}>Konfirmasi</button>
                </div>
            </form>
        </>

    )
}

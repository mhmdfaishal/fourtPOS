import React from 'react'
import BasePOS from '../../Layouts/BasePOS'
import { Inertia } from '@inertiajs/inertia'

export default function ShowMerchant() {
    return (
        <>
            <div className="container p-5">
                <div className="btn w-100 mb-4 bg-card">
                    <div className="text-center">
                        <h1 className="p-4 text-white">Merhcant A</h1>
                    </div>
                </div>
                <div className="row row-cols-3 gx-4" id="grid-system">
                    <div className="col">
                        <div className="card text-center mb-3">
                            <img src="/img/cheesecake.jpg" className="card-img-top px-3 pt-3" />
                            <div className="card-body">
                                <h5 className="card-title text-start">Cheesecake</h5>
                                <p className="card-text text-start fs-6">Inin cheesecake</p>
                                <h6 className="card-price">Rp15.000 / serve</h6>
                                <a href="#" class="btn btn-teal-orange mb-0 text-white">+ Keranjang</a>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card text-center mb-3">
                            <img src="/img/cheesecake.jpg" className="card-img-top px-3 pt-3" />
                            <div className="card-body">
                                <h5 className="card-title text-start">Cheesecake</h5>
                                <p className="card-text text-start">Inin cheesecake</p>
                                <h6 className="card-price">Rp15.000 / serve</h6>
                                <a href="#" class="btn btn-teal-orange mb-0 text-white">+ Keranjang</a>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card text-center mb-3">
                            <img src="/img/cheesecake.jpg" className="card-img-top px-3 pt-3" />
                            <div className="card-body">
                                <h5 className="card-title text-start">Cheesecake</h5>
                                <p className="card-text text-start">Inin cheesecake</p>
                                <h6 className="card-price">Rp15.000 / serve</h6>
                                <a href="#" class="btn btn-teal-orange mb-0 text-white">+ Keranjang</a>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card text-center mb-3">
                            <img src="/img/cheesecake.jpg" className="card-img-top px-3 pt-3" />
                            <div className="card-body">
                                <h5 className="card-title text-start">Cheesecake</h5>
                                <p className="card-text text-start">Inin cheesecake</p>
                                <h6 className="card-price">Rp15.000 / serve</h6>
                                <a href="#" class="btn btn-teal-orange mb-0 text-white">+ Keranjang</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
ShowMerchant.layout = (page) => <BasePOS children={page} title={"POS"}/>

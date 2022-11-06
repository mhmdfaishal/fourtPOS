import React from 'react'
import BasePOS from '../../Layouts/BasePOS'
import { Inertia } from '@inertiajs/inertia'

export default function POS(props) {

    const {data: merchants} = props.merchants; 

    const showMenu = (merchant) => {
        Inertia.get(route('show.merchant', merchant.id))
    }

    return (
        <>
            <div className="container p-5">
                {merchants.map((merchant,index) => (
                <div className="btn w-100 mb-4 bg-card" onClick={() => showMenu(merchant)} style={{backgroundImage: `url("/img/card-merchant.png")`}}>
                    <div className="text-center">
                        <h1 className="p-4 text-white">{merchant.merchant_name ? merchant.merchant_name : "Merchant X"}</h1>
                    </div>
                </div>
                ))}
            </div>
        </>
    )
}

POS.layout = (page) => <BasePOS children={page} title={"Cashier"}/>

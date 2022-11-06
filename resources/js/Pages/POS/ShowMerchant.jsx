import React from 'react'
import BasePOS from '../../Layouts/BasePOS'
import { Inertia } from '@inertiajs/inertia'

export default function ShowMerchant() {
    return (
        <>
            <div className="container p-5">
                <div className="btn w-100 mb-4 bg-card" onClick={() => showMenu()}>
                    <div className="text-center">
                        <h1 className="p-4 text-white">Merhcant A</h1>
                    </div>
                </div>
                <div className="btn w-100 mb-4 bg-card"  onClick={() => showMenu()}>
                    <div className="text-center">
                        <h1 className="p-4 text-white">Merhcant B</h1>
                    </div>
                </div>
                <div className="btn w-100 mb-4 bg-card"  onClick={() => showMenu()}>
                    <div className="text-center">
                        <h1 className="p-4 text-white">Merhcant C</h1>
                    </div>
                </div>
                <div className="btn w-100 mb-4 bg-card"  onClick={() => showMenu()}>
                    <div className="text-center">
                        <h1 className="p-4 text-white">Merhcant D</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

POS.layout = (page) => <BasePOS children={page} title={"POS"}/>

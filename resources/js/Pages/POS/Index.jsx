import React from 'react'
import BasePOS from '../../Layouts/BasePOS'

export default function POS() {
    return (
        <>
            <div className="container-fluid py-4">
                <div className="row">
                    <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                    <div className="card">
                        <div className="card-body p-3">
                        <div className="row">
                            <div className="col-8">
                            <div className="numbers">
                                <p className="text-sm mb-0 text-uppercase font-weight-bold">Today's Money</p>
                                <h5 className="font-weight-bolder">
                                $53,000
                                </h5>
                                <p className="mb-0">
                                <span className="text-success text-sm font-weight-bolder">+55% </span>
                                since yesterday
                                </p>
                            </div>
                            </div>
                            <div className="col-4 text-end">
                            <div className="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                                <i className="ni ni-money-coins text-lg opacity-10" aria-hidden="true" />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                    <div className="card">
                        <div className="card-body p-3">
                        <div className="row">
                            <div className="col-8">
                            <div className="numbers">
                                <p className="text-sm mb-0 text-uppercase font-weight-bold">Today's Users</p>
                                <h5 className="font-weight-bolder">
                                2,300
                                </h5>
                                <p className="mb-0">
                                <span className="text-success text-sm font-weight-bolder">+3% </span>
                                since last week
                                </p>
                            </div>
                            </div>
                            <div className="col-4 text-end">
                            <div className="icon icon-shape bg-gradient-danger shadow-danger text-center rounded-circle">
                                <i className="ni ni-world text-lg opacity-10" aria-hidden="true" />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                    <div className="card">
                        <div className="card-body p-3">
                        <div className="row">
                            <div className="col-8">
                            <div className="numbers">
                                <p className="text-sm mb-0 text-uppercase font-weight-bold">New Clients</p>
                                <h5 className="font-weight-bolder">
                                +3,462
                                </h5>
                                <p className="mb-0">
                                <span className="text-danger text-sm font-weight-bolder">-2% </span>
                                since last quarter
                                </p>
                            </div>
                            </div>
                            <div className="col-4 text-end">
                            <div className="icon icon-shape bg-gradient-success shadow-success text-center rounded-circle">
                                <i className="ni ni-paper-diploma text-lg opacity-10" aria-hidden="true" />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-xl-3 col-sm-6">
                    <div className="card">
                        <div className="card-body p-3">
                        <div className="row">
                            <div className="col-8">
                            <div className="numbers">
                                <p className="text-sm mb-0 text-uppercase font-weight-bold">Sales</p>
                                <h5 className="font-weight-bolder">
                                $103,430
                                </h5>
                                <p className="mb-0">
                                <span className="text-success text-sm font-weight-bolder">+5% </span> than last month
                                </p>
                            </div>
                            </div>
                            <div className="col-4 text-end">
                            <div className="icon icon-shape bg-gradient-warning shadow-warning text-center rounded-circle">
                                <i className="ni ni-cart text-lg opacity-10" aria-hidden="true" />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-lg-12 mb-lg-0 mb-4">
                        <div className="card ">
                            <div className="card-header pb-0 p-3">
                            <div className="d-flex justify-content-between">
                                <h6 className="mb-2">Sales by Country</h6>
                            </div>
                            </div>
                            <div className="table-responsive">
                            <table className="table align-items-center ">
                                <tbody>
                                <tr>
                                    <td className="w-30">
                                    <div className="d-flex px-2 py-1 align-items-center">
                                        <div>
                                        <img src="/img/icons/flags/US.png" alt="Country flag" />
                                        </div>
                                        <div className="ms-4">
                                        <p className="text-xs font-weight-bold mb-0">Country:</p>
                                        <h6 className="text-sm mb-0">United States</h6>
                                        </div>
                                    </div>
                                    </td>
                                    <td>
                                    <div className="text-center">
                                        <p className="text-xs font-weight-bold mb-0">Sales:</p>
                                        <h6 className="text-sm mb-0">2500</h6>
                                    </div>
                                    </td>
                                    <td>
                                    <div className="text-center">
                                        <p className="text-xs font-weight-bold mb-0">Value:</p>
                                        <h6 className="text-sm mb-0">$230,900</h6>
                                    </div>
                                    </td>
                                    <td className="align-middle text-sm">
                                    <div className="col text-center">
                                        <p className="text-xs font-weight-bold mb-0">Bounce:</p>
                                        <h6 className="text-sm mb-0">29.9%</h6>
                                    </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-30">
                                    <div className="d-flex px-2 py-1 align-items-center">
                                        <div>
                                        <img src="/img/icons/flags/DE.png" alt="Country flag" />
                                        </div>
                                        <div className="ms-4">
                                        <p className="text-xs font-weight-bold mb-0">Country:</p>
                                        <h6 className="text-sm mb-0">Germany</h6>
                                        </div>
                                    </div>
                                    </td>
                                    <td>
                                    <div className="text-center">
                                        <p className="text-xs font-weight-bold mb-0">Sales:</p>
                                        <h6 className="text-sm mb-0">3.900</h6>
                                    </div>
                                    </td>
                                    <td>
                                    <div className="text-center">
                                        <p className="text-xs font-weight-bold mb-0">Value:</p>
                                        <h6 className="text-sm mb-0">$440,000</h6>
                                    </div>
                                    </td>
                                    <td className="align-middle text-sm">
                                    <div className="col text-center">
                                        <p className="text-xs font-weight-bold mb-0">Bounce:</p>
                                        <h6 className="text-sm mb-0">40.22%</h6>
                                    </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-30">
                                    <div className="d-flex px-2 py-1 align-items-center">
                                        <div>
                                        <img src="/img/icons/flags/GB.png" alt="Country flag" />
                                        </div>
                                        <div className="ms-4">
                                        <p className="text-xs font-weight-bold mb-0">Country:</p>
                                        <h6 className="text-sm mb-0">Great Britain</h6>
                                        </div>
                                    </div>
                                    </td>
                                    <td>
                                    <div className="text-center">
                                        <p className="text-xs font-weight-bold mb-0">Sales:</p>
                                        <h6 className="text-sm mb-0">1.400</h6>
                                    </div>
                                    </td>
                                    <td>
                                    <div className="text-center">
                                        <p className="text-xs font-weight-bold mb-0">Value:</p>
                                        <h6 className="text-sm mb-0">$190,700</h6>
                                    </div>
                                    </td>
                                    <td className="align-middle text-sm">
                                    <div className="col text-center">
                                        <p className="text-xs font-weight-bold mb-0">Bounce:</p>
                                        <h6 className="text-sm mb-0">23.44%</h6>
                                    </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-30">
                                    <div className="d-flex px-2 py-1 align-items-center">
                                        <div>
                                        <img src="/img/icons/flags/BR.png" alt="Country flag" />
                                        </div>
                                        <div className="ms-4">
                                        <p className="text-xs font-weight-bold mb-0">Country:</p>
                                        <h6 className="text-sm mb-0">Brasil</h6>
                                        </div>
                                    </div>
                                    </td>
                                    <td>
                                    <div className="text-center">
                                        <p className="text-xs font-weight-bold mb-0">Sales:</p>
                                        <h6 className="text-sm mb-0">562</h6>
                                    </div>
                                    </td>
                                    <td>
                                    <div className="text-center">
                                        <p className="text-xs font-weight-bold mb-0">Value:</p>
                                        <h6 className="text-sm mb-0">$143,960</h6>
                                    </div>
                                    </td>
                                    <td className="align-middle text-sm">
                                    <div className="col text-center">
                                        <p className="text-xs font-weight-bold mb-0">Bounce:</p>
                                        <h6 className="text-sm mb-0">32.14%</h6>
                                    </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>

        </>
    )
}

POS.layout = (page) => <BasePOS children={page} title={"POS"}/>

import { Link } from '@inertiajs/inertia-react';
import React, { useState } from 'react'
import Dialog from '../../Components/Dashboard/Dialog';
import Base from '../../Layouts/Base'
import useDialog from '../../Hooks/useDialog';
import DetailSales from '../../Components/Dashboard/Sales/DetailSales';
import { Inertia } from '@inertiajs/inertia';
import { convertToIDR } from "../../Utils/helper";

export default function Index(props) {

    const {data: sales, links, meta} = props.sales; 

    const [state, setState] = useState([])
    const [detailDialogHandler, detailCloseTrigger, detailTrigger] = useDialog()
    const openDetailDialog = (sale) => {
        setState(sale);
        detailDialogHandler();
    }
    console.log(sales)
    return (
        <>
            <div className="container-fluid py-4">

                <Dialog trigger={detailTrigger} title={`Detail Sales: ${state.reference}`}>
                    <DetailSales model={state} close={detailCloseTrigger}/>
                </Dialog>

                <div className="row pb-4">
                    <div className="col-12 w-100">
                        <div className="card h-100 w-100">                            
                            <div className="card-header pb-0">
                            <div className="row">
                                <div className="col-md-6">
                                    <h6>Sales</h6>
                                </div>
                            </div>
                            </div>
                            <div className="card-body px-0 pt-0 pb-2">
                            <div className="table-responsive-xxl p-0" width="100%">
                                <table className="table align-items-center justify-content-center mb-0" width="100%">
                                    <thead>
                                        <tr>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center">#</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Date</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Reference</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">Note</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Total Amount</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sales.length > 0 ? sales.map((sale, index) => (
                                            <tr key={sale.id}>
                                                <td className='text-center'>{meta.from + index}</td>
                                                <td className='text-left'>
                                                    <span className="text-xs font-weight-bold">{sale.date}</span>
                                                </td>
                                                <td className='text-left'>
                                                <td className='text-left'>
                                                    <span className="text-xs font-weight-bold">{sale.reference}</span>
                                                </td>
                                                </td>
                                                <td className='text-left'>
                                                    <span className="text-xs font-weight-bold">{sale.notes}</span>
                                                </td>
                                                <td className='text-left'>
                                                    <span className="text-xs font-weight-bold">{sale.sum_of_sub_total}</span>
                                                </td>
                                                <td className="align-middle text-center" width="5%">
                                                <div>
                                                    <button type="button" onClick={() => openDetailDialog(sale)} className="btn btn-youtube btn-icon-only">
                                                        <span className="btn-inner--icon"><i class="fas fa-info-circle"></i></span>
                                                    </button> 
                                                </div>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="5" className="text-center">No Data</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        { meta.links.map((link, k) => (
                            <li key={k} className="page-item">
                                <Link disabled={link.url == null ? true : false} as="button" className={`${link.active && 'bg-info text-white'} ${link.url == null && 'btn bg-gradient-secondary text-white'} page-link`} href={link.url || ''} dangerouslySetInnerHTML={{ __html: link.label }}/>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    )
}

Index.layout = (page) => <Base key={page} children={page} title={"Manage Product"}/>

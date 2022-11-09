import { Link } from '@inertiajs/inertia-react';
import React, { useState } from 'react'
import Dialog from '../../Components/Dashboard/Dialog';
import Base from '../../Layouts/Base'
import useDialog from '../../Hooks/useDialog';
import DetailPurchases from '../../Components/Dashboard/Purchases/DetailPurchases';
import { Inertia } from '@inertiajs/inertia';
import { convertToIDR } from "../../Utils/helper";
import CreatePurchase from '../../Components/Dashboard/Purchases/CreatePurchase';
import EditPurchase from '../../Components/Dashboard/Purchases/EditPurchase';

export default function Index(props) {

    const {data: purchases, links, meta} = props.purchases; 

    const [state, setState] = useState([])
    const [detailDialogHandler, detailCloseTrigger, detailTrigger] = useDialog()
    const [addDialogHandler, addCloseTrigger,addTrigger] = useDialog()
    const [UpdateDialogHandler, UpdateCloseTrigger, UpdateTrigger] = useDialog()
    const [destroyDialogHandler, destroyCloseTrigger, destroyTrigger] = useDialog()
    const openDetailDialog = (purchases) => {
        setState(purchases);
        detailDialogHandler();
    }
    const openUpdateDialog = (purchases) => {
        setState(purchases);
        UpdateDialogHandler();
    }
    const openDestroyDialog = (purchases) => {
      setState(purchases);
      destroyDialogHandler()        
    };

    const DestroyPurchase = () => {
        Inertia.delete(
            route('purchase.delete', state.id), 
            { onSuccess: () => destroyCloseTrigger() });
    }
    console.log(purchases)
    return (
        <>
            <div className="container-fluid py-4">

                <Dialog trigger={detailTrigger} title={`Detail Sales: ${state.reference}`}>
                    <DetailPurchases model={state} close={detailCloseTrigger}/>
                </Dialog>

                <Dialog trigger={addTrigger} title="Create New Purchase"> 
                    <CreatePurchase close={addCloseTrigger}/>
                </Dialog>

                <Dialog trigger={UpdateTrigger} title={`Update Purchase: ${state.reference}`}> 
                    <EditPurchase model={state} close={UpdateCloseTrigger}/>
                </Dialog>

                <Dialog trigger={destroyTrigger} title={`Delete Purchase: ${state.reference}`}>
                    <p>Are you sure to delete this purchase ?</p>
                    <div className="modal-footer">
                        <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" onClick={DestroyPurchase} className="btn bg-gradient-danger">Delete</button>
                    </div>
                </Dialog>

                <div className="row pb-4">
                    <div className="col-12 w-100">
                        <div className="card h-100 w-100">                            
                            <div className="card-header pb-0">
                            <div className="row">
                                <div className="col-md-6">
                                    <h6>Purchases</h6>
                                </div>
                                <div className="col-md-6 d-flex justify-content-end">
                                  <button onClick={addDialogHandler}  type="button" className="btn btn-teal-orange btn-block mb-3" data-bs-toggle="modal" data-bs-target="#exampleModalMessage">
                                      Create New Purchase
                                  </button>
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
                                        {purchases?.length > 0 ? purchases?.map((purchase, index) => (
                                            <tr key={purchase.id}>
                                                <td className='text-center'>{meta.from + index}</td>
                                                <td className='text-left'>
                                                    <span className="text-xs font-weight-bold">{purchase.date}</span>
                                                </td>
                                                <td className='text-left'>
                                                <td className='text-left'>
                                                    <span className="text-xs font-weight-bold">{purchase.reference}</span>
                                                </td>
                                                </td>
                                                <td className='text-left'>
                                                    <span className="text-xs font-weight-bold">{purchase.notes}</span>
                                                </td>
                                                <td className='text-left'>
                                                    <span className="text-xs font-weight-bold">{purchase.total_amount}</span>
                                                </td>
                                                <td className="align-middle text-center" width="5%">
                                                <div>
                                                    <button type="button" onClick={() => openDetailDialog(purchase)} className="btn btn-linkedin btn-icon-only">
                                                        <span className="btn-inner--icon"><i class="fas fa-info-circle"></i></span>
                                                    </button> 
                                                    < button type="button" onClick={() => openUpdateDialog(purchase)} className="btn btn-vimeo btn-icon-only mx-2">
                                                        <span className="btn-inner--icon"><i className="fas fa-pencil-alt"></i></span>
                                                    </button>
                                                    <button type="button" onClick={() => openDestroyDialog(purchase)} className="btn btn-youtube btn-icon-only">
                                                        <span className="btn-inner--icon"><i className="fas fa-trash"></i></span>
                                                    </button>
                                                </div>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="6" className="text-center">No Data</td>
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
                                <Link disabled={link.url == null ? true : false} as="button" className={`${link.active && 'bg-info'} ${link.url == null && 'btn bg-gradient-secondary text-white'} page-link`} href={link.url || ''} dangerouslySetInnerHTML={{ __html: link.label }}/>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    )
}

Index.layout = (page) => <Base key={page} children={page} title={"Manage Purchase"}/>

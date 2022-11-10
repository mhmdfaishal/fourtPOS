import { Link } from '@inertiajs/inertia-react';
import React, { useEffect, useState } from 'react'
import Base from '../../Layouts/Base'
import useDialog from '../../Hooks/useDialog';
import DetailSales from '../../Components/Dashboard/Sales/DetailSales';
import DetailPurchases from '../../Components/Dashboard/Purchases/DetailPurchases';
import Dialog from '../../Components/Dashboard/Dialog';
import { Inertia } from '@inertiajs/inertia';
import { convertToIDR } from "../../Utils/helper";

export default function Index(props) {
    const {data: sales,  links: linksSales,  meta: metaSales} = props.sales;  
    const {data: purchases, links: linksPurchases, meta: metaPurchases} = props.purchases;
    const {totalBenefit: totalBenefit} = props; 
    const {totalIncome: totalIncome} = props;
    const {totalExpense: totalExpense} = props;
    const [state, setState] = useState([])
    const [detailDialogHandler, detailCloseTrigger, detailTrigger] = useDialog()
    const [purchasesDialogHandler, purchasesCloseTrigger, purchasesTrigger] = useDialog()
    const openDetailDialog = (sale) => {
        setState(sale);
        detailDialogHandler();
    }
    const openPurchasesDialog = (purchase) => {
        setState(purchase);
        purchasesDialogHandler();
    }

    const [filters, setFilters] = useState({
      start_date: '',
      end_date: '',
    })

    function handleChange(e) {
      const key = e.target.id
      const {value} = e.target

      setFilters({
        ...filters,
        [key]: value
      })

      if(key === 'start_date') {
        const element = document.getElementById('end_date')
        element.setAttribute('min', value)
      }
    }

    function handlefilter(e) {
      e.preventDefault()
      Inertia.post(route('reports.show'), filters)
    }

    return (
        <>
                <Dialog trigger={detailTrigger} title={`Detail Sales: ${state.reference}`}>
                    <DetailSales model={state} close={detailCloseTrigger}/>
                </Dialog>
                <Dialog trigger={purchasesTrigger} title={`Detail Sales: ${state.reference}`}>
                    <DetailPurchases model={state} close={purchasesCloseTrigger}/>
                </Dialog>
            <div className="d-flex flex-column">
              <div className="d-flex flex-row">
                <div className="container-fluid py-4 flex-grow-1">
                    <div className="row pb-4">
                        <div className="col-12 w-150">
                            <div className="card h-auto w-100">                            
                                <div className="card-header pb-0">
                                    <div className="col-md-6">
                                        <h6>Filter</h6>
                                    </div>
                                </div>
                                <div className="card-body px-0 pt-0 pb-2">
                                <form onSubmit={handlefilter} method="post">
                                  <div className="d-flex flex-column">
                                    <div className="d-flex flex-row">
                                      <div className="flex-grow-1 m-2">
                                        <label className="mt-2" htmlFor="start_date">Tanggal Awal :</label>
                                        <input onChange={handleChange} className="w-100 p-1 form-control" type="date" name="start_date" id="start_date" required/>
                                      </div>
                                      <div className="flex-grow-1 m-2" width="100%">
                                        <label className="mt-2" htmlFor="end_date">Tanggal Akhir :</label>
                                        <input onChange={handleChange} className="w-100 p-1 form-control" type="date" name="end_date" id="end_date" required/>
                                      </div>
                                    </div>
                                    <div className="pb-2 pt-2 px-3 text-center">
                                      <button className="btn btn-teal-orange btn-block mb-3" type="submit">Submit</button>
                                    </div>
                                  </div>
                                </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="container-fluid py-4 w-40">
                <div className="row pb-4">
                    <div className="col-12 w-100">
                        <div className="card h-100 w-100">                            
                            <div className="card-header pb-0">
                            <div className="row">
                                <div className="col-md-6">
                                    <h6>Summary</h6>
                                </div>
                            </div>
                            </div>
                            <div className="card-body p-3">
                            <div className="table-responsive-xxl p-0" width="100%">
                                <table className="table align-items-center justify-content-center mb-0 p-2" width="100%">
                                    <tr>
                                        <th>Total Income</th>
                                        <td>:</td>
                                        <td>{convertToIDR(totalIncome)}</td>
                                    </tr>
                                    <tr>
                                        <th>Total Expense</th>
                                        <td>:</td>
                                        <td>{convertToIDR(totalExpense)}</td>
                                    </tr>
                                    <tr>
                                        <th>Total Profit</th>
                                        <td>:</td>
                                        <td>{convertToIDR(totalBenefit)}</td>
                                    </tr>
                                </table>
                            </div>
                            </div>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
            <div className="d-flex flex-row">
            <div className="container-fluid py-4">
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
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Tanggal</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Reference</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">Total Amount</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sales.length > 0 ? (sales.map((sale, index) => (
                                            <tr key={index}>
                                                <td className="align-middle text-center text-sm">
                                                    <span className="text-secondary text-xs font-weight-bold">{index + 1}</span>
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    <span className="text-secondary text-xs font-weight-bold">{sale.date}</span>
                                                </td>
                                                <td className="align-middle text-center text-sm"> 
                                                    <span className="text-secondary text-xs font-weight-bold">{sale.reference}</span>
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    <span className="text-secondary text-xs font-weight-bold">{sale.sum_of_sub_total}</span>
                                                </td>
                                                <td className="align-middle text-center" width="5%">
                                                <div>
                                                    <button type="button" onClick={() => openDetailDialog(sale)} className="btn btn-youtube btn-icon-only">
                                                        <span className="btn-inner--icon"><i class="fas fa-info-circle"></i></span>
                                                    </button> 
                                                </div>
                                                </td>
                                            </tr>
                                        ))) : (
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
                    { metaSales.links.map((link, k) => (
                      <li key={k} className="page-item">
                                <Link disabled={link.url == null ? true : false} as="button" className={`${link.active && 'bg-info text-white'} ${link.url == null && 'btn bg-gradient-secondary text-white'} page-link`} href={link.url || ''} dangerouslySetInnerHTML={{ __html: link.label }}/>
                            </li>
                        ))}
                        </ul>
                </nav>
            </div>
            <div className="container-fluid py-4">
                <div className="row pb-4">
                    <div className="col-12 w-100">
                        <div className="card h-100 w-100">                            
                            <div className="card-header pb-0">
                            <div className="row">
                                <div className="col-md-6">
                                    <h6>Purchases</h6>
                                </div>
                            </div>
                            </div>
                            <div className="card-body px-0 pt-0 pb-2">
                            <div className="table-responsive-xxl p-0" width="100%">
                                <table className="table align-items-center justify-content-center mb-0" width="100%">
                                    <thead>
                                        <tr>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center">#</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Tanggal</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Reference</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">Total Amount</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {purchases.length > 0 ? (purchases.map((purchase, index) => (
                                            <tr key={index}>
                                                <td className="align-middle text-center text-sm">
                                                    <span className="text-secondary text-xs font-weight-bold">{index + 1}</span>
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    <span className="text-secondary text-xs font-weight-bold">{purchase.date}</span>
                                                </td>
                                                <td className="align-middle text-center text-sm"> 
                                                    <span className="text-secondary text-xs font-weight-bold">{purchase.reference}</span>
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    <span className="text-secondary text-xs font-weight-bold">{purchase.total_amount}</span>
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                <div>
                                                    <button type="button" onClick={() => openPurchasesDialog(purchase)} className="btn btn-youtube btn-icon-only">
                                                        <span className="btn-inner--icon"><i class="fas fa-info-circle"></i></span>
                                                    </button> 
                                                </div>
                                                </td>
                                            </tr>
                                        ))) : (
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
                    { metaPurchases.links.map((link, k) => (
                            <li key={k} className="page-item">
                            <Link disabled={link.url == null ? true : false} as="button" className={`${link.active && 'bg-info text-white'} ${link.url == null && 'btn bg-gradient-secondary text-white'} page-link`} href={link.url || ''} dangerouslySetInnerHTML={{ __html: link.label }}/>
                            </li>
                            ))}
                            </ul>
                          </nav>
            </div>
          </div>
        </div>
        </>
    )
}

Index.layout = (page) => <Base key={page} children={page} title={"Report"}/>

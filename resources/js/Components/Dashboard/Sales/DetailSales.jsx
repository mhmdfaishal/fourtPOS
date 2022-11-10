import { useForm } from '@inertiajs/inertia-react'
import React, { useEffect } from 'react'

export default function DetailSales({close, model}) {

    const {data, setData, put, reset, errors} = useForm(
        { 
            id : model.id,
            reference: model.reference, 
            date: model.date, 
            user: model.user_name, 
            tax_percentage: model.tax_percentage, 
            tax_amount: model.tax_amount, 
            total_amount: model.total_amount, 
            paid_amount: model.paid_amount, 
            payment_method: model.payment_method, 
            payment_status: model.payment_status, 
            notes: model.notes,
            sale_detail : model.sale_details, 
            sum_of_sub_total : model.sum_of_sub_total,
        });

    useEffect(() => {
        setData({...data,
          id : model.id,
          reference: model.reference, 
          date: model.date,
          user: model.user_name, 
          tax_percentage: model.tax_percentage, 
          tax_amount: model.tax_amount, 
          total_amount: model.total_amount, 
          paid_amount: model.paid_amount, 
          payment_method: model.payment_method, 
          payment_status: model.payment_status, 
          notes: model.notes, 
          sale_detail : model.sale_details, 
          sum_of_sub_total : model.sum_of_sub_total,
        });
    }, [model]);
    
    return (
        <>
            <form >
                <div className="modal-body">

                        <div className="form-group">
                            <label htmlFor="reference" className="col-form-label">Reference:</label>
                            <input type="text" className="form-control" name='reference' value={data.reference} id="reference" disabled/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="user_id" className="col-form-label">User:</label>
                            <input type="text" className="form-control" name='user_id' value={data.user} id="user_id" disabled/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="date" className="col-form-label">Date:</label>
                            <input type="date" className="form-control" name='date' value={data.date} id="date" disabled/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="tax_percentage" className="col-form-label">Tax Percentage:</label>
                            <input type="number" className="form-control" name='tax_percentage' value={data.tax_percentage} id="tax_percentage" disabled/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="tax_amount" className="col-form-label">Tax Amount:</label>
                            <input type="number" className="form-control" name='tax_amount' value={data.tax_amount} id="tax_amount" disabled/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="total_amount" className="col-form-label">Total Amount:</label>
                            <input type="number" className="form-control" name='total_amount' value={data.sum_of_sub_total} id="total_amount" disabled/>
                        </div>
                        <table style={{overflowX: 'auto', width: '100%'}}>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Unit Price</th>
                                    <th>Price</th>
                                    <th>Sub Total</th>
                                </tr>
                            </thead>
                            <tbody>
                            {data.sale_detail?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.product_name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.unit_price}</td>
                                    <td>{item.price}</td>
                                    <td>{item.sub_total}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </form>
        </>

    )
}

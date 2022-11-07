import { useForm } from '@inertiajs/inertia-react'
import React, { useEffect } from 'react'

export default function DetailPurchases({close, model}) {

    const {data, setData, put, reset, errors} = useForm(
        { 
            id : model.id,
            reference: model.reference, 
            date: model.date, 
            user: model.user_name,  
            total_amount: model.total_amount, 
            paid_amount: model.paid_amount, 
            payment_method: model.payment_method, 
            payment_status: model.payment_status, 
            notes: model.notes,
            purchase_detail : model.purchase_details 
        });

    useEffect(() => {
        setData({...data,
          id : model.id,
          reference: model.reference, 
          date: model.date,
          user: model.user_name,  
          total_amount: model.total_amount, 
          paid_amount: model.paid_amount, 
          payment_method: model.payment_method, 
          payment_status: model.payment_status, 
          notes: model.notes, 
          purchase_detail : model.purchase_details 
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
                            <label htmlFor="total_amount" className="col-form-label">Total Amount:</label>
                            <input type="number" className="form-control" name='total_amount' value={data.total_amount} id="total_amount" disabled/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="paid_amount" className="col-form-label">Paid Amount:</label>
                            <input type="number" className="form-control" name='paid_amount' value={data.paid_amount} id="paid_amount" disabled/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="payment_method" className="col-form-label">Payment Method:</label>
                            <input type="text" className="form-control" name='payment_method' value={data.payment_method} id="payment_method" disabled/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="payment_status" className="col-form-label">Payment Status:</label>
                            <input type="text" className="form-control" name='payment_status' value={data.payment_status} id="payment_status" disabled/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="notes" className="col-form-label">Notes:</label>
                            <textarea className="form-control" name='notes' value={data.notes} id="notes" disabled></textarea>
                        </div>
                        <table style={{overflowX: 'auto', width: '100%'}}>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                            {data.purchase_detail?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.product_name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
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

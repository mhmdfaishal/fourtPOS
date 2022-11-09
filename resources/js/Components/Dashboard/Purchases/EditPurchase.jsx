import { useForm } from '@inertiajs/inertia-react'
import React, { useEffect, useState } from 'react'

export default function EditPurchases({close, model}) {

    const {data, setData, post, reset, errors} = useForm(
        { 
            id : model.id,
            reference: model.reference, 
            date: model.date, 
            user: model.user_name,  
            total_amount: model.total_amount, 
            notes: model.notes,
            products : model.purchase_details 
        });
    const [formValues, setFormValues] = useState([{ 
        product_name: "", 
        quantity : "",
        price : ""
        }])
    useEffect(() => {
        setData({...data,
            id : model.id,
            reference: model.reference, 
            date: model.date,
            user: model.user_name,  
            total_amount: model.total_amount, 
            notes: model.notes, 
            products : model.purchase_details 
        });
        setFormValues(model.purchase_details)
        console.log(formValues)
    }, [model]);
    const onChange = (e) => {
        setData({ ...data, [e.target.id]: e.target.value })
      };

    function addFormFields() {
        const newField = {
            product_name: "", 
            quantity : "",
            price : ""
        }
        setFormValues([...formValues, newField])
    }

    function removeFields (index) {
        const data = [...formValues];
        data.splice(index, 1)
        setFormValues(data)
    }
    function updateTotalAmount() {
        const element = [...formValues]
        let subTotal =  0
        element.map((item) => {
            subTotal += item.quantity * item.price
        })

        setData({
            ...data,
            total_amount: subTotal,
        })
    }
    function handleProductChange(i, e){
        let data = [...formValues]
        data[i][e.target.id] = e.target.value
        setFormValues(data)
        updateTotalAmount()
    
    }
    const onSubmit = (e) => {
        e.preventDefault()
        let payload = {...data}
        payload.products = []
        payload.products.push(...formValues)
        setData(payload)
        console.log(data)
        post(route('purchase.edit.post', model.id), {
            data,
            onSuccess: () => {
                reset(),
                close()
            },
        });
    }
    
    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="modal-body">

                        <div className="form-group">
                            <label htmlFor="reference" className="col-form-label">Reference:</label>
                            <input type="text" className="form-control" name='reference' value={data.reference} id="reference" disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="user_id" className="col-form-label">User:</label>
                            <input type="text" className="form-control" name='user_id' value={data.user} id="user_id" disabled/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="date" className="col-form-label">Date:</label>
                            <input type="date" className="form-control" name='date' value={data.date} onChange={onChange} id="date" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="total_amount" className="col-form-label">Total Amount:</label>
                            <input type="number" className="form-control" name='total_amount' value={data.total_amount} id="total_amount" disabled/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="notes" className="col-form-label">Notes:</label>
                            <textarea className="form-control" name='notes' value={data.notes} onChange={onChange} id="notes" ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="product" className="col-form-label mr-4">Product:</label>
                            <span className="mx-3">
                            <button className="btn bg-gradient-success btn-block px-2 py-1 mt-3 ml-5" type="button" onClick={() => addFormFields()}>+</button>
                            </span>
                            {formValues?.map((formValue, index) => (
                            <div className='card mb-2'>
                              {
                                index ? 
                              <div className="card-header p-0">
                                  <button type="button"  className="btn bg-gradient-danger btn-block px-2 py-1 m-0 align-self-end" onClick={() => removeFields(index)}>Remove</button> 
                              </div>
                                : null
                              }
                              <div className='card-body m-0'>
                                <div className='row'>
                                  <div className='col-md-4'>
                                    <label htmlFor="product_name" className="col-form-label text-xs">Product Name:</label>
                                    <input type="text" className="form-control" name='product_name' value={formValue.product_name} onChange={event => handleProductChange(index,event)} id="product_name" required/>
                                    {/* {errors && <div className='text-danger mt-1'>{errors.product_name}</div>} */}
                                  </div>
                                  <div className='col-md-4'>
                                    <label htmlFor="quantity" className="col-form-label text-xs">Quantity:</label>
                                    <input type="number" className="form-control" name='quantity' value={formValue.quantity} onChange={event => handleProductChange(index,event)} id="quantity" required/>
                                    {/* {errors && <div className='text-danger mt-1'>{errors.quantity}</div>} */}
                                  </div>
                                  <div className='col-md-4'>
                                    <label htmlFor="price" className="col-form- text-xs">Price:</label>
                                    <input type="number" className="form-control" name='price' value={formValue.price} onChange={event => handleProductChange(index,event)} id="price" required/>
                                    {/* {errors && <div className='text-danger mt-1'>{errors.price}</div>} */}
                                  </div>
                                </div>
                                </div>
                            </div>
                            ))}
                        </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn bg-gradient-primary" >Save</button>
                </div>
            </form>
        </>

    )
}

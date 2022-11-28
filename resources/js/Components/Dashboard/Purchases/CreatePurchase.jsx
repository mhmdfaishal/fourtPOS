import { useForm } from '@inertiajs/inertia-react'
import React, { useEffect, useState }  from 'react'
import { Inertia } from '@inertiajs/inertia'


export default function CreatePurchase({close}) {

    const {data, setData, post, reset, errors, progress } = useForm({
      date: "",
      total_amount: 0,
      note: "",
      products: [],
    });

    
    const onChange = (e) => {
      setData({ ...data, [e.target.id]: e.target.value })
    };

    const [formValues, setFormValues] = useState([{ 
      product_name: "", 
      quantity : "",
      price : ""
    }])

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
        products: [...formValues]
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
      payload.products = formValues
      setData(payload)
      post(route('purchase.create.store'), {
        data,
        onSuccess: () => {
          setFormValues([{
            product_name: "",
            quantity : "",
            price : ""
          }])
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
                            <label htmlFor="product_name" className="col-form-label">Purchase Date:</label>
                            <input type="date" className="form-control" name='date' value={data.date} onChange={onChange} id="date" required/>
                            {errors && <div className='text-danger mt-1'>{errors.date}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="note" className="col-form-label">Purchase Note:</label>
                            <textarea type="number" className="form-control" name='note' value={data.note} onChange={onChange} id="note" required></textarea>
                            {errors && <div className='text-danger mt-1'>{errors.note}</div>}
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

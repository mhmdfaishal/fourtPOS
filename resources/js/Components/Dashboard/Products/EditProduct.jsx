import { useForm } from '@inertiajs/inertia-react'
import React, { useEffect } from 'react'

export default function EditProduct({close, model, categories}) {

    const {data, setData, put, reset, errors} = useForm(
        { 
            product_name: model.product_name, 
            product_code: model.product_code, 
            product_quantity: model.product_quantity, 
            product_price: model.product_price, 
            product_cost: model.product_cost, 
            product_note: model.product_note, 
            product_stock_alert: model.product_stock_alert, 
            category_id: model.category?.id, 
        });

    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });
   
    const onSubmit = (e) => {
        e.preventDefault();
        put(route('product.edit.post', model.id), {
            data, 
            onSuccess: () => {
                reset(),
                close()
            }, 
        });
    }

    useEffect(() => {
        setData({...data,
            product_name: model.product_name, 
            product_code: model.product_code, 
            product_quantity: model.product_quantity, 
            product_price: model.product_price, 
            product_cost: model.product_cost, 
            product_note: model.product_note, 
            product_stock_alert: model.product_stock_alert, 
            category_id: model.category?.id, 
        });
    }, [model]);
    
    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="modal-body">

                        <div className="form-group">
                            <label htmlFor="product_name" className="col-form-label">Product Name:</label>
                            <input type="text" className="form-control" name='product_name' value={data.product_name} onChange={onChange} id="product_name"/>
                            {errors && <div className='text-danger mt-1'>{errors.product_name}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="product_code" className="col-form-label">Product Code:</label>
                            <input type="number" className="form-control" name='product_code' value={data.product_code} onChange={onChange} id="product_code"/>
                            {errors && <div className='text-danger mt-1'>{errors.product_code}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="product_price" className="col-form-label">Product Price:</label>
                            <input type="number" className="form-control" name='product_price' value={data.product_price} onChange={onChange} id="product_price"/>
                            {errors && <div className='text-danger mt-1'>{errors.product_price}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="product_price" className="col-form-label">Category:</label>
                            <select className="form-control" name="category_id" id="category_id" onChange={onChange}>
                                {categories.map((category) => (
                                    category.id === data.category_id ? 
                                        <option value={category.id} selected>{category.category_name}</option> 
                                        : 
                                        <option value={category.id}>{category.category_name}</option>
                                ))}
                            </select>
                            {errors && <div className='text-danger mt-1'>{errors.product_price}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="product_quantity" className="col-form-label">Product Quantity:</label>
                            <input type="number" className="form-control" name='product_quantity' value={data.product_quantity} onChange={onChange} id="product_quantity"/>
                            {errors && <div className='text-danger mt-1'>{errors.product_quantity}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="product_cost" className="col-form-label">Product Cost:</label>
                            <input type="number" className="form-control" name='product_cost' value={data.product_cost} onChange={onChange} id="product_cost"/>
                            {errors && <div className='text-danger mt-1'>{errors.product_cost}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="product_note" className="col-form-label">Product Note:</label>
                            <textarea className="form-control" name='product_note' id="product_note" cols="30" rows="10" value={data.product_note} onChange={onChange}>
                                {data.product_note}
                            </textarea>
                            {errors && <div className='text-danger mt-1'>{errors.product_note}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="product_stock_alert" className="col-form-label">Product Stock Alert:</label>
                            <input type="number" className="form-control" name='product_stock_alert' value={`${data.product_stock_alert || ''}`} onChange={onChange} id="product_stock_alert"/>
                            {errors && <div className='text-danger mt-1'>{errors.product_stock_alert}</div>}
                        </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn bg-gradient-primary">Update</button>
                </div>
            </form>
        </>

    )
}

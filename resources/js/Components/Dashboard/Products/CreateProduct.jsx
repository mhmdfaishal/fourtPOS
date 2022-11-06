import { useForm } from '@inertiajs/inertia-react'
import React from 'react'

export default function CreateProduct({close, categories}) {

    const {data, setData, post, reset, errors, progress } = useForm({
        product_name: '', 
        category_id: '',
        product_code: '', 
        product_price: '', 
        product_quantity: '', 
        product_cost: '', 
        product_note: '',
        product_stock_alert: '',
        // image : null,
    });

    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route('product.create.store'), {
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
                            <label htmlFor="product_name" className="col-form-label">Product Name:</label>
                            <input type="text" className="form-control" name='product_name' value={data.product_name} onChange={onChange} id="product_name" required/>
                            {errors && <div className='text-danger mt-1'>{errors.product_name}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="product_code" className="col-form-label">Product Code:</label>
                            <input type="number" className="form-control" name='product_code' value={data.product_code} onChange={onChange} id="product_code" required/>
                            {errors && <div className='text-danger mt-1'>{errors.product_code}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="product_price" className="col-form-label">Product Price:</label>
                            <input type="number" className="form-control" name='product_price' value={data.product_price} onChange={onChange} id="product_price" required/>
                            {errors && <div className='text-danger mt-1'>{errors.product_price}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="product_price" className="col-form-label">Category:</label>
<<<<<<< HEAD
                            <select className="form-control" name="category_id" id="category_id" onChange={onChange} required>
=======
                            <select className="form-control" name="category_id" id="category_id" onChange={onChange}>
                                <option value="" disabled selected>Select Category</option>
>>>>>>> origin
                                {categories.map((category) => (
                                    <option value={category.id}>{category.category_name}</option>
                                ))}
                            </select>
                            {errors && <div className='text-danger mt-1'>{errors.product_price}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="product_quantity" className="col-form-label">Product Quantity:</label>
                            <input type="number" className="form-control" name='product_quantity' value={data.product_quantity} onChange={onChange} id="product_quantity" required/>
                            {errors && <div className='text-danger mt-1'>{errors.product_quantity}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="product_cost" className="col-form-label">Product Cost:</label>
                            <input type="number" className="form-control" name='product_cost' value={data.product_cost} onChange={onChange} id="product_cost" required/>
                            {errors && <div className='text-danger mt-1'>{errors.product_cost}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="product_note" className="col-form-label">Product Note:</label>
                            <textarea className="form-control" name='product_note' id="product_note" cols="30" rows="10" onChange={onChange} required>
                                {data.product_note}
                            </textarea>
                            {errors && <div className='text-danger mt-1'>{errors.product_note}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="product_stock_alert" className="col-form-label">Product Stock Alert:</label>
                            <input type="number" className="form-control" name='product_stock_alert' value={data.product_stock_alert} onChange={onChange} id="product_stock_alert" required/>
                            {errors && <div className='text-danger mt-1'>{errors.product_stock_alert}</div>}
                        </div>
                        {/* <div className="form-group">
                            <label htmlFor="image" className="col-form-label">Product Image:</label>
                            <input type="file" className="form-control" name='image' onChange={e => setData('image', e.target.files[0])} id="image" accept='image/*'required/>
                            {errors && <div className='text-danger mt-1'>{errors.image}</div>}
                            {progress && (
                                <progress value={progress.percentage} max="100">
                                    {progress.percentage}%
                                </progress>
                            )}
                        </div> */}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn bg-gradient-primary">Save</button>
                </div>
            </form>
        </>

    )
}

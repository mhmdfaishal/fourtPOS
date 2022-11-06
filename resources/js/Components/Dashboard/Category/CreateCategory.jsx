import { useForm } from '@inertiajs/inertia-react'
import React from 'react'

export default function CreateCategory({close, categories}) {

    const {data, setData, post, reset, errors, progress } = useForm({
        category_code: '',
        category_name: '', 
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
                            <label htmlFor="category_name" className="col-form-label">Category Name:</label>
                            <input type="text" className="form-control" name='category_name' value={data.category_name} onChange={onChange} id="category_name"/>
                            {errors && <div className='text-danger mt-1'>{errors.category_name}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="category_code" className="col-form-label">Category Code:</label>
                            <input type="number" className="form-control" name='category_code' value={data.category_code} onChange={onChange} id="category_code"/>
                            {errors && <div className='text-danger mt-1'>{errors.category_code}</div>}
                        </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn bg-gradient-primary">Save</button>
                </div>
            </form>
        </>

    )
}

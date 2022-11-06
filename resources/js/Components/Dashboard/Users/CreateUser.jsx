import { useForm } from '@inertiajs/inertia-react'
import React from 'react'

export default function CreateProduct({close, roles}) {

    const {data, setData, post, reset, errors} = useForm({ name: '', email: '', password: '', merchant_name:'' , password_confirmation: '', role: '', is_active: ''});

    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route('users.store'), {
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
                            <label htmlFor="name" className="col-form-label">Name:</label>
                            <input type="text" className="form-control" name='name' value={data.name} onChange={onChange} id="name" required/>
                            {errors && <div className='text-danger mt-1'>{errors.name}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="col-form-label">Email:</label>
                            <input type="email" className="form-control" name='email' value={data.email} onChange={onChange} id="email" required/>
                            {errors && <div className='text-danger mt-1'>{errors.email}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="col-form-label">Password:</label>
                            <input type="password" className="form-control" name='password' value={data.password} onChange={onChange} id="password" placeholder='Password must contains: min 8 character, symbols, mixed case, and numbers' required/>
                            {errors && <div className='text-danger mt-1'>{errors.password}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="col-form-label">Confirm Password:</label>
                            <input type="password" className="form-control" name='password_confirmation' value={data.password_confirmation} onChange={onChange} id="password_confirmation" placeholder='Password must contains: min 8 character, symbols, mixed case, and numbers' required/>
                            {errors && <div className='text-danger mt-1'>{errors.password}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="merchant_name" className="col-form-label">Merchant Name:</label>
                            <input type="text" className="form-control" name='merchant_name' value={data.merchant_name} onChange={onChange} id="merchant_name"/>
                            {errors && <div className='text-danger mt-1'>{errors.name}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="role" className="col-form-label">Role:</label>
                            <select name="role" id="role" className='form-control' onChange={onChange} required>
                                <option value="" disabled selected>Select Role</option>
                                {roles.map(role => (
                                    <option value={role.name}>{role.name}</option>
                                ))}

                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="is_active" className="col-form-label">Is Active:</label>
                            <select name="is_active" id="is_active" className='form-control' onChange={onChange} required>
                                <option value="" disabled selected>Select Status</option>
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>
                        </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-teal-orange">Save</button>
                </div>
            </form>
        </>

    )
}

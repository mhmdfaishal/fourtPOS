import { useForm } from '@inertiajs/inertia-react'
import React, { useEffect } from 'react'

export default function EditUser({close, model, roles}) {

    const {data, setData, put, reset, errors} = useForm({ name: model.name, email: model.email, user_role: model.roles ? model.roles[0].name : '', merchant_name: model.merchant_name, roles: roles, is_active: model.is_active});

    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        put(route('users.update', model.id), {
            data, 
            onSuccess: () => {
                reset(),
                close()
            }, 
        });
    }

    useEffect(() => {
        setData({...data,
            name: model.name, email: model.email, user_role: model.roles ? model.roles[0].name : '', merchant_name: model.merchant_name, roles: roles, is_active: model.is_active
        });
    }, [model]);

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
                            <label htmlFor="merchant_name" className="col-form-label">Merchant Name:</label>
                            <input type="text" className="form-control" name='merchant_name' value={data.merchant_name} onChange={onChange} id="merchant_name"/>
                            {errors && <div className='text-danger mt-1'>{errors.name}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="user_role" className="col-form-label">Role:</label>
                            <select name="user_role" id="user_role" className='form-control' onChange={onChange} required>
                                <option value="" disabled selected>Select Role</option>
                                {data.roles.map(role => (
                                    role.name == data.user_role ?
                                    <option value={role.name} selected>{role.name}</option>
                                    :
                                    <option value={role.name}>{role.name}</option>
                                ))}

                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="is_active" className="col-form-label">Is Active:</label>
                            <select name="is_active" id="is_active" className='form-control' onChange={onChange} required>
                                <option value="" disabled>Select Status</option>
                                {
                                    data.is_active == 1 ?
                                    <><option value="1" selected>Active</option>
                                    <option value="0">Inactive</option></>
                                    :
                                    <><option value="1" >Active</option>
                                    <option value="0" selected>Inactive</option></>
                                }
                            </select>
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

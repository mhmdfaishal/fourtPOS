import { useForm, usePage } from '@inertiajs/inertia-react';
import React from 'react'
import Base from '../../Layouts/Base'

export default function Profile(props) {
    const { auth } = usePage().props;

    const {data, setData, put, reset, errors} = useForm({ name: auth.user.name, email: auth.user.email, password: '', password_confirmation: '', merchant_name: auth.user.merchant_name });

    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        put(route('users.profile', auth.user.id), {
            data, 
            onSuccess: () => {

            }, 
        });
    }

    return (
        <>
            <div>
                <div className="card shadow-lg mx-4 my-3">
                    <div className="card-body p-3">
                    <div className="row gx-4">
                        <div className="col-auto">
                        <div className="avatar avatar-xl position-relative">
                            <img src="/img/team-2.jpg" alt="profile_image" className="w-100 border-radius-lg shadow-sm" />
                        </div>
                        </div>
                        <div className="col-auto my-auto">
                        <div className="h-100">
                            <h5 className="mb-1">
                            {auth.user.name}
                            </h5>
                        </div>
                        </div>
                        <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
                        
                        </div>
                    </div>
                    </div>
                </div>
                <div className="container-fluid py-4">
                    <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <form onSubmit={onSubmit}>
                                <div className="card-header pb-0">
                                    <div className="d-flex align-items-center">
                                    <p className="mb-0">Edit Profile</p>
                                    <button type='submit' className="btn btn-teal-orange btn-sm ms-auto">Save</button>
                                    </div>
                                </div>
                                <div className="card-body">                                
                                    <p className="text-uppercase text-sm">User Information</p>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                            <label htmlFor="email" className="form-control-label">Email address</label>
                                            <input className="form-control" type="email" name='email' value={data.email} onChange={onChange} id="email" />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                            <label htmlFor="name" className="form-control-label">Name</label>
                                            <input className="form-control" type="text" name='name' value={data.name} onChange={onChange} id="name" />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                            <label htmlFor="merchant_name" className="form-control-label">Merchant Name</label>
                                            <input className="form-control" type="text" name='merchant_name' value={data.merchant_name} onChange={onChange} id="merchant_name" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="card-body">                                
                                    <p className="text-uppercase text-sm">Change Password</p>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                            <label htmlFor="password" className="form-control-label">New Password</label>
                                            <input className="form-control" type="password" name='password' value={data.password} onChange={onChange} id="password" placeholder='Password must contains: min 8 character, symbols, mixed case, and numbers' />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                            <label htmlFor="password" className="form-control-label">Confirm Password</label>
                                            <input className="form-control" type="password" name='password_confirmation' value={data.password_confirmation} onChange={onChange} id="password_confirmation" placeholder='Password must contains: min 8 character, symbols, mixed case, and numbers' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

        </>
    )
}

Profile.layout = (page) => <Base children={page} title={"Profile"}/>


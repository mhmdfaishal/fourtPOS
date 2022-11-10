import { Link, useForm } from '@inertiajs/inertia-react'
import React from 'react'
import Auth from '../../Layouts/Auth'
import Logo from '../../Components/Logo'

export default function Login({ errors }) {
    const {data, setData, post} = useForm({
        email: '', password:'', remember:'',
    })

    const changeHandler = (e) => setData({...data, [e.target.id]: e.target.value})

    const submitHandler = (e) => {
        e.preventDefault()
        post(route('login'), data);
    }
    return (        
        <>
            <div className="page-header min-vh-100 login-page" style={{background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url("/img/backgroundLogo.png")`}}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12 col-lg-5 col-md-7 d-flex flex-column align-items-center">
                        <Logo className="w-lg-20 h-100" />
                            <div className="card card-plain p-5 w-50">
                                <div className="card z-index-0">
                                    <div className="card-header text-center pt-4">
                                        <h5>Login</h5>
                                    </div>
                                    <div className="card-body">
                                        <form role="form" onSubmit={submitHandler} noValidate>
                                            <div className="mb-3">
                                                <input value={data.email} onChange={changeHandler} type="email" name='email' id='email' className="form-control form-control-lg" placeholder="Email" aria-label="Email" />
                                                {errors && (<div className='text-danger mt-1'>{errors.email}</div>)}
                                            </div>
                                            <div className="mb-3">
                                                <input  value={data.password} onChange={changeHandler} type="password" name='password' id='password' className="form-control form-control-lg" placeholder="Password" aria-label="Password" />
                                                {errors && (<div className='text-danger mt-1'>{errors.password}</div>)}

                                            </div>
                                            <div className="form-check form-switch">
                                                <input  value={data.remember} onChange={(e) => setData({...values, remember: e.target.checked})} name='remember' className="form-check-input" type="checkbox" id="rememberMe" />
                                                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" className="btn btn-lg bg-orange-100 btn-lg w-100 mt-4 mb-0 text-white">Sign in</button>
                                            </div>
                                        </form>
                                    </div>
                                    {/* <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                        <p className="mb-4 text-sm mx-auto">
                                            Don't have an account? {' '}
                                            <Link href={route('register')} className="text-primary text-gradient font-weight-bold">Sign up</Link>
                                        </p>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        </>
    )
}

Login.layout = (page) => <Auth children={page} title={"Login"}/>
import { useForm, usePage } from '@inertiajs/inertia-react';
import React, { useEffect } from 'react'
import Base from '../../Layouts/Base'

export default function Edit({close, role, permissions}) {

    const {data, setData, put, errors} = useForm({ name: role.name, permissions: permissions});

    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });

    const onCheck = (e) => {
        let permissions = data.permissions;
        if (e.target.checked) {
            permissions.push(e.target.value);
        } else {
            permissions = permissions.filter(permission => permission !== e.target.value);
        }
        setData({ ...data, permissions });
    }
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        put(route('roles.update', role.id), {
            data, 
            onSuccess: () => {

            }, 
        });
    }

    useEffect(() => {
        let permissions = data.permissions;

        permissions.forEach(permission => {
                document.getElementById(permission).checked = true;
            }
        );
    },[]);

    const checkAllPermissions = (e) => {
        if(e.target.checked){
            let permissions = [];
            document.querySelectorAll('input[type="checkbox"]').forEach((el) => {
                el.checked = true;
                permissions.push(el.value);
            });
            setData({ ...data, permissions: permissions });
        }else{
            document.querySelectorAll('input[type="checkbox"]').forEach((el) => {
                el.checked = false;
            });
            setData({ ...data, permissions: [] });
        }
    }

    return (
        <>
            <div>
                <div className="container-fluid py-4">
                    <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <form onSubmit={onSubmit}>
                                <div className="card-header pb-0">
                                    <div className="d-flex align-items-center">
                                    <p className="mb-0">Create Role</p>
                                    <button type='submit' className="btn btn-teal-orange btn-sm ms-auto">Save</button>
                                    </div>
                                </div>
                                <div className="card-body">                                
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                            <label htmlFor="name" className="form-control-label">Role Name</label>
                                            <input className="form-control" type="text" name='name' value={data.name} onChange={onChange} id="name" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="card-body">                                
                                    <p className="text-uppercase text-sm">Permission</p>
                                    <div className="form-group">
                                        <div className="form-check form-switch form-switch-role">
                                            <input type="checkbox" className="form-check-input" id="select-all" onChange={checkAllPermissions}/>
                                            <label className="form-check-label" for="select-all">Give All Permissions</label>
                                        </div>
                                    </div>

                                    <div className="row mb-5">
                                        {/* Dashboard Permissions */}
                                        <div className="col-lg-4 col-md-6 mb-3">
                                            <div className="card h-100 border-0 shadow">
                                                <div className="card-header">
                                                    Dashboard
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="form-check form-switch form-switch-role">
                                                                <input type="checkbox" className="form-check-input"
                                                                        id="show_dashboard" name="permissions[]"
                                                                        value="show_dashboard" onChange={onCheck}/>
                                                                <label className="form-check-label" for="show_dashboard">Show Dashboard</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* User Management Permission */}
                                        <div className="col-lg-4 col-md-6 mb-3">
                                            <div className="card h-100 border-0 shadow">
                                                <div className="card-header">
                                                    User Management
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="form-check form-switch form-switch-role">
                                                                <input type="checkbox" className="form-check-input"
                                                                        id="access_user_management" name="permissions[]"
                                                                        value="access_user_management" onChange={onCheck} />
                                                                <label className="form-check-label" for="access_user_management">Access User Management</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-check form-switch form-switch-role">
                                                                <input type="checkbox" className="form-check-input"
                                                                        id="edit_own_profile" name="permissions[]"
                                                                        value="edit_own_profile" onChange={onCheck}/>
                                                                <label className="form-check-label" for="edit_own_profile">Own Profile</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        
                                        {/* Product Permission */}
                                        <div className="col-lg-4 col-md-6 mb-3">
                                            <div className="card h-100 border-0 shadow">
                                                <div className="card-header">
                                                    Products Module
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="form-check form-switch form-switch-role">
                                                                <input type="checkbox" className="form-check-input"
                                                                        id="access_products" name="permissions[]"
                                                                        value="access_products" onChange={onCheck} />
                                                                <label className="form-check-label" for="access_products">Access Product</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-check form-switch form-switch-role">
                                                                <input type="checkbox" className="form-check-input"
                                                                        id="create_products" name="permissions[]"
                                                                        value="create_products" onChange={onCheck}/>
                                                                <label className="form-check-label" for="create_products">Create Products</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-check form-switch form-switch-role">
                                                                <input type="checkbox" className="form-check-input"
                                                                        id="show_products" name="permissions[]"
                                                                        value="show_products" onChange={onCheck}/>
                                                                <label className="form-check-label" for="show_products">Show Products</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-check form-switch form-switch-role">
                                                                <input type="checkbox" className="form-check-input"
                                                                        id="edit_products" name="permissions[]"
                                                                        value="edit_products" onChange={onCheck}/>
                                                                <label className="form-check-label" for="edit_products">Edit Products</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-check form-switch form-switch-role">
                                                                <input type="checkbox" className="form-check-input"
                                                                        id="delete_products" name="permissions[]"
                                                                        value="delete_products" onChange={onCheck}/>
                                                                <label className="form-check-label" for="delete_products">Delete Products</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="row mb-5">
                                        {/* Product Categories Permission */}
                                        <div className="col-lg-4 col-md-6 mb-3">
                                            <div className="card h-100 border-0 shadow">
                                                <div className="card-header">
                                                    Products Categories Module
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="form-check form-switch form-switch-role">
                                                                <input type="checkbox" className="form-check-input"
                                                                        id="access_product_categories" name="permissions[]"
                                                                        value="access_product_categories" onChange={onCheck} />
                                                                <label className="form-check-label" for="access_product_categories">Access Product Categories</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-check form-switch form-switch-role">
                                                                <input type="checkbox" className="form-check-input"
                                                                        id="create_product_categories" name="permissions[]"
                                                                        value="create_product_categories" onChange={onCheck}/>
                                                                <label className="form-check-label" for="create_product_categories">Create Product Categories</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-check form-switch form-switch-role">
                                                                <input type="checkbox" className="form-check-input"
                                                                        id="show_product_categories" name="permissions[]"
                                                                        value="show_product_categories" onChange={onCheck}/>
                                                                <label className="form-check-label" for="show_product_categories">Show Product Categories</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-check form-switch form-switch-role">
                                                                <input type="checkbox" className="form-check-input"
                                                                        id="edit_product_categories" name="permissions[]"
                                                                        value="edit_product_categories" onChange={onCheck}/>
                                                                <label className="form-check-label" for="edit_product_categories">Edit Product Categories</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-check form-switch form-switch-role">
                                                                <input type="checkbox" className="form-check-input"
                                                                        id="delete_product_categories" name="permissions[]"
                                                                        value="delete_product_categories" onChange={onCheck}/>
                                                                <label className="form-check-label" for="delete_product_categories">Delete Product Categories</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* POS Cashier Permission */}
                                        <div className="col-lg-4 col-md-6 mb-3">
                                            <div className="card h-100 border-0 shadow">
                                                <div className="card-header">
                                                    POS Cashier Module
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="form-check form-switch form-switch-role">
                                                                <input type="checkbox" className="form-check-input"
                                                                        id="access_pos_cashier" name="permissions[]"
                                                                        value="access_pos_cashier" onChange={onCheck} />
                                                                <label className="form-check-label" for="access_pos_cashier">Access POS Cashier</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-check form-switch form-switch-role">
                                                                <input type="checkbox" className="form-check-input"
                                                                        id="create_pos_cashier" name="permissions[]"
                                                                        value="create_pos_cashier" onChange={onCheck}/>
                                                                <label className="form-check-label" for="create_pos_cashier">Create POS Cashier</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        
                                        {/* Purchases Permission */}
                                        <div className="col-lg-4 col-md-6 mb-3">
                                            <div className="card h-100 border-0 shadow">
                                                <div className="card-header">
                                                    Purchases Module
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="form-check form-switch form-switch-role">
                                                                <input type="checkbox" className="form-check-input"
                                                                        id="access_purchases" name="permissions[]"
                                                                        value="access_purchases" onChange={onCheck} />
                                                                <label className="form-check-label" for="access_purchases">Access Purchases</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-check form-switch form-switch-role">
                                                                <input type="checkbox" className="form-check-input"
                                                                        id="create_purchases" name="permissions[]"
                                                                        value="create_purchases" onChange={onCheck}/>
                                                                <label className="form-check-label" for="create_purchases">Create Purchases</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-check form-switch form-switch-role">
                                                                <input type="checkbox" className="form-check-input"
                                                                        id="show_purchases" name="permissions[]"
                                                                        value="show_purchases" onChange={onCheck}/>
                                                                <label className="form-check-label" for="show_purchases">Show Purchases</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-check form-switch form-switch-role">
                                                                <input type="checkbox" className="form-check-input"
                                                                        id="edit_purchases" name="permissions[]"
                                                                        value="edit_purchases" onChange={onCheck}/>
                                                                <label className="form-check-label" for="edit_purchases">Edit Purchases</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-check form-switch form-switch-role">
                                                                <input type="checkbox" className="form-check-input"
                                                                        id="delete_purchases" name="permissions[]"
                                                                        value="delete_purchases" onChange={onCheck}/>
                                                                <label className="form-check-label" for="delete_purchases">Delete Purchases</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="row mb-5">
                                        {/* Sales Permission */}
                                        <div className="col-lg-4 col-md-6 mb-3">
                                            <div className="card h-100 border-0 shadow">
                                                <div className="card-header">
                                                    Sales Module
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="form-check form-switch form-switch-role">
                                                                <input type="checkbox" className="form-check-input"
                                                                        id="access_sales" name="permissions[]"
                                                                        value="access_sales" onChange={onCheck} />
                                                                <label className="form-check-label" for="access_sales">Access Sales</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-check form-switch form-switch-role">
                                                                <input type="checkbox" className="form-check-input"
                                                                        id="create_sales" name="permissions[]"
                                                                        value="create_sales" onChange={onCheck}/>
                                                                <label className="form-check-label" for="create_sales">Create Sales</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-check form-switch form-switch-role">
                                                                <input type="checkbox" className="form-check-input"
                                                                        id="show_sales" name="permissions[]"
                                                                        value="show_sales" onChange={onCheck}/>
                                                                <label className="form-check-label" for="show_sales">Show Sales</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="form-check form-switch form-switch-role">
                                                                <input type="checkbox" className="form-check-input"
                                                                        id="edit_sales" name="permissions[]"
                                                                        value="edit_sales" onChange={onCheck}/>
                                                                <label className="form-check-label" for="edit_sales">Edit Sales</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-check form-switch form-switch-role">
                                                                <input type="checkbox" className="form-check-input"
                                                                        id="delete_sales" name="permissions[]"
                                                                        value="delete_sales" onChange={onCheck}/>
                                                                <label className="form-check-label" for="delete_sales">Delete Sales</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Reports Permission */}
                                        <div className="col-lg-4 col-md-6 mb-3">
                                            <div className="card h-100 border-0 shadow">
                                                <div className="card-header">
                                                    Reports Module
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="form-check form-switch form-switch-role">
                                                                <input type="checkbox" className="form-check-input"
                                                                        id="access_reports" name="permissions[]"
                                                                        value="access_reports" onChange={onCheck} />
                                                                <label className="form-check-label" for="access_reports">Access Reports</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Setting Permission */}
                                        <div className="col-lg-4 col-md-6 mb-3">
                                            <div className="card h-100 border-0 shadow">
                                                <div className="card-header">
                                                    Settings Module
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="form-check form-switch form-switch-role">
                                                                <input type="checkbox" className="form-check-input"
                                                                        id="access_settings" name="permissions[]"
                                                                        value="access_settings" onChange={onCheck} />
                                                                <label className="form-check-label" for="access_settings">Access Settings</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
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

Edit.layout = (page) => <Base children={page} title={"Edit"}/>


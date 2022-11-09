import { Link } from '@inertiajs/inertia-react';
import React, { useState } from 'react'
import Dialog from '../../Components/Dashboard/Dialog';
import Base from '../../Layouts/Base'
import useDialog from '../../Hooks/useDialog';
import { Inertia } from '@inertiajs/inertia';

export default function Index(props) {

    const {data: roles, links, meta} = props.roles; 

    const [state, setState] = useState([])
    const [destroyDialogHandler, destroyCloseTrigger,destroyTrigger] = useDialog()

    const openDestroyDialog = (role) => {
        setState(role);
        destroyDialogHandler()        
    };

    const createPage = () => {
        Inertia.get(route('roles.create'));
    }

    const editPage = (role) => {
        Inertia.get(route('roles.edit', role.id));
    }

    const destroyRole = () => {
        Inertia.delete(
            route('roles.destroy', state.id), 
            { onSuccess: () => destroyCloseTrigger() });
    }

    return (
        <>
            <div className="container-fluid py-4">

                <Dialog trigger={destroyTrigger} title={`Delete Role: ${state.name}`}>
                    <p>Are you sure to delete this role ? user with this role will have empty role</p>
                    <div className="modal-footer">
                        <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" onClick={() => destroyRole()}  className="btn bg-gradient-danger">Delete</button>
                    </div>
                </Dialog>

                <div className="row pb-4">
                    <div className="col-12 w-100">
                        <div className="card h-100 w-100">                            
                            <div className="card-header pb-0">
                            <div className="row">
                                <div className="col-md-6">
                                    <h6>Roles table</h6>
                                </div>
                                <div className="col-md-6 d-flex justify-content-end">
                                    <button type="button"  onClick={() => createPage()} className="btn btn-teal-orange btn-block mb-3" data-bs-toggle="modal" data-bs-target="#exampleModalMessage">
                                        Create New Role
                                    </button>
                                </div>
                            </div>
                            </div>
                            <div className="card-body px-0 pt-0 pb-2">
                            <div className="table-responsive-xxl p-0" width="100%">
                                <table className="table align-items-center justify-content-center mb-0" width="100%">
                                    <thead>
                                        <tr>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-centter">#</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">Name</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Permissions</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {roles.map((role, index) => (
                                            <tr key={role.id}>
                                                <td className='text-center'>{index+1}</td>
                                                <td className='text-left'>
                                                    <div className="d-flex px-2">
                                                        <div>
                                                            <img src="/img/team-2.jpg" className="avatar avatar-sm  me-3 " />
                                                        </div>
                                                        <div className="my-auto">
                                                            <h6 className="mb-0 text-sm">{role.name}</h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='text-left'>
                                                    {role.permissions.map((permission, index) => (
                                                        index < 4 ? <span key={permission.id} className="badge bg-gradient-orange me-1">{permission.name}</span> : "."

                                                    ))}
                                                </td>
                                                <td className="align-middle text-center" width="10%">
                                                <div>
                                                {role.name !== 'Super Admin' && (
                                                    <>
                                                    <button type="button"  onClick={() => editPage(role)} className="btn btn-vimeo btn-icon-only mx-2">
                                                        <span className="btn-inner--icon"><i className="fas fa-pencil-alt"></i></span>
                                                    </button>
                                                    
                                                    <button type="button"  onClick={() => openDestroyDialog(role)} className="btn btn-youtube btn-icon-only">
                                                        <span className="btn-inner--icon"><i className="fas fa-trash"></i></span>
                                                    </button>
                                                    </>
                                                    )}
                                                </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        { meta.links.map((link, k) => (
                            <li key={k} className="page-item">
                                <Link disabled={link.url == null ? true : false} as="button" className={`${link.active && 'bg-info text-white'} ${link.url == null && 'btn bg-gradient-secondary text-white'} page-link`} href={link.url || ''} dangerouslySetInnerHTML={{ __html: link.label }}/>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    )
}

Index.layout = (page) => <Base key={page} children={page} title={"Manage Users"}/>

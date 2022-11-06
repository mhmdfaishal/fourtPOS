import { Link } from '@inertiajs/inertia-react';
import React, { useState } from 'react'
import Dialog from '../../Components/Dashboard/Dialog';
import Base from '../../Layouts/Base'
import useDialog from '../../Hooks/useDialog';
import CreateCategory from '../../Components/Dashboard/Category/CreateCategory';
import EditCategory from '../../Components/Dashboard/Category/EditCategory';
import { Inertia } from '@inertiajs/inertia';

export default function Index(props) {
    const {data: categories, links, meta} = props.categories; 

    const [state, setState] = useState([])
    const [addDialogHandler, addCloseTrigger,addTrigger] = useDialog()
    const [UpdateDialogHandler, UpdateCloseTrigger,UpdateTrigger] = useDialog()
    const [destroyDialogHandler, destroyCloseTrigger,destroyTrigger] = useDialog()
    const openUpdateDialog = (category) => {
        setState(category);
        UpdateDialogHandler()
    }

    const openDestroyDialog = (category) => {
        setState(category);
        destroyDialogHandler()        
    };

    const DestroyCategory = () => {
        Inertia.delete(
            route('category.delete', state.id), 
            { onSuccess: () => destroyCloseTrigger() });
    }

    return(
        <>
            <div className="container-fluid py-4">
                <Dialog trigger={addTrigger} title="Create New Category"> 
                    <CreateCategory close={addCloseTrigger} categories={categories}/>
                </Dialog>

                <Dialog trigger={UpdateTrigger} title={`Update Category: ${state.category_name}`}> 
                    <EditCategory model={state} close={UpdateCloseTrigger} categories={categories}/>
                </Dialog>

                <Dialog trigger={destroyTrigger} title={`Delete Category: ${state.category_name}`}>
                    <p>Are you sure to delete this category ? Product with this category will be deleted too</p>
                    <div className="modal-footer">
                        <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" onClick={DestroyCategory} className="btn bg-gradient-danger">Delete</button>
                    </div>
                </Dialog>

                <div className="row pb-4">
                    <div className="col-12 w-100">
                        <div className="card h-100 w-100">                            
                            <div className="card-header pb-0">
                            <div className="row">
                                <div className="col-md-6">
                                    <h6>Categories table</h6>
                                </div>
                                <div className="col-md-6 d-flex justify-content-end">
                                    <button type="button" onClick={addDialogHandler} className="btn btn-teal-orange btn-block mb-3" data-bs-toggle="modal" data-bs-target="#exampleModalMessage">
                                        Create New Category
                                    </button>
                                </div>
                            </div>
                            </div>
                            <div className="card-body px-0 pt-0 pb-2">
                            <div className="table-responsive-xxl p-0" width="100%">
                                <table className="table align-items-center justify-content-center mb-0" width="100%">
                                    <thead>
                                        <tr>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center">#</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Category Code</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Category Name</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map((category, index) => (
                                            <tr>
                                                <td className='text-center'>{index+1}</td>
                                                <td className='text-left'>
                                                    <span className="text-xs font-weight-bold">{category.category_code}</span>
                                                </td>
                                                <td className='text-left'>
                                                    <span className="text-xs font-weight-bold">{category.category_name}</span>
                                                </td>
                                                <td className="align-middle text-center" width="10%">
                                                <div>
                                                    <button type="button" onClick={() => openUpdateDialog(category)} className="btn btn-vimeo btn-icon-only mx-2">
                                                        <span className="btn-inner--icon"><i className="fas fa-pencil-alt"></i></span>
                                                    </button>
                                                    <button type="button" onClick={() => openDestroyDialog(category)} className="btn btn-youtube btn-icon-only">
                                                        <span className="btn-inner--icon"><i className="fas fa-trash"></i></span>
                                                    </button>
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
                {/* <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        { meta.links.map((link, k) => (
                            <li key={k} className="page-item">
                                <Link disabled={link.url == null ? true : false} as="button" className={`${link.active && 'bg-info'} ${link.url == null && 'btn bg-gradient-secondary text-white'} page-link`} href={link.url || ''} dangerouslySetInnerHTML={{ __html: link.label }}/>
                            </li>
                        ))}
                    </ul>
                </nav> */}
            </div>
        </>
    )
}
Index.layout = (page) => <Base key={page} children={page} title={"Manage Categories"}/>
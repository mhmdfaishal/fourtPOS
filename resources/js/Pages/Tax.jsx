import { useForm, usePage } from '@inertiajs/inertia-react';
import React from 'react'
import Base from '../Layouts/Base'

export default function Edit(props) {
    const { tax } = usePage().props
    const {data, setData, post, errors} = useForm({ tax: tax});

    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route('update.tax'), {
            data, 
            onSuccess: () => {

            }, 
        });
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
                                    <p className="mb-0">Edit Tax</p>
                                    <button type='submit' className="btn btn-teal-orange btn-sm ms-auto">Save</button>
                                    </div>
                                </div>
                                <div className="card-body">                                
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                            <label htmlFor="tax" className="form-control-label">Tax</label>
                                            <input className="form-control" type="number" name='tax' value={data.tax} onChange={onChange} id="tax" />
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

Edit.layout = (page) => <Base children={page} title={"Edit Tax"}/>


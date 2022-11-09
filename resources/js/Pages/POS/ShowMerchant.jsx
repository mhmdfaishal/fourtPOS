import React from 'react'
import BasePOS from '../../Layouts/BasePOS'
import { Inertia } from '@inertiajs/inertia'
import { useForm, usePage } from '@inertiajs/inertia-react';
import { convertToIDR } from "../../Utils/helper";

export default function ShowMerchant(props) {
    const { auth } = usePage().props;
    const {merchant: merchant} = props; 
    const {products: products} = props;

    const btnBackToListMerchant = () => {
        Inertia.get(route('list.merchant'));
    }

    const addToCart = (product) => {
        // add product to cart in local storage
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart == null) {
            cart = [];
            cart.push({ ...product, quantity: 1 });
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        if (cart != null) {
            // check if product already exists in cart
            let productExists = false;
            cart.forEach((item) => {
                if (item.id === product.id) {
                    productExists = true;
                    item.quantity++;
                }
            });
            // if product exist in cart, add new quantity to local storage
            if(productExists) {
                localStorage.setItem('cart', JSON.stringify(cart));
            }
            if (!productExists) {
                cart.push({ ...product, quantity: 1 });
                localStorage.setItem('cart', JSON.stringify(cart));
            }
        }

    }

    return (
        <>
            <div className="container p-5">
                <div className="btn-back d-flex align-items-center">
                    <button className='btn btn-arrow' type='button' onClick={() => btnBackToListMerchant()}> <i className='fas fa-arrow-left text-dark text-lg'></i> </button>
                        <h5>Welcome, <i>{auth.user.name}</i></h5>
                </div>
                <div className="btn w-100 mb-4 bg-card" style={{backgroundImage: `url("/img/card-merchant.png")`}}>
                    <div className="text-center">
                        <h1 className="p-4 text-white">{merchant?.merchant_name ? merchant.merchant_name : "Merchant X" }</h1>
                    </div>
                </div>
                <div className="row row-cols-3 gx-4" id="grid-system">
                    {products ? products.map((product,index) => (
                    <div className="col">
                        <div className="card text-center mb-3">
                            <img src={product.image} className="card-img-top px-3 pt-3" />
                            <div className="card-body">
                                <h5 className="card-title text-start">{product.product_name}</h5>
                                <p className="card-text text-start fs-6">{product.product_note}</p>
                                <h6 className="card-price">{convertToIDR(product.product_price)} / serve</h6>
                                <a onClick={(e) => addToCart(product)} class="btn btn-teal-orange mb-0 text-white">+ Keranjang</a>
                            </div>
                        </div>
                    </div>
                    )) : 
                        // Set no product
                        <div className="col text-center">
                            <h1 className="text-muted">No Product</h1>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
ShowMerchant.layout = (page) => <BasePOS children={page} title={"POS"}/>

<?php

namespace Modules\Sale\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Sale\Entities\Sale;
use Modules\Product\Entities\Product;
use App\Models\User;
use Inertia\Inertia;

class POSController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $merchants = User::role('merchant')->where('merchant_name', "!=", null)->get();
        return inertia('POS/Index',[
            'merchants' => $merchants,
        ]);
    }

    public function showMerchant($id) {
        $getMerchant = User::where('id', $id)->first();
        $products = Product::where('user_id', $id)->get();
        
        return inertia('POS/ShowMerchant',[
            'merchant' => $getMerchant,
            'products' => $products,
        ]);
    }
}

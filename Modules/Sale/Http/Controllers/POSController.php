<?php

namespace Modules\Sale\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Sale\Entities\Sale;
use Modules\Sale\Http\Resources\MerchantResource;
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
        $merchants = MerchantResource::collection(User::role('merchant')->where('merchant_name', "!=", null)->get());
        return inertia('POS/Index',[
            'merchants' => $merchants,
        ]);
    }

    public function showMerchant($id) {
        $merchant = User::where('id', $id)->first()->toArray();
        $products = Product::where('user_id', $id)->get()->toArray();
        // dd($merchant);
        return inertia('POS/ShowMerchant',[
            'merchant' => $merchant,
            'products' => $products,
        ]);
    }
}

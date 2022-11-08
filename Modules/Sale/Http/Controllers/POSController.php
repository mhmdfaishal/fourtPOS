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
use Modules\Sale\Http\Requests\StoreSaleRequest;
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

    public function storePayment(Request $request) {
        $request->validate([
            'no_table' => 'required|string|max:255',
            'sub_total' => 'required|numeric',
            'tax_amount' => 'required|numeric',
            'total_bill' => 'required|numeric',
        ]);


        $cart = $request->cart;

        $sale = Sale::create([
            'user_id' => auth()->user()->id,
            'date' => date('Y-m-d'),
            'tax_percentage' => env("TAX_PERCENTAGE"),
            'tax_amount' => $request->tax_amount,
            'total_amount' => $request->total_bill,
            'no_table' => $request->no_table,
        ]);

        foreach($cart as $item) {
            $product = Product::findOrFail($item["id"]);
            $sale->saleDetails()->create([
                'user_id' => $product->user_id,
                'product_id' => $product->id,
                'product_name' => $product->product_name,
                'product_code' => $product->product_code,
                'unit_price' => $product->product_cost,
                'price' => $product->product_price,
                'quantity' => $item["quantity"],
                'sub_total' => $item["quantity"] * $product->product_price,
            ]);
        }

        return redirect()->route('list.merchant')->with('success', 'Payment Success');
    }
}

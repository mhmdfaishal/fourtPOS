<?php

namespace Modules\Sale\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Sale\Entities\Sale;
use Modules\Sale\Entities\SaleDetails;
use Modules\Sale\Http\Resources\MerchantResource;
use Modules\Product\Entities\Product;
use App\Models\User;
use Modules\Sale\Http\Requests\StoreSaleRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
// set response
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Gate;

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
        abort_if(Gate::denies('access_pos_cashier'), 403);
        $merchants = MerchantResource::collection(User::role('merchant')->where('merchant_name', "!=", null)->get());
        return inertia('POS/Index',[
            'merchants' => $merchants,
        ]);
    }

    public function showMerchant($id) {
        abort_if(Gate::denies('access_pos_cashier'), 403);
        $merchant = User::where('id', $id)->first()->toArray();
        $products = Product::where('user_id', $id)->get()->toArray();
        // dd($merchant);
        return inertia('POS/ShowMerchant',[
            'merchant' => $merchant,
            'products' => $products,
        ]);
    }

    public function storePayment(Request $request) {
        abort_if(Gate::denies('create_pos_cashier'), 403);
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
            SaleDetails::create([
                'sale_id' => $sale->id,
                'user_id' => $product->user_id,
                'product_id' => $product->id,
                'product_name' => $product->product_name,
                'product_code' => $product->product_code,
                'unit_price' => $product->product_cost,
                'price' => $product->product_price,
                'quantity' => $item["quantity"],
                'sub_total' => $item["quantity"] * $product->product_price,
            ]);
            $product->product_quantity = $product->product_quantity - $item["quantity"];
            $product->save();
        }

        $saleDetails = $sale->saleDetails()->get();

        $pdf = \PDF::loadView('sale::print', [
            'sale' => $sale,
            'saleDetails' => $saleDetails,
        ])->setPaper('a7')
            ->setOption('margin-top', 8)
            ->setOption('margin-bottom', 8)
            ->setOption('margin-left', 5)
            ->setOption('margin-right', 5)
            ->setOption('encoding', 'utf-8')
            ->save(storage_path('app/public/sale/invoices/').$sale->reference.'.pdf');

        return redirect()->route('list.merchant')->with('success', 'Payment Success');
    }

    public function getInvoice(){
        abort_if(Gate::denies('access_pos_cashier'), 403);
        $getLastSale = Sale::orderBy('reference', 'desc')->first()->toArray();
        return inertia('POS/Invoice',[
            'invoice' => $getLastSale,
        ]);
    }
}

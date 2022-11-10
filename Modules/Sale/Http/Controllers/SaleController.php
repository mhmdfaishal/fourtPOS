<?php

namespace Modules\Sale\Http\Controllers;

use App\Models\User;
use Illuminate\Contracts\Support\Renderable;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Sale\Entities\Sale;
use Modules\Sale\Entities\SaleDetails;
use Modules\Sale\Entities\SalePayment;
use Modules\Product\Entities\Product;
use Modules\Sale\Http\Requests\StoreSaleRequest;
use Modules\Sale\Http\Requests\UpdateSaleRequest;
use Inertia\Inertia;
use Modules\Sale\Http\Resources\SalesResource;
use Illuminate\Support\Facades\Gate;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Renderable
     */
    public function index()
    {
        abort_if(Gate::denies('show_sales'), 403);
        // dd('test');
        $getAllSales = SalesResource::collection(Sale::whereHas('saleDetails', function($query) {
            $query->where('user_id', auth()->user()->id);
        })->orderBy('status', 'ASC')->latest()->paginate(10));

        // dd($getAllSales);
        return Inertia::render('Sales/Index', ['sales' => $getAllSales]);
    }

    public function changeStatus($id) {
        $sale = Sale::find($id);
        // dd($sale);
        $sale->status = 1;
        $sale->save();
        return redirect()->back();
    }

    /**
     * Show the form for creating a new resource.
     * @return Renderable
     */
    public function create()
    {
        // abort_if(Gate::denies('create_sales'), 403);
        // return Inertia::render('Sales/Create');
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Renderable
     */
    // public function store(StoreSaleRequest $request)
    // {
    //     DB::transaction(function () use ($request) {
    //         $due_amount = $request->total_amount - $request->paid_amount;

    //         if ($due_amount == $request->total_amount) {
    //             $payment_status = 'Unpaid';
    //         } elseif ($due_amount > 0) {
    //             $payment_status = 'Partial';
    //         } else {
    //             $payment_status = 'Paid';
    //         }

    //         $sale = Sale::create([
    //             'date' => $request->date,
    //             'user_id' => auth()->user()->id,
    //             'tax_percentage' => $request->tax_percentage,
    //             // 'tax_amount' => Cart::instance('sale')->tax() * 100,
    //             'total_amount' => $request->total_amount * 100,
    //             'paid_amount' => $request->paid_amount * 100,
    //             'payment_method' => $request->payment_method,
    //             'payment_status' => $payment_status,
    //         ]);

    //         foreach (Cart::instance('sale')->content() as $cart_item) {
    //             $product = Product::findOrFail($cart_item->id);
    //             SaleDetails::create([
    //                 'sale_id' => $sale->id,
    //                 'product_id' => $cart_item->id,
    //                 'product_name' => $cart_item->name,
    //                 'product_code' => $cart_item->options->code,
    //                 'price' => $cart_item->price * 100,
    //                 'quantity' => $cart_item->qty,
    //                 'sub_total' => $cart_item->options->sub_total * 100,
    //             ]);

    //             if ($request->status == 'Shipped' || $request->status == 'Completed') {
    //                 $product = Product::findOrFail($cart_item->id);
    //                 $product->update([
    //                     'product_quantity' => $product->product_quantity - $cart_item->qty
    //                 ]);
    //             }
    //         }

    //         Cart::instance('sale')->destroy();

    //         if ($sale->paid_amount > 0) {
    //             SalePayment::create([
    //                 'sale_id' => $sale->id,
    //                 'date' => $request->date,
    //                 'amount' => $sale->paid_amount,
    //                 'payment_method' => $request->payment_method,
    //                 'reference' => 'INV/'.$sale->reference,
    //             ]);
    //         }
    //     });

    //     return redirect()->route('sales.index')->with('success', 'Sale created successfully.');
    // }

    /**
     * Show the specified resource.
     * @param int $id
     * @return Renderable
     */

    /**
     * Show the form for editing the specified resource.
     * @param int $id
     * @return Renderable
     */

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Renderable
     */

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Renderable
     */
}

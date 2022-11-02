<?php

namespace Modules\Sale\Http\Controllers;

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

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Renderable
     */
    public function index()
    {
        abort_if(Gate::denies('access_sales'), 403);
        $getAllSales = Sale::latest()->get();

        // return Inertia::render('Sale/Index', ['data' => $getAllSales]);
    }

    /**
     * Show the form for creating a new resource.
     * @return Renderable
     */
    public function create()
    {
        abort_if(Gate::denies('create_sales'), 403);
        // return Inertia::render('Sale/Create');
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Renderable
     */
    public function store(StoreSaleRequest $request)
    {
        DB::transaction(function () use ($request) {
            $due_amount = $request->total_amount - $request->paid_amount;

            if ($due_amount == $request->total_amount) {
                $payment_status = 'Unpaid';
            } elseif ($due_amount > 0) {
                $payment_status = 'Partial';
            } else {
                $payment_status = 'Paid';
            }

            $sale = Sale::create([
                'date' => $request->date,
                'user_id' => auth()->user()->id,
                'tax_percentage' => $request->tax_percentage,
                // 'tax_amount' => Cart::instance('sale')->tax() * 100,
                'total_amount' => $request->total_amount * 100,
                'paid_amount' => $request->paid_amount * 100,
                'payment_method' => $request->payment_method,
                'payment_status' => $payment_status,
            ]);

            foreach (Cart::instance('sale')->content() as $cart_item) {
                $product = Product::findOrFail($cart_item->id);
                SaleDetails::create([
                    'sale_id' => $sale->id,
                    'product_id' => $cart_item->id,
                    'product_name' => $cart_item->name,
                    'product_code' => $cart_item->options->code,
                    'price' => $cart_item->price * 100,
                    'quantity' => $cart_item->qty,
                    'sub_total' => $cart_item->options->sub_total * 100,
                ]);

                if ($request->status == 'Shipped' || $request->status == 'Completed') {
                    $product = Product::findOrFail($cart_item->id);
                    $product->update([
                        'product_quantity' => $product->product_quantity - $cart_item->qty
                    ]);
                }
            }

            Cart::instance('sale')->destroy();

            if ($sale->paid_amount > 0) {
                SalePayment::create([
                    'sale_id' => $sale->id,
                    'date' => $request->date,
                    'amount' => $sale->paid_amount,
                    'payment_method' => $request->payment_method,
                    'reference' => 'INV/'.$sale->reference,
                ]);
            }
        });
    }

    /**
     * Show the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function show($id)
    {
        abort_if(Gate::denies('show_sales'), 403);

        $getSaleById = Sale::findOrFail($id);

        // return Inertia::render('Sale/Show', ['data' => $getSaleById]);
    }

    /**
     * Show the form for editing the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function edit(Sale $sale)
    {
        abort_if(Gate::denies('edit_sales'), 403);

        $sale_details = $sale->saleDetails;

        Cart::instance('sale')->destroy();

        $cart = Cart::instance('sale');
        foreach ($sale_details as $sale_detail) {

            $cart->add([
                'id'      => $sale_detail->product_id,
                'name'    => $sale_detail->product_name,
                'qty'     => $sale_detail->quantity,
                'price'   => $sale_detail->price,
                'weight'  => 1,
                'options' => [
                    'sub_total'   => $sale_detail->sub_total,
                    'code'        => $sale_detail->product_code,
                    'stocks'      => $sale_detail->product->product_quantity,
                ]
            ]);
        }

        // return Inertia::render('Sale/Edit', ['data' => $sale]);
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Renderable
     */
    public function update(UpdateSaleRequest $request, Sale $sale)
    {
        DB::transaction(function () use ($request, $sale) {

            $due_amount = $request->total_amount - $request->paid_amount;

            if ($due_amount == $request->total_amount) {
                $payment_status = 'Unpaid';
            } elseif ($due_amount > 0) {
                $payment_status = 'Partial';
            } else {
                $payment_status = 'Paid';
            }

            foreach ($sale->saleDetails as $sale_detail) {
                if ($sale->status == 'Shipped' || $sale->status == 'Completed') {
                    $product = Product::findOrFail($sale_detail->product_id);
                    $product->update([
                        'product_quantity' => $product->product_quantity + $sale_detail->quantity
                    ]);
                }
                $sale_detail->delete();
            }

            $sale->update([

                'reference' => $request->reference,
                'date' => $request->date,
                'user_id' => auth()->user()->id,
                'tax_percentage' => $request->tax_percentage,
                // 'tax_amount' => Cart::instance('sale')->tax() * 100,
                'total_amount' => $request->total_amount * 100,
                'paid_amount' => $request->paid_amount * 100,
                'payment_method' => $request->payment_method,
                'payment_status' => $payment_status,
            ]);

            foreach (Cart::instance('sale')->content() as $cart_item) {
                $product = Product::findOrFail($cart_item->id);

                SaleDetails::create([
                    'sale_id' => $sale->id,
                    'product_id' => $cart_item->id,
                    'product_name' => $cart_item->name,
                    'product_code' => $cart_item->options->code,
                    'price' => $cart_item->price * 100,
                    'quantity' => $cart_item->qty,
                    'sub_total' => $cart_item->options->sub_total * 100,
                ]);

                if ($request->status == 'Shipped' || $request->status == 'Completed') {
                    $product = Product::findOrFail($cart_item->id);
                    $product->update([
                        'product_quantity' => $product->product_quantity - $cart_item->qty
                    ]);
                }
            }

            Cart::instance('sale')->destroy();
        });

        // return redirect()->route('sale.index');
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Renderable
     */
    public function destroy(Sale $sale)
    {
        abort_if(Gate::denies('delete_sales'), 403);

        $sale->delete();

        // return redirect()->route('sale.index');
    }
}

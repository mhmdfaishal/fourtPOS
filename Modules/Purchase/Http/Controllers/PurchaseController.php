<?php

namespace Modules\Purchase\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Purchase\Entities\Purchase;
use Inertia\Inertia;
use Modules\Purchase\Http\Requests\PurchaseRequest;

class PurchaseController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Renderable
     */
    public function index()
    {
        $data = Purchase::with('purchaseDetails')->where('user_id', auth()->user()->id)->get();
        return Inertia::render('Purchases/Index', ['data' => $data]);
    }

    /**
     * Show the form for creating a new resource.
     * @return Renderable
     */
    public function create()
    {
        $urlPost = route('purchase.create.store');
        return Inertia::render('Purchases/AddForm', ['urlPost' => $urlPost]);
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Renderable
     */
    public function store(Request $request, Purchase $purchase)
    {
        // dd($request->all());
        $purchase->fill($request->only($purchase->getFillable()));
        $purchase->user_id = auth()->user()->id;
        $purchase->reference = 'PUR-'.date('YmdHis');
        $purchase->save();
        foreach($request->products as $product){
            $purchase->purchaseDetails()->create([
                'product_name' => $product['product_name'],
                'quantity' => $product['quantity'],
                'price' => $product['price'],
            ]);
        }

        return redirect()->route('purchase.index');
    }


    /**
     * Show the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function show($id)
    {
        return view('purchase::show');
    }

    /**
     * Show the form for editing the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function edit(Purchase $purchase)
    {
        $urlPost = route('purchase.edit.post', $purchase->id);
        // dd($purchase);
        return Inertia::render('Purchases/EditForm', ['urlPost' => $urlPost, 'data' => $purchase]);
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Renderable
     */
    public function update(PurchaseRequest $request, Purchase $purchase)
    {
        $purchase->fill($request->only($purchase->getFillable()));
        if($purchase->isDirty()){
            $purchase->save();
        }

        if($purchase->purchaseDetails()->get()->toArray() != $request->products){
            $purchase->purchaseDetails()->delete();
            foreach($request->products as $product){
                $purchase->purchaseDetails()->create([
                    'product_name' => $product['product_name'],
                    'quantity' => $product['quantity'],
                    'price' => $product['price'],
                    ]);
            }
        }

        return redirect()->route('purchase.index');
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Renderable
     */
    public function destroy(Purchase $purchase)
    {
        $purchase->purchaseDetails()->delete();
        $purchase->delete();
        // return redirect()->route('purchase.index');
    }
}

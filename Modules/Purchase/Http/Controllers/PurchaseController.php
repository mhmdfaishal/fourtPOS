<?php

namespace Modules\Purchase\Http\Controllers;

use App\Models\User;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Purchase\Entities\Purchase;
use Inertia\Inertia;
use Modules\Purchase\Http\Requests\PurchaseRequest;
use Illuminate\Support\Facades\Gate;
use Modules\Report\Http\Resources\PurchaseResource;

class PurchaseController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Renderable
     */
    public function index()
    {
        abort_if(Gate::denies('show_purchases'), 403);
        $data = PurchaseResource::collection(Purchase::with('purchaseDetails')->where('user_id', auth()->user()->id)->latest()->paginate(10));

        return Inertia::render('Purchase/Index', ['purchases' => $data]);
    }

    /**
     * Show the form for creating a new resource.
     * @return Renderable
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Renderable
     */
    public function store(PurchaseRequest $request, Purchase $purchase)
    {
        abort_if(Gate::denies('create_purchases'), 403);
        // dd($request->all());
        $purchase->fill($request->only($purchase->getFillable()));
        
        $purchase->user_id = auth()->user()->id;
        // $purchase->reference = 'PUR-'.date('YmdHis');
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
        abort_if(Gate::denies('edit_purchases'), 403);
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
        abort_if(Gate::denies('edit_purchases'), 403);
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
        abort_if(Gate::denies('delete_purchases'), 403);
        $purchase->purchaseDetails()->delete();
        $purchase->delete();
        return redirect()->route('purchase.index');
    }
}

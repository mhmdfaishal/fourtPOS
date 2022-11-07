<?php

namespace Modules\Report\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Modules\Purchase\Entities\Purchase;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Modules\Report\Http\Requests\ReportFilterRequest;
use Modules\Sale\Entities\Sale;
use Modules\Sale\Http\Resources\SalesResource;
use Modules\Report\Http\Resources\PurchaseResource;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Renderable
     */
    public function index(Request $request)
    {
        $purchase = PurchaseResource::collection(Purchase::with('purchaseDetails')->with('user')->where('user_id', auth()->user()->id)->paginate(10));
        $sales = SalesResource::collection(Sale::with('saleDetails')->with('user')->where('user_id', auth()->user()->id)->paginate(10));
        $totalIncome = $sales->sum('total_amount');
        $totalExpense = $purchase->sum('total_amount');
        $totalBenefit = 0;
        foreach($sales as $sale){
            foreach($sale->saleDetails as $saleDetail){
                $totalBenefit += $saleDetail->unit_price * $saleDetail->quantity;
            }
        }
        $totalBenefit = $totalIncome - $totalBenefit;
        return Inertia::render('Reports/Index', [
            'totalIncome' => $totalIncome, 
            'totalExpense' => $totalExpense, 
            'totalBenefit' => $totalBenefit, 
            'sales' => $sales,
            'purchases' => $purchase
            ]);
    }

    /**
     * Show the form for creating a new resource.
     * @return Renderable
     */
    public function create()
    {
        return view('report::create');
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Renderable
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Show the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function show(ReportFilterRequest $request)
    {
        $from = $request->start_date;
        $to = $request->end_date;
        $purchases = PurchaseResource::collection(Purchase::with('purchaseDetails')->with('user')->where('user_id', auth()->user()->id)->whereBetween('date',[$from,$to])->paginate(10));
        $sales = SalesResource::collection(Sale::with('saleDetails')->with('user')->where('user_id', auth()->user()->id)->whereBetween('date',[$from,$to])->paginate(10));
        $totalBenefit = 0;
        $totalIncome = $sales->sum('total_amount');
        $totalExpense = $purchases->sum('total_amount');
        foreach($sales as $sale){
            foreach($sale->saleDetails as $saleDetail){
                $totalBenefit += $saleDetail->unit_price * $saleDetail->quantity;
            }
        }
        $totalBenefit = $totalIncome - $totalBenefit;
        return Inertia::render('Reports/Index', [
            'totalIncome' => $totalIncome, 
            'totalExpense' => $totalExpense, 
            'totalBenefit' => $totalBenefit, 
            'sales' => $sales,
            'purchases' => $purchases
            ]);
    }

    /**
     * Show the form for editing the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function edit($id)
    {
        return view('report::edit');
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Renderable
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Renderable
     */
    public function destroy($id)
    {
        //
    }
}
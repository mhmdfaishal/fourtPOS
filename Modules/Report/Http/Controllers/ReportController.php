<?php

namespace Modules\Report\Http\Controllers;

use App\Models\User;
use Illuminate\Contracts\Support\Renderable;
use Modules\Purchase\Entities\Purchase;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Modules\Report\Http\Requests\ReportFilterRequest;
use Modules\Sale\Entities\Sale;
use Modules\Sale\Http\Resources\SalesResource;
use Modules\Report\Http\Resources\PurchaseResource;
use Illuminate\Support\Facades\Gate;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Renderable
     */
    public function index(Request $request)
    {
        abort_if(Gate::denies('access_reports'), 403);

        $user = User::where('id', auth()->user()->id)->first();
        if ($user->hasRole('Super Admin')){
            $purchase = PurchaseResource::collection(Purchase::with('purchaseDetails')->with('user')->paginate(10));
            $sales = SalesResource::collection(Sale::paginate(10));
        } else {
            $purchase = PurchaseResource::collection(Purchase::with('purchaseDetails')->with('user')->where('user_id', auth()->user()->id)->paginate(10));
            $sales = SalesResource::collection(Sale::whereHas('saleDetails', function($query)
                        {
                            $query->where('user_id', auth()->user()->id);
                        })->get());
            $saleReports = SalesResource::collection(Sale::whereHas('saleDetails', function($query)
                        {
                            $query->where('user_id', auth()->user()->id);
                        })->paginate(10));
            
        }
        $totalIncome = $sales->sum('sum_of_sub_total');
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
            'purchases' => $purchase,
            'saleReports' => $saleReports
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
        abort_if(Gate::denies('access_reports'), 403);
        $from = $request->start_date;
        $to = $request->end_date;
        $user = User::where('id', auth()->user()->id)->first();
        if ($user->hasRole('Super Admin')){
            $purchases = PurchaseResource::collection(Purchase::with('purchaseDetails')->with('user')->whereBetween('date',[$from,$to])->paginate(10));
            $sales = SalesResource::collection(Sale::with('saleDetails')->with('user')->whereBetween('date',[$from,$to])->paginate(10));
        } else {
            $purchases = PurchaseResource::collection(Purchase::with('purchaseDetails')->with('user')->where('user_id', auth()->user()->id)->whereBetween('date',[$from,$to])->paginate(10));
            $sales = SalesResource::collection(Sale::whereHas('saleDetails', function($query)
                        {
                            $query->where('user_id', auth()->user()->id);
                        })->whereBetween('date',[$from,$to])->get());
            $saleReports = SalesResource::collection(Sale::whereHas('saleDetails', function($query)
                        {
                            $query->where('user_id', auth()->user()->id);
                        })->whereBetween('date',[$from,$to])->paginate(10));
        }
        $totalBenefit = 0;
        $totalIncome = $sales->sum('sum_of_sub_total');
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
            'purchases' => $purchases,
            'saleReports' => $saleReports
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
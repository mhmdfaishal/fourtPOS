<?php

namespace Modules\Report\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Modules\Purchase\Entities\Purchase;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Modules\Report\Http\Requests\ReportFilterRequest;
use Modules\Sale\Entities\Sale;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Renderable
     */
    public function index(Request $request)
    {
        $purchase = Purchase::with('purchaseDetails')->with('user')->where('user_id', auth()->user()->id)->get();
        $sale = Sale::with('saleDetails')->with('user')->where('user_id', auth()->user()->id)->get();
        $data = $sale->merge($purchase);
        $data->sortBy('date');
        $urlPost = route('reports.show');
        $income = $sale->sum('total_amount');
        $outcome = $purchase->sum('total_amount');
    
        $profit = $income - $outcome;
        return Inertia::render('Reports/Index', [
            'data' => $data, 
            'urlPost' => $urlPost,
            'income' => $income,
            'outcome' => $outcome,
            'profit' => $profit
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
        $purchase = Purchase::with('purchaseDetails')->with('user')->where('user_id', auth()->user()->id)->whereBetween('date',[$from,$to])->get();
        $sale = Sale::with('saleDetails')->with('user')->where('user_id', auth()->user()->id)->whereBetween('date',[$from,$to])->get();
        $data = $sale->merge($purchase);
        $urlPost = route('report.show');
        $data->sortBy('date');
        // dd($data);
        $income = $sale->sum('total_amount');
        $outcome = $purchase->sum('total_amount');
        $profit = $income - $outcome;
        return Inertia::render('Reports/Index', [
            'data' => $data, 
            'urlPost' => $urlPost,
            'income' => $income,
            'outcome' => $outcome,
            'profit' => $profit
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
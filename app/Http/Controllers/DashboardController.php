<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Modules\Product\Entities\Product;
use Modules\Product\Entities\Category;
use Modules\Sale\Entities\Sale;
use Modules\Purchase\Entities\Purchase;
use App\Http\Resources\TotalProductResources;
use App\Http\Resources\TotalCategoryResources;
use App\Http\Resources\TotalSaleResources;
use App\Http\Resources\TotalPurchasesResources;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;


class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        abort_if(Gate::denies('show_dashboard'), 403);

        $totalProducts = TotalProductResources::collection(Product::where('user_id', auth()->user()->id)->get());
        $totalCategories = TotalCategoryResources::collection(Category::where('user_id', auth()->user()->id)->get());
        $totalSales = TotalSaleResources::collection(Sale::whereHas('saleDetails', function($query) {
            $query->where('user_id', auth()->user()->id);
        })->get());
        $totalPurchases = TotalPurchasesResources::collection(Purchase::where('user_id', auth()->user()->id)->get());

        $sale = Sale::whereHas('saleDetails', function($query) {
            $query->where('user_id', auth()->user()->id);
        })->get()->toArray();

        $outcome = Purchase::where('user_id', auth()->user()->id)->get()->toArray();
        return inertia('Dashboard',
            [
                'totalProducts' => $totalProducts,
                'totalCategories' => $totalCategories,
                'totalSales' => $totalSales,
                'totalPurchases' => $totalPurchases,
                'sale' => $sale,
                'outcome'   => $outcome,
            ]
        );
    }

    public function getTax(){
        $tax = env("TAX_PERCENTAGE");

        return inertia('Tax',[
            'tax' => $tax,
        ]);
    }

    public function updateTax(Request $request) {
        abort_if(Gate::denies('access_settings'), 403);

        $toReplace = array(
            'TAX_PERCENTAGE='.env('TAX_PERCENTAGE').'',
            
        );

        $replaceWith = array(
            'TAX_PERCENTAGE='.$request->tax.'',
        );
        
        try {
            file_put_contents(base_path('.env'), str_replace($toReplace, $replaceWith, file_get_contents(base_path('.env'))));

        } catch (\Exception $exception) {
            Log::error($exception);
            session()->flash('settings_admin', 'Something Went Wrong!');
        }

        return redirect()->route('tax')->with('success', 'Tax updated successfully.');
    }
}

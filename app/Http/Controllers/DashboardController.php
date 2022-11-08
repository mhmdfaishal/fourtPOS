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
        $totalProducts = TotalProductResources::collection(Product::where('user_id', auth()->user()->id)->get());
        $totalCategories = TotalCategoryResources::collection(Category::where('user_id', auth()->user()->id)->get());
        $totalSales = TotalSaleResources::collection(Sale::where('user_id', auth()->user()->id)->get());
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
}

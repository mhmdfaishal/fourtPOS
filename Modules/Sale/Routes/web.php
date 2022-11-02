<?php

use Modules\Sale\Http\Controllers\SaleController;
use Modules\Sale\Http\Controllers\SalePaymentsController;
use Modules\Sale\Entities\Sale;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('sale-payments')->group(function() {
        //Payments
        Route::get('/{sale_id}', [SalePaymentsController::class, 'index'])->name('sale-payments.index');
        Route::get('/{sale_id}/create', [SalePaymentsController::class, 'create'])->name('sale-payments.create');
        Route::post('/store', [SalePaymentsController::class, 'store'])->name('sale-payments.store');
        Route::get('/{sale_id}/edit/{salePayment}', [SalePaymentsController::class, 'edit'])->name('sale-payments.edit');
        Route::patch('/update/{salePayment}', [SalePaymentsController::class, 'update'])->name('sale-payments.update');
        Route::delete('/destroy/{salePayment}', [SalePaymentsController::class, 'destroy'])->name('sale-payments.destroy');
    });

    //Generate PDF
    Route::get('/sales/pdf/{id}', function ($id) {
        $sale = Sale::findOrFail($id);

        $pdf = \PDF::loadView('sale::print', [
            'sale' => $sale,
        ])->setPaper('a4');

        return $pdf->stream('sale-'. $sale->reference .'.pdf');
    })->name('sales.pdf');
    //Sales
    Route::resource('sales', SaleController::class);
});
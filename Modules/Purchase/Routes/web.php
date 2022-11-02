<?php

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

use Modules\Purchase\Http\Controllers\PurchaseController;

// Route::prefix('purchase')->group(function() {
//     Route::get('/', [PurchaseController::class, 'index'])->name('purchase.index');
// });

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('purchase')->group(function() {
        Route::get('/', [PurchaseController::class, 'index'])->name('purchase.index');
        Route::get('/create', [PurchaseController::class, 'create'])->name('purchase.create.form');
        Route::post('/create', [PurchaseController::class, 'store'])->name('purchase.create.store');
        Route::get('/{purchase}/edit', [PurchaseController::class, 'edit'])->name('purchase.edit.form');
        Route::post('/{purchase}/edit', [PurchaseController::class, 'update'])->name('purchase.edit.post');
        Route::delete('/{purchase}/delete', [PurchaseController::class, 'destroy'])->name('purchase.delete');
    });
});

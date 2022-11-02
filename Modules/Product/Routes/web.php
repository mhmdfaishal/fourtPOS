<?php

use Modules\Product\Http\Controllers\CategoryController;
use Modules\Product\Http\Controllers\ProductController;
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

    Route::prefix('product')->group(function() {
        //Product 
        Route::get('/', [ProductController::class, 'index'])->name('product.index');
        Route::get('/create', [ProductController::class, 'create'])->name('product.create.form');
        Route::post('/create', [ProductController::class, 'store'])->name('product.create.store');
        Route::get('/{product}/update', [ProductController::class, 'edit'])->name('product.edit.form');
        Route::put('/{product}/put', [ProductController::class, 'update'])->name('product.edit.post');
        Route::delete('/{product}/delete', [ProductController::class, 'destroy'])->name('product.delete');
    });
    Route::prefix('product_category')->group(function() {
        //Product Category
        Route::get('/', [CategoryController::class, 'index'])->name('category.index');
        Route::get('/create', [CategoryController::class, 'create'])->name('category.create.form');
        Route::post('/create', [CategoryController::class, 'store'])->name('category.create.store');
        Route::get('/{category}/update', [CategoryController::class, 'edit'])->name('category.edit.form');
        Route::patch('/{category}/patch', [CategoryController::class, 'update'])->name('category.edit.post');
        Route::delete('/{category}/delete', [CategoryController::class, 'destroy'])->name('category.delete');
    });
});
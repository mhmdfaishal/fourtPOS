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

use Modules\Report\Http\Controllers\ReportController;

Route::prefix('report')->group(function() {
    Route::get('/', [ReportController::class, 'index'])->name('reports.index');
    Route::post('/', [ReportController::class, 'show'])->name('reports.show');
});
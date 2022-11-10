<?php

use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
// use App\Http\Controllers\RoleController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->middleware(['auth','verified'])->name('home');

Route::middleware('auth')->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
    Route::post('logout', [LoginController::class, 'destroy'])->name('logout');
    
    Route::apiResource('users', UserController::class);
    Route::put('users/profile/{user}', [UserController::class, 'updateProfile'])->name('users.profile');

    Route::get('profile', ProfileController::class)->name('profile');

    // Route::get('roles', [RoleController::class, 'index'])->name('roles.index');
    Route::get('tax', [DashboardController::class, 'getTax'])->name('tax');
    Route::post('tax', [DashboardController::class, 'updateTax'])->name('update.tax');
});

Route::middleware('guest')->group(function () {
    Route::get('login', [LoginController::class, 'create'])->name('login');
    Route::post('login', [LoginController::class, 'store']);
    
    Route::get('register', [RegisterController::class, 'create'])->name('register');
    Route::post('register', [RegisterController::class, 'store']);

});


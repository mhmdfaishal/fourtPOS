<?php

use Modules\User\Http\Controllers\ProfileController;
use Modules\User\Http\Controllers\UserController;
use Modules\User\Http\Controllers\RoleController;
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

    //User Profile
    Route::get('/user/profile', [ProfileController::class,'edit'])->name('profile.edit');
    Route::patch('/user/profile', [ProfileController::class,'update'])->name('profile.update');
    Route::patch('/user/password', [ProfileController::class,'updatePassword'])->name('profile.update.password');

    //Users
    Route::resource('user', UserController::class)->except('show');
    //Roles
    Route::resource('roles', RoleController::class)->except('show');

});
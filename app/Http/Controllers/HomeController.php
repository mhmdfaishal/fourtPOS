<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $user = auth()->user();
        if ($user->getRoleNames()->first() == 'Super Admin' || $user->getRoleNames()->first() == 'Merchant') {
            return redirect()->route('dashboard');
        }
    }
}

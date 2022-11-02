<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function index()
    {
        $users = UserResource::collection(User::with('roles')->latest()->paginate(10));
        // dd($users[0]->roles[0]->name);
        return inertia('Users/Index', [
            'users' => $users,
        ]);
    }

    public function store(UserRequest $request)
    {
        $attr = $request->toArray();

        User::create($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'User has been created',
        ]);
    }

    public function update(UserRequest $request, User $user)
    {
        $attr = $request->toArray();

        $user->update($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'User has been updated',
        ]);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return back()->with([
            'type' => 'success',
            'message' => 'User has been deleted',
        ]);
    }
}

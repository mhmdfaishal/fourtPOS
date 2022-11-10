<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Resources\UserResource;
use App\Http\Resources\RolesResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{

    public function index()
    {
        abort_if(Gate::denies('access_user_management'), 403);
        $users = UserResource::collection(User::with('roles')->latest()->paginate(10));

        $roles = RolesResource::collection(Role::where('name', '!=', 'Super Admin')->orderBy('created_at', 'asc')->get());

        return inertia('Users/Index', [
            'users' => $users,
            'roles' => $roles,
        ]);
    }

    public function store(UserRequest $request)
    {
        abort_if(Gate::denies('access_user_management'), 403);
        $form_data = array(
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'is_active' => $request->is_active,
            'merchant_name' => $request->merchant_name,
        );

        if ($request->role == "Merchant" && $request->merchant_name == null) {
            return redirect()->back()->with('error', 'Merchant name is required');
        }

        $create_user = User::create($form_data);
        $create_user->assignRole($request->role);

        return back()->with([
            'type' => 'success',
            'message' => 'User has been created',
        ]);
    }

    public function updateProfile(ProfileUpdateRequest $request, User $user)
    {
        $form_data = array(
            'name'     => $request->name,
            'email'    => $request->email,
        );
        
        if($request->password != null && $request->password == $request->password_confirmation) {
            // add password to form data
            $form_data['password'] = Hash::make($request->password);
        } else if($request->password != null && $request->password_confirmation == null) {
            return redirect()->back()->with('error', 'Password confirmation is required');
        }

        if($user->getRoleNames()->first() == 'Merchant' && $request->merchant_name == null) {
            return redirect()->back()->with('error', 'Merchant name is required');
        } else if ($user->getRoleNames()->first() == 'Merchant' && $request->merchant_name != null) {
            $form_data['merchant_name'] = $request->merchant_name;
        }

        $user->update($form_data);

        return back()->with([
            'type' => 'success',
            'message' => 'Profile has been updated',
        ]);
    }

    public function update(UserUpdateRequest $request, User $user)
    {
        abort_if(Gate::denies('access_user_management'), 403);
        $form_data = array(
            'name'     => $request->name,
            'email'    => $request->email,
            'is_active' => $request->is_active,
            'merchant_name' => $request->merchant_name,
        );
        
        $user->update($form_data);
        $user->syncRoles($request->user_role);

        return back()->with([
            'type' => 'success',
            'message' => 'User has been updated',
        ]);
    }

    public function destroy(User $user)
    {
        abort_if(Gate::denies('access_user_management'), 403);
        $user->delete();

        return back()->with([
            'type' => 'success',
            'message' => 'User has been deleted',
        ]);
    }
}

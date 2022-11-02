<?php

namespace Modules\User\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Gate;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index() {
        abort_if(Gate::denies('access_user_management'), 403);

        $roles = Role::all();

    }

    public function create() {
        abort_if(Gate::denies('access_user_management'), 403);

    }


    public function store(Request $request) {
        abort_if(Gate::denies('access_user_management'), 403);

        $request->validate([
            'name' => 'required|string|max:255',
            'permissions' => 'required|array'
        ]);

        $role = Role::create([
            'name' => $request->name
        ]);

        $role->givePermissionTo($request->permissions);


    }


    public function edit(Role $role) {
        abort_if(Gate::denies('access_user_management'), 403);


    }


    public function update(Request $request, Role $role) {
        abort_if(Gate::denies('access_user_management'), 403);

        $request->validate([
            'name' => 'required|string|max:255',
            'permissions' => 'required|array'
        ]);

        $role->update([
            'name' => $request->name
        ]);

        $role->syncPermissions($request->permissions);

    }


    public function destroy(Role $role) {
        abort_if(Gate::denies('access_user_management'), 403);

        $role->delete();

    }
}

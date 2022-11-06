<?php

namespace Modules\User\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Gate;
use App\Http\Resources\RolesResource;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index() {
        abort_if(Gate::denies('access_user_management'), 403);

        $roles = RolesResource::collection(Role::with(['permissions' => function ($query) {
            $query->select('name')->get();
            }])->orderBy('created_at', 'asc')->paginate(10));

        return inertia('Roles/Index', [
            'roles' => $roles,
        ]);

    }

    public function create() {
        abort_if(Gate::denies('access_user_management'), 403);

        return inertia('Roles/Create');
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

        return redirect()->route('roles.index')->with([
            'type' => 'success',
            'message' => 'Role has been created',
        ]);
    }


    public function edit(Role $role) {
        abort_if(Gate::denies('access_user_management'), 403);

        // $role->load('permissions');
        // get all permissions name and put it in array
        $permissions = $role->permissions->pluck('name')->toArray();
        return inertia('Roles/Edit', [
            'role' => $role,
            'permissions' => $permissions
        ]);
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

        return redirect()->route('roles.index')->with([
            'type' => 'success',
            'message' => 'Role has been updated',
        ]);
    }


    public function destroy(Role $role) {
        abort_if(Gate::denies('access_user_management'), 403);

        $role->delete();
        return redirect()->route('roles.index')->with([
            'type' => 'success',
            'message' => 'Role has been deleted',
        ]);
    }
}

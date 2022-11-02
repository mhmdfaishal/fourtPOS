<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class SuperUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'name' => 'Owner Foodcourt',
            'email' => 'admin@warpos.co.id',
            'password' => Hash::make("WarzoPOS2022!"),
            'is_active' => 1
        ]);

        $superAdmin = Role::create([
            'name' => 'Super Admin'
        ]);
        $superAdmin->givePermissionTo(['access_user_management','edit_own_profile','access_settings','create_pos_sales']);
        $user->assignRole($superAdmin);
    }
}

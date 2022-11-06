<?php

namespace Modules\User\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions = [
            //User Mangement
            'edit_own_profile',
            'access_user_management',
            //Dashboard
            'show_dashboard',
            //Products
            'access_products',
            'create_products',
            'show_products',
            'edit_products',
            'delete_products',
            //Product Categories
            'access_product_categories',
            'create_product_categories',
            'show_product_categories',
            'edit_product_categories',
            'delete_product_categories',
            //Sales
            'access_sales',
            'create_sales',
            'show_sales',
            'edit_sales',
            'delete_sales',
            
            //POS Cashier
            'create_pos_cashier',
            'access_pos_cashier',
            //Sale Payments
            // 'access_sale_payments',

            //Purchases
            'access_purchases',
            'create_purchases',
            'show_purchases',
            'edit_purchases',
            'delete_purchases',
            //Purchase Payments
            // 'access_purchase_payments',

            //Reports
            'access_reports',

            //Settings
            'access_settings'
        ];

        foreach ($permissions as $permission) {
            Permission::create([
                'name' => $permission
            ]);
        }

        $role = Role::create([
            'name' => 'Merchant'
        ]);

        $role->givePermissionTo($permissions);
        $role->revokePermissionTo('access_user_management', 'create_pos_sales', 'access_currencies', 'create_currencies','edit_currencies','delete_currencies','access_settings');
    }
}

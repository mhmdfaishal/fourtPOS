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
            'show_total_stats',
            'show_month_overview',
            'show_weekly_sales_purchases',
            'show_monthly_cashflow',
            'show_notifications',
            //Products
            'access_products',
            'create_products',
            'show_products',
            'edit_products',
            'delete_products',
            //Product Categories
            'access_product_categories',

            //Sales
            'access_sales',
            'create_sales',
            'show_sales',
            'edit_sales',
            'delete_sales',
            
            //POS Sale
            'create_pos_sales',
            //Sale Payments
            'access_sale_payments',

            //Purchases
            'access_purchases',
            'create_purchases',
            'show_purchases',
            'edit_purchases',
            'delete_purchases',
            //Purchase Payments
            'access_purchase_payments',

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

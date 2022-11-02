<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('purchase_details', function (Blueprint $table) {
            $table->dropConstrainedForeignId('product_id');
            // $table->dropColumn('product_id');
            $table->dropColumn('sub_total');
            $table->dropColumn('product_discount_amount');
            $table->dropColumn('product_code');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('purchase_details', function (Blueprint $table) {
            $table->foreignId('product_id')->nullable()->after('id')->constrained('products')->nullOnDelete();
            $table->integer('sub_total')->nullable()->after('product_id');
            $table->integer('product_discount_amount')->nullable()->after('sub_total');
            $table->string('product_code', 255)->nullable()->after('product_discount_amount');
        });
    }
};

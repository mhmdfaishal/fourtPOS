<?php

namespace Modules\Sale\Entities;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Sale extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $appends = ['user_name','sale_details', 'sum_of_sub_total'];

    public function user(){
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function saleDetails() {
        return $this->hasMany(SaleDetails::class, 'sale_id', 'id');
    }

    public static function boot() {
        parent::boot();

        static::creating(function ($model) {
            $number = Sale::max('id') + 1;
            $model->reference = make_reference_id('SL', $number);
        });
    }

    public function getUserNameAttribute() {
        return $this->user->name;
    }
    public function getSaleDetailsAttribute() {
        $user = User::where('id', auth()->user()->id)->first();
        if ($user->hasRole('Super Admin')){
            return $this->saleDetails()->get();
        } else {
            return $this->saleDetails()->where('user_id', auth()->user()->id)->get();
        }
    }

    public function getSumOfSubTotalAttribute() {
        return User::where('id', auth()->user()->id)->first()->hasRole('Super Admin') ? $this->sale_details->sum('sub_total') + $this->tax_amount :  $this->sale_details->sum('sub_total');
    }

    public function scopeCompleted($query) {
        return $query->where('status', 'Completed');
    }
}

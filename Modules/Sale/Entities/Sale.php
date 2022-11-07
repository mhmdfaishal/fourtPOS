<?php

namespace Modules\Sale\Entities;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Sale extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $appends = ['user_name','sale_details'];

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
        return $this->saleDetails()->get();
    }

    public function scopeCompleted($query) {
        return $query->where('status', 'Completed');
    }
}

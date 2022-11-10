<?php

namespace Modules\Purchase\Entities;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Purchase extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $fillable = [
        'date',
        'reference',
        'discount_percentage',
        'discount_amount',
        'total_amount',
        'paid_amount',
        'payment_method',
        'payment_status',
        'note',
        'status',
        'user_id'
    ];
    protected $appends = ['user_name','purchase_details'];
    protected $with = ['purchaseDetails'];

    public static function boot () {
        parent::boot();
        
        static::creating(function($model) {
            $number = Purchase::max('id') + 1;
            $model->reference = make_reference_id('PU', $number);
        });
    }

    public function purchaseDetails() {
        return $this->hasMany(PurchaseDetail::class, 'purchase_id', 'id');
    }

    public function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function getUserNameAttribute() {
        return $this->user->name;
    }
    public function getPurchaseDetailsAttribute() {
        return $this->purchaseDetails()->get();
    }

}

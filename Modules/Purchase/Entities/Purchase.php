<?php

namespace Modules\Purchase\Entities;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Purchase extends Model
{
    use HasFactory;

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

    protected $with = ['purchaseDetails'];

    public function purchaseDetails() {
        return $this->hasMany(PurchaseDetail::class, 'purchase_id', 'id');
    }

    public function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

}

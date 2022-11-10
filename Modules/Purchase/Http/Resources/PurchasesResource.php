<?php

namespace Modules\Purchase\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PurchasesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'date' => $this->date,
            'notes' => $this->note,
            'user_id' => $this->user_id,
            'reference' => $this->reference,
            'total_amount' => $this->total_amount,
            'paid_amount' => $this->paid_amount,
            'payment_method' => $this->payment_method,
            'payment_status' => $this->payment_status,
            // 'user_name' => $this->user_name,
            'sum_of_sub_total' => $this->sum_of_sub_total,
        ];
    }
}

<?php

namespace Modules\Sale\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SalesResource extends JsonResource
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
            'notes' => $this->notes,
            'user_id' => $this->user_id,
            'reference' => $this->reference,
            'tax_percentage' => $this->tax_percentage,
            'tax_amount' => $this->tax_amount,
            'total_amount' => $this->total_amount,
            'paid_amount' => $this->paid_amount,
            'payment_method' => $this->payment_method,
            'payment_status' => $this->payment_status,
            'user_name' => $this->user_name,
            'sale_details' => $this->sale_details,
            'sum_of_sub_total' => $this->sum_of_sub_total,
        ];
    }
}

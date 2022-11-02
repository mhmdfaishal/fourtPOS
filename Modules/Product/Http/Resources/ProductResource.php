<?php

namespace Modules\Product\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'product_name' => $this->product_name,
            'product_code' => $this->product_code,
            'product_price' => $this->product_price,
            'product_quantity' => $this->product_quantity,
            'product_cost' => $this->product_cost,
            'product_note' => $this->product_note,
            'product_stock_alert' => $this->product_stock_alert,
            'category' => $this->category,
        ];
    }
}

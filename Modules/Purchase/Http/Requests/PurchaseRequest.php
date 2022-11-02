<?php

namespace Modules\Purchase\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PurchaseRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "date" => "required|date",
            "discount_percentage" => "required|numeric",
            "discount_amount" => "required|numeric",
            "total_amount" =>  "required|numeric",
            "paid_amount" => "required|numeric",
            "payment_method" => "required|string",
            "payment_status" => "required|string",
            "note" => "nullable|string",
            "status" => "required|string",
            "products" => "required|array"
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }
}

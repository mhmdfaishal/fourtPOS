<?php

namespace Modules\Product\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'product_name' => 'required|string|min:3|max:255',
            'product_code' => 'required|string|min:3|max:255|unique:products,product_code',
            'product_quantity' => 'required|numeric',
            'product_price' => 'required|numeric',
            'product_cost' => 'required|numeric',
            'product_note' => 'required|string|min:3|max:255',
            'category_id' => 'required|numeric|exists:categories,id',
            
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class ProfileUpdateRequest extends FormRequest
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
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => ['required', 'unique:users,email,' . optional($this->user)->id,],
            'merchant_name' => 'nullable|string|max:255',
            'password' => ['nullable', Password::min(8)->letters()->mixedCase()->numbers()->symbols(),],
        ];
    }
}

<?php

namespace Modules\Product\Http\Controllers;

use Modules\Product\Http\Requests\ProductRequest;
use Modules\Product\Entities\Product;
use Modules\Product\Entities\Category;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Routing\Controller;
use Modules\Product\Http\Resources\ProductResource;
use Modules\Product\Http\Resources\CategoryResource;
use Modules\Upload\Entities\Upload;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // abort_if(Gate::denies('access_products'), 403);
        $products = ProductResource::collection(Product::with('category')->where('user_id', auth()->user()->id)->paginate(10));
        $categories = CategoryResource::collection(Category::where('user_id', auth()->user()->id)->get());
        return Inertia::render('Products/Index', ['products' => $products,'categories' => $categories]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // abort_if(Gate::denies('create_products'), 403);
        
        return Inertia::render('Product/AddForm', [
            'urlPost' => route('product.create.store'),
            'categories' => Category::where('user_id', auth()->user()->id)->get()
            ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductRequest $request, Product $product)
    {
        // abort_if(Gate::denies('show_products'), 403);
        // dd($request->all());
        $product->fill($request->only($product->getFillable()));
        $product->user_id = auth()->user()->id;
        $product->save();

        if ($request->hasFile('image')) {
            $product->addMedia($request->file('image'))->toMediaCollection(Product::IMAGE_COLLECTION);
        }
        return redirect()->route('product.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        // abort_if(Gate::denies('edit_products'), 403);

        return Inertia::render('Product/EditForm', [
            'urlPost' => route('product.edit.post', $product->id),
            'data' => $product,
            'categories' => Category::where('user_id', auth()->user()->id)->get()
            ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ProductRequest $request, Product $product)
    {
        dd($request->all());
        $product->fill($request->only($product->getFillable()));
        if($product->isDirty()) $product->save();

        if ($request->hasFile('image')) {
            $product->addMedia($request->file('image'))->toMediaCollection(Product::IMAGE_COLLECTION);
        }

        return redirect()->route('product.index');
    }   

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        // abort_if(Gate::denies('delete_products'), 403);
        
        $product->delete();
        return redirect()->route('product.index');
    }
}

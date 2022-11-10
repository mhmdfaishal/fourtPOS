<?php

namespace Modules\Product\Http\Controllers;

use Modules\Product\Http\Requests\CategoryRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Routing\Controller;
use Modules\Product\Entities\Category;
use Modules\Product\Http\Resources\CategoryResource;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        abort_if(Gate::denies('show_product_categories'), 403);
        $categories = CategoryResource::collection(Category::where('user_id', auth()->user()->id)->get());
        return Inertia::render('Category/Index', ['categories' => $categories]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        abort_if(Gate::denies('create_product_categories'), 403);

        return Inertia::render('Category/AddForm', ['urlPost' => route('category.create.store')]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CategoryRequest $request, Category $category)
    {
        abort_if(Gate::denies('create_product_categories'), 403);

        $category->fill($request->only($category->getFillable()));
        $category->user_id = auth()->user()->id;
        $category->save();

        return redirect()->route('category.index')->with([
            'type' => 'success',
            'message' => 'Category has been created',
        ]);
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
    public function edit(Category $category)
    {
        abort_if(Gate::denies('edit_product_categories'), 403);

        return Inertia::render('Category/EditForm', ['data' => $category, 'urlPost' => route('category.edit.post', $category)]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Category $category, CategoryRequest $request)
    {
        abort_if(Gate::denies('edit_product_categories'), 403);
        
        $category->fill($request->only($category->getFillable()));
        if($category->isDirty()) $category->save();
        return redirect()->route('category.index');
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        abort_if(Gate::denies('delete_product_categories'), 403);

        $category->delete();
        return redirect()->route('category.index');
    }
}

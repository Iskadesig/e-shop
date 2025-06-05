<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SubcategoryRequest;
use App\Models\Subcategory;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubcategoryController extends Controller
{
    public function index()
    {
        $subcategories = Subcategory::with('category')->orderBy('name')->get();
        return Inertia::render('admin/subcategories/index', [
            'subcategories' => $subcategories,
        ]);
    }

    public function create()
    {
        $categories = Category::orderBy('name')->get();
        return Inertia::render('admin/subcategories/create', [
            'categories' => $categories,
        ]);
    }

    public function store(SubcategoryRequest $request)
    {
        Subcategory::create($request->validated());
        return redirect()->route('admin.subcategories.index');
    }

    public function edit(Subcategory $subcategory)
    {
        $categories = Category::orderBy('name')->get();
        return Inertia::render('admin/subcategories/edit', [
            'subcategory' => $subcategory,
            'categories' => $categories,
        ]);
    }

    public function update(SubcategoryRequest $request, Subcategory $subcategory)
    {
        $subcategory->update($request->validated());
        return redirect()->route('admin.subcategories.index');
    }

    public function destroy(Subcategory $subcategory)
    {
        $subcategory->delete();
        return redirect()->route('admin.subcategories.index');
    }
} 
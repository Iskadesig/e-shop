<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::with('subcategories')->orderBy('name')->get();
        return Inertia::render('admin/categories/index', [
            'categories' => $categories,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/categories/create');
    }

    public function store(CategoryRequest $request)
    {
        Category::create($request->validated());
        return redirect()->route('admin.categories.index');
    }

    public function edit(Category $category)
    {
        return Inertia::render('admin/categories/edit', [
            'category' => $category,
        ]);
    }

    public function update(CategoryRequest $request, Category $category)
    {
        $category->update($request->validated());
        return redirect()->route('admin.categories.index');
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return redirect()->route('admin.categories.index');
    }
} 
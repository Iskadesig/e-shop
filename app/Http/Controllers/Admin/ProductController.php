<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProductRequest;
use App\Models\Product;
use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with(['category', 'subcategory'])->orderBy('name')->get();
        return Inertia::render('admin/products/index', [
            'products' => $products,
        ]);
    }

    public function create()
    {
        $categories = Category::with('subcategories')->get();
        return Inertia::render('admin/products/create', [
            'categories' => $categories,
        ]);
    }

    public function store(ProductRequest $request)
    {
        Product::create($request->validated());
        return redirect()->route('admin.products.index');
    }

    public function edit(Product $product)
    {
        $categories = Category::with('subcategories')->get();
        return Inertia::render('admin/products/edit', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }

    public function update(ProductRequest $request, Product $product)
    {
        $product->update($request->validated());
        return redirect()->route('admin.products.index');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('admin.products.index');
    }
} 
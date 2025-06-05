<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $categoryId = $request->query('category');
        $subcategoryId = $request->query('subcategory');
        $search = $request->query('search');

        $query = Product::with(['category', 'subcategory']);
        if ($categoryId) {
            $query->where('category_id', $categoryId);
        }
        if ($subcategoryId) {
            $query->where('subcategory_id', $subcategoryId);
        }
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                  ->orWhere('description', 'like', "%$search%") ;
            });
        }
        $products = $query->paginate(12)->withQueryString();

        $categories = Category::with('subcategories')->get();

        return Inertia::render('catalog/index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => [
                'category' => $categoryId,
                'subcategory' => $subcategoryId,
                'search' => $search,
            ],
        ]);
    }

    public function show(Product $product)
    {
        $product->load(['category', 'subcategory']);
        return Inertia::render('catalog/show', [
            'product' => $product,
        ]);
    }
} 
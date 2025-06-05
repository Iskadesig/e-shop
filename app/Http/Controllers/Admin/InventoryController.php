<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends Controller
{
    public function index()
    {
        $products = Product::with(['category', 'subcategory'])->orderBy('name')->get();
        return Inertia::render('admin/inventory', [
            'products' => $products,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'stock' => 'required|integer|min:0',
        ]);
        $product->update(['stock' => $data['stock']]);
        return redirect()->route('admin.inventory.index');
    }
} 
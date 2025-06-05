<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $cart = session('cart', []);
        $products = Product::whereIn('id', array_keys($cart))->get();
        $cartItems = $products->map(function ($product) use ($cart) {
            return [
                'product' => $product,
                'quantity' => $cart[$product->id],
            ];
        });
        $total = $cartItems->sum(fn($item) => $item['product']->price * $item['quantity']);
        return Inertia::render('cart/index', [
            'items' => $cartItems,
            'total' => $total,
        ]);
    }

    public function add(Request $request, Product $product)
    {
        $cart = session('cart', []);
        $qty = (int) $request->input('quantity', 1);
        $cart[$product->id] = ($cart[$product->id] ?? 0) + $qty;
        session(['cart' => $cart]);
        return redirect()->route('cart.index');
    }

    public function update(Request $request, Product $product)
    {
        $cart = session('cart', []);
        $qty = max(1, (int) $request->input('quantity', 1));
        if (isset($cart[$product->id])) {
            $cart[$product->id] = $qty;
            session(['cart' => $cart]);
        }
        return redirect()->route('cart.index');
    }

    public function remove(Request $request, Product $product)
    {
        $cart = session('cart', []);
        unset($cart[$product->id]);
        session(['cart' => $cart]);
        return redirect()->route('cart.index');
    }
} 
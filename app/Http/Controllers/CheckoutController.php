<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CheckoutController extends Controller
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
        return Inertia::render('checkout/index', [
            'items' => $cartItems,
            'total' => $total,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:32',
        ]);
        $cart = session('cart', []);
        $products = Product::whereIn('id', array_keys($cart))->lockForUpdate()->get();
        $cartItems = $products->map(function ($product) use ($cart) {
            return [
                'product' => $product,
                'quantity' => $cart[$product->id],
            ];
        });
        $total = $cartItems->sum(fn($item) => $item['product']->price * $item['quantity']);
        DB::transaction(function () use ($data, $cartItems, $total, $request) {
            // Decrement stock
            foreach ($cartItems as $item) {
                $product = $item['product'];
                $qty = $item['quantity'];
                if ($product->stock < $qty) {
                    abort(400, 'Not enough stock for ' . $product->name);
                }
                $product->decrement('stock', $qty);
            }
            // Save order
            Order::create([
                'user_id' => $request->user()?->id,
                'name' => $data['name'],
                'address' => $data['address'],
                'phone' => $data['phone'],
                'total' => $total,
                'items' => $cartItems->toArray(),
            ]);
        });
        session()->forget('cart');
        return Inertia::render('checkout/success');
    }
} 
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';

type Product = {
    id: number;
    name: string;
    price: string;
    image: string;
};

type CartItem = {
    product: Product;
    quantity: number;
};

type Props = {
    items: CartItem[];
    total: number;
};

export default function CartIndex({ items, total }: Props) {
    const handleUpdate = (productId: number, quantity: number) => {
        router.post(`/cart/update/${productId}`, { quantity });
    };
    const handleRemove = (productId: number) => {
        router.post(`/cart/remove/${productId}`);
    };

    return (
        <AppLayout>
            <Head title="Shopping Cart" />
            <div className="mx-auto max-w-3xl px-4 py-8">
                <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
                {items.length === 0 ? (
                    <div className="text-gray-500">Your cart is empty.</div>
                ) : (
                    <>
                        <div className="mb-6 divide-y rounded border">
                            {items.map(({ product, quantity }) => (
                                <div key={product.id} className="flex items-center gap-4 px-2 py-4">
                                    <img src={product.image} alt={product.name} className="h-20 w-20 rounded border object-cover" />
                                    <div className="flex-1">
                                        <Link href={`/catalog/${product.id}`} className="text-lg font-semibold hover:underline">
                                            {product.name}
                                        </Link>
                                        <div className="font-bold text-blue-600">${product.price}</div>
                                    </div>
                                    <input
                                        type="number"
                                        min={1}
                                        value={quantity}
                                        onChange={(e) => handleUpdate(product.id, Number(e.target.value))}
                                        className="mr-2 w-16 rounded border px-2 py-1"
                                    />
                                    <div className="w-24 text-right font-semibold">${(Number(product.price) * quantity).toFixed(2)}</div>
                                    <button onClick={() => handleRemove(product.id)} className="ml-2 text-red-600 hover:underline">
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="mb-6 flex items-center justify-between">
                            <div className="text-xl font-bold">Total:</div>
                            <div className="text-2xl font-bold text-blue-700">${total.toFixed(2)}</div>
                        </div>
                        <Link href="/checkout" className="rounded bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700">
                            Proceed to Checkout
                        </Link>
                    </>
                )}
            </div>
        </AppLayout>
    );
}

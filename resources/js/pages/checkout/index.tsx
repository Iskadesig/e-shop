import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

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
    errors?: Record<string, string>;
};

export default function CheckoutIndex({ items, total, errors = {} }: Props) {
    const { data, setData, post, processing } = useForm({
        name: '',
        address: '',
        phone: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/checkout');
    };

    return (
        <AppLayout>
            <Head title="Checkout" />
            <div className="mx-auto max-w-2xl px-4 py-8">
                <h1 className="mb-6 text-3xl font-bold">Checkout</h1>
                <div className="mb-6 divide-y rounded border">
                    {items.map(({ product, quantity }) => (
                        <div key={product.id} className="flex items-center gap-4 px-2 py-3">
                            <img src={product.image} alt={product.name} className="h-16 w-16 rounded border object-cover" />
                            <div className="flex-1">
                                <span className="font-semibold">{product.name}</span>
                                <span className="ml-2 text-gray-500">x{quantity}</span>
                            </div>
                            <div className="w-20 text-right">${(Number(product.price) * quantity).toFixed(2)}</div>
                        </div>
                    ))}
                </div>
                <div className="mb-6 flex items-center justify-between">
                    <div className="text-xl font-bold">Total:</div>
                    <div className="text-2xl font-bold text-blue-700">${total.toFixed(2)}</div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1 block font-semibold">Name</label>
                        <input
                            type="text"
                            className="w-full rounded border px-3 py-2"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        {errors.name && <div className="mt-1 text-sm text-red-600">{errors.name}</div>}
                    </div>
                    <div>
                        <label className="mb-1 block font-semibold">Address</label>
                        <input
                            type="text"
                            className="w-full rounded border px-3 py-2"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            required
                        />
                        {errors.address && <div className="mt-1 text-sm text-red-600">{errors.address}</div>}
                    </div>
                    <div>
                        <label className="mb-1 block font-semibold">Phone</label>
                        <input
                            type="text"
                            className="w-full rounded border px-3 py-2"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            required
                        />
                        {errors.phone && <div className="mt-1 text-sm text-red-600">{errors.phone}</div>}
                    </div>
                    <button type="submit" className="rounded bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700" disabled={processing}>
                        Place Order
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}

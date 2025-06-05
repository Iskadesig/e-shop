import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';

type Category = {
    id: number;
    name: string;
};

type Subcategory = {
    id: number;
    name: string;
};

type Product = {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    stock: number;
    category: Category;
    subcategory: Subcategory;
};

type Props = {
    product: Product;
};

export default function ProductShow({ product }: Props) {
    return (
        <AppLayout>
            <Head title={product.name} />
            <div className="mx-auto max-w-3xl px-4 py-8">
                <Link href="/catalog" className="mb-4 inline-block text-blue-600 hover:underline">
                    &larr; Back to Catalog
                </Link>
                <div className="flex flex-col gap-8 md:flex-row">
                    <img src={product.image} alt={product.name} className="h-80 w-full rounded border object-cover md:w-80" />
                    <div className="flex-1">
                        <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
                        <div className="mb-2 text-xl font-bold text-blue-600">${product.price}</div>
                        <div className="mb-2 text-gray-500">
                            Category: {product.category?.name} / {product.subcategory?.name}
                        </div>
                        <div className="mb-4 text-sm text-gray-400">Stock: {product.stock}</div>
                        <p className="mb-6 text-lg">{product.description}</p>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                router.post(`/cart/add/${product.id}`, { quantity: 1 });
                            }}
                            className="mt-6"
                        >
                            <button type="submit" className="w-full rounded bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700">
                                Add to Cart
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

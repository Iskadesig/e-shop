import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';

type Category = { id: number; name: string };
type Subcategory = { id: number; name: string };
type Product = {
    id: number;
    name: string;
    price: string;
    stock: number;
    category: Category;
    subcategory: Subcategory;
};

type Props = {
    products: Product[];
};

export default function AdminProductsIndex({ products }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Delete this product?')) {
            router.delete(`/dashboard/products/${id}`);
        }
    };
    return (
        <AppLayout>
            <Head title="Products" />
            <div className="mx-auto max-w-4xl px-4 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Products</h1>
                    <Link href="/dashboard/products/create" className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
                        Add Product
                    </Link>
                </div>
                <table className="w-full rounded border">
                    <thead>
                        <tr className="bg-gray-900">
                            <th className="p-2 text-left font-bold text-white">Name</th>
                            <th className="p-2 text-left font-bold text-white">Price</th>
                            <th className="p-2 text-left font-bold text-white">Stock</th>
                            <th className="p-2 text-left font-bold text-white">Category</th>
                            <th className="p-2 text-left font-bold text-white">Subcategory</th>
                            <th className="p-2 font-bold text-white"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className="p-2 font-semibold">{product.name}</td>
                                <td className="p-2">${product.price}</td>
                                <td className="p-2">{product.stock}</td>
                                <td className="p-2">{product.category?.name}</td>
                                <td className="p-2">{product.subcategory?.name}</td>
                                <td className="flex gap-2 p-2">
                                    <Link
                                        href={`/dashboard/products/${product.id}/edit`}
                                        className="rounded bg-yellow-500 px-3 py-1 font-semibold text-white hover:bg-yellow-600"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="rounded bg-red-600 px-3 py-1 font-semibold text-white hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}

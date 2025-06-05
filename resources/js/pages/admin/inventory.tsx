import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

type Category = { id: number; name: string };
type Subcategory = { id: number; name: string };
type Product = {
    id: number;
    name: string;
    stock: number;
    category: Category;
    subcategory: Subcategory;
};

type Props = {
    products: Product[];
};

export default function AdminInventory({ products }: Props) {
    return (
        <AppLayout>
            <Head title="Inventory Management" />
            <div className="mx-auto max-w-4xl px-4 py-8">
                <h1 className="mb-6 text-3xl font-bold">Inventory Management</h1>
                <table className="w-full rounded border">
                    <thead>
                        <tr className="bg-gray-900">
                            <th className="p-2 text-left font-bold text-white">Product</th>
                            <th className="p-2 text-left font-bold text-white">Category</th>
                            <th className="p-2 text-left font-bold text-white">Subcategory</th>
                            <th className="p-2 text-left font-bold text-white">Stock</th>
                            <th className="p-2 font-bold text-white"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <InventoryRow key={product.id} product={product} />
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}

function InventoryRow({ product }: { product: Product }) {
    const { data, setData, post, processing } = useForm({ stock: product.stock });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/dashboard/inventory/${product.id}`);
    };
    return (
        <tr>
            <td className="p-2 font-semibold">{product.name}</td>
            <td className="p-2">{product.category?.name}</td>
            <td className="p-2">{product.subcategory?.name}</td>
            <td className="p-2">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <input
                        type="number"
                        min={0}
                        value={data.stock}
                        onChange={(e) => setData('stock', Number(e.target.value))}
                        className="w-20 rounded border px-2 py-1"
                    />
                    <button type="submit" className="rounded bg-blue-600 px-3 py-1 font-semibold text-white hover:bg-blue-700" disabled={processing}>
                        Save
                    </button>
                </form>
            </td>
            <td className="p-2"></td>
        </tr>
    );
}

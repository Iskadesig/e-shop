import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';

type Subcategory = { id: number; name: string };
type Category = { id: number; name: string; subcategories: Subcategory[] };
type Product = {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    stock: number;
    category_id: number;
    subcategory_id: number;
};

type Props = {
    product: Product;
    categories: Category[];
    errors?: Record<string, string>;
};

export default function AdminProductsEdit({ product, categories, errors = {} }: Props) {
    const { data, setData, put, processing } = useForm({
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        stock: product.stock,
        category_id: product.category_id,
        subcategory_id: product.subcategory_id,
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/dashboard/products/${product.id}`);
    };
    const selectedCategory = categories.find((c) => c.id === Number(data.category_id));
    return (
        <AppLayout>
            <Head title="Edit Product" />
            <div className="mx-auto max-w-xl px-4 py-8">
                <h1 className="mb-6 text-3xl font-bold">Edit Product</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-semibold">Name</label>
                        <input
                            type="text"
                            className="w-full rounded border px-2 py-1"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && <div className="text-sm text-red-600">{errors.name}</div>}
                    </div>
                    <div>
                        <label className="block font-semibold">Description</label>
                        <textarea
                            className="w-full rounded border px-2 py-1"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        {errors.description && <div className="text-sm text-red-600">{errors.description}</div>}
                    </div>
                    <div>
                        <label className="block font-semibold">Price</label>
                        <input
                            type="number"
                            min={0}
                            step="0.01"
                            className="w-full rounded border px-2 py-1"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                        />
                        {errors.price && <div className="text-sm text-red-600">{errors.price}</div>}
                    </div>
                    <div>
                        <label className="block font-semibold">Image URL</label>
                        <input
                            type="url"
                            className="w-full rounded border px-2 py-1"
                            value={data.image}
                            onChange={(e) => setData('image', e.target.value)}
                        />
                        {errors.image && <div className="text-sm text-red-600">{errors.image}</div>}
                    </div>
                    <div>
                        <label className="block font-semibold">Stock</label>
                        <input
                            type="number"
                            min={0}
                            className="w-full rounded border px-2 py-1"
                            value={data.stock}
                            onChange={(e) => setData('stock', Number(e.target.value))}
                        />
                        {errors.stock && <div className="text-sm text-red-600">{errors.stock}</div>}
                    </div>
                    <div>
                        <label className="block font-semibold">Category</label>
                        <select
                            className="w-full rounded border px-2 py-1"
                            value={data.category_id}
                            onChange={(e) => setData('category_id', Number(e.target.value))}
                        >
                            <option value="">Select category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && <div className="text-sm text-red-600">{errors.category_id}</div>}
                    </div>
                    <div>
                        <label className="block font-semibold">Subcategory</label>
                        <select
                            className="w-full rounded border px-2 py-1"
                            value={data.subcategory_id}
                            onChange={(e) => setData('subcategory_id', Number(e.target.value))}
                        >
                            <option value="">Select subcategory</option>
                            {selectedCategory?.subcategories.map((sub) => (
                                <option key={sub.id} value={sub.id}>
                                    {sub.name}
                                </option>
                            ))}
                        </select>
                        {errors.subcategory_id && <div className="text-sm text-red-600">{errors.subcategory_id}</div>}
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                            disabled={processing}
                        >
                            Save
                        </button>
                        <Link href="/dashboard/products" className="rounded bg-gray-300 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-400">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

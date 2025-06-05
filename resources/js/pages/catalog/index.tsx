import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

type Category = {
    id: number;
    name: string;
    description: string;
    subcategories: Subcategory[];
};

type Subcategory = {
    id: number;
    name: string;
    description: string;
};

type Product = {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    stock: number;
    category_id: number;
    subcategory_id: number;
    category: Category;
    subcategory: Subcategory;
};

type Props = {
    products: {
        data: Product[];
        current_page: number;
        last_page: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    categories: Category[];
    filters: { category?: string; subcategory?: string; search?: string };
};

export default function CatalogIndex({ products, categories, filters }: Props) {
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
    const [selectedSubcategory, setSelectedSubcategory] = useState(filters.subcategory || '');
    const [search, setSearch] = useState(filters.search || '');

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
        setSelectedSubcategory('');
        window.location.href = `/catalog?category=${e.target.value}&search=${encodeURIComponent(search)}`;
    };
    const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSubcategory(e.target.value);
        window.location.href = `/catalog?category=${selectedCategory}&subcategory=${e.target.value}&search=${encodeURIComponent(search)}`;
    };
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let url = '/catalog?';
        if (selectedCategory) url += `category=${selectedCategory}&`;
        if (selectedSubcategory) url += `subcategory=${selectedSubcategory}&`;
        if (search) url += `search=${encodeURIComponent(search)}`;
        window.location.href = url;
    };

    return (
        <AppLayout>
            <Head title="Product Catalog" />
            <div className="mx-auto max-w-6xl px-4 py-8">
                <h1 className="mb-6 text-3xl font-bold">Product Catalog</h1>
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                    <form onSubmit={handleSearchSubmit} className="flex w-full max-w-md gap-2">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full rounded border px-2 py-1"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button type="submit" className="rounded bg-blue-600 px-4 py-1 font-semibold text-white hover:bg-blue-700">
                            Search
                        </button>
                    </form>
                    <div className="flex gap-4">
                        <select className="rounded border px-2 py-1" value={selectedCategory} onChange={handleCategoryChange}>
                            <option value="">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        <select
                            className="rounded border px-2 py-1"
                            value={selectedSubcategory}
                            onChange={handleSubcategoryChange}
                            disabled={!selectedCategory}
                        >
                            <option value="">All Subcategories</option>
                            {selectedCategory &&
                                categories
                                    .find((c) => c.id === Number(selectedCategory))
                                    ?.subcategories.map((sub) => (
                                        <option key={sub.id} value={sub.id}>
                                            {sub.name}
                                        </option>
                                    ))}
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {products.data.map((product) => (
                        <div key={product.id} className="rounded border p-4 shadow transition hover:shadow-lg">
                            <Link href={`/catalog/${product.id}`}>
                                <img
                                    src={product.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                                    alt={product.name}
                                    className="mb-2 h-40 w-full rounded object-cover"
                                />
                                <h2 className="text-lg font-semibold">{product.name}</h2>
                                <div className="mb-1 font-bold text-blue-600">${product.price}</div>
                                <div className="text-sm text-gray-600">
                                    {product.category?.name}
                                    {product.subcategory ? ` / ${product.subcategory.name}` : ''}
                                </div>
                            </Link>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    router.post(`/cart/add/${product.id}`, { quantity: 1 });
                                }}
                                className="mt-2"
                            >
                                <button
                                    type="submit"
                                    className="mt-2 w-full rounded bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
                                >
                                    Add to Cart
                                </button>
                            </form>
                        </div>
                    ))}
                </div>
                {/* Pagination */}
                <div className="mt-8 flex justify-center gap-2">
                    {products.links.map((link, i) => (
                        <span key={i}>
                            {link.url ? (
                                <Link
                                    href={link.url}
                                    className={`rounded px-3 py-1 ${link.active ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                                >
                                    {link.label.replace(/&laquo;|&raquo;/g, '')}
                                </Link>
                            ) : (
                                <span className="px-3 py-1 text-gray-400">{link.label.replace(/&laquo;|&raquo;/g, '')}</span>
                            )}
                        </span>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}

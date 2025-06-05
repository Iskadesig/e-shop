import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';

type Category = { id: number; name: string };

type Props = {
    categories: Category[];
    errors?: Record<string, string>;
};

export default function AdminSubcategoriesCreate({ categories, errors = {} }: Props) {
    const { data, setData, post, processing } = useForm({
        name: '',
        description: '',
        category_id: '',
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/dashboard/subcategories');
    };
    return (
        <AppLayout>
            <Head title="Add Subcategory" />
            <div className="mx-auto max-w-xl px-4 py-8">
                <h1 className="mb-6 text-3xl font-bold">Add Subcategory</h1>
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
                        <label className="block font-semibold">Category</label>
                        <select
                            className="w-full rounded border px-2 py-1"
                            value={data.category_id}
                            onChange={(e) => setData('category_id', e.target.value)}
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
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                            disabled={processing}
                        >
                            Save
                        </button>
                        <Link href="/dashboard/subcategories" className="rounded bg-gray-300 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-400">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

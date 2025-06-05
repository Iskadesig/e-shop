import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';

type Category = { id: number; name: string; description: string };

type Props = {
    categories: Category[];
};

export default function AdminCategoriesIndex({ categories }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Delete this category?')) {
            router.delete(`/dashboard/categories/${id}`);
        }
    };
    return (
        <AppLayout>
            <Head title="Categories" />
            <div className="mx-auto max-w-2xl px-4 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Categories</h1>
                    <Link href="/dashboard/categories/create" className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
                        Add Category
                    </Link>
                </div>
                <table className="w-full rounded border">
                    <thead>
                        <tr className="bg-gray-900">
                            <th className="p-2 text-left font-bold text-white">Name</th>
                            <th className="p-2 text-left font-bold text-white">Description</th>
                            <th className="p-2 font-bold text-white"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((cat) => (
                            <tr key={cat.id}>
                                <td className="p-2 font-semibold">{cat.name}</td>
                                <td className="p-2">{cat.description}</td>
                                <td className="flex gap-2 p-2">
                                    <Link
                                        href={`/dashboard/categories/${cat.id}/edit`}
                                        className="rounded bg-yellow-500 px-3 py-1 font-semibold text-white hover:bg-yellow-600"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(cat.id)}
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

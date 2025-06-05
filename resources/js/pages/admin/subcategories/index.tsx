import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';

type Category = { id: number; name: string };
type Subcategory = { id: number; name: string; description: string; category: Category };

type Props = {
    subcategories: Subcategory[];
};

export default function AdminSubcategoriesIndex({ subcategories }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Delete this subcategory?')) {
            router.delete(`/dashboard/subcategories/${id}`);
        }
    };
    return (
        <AppLayout>
            <Head title="Subcategories" />
            <div className="mx-auto max-w-3xl px-4 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Subcategories</h1>
                    <Link href="/dashboard/subcategories/create" className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
                        Add Subcategory
                    </Link>
                </div>
                <table className="w-full rounded border">
                    <thead>
                        <tr className="bg-gray-900">
                            <th className="p-2 text-left font-bold text-white">Name</th>
                            <th className="p-2 text-left font-bold text-white">Description</th>
                            <th className="p-2 text-left font-bold text-white">Category</th>
                            <th className="p-2 font-bold text-white"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {subcategories.map((sub) => (
                            <tr key={sub.id}>
                                <td className="p-2 font-semibold">{sub.name}</td>
                                <td className="p-2">{sub.description}</td>
                                <td className="p-2">{sub.category?.name}</td>
                                <td className="flex gap-2 p-2">
                                    <Link
                                        href={`/dashboard/subcategories/${sub.id}/edit`}
                                        className="rounded bg-yellow-500 px-3 py-1 font-semibold text-white hover:bg-yellow-600"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(sub.id)}
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

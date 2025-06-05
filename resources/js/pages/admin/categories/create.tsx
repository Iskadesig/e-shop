import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';

type Props = {
    errors?: Record<string, string>;
};

export default function AdminCategoriesCreate({ errors = {} }: Props) {
    const { data, setData, post, processing } = useForm({
        name: '',
        description: '',
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/dashboard/categories');
    };
    return (
        <AppLayout>
            <Head title="Add Category" />
            <div className="mx-auto max-w-xl px-4 py-8">
                <h1 className="mb-6 text-3xl font-bold">Add Category</h1>
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
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                            disabled={processing}
                        >
                            Save
                        </button>
                        <Link href="/dashboard/categories" className="rounded bg-gray-300 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-400">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

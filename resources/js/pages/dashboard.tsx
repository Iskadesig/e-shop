import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props as any;
    const user = auth?.user;
    if (!user || !user.is_admin) {
        return (
            <AppLayout>
                <Head title="Admin Panel" />
                <div className="mx-auto max-w-2xl px-4 py-8">
                    <h1 className="mb-6 text-3xl font-bold">Admin Panel</h1>
                    <p className="text-red-600">You do not have permission to access this page.</p>
                </div>
            </AppLayout>
        );
    }
    return (
        <AppLayout>
            <Head title="Admin Panel" />
            <div className="mx-auto max-w-2xl px-4 py-8">
                <h1 className="mb-6 text-3xl font-bold">Admin Panel</h1>
                <div className="grid gap-4">
                    <Link href="/dashboard/products" className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
                        Manage Products
                    </Link>
                    <Link href="/dashboard/categories" className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
                        Manage Categories
                    </Link>
                    <Link href="/dashboard/subcategories" className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
                        Manage Subcategories
                    </Link>
                    <Link href="/dashboard/inventory" className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
                        Inventory Management
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}

import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

export default function Home() {
    return (
        <AppLayout>
            <Head title="Welcome to E-Shop" />
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8">
                <h1 className="text-4xl font-bold">Welcome to E-Shop</h1>
                <p className="text-lg text-gray-700">Browse our product catalog and start shopping!</p>
                <Link href="/catalog" className="rounded bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow hover:bg-blue-700">
                    View Catalog
                </Link>
            </div>
        </AppLayout>
    );
}

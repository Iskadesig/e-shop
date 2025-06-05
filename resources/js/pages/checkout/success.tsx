import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

export default function CheckoutSuccess() {
    return (
        <AppLayout>
            <Head title="Order Successful" />
            <div className="mx-auto max-w-xl px-4 py-16 text-center">
                <h1 className="mb-4 text-3xl font-bold">Thank you!</h1>
                <p className="mb-8 text-lg">Your order has been placed successfully.</p>
                <Link href="/catalog" className="rounded bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700">
                    Back to Catalog
                </Link>
            </div>
        </AppLayout>
    );
}

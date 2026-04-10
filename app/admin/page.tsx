import type { Metadata } from 'next';
import { ProductEditor } from '@/components/admin/ProductEditor';
import { Footer, Header } from '@/components/layout';
import { getCatalogData } from '@/lib/catalog';
import { SITE_NAME } from '@/theme';

export const metadata: Metadata = {
    title: `Admin | ${SITE_NAME}`,
    description: 'Manage cakes and bakes for the public storefront.',
};

export default async function AdminPage() {
    const catalog = await getCatalogData();

    return (
        <div className="flex min-h-screen flex-col bg-surface">
            <Header />

            <main className="flex-1 px-4 py-8 sm:py-12">
                <div className="mx-auto max-w-7xl space-y-8">
                    <section className="rounded-[2.25rem] border border-brand-border bg-[linear-gradient(135deg,#fffaf6,#f7ede5)] p-6 shadow-[0_20px_48px_rgba(109,80,96,0.07)] sm:p-8">
                        <p className="text-xs uppercase tracking-[0.22em] text-primary">Admin Panel</p>
                        <h1 className="mt-3 text-4xl text-foreground sm:text-5xl">
                            Update cakes and bakes without editing the hardcoded source files
                        </h1>
                        <p className="mt-4 max-w-3xl text-sm leading-7 text-text-soft sm:text-base">
                            Add new products, edit prices and descriptions, and upload product images from here.
                            The cakes page, bakes page, and custom flow now all read from this shared catalog.
                        </p>
                        <p className="mt-4 text-xs uppercase tracking-[0.16em] text-text-soft">
                            Current setup note: this panel is not password-protected yet, so only expose it where you trust access.
                        </p>
                    </section>

                    <ProductEditor kind="cake" items={catalog.cakes} />
                    <ProductEditor kind="bake" items={catalog.bakes} />
                </div>
            </main>

            <Footer />
        </div>
    );
}

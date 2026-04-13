import type { Metadata } from 'next';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { ProductGrid } from '@/components/admin/ProductGrid';
import { getCatalogData } from '@/lib/catalog';
import { SITE_NAME } from '@/theme';

export const metadata: Metadata = {
    title: `Premium Dashboard | ${SITE_NAME}`,
    description: 'Manage your high-end artisan catalog and orders efficiently.',
};

export default async function AdminPage() {
    const catalog = await getCatalogData();

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 space-y-10">
            {/* Dashboard Hero Section */}
            <section className="relative overflow-hidden rounded-[2.5rem] border border-brand-border/60 bg-gradient-to-br from-[#EEDDCE]/60 via-white to-[#F2E5DC]/80 p-8 shadow-[0_20px_60px_rgba(109,80,96,0.04)] sm:p-12 mb-4 group hover:shadow-[0_20px_60px_rgba(109,80,96,0.08)] transition-all duration-500">
                <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/3 translate-x-1/4 rounded-full bg-gradient-to-tr from-brand-gold/10 to-primary/5 blur-[80px] transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute bottom-0 left-0 h-[300px] w-[300px] translate-y-1/2 -translate-x-1/2 rounded-full bg-primary/5 blur-[60px]" />
                
                <div className="relative z-10 flex flex-col justify-between sm:flex-row sm:items-end gap-6">
                    <div className="max-w-2xl">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary shadow-sm backdrop-blur-md border border-white/80">
                            <span className="hidden sm:inline">👋</span> Overview
                        </div>
                        <h1 className="font-serif text-3xl text-foreground sm:text-5xl leading-tight tracking-tight">
                            Welcome Back, Anna
                        </h1>
                        <p className="mt-4 text-base leading-relaxed text-text-soft">
                            Manage your artisan cakes, track daily operations, and fulfill custom requests efficiently. Everything looks great today!
                        </p>
                    </div>
                    
                    <div className="flex gap-3">
                       <button className="rounded-2xl border border-brand-border bg-white/80 px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-foreground shadow-sm transition-all hover:bg-white hover:text-primary backdrop-blur-md">
                           View Store
                       </button>
                    </div>
                </div>
            </section>

            {/* Dashboard Analytics & Stats */}
            <AdminDashboard cakes={catalog.cakes} bakes={catalog.bakes} />

            {/* Main Product Management */}
            <div className="grid gap-10">
                <ProductGrid kind="cake" items={catalog.cakes} />
                <ProductGrid kind="bake" items={catalog.bakes} />
            </div>

            {/* Simple Footer */}
            <footer className="border-t border-brand-border/40 py-8 text-center mt-12 opacity-80 hover:opacity-100 transition-opacity">
                <p className="font-serif text-sm text-foreground/60">
                    {SITE_NAME} Admin Control
                </p>
                <p className="text-[10px] uppercase tracking-[0.15em] text-text-soft mt-1">
                    All changes save securely to database
                </p>
            </footer>
        </div>
    );
}

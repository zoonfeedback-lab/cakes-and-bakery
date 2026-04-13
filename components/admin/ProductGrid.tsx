'use client';

import { useState } from 'react';
import type { BakeProduct, CakeProduct, ProductKind } from '@/types';
import { ProductCard } from './ProductCard';
import { ProductFormModal } from './ProductFormModal';

interface ProductGridProps {
    readonly kind: ProductKind;
    readonly items: CakeProduct[] | BakeProduct[];
}

export function ProductGrid({ kind, items }: ProductGridProps) {
    const [editingItem, setEditingItem] = useState<CakeProduct | BakeProduct | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const isCake = kind === 'cake';
    const title = isCake ? 'Cakes' : 'Bakes';
    const icon = isCake ? '🎂' : '🧁';

    // Get unique categories
    const categories = ['all', ...new Set(items.map((item) => item.category))];

    // Filtered items
    const filteredItems = items.filter((item) => {
        const matchesSearch =
            !searchQuery ||
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <section id={`${kind}s-section`} className="space-y-6">
            {/* Section Header */}
            <div className="group relative flex flex-col gap-4 overflow-hidden rounded-[2rem] border border-brand-border bg-white p-6 shadow-[0_8px_30px_rgba(109,80,96,0.03)] sm:flex-row sm:items-center sm:justify-between transition-all hover:shadow-[0_10px_40px_rgba(109,80,96,0.06)]">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative z-10 flex items-center gap-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#fdfaf7] to-[#f4e6de] text-3xl shadow-sm border border-brand-border/60">
                        {icon}
                    </div>
                    <div>
                        <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground">{title}</h2>
                        <p className="mt-1 text-sm font-medium tracking-wider uppercase text-text-soft/80">
                            {items.length} Product{items.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>
                <div className="relative z-10 flex gap-3">
                    <button className="hidden sm:flex items-center justify-center h-12 w-12 rounded-2xl border border-brand-border bg-[#fdfaf7] hover:bg-white hover:border-primary/50 transition-all shadow-sm">
                        <span className="text-lg">⚙️</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowAddModal(true)}
                        className="btn-primary flex items-center justify-center gap-2 h-12 px-6 rounded-2xl shadow-[0_4px_14px_rgba(109,80,96,0.2)] hover:shadow-[0_6px_20px_rgba(109,80,96,0.3)] transition-all hover:-translate-y-0.5"
                    >
                        <span className="text-lg">+</span>
                        Add {isCake ? 'Cake' : 'Bake'}
                    </button>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col gap-4 rounded-[1.5rem] border border-brand-border/60 bg-white/40 p-3 backdrop-blur-xl sm:flex-row sm:items-center shadow-sm">
                {/* Search */}
                <div className="relative flex-1 group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-soft/60 group-focus-within:text-primary transition-colors">
                        🔍
                    </span>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={`Search ${title.toLowerCase()}...`}
                        className="w-full rounded-2xl border border-brand-border/80 bg-white py-3 pl-11 pr-4 text-sm text-foreground shadow-sm outline-none transition-all duration-300 focus:border-primary/60 focus:ring-4 focus:ring-primary/10 placeholder:text-text-soft/50"
                    />
                </div>

                {/* Category pills & View Toggle */}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setActiveCategory(cat)}
                                className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] transition-all duration-300 ${
                                    activeCategory === cat
                                        ? 'bg-gradient-to-r from-primary to-[#8A677B] text-white shadow-md scale-105'
                                        : 'border border-brand-border/80 bg-white text-text-soft shadow-sm hover:border-primary/40 hover:text-primary hover:bg-[#fdfaf7]'
                                }`}
                            >
                                {cat === 'all' ? 'All' : cat}
                            </button>
                        ))}
                    </div>
                    
                    {/* View Toggle */}
                    <div className="hidden border-l border-brand-border/60 pl-4 sm:flex gap-1.5">
                        <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors">
                            <span className="text-sm">▦</span>
                        </button>
                        <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-text-soft hover:bg-black/5 hover:text-foreground transition-colors">
                            <span className="text-sm">☰</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            {filteredItems.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredItems.map((item) => (
                        <ProductCard
                            key={item.id}
                            kind={kind}
                            item={item}
                            onEdit={(product) => setEditingItem(product)}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-brand-border/80 bg-gradient-to-b from-white/40 to-transparent py-20 text-center relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[60px]"></div>
                    <span className="relative z-10 text-6xl drop-shadow-sm">{searchQuery ? '🔍' : '📭'}</span>
                    <h3 className="relative z-10 mt-5 font-serif text-2xl font-medium text-foreground tracking-tight">
                        {searchQuery ? 'No matching products' : `No ${title.toLowerCase()} configured`}
                    </h3>
                    <p className="relative z-10 mt-2 text-sm text-text-soft max-w-sm leading-relaxed">
                        {searchQuery
                            ? 'Try adjusting your search keywords or clearing your active filters.'
                            : `Get started by adding your very first ${isCake ? 'artisan cake' : 'delicious bake'} to the catalog.`}
                    </p>
                    {!searchQuery && (
                        <button
                            type="button"
                            onClick={() => setShowAddModal(true)}
                            className="relative z-10 btn-primary px-8 mt-8 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                        >
                            + Add New {isCake ? 'Cake' : 'Bake'}
                        </button>
                    )}
                </div>
            )}

            {/* Modals */}
            {showAddModal && (
                <ProductFormModal kind={kind} onClose={() => setShowAddModal(false)} />
            )}
            {editingItem && (
                <ProductFormModal
                    kind={kind}
                    item={editingItem}
                    onClose={() => setEditingItem(null)}
                />
            )}
        </section>
    );
}

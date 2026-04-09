'use client';

import { useState } from 'react';
import type { BakeProduct, FilterSection } from '@/types';
import BakesShopCard from './BakesShopCard';
import BakesSidebar from './BakesSidebar';

type BakesProductShowcaseProps = Readonly<{
    items: BakeProduct[];
    filters: FilterSection[];
    maxPrice: number;
    priceCap: number;
    onPriceChange: (price: number) => void;
    selectedSize: string;
    selectedOccasions: string[];
    onSizeChange: (size: string) => void;
    onOccasionToggle: (occasion: string) => void;
    visibleCount: number;
    onLoadMore: () => void;
}>;

export const BakesProductShowcase = ({
    items,
    filters,
    maxPrice,
    priceCap,
    onPriceChange,
    selectedSize,
    selectedOccasions,
    onSizeChange,
    onOccasionToggle,
    visibleCount,
    onLoadMore,
}: BakesProductShowcaseProps) => {
    const [filtersOpen, setFiltersOpen] = useState(false);

    return (
        <section id="bakes-grid" className="px-4 py-6 sm:py-8">
            {/* Mobile filter toggle */}
            <div className="mx-auto mb-4 flex max-w-7xl justify-start lg:hidden">
                <button
                    type="button"
                    onClick={() => setFiltersOpen(!filtersOpen)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#f2ede7] px-4 py-2 text-xs uppercase tracking-[0.14em] text-text-soft transition-colors hover:bg-[#eadfd3]"
                >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    {filtersOpen ? 'Hide Filters' : 'Show Filters'}
                </button>
            </div>

            <div className="mx-auto grid max-w-7xl gap-6 sm:gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
                {/* Sidebar — collapsible on mobile */}
                <div className={`${filtersOpen ? 'block' : 'hidden'} lg:block`}>
                    <BakesSidebar
                        filters={filters}
                        maxPrice={maxPrice}
                        priceCap={priceCap}
                        onPriceChange={onPriceChange}
                        selectedSize={selectedSize}
                        selectedOccasions={selectedOccasions}
                        onSizeChange={onSizeChange}
                        onOccasionToggle={onOccasionToggle}
                    />
                </div>

                <div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:gap-8 xl:grid-cols-3">
                        {items.slice(0, visibleCount).map((item) => (
                            <BakesShopCard key={item.id} item={item} />
                        ))}
                    </div>

                    {items.length === 0 && (
                        <div className="rounded-xl border border-dashed border-brand-border bg-white/50 p-6 text-center text-xs text-text-soft sm:rounded-2xl sm:p-8 sm:text-sm">
                            No bakes match the current filters. Try adjusting your selections.
                        </div>
                    )}

                    {items.length > visibleCount && (
                        <div className="mt-8 flex justify-center sm:mt-12">
                            <button
                                type="button"
                                onClick={onLoadMore}
                                className="rounded-full bg-[#f2ede7] px-6 py-3 text-xs uppercase tracking-[0.16em] text-text transition-colors hover:bg-[#e9dfd4] sm:px-8 sm:py-4 sm:text-sm"
                            >
                            Load More Pastries
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default BakesProductShowcase;

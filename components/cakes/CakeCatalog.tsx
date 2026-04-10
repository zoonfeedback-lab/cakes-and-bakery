'use client';

import { CakeProduct, FilterPill, FilterSection } from '@/types';
import { slugifyLabel } from '@/lib/catalog-ui';
import { useDeferredValue, useMemo, useState } from 'react';
import CakeCard from './CakeCard';
import CakeSidebar from './CakeSidebar';
import CakeToolbar from './CakeToolbar';

type CakeCatalogProps = Readonly<{
  items: CakeProduct[];
  pills: FilterPill[];
  sortOptions: string[];
  filters: FilterSection[];
}>;

const INITIAL_VISIBLE_COUNT = 6;

export const CakeCatalog = ({
  items,
  pills,
  sortOptions,
  filters,
}: CakeCatalogProps) => {
  const maxPrice = items.length > 0 ? Math.max(...items.map((cake) => cake.price)) : 0;

  const [activePillId, setActivePillId] = useState('all');
  const [activeSort, setActiveSort] = useState(sortOptions[0]);
  const [priceCap, setPriceCap] = useState(maxPrice);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const deferredPill = useDeferredValue(activePillId);
  const deferredSort = useDeferredValue(activeSort);
  const deferredPriceCap = useDeferredValue(priceCap);
  const deferredSize = useDeferredValue(selectedSize);
  const deferredOccasions = useDeferredValue(selectedOccasions);

  const filteredCakes = useMemo(() => {
    return items
      .filter((cake) => {
        if (deferredPill === 'all') return true;
        return slugifyLabel(cake.category) === deferredPill;
      })
      .filter((cake) => cake.price <= deferredPriceCap)
      .filter((cake) => {
        if (!deferredSize) return true;
        return cake.sizeOptions?.includes(deferredSize);
      })
      .filter((cake) => {
        if (deferredOccasions.length === 0) return true;
        return deferredOccasions.every((occasion) =>
          cake.occasions?.includes(occasion),
        );
      })
      .sort((left, right) => {
        if (deferredSort === 'Price Low to High') return left.price - right.price;
        if (deferredSort === 'Newest') return right.id.localeCompare(left.id);

        const leftScore =
          (left.tags?.includes('Best Seller') ? 3 : 0) +
          (left.tags?.includes('Most Loved') ? 2 : 0) +
          (slugifyLabel(left.category) === 'wedding-cake' ? 1 : 0);
        const rightScore =
          (right.tags?.includes('Best Seller') ? 3 : 0) +
          (right.tags?.includes('Most Loved') ? 2 : 0) +
          (slugifyLabel(right.category) === 'wedding-cake' ? 1 : 0);

        return rightScore - leftScore;
      });
  }, [
    deferredOccasions,
    deferredPill,
    deferredPriceCap,
    deferredSize,
    deferredSort,
    items,
  ]);

  const visibleCakes = filteredCakes.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredCakes.length;

  function handlePillChange(pillId: string) {
    setActivePillId(pillId);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }

  function handlePriceChange(value: number) {
    setPriceCap(value);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }

  function handleSizeChange(size: string) {
    setSelectedSize(size);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }

  function handleOccasionToggle(occasion: string) {
    setSelectedOccasions((current) =>
      current.includes(occasion)
        ? current.filter((value) => value !== occasion)
        : [...current, occasion],
    );
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }

  function handleLoadMore() {
    setVisibleCount((current) => current + 3);
  }

  return (
    <>
      <CakeToolbar
        pills={pills}
        sortOptions={sortOptions}
        activePillId={activePillId}
        activeSort={activeSort}
        onPillSelect={handlePillChange}
        onSortChange={setActiveSort}
      />

      <section id="cakes-grid" className="px-4 py-6 sm:py-12">
        {/* Mobile Filter Toggle */}
        <div className="mx-auto mb-6 flex max-w-7xl lg:hidden">
            <button
                type="button"
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="inline-flex items-center gap-2 rounded-full bg-[#f2ede7] px-5 py-2.5 text-[11px] uppercase tracking-[0.14em] text-text-soft transition-colors hover:bg-[#eadfd3]"
            >
                <svg className={`h-4 w-4 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                {filtersOpen ? 'Hide Preferences' : 'Tailor Preferences'}
            </button>
        </div>

        <div className="mx-auto grid max-w-7xl gap-6 sm:gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
          <div className={`${filtersOpen ? 'block' : 'hidden'} lg:block`}>
            <CakeSidebar
                filters={filters}
                maxPrice={maxPrice}
                priceCap={priceCap}
                onPriceChange={handlePriceChange}
                selectedSize={selectedSize}
                selectedOccasions={selectedOccasions}
                onSizeChange={handleSizeChange}
                onOccasionToggle={handleOccasionToggle}
            />
          </div>

          <div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 xl:grid-cols-3">
              {visibleCakes.map((cake) => (
                <CakeCard key={cake.id} cake={cake} />
              ))}
            </div>

            {visibleCakes.length === 0 ? (
              <div className="mt-2 rounded-2xl border border-dashed border-[#d3c8be] bg-white/50 p-8 text-center text-[#6b5c65] backdrop-blur-sm">
                No cakes match the current filters. Try a higher price cap or fewer
                occasion filters.
              </div>
            ) : null}

            {canLoadMore ? (
              <div className="mt-8 flex justify-center sm:mt-12">
                <button
                  className="rounded-full bg-[#f2ede7] px-6 py-3 text-xs uppercase tracking-[0.16em] text-text transition-colors hover:bg-[#eadfd3] sm:px-8 sm:py-4 sm:text-sm"
                  onClick={handleLoadMore}
                  type="button"
                >
                  Load More Pastries
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
};

export default CakeCatalog;

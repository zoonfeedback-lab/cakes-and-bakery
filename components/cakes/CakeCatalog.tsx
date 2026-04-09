'use client';

import { CakeProduct, FilterPill, FilterSection } from '@/types';
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
  const maxPrice = Math.max(...items.map((cake) => cake.price));

  const [activePillId, setActivePillId] = useState('all');
  const [activeSort, setActiveSort] = useState(sortOptions[0]);
  const [priceCap, setPriceCap] = useState(maxPrice);
  const [selectedSize, setSelectedSize] = useState(filters[0]?.options[1] ?? '');
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const deferredPill = useDeferredValue(activePillId);
  const deferredSort = useDeferredValue(activeSort);
  const deferredPriceCap = useDeferredValue(priceCap);
  const deferredSize = useDeferredValue(selectedSize);
  const deferredOccasions = useDeferredValue(selectedOccasions);

  const filteredCakes = useMemo(() => {
    return items
      .filter((cake) => {
        if (deferredPill === 'all') return true;
        return cake.category === deferredPill;
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
          (left.tags?.includes('Best Seller') ? 2 : 0) +
          (left.tags?.includes('Most Loved') ? 2 : 0);
        const rightScore =
          (right.tags?.includes('Best Seller') ? 2 : 0) +
          (right.tags?.includes('Most Loved') ? 2 : 0);

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

      <section id="cakes-grid" className="px-4 py-8 md:py-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
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

          <div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {visibleCakes.map((cake) => (
                <CakeCard key={cake.id} cake={cake} />
              ))}
            </div>

            {visibleCakes.length === 0 ? (
              <div className="mt-2 rounded-2xl border border-dashed border-[#d3c8be] bg-[#f8f6f2] p-8 text-center text-[#6b5c65]">
                No cakes match the current filters. Try a higher price cap or fewer
                occasion filters.
              </div>
            ) : null}

            {canLoadMore ? (
              <div className="mt-12 flex justify-center">
                <button
                  className="rounded-full bg-[#ece9e3] px-8 py-4 text-sm uppercase tracking-[0.16em] text-text transition-colors hover:bg-[#e1ddd6]"
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

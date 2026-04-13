'use client';

import type { BakeProduct, FilterPill, FilterSection } from '@/types';
import { slugifyLabel } from '@/lib/catalog-ui';
import { useDeferredValue, useState } from 'react';
import BakesProductShowcase from './BakesProductShowcase';
import BakesToolbar from './BakesToolbar';

type BakesCatalogProps = Readonly<{
    items: BakeProduct[];
    pills: FilterPill[];
    sortOptions: string[];
    filters: FilterSection[];
}>;

const INITIAL_VISIBLE_COUNT = 6;

export const BakesCatalog = ({ items, pills, sortOptions, filters }: BakesCatalogProps) => {
    const highestPrice = items.length > 0 ? Math.max(...items.map((item) => item.price)) : 0;
    const [activePillId, setActivePillId] = useState(
        pills.find((pill) => pill.active)?.id ?? pills[0]?.id ?? 'all',
    );
    const [activeSort, setActiveSort] = useState(sortOptions[0] ?? 'Popularity');
    const [priceCap, setPriceCap] = useState(highestPrice);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

    const deferredCategory = useDeferredValue(activePillId);
    const deferredPriceCap = useDeferredValue(priceCap);
    const deferredSize = useDeferredValue(selectedSize);
    const deferredOccasions = useDeferredValue(selectedOccasions);
    const deferredSort = useDeferredValue(activeSort);

    const filteredItems = items
        .filter((item) => {
            if (deferredCategory === 'all') return true;
            if (deferredCategory === 'custom') {
                return item.tags?.includes('Custom Box') ?? false;
            }
            if (deferredCategory === 'gift-boxes') {
                return item.tags?.includes('Gift Boxes') ?? false;
            }

            return slugifyLabel(item.category) === deferredCategory;
        })
        .filter((item) => {
            return item.price <= deferredPriceCap;
        })
        .filter((item) => {
            if (!deferredSize) return true;
            return item.boxOptions?.includes(deferredSize) ?? false;
        })
        .filter((item) => {
            if (deferredOccasions.length === 0) return true;
            return deferredOccasions.every((occasion) => item.occasions?.includes(occasion));
        })
        .sort((left, right) => {
            if (deferredSort === 'Price Low to High') {
                return left.price - right.price;
            }

            if (deferredSort === 'Newest') {
                return right.id.localeCompare(left.id);
            }

            const leftScore =
                (left.tags?.includes('Best Seller') ? 2 : 0) +
                (left.tags?.includes('Most Loved') ? 2 : 0) +
                (left.tags?.includes('Gift Boxes') ? 1 : 0);
            const rightScore =
                (right.tags?.includes('Best Seller') ? 2 : 0) +
                (right.tags?.includes('Most Loved') ? 2 : 0) +
                (right.tags?.includes('Gift Boxes') ? 1 : 0);

            return rightScore - leftScore;
        });

    function handlePillSelect(pillId: string) {
        setActivePillId(pillId);
        setVisibleCount(INITIAL_VISIBLE_COUNT);
    }

    function handleSortChange(sort: string) {
        setActiveSort(sort);
    }

    function handlePriceChange(price: number) {
        setPriceCap(price);
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
            <BakesToolbar
                pills={pills}
                sortOptions={sortOptions}
                activePillId={activePillId}
                activeSort={activeSort}
                onPillSelect={handlePillSelect}
                onSortChange={handleSortChange}
            />
            <BakesProductShowcase
                items={filteredItems}
                filters={filters}
                maxPrice={highestPrice}
                priceCap={priceCap}
                onPriceChange={handlePriceChange}
                selectedSize={selectedSize}
                selectedOccasions={selectedOccasions}
                onSizeChange={handleSizeChange}
                onOccasionToggle={handleOccasionToggle}
                visibleCount={visibleCount}
                onLoadMore={handleLoadMore}
            />
        </>
    );
};

export default BakesCatalog;

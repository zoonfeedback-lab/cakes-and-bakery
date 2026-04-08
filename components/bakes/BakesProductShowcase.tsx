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
    return (
        <section id="bakes-grid" className="px-4 py-8">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
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

                <div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {items.slice(0, visibleCount).map((item) => (
                            <BakesShopCard key={item.id} item={item} />
                        ))}
                    </div>

                    {items.length > visibleCount && (
                        <div className="mt-12 flex justify-center">
                            <button
                                type="button"
                                onClick={onLoadMore}
                                className="rounded-full bg-[#f2ede7] px-8 py-4 text-sm uppercase tracking-[0.16em] text-text transition-colors hover:bg-[#e9dfd4]"
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

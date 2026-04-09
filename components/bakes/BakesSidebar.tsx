import type { FilterSection } from '@/types';

type BakesSidebarProps = Readonly<{
    filters: FilterSection[];
    maxPrice: number;
    priceCap: number;
    onPriceChange: (price: number) => void;
    selectedSize: string;
    selectedOccasions: string[];
    onSizeChange: (size: string) => void;
    onOccasionToggle: (occasion: string) => void;
}>;

export const BakesSidebar = ({
    filters,
    maxPrice,
    priceCap,
    onPriceChange,
    selectedSize,
    selectedOccasions,
    onSizeChange,
    onOccasionToggle,
}: BakesSidebarProps) => {
    return (
        <aside className="lg:sticky lg:top-6">
            <div className="space-y-6 rounded-[1.5rem] bg-white/50 p-4 shadow-[0_14px_35px_rgba(109,80,96,0.05)] sm:space-y-9 sm:rounded-[2rem] sm:p-6">
                <div>
                    <h3 className="text-xl font-serif text-primary sm:text-2xl">Price Range</h3>
                    <div className="mt-4 sm:mt-5">
                        <input
                            type="range"
                            min={10}
                            max={maxPrice}
                            step={1}
                            value={priceCap}
                            onChange={(event) => onPriceChange(Number(event.target.value))}
                            className="h-2 w-full cursor-pointer accent-[var(--primary)]"
                        />
                        <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.16em] text-text-soft sm:mt-3 sm:text-xs">
                            <span>PKR 10</span>
                            <span>PKR {priceCap.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {filters.map((section) => (
                    <div key={section.id}>
                        <h3 className="text-xl font-serif text-primary sm:text-2xl">{section.title}</h3>
                        <div className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
                            {section.style === 'pill' ? (
                                <div className="flex flex-wrap gap-2 sm:gap-3">
                                    {section.options.map((option) => (
                                        <button
                                            key={option}
                                            type="button"
                                            onClick={() => onOccasionToggle(option)}
                                            className={`rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] sm:px-4 sm:py-2 sm:text-xs ${
                                                selectedOccasions.includes(option)
                                                    ? 'bg-primary text-white'
                                                    : 'bg-[#f2ede7] text-text-soft hover:bg-[#eadfd3]'
                                            }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                section.options.map((option) => (
                                    <label key={option} className="flex cursor-pointer items-center gap-2.5 text-xs text-text-soft sm:gap-3 sm:text-sm">
                                        <button
                                            type="button"
                                            onClick={() => onSizeChange(option)}
                                            className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                                                selectedSize === option ? 'border-primary' : 'border-brand-border'
                                            }`}
                                        >
                                            {selectedSize === option && <span className="h-2 w-2 rounded-full bg-primary" />}
                                        </button>
                                        <span>{option}</span>
                                    </label>
                                ))
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default BakesSidebar;

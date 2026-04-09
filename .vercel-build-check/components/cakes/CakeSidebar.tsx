import { FilterSection } from '@/types';

type CakeSidebarProps = Readonly<{
  filters: FilterSection[];
  maxPrice: number;
  priceCap: number;
  onPriceChange: (value: number) => void;
  selectedSize: string;
  selectedOccasions: string[];
  onSizeChange: (size: string) => void;
  onOccasionToggle: (occasion: string) => void;
}>;

export const CakeSidebar = ({
  filters,
  maxPrice,
  priceCap,
  onPriceChange,
  selectedSize,
  selectedOccasions,
  onSizeChange,
  onOccasionToggle,
}: CakeSidebarProps) => {
  return (
    <aside className="lg:sticky lg:top-6">
      <div className="space-y-6 rounded-[1.5rem] bg-white/50 p-4 shadow-[0_14px_35px_rgba(109,80,96,0.05)] backdrop-blur-md sm:space-y-9 sm:rounded-[2rem] sm:p-6">
        <div>
          <h3 className="text-xl font-serif text-primary sm:text-2xl">Price Range</h3>
          <div className="mt-4 sm:mt-5">
            <input
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#d3c8be]/40 accent-primary"
              max={maxPrice}
              min={0}
              onChange={(e) => onPriceChange(Number(e.target.value))}
              type="range"
              value={priceCap}
            />
            <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.16em] text-text-soft sm:mt-3 sm:text-xs">
              <span>PKR 0</span>
              <span>PKR {priceCap.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {filters.map((section) => (
          <div className="space-y-4 sm:space-y-5" key={section.id}>
            <h3 className="text-xl font-serif text-primary sm:text-2xl">{section.title}</h3>
            <div className="flex flex-col space-y-2.5 sm:space-y-3">
              {section.style === 'pill' ? (
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {section.options.map((option) => (
                    <button
                      className={`rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] transition-colors sm:px-4 sm:py-2 sm:text-xs ${
                        selectedOccasions.includes(option)
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-[#f2ede7] text-text-soft hover:bg-[#eadfd3]'
                      }`}
                      key={option}
                      onClick={() => onOccasionToggle(option)}
                      type="button"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                section.options.map((option) => (
                   <button
                    key={option}
                    onClick={() => onSizeChange(option)}
                    className="flex cursor-pointer items-center gap-2.5 text-left text-[11px] text-text-soft transition-colors hover:text-primary sm:gap-3 sm:text-sm"
                    type="button"
                  >
                    <div className={`flex h-4 w-4 items-center justify-center rounded-full border transition-all ${
                        selectedSize === option ? 'border-primary ring-2 ring-primary/10' : 'border-[#d3c8be]'
                    }`}>
                        {selectedSize === option && <div className="h-2 w-2 rounded-full bg-primary" />}
                    </div>
                    <span>{option}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default CakeSidebar;

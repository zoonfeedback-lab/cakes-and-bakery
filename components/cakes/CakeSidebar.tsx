import { FilterSection } from '@/types';

type CakeSidebarProps = Readonly<{
  filters: FilterSection[];
  maxPrice: number;
  priceCap: number;
  onPriceChange: (price: number) => void;
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
      <div className="space-y-9 rounded-[2rem] bg-white/50 p-6 shadow-[0_14px_35px_rgba(109,80,96,0.05)]">
        <div>
          <h3 className="text-2xl font-serif text-primary">Price Range</h3>
          <div className="mt-5">
            <input
              type="range"
              min={20}
              max={maxPrice}
              step={1}
              value={priceCap}
              onChange={(event) => onPriceChange(Number(event.target.value))}
              className="h-1.5 w-full cursor-pointer accent-[#6f4c62]"
            />
            <div className="mt-3 flex justify-between text-xs uppercase tracking-[0.16em] text-[#776b71]">
              <span>$20</span>
              <span>${priceCap}</span>
            </div>
          </div>
        </div>

        {filters.map((section) => (
          <div key={section.id}>
            <h3 className="text-2xl font-serif text-primary">{section.title}</h3>
            <div className="mt-5 space-y-3">
              {section.style === 'pill' ? (
                <div className="flex flex-wrap gap-3">
                  {section.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => onOccasionToggle(option)}
                      className={`rounded-full px-4 py-2 text-xs transition ${
                        selectedOccasions.includes(option)
                          ? 'bg-[#6f4c62] text-white'
                          : 'bg-[#ece5db] text-[#62555c] hover:bg-[#dfd5c7]'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                section.options.map((option) => (
                  <label
                    key={option}
                    className="flex cursor-pointer items-center gap-3 text-sm text-[#60515b]"
                  >
                    <button
                      type="button"
                      onClick={() => onSizeChange(option)}
                      className={`grid h-4 w-4 place-items-center rounded-full border ${
                        selectedSize === option ? 'border-[#6f4c62]' : 'border-[#cabeb6]'
                      }`}
                    >
                      {selectedSize === option && (
                        <span className="h-2 w-2 rounded-full bg-[#6f4c62]" />
                      )}
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

export default CakeSidebar;

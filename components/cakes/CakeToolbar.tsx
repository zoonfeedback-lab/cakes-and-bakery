import { FilterPill } from '@/types';

type CakeToolbarProps = Readonly<{
  pills: FilterPill[];
  sortOptions: string[];
  activePillId: string;
  activeSort: string;
  onPillSelect: (pillId: string) => void;
  onSortChange: (sort: string) => void;
}>;

export const CakeToolbar = ({
  pills,
  sortOptions,
  activePillId,
  activeSort,
  onPillSelect,
  onSortChange,
}: CakeToolbarProps) => {
  return (
    <section className="px-4 pb-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 border-b border-brand-border/80 pb-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          {pills.map((pill) => (
            <button
              key={pill.id}
              type="button"
              onClick={() => onPillSelect(pill.id)}
              className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.16em] transition ${
                pill.id === activePillId
                  ? 'bg-primary text-white'
                  : 'bg-[#ece5db] text-[#5e5058] hover:bg-[#e4dacd]'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 self-end lg:self-auto">
          <span className="text-xs uppercase tracking-[0.18em] text-[#695a63]">
            Sort by
          </span>
          <label className="rounded-full bg-[#f0ece5] px-4 py-2 text-xs uppercase tracking-[0.14em] text-[#564752]">
            <span className="sr-only">Sort cakes</span>
            <select
              value={activeSort}
              onChange={(event) => onSortChange(event.target.value)}
              className="bg-transparent font-medium outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </section>
  );
};

export default CakeToolbar;

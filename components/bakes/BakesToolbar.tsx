import type { FilterPill } from '@/types';

type BakesToolbarProps = Readonly<{
    pills: FilterPill[];
    sortOptions: string[];
    activePillId: string;
    activeSort: string;
    onPillSelect: (pillId: string) => void;
    onSortChange: (sort: string) => void;
}>;

export const BakesToolbar = ({
    pills,
    sortOptions,
    activePillId,
    activeSort,
    onPillSelect,
    onSortChange,
}: BakesToolbarProps) => {
    return (
        <section className="px-4 pb-6 sm:pb-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 border-b border-brand-border/80 pb-6 sm:gap-6 sm:pb-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 -mx-1 px-1 overflow-x-auto pb-1">
                    {pills.map((pill) => (
                        <button
                            key={pill.id}
                            type="button"
                            onClick={() => onPillSelect(pill.id)}
                            className={`rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] whitespace-nowrap sm:px-4 sm:py-2 sm:text-xs ${
                                pill.id === activePillId
                                    ? 'bg-primary text-white'
                                    : 'bg-[#f4ece1] text-text-soft hover:bg-[#eadfd3]'
                            }`}
                        >
                            {pill.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2 self-end sm:gap-3 lg:self-auto">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-text-soft sm:text-xs">Sort by</span>
                    <label className="rounded-full border border-brand-border bg-[#f8f2ea] px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-text-soft sm:px-4 sm:py-2 sm:text-xs">
                        <span className="sr-only">Sort bakes</span>
                        <select
                            value={activeSort}
                            onChange={(event) => onSortChange(event.target.value)}
                            className="bg-transparent text-inherit outline-none"
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

export default BakesToolbar;

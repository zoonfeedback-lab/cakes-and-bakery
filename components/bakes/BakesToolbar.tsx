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
        <section className="px-4 pb-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 border-b border-brand-border/80 pb-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                    {pills.map((pill) => (
                        <button
                            key={pill.id}
                            type="button"
                            onClick={() => onPillSelect(pill.id)}
                            className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.16em] ${
                                pill.id === activePillId
                                    ? 'bg-primary text-white'
                                    : 'bg-[#f4ece1] text-text-soft hover:bg-[#eadfd3]'
                            }`}
                        >
                            {pill.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-3 self-end lg:self-auto">
                    <span className="text-xs uppercase tracking-[0.18em] text-text-soft">Sort by</span>
                    <label className="rounded-full border border-brand-border bg-[#f8f2ea] px-4 py-2 text-xs uppercase tracking-[0.14em] text-text-soft">
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

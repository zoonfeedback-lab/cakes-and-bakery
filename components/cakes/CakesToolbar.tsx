type CakesToolbarProps = {
    categories: readonly string[];
    sortLabel: string;
};

export const CakesToolbar = ({ categories, sortLabel }: CakesToolbarProps) => {
    return (
        <section className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div className="flex flex-wrap items-center gap-2">
                {categories.map((category, index) => (
                    <button
                        className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                            index === 0
                                ? 'bg-[#6f4c62] text-white'
                                : 'bg-[#ece5db] text-[#5e5058] hover:bg-[#e4dacd]'
                        }`}
                        key={category}
                        type="button"
                    >
                        {category}
                    </button>
                ))}
            </div>

            <button
                className="inline-flex w-fit items-center gap-2 rounded-full bg-[#f0ece5] px-4 py-2 text-sm text-[#695a63]"
                type="button"
            >
                Sort by
                <span className="font-medium">{sortLabel}</span>
                <span aria-hidden="true">v</span>
            </button>
        </section>
    );
};

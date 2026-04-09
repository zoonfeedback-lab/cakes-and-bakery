type CakesSidebarProps = {
    sizeOptions: readonly string[];
    occasions: readonly string[];
};

export const CakesSidebar = ({ sizeOptions, occasions }: CakesSidebarProps) => {
    return (
        <aside className="lg:pt-2">
            <div className="mb-8">
                <h2 className="mb-4 text-3xl font-semibold text-[#3f2f3a]">Price Range</h2>
                <div className="relative mb-3 h-1.5 rounded-full bg-[#dfd7cd]">
                    <span className="absolute left-[52%] top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6f4c62]" />
                </div>
                <div className="flex justify-between text-sm text-[#776b71]">
                    <span>$20</span>
                    <span>$500+</span>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="mb-4 text-3xl font-semibold text-[#3f2f3a]">Cake Size</h2>
                <div className="space-y-3 text-[#60515b]">
                    {sizeOptions.map((size, index) => (
                        <label className="flex items-center gap-3 text-sm" key={size}>
                            <span
                                className={`grid h-4 w-4 place-items-center rounded-full border ${
                                    index === 1 ? 'border-[#6f4c62]' : 'border-[#cabeb6]'
                                }`}
                            >
                                {index === 1 ? <span className="h-2 w-2 rounded-full bg-[#6f4c62]" /> : null}
                            </span>
                            <span>{size}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="mb-4 text-3xl font-semibold text-[#3f2f3a]">Occasion</h2>
                <div className="flex flex-wrap gap-2">
                    {occasions.map((occasion) => (
                        <button
                            className="rounded-full bg-[#ece5db] px-3 py-1.5 text-xs text-[#62555c] transition hover:bg-[#dfd5c7]"
                            key={occasion}
                            type="button"
                        >
                            {occasion}
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
};

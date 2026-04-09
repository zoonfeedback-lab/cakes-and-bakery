type CakesCtaBannerProps = {
    title: string;
    description: string;
    actionLabel: string;
};

export const CakesCtaBanner = ({ title, description, actionLabel }: CakesCtaBannerProps) => {
    return (
        <section className="mt-16 flex flex-col gap-8 rounded-[32px] bg-[#d6f0ce] px-7 py-10 md:flex-row md:items-center md:justify-between md:px-10 lg:px-14">
            <div>
                <h2 className="mb-3 text-5xl font-semibold text-[#2f4731] md:text-6xl">{title}</h2>
                <p className="max-w-[540px] text-base text-[#4f6452] md:text-lg">{description}</p>
            </div>
            <button
                className="rounded-full bg-[#6f4c62] px-8 py-4 text-sm font-medium text-white shadow-[0_9px_20px_rgba(111,76,98,0.35)] transition hover:-translate-y-0.5"
                type="button"
            >
                {actionLabel}
            </button>
        </section>
    );
};

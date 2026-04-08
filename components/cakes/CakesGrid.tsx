import Image from 'next/image';
import type { CakeProduct } from '@/types';

type CakesGridProps = {
    items: CakeProduct[];
};

export const CakesGrid = ({ items }: CakesGridProps) => {
    return (
        <section id="cakes-grid" className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((cake) => (
                <article
                    className="rounded-[28px] border border-[#e8dfd4] bg-[#f8f6f2] p-4 shadow-sm"
                    key={cake.id}
                >
                    <div className="relative mb-4 aspect-[0.9] overflow-hidden rounded-[24px]">
                        <Image alt={cake.name} className="h-full w-full object-cover" fill src={cake.image} />
                    </div>
                    <div className="mb-2 flex items-start justify-between gap-3">
                        <h3 className="text-4xl font-semibold leading-tight text-[#2e222a]">{cake.name}</h3>
                        <span className="pt-1 text-sm text-[#473c43]">${cake.price}</span>
                    </div>
                    <p className="mb-5 min-h-[68px] text-sm leading-relaxed text-[#6b5c65]">{cake.description}</p>
                    <button
                        className="w-full rounded-full border border-[#44323e] px-5 py-2.5 text-sm text-[#3d2e38] transition hover:bg-[#f1ece5]"
                        type="button"
                    >
                        Customize
                    </button>
                </article>
            ))}
        </section>
    );
};

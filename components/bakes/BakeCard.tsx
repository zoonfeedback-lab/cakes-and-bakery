import type { BakeProduct } from '@/types';
import Image from 'next/image';

type BakeCardProps = Readonly<{
    item: BakeProduct;
}>;

export const BakeCard = ({ item }: BakeCardProps) => {
    const formattedPrice = item.priceLabel ?? `PKR ${item.price.toLocaleString()}`;

    return (
        <article className="group flex h-full flex-col">
            <div className="relative mb-5 aspect-square w-full overflow-hidden rounded-[2rem] bg-gray-900 shadow-lg">
                <Image
                    src={item.image}
                    alt={item.imageAlt ?? item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>

            <div className="flex flex-1 flex-col rounded-[1.75rem] bg-white/80 p-5 text-center shadow-[0_12px_30px_rgba(109,80,96,0.06)]">
                <div className="mb-3">
                    <h3 className="text-2xl font-serif text-text">{item.name}</h3>
                    <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                        {formattedPrice}
                    </p>
                </div>

                <p className="body-copy text-sm">{item.description}</p>

                {item.boxOptions && (
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                        {item.boxOptions.map((option) => (
                            <span
                                key={option}
                                className="rounded-full border border-brand-border px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-text-soft"
                            >
                                {option}
                            </span>
                        ))}
                    </div>
                )}

                {item.tags && (
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                        {item.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full bg-primary/10 px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-primary"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <button className="btn-primary mt-6">Add to Cart</button>
            </div>
        </article>
    );
};

export default BakeCard;

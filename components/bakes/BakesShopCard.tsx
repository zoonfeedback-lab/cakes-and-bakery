import type { BakeProduct } from '@/types';
import Image from 'next/image';

type BakesShopCardProps = Readonly<{
    item: BakeProduct;
}>;

export const BakesShopCard = ({ item }: BakesShopCardProps) => {
    return (
        <article className="overflow-hidden rounded-[2rem] bg-white shadow-[0_16px_38px_rgba(109,80,96,0.06)]">
            <div className="relative aspect-[0.92] w-full overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.imageAlt ?? item.name}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="space-y-4 px-5 py-6">
                <div className="flex items-start justify-between gap-4">
                    <h3 className="max-w-[11rem] text-[2rem] font-serif leading-[1.02] text-text">
                        {item.name}
                    </h3>
                    <span className="pt-2 text-sm uppercase tracking-[0.16em] text-primary">
                        {item.priceLabel ?? `$${item.price}`}
                    </span>
                </div>

                <p className="body-copy min-h-[4.25rem] text-sm">{item.description}</p>

                <button className="mt-2 inline-flex w-full items-center justify-center rounded-full border border-primary bg-transparent px-5 py-3 text-sm uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary hover:text-white">
                    Customize
                </button>
            </div>
        </article>
    );
};

export default BakesShopCard;

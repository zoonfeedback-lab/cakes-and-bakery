import type { BakeProduct } from '@/types';
import Image from 'next/image';

type BakesShopCardProps = Readonly<{
    item: BakeProduct;
}>;

export const BakesShopCard = ({ item }: BakesShopCardProps) => {
    const formattedPrice = item.priceLabel ?? `PKR ${item.price.toLocaleString()}`;

    return (
        <article className="overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] bg-white shadow-[0_16px_38px_rgba(109,80,96,0.06)]">
            <div className="relative aspect-[0.92] w-full overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.imageAlt ?? item.name}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="space-y-3 px-4 py-4 sm:space-y-4 sm:px-5 sm:py-6">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="max-w-[10rem] text-[1.5rem] font-serif leading-[1.02] text-text sm:max-w-[11rem] sm:text-[2rem]">
                        {item.name}
                    </h3>
                    <span className="pt-1 text-xs uppercase tracking-[0.16em] text-primary sm:pt-2 sm:text-sm">
                        {formattedPrice}
                    </span>
                </div>

                <p className="body-copy min-h-[3.5rem] text-xs sm:min-h-[4.25rem] sm:text-sm">{item.description}</p>

                <button className="mt-1 inline-flex w-full items-center justify-center rounded-full border border-primary bg-transparent px-4 py-2.5 text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary hover:text-white sm:mt-2 sm:px-5 sm:py-3 sm:text-sm">
                    Customize
                </button>
            </div>
        </article>
    );
};

export default BakesShopCard;

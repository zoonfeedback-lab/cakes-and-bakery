import { CakeProduct } from '@/types';
import Image from 'next/image';

type GalleryProps = Readonly<{
    items: CakeProduct[];
    onViewAll?: () => void;
}>;

export const GallerySection = ({ items, onViewAll }: GalleryProps) => {
    const formatPrice = (price: number) => `PKR ${price.toLocaleString()}`;

    return (
        <section className="bg-surface py-20">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-12 flex flex-col items-center text-center">
                    <h2 className="section-title mb-3 text-3xl md:text-5xl">
                        The Gallery Favorites
                    </h2>
                    <p className="body-copy text-xs uppercase tracking-[0.18em]">
                        Our most requested creations for your special moments
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {items.map((item) => (
                        <div key={item.id} className="group flex flex-col">
                            <div className="relative mb-6 aspect-square w-full overflow-hidden rounded-[2rem] bg-gray-900 shadow-lg">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            <div className="flex flex-1 flex-col px-2">
                                <div className="mb-1 flex items-start justify-between gap-4">
                                    <h3 className="text-xl font-serif font-bold text-text">
                                        {item.name}
                                    </h3>
                                    <span className="text-lg font-serif font-bold text-text-muted">
                                        {formatPrice(item.price)}
                                    </span>
                                </div>

                                <p className="body-copy mb-3 line-clamp-1 text-sm">
                                    {item.description}
                                </p>

                                <span className="mb-6 block text-[10px] font-bold uppercase tracking-widest text-primary">
                                    {item.category}
                                </span>

                                <button className="mt-auto flex w-full items-center justify-center gap-2 rounded-full bg-grayMuted py-3.5 text-sm font-medium text-text transition-colors hover:bg-surface-muted">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 flex justify-center">
                    <button
                        onClick={onViewAll}
                        className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.24em] text-primary transition-colors hover:text-primary-light"
                    >
                        View Collection <span aria-hidden="true">-&gt;</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default GallerySection;

import { CakeProduct } from '@/types';
import Image from 'next/image';

type GalleryProps = Readonly<{
    items: CakeProduct[];
    onViewAll?: () => void;
}>;

export const GallerySection = ({ items, onViewAll }: GalleryProps) => {
    return (
        <section className="py-20 bg-surface">
            <div className="max-w-7xl mx-auto px-4">
                
                <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-4">
                    <div>
                        <h2 className="section-title mb-2 text-3xl">
                            The Gallery Favorites
                        </h2>
                        <p className="body-copy text-xs uppercase tracking-[0.1em]">
                            Our most requested creations for your special moments
                        </p>
                    </div>
                    <button
                        onClick={onViewAll}
                        className="text-primary hover:text-primary-light font-medium text-sm flex items-center gap-2 uppercase tracking-widest transition-colors"
                    >
                        View Collection →
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {items.map((item) => (
                        <div key={item.id} className="group flex flex-col">
                            {/* Image Box */}
                            <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden mb-6 bg-gray-900 shadow-lg">
                                <Image 
                                    src={item.image} 
                                    alt={item.name} 
                                    fill 
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 flex flex-col px-2">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="text-xl font-serif font-bold text-text">
                                        {item.name}
                                    </h3>
                                    <span className="text-lg font-serif font-bold text-text-muted">
                                        ${item.price}
                                    </span>
                                </div>
                                
                                <p className="body-copy mb-3 line-clamp-1 text-sm">
                                    {item.description}
                                </p>
                                
                                <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-6 block">
                                    {item.category}
                                </span>

                                <button className="mt-auto flex w-full items-center justify-center gap-2 rounded-full bg-grayMuted py-3.5 text-sm font-medium text-text transition-colors hover:bg-surface-muted">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GallerySection;

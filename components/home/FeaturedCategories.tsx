import { CakeProduct } from '@/types';
import Image from 'next/image';

type FeaturedCategoriesProps = Readonly<{
    items: CakeProduct[];
}>;

export const FeaturedCategories = ({ items }: FeaturedCategoriesProps) => {
    return (
        <section className="py-12 bg-surface">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_0.8fr] gap-6">
                    
                    {/* Left Large Card */}
                    {items[0] && (
                        <article className="group relative rounded-[2rem] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 min-h-[400px] md:h-[600px] cursor-pointer">
                            <Image 
                                src={items[0].image} 
                                alt={items[0].name} 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                                <h3 className="text-3xl font-serif tracking-wide mb-2">{items[0].name}</h3>
                                <p className="text-sm text-gray-200 font-sans tracking-wide opacity-90 max-w-sm">{items[0].description}</p>
                            </div>
                        </article>
                    )}

                    {/* Right Column Stack */}
                    <div className="flex flex-col gap-6">
                        {items[1] && (
                            <article className="group relative rounded-[2rem] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-[288px] cursor-pointer">
                                <Image 
                                    src={items[1].image} 
                                    alt={items[1].name} 
                                    fill 
                                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
                                    <h3 className="text-2xl font-serif tracking-wide">{items[1].name}</h3>
                                </div>
                            </article>
                        )}
                        {items[2] && (
                            <article className="group relative rounded-[2rem] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-[288px] cursor-pointer">
                                <Image 
                                    src={items[2].image} 
                                    alt={items[2].name} 
                                    fill 
                                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
                                    <h3 className="text-2xl font-serif tracking-wide">{items[2].name}</h3>
                                </div>
                            </article>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FeaturedCategories;

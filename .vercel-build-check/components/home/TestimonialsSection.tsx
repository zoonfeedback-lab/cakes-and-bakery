import { Testimonial } from '@/types';

type TestimonialsProps = Readonly<{
    items: Testimonial[];
}>;

const Stars = ({ rating }: { rating: number }) => (
    <div className="flex gap-1 text-white mb-4 sm:mb-6">
        {[...Array(5)].map((_, index) => (
            <svg key={index} className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${index < rating ? 'fill-current' : 'text-white/30 fill-current'}`} viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
    </div>
);

export const TestimonialsSection = ({ items }: TestimonialsProps) => {
    return (
        <section className="py-14 sm:py-20 md:py-24 bg-primary px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-white text-center mb-8 sm:mb-12 md:mb-16">
                    Stories of Celebration
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3 md:gap-8">
                    {items.map((item) => (
                        <div key={item.id} className="bg-white/5 rounded-2xl sm:rounded-3xl p-5 sm:p-8 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                            <Stars rating={item.rating} />
                            
                            <p className="text-white text-xs sm:text-sm md:text-base leading-relaxed mb-5 sm:mb-8 italic font-serif opacity-90 min-h-0 sm:min-h-[80px]">
                                &ldquo;{item.content}&rdquo;
                            </p>

                            <div className="flex items-center gap-3 sm:gap-4 mt-auto">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex flex-col items-center justify-center text-primary font-bold overflow-hidden text-xs sm:text-sm">
                                    <span aria-hidden="true">
                                        {item.author
                                            .split(' ')
                                            .map((part) => part[0])
                                            .join('')
                                            .slice(0, 2)}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-xs sm:text-sm">{item.author}</h4>
                                    <p className="text-white/60 text-[10px] sm:text-xs">Customer</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;

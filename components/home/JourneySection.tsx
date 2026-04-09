import { JourneyStep } from '@/types';
import Image from 'next/image';

type JourneyProps = Readonly<{
    steps: JourneyStep[];
}>;

export const JourneySection = ({ steps }: JourneyProps) => {
    // Only use the first 3 steps as per design
    const displaySteps = steps.slice(0, 3);
    // Hardcode specific labels from the design
    const labels = ["Choose", "Customize", "Order"];

    return (
        <section className="py-14 sm:py-20 md:py-24 bg-surface relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4">
                
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-primary text-center mb-10 sm:mb-16">
                    The Journey to Your Perfect Slice
                </h2>

                <div className="relative max-w-4xl mx-auto mb-14 sm:mb-20 px-4 md:px-0">
                    <div className="absolute top-8 left-0 right-0 h-[1px] bg-gray-300 hidden md:block" />
                    
                    <div className="grid grid-cols-3 gap-4 sm:gap-8 md:gap-12 text-center relative z-10">
                        {displaySteps.map((step, index) => (
                            <div key={step.id} className="flex flex-col items-center">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-grayMuted flex items-center justify-center text-primary mb-3 sm:mb-6 shadow-sm border-4 border-surface">
                                    <span className="text-lg sm:text-2xl">{['✨', '🎨', '🛒'][index]}</span>
                                </div>
                                <h3 className="text-base sm:text-lg md:text-xl font-serif font-bold text-text mb-1 sm:mb-2">
                                    {labels[index]}
                                </h3>
                                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 max-w-[250px] mx-auto leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 mt-6 sm:mt-8">
                    {[1, 2, 3, 4].map((num) => (
                        <div key={num} className={`relative aspect-square rounded-[1.25rem] sm:rounded-[2rem] overflow-hidden shadow-lg ${num % 2 === 0 ? 'md:translate-y-8' : ''}`}>
                            <Image 
                                src={`/images/journey-${num}.png`} 
                                alt={`Journey cake ${num}`} 
                                fill 
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default JourneySection;

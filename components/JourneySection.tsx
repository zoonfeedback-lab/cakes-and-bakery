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
        <section className="py-24 bg-surface relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4">
                
                <h2 className="text-3xl md:text-5xl font-serif text-primary text-center mb-16">
                    The Journey to Your Perfect Slice
                </h2>

                <div className="relative max-w-4xl mx-auto mb-20 px-4 md:px-0">
                    <div className="absolute top-8 left-0 right-0 h-[1px] bg-gray-300 hidden md:block" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10">
                        {displaySteps.map((step, index) => (
                            <div key={step.id} className="flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full bg-grayMuted flex items-center justify-center text-primary mb-6 shadow-sm border-4 border-surface">
                                    <span className="text-2xl">{['✨', '🎨', '🛒'][index]}</span>
                                </div>
                                <h3 className="text-xl font-serif font-bold text-text mb-2">
                                    {labels[index]}
                                </h3>
                                <p className="text-sm text-gray-500 max-w-[250px] mx-auto">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    {[1, 2, 3, 4].map((num) => (
                        <div key={num} className={`relative aspect-square rounded-[2rem] overflow-hidden shadow-lg ${num % 2 === 0 ? 'md:translate-y-8' : ''}`}>
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

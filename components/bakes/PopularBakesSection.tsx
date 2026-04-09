import type { BakeProduct } from '@/types';
import BakeCard from './BakeCard';
import SectionHeading from './SectionHeading';

type PopularBakesSectionProps = Readonly<{
    items: BakeProduct[];
}>;

export const PopularBakesSection = ({ items }: PopularBakesSectionProps) => {
    return (
        <section id="popular" className="bg-surface px-4 py-20">
            <div className="mx-auto max-w-7xl">
                <SectionHeading
                    title="Most Loved Bakes"
                    subtitle="A quick way to start with the items customers reorder most often."
                />

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
                    {items.map((item) => (
                        <BakeCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularBakesSection;

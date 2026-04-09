import type { BakeCategory } from '@/types';
import BakeCard from './BakeCard';
import SectionHeading from './SectionHeading';

type BakeCategorySectionProps = Readonly<{
    category: BakeCategory;
}>;

export const BakeCategorySection = ({ category }: BakeCategorySectionProps) => {
    return (
        <section id={category.id} className="bg-surface px-4 py-16">
            <div className="mx-auto max-w-7xl">
                <SectionHeading title={category.title} subtitle={category.description} />
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {category.items.map((item) => (
                        <BakeCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BakeCategorySection;

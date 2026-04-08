import type { OptionGroup } from '@/types';
import SectionHeading from './SectionHeading';

type CustomizationSectionProps = Readonly<{
    groups: OptionGroup[];
}>;

export const CustomizationSection = ({ groups }: CustomizationSectionProps) => {
    return (
        <section id="customize" className="bg-[#f4eee8] px-4 py-20">
            <div className="mx-auto max-w-7xl">
                <SectionHeading
                    title="Customize Your Bakes"
                    subtitle="Flavor, quantity, toppings, packaging, and event details handled in one polished order flow."
                />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {groups.map((group) => (
                        <article key={group.id} className="rounded-[2rem] bg-white p-6 shadow-[0_14px_40px_rgba(109,80,96,0.08)]">
                            <h3 className="text-2xl font-serif text-primary">{group.title}</h3>
                            <div className="mt-5 space-y-3">
                                {group.options.map((option) => (
                                    <label
                                        key={option}
                                        className="flex items-center justify-between rounded-full border border-brand-border px-4 py-3 text-sm text-text-soft"
                                    >
                                        <span>{option}</span>
                                        <input type="checkbox" className="h-4 w-4 accent-[var(--primary)]" />
                                    </label>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CustomizationSection;

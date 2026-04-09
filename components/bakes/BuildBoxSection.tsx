import type { BoxSelection } from '@/types';
import SectionHeading from './SectionHeading';

type BuildBoxSectionProps = Readonly<{
    selections: BoxSelection[];
}>;

export const BuildBoxSection = ({ selections }: BuildBoxSectionProps) => {
    return (
        <section className="bg-surface px-4 py-20">
            <div className="mx-auto max-w-6xl">
                <SectionHeading
                    title="Build Your Own Box"
                    subtitle="Create a modern bakery combo with your favorite balance of brownies, cookies, and cupcakes."
                />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {selections.map((selection) => (
                        <article
                            key={selection.id}
                            className="rounded-[2rem] border border-brand-border bg-white/85 p-8 text-center shadow-[0_12px_30px_rgba(109,80,96,0.06)]"
                        >
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-serif text-white">
                                {selection.quantity}
                            </div>
                            <h3 className="mt-5 text-2xl font-serif text-primary">{selection.item}</h3>
                            <p className="body-copy mt-3 text-sm">{selection.note}</p>
                        </article>
                    ))}
                </div>

                <div className="mt-8 rounded-[2rem] bg-primary px-8 py-7 text-center text-white shadow-[0_18px_45px_rgba(109,80,96,0.16)]">
                    <p className="text-sm uppercase tracking-[0.22em] text-white/75">Suggested Combo</p>
                    <p className="mt-3 text-3xl font-serif">2 Brownies + 4 Cookies + 2 Cupcakes</p>
                    <p className="mt-3 text-sm text-white/80">Built for gifting, office sharing, or a small celebration table.</p>
                </div>
            </div>
        </section>
    );
};

export default BuildBoxSection;

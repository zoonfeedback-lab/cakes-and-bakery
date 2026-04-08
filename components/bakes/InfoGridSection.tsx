import type { InfoCard } from '@/types';

type InfoGridSectionProps = Readonly<{
    id?: string;
    title: string;
    subtitle: string;
    items: InfoCard[];
    surface?: 'default' | 'muted' | 'primary';
}>;

export const InfoGridSection = ({
    id,
    title,
    subtitle,
    items,
    surface = 'default',
}: InfoGridSectionProps) => {
    const sectionClass =
        surface === 'primary'
            ? 'bg-primary text-white'
            : surface === 'muted'
              ? 'bg-[#f4eee8]'
              : 'bg-surface';

    const cardClass =
        surface === 'primary'
            ? 'border border-white/15 bg-white/8 text-white'
            : 'border border-brand-border bg-white/85 text-text';

    return (
        <section id={id} className={`${sectionClass} px-4 py-20`}>
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto mb-12 max-w-3xl text-center">
                    <h2 className={`text-3xl md:text-5xl ${surface === 'primary' ? 'font-serif text-white' : 'section-title'}`}>
                        {title}
                    </h2>
                    <p className={`mt-3 text-sm uppercase tracking-[0.18em] ${surface === 'primary' ? 'text-white/75' : 'body-copy'}`}>
                        {subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {items.map((item) => (
                        <article
                            key={item.id}
                            className={`rounded-[2rem] p-7 text-center shadow-[0_12px_30px_rgba(109,80,96,0.06)] ${cardClass}`}
                        >
                            <h3 className={`text-2xl font-serif ${surface === 'primary' ? 'text-white' : 'text-primary'}`}>
                                {item.title}
                            </h3>
                            <p className={`mt-3 text-sm leading-relaxed ${surface === 'primary' ? 'text-white/78' : 'text-text-soft'}`}>
                                {item.description}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InfoGridSection;

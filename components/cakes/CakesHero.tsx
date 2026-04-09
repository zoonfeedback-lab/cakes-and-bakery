import Image from 'next/image';
import Link from 'next/link';
import type { CakeHeroContent } from '@/constants/cakes';

type CakesHeroProps = {
    hero: CakeHeroContent;
};

export const CakesHero = ({ hero }: CakesHeroProps) => {
    return (
        <section className="mb-8 grid gap-4 lg:grid-cols-[1.45fr_0.55fr]">
            <article className="relative overflow-hidden rounded-[34px] bg-[#e8c7d5] p-7 md:p-10">
                <div className="relative z-10 max-w-[460px] rounded-2xl bg-[#ddb8ca]/70 p-6 backdrop-blur-[1px] md:p-8">
                    <h1 className="mb-4 text-5xl font-semibold leading-[0.95] text-[#43253a] md:text-7xl">
                        Cakes for
                        <br />
                        Every
                        <br />
                        Occasion
                    </h1>
                    <p className="mb-7 max-w-[340px] text-sm leading-relaxed text-[#5f4f58] md:text-base">
                        {hero.description}
                    </p>
                    <Link
                        href={hero.primaryActionHref}
                        className="inline-flex rounded-full bg-[#6f4c62] px-7 py-3 text-sm font-medium text-white shadow-[0_8px_20px_rgba(111,76,98,0.35)] transition hover:-translate-y-0.5"
                    >
                        {hero.primaryActionLabel}
                    </Link>
                </div>

                <div className="pointer-events-none absolute inset-y-0 right-0 w-[52%] opacity-35">
                    <Image
                        alt="Decorative rose in hero"
                        className="h-full w-full object-cover"
                        fill
                        priority
                        src={hero.accentImage}
                    />
                </div>
            </article>

            <article className="relative min-h-[360px] overflow-hidden rounded-[34px]">
                <Image
                    alt="Chocolate cake close-up"
                    className="h-full w-full object-cover"
                    fill
                    priority
                    src={hero.featuredImage}
                />
            </article>
        </section>
    );
};

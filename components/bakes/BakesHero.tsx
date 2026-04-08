import Image from 'next/image';
import Link from 'next/link';

type BakesHeroProps = Readonly<{
    title: string;
    subtitle: string;
    image: string;
    primaryCta: string;
    secondaryCta: string;
}>;

export const BakesHero = ({
    title,
    subtitle,
    image,
    primaryCta,
    secondaryCta,
}: BakesHeroProps) => {
    return (
        <section className="relative overflow-hidden bg-surface px-4 pt-8 pb-14 md:pt-12 md:pb-18">
            <div className="absolute inset-0">
                <Image
                    src={image}
                    alt="Fresh bakes assortment"
                    fill
                    priority
                    className="object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(248,245,241,0.22),rgba(248,245,241,0.9)_58%,rgba(248,245,241,0.98)_100%)]" />
            </div>

            <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
                <p className="script-overlay text-4xl opacity-70 md:text-6xl">Bakes Collection</p>
                <h1 className="section-title mt-2 max-w-4xl text-4xl md:text-6xl">{title}</h1>
                <p className="body-copy mt-5 max-w-2xl text-base md:text-lg">{subtitle}</p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <Link href="#popular" className="btn-primary">
                        {primaryCta}
                    </Link>
                    <Link href="#customize" className="btn-secondary">
                        {secondaryCta}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BakesHero;

import Image from 'next/image';

type HeroProps = Readonly<{
    onOrderClick?: () => void;
}>;

export const HeroSection = ({ onOrderClick }: HeroProps) => {
    return (
        <section className="relative w-full overflow-hidden bg-surface pt-3 pb-12 md:pt-5 md:pb-16">
            <div className="absolute inset-0">
                <Image
                    src="/images/hero-cake.png"
                    alt="Signature Artisan Cake"
                    fill
                    priority
                    className="object-cover object-center opacity-22"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(248,245,241,0.1),rgba(248,245,241,0.88)_55%,rgba(248,245,241,0.96)_100%)]" />
            </div>

            <div className="script-overlay absolute left-1/2 top-4 z-10 w-full -translate-x-1/2 text-center text-4xl opacity-70 md:top-6 md:text-6xl">
                Signature Work
            </div>

            <div className="relative z-10 mx-auto flex min-h-[470px] max-w-5xl items-center justify-center px-4 text-center md:min-h-[540px]">
                <div className="flex max-w-3xl flex-col items-center pt-4 md:pt-8">
                    <h1 className="section-title text-4xl text-text leading-[0.98] md:text-6xl">
                        Crafting{' '}
                        <span className="script-blush text-5xl align-middle md:text-7xl">
                            Sweet
                        </span>
                        <span className="script-gold text-5xl align-middle md:text-7xl">
                            {' '}Work
                        </span>
                        <br />
                        <span className="text-primary">Moments for Every</span>
                        <br />
                        <span className="text-primary">Celebration</span>
                    </h1>

                    <p className="body-copy mt-4 max-w-xl text-sm tracking-wide md:text-[0.95rem]">
                        Custom cakes, delicious bakes, and unforgettable birthdays. Where artisanal craftsmanship meets your most cherished memories.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
                        <button
                            onClick={onOrderClick}
                            className="btn-primary"
                        >
                            Customize Cake
                        </button>
                        <button className="btn-secondary">
                            Explore Menu
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;

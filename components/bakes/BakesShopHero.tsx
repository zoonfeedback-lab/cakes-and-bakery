import Image from 'next/image';
import Link from 'next/link';

type BakesShopHeroProps = Readonly<{
    title: string;
    subtitle: string;
    image: string;
}>;

export const BakesShopHero = ({ title, subtitle, image }: BakesShopHeroProps) => {
    return (
        <section className="px-4 pt-6 pb-8 sm:pt-8 sm:pb-10">
            <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[1.5rem] sm:rounded-[2.25rem] bg-[#f1d6df] shadow-[0_18px_55px_rgba(109,80,96,0.08)] md:grid-cols-[1.45fr_0.55fr]">
                <div className="relative min-h-[260px] overflow-hidden px-5 py-8 sm:min-h-[300px] sm:px-8 sm:py-10 md:min-h-[340px] md:px-12 md:py-12">
                    <div className="absolute inset-y-0 left-[28%] w-px bg-white/35 hidden sm:block" />
                    <div className="absolute inset-y-0 left-[62%] w-px bg-white/20 hidden sm:block" />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(111,80,96,0.08),rgba(255,255,255,0.08),rgba(111,80,96,0.05))]" />
                    <div className="absolute inset-y-0 right-0 w-[48%]">
                        <Image
                            src={image}
                            alt="Bakes collection"
                            fill
                            className="object-cover opacity-25"
                        />
                    </div>

                    <div className="relative z-10 flex h-full flex-col">
                        <div className="max-w-sm">
                            <h1 className="section-title text-3xl leading-[0.92] sm:text-4xl md:text-5xl lg:text-6xl">{title}</h1>
                            <p className="body-copy mt-4 text-sm sm:mt-6 sm:text-base">
                                {subtitle}
                            </p>
                        </div>

                        <div className="mt-6 sm:mt-8 flex sm:w-[28%] sm:min-w-[320px] justify-start sm:justify-center">
                            <Link href="#bakes-grid" className="btn-primary inline-flex w-full justify-center sm:w-auto sm:min-w-[190px]">
                                Explore Collection
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="relative min-h-[220px] bg-[#f8f5f1] sm:min-h-[280px] md:min-h-[340px]">
                    <div className="absolute inset-y-0 left-[-32px] z-10 hidden w-16 rotate-[8deg] bg-[#f8f5f1] md:block" />
                    <div className="relative h-full min-h-[220px] overflow-hidden sm:min-h-[280px] md:min-h-[340px] md:rounded-l-[2rem]">
                        <Image
                            src="/images/salted-caramel.png"
                            alt="Signature bakery item"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BakesShopHero;

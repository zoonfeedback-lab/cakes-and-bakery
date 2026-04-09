'use client';

import Image from 'next/image';
import Link from 'next/link';

type CakeHeroProps = Readonly<{
  title: string;
  subtitle: string;
  image1: string;
  image2: string;
}>;

export const CakeHero = ({ title, subtitle, image1, image2 }: CakeHeroProps) => {
  return (
    <section className="px-4 pb-10 pt-8">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2.25rem] bg-[#f1d6df] shadow-[0_18px_55px_rgba(109,80,96,0.08)] md:grid-cols-[1.45fr_0.55fr]">
        <div className="relative min-h-[340px] overflow-hidden px-10 py-10 md:px-12 md:py-12">
          {/* Decorative Elements */}
          <div className="absolute inset-y-0 left-[28%] w-px bg-white/35" />
          <div className="absolute inset-y-0 left-[62%] w-px bg-white/20" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(111,80,96,0.08),rgba(255,255,255,0.08),rgba(111,80,96,0.05))]" />
          
          <div className="absolute inset-y-0 right-0 w-[48%]">
            <Image
              src={image1}
              alt="Cakes collection overlay"
              fill
              className="object-cover opacity-25"
            />
          </div>

          <div className="relative z-10 flex h-full flex-col">
            <div className="max-w-sm">
              <h1 className="section-title text-5xl leading-[0.92] md:text-6xl">
                {title}
              </h1>
              <p className="body-copy mt-6 text-base text-[#5f4f58]">
                {subtitle}
              </p>
            </div>

            <div className="mt-8 flex w-[28%] min-w-[320px] justify-center">
              <Link
                href="#cakes-grid"
                className="btn-primary inline-flex min-w-[190px] justify-center"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </div>

        <div className="relative min-h-[340px] bg-[#f8f5f1]">
          {/* Diagonal Peeling Effect */}
          <div className="absolute inset-y-0 left-[-32px] z-10 hidden w-16 rotate-[8deg] bg-[#f8f5f1] md:block" />
          <div className="relative h-full min-h-[340px] overflow-hidden md:rounded-l-[2rem]">
            <Image
              src={image2}
              alt="Signature cake showcase"
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

export default CakeHero;

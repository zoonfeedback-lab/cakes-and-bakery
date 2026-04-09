import Link from 'next/link';
import SectionHeading from './SectionHeading';

export const BakesFinalCta = () => {
    return (
        <section className="bg-[#f4eee8] px-4 py-20">
            <div className="mx-auto max-w-4xl rounded-[2.5rem] bg-white px-8 py-12 text-center shadow-[0_18px_45px_rgba(109,80,96,0.08)] md:px-14">
                <SectionHeading
                    title="Freshly baked happiness delivered to your door"
                    subtitle="From quick cravings to curated gift boxes, we make ordering simple and celebration-ready."
                />

                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link href="#popular" className="btn-primary">
                        Order Now
                    </Link>
                    <Link href="#customize" className="btn-secondary">
                        Customize Box
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BakesFinalCta;

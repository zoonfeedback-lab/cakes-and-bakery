import Link from 'next/link';

export const BakesCtaBanner = () => {
    return (
        <section className="px-4 py-16">
            <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-[2.4rem] bg-[radial-gradient(circle_at_top_right,#d8f1cb,transparent_36%),linear-gradient(135deg,#d6efcb,#edf5dd)] px-10 py-12 md:flex-row md:items-center md:px-14">
                <div className="max-w-2xl">
                    <h2 className="text-4xl font-serif text-[#37503d] md:text-5xl">Can&apos;t find your bake?</h2>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-[#5f6b5d]">
                        Our master bakers can turn your wildest imagination into a delicious reality. Let&apos;s create something unique.
                    </p>
                </div>

                <Link href="#bakes-grid" className="btn-primary inline-flex min-w-[220px] justify-center">
                    Design Custom Box
                </Link>
            </div>
        </section>
    );
};

export default BakesCtaBanner;

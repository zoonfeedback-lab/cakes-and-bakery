import Link from 'next/link';

export const BakesCtaBanner = () => {
    return (
        <section className="px-4 py-10 sm:py-16">
            <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 rounded-[1.5rem] bg-[radial-gradient(circle_at_top_right,#d8f1cb,transparent_36%),linear-gradient(135deg,#d6efcb,#edf5dd)] px-5 py-8 sm:gap-8 sm:rounded-[2.4rem] sm:px-10 sm:py-12 md:flex-row md:items-center md:px-14">
                <div className="max-w-2xl">
                    <h2 className="text-2xl font-serif text-[#37503d] sm:text-4xl md:text-5xl">Can&apos;t find your bake?</h2>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#5f6b5d] sm:mt-4 sm:text-base">
                        Our master bakers can turn your wildest imagination into a delicious reality. Let&apos;s create something unique.
                    </p>
                </div>

                <Link href="/custom?type=box" className="btn-primary inline-flex w-full justify-center sm:w-auto sm:min-w-[220px]">
                    Design Custom Box
                </Link>
            </div>
        </section>
    );
};

export default BakesCtaBanner;

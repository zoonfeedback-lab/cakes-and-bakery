import Link from 'next/link';

export const CakeCtaBanner = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="flex flex-col gap-8 rounded-[32px] bg-[#d6f0ce] px-7 py-10 md:flex-row md:items-center md:justify-between md:px-10 lg:px-14">
        <div>
          <h2 className="mb-3 text-5xl font-semibold text-[#2f4731] md:text-6xl">
            Can&apos;t find your cake?
          </h2>
          <p className="max-w-[540px] text-base text-[#4f6452] md:text-lg">
            Our master bakers can turn your wildest imagination into a delicious reality.
            Let&apos;s create something unique.
          </p>
        </div>
        <Link
          href="/studio"
          className="rounded-full bg-[#6f4c62] px-8 py-4 text-sm font-medium text-white shadow-[0_9px_20px_rgba(111,76,98,0.35)] transition hover:-translate-y-0.5 text-center"
        >
          Design Custom Cake
        </Link>
      </div>
    </section>
  );
};

export default CakeCtaBanner;

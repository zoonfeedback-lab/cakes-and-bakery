import { Footer } from "@/components";
import { Header } from "@/components/Header";
import Image from "next/image";

type CakeItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

const topCategories = ["All", "Chocolate", "Red Velvet", "Vanilla", "Photo Cake", "Wedding Cake"];

const sizeOptions = ["4\" Bento Cake", "6\" Standard", "8\" Celebration", "Tiered Artistry"];

const occasions = ["Birthday", "Wedding", "Anniversary", "Graduation"];

const cakes: CakeItem[] = [
  {
    id: "royal-velvet",
    name: "Royal Velvet",
    price: 64,
    image: "/images/velvet-rose.png",
    description: "Deep cocoa infused with crimson elegance and silky smooth cream cheese.",
  },
  {
    id: "citrus-bloom",
    name: "Citrus Bloom",
    price: 48,
    image: "/images/daily-bakes.png",
    description: "Zesty lemon sponge layered with citrus curd and whipped mascarpone.",
  },
  {
    id: "midnight-ganache",
    name: "Midnight Ganache",
    price: 72,
    image: "/images/celestial.png",
    description: "Rich chocolate infusion with 70% dark Belgian ganache and sea salt flakes.",
  },
  {
    id: "summer-berry",
    name: "Summer Berry",
    price: 55,
    image: "/images/birthday-cake.png",
    description: "Light vanilla sponge with locally sourced berries and chantilly cream.",
  },
  {
    id: "ivory-orchid",
    name: "Ivory Orchid",
    price: 240,
    image: "/images/signature-cake.png",
    description: "A two-tiered architectural masterpiece with almond and honey notes.",
  },
  {
    id: "caramel-drift",
    name: "Caramel Drift",
    price: 58,
    image: "/images/salted-caramel.png",
    description: "Dense coffee cake with burnt caramel glaze and sea salt crunch.",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f5f3ef] text-[#2d242a]">
      <Header />

      <main className="flex-1">
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-8 md:px-8 lg:px-10">

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
                Meticulously crafted with the finest ingredients and a touch of artistic flourish for your most
                cherished moments.
              </p>
              <button
                className="rounded-full bg-[#6f4c62] px-7 py-3 text-sm font-medium text-white shadow-[0_8px_20px_rgba(111,76,98,0.35)] transition hover:-translate-y-0.5"
                type="button"
              >
                Explore Collection
              </button>
            </div>

            <div className="pointer-events-none absolute inset-y-0 right-0 w-[52%] opacity-35">
              <Image
                alt="Decorative rose in hero"
                className="h-full w-full object-cover"
                fill
                priority
                src="/images/hero-cake.png"
              />
            </div>
          </article>

          <article className="relative min-h-[360px] overflow-hidden rounded-[34px]">
            <Image alt="Chocolate cake close-up" className="h-full w-full object-cover" fill priority src="/images/salted-caramel.png" />
          </article>
        </section>

        <section className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div className="flex flex-wrap items-center gap-2">
            {topCategories.map((category, index) => (
              <button
                className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                  index === 0
                    ? "bg-[#6f4c62] text-white"
                    : "bg-[#ece5db] text-[#5e5058] hover:bg-[#e4dacd]"
                }`}
                key={category}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>

          <button
            className="inline-flex w-fit items-center gap-2 rounded-full bg-[#f0ece5] px-4 py-2 text-sm text-[#695a63]"
            type="button"
          >
            Sort by
            <span className="font-medium">Popularity</span>
            <span aria-hidden="true">v</span>
          </button>
        </section>

        <div className="grid gap-7 lg:grid-cols-[260px_1fr]">
          <aside className="lg:pt-2">
            <div className="mb-8">
              <h2 className="mb-4 text-3xl font-semibold text-[#3f2f3a]">Price Range</h2>
              <div className="relative mb-3 h-1.5 rounded-full bg-[#dfd7cd]">
                <span className="absolute left-[52%] top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6f4c62]" />
              </div>
              <div className="flex justify-between text-sm text-[#776b71]">
                <span>$20</span>
                <span>$500+</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="mb-4 text-3xl font-semibold text-[#3f2f3a]">Cake Size</h2>
              <div className="space-y-3 text-[#60515b]">
                {sizeOptions.map((size, index) => (
                  <label className="flex items-center gap-3 text-sm" key={size}>
                    <span
                      className={`grid h-4 w-4 place-items-center rounded-full border ${
                        index === 1 ? "border-[#6f4c62]" : "border-[#cabeb6]"
                      }`}
                    >
                      {index === 1 ? <span className="h-2 w-2 rounded-full bg-[#6f4c62]" /> : null}
                    </span>
                    <span>{size}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-3xl font-semibold text-[#3f2f3a]">Occasion</h2>
              <div className="flex flex-wrap gap-2">
                {occasions.map((occasion) => (
                  <button
                    className="rounded-full bg-[#ece5db] px-3 py-1.5 text-xs text-[#62555c] transition hover:bg-[#dfd5c7]"
                    key={occasion}
                    type="button"
                  >
                    {occasion}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {cakes.map((cake) => (
              <article className="rounded-[28px] border border-[#e8dfd4] bg-[#f8f6f2] p-4 shadow-sm" key={cake.id}>
                <div className="relative mb-4 aspect-[0.9] overflow-hidden rounded-[24px]">
                  <Image alt={cake.name} className="h-full w-full object-cover" fill src={cake.image} />
                </div>
                <div className="mb-2 flex items-start justify-between gap-3">
                  <h3 className="text-4xl font-semibold leading-tight text-[#2e222a]">{cake.name}</h3>
                  <span className="pt-1 text-sm text-[#473c43]">${cake.price}</span>
                </div>
                <p className="mb-5 min-h-[68px] text-sm leading-relaxed text-[#6b5c65]">{cake.description}</p>
                <button
                  className="w-full rounded-full border border-[#44323e] px-5 py-2.5 text-sm text-[#3d2e38] transition hover:bg-[#f1ece5]"
                  type="button"
                >
                  Customize
                </button>
              </article>
            ))}
          </section>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            className="rounded-full bg-[#ece9e3] px-7 py-3 text-sm text-[#665a61] transition hover:bg-[#e1ddd6]"
            type="button"
          >
            Load More Pastries
          </button>
        </div>

        <section className="mt-16 flex flex-col gap-8 rounded-[32px] bg-[#d6f0ce] px-7 py-10 md:flex-row md:items-center md:justify-between md:px-10 lg:px-14">
          <div>
            <h2 className="mb-3 text-5xl font-semibold text-[#2f4731] md:text-6xl">Can&apos;t find your cake?</h2>
            <p className="max-w-[540px] text-base text-[#4f6452] md:text-lg">
              Our master bakers can turn your wildest imagination into a delicious reality. Let&apos;s create something
              unique.
            </p>
          </div>
          <button
            className="rounded-full bg-[#6f4c62] px-8 py-4 text-sm font-medium text-white shadow-[0_9px_20px_rgba(111,76,98,0.35)] transition hover:-translate-y-0.5"
            type="button"
          >
            Design Custom Cake
          </button>
        </section>
      </div>
      </main>

      <Footer />
    </div>
  );
}

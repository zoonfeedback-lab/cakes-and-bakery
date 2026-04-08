'use client';

import Image from 'next/image';
import { useDeferredValue, useMemo, useState } from 'react';

type CakeItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: 'chocolate' | 'red-velvet' | 'vanilla' | 'photo-cake' | 'wedding-cake';
  sizeOptions: string[];
  occasions: string[];
  tags?: string[];
};

type CategoryPill = {
  id: string;
  label: string;
};

const categoryPills: CategoryPill[] = [
  { id: 'all', label: 'All' },
  { id: 'chocolate', label: 'Chocolate' },
  { id: 'red-velvet', label: 'Red Velvet' },
  { id: 'vanilla', label: 'Vanilla' },
  { id: 'photo-cake', label: 'Photo Cake' },
  { id: 'wedding-cake', label: 'Wedding Cake' },
];

const sizeOptions = ['4" Bento Cake', '6" Standard', '8" Celebration', 'Tiered Artistry'];
const occasionOptions = ['Birthday', 'Wedding', 'Anniversary', 'Graduation'];
const sortOptions = ['Popularity', 'Newest', 'Price Low to High'];
const INITIAL_VISIBLE_COUNT = 6;

const cakes: CakeItem[] = [
  {
    id: 'royal-velvet',
    name: 'Royal Velvet',
    price: 64,
    image: '/images/velvet-rose.png',
    description: 'Deep cocoa infused with crimson elegance and silky smooth cream cheese.',
    category: 'red-velvet',
    sizeOptions: ['6" Standard', '8" Celebration'],
    occasions: ['Birthday', 'Anniversary'],
    tags: ['Most Loved'],
  },
  {
    id: 'citrus-bloom',
    name: 'Citrus Bloom',
    price: 48,
    image: '/images/daily-bakes.png',
    description: 'Zesty lemon sponge layered with citrus curd and whipped mascarpone.',
    category: 'vanilla',
    sizeOptions: ['4" Bento Cake', '6" Standard'],
    occasions: ['Birthday', 'Graduation'],
  },
  {
    id: 'midnight-ganache',
    name: 'Midnight Ganache',
    price: 72,
    image: '/images/celestial.png',
    description: 'Rich chocolate infusion with 70% dark Belgian ganache and sea salt flakes.',
    category: 'chocolate',
    sizeOptions: ['6" Standard', '8" Celebration'],
    occasions: ['Wedding', 'Anniversary'],
    tags: ['Best Seller'],
  },
  {
    id: 'summer-berry',
    name: 'Summer Berry',
    price: 55,
    image: '/images/birthday-cake.png',
    description: 'Light vanilla sponge with locally sourced berries and chantilly cream.',
    category: 'vanilla',
    sizeOptions: ['4" Bento Cake', '6" Standard'],
    occasions: ['Birthday', 'Graduation'],
  },
  {
    id: 'ivory-orchid',
    name: 'Ivory Orchid',
    price: 240,
    image: '/images/signature-cake.png',
    description: 'A two-tiered architectural masterpiece with almond and honey notes.',
    category: 'wedding-cake',
    sizeOptions: ['Tiered Artistry'],
    occasions: ['Wedding', 'Anniversary'],
    tags: ['Best Seller', 'Most Loved'],
  },
  {
    id: 'caramel-drift',
    name: 'Caramel Drift',
    price: 58,
    image: '/images/salted-caramel.png',
    description: 'Dense coffee cake with burnt caramel glaze and sea salt crunch.',
    category: 'chocolate',
    sizeOptions: ['6" Standard', '8" Celebration'],
    occasions: ['Anniversary', 'Graduation'],
  },
  {
    id: 'pixel-party',
    name: 'Pixel Party',
    price: 84,
    image: '/images/hero-cake.png',
    description: 'Custom edible photo print cake with buttercream frame and confetti texture.',
    category: 'photo-cake',
    sizeOptions: ['6" Standard', '8" Celebration'],
    occasions: ['Birthday', 'Graduation'],
    tags: ['Custom'],
  },
  {
    id: 'gold-ribbon',
    name: 'Gold Ribbon',
    price: 132,
    image: '/images/journey-1.png',
    description: 'Floral fondant styling with smooth vanilla sponge for elegant gatherings.',
    category: 'wedding-cake',
    sizeOptions: ['8" Celebration', 'Tiered Artistry'],
    occasions: ['Wedding', 'Anniversary'],
  },
  {
    id: 'crimson-frost',
    name: 'Crimson Frost',
    price: 68,
    image: '/images/journey-2.png',
    description: 'Classic red velvet layers with whipped cream cheese and berry glaze.',
    category: 'red-velvet',
    sizeOptions: ['6" Standard', '8" Celebration'],
    occasions: ['Birthday', 'Wedding'],
  },
];

export default function CakesPage() {
  const maxPrice = useMemo(() => Math.max(...cakes.map((cake) => cake.price)), []);

  const [activePill, setActivePill] = useState('all');
  const [activeSort, setActiveSort] = useState(sortOptions[0]);
  const [priceCap, setPriceCap] = useState(maxPrice);
  const [selectedSize, setSelectedSize] = useState(sizeOptions[1]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const deferredPill = useDeferredValue(activePill);
  const deferredSort = useDeferredValue(activeSort);
  const deferredPriceCap = useDeferredValue(priceCap);
  const deferredSize = useDeferredValue(selectedSize);
  const deferredOccasions = useDeferredValue(selectedOccasions);

  const filteredCakes = useMemo(() => {
    return cakes
      .filter((cake) => {
        if (deferredPill === 'all') return true;
        return cake.category === deferredPill;
      })
      .filter((cake) => cake.price <= deferredPriceCap)
      .filter((cake) => {
        if (!deferredSize) return true;
        return cake.sizeOptions.includes(deferredSize);
      })
      .filter((cake) => {
        if (deferredOccasions.length === 0) return true;
        return deferredOccasions.every((occasion) => cake.occasions.includes(occasion));
      })
      .sort((left, right) => {
        if (deferredSort === 'Price Low to High') return left.price - right.price;

        if (deferredSort === 'Newest') return right.id.localeCompare(left.id);

        const leftScore = (left.tags?.includes('Best Seller') ? 2 : 0) + (left.tags?.includes('Most Loved') ? 2 : 0);
        const rightScore = (right.tags?.includes('Best Seller') ? 2 : 0) + (right.tags?.includes('Most Loved') ? 2 : 0);

        return rightScore - leftScore;
      });
  }, [deferredOccasions, deferredPill, deferredPriceCap, deferredSize, deferredSort]);

  const visibleCakes = filteredCakes.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredCakes.length;

  function handlePillChange(pill: string) {
    setActivePill(pill);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }

  function handleSortChange(sort: string) {
    setActiveSort(sort);
  }

  function handlePriceChange(value: number) {
    setPriceCap(value);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }

  function handleSizeChange(size: string) {
    setSelectedSize(size);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }

  function handleOccasionToggle(occasion: string) {
    setSelectedOccasions((current) =>
      current.includes(occasion)
        ? current.filter((value) => value !== occasion)
        : [...current, occasion],
    );
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }

  function handleLoadMore() {
    setVisibleCount((current) => current + 3);
  }

  return (
    <div className="bg-[#f5f3ef] text-[#2d242a]">
      <div className="mx-auto max-w-[1200px] px-5 pb-12 pt-8 md:px-8 lg:px-10">
        <header className="mb-10 flex flex-col items-center gap-4">
          <p className="text-center font-serif text-4xl text-[#4a2f40]">Central Cakes</p>
          <nav className="flex items-center gap-7 text-sm text-[#6f5f66]">
            <a className="border-b border-[#4a2f40] pb-1 text-[#4a2f40]" href="#">
              Cakes
            </a>
            <a className="hover:text-[#4a2f40]" href="/bakes">
              Bakes
            </a>
            <a className="hover:text-[#4a2f40]" href="#">
              Birthdays
            </a>
          </nav>
        </header>

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
            <Image
              alt="Chocolate cake close-up"
              className="h-full w-full object-cover"
              fill
              priority
              src="/images/salted-caramel.png"
            />
          </article>
        </section>

        <section className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div className="flex flex-wrap items-center gap-2">
            {categoryPills.map((pill) => (
              <button
                className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                  activePill === pill.id
                    ? 'bg-[#6f4c62] text-white'
                    : 'bg-[#ece5db] text-[#5e5058] hover:bg-[#e4dacd]'
                }`}
                key={pill.id}
                onClick={() => handlePillChange(pill.id)}
                type="button"
              >
                {pill.label}
              </button>
            ))}
          </div>

          <label className="inline-flex w-fit items-center gap-2 rounded-full bg-[#f0ece5] px-4 py-2 text-sm text-[#695a63]">
            <span>Sort by</span>
            <select
              className="bg-transparent font-medium text-[#564752] outline-none"
              onChange={(event) => handleSortChange(event.target.value)}
              value={activeSort}
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </section>

        <div className="grid gap-7 lg:grid-cols-[260px_1fr]">
          <aside className="lg:pt-2">
            <div className="mb-8">
              <h2 className="mb-4 text-3xl font-semibold text-[#3f2f3a]">Price Range</h2>
              <input
                type="range"
                min={20}
                max={maxPrice}
                step={1}
                value={priceCap}
                onChange={(event) => handlePriceChange(Number(event.target.value))}
                className="mb-3 h-1.5 w-full cursor-pointer accent-[#6f4c62]"
              />
              <div className="flex justify-between text-sm text-[#776b71]">
                <span>$20</span>
                <span>${priceCap}+</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="mb-4 text-3xl font-semibold text-[#3f2f3a]">Cake Size</h2>
              <div className="space-y-3 text-[#60515b]">
                {sizeOptions.map((size) => (
                  <label className="flex items-center gap-3 text-sm" key={size}>
                    <button
                      type="button"
                      onClick={() => handleSizeChange(size)}
                      className={`grid h-4 w-4 place-items-center rounded-full border ${
                        selectedSize === size ? 'border-[#6f4c62]' : 'border-[#cabeb6]'
                      }`}
                    >
                      {selectedSize === size ? <span className="h-2 w-2 rounded-full bg-[#6f4c62]" /> : null}
                    </button>
                    <span>{size}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-3xl font-semibold text-[#3f2f3a]">Occasion</h2>
              <div className="flex flex-wrap gap-2">
                {occasionOptions.map((occasion) => (
                  <button
                    className={`rounded-full px-3 py-1.5 text-xs transition ${
                      selectedOccasions.includes(occasion)
                        ? 'bg-[#6f4c62] text-white'
                        : 'bg-[#ece5db] text-[#62555c] hover:bg-[#dfd5c7]'
                    }`}
                    key={occasion}
                    onClick={() => handleOccasionToggle(occasion)}
                    type="button"
                  >
                    {occasion}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {visibleCakes.map((cake) => (
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

            {visibleCakes.length === 0 ? (
              <div className="col-span-full rounded-2xl border border-dashed border-[#d3c8be] bg-[#f8f6f2] p-8 text-center text-[#6b5c65]">
                No cakes match the current filters. Try a higher price cap or fewer occasion filters.
              </div>
            ) : null}
          </section>
        </div>

        <div className="mt-10 flex justify-center">
          {canLoadMore ? (
            <button
              className="rounded-full bg-[#ece9e3] px-7 py-3 text-sm text-[#665a61] transition hover:bg-[#e1ddd6]"
              onClick={handleLoadMore}
              type="button"
            >
              Load More Pastries
            </button>
          ) : null}
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

      <footer className="mt-10 bg-[#ebe8e3]">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-11 md:grid-cols-4 md:px-8 lg:px-10">
          <div>
            <h3 className="mb-3 text-3xl font-semibold text-[#3f2d38]">Central Cakes</h3>
            <p className="text-sm leading-relaxed text-[#6f646a]">
              Artisan cakes crafted with passion in the heart of the flourished gallery. Elevating your celebrations
              since 2012.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[#6c5f66]">Explore</p>
            <ul className="space-y-2 text-sm text-[#4f4249]">
              <li>Our Story</li>
              <li>Gallery</li>
              <li>Workshops</li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[#6c5f66]">Support</p>
            <ul className="space-y-2 text-sm text-[#4f4249]">
              <li>Contact Us</li>
              <li>Shipping Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[#6c5f66]">Connect</p>
            <div className="mb-4 flex gap-3 text-[#5d5157]">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white">*</span>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white">+</span>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white">#</span>
            </div>
            <p className="text-xs text-[#7f747a]">2026 Central Cakes. Crafted for the Flourished Gallery.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

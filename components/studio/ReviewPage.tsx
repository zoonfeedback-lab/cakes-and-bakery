'use client';

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { CAKE_SHOP_ITEMS } from '@/constants/cakes';
import { BAKES_SHOP_ITEMS } from '@/constants/bakes';
import { DEFAULT_STUDIO_CAKE, STUDIO_FILLINGS, STUDIO_FINISHES, STUDIO_SPONGES } from '@/constants/studio';

export const ReviewPage = () => {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading Selection...</div>}>
      <ReviewContent />
    </Suspense>
  );
};

const ReviewContent = () => {
  const searchParams = useSearchParams();
  const cakeName = searchParams.get('cake');
  const cakeId = searchParams.get('cake');
  const bakeId = searchParams.get('bake');
  
  // Cake Params
  const spongeId = searchParams.get('sponge');
  const fillingId = searchParams.get('filling');
  const finishId = searchParams.get('finish');
  
  // Bake Params
  const flavorParam = searchParams.get('flavor');
  const quantityParam = searchParams.get('quantity');
  const boxTypeParam = searchParams.get('boxType');
  const addonsParam = searchParams.get('addons');
  
  // Bespoke Params
  const isBespoke = searchParams.get('type') === 'bespoke';
  const occasionParam = searchParams.get('occasion');
  const tiersParam = searchParams.get('tiers');
  const paletteParam = searchParams.get('palette');

  // Box Params
  const isBox = searchParams.get('type') === 'box';
  const customBoxSize = searchParams.get('boxSize');
  const boxAssortment = searchParams.get('assortment');
  const boxPackaging = searchParams.get('packaging');

  const message = searchParams.get('msg');

  // Resolve selections
  let selectedItem;
  let isBake = false;

  if (isBespoke) {
    selectedItem = {
      ...DEFAULT_STUDIO_CAKE,
      name: 'Atelier Bespoke Commission',
      image: '/images/signature-cake.png'
    };
  } else if (isBox) {
    selectedItem = {
      ...DEFAULT_STUDIO_CAKE,
      name: 'Custom Assortment Box',
      image: '/images/royal-velvet.png' // General bakes image
    };
  } else if (bakeId) {
    selectedItem = BAKES_SHOP_ITEMS.find((b) => b.id === bakeId) || BAKES_SHOP_ITEMS[0];
    isBake = true;
  } else {
    selectedItem = CAKE_SHOP_ITEMS.find((c) => c.name === cakeName || c.id === cakeId) || DEFAULT_STUDIO_CAKE;
  }

  const sponge = STUDIO_SPONGES.find((s) => s.id === spongeId) || STUDIO_SPONGES[0];
  const filling = STUDIO_FILLINGS.find((f) => f.id === fillingId) || STUDIO_FILLINGS[0];
  const finish = STUDIO_FINISHES.find((f) => f.id === finishId) || STUDIO_FINISHES[0];
  
  const bakeFlavor = flavorParam || 'Signature Sweet';
  const bakeQuantity = quantityParam || 'Standard Box';
  const bakeBox = boxTypeParam || 'Classic Box';
  const bakeAddons = addonsParam ? addonsParam.split(',').join(', ') : 'None';

  const bespokeOccasion = occasionParam || 'Custom Event';
  const bespokeTiers = tiersParam || 'Three-Tier Grand';
  const bespokePalette = paletteParam || 'Studio Palette';

  const boxSizeResolved = customBoxSize || 'Box of 8';
  const boxPricingMatrix: Record<string, number> = {
    'Box of 8': 2800,
    'Box of 16': 5600,
    'Box of 24': 8400,
  };

  const subtotal = isBespoke ? 20000 : isBox ? boxPricingMatrix[boxSizeResolved] || 4500 : selectedItem.price;
  const calligraphyFee = isBespoke ? 0 : isBox ? 300 : isBake ? 500 : 3500;
  const deliveryFee = isBespoke ? 0 : 1200;
  const total = subtotal + calligraphyFee + deliveryFee;

  return (
    <main className="min-h-screen bg-[#FDFCFB] px-4 py-12 md:px-8 lg:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <header className="mb-12 text-center">
          <h1 className="font-serif text-5xl italic text-[#4a2b3d] md:text-6xl">
            Review Your Selection
          </h1>
          <p className="mt-4 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[#8b7a6a]">
            Central Cakes Bespoke Experience
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left Column: Preview & Message */}
          <div className="space-y-8">
            <div className="relative aspect-[0.9] w-full overflow-hidden rounded-[2rem] shadow-xl">
              <Image
                src={selectedItem.image}
                alt="Your Bespoke Selection"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-10 right-[-20px] z-10 w-[240px] rounded-xl bg-white p-6 shadow-2xl">
                <p className="font-serif text-[0.85rem] italic leading-relaxed text-[#4a2b3d]">
                  &ldquo;A creation as unique as the celebration it honours.&rdquo;
                </p>
              </div>
            </div>

            <section className="rounded-2xl bg-[#f8f5f1] p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[#b31429]">
                  Calligraphy Message
                </span>
                <div className="h-px flex-1 bg-[#d3c8be]/40" />
              </div>
              <div className="relative">
                <p className="font-serif text-3xl text-[#4a2b3d]">
                  {message || 'No message provided'}
                </p>
                <p className="mt-4 text-[0.55rem] font-bold uppercase tracking-widest text-[#9a8a7a]">
                  Script: Traditional Nasta&apos;liq Style
                </p>
                {/* Decorative pen icon replacement */}
                <div className="absolute top-[-10px] right-0 opacity-20 transform rotate-12">
                   <span className="text-4xl text-[#4a2b3d]">✒</span>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Details & Pricing */}
          <div className="flex flex-col">
            <div className="mb-10 flex items-center gap-6">
              <div className="flex-1 border-t border-[#d3c8be]/40" />
              <h2 className="font-serif text-3xl italic text-[#4a2b3d]">
                {selectedItem.name}
              </h2>
              <div className="flex-1 border-t border-[#d3c8be]/40" />
            </div>

            {/* Selections Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <SelectionCard 
                label={isBespoke ? "Occasion" : isBox ? "Box Size" : isBake ? "Primary Flavor" : "Sponge Base"} 
                value={isBespoke ? bespokeOccasion : isBox ? boxSizeResolved : isBake ? bakeFlavor : sponge.label} 
                icon={isBespoke ? "✨" : isBox ? "📦" : "📊"} 
              />
              <SelectionCard 
                label={isBespoke ? "Architecture" : isBox ? "Assortment Details" : isBake ? "Volume" : "Gourmet Filling"} 
                value={isBespoke ? bespokeTiers : isBox ? (boxAssortment || 'Surprise Me') : isBake ? bakeQuantity : filling.label} 
                icon={isBespoke ? "🎂" : isBox ? "🍰" : "✨"} 
              />
              <SelectionCard 
                label={isBespoke ? "Color Palette" : isBox ? "Box Style" : isBake ? "Box Style" : "Exterior Finish"} 
                value={isBespoke ? bespokePalette : isBox ? (boxPackaging || 'Classic Ribbon') : isBake ? bakeBox : finish.label} 
                icon={isBespoke ? "🎨" : isBox ? "🎁" : isBake ? "🎁" : "✨"} 
              />
              <SelectionCard 
                label={isBespoke ? "Design Notes" : isBox ? "Extras" : isBake ? "Extras" : "Dimensions"} 
                value={isBespoke ? (message ? (message.substring(0, 20) + (message.length > 20 ? '...' : '')) : 'No notes provided') : isBox ? (message || 'No note') : isBake ? bakeAddons : ('dimensions' in selectedItem ? selectedItem.dimensions : 'Standard Tier (Serves 12-15)')} 
                icon="📝" 
              />
            </div>

            {/* Pricing Section */}
            <section className="mt-12 space-y-4 rounded-2xl border border-[#d3c8be]/30 bg-[#f8f5f1]/30 p-8">
              {isBespoke ? (
                <>
                  <div className="flex justify-between text-[0.85rem] text-[#6b5c65]">
                    <span>Minimum Consultation Retainer</span>
                    <span>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[0.85rem] text-[#6b5c65]">
                    <span>Atelier Processing</span>
                    <span>Complimentary</span>
                  </div>
                  
                  <div className="mt-8 flex items-end justify-between border-t border-[#d3c8be]/40 pt-6">
                    <span className="font-serif text-xl italic text-[#4a2b3d]">
                      Initial Deposit
                    </span>
                    <div className="text-right">
                      <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-[#4a2b3d]">
                        To be credited towards final quote
                      </span>
                      <span className="text-4xl font-bold text-[#4a2b3d]">
                        PKR {total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between text-[0.85rem] text-[#6b5c65]">
                    <span>{isBox ? "Curated Bakery Assortment" : isBake ? "Artisanal Bakes Crafting" : "Bespoke Cake Crafting"}</span>
                    <span>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[0.85rem] text-[#6b5c65]">
                    <span>{isBox ? "Premium Packaging & Ribbon" : isBake ? "Custom Note & Packaging" : "Custom Calligraphy & Gold Leaf"}</span>
                    <span>Rs. {calligraphyFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[0.85rem] text-[#6b5c65]">
                    <span>Temperature Controlled Delivery</span>
                    <span>Rs. {deliveryFee.toLocaleString()}</span>
                  </div>
                  
                  <div className="mt-8 flex items-end justify-between border-t border-[#d3c8be]/40 pt-6">
                    <span className="font-serif text-xl italic text-[#4a2b3d]">
                      Total Investment
                    </span>
                    <div className="text-right">
                      <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-[#4a2b3d]">
                        Inclusive of all duties
                      </span>
                      <span className="text-4xl font-bold text-[#4a2b3d]">
                        PKR {total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </section>

            {/* CTAs */}
            <div className="mt-10 flex gap-4">
              <button className="flex-1 rounded-lg bg-[#4a0404] py-5 text-[0.7rem] font-bold uppercase tracking-[0.25em] text-white shadow-lg transition-all hover:bg-[#320303] hover:shadow-xl active:scale-[0.98]">
                {isBespoke ? "Submit Consultation Request &rarr;" : "Proceed to Secure Checkout &rarr;"}
              </button>
              <Link 
                href={isBespoke ? "/custom?type=bespoke" : isBox ? "/custom?type=box" : "/custom"}
                className="flex items-center justify-center rounded-lg border border-[#d3c8be] bg-white px-8 py-5 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#4a2b3d] transition-all hover:bg-[#f8f5f1]"
              >
                Edit Design
              </Link>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-[0.6rem] uppercase tracking-widest text-[#9a8a7a]">
              <span>🔒</span>
              Encrypted & Secure Payment Processing
            </div>

            <footer className="mt-auto pt-12 text-center text-[0.65rem] italic leading-relaxed text-[#9a8a7a]">
              Each Central Cakes masterpiece is baked to order by our master artisans using heirloom recipes. Please allow 
              72 hours for the careful curing of our signature saffron sponge.
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
};

const SelectionCard = ({ label, value, icon }: { label: string; value: string; icon: string }) => (
  <div className="rounded-xl bg-[#ede8e1]/50 p-5 text-left border border-[#d3c8be]/20">
    <div className="mb-3 flex h-6 w-6 items-center justify-center rounded-sm bg-[#d3c8be]/20 text-[0.7rem]">
      {icon}
    </div>
    <span className="block text-[0.55rem] font-bold uppercase tracking-widest text-[#8b7a6a]">
      {label}
    </span>
    <span className="mt-1 block font-serif text-[0.95rem] text-[#4a2b3d]">
      {value}
    </span>
  </div>
);

export default ReviewPage;


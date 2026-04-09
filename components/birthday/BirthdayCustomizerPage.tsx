'use client';

import React, { useState, useCallback } from 'react';
import { RealisticCakePreview } from './RealisticCakePreview';

/* ── Data ── */
const CAKE_TYPES = [
  { id: 1, label: 'Single Tier', icon: '🎂' },
  { id: 2, label: 'Double Tier', icon: '🎂🎂' },
  { id: 3, label: 'Three Tier', icon: '🎂🎂🎂' },
];

const SIZES = [
  { id: '1lb', label: '1 Pound', serves: '4-6', price: 25 },
  { id: '2lb', label: '2 Pound', serves: '8-10', price: 40 },
  { id: '3lb', label: '3 Pound', serves: '12-15', price: 55 },
  { id: '5lb', label: '5 Pound', serves: '20-25', price: 85 },
];

const FLAVORS = [
  { id: 'chocolate', label: 'Chocolate', color: '#5C3317' },
  { id: 'red-velvet', label: 'Red Velvet', color: '#8B2232' },
  { id: 'vanilla', label: 'Vanilla', color: '#F5DEB3' },
  { id: 'butterscotch', label: 'Butterscotch', color: '#E0A030' },
  { id: 'black-forest', label: 'Black Forest', color: '#2D1810' },
  { id: 'custom', label: 'Custom', color: '#D4D4D4' },
];

const FROSTINGS = ['Whipped Cream', 'Buttercream', 'Fondant', 'Ganache'];

const DECORATIONS = [
  'Fruits', 'Sprinkles', 'Edible Toppers', 'Chocolate Drip', 'Macarons', 'Flowers', 'Candles',
];

const THEMES = [
  { id: 'cartoon', label: 'Cartoon Paradise', price: 15 },
  { id: 'princess', label: 'Princess', price: 18 },
  { id: 'superhero', label: 'Superhero', price: 15 },
  { id: 'minimal', label: 'Minimal Elegant', price: 0 },
  { id: 'kids', label: 'Kids Theme', price: 12 },
  { id: 'floral', label: 'Floral Theme', price: 20 },
];

const ADDONS = [
  { id: 'candles-set', label: 'Premium Candles', price: 3 },
  { id: 'topper', label: 'Cake Topper', price: 8 },
  { id: 'card', label: 'Greeting Card', price: 2 },
  { id: 'knife', label: 'Cake Knife', price: 3 },
  { id: 'balloons', label: 'Balloons', price: 5 },
];

/* ── Section wrapper ── */
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-[#8c6b7a] mb-4">{title}</h3>
    {children}
  </div>
);

export const BirthdayCustomizerPage = () => {
  /* ── State ── */
  const [tierCount, setTierCount] = useState(1);
  const [sizeId, setSizeId] = useState('2lb');
  const [flavor, setFlavor] = useState('vanilla');
  const [frosting, setFrosting] = useState('Whipped Cream');
  const [decorations, setDecorations] = useState<string[]>([]);
  const [themeId, setThemeId] = useState('minimal');
  const [cakeName, setCakeName] = useState('');
  const [cakeAge, setCakeAge] = useState('');
  const [cakeMessage, setCakeMessage] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#FADADD');
  const [secondaryColor, setSecondaryColor] = useState('#DDA0DD');
  const [addOns, setAddOns] = useState<Record<string, number>>({});

  const toggleDecoration = useCallback((dec: string) => {
    setDecorations(prev => prev.includes(dec) ? prev.filter(d => d !== dec) : [...prev, dec]);
  }, []);

  const toggleAddon = useCallback((id: string, delta: number) => {
    setAddOns(prev => {
      const qty = Math.max(0, (prev[id] || 0) + delta);
      return { ...prev, [id]: qty };
    });
  }, []);

  /* ── Pricing ── */
  const size = SIZES.find(s => s.id === sizeId)!;
  const theme = THEMES.find(t => t.id === themeId)!;
  const tierMultiplier = tierCount === 3 ? 2.5 : tierCount === 2 ? 1.8 : 1;
  const basePrice = Math.round(size.price * tierMultiplier);
  const decoPrice = decorations.length * 3;
  const themePrice = theme.price;
  const addOnTotal = Object.entries(addOns).reduce((sum, [id, qty]) => {
    const a = ADDONS.find(x => x.id === id);
    return sum + (a ? a.price * qty : 0);
  }, 0);
  const total = basePrice + decoPrice + themePrice + addOnTotal;

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6 md:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-8 xl:gap-12 items-start">

        {/* ═══════════ LEFT: Cake Preview ═══════════ */}
        <div className="lg:sticky lg:top-20 flex flex-col items-center bg-[#fdfafb] rounded-3xl p-8 md:p-12 border border-gray-100 shadow-[0_8px_40px_rgba(0,0,0,0.04)]">
          <RealisticCakePreview
            tierCount={tierCount}
            flavor={flavor}
            frosting={frosting}
            themeId={themeId}
            decorations={decorations}
            name={cakeName}
            age={cakeAge}
            message={cakeMessage}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            sizeName={size.label}
            themeName={theme.label}
          />
        </div>

        {/* ═══════════ RIGHT: Customizer Panel ═══════════ */}
        <div className="flex flex-col">
          <h2 className="text-2xl md:text-3xl font-heading text-[#5f4f58] mb-8">Customize Your Birthday Cake</h2>

          {/* ── Cake Type ── */}
          <Section title="Cake Type">
            <div className="grid grid-cols-3 gap-3">
              {CAKE_TYPES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTierCount(t.id)}
                  className={`py-3 px-2 rounded-xl text-sm font-medium transition-all border-2 ${
                    tierCount === t.id
                      ? 'border-[#8c6b7a] bg-[#8c6b7a]/5 text-[#8c6b7a] shadow-sm'
                      : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </Section>

          {/* ── Size ── */}
          <Section title="Cake Size">
            <div className="grid grid-cols-2 gap-3">
              {SIZES.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSizeId(s.id)}
                  className={`flex flex-col items-start p-3 rounded-xl text-sm transition-all border-2 ${
                    sizeId === s.id
                      ? 'border-[#8c6b7a] bg-[#8c6b7a]/5 shadow-sm'
                      : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
                >
                  <span className="font-semibold text-gray-800">{s.label}</span>
                  <span className="text-xs text-gray-400 mt-0.5">Serves {s.serves} · ${s.price}</span>
                </button>
              ))}
            </div>
          </Section>

          {/* ── Flavor ── */}
          <Section title="Flavor Selection">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {FLAVORS.map(f => (
                <button
                  key={f.id}
                  onClick={() => setFlavor(f.id)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl text-sm font-medium transition-all border-2 ${
                    flavor === f.id
                      ? 'border-[#8c6b7a] bg-[#8c6b7a]/5 shadow-sm'
                      : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full flex-shrink-0 shadow-inner" style={{ background: f.color }} />
                  <span className="text-gray-700">{f.label}</span>
                </button>
              ))}
            </div>
          </Section>

          {/* ── Frosting ── */}
          <Section title="Frosting Type">
            <div className="flex flex-wrap gap-2">
              {FROSTINGS.map(f => (
                <button
                  key={f}
                  onClick={() => setFrosting(f)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all border-2 ${
                    frosting === f
                      ? 'border-[#8c6b7a] bg-[#8c6b7a] text-white shadow-md'
                      : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </Section>

          {/* ── Decorations ── */}
          <Section title="Decorations">
            <div className="flex flex-wrap gap-2">
              {DECORATIONS.map(d => {
                const active = decorations.includes(d);
                return (
                  <button
                    key={d}
                    onClick={() => toggleDecoration(d)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all border-2 ${
                      active
                        ? 'border-[#8c6b7a] bg-[#8c6b7a]/10 text-[#8c6b7a]'
                        : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    {active && <span className="mr-1">✓</span>}
                    {d}
                  </button>
                );
              })}
            </div>
          </Section>

          {/* ── Theme ── */}
          <Section title="Theme">
            <div className="grid grid-cols-2 gap-3">
              {THEMES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setThemeId(t.id)}
                  className={`flex justify-between items-center p-3 rounded-xl text-sm transition-all border-2 ${
                    themeId === t.id
                      ? 'border-[#8c6b7a] bg-[#8c6b7a]/5 shadow-sm'
                      : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
                >
                  <span className="font-medium text-gray-700">{t.label}</span>
                  <span className="text-xs text-[#8c6b7a]">{t.price > 0 ? `+$${t.price}` : 'Free'}</span>
                </button>
              ))}
            </div>
          </Section>

          {/* ── Personalization ── */}
          <Section title="Personalization">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Name on Cake</label>
                <input
                  value={cakeName} onChange={e => setCakeName(e.target.value)}
                  placeholder="e.g. Sarah" maxLength={15}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#8c6b7a] focus:ring-1 focus:ring-[#8c6b7a] outline-none transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Age</label>
                  <input
                    type="number" value={cakeAge} onChange={e => setCakeAge(e.target.value)}
                    placeholder="e.g. 5" min={1} max={120}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#8c6b7a] focus:ring-1 focus:ring-[#8c6b7a] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Custom Message</label>
                  <input
                    value={cakeMessage} onChange={e => setCakeMessage(e.target.value)}
                    placeholder="Happy Birthday!" maxLength={30}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#8c6b7a] focus:ring-1 focus:ring-[#8c6b7a] outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </Section>

          {/* ── Color Picker ── */}
          <Section title="Color Customization">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-gray-500">Primary</label>
                <input
                  type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)}
                  className="w-8 h-8 rounded-lg border border-gray-200 cursor-pointer"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-gray-500">Secondary</label>
                <input
                  type="color" value={secondaryColor} onChange={e => setSecondaryColor(e.target.value)}
                  className="w-8 h-8 rounded-lg border border-gray-200 cursor-pointer"
                />
              </div>
            </div>
          </Section>

          {/* ── Extras / Add-ons ── */}
          <Section title="Extras">
            <div className="space-y-2">
              {ADDONS.map(a => {
                const qty = addOns[a.id] || 0;
                return (
                  <div key={a.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-white">
                    <div>
                      <span className="text-sm font-medium text-gray-700">{a.label}</span>
                      <span className="text-xs text-[#8c6b7a] ml-2">+${a.price}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => toggleAddon(a.id, -1)} className="w-7 h-7 rounded-full border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-50 text-sm">−</button>
                      <span className="w-4 text-center text-sm font-semibold">{qty}</span>
                      <button onClick={() => toggleAddon(a.id, 1)} className="w-7 h-7 rounded-full border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-50 text-sm">+</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* ── Price Summary ── */}
          <div className="bg-[#fdfafb] rounded-2xl p-5 border border-[#8c6b7a]/10 mb-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-[#8c6b7a] mb-4">Price Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Base Cake ({size.label}, {tierCount === 1 ? 'Single' : tierCount === 2 ? 'Double' : 'Three'} Tier)</span><span className="font-medium">${basePrice}</span></div>
              {themePrice > 0 && <div className="flex justify-between"><span className="text-gray-500">Theme ({theme.label})</span><span className="font-medium">+${themePrice}</span></div>}
              {decoPrice > 0 && <div className="flex justify-between"><span className="text-gray-500">Decorations ({decorations.length})</span><span className="font-medium">+${decoPrice}</span></div>}
              {addOnTotal > 0 && <div className="flex justify-between"><span className="text-gray-500">Extras</span><span className="font-medium">+${addOnTotal}</span></div>}
              <div className="flex justify-between items-center pt-3 border-t border-[#8c6b7a]/10 mt-3">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <span className="text-xl font-bold text-[#8c6b7a]">${total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════ STICKY BOTTOM CTA ═══════════ */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-50 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="text-xs text-gray-400">Estimated Total</p>
            <p className="text-xl font-bold text-[#8c6b7a]">${total}</p>
          </div>
          <div className="flex gap-3 flex-1 sm:flex-none">
            <button className="flex-1 sm:flex-none py-3 px-6 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
              Save Design
            </button>
            <button className="flex-1 sm:flex-none py-3 px-6 rounded-xl border-2 border-[#8c6b7a] text-sm font-semibold text-[#8c6b7a] hover:bg-[#8c6b7a]/5 transition-colors">
              Add to Cart
            </button>
            <button className="flex-[2] sm:flex-none py-3 px-8 rounded-xl bg-[#8c6b7a] text-sm font-semibold text-white hover:bg-[#7a5c69] transition-colors shadow-lg shadow-[#8c6b7a]/20">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

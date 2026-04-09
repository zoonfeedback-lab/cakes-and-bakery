'use client';

import React from 'react';
import { useBirthday } from './BirthdayContext';

/* ── Flavor colour palettes ── */
const FLAVOR_COLORS: Record<string, { base: string; dark: string; cream: string }> = {
  chocolate:    { base: '#5C3317', dark: '#3E1E08', cream: '#8B6B4A' },
  vanilla:      { base: '#F5DEB3', dark: '#D4BA82', cream: '#FFF8E7' },
  'red-velvet': { base: '#8B2232', dark: '#5E1020', cream: '#D06878' },
  pineapple:    { base: '#E8C840', dark: '#C0A020', cream: '#F8E898' },
  lotus:        { base: '#C4873B', dark: '#8E5E22', cream: '#ECC490' },
  ferrero:      { base: '#6B3A2A', dark: '#4A2518', cream: '#B88068' },
  nutella:      { base: '#4E2A1A', dark: '#301510', cream: '#9A6D58' },
};

const FROSTING_COLORS: Record<string, { base: string; highlight: string }> = {
  Buttercream:     { base: '#FFF5E1', highlight: '#FFFDF7' },
  Fondant:         { base: '#FADADD', highlight: '#FFF0F2' },
  'Whipped Cream': { base: '#FFFEFA', highlight: '#FFFFFF' },
  Ganache:         { base: '#3B1F0B', highlight: '#5C3A20' },
};

const SPRINKLE_COLORS = ['#FF6B8A','#FFD93D','#6BCB77','#4D96FF','#FF8B3D','#C265D3','#FF4D6D','#45B7D1'];

export const DynamicCakeVisual = () => {
  const { state } = useBirthday();

  const tierCount =
    state.cakeType?.id === 'three-tier' ? 3
    : state.cakeType?.id === 'two-tier' ? 2
    : state.cakeType?.id === 'cupcake-tower' ? 0
    : 1;

  const isCupcake = state.cakeType?.id === 'cupcake-tower';
  const flavorKey = state.flavor?.id || 'vanilla';
  const fc = FLAVOR_COLORS[flavorKey] ?? FLAVOR_COLORS.vanilla;
  const frostKey = state.frosting || 'Buttercream';
  const fr = FROSTING_COLORS[frostKey] ?? FROSTING_COLORS.Buttercream;

  const cakeText = state.personalization?.message
    || (state.personalization?.name ? `Happy Birthday, ${state.personalization.name}!` : '');
  const ageText = state.personalization?.age || '';
  const candleCount = Math.min(state.addOns['candles'] ?? 0, 5);
  const hasFlowers = state.decorations.includes('Flowers');
  const hasSprinkles = state.decorations.includes('Sprinkles');
  const hasFruits = state.decorations.includes('Fruits');
  const hasChocolates = state.decorations.includes('Chocolates');
  const hasMacarons = state.decorations.includes('Macarons');
  const hasToppers = state.decorations.includes('Edible Toppers');
  const isDarkFrost = frostKey === 'Ganache';

  /* ── Tier sizes ── */
  const tiers = (() => {
    if (tierCount === 1) return [{ w: 180, h: 80 }];
    if (tierCount === 2) return [{ w: 190, h: 65 }, { w: 145, h: 58 }];
    if (tierCount === 3) return [{ w: 200, h: 55 }, { w: 160, h: 50 }, { w: 120, h: 45 }];
    return [];
  })();

  /* ── Drip positions (semicircle along front) ── */
  const drips = [0.1, 0.22, 0.35, 0.5, 0.65, 0.78, 0.9];

  return (
    <div className="flex flex-col items-center justify-center w-full select-none">
      {/* 3D Scene Container */}
      <div 
        className="relative transition-all duration-700"
        style={{ 
          perspective: '600px',
          perspectiveOrigin: '50% 30%',
        }}
      >
        <div 
          className="relative flex flex-col items-center justify-end transition-transform duration-700"
          style={{
            transform: 'rotateX(20deg)',
            transformStyle: 'preserve-3d',
            minHeight: isCupcake ? '220px' : `${tiers.reduce((a, t) => a + t.h + 8, 0) + 80}px`,
          }}
        >
          {!isCupcake ? (
            <>
              {/* ── Cake Tiers ── */}
              {tiers.map((tier, i) => (
                <div 
                  key={i}
                  className="relative flex items-center justify-center transition-all duration-500"
                  style={{ 
                    width: `${tier.w}px`, 
                    height: `${tier.h}px`,
                    marginBottom: i < tiers.length - 1 ? '0px' : '0',
                    zIndex: tiers.length - i,
                  }}
                >
                  {/* Tier Body */}
                  <div 
                    className="absolute inset-0 rounded-[8px] transition-colors duration-500 overflow-hidden"
                    style={{ 
                      background: `linear-gradient(180deg, ${fc.cream} 0%, ${fc.base} 30%, ${fc.dark} 100%)`,
                      boxShadow: `
                        inset 0 2px 8px rgba(255,255,255,0.15),
                        inset 0 -4px 12px rgba(0,0,0,0.2),
                        0 4px 20px rgba(0,0,0,0.15)
                      `,
                    }}
                  >
                    {/* Cream filling line */}
                    <div 
                      className="absolute left-2 right-2 h-[4px] rounded-full transition-colors duration-500"
                      style={{ 
                        top: '48%', 
                        background: fr.base,
                        opacity: 0.7, 
                        boxShadow: `0 1px 3px rgba(0,0,0,0.1)` 
                      }} 
                    />
                    <div 
                      className="absolute left-2 right-2 h-[2px] rounded-full transition-colors duration-500"
                      style={{ 
                        top: '52%', 
                        background: fc.cream, 
                        opacity: 0.3 
                      }} 
                    />

                    {/* Personalised text on bottom tier */}
                    {i === 0 && cakeText && (
                      <div 
                        className="absolute inset-x-0 flex items-center justify-center transition-all duration-300"
                        style={{ top: '25%' }}
                      >
                        <span 
                          className="font-serif italic text-center px-2 truncate max-w-full"
                          style={{ 
                            fontSize: cakeText.length > 20 ? '8px' : '10px',
                            color: isDarkFrost ? '#FFE8BC' : fr.base,
                            textShadow: `0 1px 2px rgba(0,0,0,0.3)`,
                            letterSpacing: '0.5px',
                          }}
                        >
                          {cakeText.length > 28 ? cakeText.slice(0, 28) + '…' : cakeText}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Frosting Top Surface */}
                  <div 
                    className="absolute left-[-3px] right-[-3px] h-[14px] rounded-[6px] transition-colors duration-500"
                    style={{ 
                      top: '-4px',
                      background: `radial-gradient(ellipse at 40% 40%, ${fr.highlight}, ${fr.base})`,
                      boxShadow: `0 2px 6px rgba(0,0,0,0.08)`,
                    }}
                  />

                  {/* Frosting Drips */}
                  {drips.map((pct, di) => {
                    const dripH = 10 + ((di * 7 + i * 3) % 18);
                    return (
                      <div
                        key={di}
                        className="absolute rounded-b-full transition-colors duration-500"
                        style={{
                          left: `${pct * 100}%`,
                          top: '1px',
                          width: '8px',
                          height: `${dripH}px`,
                          marginLeft: '-4px',
                          background: `linear-gradient(180deg, ${fr.base}, ${fr.base}CC)`,
                        }}
                      />
                    );
                  })}

                  {/* ── Top tier decorations ── */}
                  {i === tiers.length - 1 && (
                    <>
                      {/* Sprinkles scatter */}
                      {hasSprinkles && (
                        <div className="absolute inset-x-1 top-[-6px] h-[10px] overflow-hidden">
                          {Array.from({ length: 20 }).map((_, si) => (
                            <div
                              key={si}
                              className="absolute rounded-full"
                              style={{
                                width: '3px',
                                height: '3px',
                                background: SPRINKLE_COLORS[si % SPRINKLE_COLORS.length],
                                left: `${5 + (si * 4.7) % 90}%`,
                                top: `${(si * 3.3) % 8}px`,
                              }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Flowers */}
                      {hasFlowers && (
                        <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 flex gap-1">
                          {['🌸','🌼','🌺','🌷','🌸'].map((f, fi) => (
                            <span key={fi} className="text-sm drop-shadow-sm" style={{
                              transform: `rotate(${fi * 15 - 30}deg) translateY(${fi % 2 ? -2 : 0}px)`,
                            }}>{f}</span>
                          ))}
                        </div>
                      )}

                      {/* Fruits along perimeter */}
                      {hasFruits && (
                        <div className="absolute top-[-16px] left-1/2 -translate-x-1/2 flex gap-2">
                          {['🍓','🫐','🍒','🍓','🫐'].map((f, fi) => (
                            <span key={fi} className="text-xs drop-shadow-sm">{f}</span>
                          ))}
                        </div>
                      )}

                      {/* Chocolates */}
                      {hasChocolates && (
                        <div className="absolute top-[-14px] flex gap-3 left-1/2 -translate-x-1/2">
                          {[0,1,2].map(ci => (
                            <div key={ci} className="w-3 h-4 rounded-sm" style={{
                              background: 'linear-gradient(135deg, #5C3317, #3E1E08)',
                              boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.2)',
                              transform: `rotate(${ci * 20 - 20}deg)`,
                            }} />
                          ))}
                        </div>
                      )}

                      {/* Macarons */}
                      {hasMacarons && (
                        <div className="absolute top-[-18px] flex gap-2 left-1/2 -translate-x-1/2">
                          {['#FFB6C1','#B5D8F7','#C5E8B0'].map((color, mi) => (
                            <div key={mi} className="flex flex-col items-center" style={{ transform: `rotate(${mi * 10 - 10}deg)` }}>
                              <div className="rounded-full" style={{ width: '12px', height: '6px', background: color, boxShadow: `inset 0 -1px 2px rgba(0,0,0,0.1)` }} />
                              <div className="h-[2px] -my-[0.5px]" style={{ width: '13px', background: '#FFF5E1' }} />
                              <div className="rounded-full" style={{ width: '12px', height: '6px', background: color, boxShadow: `inset 0 1px 2px rgba(0,0,0,0.1)` }} />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Edible Topper (star/flag) */}
                      {hasToppers && (
                        <div className="absolute top-[-32px] left-1/2 -translate-x-1/2 flex flex-col items-center">
                          <div className="text-lg" style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.2))' }}>⭐</div>
                          <div className="w-[2px] h-3 bg-amber-700 rounded-full -mt-1" />
                        </div>
                      )}

                      {/* ── Candles ── */}
                      {candleCount > 0 && (
                        <div className="absolute flex gap-3 left-1/2 -translate-x-1/2" style={{ top: `${-(22 + (hasFlowers || hasFruits ? 14 : 0))}px` }}>
                          {Array.from({ length: candleCount }).map((_, ci) => {
                            const colors = ['#FFB6C1','#B5D8F7','#C5E8B0','#FFD6A5','#E0BBE4'];
                            return (
                              <div key={ci} className="flex flex-col items-center">
                                {/* Flame */}
                                <div className="relative w-3 h-4 mb-[-1px]">
                                  <div className="absolute inset-0 rounded-full animate-pulse" style={{
                                    background: 'radial-gradient(ellipse, #FFD700, #FF8C00)',
                                    filter: 'blur(0.5px)',
                                  }} />
                                  <div className="absolute inset-[2px] rounded-full" style={{
                                    background: 'radial-gradient(ellipse, #FFF4CC, #FFD700)',
                                  }} />
                                </div>
                                {/* Wick */}
                                <div className="w-[1px] h-1 bg-gray-600" />
                                {/* Body */}
                                <div className="w-[6px] h-5 rounded-sm" style={{
                                  background: `linear-gradient(90deg, ${colors[ci % colors.length]}CC, ${colors[ci % colors.length]}, ${colors[ci % colors.length]}CC)`,
                                  boxShadow: 'inset 1px 0 2px rgba(255,255,255,0.4)',
                                }} />
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* ── Age Number ── */}
                      {ageText && (
                        <div 
                          className="absolute left-1/2 -translate-x-1/2 font-serif font-bold text-[#8c6b7a] transition-all duration-500"
                          style={{ 
                            top: `${-(40 + (candleCount > 0 ? 30 : 0) + (hasFlowers || hasFruits ? 14 : 0))}px`,
                            fontSize: '26px',
                            textShadow: '0 2px 8px rgba(140,107,122,0.3)',
                          }}
                        >
                          {ageText}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}

              {/* ── Cake Board ── */}
              <div 
                className="mt-1 rounded-full transition-all duration-500"
                style={{ 
                  width: `${tiers[0].w + 30}px`, 
                  height: '14px',
                  background: 'linear-gradient(180deg, #EDCFB8, #D4A88C)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                }} 
              />
            </>
          ) : (
            /* ── Cupcake Tower ── */
            <div className="flex flex-col items-center gap-2">
              {/* Top cupcake */}
              <div className="flex gap-4 mb-[-8px]">
                <CupcakeDiv fc={fc} fr={fr} />
              </div>
              {/* Bottom row */}
              <div className="flex gap-3">
                <CupcakeDiv fc={fc} fr={fr} />
                <CupcakeDiv fc={fc} fr={fr} />
              </div>
              {/* Stand */}
              <div className="w-36 h-3 rounded-full mt-1" style={{
                background: 'linear-gradient(180deg, #EDCFB8, #D4A88C)',
                boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
              }} />
            </div>
          )}
        </div>
      </div>

      {/* Label */}
      <div className="text-center mt-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8c6b7a]/50">Live Preview</p>
        {state.theme && (
          <p className="text-[10px] text-gray-400 mt-1">{state.theme.title} • {state.cakeType?.title || 'Single Tier'}</p>
        )}
      </div>
    </div>
  );
};

/* ── Cupcake sub-component ── */
const CupcakeDiv = ({ fc, fr }: { fc: { base: string; dark: string; cream: string }; fr: { base: string; highlight: string } }) => (
  <div className="flex flex-col items-center">
    {/* Cherry */}
    <div className="w-3 h-3 rounded-full bg-red-500 mb-[-2px] z-10 shadow-sm" style={{
      background: 'radial-gradient(circle at 35% 35%, #FF6B6B, #DC143C)',
    }} />
    {/* Frosting swirl */}
    <div className="rounded-full transition-colors duration-500" style={{
      width: '38px', height: '20px',
      background: `radial-gradient(ellipse at 40% 35%, ${fr.highlight}, ${fr.base})`,
      boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
    }} />
    <div className="rounded-full -mt-2 transition-colors duration-500" style={{
      width: '44px', height: '18px',
      background: `radial-gradient(ellipse at 40% 35%, ${fr.base}, ${fr.base}DD)`,
    }} />
    {/* Liner */}
    <div className="-mt-1 overflow-hidden" style={{
      width: '40px', height: '28px',
      background: `linear-gradient(180deg, ${fc.cream} 0%, ${fc.base} 40%, ${fc.dark} 100%)`,
      clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
      boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.15)',
    }}>
      {/* Liner ridges */}
      {[15, 30, 45, 55, 70, 85].map(pct => (
        <div key={pct} className="absolute top-0 bottom-0 w-[1px] opacity-20" style={{
          left: `${pct}%`, background: 'rgba(255,255,255,0.5)',
        }} />
      ))}
    </div>
  </div>
);

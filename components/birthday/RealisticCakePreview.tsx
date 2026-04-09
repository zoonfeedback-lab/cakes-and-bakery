'use client';

import React, { useState } from 'react';
import Image from 'next/image';

/* ── Flavor-based CSS filter tints ── */
const FLAVOR_FILTERS: Record<string, string> = {
  chocolate:     'sepia(0.6) saturate(2) hue-rotate(-15deg) brightness(0.55)',
  'red-velvet':  'sepia(0.4) saturate(3) hue-rotate(-30deg) brightness(0.65)',
  vanilla:       'sepia(0.08) saturate(0.9) brightness(1.02)',
  butterscotch:  'sepia(0.35) saturate(1.4) hue-rotate(10deg) brightness(0.85)',
  'black-forest':'sepia(0.5) saturate(1.5) hue-rotate(-10deg) brightness(0.4)',
  custom:        'none',
};

/* ── Frosting overlay colours ── */
const FROSTING_OVERLAY: Record<string, string> = {
  'Whipped Cream': 'rgba(255,255,250,0.15)',
  Buttercream:     'rgba(255,240,200,0.2)',
  Fondant:         'rgba(250,218,221,0.25)',
  Ganache:         'rgba(40,20,5,0.45)',
};

/* ── Theme accent colours ── */
const THEME_ACCENTS: Record<string, { primary: string; secondary: string }> = {
  cartoon:   { primary: '#FFD93D', secondary: '#FF6B8A' },
  princess:  { primary: '#FFB6C1', secondary: '#DDA0DD' },
  superhero: { primary: '#4D96FF', secondary: '#FF4D4D' },
  minimal:   { primary: '#D4C5B0', secondary: '#A89880' },
  kids:      { primary: '#6BCB77', secondary: '#FFD93D' },
  floral:    { primary: '#E8A0BF', secondary: '#BA90C6' },
};

const TIER_IMAGES: Record<number, string> = {
  1: '/images/cake-1tier.png',
  2: '/images/cake-2tier.png',
  3: '/images/cake-3tier.png',
};

interface CakePreviewProps {
  tierCount: number;
  flavor: string;
  frosting: string;
  themeId: string;
  decorations: string[];
  name: string;
  age: string;
  message: string;
  primaryColor: string;
  secondaryColor: string;
  sizeName: string;
  themeName: string;
}

export const RealisticCakePreview = ({
  tierCount, flavor, frosting, themeId, decorations,
  name, age, message, primaryColor, secondaryColor, sizeName, themeName,
}: CakePreviewProps) => {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);

  const cakeImage = TIER_IMAGES[tierCount] || TIER_IMAGES[1];
  const flavorFilter = FLAVOR_FILTERS[flavor] || 'none';
  const frostOverlay = FROSTING_OVERLAY[frosting] || 'transparent';
  const accent = THEME_ACCENTS[themeId] || THEME_ACCENTS.minimal;

  const hasFruits = decorations.includes('Fruits');
  const hasSprinkles = decorations.includes('Sprinkles');
  const hasChocDrip = decorations.includes('Chocolate Drip');
  const hasFlowers = decorations.includes('Flowers');
  const hasCandles = decorations.includes('Candles');
  const hasMacarons = decorations.includes('Macarons');
  const hasToppers = decorations.includes('Edible Toppers');

  const cakeText = message || (name ? `Happy Birthday, ${name}!` : '');

  const previewContent = (
    <div className={`flex flex-col items-center w-full ${fullscreen ? 'fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl p-8 flex items-center justify-center' : ''}`}>
      {fullscreen && (
        <button onClick={() => setFullscreen(false)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 z-10 text-lg">✕</button>
      )}
      
      {/* Cake Preview Area */}
      <div 
        className="relative transition-all duration-700 ease-out"
        style={{ 
          transform: `scale(${fullscreen ? 1.3 : zoom}) rotateY(${rotation}deg)`,
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
      >
        {/* Shadow under cake */}
        <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-[70%] h-[20px] rounded-[50%] bg-black/10 blur-lg" />

        {/* Base cake image with flavor filter */}
        <div className="relative w-[320px] h-[360px] sm:w-[380px] sm:h-[420px] transition-all duration-500">
          <Image
            src={cakeImage}
            alt="Custom birthday cake preview"
            fill
            className="object-contain transition-all duration-700 drop-shadow-2xl"
            style={{ filter: flavorFilter }}
            priority
          />

          {/* Frosting overlay tint */}
          <div 
            className="absolute inset-0 rounded-xl pointer-events-none transition-colors duration-500"
            style={{ 
              background: frostOverlay,
              mixBlendMode: 'multiply',
            }} 
          />

          {/* Custom color overlay */}
          {primaryColor !== '#FADADD' && (
            <div 
              className="absolute inset-0 pointer-events-none transition-colors duration-500"
              style={{ 
                background: `${primaryColor}22`,
                mixBlendMode: 'color',
              }}
            />
          )}

          {/* ── Decoration overlays ── */}
          
          {/* Chocolate Drip Effect */}
          {hasChocDrip && (
            <div className="absolute top-[22%] left-[15%] right-[15%] h-[15%] pointer-events-none overflow-hidden">
              {[12, 22, 35, 48, 60, 72, 85].map((pos, i) => (
                <div 
                  key={i}
                  className="absolute rounded-b-full transition-all duration-500"
                  style={{
                    left: `${pos}%`,
                    top: 0,
                    width: '8px',
                    height: `${14 + (i * 7) % 22}px`,
                    background: 'linear-gradient(180deg, #3B1F0B, #2A1406)',
                    opacity: 0.85,
                  }}
                />
              ))}
            </div>
          )}

          {/* Sprinkles */}
          {hasSprinkles && (
            <div className="absolute top-[15%] left-[20%] right-[20%] h-[20%] pointer-events-none">
              {Array.from({ length: 30 }).map((_, i) => {
                const colors = ['#FF6B8A','#FFD93D','#6BCB77','#4D96FF','#FF8B3D','#C265D3','#45B7D1','#FF4D6D'];
                return (
                  <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: `${3 + (i % 3)}px`,
                      height: `${3 + (i % 3)}px`,
                      background: colors[i % colors.length],
                      left: `${(i * 13.7) % 95}%`,
                      top: `${(i * 17.3) % 90}%`,
                      opacity: 0.9,
                    }}
                  />
                );
              })}
            </div>
          )}

          {/* Flowers */}
          {hasFlowers && (
            <div className="absolute top-[10%] left-[18%] right-[18%] flex justify-center gap-1 pointer-events-none">
              {['🌸','🌼','🌺','🌷','🌸','🌼'].map((f, i) => (
                <span key={i} className="text-base drop-shadow-md" style={{
                  transform: `rotate(${i * 12 - 30}deg) translateY(${i % 2 ? -3 : 3}px)`,
                }}>{f}</span>
              ))}
            </div>
          )}

          {/* Fruits */}
          {hasFruits && (
            <div className="absolute top-[12%] left-[22%] right-[22%] flex justify-center gap-2 pointer-events-none">
              {['🍓','🫐','🍒','🍓','🫐'].map((f, i) => (
                <span key={i} className="text-sm drop-shadow-md">{f}</span>
              ))}
            </div>
          )}

          {/* Macarons */}
          {hasMacarons && (
            <div className="absolute top-[8%] left-[25%] right-[25%] flex justify-center gap-3 pointer-events-none">
              {['#FFB6C1','#B5D8F7','#C5E8B0','#FFD6A5'].map((color, i) => (
                <div key={i} className="w-4 h-4 rounded-full shadow-sm" style={{
                  background: `radial-gradient(circle at 35% 35%, ${color}, ${color}BB)`,
                  border: `1px solid ${color}88`,
                }} />
              ))}
            </div>
          )}

          {/* Candles */}
          {hasCandles && (
            <div className="absolute top-[2%] left-[25%] right-[25%] flex justify-center gap-4 pointer-events-none">
              {Array.from({ length: Math.min(tierCount + 2, 5) }).map((_, i) => {
                const candleColors = ['#FFB6C1','#B5D8F7','#C5E8B0','#FFD6A5','#E0BBE4'];
                return (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-2 h-3 rounded-full animate-pulse" style={{
                      background: 'radial-gradient(#FFD700, #FF8C00)',
                      boxShadow: '0 0 8px 2px rgba(255,215,0,0.4)',
                    }} />
                    <div className="w-[2px] h-1 bg-gray-500" />
                    <div className="w-2 h-6 rounded-sm" style={{
                      background: `linear-gradient(90deg, ${candleColors[i]}AA, ${candleColors[i]}, ${candleColors[i]}AA)`,
                    }} />
                  </div>
                );
              })}
            </div>
          )}

          {/* Edible Topper */}
          {hasToppers && (
            <div className="absolute top-[1%] left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center">
              <div className="text-2xl drop-shadow-lg">⭐</div>
              <div className="w-[2px] h-4 bg-amber-700 rounded-full -mt-1" />
            </div>
          )}

          {/* ── Text rendered on the cake ── */}
          {cakeText && (
            <div 
              className="absolute pointer-events-none flex items-center justify-center transition-all duration-500"
              style={{
                top: tierCount === 3 ? '58%' : tierCount === 2 ? '52%' : '40%',
                left: '20%',
                right: '20%',
              }}
            >
              <span 
                className="font-serif italic text-center drop-shadow-sm max-w-full truncate"
                style={{
                  fontSize: cakeText.length > 22 ? '10px' : '13px',
                  color: frosting === 'Ganache' ? '#FFE8BC' : accent.primary,
                  textShadow: '0 1px 4px rgba(0,0,0,0.25)',
                  letterSpacing: '0.5px',
                }}
              >
                {cakeText.length > 30 ? cakeText.slice(0, 30) + '…' : cakeText}
              </span>
            </div>
          )}

          {/* Age number display */}
          {age && (
            <div 
              className="absolute pointer-events-none flex items-center justify-center transition-all duration-500"
              style={{
                top: tierCount === 3 ? '48%' : tierCount === 2 ? '42%' : '28%',
                left: '30%',
                right: '30%',
              }}
            >
              <span 
                className="font-serif font-bold drop-shadow-lg"
                style={{
                  fontSize: '28px',
                  color: accent.secondary,
                  textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}
              >
                {age}
              </span>
            </div>
          )}

          {/* Theme-based accent border glow */}
          <div 
            className="absolute inset-0 pointer-events-none rounded-xl transition-all duration-700"
            style={{
              boxShadow: `inset 0 0 60px ${accent.primary}15, 0 0 40px ${accent.primary}08`,
            }}
          />
        </div>
      </div>

      {/* Preview info */}
      <div className="text-center mt-6">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8c6b7a]/50">Live Preview</p>
        <p className="text-[11px] text-gray-400 mt-1">
          {themeName || 'Custom'} • {tierCount === 1 ? 'Single' : tierCount === 2 ? 'Double' : 'Triple'} Tier • {sizeName || '2 Pound'}
        </p>
      </div>

      {/* Control buttons */}
      <div className="flex items-center gap-3 mt-4">
        <button 
          onClick={() => setRotation(r => r - 45)}
          className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-[#8c6b7a]/30 transition-all text-sm shadow-sm"
          title="Rotate left"
        >
          ↺
        </button>
        <button 
          onClick={() => setRotation(r => r + 45)}
          className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-[#8c6b7a]/30 transition-all text-sm shadow-sm"
          title="Rotate right"
        >
          ↻
        </button>
        <button 
          onClick={() => setZoom(z => z === 1 ? 1.3 : 1)}
          className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all text-sm shadow-sm ${zoom > 1 ? 'bg-[#8c6b7a] text-white border-[#8c6b7a]' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}
          title="Zoom"
        >
          🔍
        </button>
        <button 
          onClick={() => setFullscreen(true)}
          className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-[#8c6b7a]/30 transition-all text-sm shadow-sm"
          title="Full screen"
        >
          ⛶
        </button>
      </div>
    </div>
  );

  return previewContent;
};

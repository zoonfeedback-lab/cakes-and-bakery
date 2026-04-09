'use client';

import { STUDIO_FILLINGS, STUDIO_FINISHES, STUDIO_SPONGES } from '@/constants/studio';
import { useState } from 'react';

type StudioFormProps = Readonly<{
  title: string;
  onSelectionChange: (category: string, id: string) => void;
  selections: {
    sponge: string;
    filling: string;
    finish: string;
    message: string;
  };
  onMessageChange: (message: string) => void;
}>;

export const StudioForm = ({ 
  title,
  onSelectionChange, 
  selections, 
  onMessageChange 
}: StudioFormProps) => {
  return (
    <div className="flex flex-col space-y-12 py-6">
      <div className="max-w-md">
        <h1 className="font-serif text-5xl text-[#4a2b3d] md:text-6xl">
          {title}
        </h1>
        <p className="mt-4 text-[0.85rem] leading-relaxed text-[#6b5c65]">
          Translate your imagination into a culinary heirloom. Each layer is 
          hand-crafted in our Lahore atelier using the finest sourced ingredients.
        </p>
      </div>

      {/* 01 Base Sponge */}
      <section className="space-y-6">
        <div className="flex items-center gap-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d3c8be] font-serif text-sm italic text-[#4a2b3d]">
            01
          </span>
          <h3 className="font-serif text-2xl text-[#4a2b3d]">Base Sponge</h3>
          <div className="flex-1 border-t border-[#d3c8be]/40" />
        </div>

        <div className="space-y-3">
          {STUDIO_SPONGES.map((sponge) => (
            <button
              key={sponge.id}
              onClick={() => onSelectionChange('sponge', sponge.id)}
              className={`flex w-full flex-col items-start rounded-xl border p-4 text-left transition-all ${
                selections.sponge === sponge.id
                  ? 'border-[#4a2b3d] bg-[#f8f5f1] shadow-sm'
                  : 'border-[#d3c8be]/40 bg-white hover:border-[#4a2b3d]/30'
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <span className="text-[0.9rem] font-medium text-[#4a2b3d]">
                  {sponge.label}
                </span>
                {selections.sponge === sponge.id && (
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#4a2b3d] text-[0.5rem] text-white">
                    ✓
                  </div>
                )}
              </div>
              <p className="mt-1 text-[0.7rem] italic text-[#8b7a6a]">
                {sponge.description}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* 02 Signature Filling */}
      <section className="space-y-6">
        <div className="flex items-center gap-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d3c8be] font-serif text-sm italic text-[#4a2b3d]">
            02
          </span>
          <h3 className="font-serif text-2xl text-[#4a2b3d]">Signature Filling</h3>
          <div className="flex-1 border-t border-[#d3c8be]/40" />
        </div>

        <div className="flex flex-wrap gap-3">
          {STUDIO_FILLINGS.map((filling) => (
            <button
              key={filling.id}
              onClick={() => onSelectionChange('filling', filling.id)}
              className={`rounded-lg border px-5 py-4 text-[0.8rem] transition-all ${
                selections.filling === filling.id
                  ? 'border-[#4a2b3d] bg-[#f2e9e1] text-[#4a2b3d]'
                  : 'border-[#d3c8be]/40 bg-white text-[#6b5c65] hover:border-[#4a2b3d]/30'
              }`}
            >
              {filling.label}
            </button>
          ))}
        </div>
      </section>

      {/* 03 Heritage Finish */}
      <section className="space-y-6">
        <div className="flex items-center gap-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d3c8be] font-serif text-sm italic text-[#4a2b3d]">
            03
          </span>
          <h3 className="font-serif text-2xl text-[#4a2b3d]">Heritage Finish</h3>
          <div className="flex-1 border-t border-[#d3c8be]/40" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          {STUDIO_FINISHES.map((finish) => (
            <button
              key={finish.id}
              onClick={() => onSelectionChange('finish', finish.id)}
              className={`flex flex-col items-center justify-center gap-3 rounded-xl border py-6 transition-all ${
                selections.finish === finish.id
                  ? 'border-[#4a2b3d] bg-[#f2e9e1] text-[#4a2b3d]'
                  : 'border-[#d3c8be]/40 bg-white text-[#6b5c65] hover:border-[#4a2b3d]/30'
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8f5f1]">
                {/* Visual indicator for icon */}
                {finish.label === 'Gold Leaf' && <span className="h-4 w-1 bg-[#d4af37] rotate-[45deg] rounded-full" />}
                {finish.label === 'Silver Varak' && <span className="h-4 w-4 rounded-full border-2 border-dashed border-[#c0c0c0]" />}
                {finish.label === 'Sugar Roses' && <span className="text-xl">✿</span>}
              </div>
              <span className="text-[0.65rem] uppercase tracking-widest font-medium">
                {finish.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 04 Occasion & Message */}
      <section className="space-y-6">
        <div className="flex items-center gap-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d3c8be] font-serif text-sm italic text-[#4a2b3d]">
            04
          </span>
          <h3 className="font-serif text-2xl text-[#4a2b3d]">Occasion & Message</h3>
          <div className="flex-1 border-t border-[#d3c8be]/40" />
        </div>

        <div className="space-y-2">
          <span className="text-[0.55rem] uppercase tracking-[0.2em] text-[#b31429] font-bold">
            The Calligraphy Note
          </span>
          <textarea
            value={selections.message}
            onChange={(e) => onMessageChange(e.target.value)}
            placeholder="E.g. Happy 50th Anniversary, Ammi & Abbu"
            className="h-32 w-full rounded-xl border border-[#d3c8be]/40 bg-[#f8f5f1]/50 p-4 text-[0.85rem] placeholder-[#9a8a7a] focus:border-[#4a2b3d] focus:outline-none focus:ring-1 focus:ring-[#4a2b3d]/10"
          />
        </div>
      </section>

      {/* Actions */}
      <div className="flex gap-4 pt-6">
        <button className="flex-1 rounded-lg bg-[#4a0404] py-5 text-[0.7rem] font-bold uppercase tracking-[0.25em] text-white shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0">
          Add to Bespoke Order
        </button>
        <button className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#f5d142] text-[#4a2b3d] shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0">
          <span className="text-2xl">♥</span>
        </button>
      </div>
    </div>
  );
};

export default StudioForm;

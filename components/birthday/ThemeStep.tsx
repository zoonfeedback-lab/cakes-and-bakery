'use client';

import React from 'react';
import Image from 'next/image';
import { useBirthday } from './BirthdayContext';
import { THEME_OPTIONS } from '@/constants/birthday';

export const ThemeStep = () => {
  const { state, updateState, nextStep } = useBirthday();

  const handleSelect = (themeId: string) => {
    const selected = THEME_OPTIONS.find(t => t.id === themeId);
    if (selected) {
      updateState({ theme: selected });
      setTimeout(nextStep, 300); // Smooth auto-advance
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-heading text-[#5f4f58] mb-2">Choose a Birthday Theme</h2>
        <p className="text-gray-500">Select a theme that matches the vibe of the celebration.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {THEME_OPTIONS.map((theme) => {
          const isSelected = state.theme?.id === theme.id;

          return (
            <div 
              key={theme.id}
              onClick={() => handleSelect(theme.id)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                isSelected ? 'border-[#8c6b7a] shadow-lg scale-[1.02]' : 'border-transparent hover:border-[#8c6b7a]/30 hover:shadow-md'
              }`}
            >
              <div className="relative h-48 w-full bg-gray-100">
                <Image 
                  src={theme.image}
                  alt={theme.title}
                  fill
                  className={`object-cover transition-transform duration-700 ${isSelected ? '' : 'group-hover:scale-110'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-semibold px-3 py-1 rounded-full text-[#5f4f58]">
                  {theme.category}
                </div>

                {isSelected && (
                  <div className="absolute top-3 right-3 bg-[#8c6b7a] text-white w-8 h-8 rounded-full flex items-center justify-center animate-in zoom-in">
                    ✓
                  </div>
                )}
              </div>
              
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-lg text-gray-800">{theme.title}</h3>
                <p className="text-[#8c6b7a] font-medium mt-1">
                  {theme.price > 0 ? `+$${theme.price}` : 'Included'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

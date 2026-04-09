'use client';

import React from 'react';
import { useBirthday } from './BirthdayContext';
import { SIZE_OPTIONS } from '@/constants/birthday';

export const SizeStep = () => {
  const { state, updateState, nextStep } = useBirthday();

  const handleSelect = (sizeId: string) => {
    const selected = SIZE_OPTIONS.find(s => s.id === sizeId);
    if (selected) {
      updateState({ size: selected });
      setTimeout(nextStep, 300);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-heading text-[#5f4f58] mb-2">Cake Size</h2>
        <p className="text-gray-500">Select the size based on how many guests you are expecting.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SIZE_OPTIONS.map((size) => {
          const isSelected = state.size?.id === size.id;

          return (
            <div 
              key={size.id}
              onClick={() => handleSelect(size.id)}
              className={`p-5 rounded-2xl cursor-pointer border-2 transition-all ${
                isSelected ? 'border-[#8c6b7a] bg-[#fdfafb] shadow-sm' : 'border-gray-200 bg-white hover:border-[#8c6b7a]/50'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg text-gray-800">{size.title}</h3>
                <span className="text-lg font-bold text-[#8c6b7a]">${size.basePrice}</span>
              </div>
              <p className="text-sm text-gray-500">{size.servings}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

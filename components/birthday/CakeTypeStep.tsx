'use client';

import React from 'react';
import Image from 'next/image';
import { useBirthday } from './BirthdayContext';
import { CAKE_TYPE_OPTIONS } from '@/constants/birthday';

export const CakeTypeStep = () => {
  const { state, updateState, nextStep } = useBirthday();

  const handleSelect = (typeId: string) => {
    const selected = CAKE_TYPE_OPTIONS.find(t => t.id === typeId);
    if (selected) {
      updateState({ cakeType: selected });
      setTimeout(nextStep, 300);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-heading text-[#5f4f58] mb-2">Choose Cake Type</h2>
        <p className="text-gray-500">How would you like the cake structured?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CAKE_TYPE_OPTIONS.map((type) => {
          const isSelected = state.cakeType?.id === type.id;

          return (
            <div 
              key={type.id}
              onClick={() => handleSelect(type.id)}
              className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer border-2 transition-all ${
                isSelected ? 'border-[#8c6b7a] bg-[#fdfafb]' : 'border-gray-100 bg-white hover:border-[#8c6b7a]/30 hover:bg-gray-50'
              }`}
            >
              <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                <Image src={type.image} alt={type.title} fill className="object-cover" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-800">{type.title}</h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">{type.description}</p>
                {type.priceMultiplier > 1 && (
                  <span className="inline-block mt-2 text-xs font-semibold bg-[#f1d6df] text-[#8c6b7a] px-2 py-1 rounded">
                    Premium Structure (x{type.priceMultiplier} multiplier)
                  </span>
                )}
              </div>
              
              <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0">
                {isSelected ? (
                  <div className="w-3 h-3 bg-[#8c6b7a] rounded-full" />
                ) : (
                  <div className="w-full h-full border-gray-300 rounded-full" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

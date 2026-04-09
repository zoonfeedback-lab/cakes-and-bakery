'use client';

import React from 'react';
import Image from 'next/image';
import { useBirthday } from './BirthdayContext';
import { ADDONS_OPTIONS } from '@/constants/birthday';

export const AddOnsStep = () => {
  const { state, updateState, nextStep } = useBirthday();

  const handleQuantity = (id: string, delta: number) => {
    const currentQty = state.addOns[id] || 0;
    const newQty = Math.max(0, currentQty + delta);
    
    updateState({
      addOns: {
        ...state.addOns,
        [id]: newQty
      }
    });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-heading text-[#5f4f58] mb-2">Party Add-Ons</h2>
        <p className="text-gray-500">Make it a complete celebration with these extras.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {ADDONS_OPTIONS.map((addon) => {
          const qty = state.addOns[addon.id] || 0;
          return (
            <div key={addon.id} className="flex gap-4 p-4 border border-gray-100 bg-white rounded-2xl shadow-sm">
              <div className="relative w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                <Image src={addon.image} alt={addon.title} fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-between flex-1 py-1">
                <div>
                  <h3 className="font-semibold text-gray-800">{addon.title}</h3>
                  <p className="text-[#8c6b7a] font-medium">+${addon.price}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => handleQuantity(addon.id, -1)}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                  >-</button>
                  <span className="w-4 text-center font-semibold">{qty}</span>
                  <button 
                    onClick={() => handleQuantity(addon.id, 1)}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                  >+</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-end">
        <button onClick={nextStep} className="btn-primary">
          Continue
        </button>
      </div>
    </div>
  );
};

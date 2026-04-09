'use client';

import React from 'react';
import { useBirthday } from './BirthdayContext';
import { FLAVOR_OPTIONS } from '@/constants/birthday';

export const FlavorStep = () => {
  const { state, updateState, nextStep } = useBirthday();

  const handleSelect = (flavorId: string) => {
    const selected = FLAVOR_OPTIONS.find(f => f.id === flavorId);
    if (selected) {
      updateState({ flavor: selected });
      setTimeout(nextStep, 300);
    }
  };

  const basicFlavors = FLAVOR_OPTIONS.filter(f => !f.isPremium);
  const premiumFlavors = FLAVOR_OPTIONS.filter(f => f.isPremium);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-heading text-[#5f4f58] mb-2">Select Your Flavor</h2>
        <p className="text-gray-500">From classic favorites to premium artisan combinations.</p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Classic Flavors</h3>
          <div className="flex flex-wrap gap-3">
            {basicFlavors.map(flavor => {
              const isSelected = state.flavor?.id === flavor.id;
              return (
                <button
                  key={flavor.id}
                  onClick={() => handleSelect(flavor.id)}
                  className={`px-5 py-3 rounded-xl font-medium transition-all ${
                    isSelected 
                      ? 'bg-[#8c6b7a] text-white shadow-md' 
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-[#8c6b7a] hover:text-[#8c6b7a]'
                  }`}
                >
                  {flavor.title}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Premium Settings</h3>
            <span className="bg-[#f1d6df] text-[#8c6b7a] text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">Extra</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {premiumFlavors.map(flavor => {
              const isSelected = state.flavor?.id === flavor.id;
              return (
                <div
                  key={flavor.id}
                  onClick={() => handleSelect(flavor.id)}
                  className={`flex flex-col p-4 rounded-xl cursor-pointer border-2 transition-all ${
                    isSelected 
                      ? 'border-[#8c6b7a] bg-[#fdfafb]' 
                      : 'border-gray-200 bg-white hover:border-[#8c6b7a]/50'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="font-medium text-gray-800">{flavor.title}</span>
                    {isSelected && <span className="text-[#8c6b7a]">✓</span>}
                  </div>
                  <span className="text-sm text-[#8c6b7a] mt-1">+${flavor.premiumSurcharge} per pound</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

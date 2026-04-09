'use client';

import React from 'react';
import { useBirthday } from './BirthdayContext';
import { FROSTING_OPTIONS, DECORATION_OPTIONS } from '@/constants/birthday';

export const DesignStep = () => {
  const { state, updateState, nextStep } = useBirthday();

  const toggleFrosting = (frosting: string) => {
    updateState({ frosting });
  };

  const toggleDecoration = (decoration: string) => {
    const isSelected = state.decorations.includes(decoration);
    if (isSelected) {
      updateState({ decorations: state.decorations.filter(d => d !== decoration) });
    } else {
      updateState({ decorations: [...state.decorations, decoration] });
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-heading text-[#5f4f58] mb-2">Design Details</h2>
        <p className="text-gray-500">Choose the perfect frosting and optional decorations.</p>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 bg-gray-50 py-2 px-4 rounded-xl inline-block">Frosting Type</h3>
        <div className="flex flex-wrap gap-3">
          {FROSTING_OPTIONS.map(frosting => (
            <button
              key={frosting}
              onClick={() => toggleFrosting(frosting)}
              className={`px-5 py-3 rounded-xl font-medium transition-all ${
                state.frosting === frosting
                  ? 'bg-[#8c6b7a] text-white shadow-md' 
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-[#8c6b7a] hover:text-[#8c6b7a]'
              }`}
            >
              {frosting}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4 bg-gray-50 py-2 px-4 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-700">Decorations</h3>
          <span className="text-xs text-gray-500 uppercase tracking-wider">Multi-select</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {DECORATION_OPTIONS.map(decoration => {
            const isSelected = state.decorations.includes(decoration);
            return (
              <button
                key={decoration}
                onClick={() => toggleDecoration(decoration)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all border-2 ${
                  isSelected
                    ? 'border-[#8c6b7a] bg-[#fdfafb] text-[#8c6b7a]' 
                    : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200'
                }`}
              >
                <span className="font-medium text-sm">{decoration}</span>
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-[#8c6b7a] border-[#8c6b7a]' : 'border-gray-300'}`}>
                  {isSelected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="flex justify-end">
        <button 
          onClick={nextStep}
          className="btn-primary"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

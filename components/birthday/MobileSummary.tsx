'use client';

import React from 'react';
import { useBirthday } from './BirthdayContext';
import { DynamicCakeVisual } from './DynamicCakeVisual';
import { ADDONS_OPTIONS } from '@/constants/birthday';

export const MobileSummary = () => {
  const { state, nextStep, prevStep } = useBirthday();

  const baseSizePrice = state.size?.basePrice || 0;
  const themeCost = state.theme?.price || 0;
  const multiplier = state.cakeType?.priceMultiplier || 1;
  const premiumCost = state.flavor?.premiumSurcharge ? state.flavor.premiumSurcharge * (parseFloat(state.size?.id ?? '1') || 1) : 0;
  const addOnsTotal = Object.entries(state.addOns).reduce((total, [id, qty]) => {
    const addon = ADDONS_OPTIONS.find(a => a.id === id);
    return total + ((addon?.price || 0) * qty);
  }, 0);
  const total = (baseSizePrice * multiplier) + themeCost + premiumCost + addOnsTotal;
  const isLastStep = state.currentStepIndex >= 7;

  const [expanded, setExpanded] = React.useState(false);

  return (
    <div>
      {/* Expanded preview drawer */}
      {expanded && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setExpanded(false)}
        />
      )}
      {expanded && (
        <div className="fixed bottom-[80px] left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl p-6 max-h-[60vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-heading text-lg font-semibold">Your Cake</h3>
            <button onClick={() => setExpanded(false)} className="text-gray-400 text-xl">✕</button>
          </div>
          <DynamicCakeVisual />
        </div>
      )}

      {/* Fixed bottom bar */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-12 h-12 rounded-xl bg-[#f1d6df] flex items-center justify-center text-xl flex-shrink-0"
        >
          🎂
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 truncate">
            {[state.theme?.title, state.cakeType?.title, state.flavor?.title].filter(Boolean).join(' · ') || 'Start building your cake'}
          </p>
          <p className="text-lg font-bold text-[#8c6b7a]">${total || '0'}</p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          {state.currentStepIndex > 0 && (
            <button 
              onClick={prevStep}
              className="py-2.5 px-4 rounded-xl border border-gray-200 text-sm font-medium"
            >
              Back
            </button>
          )}
          <button 
            onClick={nextStep}
            className="py-2.5 px-5 bg-[#8c6b7a] text-white rounded-xl text-sm font-medium shadow-lg shadow-[#8c6b7a]/20"
          >
            {isLastStep ? 'Cart' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

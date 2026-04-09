'use client';

import React from 'react';
import { useBirthday } from './BirthdayContext';
import { DynamicCakeVisual } from './DynamicCakeVisual';
import { ADDONS_OPTIONS } from '@/constants/birthday';

export const BirthdaySidebar = () => {
  const { state, nextStep, prevStep } = useBirthday();
  
  // Compute price
  const baseSizePrice = state.size?.basePrice || 0;
  const themeCost = state.theme?.price || 0;
  const multiplier = state.cakeType?.priceMultiplier || 1;
  const premiumCost = state.flavor?.premiumSurcharge ? state.flavor.premiumSurcharge * (parseFloat(state.size?.id ?? '1') || 1) : 0;
  
  // Calculate Add-ons using actual prices
  const addOnsTotal = Object.entries(state.addOns).reduce((total, [id, qty]) => {
    const addon = ADDONS_OPTIONS.find(a => a.id === id);
    return total + ((addon?.price || 0) * qty);
  }, 0);

  const total = (baseSizePrice * multiplier) + themeCost + premiumCost + addOnsTotal;

  const isLastStep = state.currentStepIndex >= 7;
  const isFirstStep = state.currentStepIndex === 0;

  const hasSelections = state.theme || state.cakeType || state.flavor || state.size;

  return (
    <div className="sticky top-20 flex flex-col gap-5">

      {/* ─── Live Cake Preview Card ─── */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.05)] border border-gray-100">
        <div className="bg-gradient-to-br from-[#fdfafb] via-[#f9f3f5] to-[#f5eef0] p-8 pb-6">
          <DynamicCakeVisual />
        </div>
        <div className="px-5 py-3 border-t border-gray-100/60 bg-white/80">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8c6b7a]/40 text-center">
            Live Preview
          </p>
        </div>
      </div>

      {/* ─── Checkout Summary Card ─── */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.05)] border border-gray-100">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-full bg-[#8c6b7a]/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#8c6b7a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="font-heading text-lg font-semibold text-gray-800">Order Summary</h3>
        </div>
        
        {/* Order Line Items */}
        <div className="space-y-3 mb-5 text-sm">
          {!hasSelections && (
            <div className="text-center py-6">
              <div className="text-3xl mb-2">🎂</div>
              <p className="text-gray-400 text-sm">Start customizing your cake</p>
              <p className="text-gray-300 text-xs mt-1">Your selections will appear here</p>
            </div>
          )}

          {state.theme && (
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-[#f1d6df]/60 flex items-center justify-center text-xs">🎨</span>
                <div>
                  <p className="font-medium text-gray-700 text-sm">{state.theme.title}</p>
                  <p className="text-[11px] text-gray-400">Theme</p>
                </div>
              </div>
              <span className="font-medium text-gray-600 text-sm">
                {state.theme.price > 0 ? `+$${state.theme.price}` : 'Free'}
              </span>
            </div>
          )}
          
          {state.cakeType && (
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-[#f1d6df]/60 flex items-center justify-center text-xs">🏗️</span>
                <div>
                  <p className="font-medium text-gray-700 text-sm">{state.cakeType.title}</p>
                  <p className="text-[11px] text-gray-400">Structure</p>
                </div>
              </div>
              <span className="font-medium text-gray-600 text-sm">
                {state.cakeType.priceMultiplier > 1 ? `×${state.cakeType.priceMultiplier}` : '—'}
              </span>
            </div>
          )}

          {state.flavor && (
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-[#f1d6df]/60 flex items-center justify-center text-xs">🍰</span>
                <div>
                  <p className="font-medium text-gray-700 text-sm">{state.flavor.title}</p>
                  <p className="text-[11px] text-gray-400">
                    Flavor{state.flavor.isPremium && ' · Premium'}
                  </p>
                </div>
              </div>
              {state.flavor.isPremium && (
                <span className="font-medium text-gray-600 text-sm">+${premiumCost}</span>
              )}
            </div>
          )}

          {state.frosting && (
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-[#f1d6df]/60 flex items-center justify-center text-xs">🧁</span>
                <div>
                  <p className="font-medium text-gray-700 text-sm">{state.frosting}</p>
                  <p className="text-[11px] text-gray-400">Frosting</p>
                </div>
              </div>
            </div>
          )}

          {state.decorations.length > 0 && (
            <div className="flex justify-between items-start py-2 border-b border-gray-50">
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-[#f1d6df]/60 flex items-center justify-center text-xs mt-0.5">✨</span>
                <div>
                  <p className="font-medium text-gray-700 text-sm">Decorations</p>
                  <p className="text-[11px] text-gray-400 leading-relaxed">{state.decorations.join(', ')}</p>
                </div>
              </div>
            </div>
          )}

          {state.personalization.name && (
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-[#f1d6df]/60 flex items-center justify-center text-xs">💌</span>
                <div>
                  <p className="font-medium text-gray-700 text-sm">{state.personalization.name}</p>
                  <p className="text-[11px] text-gray-400">
                    {state.personalization.message || 'Personalisation'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {state.size && (
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-[#f1d6df]/60 flex items-center justify-center text-xs">📏</span>
                <div>
                  <p className="font-medium text-gray-700 text-sm">{state.size.title}</p>
                  <p className="text-[11px] text-gray-400">{state.size.servings}</p>
                </div>
              </div>
              <span className="font-medium text-gray-600 text-sm">${state.size.basePrice}</span>
            </div>
          )}

          {addOnsTotal > 0 && (
            <div className="flex justify-between items-start py-2 border-b border-gray-50">
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-[#f1d6df]/60 flex items-center justify-center text-xs mt-0.5">🎁</span>
                <div>
                  <p className="font-medium text-gray-700 text-sm">Add-Ons</p>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    {Object.entries(state.addOns)
                      .filter(([, qty]) => qty > 0)
                      .map(([id, qty]) => {
                        const addon = ADDONS_OPTIONS.find(a => a.id === id);
                        return addon ? `${addon.title} ×${qty}` : '';
                      })
                      .filter(Boolean)
                      .join(', ')}
                  </p>
                </div>
              </div>
              <span className="font-medium text-gray-600 text-sm">+${addOnsTotal}</span>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="bg-gradient-to-r from-[#fdfafb] to-[#f9f3f5] rounded-xl p-4 mb-5 border border-[#8c6b7a]/8">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-500">Estimated Total</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-[#8c6b7a]">${total || '0'}</span>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          {!isFirstStep && (
            <button 
              onClick={prevStep}
              className="flex-1 py-3 px-4 rounded-xl border-2 border-gray-200 font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all text-sm"
            >
              ← Back
            </button>
          )}
          <button 
            onClick={nextStep}
            className={`${isFirstStep ? 'w-full' : 'flex-[2]'} py-3.5 px-4 bg-[#8c6b7a] hover:bg-[#7a5c69] text-white rounded-xl font-semibold transition-all shadow-lg shadow-[#8c6b7a]/20 hover:shadow-xl hover:shadow-[#8c6b7a]/30 text-sm`}
          >
            {isLastStep ? '🛒 Add to Cart' : 'Continue →'}
          </button>
        </div>
      </div>
    </div>
  );
};

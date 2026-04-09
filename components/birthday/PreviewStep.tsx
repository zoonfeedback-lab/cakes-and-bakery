'use client';

import React from 'react';
import { useBirthday } from './BirthdayContext';
import { DynamicCakeVisual } from './DynamicCakeVisual';

export const PreviewStep = () => {
  const { state } = useBirthday();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-heading text-[#5f4f58] mb-2">Review Your Order</h2>
        <p className="text-gray-500">Make sure everything looks perfect before placing your order.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Large cake preview */}
        <div className="bg-[#f8f5f1] rounded-2xl p-8 flex items-center justify-center border border-[#ebe0e4]">
          <DynamicCakeVisual />
        </div>

        {/* Order details */}
        <div className="bg-[#fdfafb] rounded-2xl p-6 md:p-8 border-2 border-[#8c6b7a]/20">
          <div className="flex items-center gap-4 border-b border-[#8c6b7a]/10 pb-6 mb-6">
            <div className="w-14 h-14 rounded-full bg-[#8c6b7a]/10 flex items-center justify-center text-2xl">
              🎂
            </div>
            <div>
              <h3 className="font-heading text-xl font-semibold text-gray-800">Your Custom Birthday Cake</h3>
              <p className="text-[#8c6b7a] font-medium">{state.theme?.title || 'Custom Theme'}</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Cake Type</p>
                <p className="font-semibold text-gray-800">{state.cakeType?.title || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Size</p>
                <p className="font-semibold text-gray-800">{state.size?.title || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Flavor</p>
                <p className="font-semibold text-gray-800">{state.flavor?.title || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Frosting</p>
                <p className="font-semibold text-gray-800">{state.frosting || '—'}</p>
              </div>
            </div>

            {state.decorations.length > 0 && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Decorations</p>
                <div className="flex flex-wrap gap-2">
                  {state.decorations.map(d => (
                    <span key={d} className="bg-[#f1d6df] text-[#8c6b7a] text-xs font-semibold px-3 py-1 rounded-full">{d}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white p-4 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Personalisation</p>
              {state.personalization.name && (
                <p className="text-sm"><span className="text-gray-500 inline-block w-16">Name:</span> <strong>{state.personalization.name}</strong></p>
              )}
              {state.personalization.age && (
                <p className="text-sm"><span className="text-gray-500 inline-block w-16">Age:</span> <strong>{state.personalization.age}</strong></p>
              )}
              {state.personalization.message && (
                <p className="text-sm"><span className="text-gray-500 inline-block w-16">Message:</span> <strong>{state.personalization.message}</strong></p>
              )}
              {!state.personalization.name && !state.personalization.age && !state.personalization.message && (
                <p className="text-sm text-gray-400 italic">No personalisation added</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center justify-between">
         <div>
           <h4 className="font-semibold text-gray-800">Ready to proceed?</h4>
           <p className="text-sm text-gray-500">You can still go back and make changes using the sidebar.</p>
         </div>
      </div>
    </div>
  );
};

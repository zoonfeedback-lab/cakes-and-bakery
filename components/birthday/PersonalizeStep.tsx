'use client';

import React from 'react';
import { useBirthday } from './BirthdayContext';

export const PersonalizeStep = () => {
  const { state, updateState, nextStep } = useBirthday();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateState({
      personalization: {
        ...state.personalization,
        [e.target.name]: e.target.value
      }
    });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-heading text-[#5f4f58] mb-2">Personalize It</h2>
        <p className="text-gray-500">Add a special message and details for the birthday person.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Name on Cake</label>
            <input 
              name="name"
              value={state.personalization.name}
              onChange={handleInput}
              placeholder="e.g. Sarah"
              maxLength={15}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#8c6b7a] focus:ring-1 focus:ring-[#8c6b7a] outline-none transition-all"
            />
            <p className="text-right text-xs text-gray-400 mt-1">{state.personalization.name.length}/15</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Age Number (Optional)</label>
            <input 
              type="number"
              name="age"
              value={state.personalization.age}
              onChange={handleInput}
              placeholder="e.g. 21"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#8c6b7a] focus:ring-1 focus:ring-[#8c6b7a] outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Cake Message</label>
            <textarea 
              name="message"
              value={state.personalization.message}
              onChange={handleInput}
              rows={3}
              placeholder="Happy Birthday, Sarah!"
              maxLength={40}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#8c6b7a] focus:ring-1 focus:ring-[#8c6b7a] outline-none transition-all resize-none"
            />
            <p className="text-right text-xs text-gray-400 mt-1">{state.personalization.message.length}/40</p>
          </div>
        </div>
        
        {/* Live Preview Pane */}
        <div className="bg-[#f8f5f1] rounded-2xl p-6 flex flex-col items-center justify-center min-h-[300px] border border-[#ebe0e4]">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#8c6b7a] mb-6">Live Preview Overview</h3>
          <div className="bg-white px-8 py-10 rounded shadow-md w-full max-w-[280px] text-center transform rotate-[-2deg]">
            {state.personalization.age && (
              <div className="text-3xl font-heading text-pink-400 mb-2">{state.personalization.age}</div>
            )}
            {state.personalization.message ? (
              <div className="font-script text-2xl text-gray-800 leading-tight">
                {state.personalization.message}
              </div>
            ) : state.personalization.name ? (
              <div className="font-script text-2xl text-gray-800 leading-tight">
                Happy Birthday <br/> {state.personalization.name}
              </div>
            ) : (
              <div className="text-gray-300 font-script text-xl">Your text will appear here...</div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={nextStep} className="btn-primary">
          Continue
        </button>
      </div>
    </div>
  );
};

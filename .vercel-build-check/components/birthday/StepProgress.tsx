'use client';

import React from 'react';
import { useBirthday } from './BirthdayContext';
import { STEPS } from '@/constants/birthday';

export const StepProgress = () => {
  const { state, setStep } = useBirthday();
  const { currentStepIndex } = state;

  return (
    <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
      <div className="flex items-center min-w-max px-2">
        {STEPS.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isPast = index < currentStepIndex;

          return (
            <React.Fragment key={step.id}>
              <div 
                className={`flex flex-col items-center cursor-pointer transition-colors ${
                  isActive ? 'text-[#8c6b7a]' : isPast ? 'text-[#5f4f58]' : 'text-gray-400'
                }`}
                onClick={() => isPast && setStep(index)}
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2 transition-all ${
                    isActive 
                      ? 'bg-[#8c6b7a] text-white ring-4 ring-[#8c6b7a]/20' 
                      : isPast 
                      ? 'bg-[#5f4f58] text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {isPast ? '✓' : index + 1}
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider">{step.label}</span>
              </div>
              
              {index < STEPS.length - 1 && (
                <div className={`w-8 sm:w-12 h-px mx-2 sm:mx-4 -mt-6 ${
                  isPast ? 'bg-[#5f4f58]' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

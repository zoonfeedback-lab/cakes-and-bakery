'use client';

import React from 'react';
import { useBirthday } from './BirthdayContext';
import { ThemeStep } from './ThemeStep';
import { CakeTypeStep } from './CakeTypeStep';
import { FlavorStep } from './FlavorStep';
import { DesignStep } from './DesignStep';
import { PersonalizeStep } from './PersonalizeStep';
import { SizeStep } from './SizeStep';
import { AddOnsStep } from './AddOnsStep';
import { PreviewStep } from './PreviewStep';
import { StepProgress } from './StepProgress';
import { BirthdaySidebar } from './BirthdaySidebar';
import { MobileSummary } from './MobileSummary';

export const BirthdayApp = () => {
  const { state } = useBirthday();

  const renderStep = () => {
    switch (state.currentStepIndex) {
      case 0: return <ThemeStep />;
      case 1: return <CakeTypeStep />;
      case 2: return <FlavorStep />;
      case 3: return <DesignStep />;
      case 4: return <PersonalizeStep />;
      case 5: return <SizeStep />;
      case 6: return <AddOnsStep />;
      case 7: return <PreviewStep />;
      default: return <ThemeStep />;
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-8 xl:gap-12 items-start">

        {/* ═══ LEFT COLUMN: Step Wizard ═══ */}
        <div className="min-w-0 order-2 lg:order-1">
          {/* Step Progress Bar */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_4px_24px_rgb(0,0,0,0.04)] border border-gray-100/80 mb-8">
            <StepProgress />
          </div>
          
          {/* Current Step Content */}
          <div className="pb-24 lg:pb-0">
            <div key={state.currentStepIndex} className="animate-in fade-in slide-in-from-left-4 duration-400">
              {renderStep()}
            </div>
          </div>
        </div>

        {/* ═══ RIGHT COLUMN: Preview + Checkout (Desktop Sticky) ═══ */}
        <div className="hidden lg:block relative z-10 w-full order-1 lg:order-2">
          <BirthdaySidebar />
        </div>

        {/* ═══ MOBILE: Sticky Bottom Bar ═══ */}
        <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200 p-4 shadow-[0_-8px_30px_rgb(0,0,0,0.06)] z-50">
          <MobileSummary />
        </div>
      </div>
    </div>
  );
};

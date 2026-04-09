'use client';

import React from 'react';
import Image from 'next/image';

export const BirthdayHero = () => {
  return (
    <div className="relative w-full bg-[#f1d6df] overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 px-4">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cake-hero-bg.png"
          alt="Birthday Cakes Background"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f1d6df] via-[#f1d6df]/90 to-transparent" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto text-center md:text-left">
        <div className="max-w-2xl">
          <h1 className="section-title text-4xl sm:text-5xl md:text-6xl text-[#5f4f58] leading-tight">
            Design Your Perfect Birthday Cake
          </h1>
          <p className="body-copy mt-4 sm:mt-6 text-lg sm:text-xl text-[#5f4f58]/80 max-w-xl mx-auto md:mx-0">
            Customize theme, flavor, size, and design in minutes. Make their special day unforgettable.
          </p>
          <div className="mt-8 flex justify-center md:justify-start">
            <button 
              onClick={() => {
                document.getElementById('birthday-builder')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary px-8 py-3 text-lg"
            >
              Start Customizing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
